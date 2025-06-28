export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          full_name_ar: string | null;
          phone: string | null;
          university: string | null;
          university_ar: string | null;
          student_id: string | null;
          avatar_url: string | null;
          user_type: 'student' | 'driver';
          is_verified: boolean;
          rating: number;
          total_trips: number;
          member_since: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          full_name_ar?: string | null;
          phone?: string | null;
          university?: string | null;
          university_ar?: string | null;
          student_id?: string | null;
          avatar_url?: string | null;
          user_type?: 'student' | 'driver';
          is_verified?: boolean;
          rating?: number;
          total_trips?: number;
          member_since?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          full_name_ar?: string | null;
          phone?: string | null;
          university?: string | null;
          university_ar?: string | null;
          student_id?: string | null;
          avatar_url?: string | null;
          user_type?: 'student' | 'driver';
          is_verified?: boolean;
          rating?: number;
          total_trips?: number;
          member_since?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      drivers: {
        Row: {
          id: string;
          profile_id: string;
          vehicle_type: 'minibus' | 'private' | 'volunteer';
          vehicle_plate: string;
          vehicle_model: string | null;
          vehicle_color: string | null;
          license_number: string;
          is_online: boolean;
          current_latitude: number | null;
          current_longitude: number | null;
          earnings_today: number;
          earnings_week: number;
          earnings_month: number;
          total_rides: number;
          background_check_status: 'pending' | 'approved' | 'rejected';
          insurance_status: 'pending' | 'approved' | 'expired';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          vehicle_type: 'minibus' | 'private' | 'volunteer';
          vehicle_plate: string;
          vehicle_model?: string | null;
          vehicle_color?: string | null;
          license_number: string;
          is_online?: boolean;
          current_latitude?: number | null;
          current_longitude?: number | null;
          earnings_today?: number;
          earnings_week?: number;
          earnings_month?: number;
          total_rides?: number;
          background_check_status?: 'pending' | 'approved' | 'rejected';
          insurance_status?: 'pending' | 'approved' | 'expired';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          vehicle_type?: 'minibus' | 'private' | 'volunteer';
          vehicle_plate?: string;
          vehicle_model?: string | null;
          vehicle_color?: string | null;
          license_number?: string;
          is_online?: boolean;
          current_latitude?: number | null;
          current_longitude?: number | null;
          earnings_today?: number;
          earnings_week?: number;
          earnings_month?: number;
          total_rides?: number;
          background_check_status?: 'pending' | 'approved' | 'rejected';
          insurance_status?: 'pending' | 'approved' | 'expired';
          created_at?: string;
          updated_at?: string;
        };
      };
      trips: {
        Row: {
          id: string;
          passenger_id: string;
          driver_id: string | null;
          pickup_location: string;
          pickup_latitude: number;
          pickup_longitude: number;
          destination_location: string;
          destination_latitude: number;
          destination_longitude: number;
          vehicle_type: 'minibus' | 'private' | 'volunteer';
          status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'cancelled';
          price: number;
          scheduled_time: string | null;
          pickup_time: string | null;
          completion_time: string | null;
          passenger_rating: number | null;
          driver_rating: number | null;
          passenger_feedback: string | null;
          driver_feedback: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          passenger_id: string;
          driver_id?: string | null;
          pickup_location: string;
          pickup_latitude: number;
          pickup_longitude: number;
          destination_location: string;
          destination_latitude: number;
          destination_longitude: number;
          vehicle_type: 'minibus' | 'private' | 'volunteer';
          status?: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'cancelled';
          price: number;
          scheduled_time?: string | null;
          pickup_time?: string | null;
          completion_time?: string | null;
          passenger_rating?: number | null;
          driver_rating?: number | null;
          passenger_feedback?: string | null;
          driver_feedback?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          passenger_id?: string;
          driver_id?: string | null;
          pickup_location?: string;
          pickup_latitude?: number;
          pickup_longitude?: number;
          destination_location?: string;
          destination_latitude?: number;
          destination_longitude?: number;
          vehicle_type?: 'minibus' | 'private' | 'volunteer';
          status?: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'cancelled';
          price?: number;
          scheduled_time?: string | null;
          pickup_time?: string | null;
          completion_time?: string | null;
          passenger_rating?: number | null;
          driver_rating?: number | null;
          passenger_feedback?: string | null;
          driver_feedback?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      universities: {
        Row: {
          id: string;
          name: string;
          name_ar: string;
          latitude: number;
          longitude: number;
          address: string;
          address_ar: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_ar: string;
          latitude: number;
          longitude: number;
          address: string;
          address_ar: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_ar?: string;
          latitude?: number;
          longitude?: number;
          address?: string;
          address_ar?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      safety_reports: {
        Row: {
          id: string;
          reporter_id: string;
          trip_id: string | null;
          driver_id: string | null;
          report_type: 'safety_concern' | 'inappropriate_behavior' | 'vehicle_issue' | 'other';
          description: string;
          status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reporter_id: string;
          trip_id?: string | null;
          driver_id?: string | null;
          report_type: 'safety_concern' | 'inappropriate_behavior' | 'vehicle_issue' | 'other';
          description: string;
          status?: 'pending' | 'investigating' | 'resolved' | 'dismissed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reporter_id?: string;
          trip_id?: string | null;
          driver_id?: string | null;
          report_type?: 'safety_concern' | 'inappropriate_behavior' | 'vehicle_issue' | 'other';
          description?: string;
          status?: 'pending' | 'investigating' | 'resolved' | 'dismissed';
          created_at?: string;
          updated_at?: string;
        };
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
  };
}