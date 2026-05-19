export type StartupStage = 'idea' | 'mvp' | 'traccion' | 'escala';
export type StartupStatus = 'pending' | 'approved' | 'rejected';

export interface Startup {
  id: string;
  name: string;
  founders: string;
  industry: string;
  stage: StartupStage;
  city: string;
  website_or_ig?: string | null;
  description: string;
  attended_event: boolean;
  status: StartupStatus;
  admin_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      startups: {
        Row: {
          id: string;
          name: string;
          founders: string;
          industry: string;
          stage: StartupStage;
          city: string;
          website_or_ig: string | null;
          description: string;
          attended_event: boolean;
          status: StartupStatus;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          founders: string;
          industry: string;
          stage: StartupStage;
          city?: string;
          website_or_ig?: string | null;
          description: string;
          attended_event?: boolean;
          status?: StartupStatus;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          founders?: string;
          industry?: string;
          stage?: StartupStage;
          city?: string;
          website_or_ig?: string | null;
          description?: string;
          attended_event?: boolean;
          status?: StartupStatus;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
