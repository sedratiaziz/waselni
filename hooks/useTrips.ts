import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';
import { useAuth } from './useAuth';

type Trip = Database['public']['Tables']['trips']['Row'];
type TripInsert = Database['public']['Tables']['trips']['Insert'];
type TripUpdate = Database['public']['Tables']['trips']['Update'];

export function useTrips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTrips();
      subscribeToTrips();
    }
  }, [user]);

  const fetchTrips = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .or(`passenger_id.eq.${user.id},driver_id.in.(select id from drivers where profile_id = '${user.id}')`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrips(data || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToTrips = () => {
    if (!user) return;

    const subscription = supabase
      .channel('trips_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trips',
          filter: `passenger_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTrips((prev) => [payload.new as Trip, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setTrips((prev) =>
              prev.map((trip) =>
                trip.id === payload.new.id ? (payload.new as Trip) : trip
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setTrips((prev) => prev.filter((trip) => trip.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const createTrip = async (tripData: TripInsert) => {
    if (!user) return { data: null, error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase
        .from('trips')
        .insert({
          ...tripData,
          passenger_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updateTrip = async (tripId: string, updates: TripUpdate) => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .update(updates)
        .eq('id', tripId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const cancelTrip = async (tripId: string) => {
    return updateTrip(tripId, { status: 'cancelled' });
  };

  const rateTrip = async (tripId: string, rating: number, feedback?: string, isDriver = false) => {
    const updates: TripUpdate = isDriver
      ? { driver_rating: rating, driver_feedback: feedback }
      : { passenger_rating: rating, passenger_feedback: feedback };

    return updateTrip(tripId, updates);
  };

  const getUpcomingTrips = () => {
    return trips.filter((trip) => 
      trip.status === 'pending' || 
      trip.status === 'accepted' || 
      trip.status === 'picked_up' || 
      trip.status === 'in_transit'
    );
  };

  const getCompletedTrips = () => {
    return trips.filter((trip) => trip.status === 'completed');
  };

  return {
    trips,
    loading,
    createTrip,
    updateTrip,
    cancelTrip,
    rateTrip,
    getUpcomingTrips,
    getCompletedTrips,
    refetch: fetchTrips,
  };
}