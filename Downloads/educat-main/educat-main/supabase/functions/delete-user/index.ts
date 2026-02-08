import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the user from the auth token
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create a Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Delete user's data from related tables
    // Note: These deletions should cascade if foreign keys are set up properly
    await supabaseAdmin.from('enrollments').delete().eq('student_id', user.id);
    await supabaseAdmin.from('exercise_attempts').delete().eq('student_id', user.id);
    await supabaseAdmin.from('student_progress').delete().eq('student_id', user.id);
    await supabaseAdmin.from('student_xp_rankings').delete().eq('student_id', user.id);
    await supabaseAdmin.from('essay_reviews').delete().eq('student_id', user.id);
    await supabaseAdmin.from('chat_messages').delete().eq('sender_id', user.id);
    await supabaseAdmin.from('message_reactions').delete().eq('user_id', user.id);
    await supabaseAdmin.from('user_streaks').delete().eq('user_id', user.id);
    
    // Delete professor's data if they are a professor
    await supabaseAdmin.from('classes').delete().eq('professor_id', user.id);
    await supabaseAdmin.from('exercises').delete().eq('professor_id', user.id);

    // Delete profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('user_id', user.id);

    if (profileError) {
      console.error('Error deleting profile:', profileError);
      throw profileError;
    }

    // Delete the user from auth.users using admin client
    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(
      user.id
    );

    if (deleteUserError) {
      console.error('Error deleting user from auth:', deleteUserError);
      throw deleteUserError;
    }

    return new Response(
      JSON.stringify({ message: 'User deleted successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in delete-user function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
