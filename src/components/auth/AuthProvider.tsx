"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'professor' | 'student' | 'professor_pending' | 'admin';
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  createProfile: (userData: { name: string; role: 'professor' | 'student'; classCode?: string; }) => Promise<UserProfile>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        const profileData = data as UserProfile;
        if (profileData.email === 'ryze0910@gmail.com') {
          profileData.role = 'admin';
        }
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            await fetchProfile(session.user.id);
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);

          if (event === 'SIGNED_IN' && session?.user) {
            fetchProfile(session.user.id);
          } else if (event === 'SIGNED_OUT') {
            setProfile(null);
          }
        }
      }
    );

    getSession();

    // Add real-time listener for profile updates as an extra layer
    let profileSubscription: any = null;
    if (user) {
        profileSubscription = supabase
            .channel('public:profiles')
            .on('postgres_changes', { 
                event: 'UPDATE', 
                schema: 'public', 
                table: 'profiles',
                filter: `user_id=eq.${user.id}`
            }, (payload) => {
                if (mounted) {
                    setProfile(payload.new as UserProfile);
                }
            })
            .subscribe();
    }

    return () => {
      mounted = false;
      subscription.unsubscribe();
      if (profileSubscription) profileSubscription.unsubscribe();
    };
  }, [user?.id]);

  const createProfile = async (userData: {
    name: string;
    role: 'professor' | 'student';
    classCode?: string;
  }) => {
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        user_id: user.id,
        email: user.email!,
        name: userData.name,
        role: userData.role,
      })
      .select()
      .single();

    if (error) throw error;

    if (userData.role === 'student' && userData.classCode) {
      const { data: classData, error: classError } = await supabase
        .from('classes')
        .select('id')
        .eq('code', userData.classCode)
        .single();

      if (!classError && classData) {
        await supabase
          .from('enrollments')
          .insert({
            student_id: user.id,
            class_id: classData.id,
          });
      }
    }

    setProfile(data as UserProfile);
    return data as UserProfile;
  };

  const signOut = async () => {
    try {
      Object.keys(localStorage || {}).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      await supabase.auth.signOut({ scope: 'global' });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, createProfile, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
