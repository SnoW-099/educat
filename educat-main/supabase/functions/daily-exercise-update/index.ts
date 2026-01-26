import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('🚀 Starting daily exercise generation...')

    // Call the database function to generate daily exercises
    const { data, error } = await supabaseClient.rpc('generate_daily_exercises')

    if (error) {
      console.error('❌ Error calling generate_daily_exercises function:', error)
      throw error
    }

    console.log('✅ Successfully called generate_daily_exercises function')

    // Get count of today's daily exercises to verify generation
    const today = new Date().toISOString().split('T')[0]
    const { data: dailyExercises, error: countError } = await supabaseClient
      .from('exercises')
      .select('id, title, level, type, class_id')
      .ilike('title', '%Exercici diari%')
      .gte('created_at', today)

    if (countError) {
      console.error('⚠️ Error counting daily exercises:', countError)
    } else {
      console.log(`📊 Generated ${dailyExercises?.length || 0} daily exercises today`)
      
      // Log breakdown by level and type
      if (dailyExercises && dailyExercises.length > 0) {
        const breakdown = dailyExercises.reduce((acc: any, exercise: any) => {
          const key = `${exercise.level}-${exercise.type}`
          acc[key] = (acc[key] || 0) + 1
          return acc
        }, {})
        
        console.log('📈 Exercise breakdown:', breakdown)
      }
    }

    return new Response(
      JSON.stringify({ 
        message: `Successfully generated daily exercises`,
        exercisesCount: dailyExercises?.length || 0,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in daily exercise update:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})