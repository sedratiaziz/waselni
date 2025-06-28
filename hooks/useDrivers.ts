import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

type Driver = Database['public']['Tables']['drivers']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row'];
};

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOnlineDrivers();
    subscribeToDrivers();
  }, []);

  const fetchOnlineDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from('drivers')
        .select(`
          *,
          profiles (*)
        `)
        .eq('is_online', true)
        .eq('background_check_status', 'approved');

      if (error) throw error;
      setDrivers(data || []);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToDrivers = () => {
    const subscription = supabase
      .channel('drivers_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'drivers',
        },
        () => {
          fetchOnlineDrivers();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const updateDriverLocation = async (driverId: string, latitude: number, longitude: number) => {
    try {
      const { error } = await supabase
        .from('drivers')
        .update({
          current_latitude: latitude,
          current_longitude: longitude,
          updated_at: new Date().toISOString(),
        })
        .eq('id', driverId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const toggleOnlineStatus = async (driverId: string, isOnline: boolean) => {
    try {
      const { error } = await supabase
        .from('drivers')
        .update({
          is_online: isOnline,
          updated_at: new Date().toISOString(),
        })
        .eq('id', driverId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const getDriversByType = (vehicleType: 'minibus' | 'private' | 'volunteer') => {
    return drivers.filter((driver) => driver.vehicle_type === vehicleType);
  };

  const getNearbyDrivers = (latitude: number, longitude: number, radiusKm = 10) => {
    return drivers.filter((driver) => {
      if (!driver.current_latitude || !driver.current_longitude) return false;
      
      const distance = calculateDistance(
        latitude,
        longitude,
        driver.current_latitude,
        driver.current_longitude
      );
      
      return distance <= radiusKm;
    });
  };

  return {
    drivers,
    loading,
    updateDriverLocation,
    toggleOnlineStatus,
    getDriversByType,
    getNearbyDrivers,
    refetch: fetchOnlineDrivers,
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