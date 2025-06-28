/*
  # Initial Schema for Waselni Transportation App

  1. New Tables
    - `profiles` - User profiles for both students and drivers
    - `drivers` - Driver-specific information and vehicle details
    - `trips` - Trip requests and ride history
    - `universities` - University locations and information
    - `safety_reports` - Safety incident reporting system

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for drivers to see relevant trip information
    - Add policies for safety reporting

  3. Features
    - Real-time location tracking for drivers
    - Trip status management
    - Rating system for both passengers and drivers
    - Multi-language support (English/Arabic)
    - Safety reporting system
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  full_name_ar text,
  phone text,
  university text,
  university_ar text,
  student_id text,
  avatar_url text,
  user_type text NOT NULL DEFAULT 'student' CHECK (user_type IN ('student', 'driver')),
  is_verified boolean DEFAULT false,
  rating numeric(3,2) DEFAULT 5.0,
  total_trips integer DEFAULT 0,
  member_since timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  vehicle_type text NOT NULL CHECK (vehicle_type IN ('minibus', 'private', 'volunteer')),
  vehicle_plate text NOT NULL,
  vehicle_model text,
  vehicle_color text,
  license_number text NOT NULL,
  is_online boolean DEFAULT false,
  current_latitude numeric,
  current_longitude numeric,
  earnings_today numeric(10,2) DEFAULT 0,
  earnings_week numeric(10,2) DEFAULT 0,
  earnings_month numeric(10,2) DEFAULT 0,
  total_rides integer DEFAULT 0,
  background_check_status text DEFAULT 'pending' CHECK (background_check_status IN ('pending', 'approved', 'rejected')),
  insurance_status text DEFAULT 'pending' CHECK (insurance_status IN ('pending', 'approved', 'expired')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  passenger_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL,
  pickup_location text NOT NULL,
  pickup_latitude numeric NOT NULL,
  pickup_longitude numeric NOT NULL,
  destination_location text NOT NULL,
  destination_latitude numeric NOT NULL,
  destination_longitude numeric NOT NULL,
  vehicle_type text NOT NULL CHECK (vehicle_type IN ('minibus', 'private', 'volunteer')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'picked_up', 'in_transit', 'completed', 'cancelled')),
  price numeric(10,2) NOT NULL,
  scheduled_time timestamptz,
  pickup_time timestamptz,
  completion_time timestamptz,
  passenger_rating integer CHECK (passenger_rating >= 1 AND passenger_rating <= 5),
  driver_rating integer CHECK (driver_rating >= 1 AND driver_rating <= 5),
  passenger_feedback text,
  driver_feedback text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create universities table
CREATE TABLE IF NOT EXISTS universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_ar text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  address text NOT NULL,
  address_ar text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create safety_reports table
CREATE TABLE IF NOT EXISTS safety_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  trip_id uuid REFERENCES trips(id) ON DELETE SET NULL,
  driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL,
  report_type text NOT NULL CHECK (report_type IN ('safety_concern', 'inappropriate_behavior', 'vehicle_issue', 'other')),
  description text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Drivers policies
CREATE POLICY "Drivers can read own data"
  ON drivers
  FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Drivers can update own data"
  ON drivers
  FOR UPDATE
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Drivers can insert own data"
  ON drivers
  FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can read online drivers"
  ON drivers
  FOR SELECT
  TO authenticated
  USING (is_online = true AND background_check_status = 'approved');

-- Trips policies
CREATE POLICY "Users can read own trips as passenger"
  ON trips
  FOR SELECT
  TO authenticated
  USING (passenger_id = auth.uid());

CREATE POLICY "Drivers can read assigned trips"
  ON trips
  FOR SELECT
  TO authenticated
  USING (
    driver_id IN (
      SELECT id FROM drivers WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can create trips"
  ON trips
  FOR INSERT
  TO authenticated
  WITH CHECK (passenger_id = auth.uid());

CREATE POLICY "Users can update own trips"
  ON trips
  FOR UPDATE
  TO authenticated
  USING (
    passenger_id = auth.uid() OR 
    driver_id IN (
      SELECT id FROM drivers WHERE profile_id = auth.uid()
    )
  );

-- Universities policies (public read access)
CREATE POLICY "Anyone can read universities"
  ON universities
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Safety reports policies
CREATE POLICY "Users can read own reports"
  ON safety_reports
  FOR SELECT
  TO authenticated
  USING (reporter_id = auth.uid());

CREATE POLICY "Users can create safety reports"
  ON safety_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (reporter_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_drivers_location ON drivers(current_latitude, current_longitude) WHERE is_online = true;
CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_passenger ON trips(passenger_id);
CREATE INDEX IF NOT EXISTS idx_trips_driver ON trips(driver_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);

-- Insert sample universities
INSERT INTO universities (name, name_ar, latitude, longitude, address, address_ar) VALUES
  ('University of Bahrain', 'جامعة البحرين', 26.2285, 50.5860, 'Sakhir, Bahrain', 'الصخير، البحرين'),
  ('Bahrain Polytechnic', 'بوليتكنك البحرين', 26.1921, 50.5579, 'Isa Town, Bahrain', 'مدينة عيسى، البحرين'),
  ('RCSI Bahrain', 'الكلية الملكية للجراحين في البحرين', 26.0667, 50.5577, 'Busaiteen, Bahrain', 'البسيتين، البحرين'),
  ('AMA International University', 'جامعة أما الدولية', 26.2041, 50.4788, 'Salmabad, Bahrain', 'سلماباد، البحرين')
ON CONFLICT DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON drivers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_safety_reports_updated_at BEFORE UPDATE ON safety_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();