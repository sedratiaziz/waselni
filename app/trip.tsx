import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapView, Marker, PROVIDER_GOOGLE } from '@/components/MapComponent';
import { 
  ArrowLeft,
  Phone,
  MessageCircle,
  Star,
  Shield,
  Navigation,
  Clock,
  User
} from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const tripData = {
  driverName: 'Ahmed Al-Mansouri',
  driverPhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
  vehicleType: 'Minibus',
  vehiclePlate: '123-ABC',
  rating: 4.8,
  eta: '5 min',
  price: 2.5,
  pickup: 'Al-Manama Souq',
  destination: 'University of Bahrain',
  status: 'arriving', // arriving, picked_up, in_transit, completed
};

export default function TripScreen() {
  const [tripStatus, setTripStatus] = useState(tripData.status);
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    // Simulate trip progression
    const statusProgression = ['arriving', 'picked_up', 'in_transit', 'completed'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex += 1;
      if (currentIndex < statusProgression.length) {
        setTripStatus(statusProgression[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 10000); // Change status every 10 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const getStatusMessage = () => {
    switch (tripStatus) {
      case 'arriving':
        return isArabic 
          ? 'السائق في طريقه إليك'
          : 'Driver is arriving';
      case 'picked_up':
        return isArabic 
          ? 'تم استلامك، جاري التوجه إلى الوجهة'
          : 'Picked up, heading to destination';
      case 'in_transit':
        return isArabic 
          ? 'في الطريق إلى الوجهة'
          : 'On the way to destination';
      case 'completed':
        return isArabic 
          ? 'وصلت إلى وجهتك'
          : 'You have arrived at your destination';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (tripStatus) {
      case 'arriving':
        return '#F59E0B';
      case 'picked_up':
        return '#1E40AF';
      case 'in_transit':
        return '#1E40AF';
      case 'completed':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isArabic ? 'رحلتك' : 'Your Trip'}
        </Text>
        <TouchableOpacity style={styles.emergencyButton}>
          <Shield size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          initialRegion={{
            latitude: 26.2285,
            longitude: 50.5860,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
        >
          {/* Driver Location */}
          <Marker
            coordinate={{
              latitude: 26.2285,
              longitude: 50.5860,
            }}
            title={tripData.driverName}
            description={tripData.vehicleType}
          >
            <View style={styles.driverMarker}>
              <Navigation size={20} color="#FFFFFF" />
            </View>
          </Marker>
          
          {/* Destination */}
          <Marker
            coordinate={{
              latitude: 26.2335,
              longitude: 50.5910,
            }}
            title="Destination"
            description={tripData.destination}
          >
            <View style={styles.destinationMarker}>
              <Text style={styles.markerText}>🏫</Text>
            </View>
          </Marker>
        </MapView>

        {/* Status Overlay */}
        <View style={styles.statusOverlay}>
          <View style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor() }
          ]} />
          <Text style={styles.statusText}>{getStatusMessage()}</Text>
        </View>
      </View>

      {/* Trip Info Card */}
      <View style={styles.tripCard}>
        {/* Driver Info */}
        <View style={styles.driverSection}>
          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar}>
              <User size={24} color="#1E40AF" />
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{tripData.driverName}</Text>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleType}>{tripData.vehicleType}</Text>
                <Text style={styles.vehiclePlate}>• {tripData.vehiclePlate}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.rating}>{tripData.rating}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Phone size={20} color="#1E40AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <MessageCircle size={20} color="#1E40AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trip Details */}
        <View style={styles.tripDetails}>
          <View style={styles.routeInfo}>
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, styles.pickupDot]} />
              <Text style={styles.routeText}>{tripData.pickup}</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, styles.destinationDot]} />
              <Text style={styles.routeText}>{tripData.destination}</Text>
            </View>
          </View>
        </View>

        {/* Trip Stats */}
        <View style={styles.tripStats}>
          <View style={styles.statItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.statText}>
              {isArabic ? `${tripData.eta} متبقي` : `${tripData.eta} remaining`}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.tripPrice}>{tripData.price} BHD</Text>
          </View>
        </View>

        {/* Action Buttons */}
        {tripStatus === 'completed' ? (
          <View style={styles.completedActions}>
            <TouchableOpacity style={styles.rateButton}>
              <Star size={20} color="#F59E0B" />
              <Text style={styles.rateButtonText}>
                {isArabic ? 'قيم الرحلة' : 'Rate Trip'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.doneButton}
              onPress={() => router.replace('/(tabs)')}
            >
              <Text style={styles.doneButtonText}>
                {isArabic ? 'تم' : 'Done'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>
              {isArabic ? 'إلغاء الرحلة' : 'Cancel Trip'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  emergencyButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  driverMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  destinationMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EF4444',
  },
  markerText: {
    fontSize: 20,
  },
  statusOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  driverSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  vehicleType: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  vehiclePlate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#F59E0B',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripDetails: {
    marginBottom: 20,
  },
  routeInfo: {
    paddingLeft: 8,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 4,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pickupDot: {
    backgroundColor: '#10B981',
  },
  destinationDot: {
    backgroundColor: '#EF4444',
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#D1D5DB',
    marginLeft: 6,
    marginVertical: 4,
  },
  routeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  tripStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  tripPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E40AF',
  },
  completedActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  rateButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F59E0B',
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#1E40AF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#FEF2F2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#EF4444',
  },
});