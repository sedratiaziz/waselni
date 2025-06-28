import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapView, Marker, PROVIDER_GOOGLE } from '@/components/MapComponent';
import { 
  Search, 
  Navigation, 
  Clock, 
  Users, 
  Car,
  Bus,
  Heart,
  Settings,
  Bell
} from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface Driver {
  id: string;
  name: string;
  type: 'minibus' | 'private' | 'volunteer';
  latitude: number;
  longitude: number;
  eta: number;
  price: number;
  rating: number;
}

const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Ahmed Al-Mansouri',
    type: 'minibus',
    latitude: 26.2285,
    longitude: 50.5860,
    eta: 5,
    price: 2.5,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Fatima Al-Khalifa',
    type: 'private',
    latitude: 26.2235,
    longitude: 50.5810,
    eta: 8,
    price: 4.0,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Omar Hassan',
    type: 'volunteer',
    latitude: 26.2335,
    longitude: 50.5910,
    eta: 12,
    price: 0,
    rating: 4.7,
  },
];

const universities = [
  { name: 'University of Bahrain', nameAr: 'جامعة البحرين', distance: '2.3 km' },
  { name: 'Bahrain Polytechnic', nameAr: 'بوليتكنك البحرين', distance: '3.8 km' },
  { name: 'RCSI Bahrain', nameAr: 'الكلية الملكية للجراحين', distance: '5.1 km' },
  { name: 'AMA International University', nameAr: 'جامعة أما الدولية', distance: '4.2 km' },
];

