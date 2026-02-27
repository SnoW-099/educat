export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          class_id: string
          content: string
          created_at: string
          file_name: string | null
          file_url: string | null
          id: string
          is_announcement: boolean
          message_type: string
          reply_to: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          class_id: string
          content: string
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_announcement?: boolean
          message_type?: string
          reply_to?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          class_id?: string
          content?: string
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_announcement?: boolean
          message_type?: string
          reply_to?: string | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      classes: {
        Row: {
          allow_all_levels: boolean
          allow_answer_checking: boolean
          allow_late_enrollment: boolean | null
          chat_permissions: string
          class_image_url: string | null
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          level: string
          max_students: number | null
          name: string
          professor_id: string
          unique_id: string | null
          updated_at: string
        }
        Insert: {
          allow_all_levels?: boolean
          allow_answer_checking?: boolean
          allow_late_enrollment?: boolean | null
          chat_permissions?: string
          class_image_url?: string | null
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          level: string
          max_students?: number | null
          name: string
          professor_id: string
          unique_id?: string | null
          updated_at?: string
        }
        Update: {
          allow_all_levels?: boolean
          allow_answer_checking?: boolean
          allow_late_enrollment?: boolean | null
          chat_permissions?: string
          class_image_url?: string | null
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          level?: string
          max_students?: number | null
          name?: string
          professor_id?: string
          unique_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      enrollments: {
        Row: {
          class_id: string
          enrolled_at: string
          id: string
          is_active: boolean
          student_id: string
        }
        Insert: {
          class_id: string
          enrolled_at?: string
          id?: string
          is_active?: boolean
          student_id: string
        }
        Update: {
          class_id?: string
          enrolled_at?: string
          id?: string
          is_active?: boolean
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      essay_reviews: {
        Row: {
          class_id: string
          created_at: string
          essay_text: string
          exercise_attempt_id: string
          id: string
          professor_feedback: string | null
          professor_id: string
          reviewed_at: string | null
          score: number | null
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          class_id: string
          created_at?: string
          essay_text: string
          exercise_attempt_id: string
          id?: string
          professor_feedback?: string | null
          professor_id: string
          reviewed_at?: string | null
          score?: number | null
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          class_id?: string
          created_at?: string
          essay_text?: string
          exercise_attempt_id?: string
          id?: string
          professor_feedback?: string | null
          professor_id?: string
          reviewed_at?: string | null
          score?: number | null
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "essay_reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      exercise_attempts: {
        Row: {
          answers: Json
          attempt_number: number
          cheating_detected: boolean | null
          completed_at: string
          exercise_id: string
          id: string
          score: number
          student_id: string
          time_taken: number | null
        }
        Insert: {
          answers: Json
          attempt_number?: number
          cheating_detected?: boolean | null
          completed_at?: string
          exercise_id: string
          id?: string
          score: number
          student_id: string
          time_taken?: number | null
        }
        Update: {
          answers?: Json
          attempt_number?: number
          cheating_detected?: boolean | null
          completed_at?: string
          exercise_id?: string
          id?: string
          score?: number
          student_id?: string
          time_taken?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "exercise_attempts_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      exercises: {
        Row: {
          answers: Json
          anti_cheat_enabled: boolean
          category: string | null
          class_id: string | null
          content: Json
          created_at: string
          description: string | null
          difficulty_score: number | null
          estimated_duration: number | null
          id: string
          is_exam: boolean
          level: string
          max_attempts: number | null
          professor_id: string
          tags: string[] | null
          time_limit: number | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          answers: Json
          anti_cheat_enabled?: boolean
          category?: string | null
          class_id?: string | null
          content: Json
          created_at?: string
          description?: string | null
          difficulty_score?: number | null
          estimated_duration?: number | null
          id?: string
          is_exam?: boolean
          level: string
          max_attempts?: number | null
          professor_id: string
          tags?: string[] | null
          time_limit?: number | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          answers?: Json
          anti_cheat_enabled?: boolean
          category?: string | null
          class_id?: string | null
          content?: Json
          created_at?: string
          description?: string | null
          difficulty_score?: number | null
          estimated_duration?: number | null
          id?: string
          is_exam?: boolean
          level?: string
          max_attempts?: number | null
          professor_id?: string
          tags?: string[] | null
          time_limit?: number | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      message_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_progress: {
        Row: {
          class_id: string
          grammar_score: number | null
          id: string
          level_progress: number | null
          listening_score: number | null
          overall_score: number | null
          reading_score: number | null
          speaking_score: number | null
          student_id: string
          updated_at: string
          vocabulary_score: number | null
          writing_score: number | null
        }
        Insert: {
          class_id: string
          grammar_score?: number | null
          id?: string
          level_progress?: number | null
          listening_score?: number | null
          overall_score?: number | null
          reading_score?: number | null
          speaking_score?: number | null
          student_id: string
          updated_at?: string
          vocabulary_score?: number | null
          writing_score?: number | null
        }
        Update: {
          class_id?: string
          grammar_score?: number | null
          id?: string
          level_progress?: number | null
          listening_score?: number | null
          overall_score?: number | null
          reading_score?: number | null
          speaking_score?: number | null
          student_id?: string
          updated_at?: string
          vocabulary_score?: number | null
          writing_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      student_xp_rankings: {
        Row: {
          class_id: string
          created_at: string
          id: string
          month_year: string
          ranking_position: number | null
          student_id: string
          updated_at: string
          xp_points: number
        }
        Insert: {
          class_id: string
          created_at?: string
          id?: string
          month_year: string
          ranking_position?: number | null
          student_id: string
          updated_at?: string
          xp_points?: number
        }
        Update: {
          class_id?: string
          created_at?: string
          id?: string
          month_year?: string
          ranking_position?: number | null
          student_id?: string
          updated_at?: string
          xp_points?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_xp_rankings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          created_at: string
          current_streak: number
          id: string
          last_activity_date: string
          longest_streak: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number
          id?: string
          last_activity_date?: string
          longest_streak?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number
          id?: string
          last_activity_date?: string
          longest_streak?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_admin_user: {
        Args: { admin_email: string; admin_name: string }
        Returns: undefined
      }
      generate_daily_exercises: { Args: never; Returns: undefined }
      generate_unique_class_code: { Args: never; Returns: string }
      get_class_rankings: {
        Args: { p_class_id: string; p_limit?: number; p_month_year: string }
        Returns: {
          ranking_position: number
          student_id: string
          student_name: string
          xp_points: number
        }[]
      }
      get_professor_global_rankings: {
        Args: { p_limit?: number; p_month_year: string }
        Returns: {
          class_name: string
          ranking_position: number
          student_id: string
          student_name: string
          xp_points: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_professor_of_class: {
        Args: { _class_id: string; _user_id: string }
        Returns: boolean
      }
      reset_monthly_rankings: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "professor" | "student" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["professor", "student", "admin"],
    },
  },
} as const
