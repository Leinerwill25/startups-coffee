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
  avatar_url?: string | null;
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  startup: string;
  avatar_url?: string | null;
  quote?: string | null;
  month_num: number;
  topic: string;
  linkedin?: string | null;
  created_at: string;
}

export interface EventRegistration {
  id: string;
  name: string;
  email: string;
  startup?: string | null;
  event_date: string;
  created_at: string;
}

export interface EventSummary {
  id: string;
  slug: string;
  month_num: number;
  title: string;
  date: string;
  speaker_1: string;
  topic_1: string;
  takeaways_1: string[];
  speaker_2?: string | null;
  topic_2?: string | null;
  takeaways_2?: string[] | null;
  photos?: string[] | null;
  published: boolean;
  created_at: string;
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
          avatar_url: string | null;
          featured: boolean;
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
          avatar_url?: string | null;
          featured?: boolean;
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
          avatar_url?: string | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      speakers: {
        Row: {
          id: string;
          name: string;
          role: string;
          startup: string;
          avatar_url: string | null;
          quote: string | null;
          month_num: number;
          topic: string;
          linkedin: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          startup: string;
          avatar_url?: string | null;
          quote?: string | null;
          month_num: number;
          topic: string;
          linkedin?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          startup?: string;
          avatar_url?: string | null;
          quote?: string | null;
          month_num?: number;
          topic?: string;
          linkedin?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      event_registrations: {
        Row: {
          id: string;
          name: string;
          email: string;
          startup: string | null;
          event_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          startup?: string | null;
          event_date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          startup?: string | null;
          event_date?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      event_summaries: {
        Row: {
          id: string;
          slug: string;
          month_num: number;
          title: string;
          date: string;
          speaker_1: string;
          topic_1: string;
          takeaways_1: string[];
          speaker_2: string | null;
          topic_2: string | null;
          takeaways_2: string[] | null;
          photos: string[] | null;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          month_num: number;
          title: string;
          date: string;
          speaker_1: string;
          topic_1: string;
          takeaways_1: string[];
          speaker_2?: string | null;
          topic_2?: string | null;
          takeaways_2?: string[] | null;
          photos?: string[] | null;
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          month_num?: number;
          title?: string;
          date?: string;
          speaker_1?: string;
          topic_1?: string;
          takeaways_1?: string[];
          speaker_2?: string | null;
          topic_2?: string | null;
          takeaways_2?: string[] | null;
          photos?: string[] | null;
          published?: boolean;
          created_at?: string;
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
