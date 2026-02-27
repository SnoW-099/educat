<<<<<<< HEAD
import { useAuthContext } from '@/components/auth/AuthProvider';

export type { UserProfile } from '@/components/auth/AuthProvider';

export const useAuth = () => {
  return useAuthContext();
=======
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'professor' | 'student';
  created_at: string;
  updated_at: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const fetchProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (mounted && data) {
          setProfile(data as UserProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);

          if (event === 'SIGNED_IN' && session?.user) {
            setTimeout(() => {
              fetchProfile(session.user.id);
            }, 0);
          } else if (event === 'SIGNED_OUT') {
            setProfile(null);
          }
        }
      }
    );

    getSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
      // Stay on current page instead of redirecting
    } catch (error) {
      console.error('Error signing out:', error);
      // Stay on current page instead of redirecting
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!error && data) {
        setProfile(data as UserProfile);
      }
    }
  };

  return {
    user,
    session,
    profile,
    loading,
    createProfile,
    signOut,
    refreshProfile
  };
>>>>>>> 281e5f277d1a22fe983bb2f49ab903edb50397dc
};