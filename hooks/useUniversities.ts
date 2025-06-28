import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

type University = Database['public']['Tables']['universities']['Row'];

export function useUniversities() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setUniversities(data || []);
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNearestUniversity = (latitude: number, longitude: number) => {
    if (universities.length === 0) return null;

    let nearest = universities[0];
    let minDistance = calculateDistance(latitude, longitude, nearest.latitude, nearest.longitude);

    universities.forEach((university) => {
      const distance = calculateDistance(latitude, longitude, university.latitude, university.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = university;
      }
    });

    return { university: nearest, distance: minDistance };
  };

  return {
    universities,
    loading,
    getNearestUniversity,
    refetch: fetchUniversities,
  };
}

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}