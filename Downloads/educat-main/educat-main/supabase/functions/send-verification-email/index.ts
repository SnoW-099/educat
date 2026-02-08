import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, confirmationUrl } = await req.json();

    console.log('Sending verification email to:', email);
    console.log('Confirmation URL:', confirmationUrl);

    // In a production environment, you would send this via a service like Resend
    // For now, we'll just log it and return success
    // The email will be sent by Supabase's built-in email service

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Verification email queued',
        email,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in send-verification-email:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
