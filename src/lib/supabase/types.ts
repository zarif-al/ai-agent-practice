export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      departments: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string
          email: string
          first_name: string
          hire_date: string
          id: string
          last_name: string
          phone: string
          position_id: string
          status: Database["public"]["Enums"]["employee_status"]
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          hire_date: string
          id: string
          last_name: string
          phone: string
          position_id?: string
          status: Database["public"]["Enums"]["employee_status"]
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          hire_date?: string
          id?: string
          last_name?: string
          phone?: string
          position_id?: string
          status?: Database["public"]["Enums"]["employee_status"]
        }
        Relationships: [
          {
            foreignKeyName: "employees_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      job_openings: {
        Row: {
          created_at: string
          description: string
          id: string
          position_id: string | null
          status: Database["public"]["Enums"]["job_opening_status"]
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          position_id?: string | null
          status: Database["public"]["Enums"]["job_opening_status"]
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          position_id?: string | null
          status?: Database["public"]["Enums"]["job_opening_status"]
        }
        Relationships: [
          {
            foreignKeyName: "job_openings_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_management: {
        Row: {
          created_at: string
          employee_id: string
          end_date: string
          id: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          start_date: string
          status: Database["public"]["Enums"]["leave_request_status"]
        }
        Insert: {
          created_at?: string
          employee_id?: string
          end_date: string
          id?: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          start_date: string
          status: Database["public"]["Enums"]["leave_request_status"]
        }
        Update: {
          created_at?: string
          employee_id?: string
          end_date?: string
          id?: string
          leave_type?: Database["public"]["Enums"]["leave_type"]
          start_date?: string
          status?: Database["public"]["Enums"]["leave_request_status"]
        }
        Relationships: [
          {
            foreignKeyName: "leave_management_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll: {
        Row: {
          base_salary: number
          bonus: number | null
          created_at: string
          currency: Database["public"]["Enums"]["currency_type"] | null
          deductions: number | null
          employee_id: string
          id: string
          net_salary: number
        }
        Insert: {
          base_salary: number
          bonus?: number | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_type"] | null
          deductions?: number | null
          employee_id?: string
          id?: string
          net_salary: number
        }
        Update: {
          base_salary?: number
          bonus?: number | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_type"] | null
          deductions?: number | null
          employee_id?: string
          id?: string
          net_salary?: number
        }
        Relationships: [
          {
            foreignKeyName: "payroll_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      positions: {
        Row: {
          created_at: string
          department_id: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          department_id?: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          department_id?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      currency_type: "USD" | "GBP" | "BDT"
      employee_status:
        | "active"
        | "inactive"
        | "on_leave"
        | "terminated"
        | "probation"
      job_opening_status: "open" | "closed"
      leave_request_status: "pending" | "approved" | "rejected"
      leave_type: "vacation" | "sick_leave" | "parental_leave" | "medical_leave"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      currency_type: ["USD", "GBP", "BDT"],
      employee_status: [
        "active",
        "inactive",
        "on_leave",
        "terminated",
        "probation",
      ],
      job_opening_status: ["open", "closed"],
      leave_request_status: ["pending", "approved", "rejected"],
      leave_type: ["vacation", "sick_leave", "parental_leave", "medical_leave"],
    },
  },
} as const