export default function HomeScreen() {
  const [selectedServiceType, setSelectedServiceType] = useState<'all' | 'minibus' | 'private' | 'volunteer'>('all');
  const [isArabic, setIsArabic] = useState(false);

  const filteredDrivers = selectedServiceType === 'all' 
    ? mockDrivers 
    : mockDrivers.filter(driver => driver.type === selectedServiceType);

  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'minibus':
        return <Bus size={20} color="#FFFFFF" />;
      case 'private':
        return <Car size={20} color="#FFFFFF" />;
      case 'volunteer':
        return <Heart size={20} color="#FFFFFF" />;
      default:
        return <Users size={20} color="#FFFFFF" />;
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'minibus':
        return '#F59E0B';
      case 'private':
        return '#1E40AF';
      case 'volunteer':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => setIsArabic(!isArabic)}>
            <Text style={styles.languageToggle}>
              {isArabic ? 'EN' : 'عربي'}
            </Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.greeting}>
              {isArabic ? 'مرحباً بك!' : 'Welcome!'}
            </Text>
            <Text style={styles.location}>
              {isArabic ? 'المنامة، البحرين' : 'Manama, Bahrain'}
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="#1E40AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Settings size={24} color="#1E40AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Type Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.serviceTypeContainer}
        >
          <TouchableOpacity
            style={[
              styles.serviceTypeButton,
              selectedServiceType === 'all' && styles.serviceTypeButtonActive,
            ]}
            onPress={() => setSelectedServiceType('all')}
          >
            <Users size={18} color={selectedServiceType === 'all' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.serviceTypeText,
              selectedServiceType === 'all' && styles.serviceTypeTextActive,
            ]}>
              {isArabic ? 'الكل' : 'All'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.serviceTypeButton,
              selectedServiceType === 'minibus' && styles.serviceTypeButtonActive,
            ]}
            onPress={() => setSelectedServiceType('minibus')}
          >
            <Bus size={18} color={selectedServiceType === 'minibus' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.serviceTypeText,
              selectedServiceType === 'minibus' && styles.serviceTypeTextActive,
            ]}>
              {isArabic ? 'حافلة صغيرة' : 'Minibus'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.serviceTypeButton,
              selectedServiceType === 'private' && styles.serviceTypeButtonActive,
            ]}
            onPress={() => setSelectedServiceType('private')}
          >
            <Car size={18} color={selectedServiceType === 'private' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.serviceTypeText,
              selectedServiceType === 'private' && styles.serviceTypeTextActive,
            ]}>
              {isArabic ? 'سيارة خاصة' : 'Private'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.serviceTypeButton,
              selectedServiceType === 'volunteer' && styles.serviceTypeButtonActive,
            ]}
            onPress={() => setSelectedServiceType('volunteer')}
          >
            <Heart size={18} color={selectedServiceType === 'volunteer' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.serviceTypeText,
              selectedServiceType === 'volunteer' && styles.serviceTypeTextActive,
            ]}>
              {isArabic ? 'متطوع' : 'Volunteer'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
          showsMyLocationButton
        >
          {filteredDrivers.map((driver) => (
            <Marker
              key={driver.id}
              coordinate={{
                latitude: driver.latitude,
                longitude: driver.longitude,
              }}
              title={driver.name}
              description={`${driver.eta} min • ${driver.price === 0 ? 'Free' : `${driver.price} BHD`}`}
            >
              <View style={[
                styles.markerContainer,
                { backgroundColor: getServiceTypeColor(driver.type) }
              ]}>
                {getServiceTypeIcon(driver.type)}
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Search Bar Overlay */}
        <TouchableOpacity 
          style={styles.searchOverlay}
          onPress={() => router.push('/booking')}
        >
          <Search size={20} color="#6B7280" />
          <Text style={styles.searchText}>
            {isArabic ? 'إلى أين تريد الذهاب؟' : 'Where would you like to go?'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Destinations */}
      <View style={styles.quickDestinations}>
        <Text style={styles.sectionTitle}>
          {isArabic ? 'الوجهات السريعة' : 'Quick Destinations'}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {universities.map((university, index) => (
            <TouchableOpacity
              key={index}
              style={styles.destinationCard}
              onPress={() => router.push('/booking')}
            >
              <View style={styles.destinationIcon}>
                <Navigation size={20} color="#1E40AF" />
              </View>
              <Text style={styles.destinationName}>
                {isArabic ? university.nameAr : university.name}
              </Text>
              <Text style={styles.destinationDistance}>{university.distance}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Available Rides */}
      <View style={styles.availableRides}>
        <Text style={styles.sectionTitle}>
          {isArabic ? 'الرحلات المتاحة' : 'Available Rides'}
        </Text>
        {filteredDrivers.slice(0, 3).map((driver) => (
          <TouchableOpacity
            key={driver.id}
            style={styles.rideCard}
            onPress={() => router.push('/booking')}
          >
            <View style={styles.rideInfo}>
              <View style={[
                styles.rideTypeIcon,
                { backgroundColor: getServiceTypeColor(driver.type) }
              ]}>
                {getServiceTypeIcon(driver.type)}
              </View>
              <View style={styles.rideDetails}>
                <Text style={styles.driverName}>{driver.name}</Text>
                <View style={styles.rideStats}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.rideEta}>{driver.eta} min</Text>
                  <Text style={styles.rideSeparator}>•</Text>
                  <Text style={styles.rideRating}>★ {driver.rating}</Text>
                </View>
              </View>
            </View>
            <View style={styles.ridePrice}>
              <Text style={styles.ridePriceText}>
                {driver.price === 0 ? (isArabic ? 'مجاني' : 'Free') : `${driver.price} BHD`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  languageToggle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E40AF',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  greeting: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  serviceTypeContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  serviceTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 12,
    gap: 6,
  },
  serviceTypeButtonActive: {
    backgroundColor: '#1E40AF',
  },
  serviceTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#6B7280',
  },
  serviceTypeTextActive: {
    color: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  searchOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
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
  searchText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
  },
  quickDestinations: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 16,
  },
  destinationCard: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 120,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  destinationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  destinationName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  destinationDistance: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6B7280',
  },
  availableRides: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    maxHeight: 200,
  },
  rideCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rideTypeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rideDetails: {
    flex: 1,
  },
  driverName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  rideStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rideEta: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  rideSeparator: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#D1D5DB',
  },
  rideRating: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#F59E0B',
  },
  ridePrice: {
    alignItems: 'flex-end',
  },
  ridePriceText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E40AF',
  },
});