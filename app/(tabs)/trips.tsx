import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Calendar,
  Clock,
  MapPin,
  User,
  Star,
  ArrowRight,
  Filter,
  Plus
} from 'lucide-react-native';
import { router } from 'expo-router';

interface Trip {
  id: string;
  date: string;
  time: string;
  from: string;
  to: string;
  driver: string;
  type: 'minibus' | 'private' | 'volunteer';
  status: 'completed' | 'upcoming' | 'cancelled';
  price: number;
  rating?: number;
}

const mockTrips: Trip[] = [
  {
    id: '1',
    date: '2024-01-15',
    time: '08:30',
    from: 'Al-Manama Souq',
    to: 'University of Bahrain',
    driver: 'Ahmed Al-Mansouri',
    type: 'minibus',
    status: 'upcoming',
    price: 2.5,
  },
  {
    id: '2',
    date: '2024-01-14',
    time: '14:15',
    from: 'University of Bahrain',
    to: 'Seef Mall',
    driver: 'Fatima Al-Khalifa',
    type: 'private',
    status: 'completed',
    price: 4.0,
    rating: 5,
  },
  {
    id: '3',
    date: '2024-01-13',
    time: '09:00',
    from: 'Adliya',
    to: 'Bahrain Polytechnic',
    driver: 'Omar Hassan',
    type: 'volunteer',
    status: 'completed',
    price: 0,
    rating: 4,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming':
      return '#F59E0B';
    case 'completed':
      return '#10B981';
    case 'cancelled':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};

const getTypeColor = (type: string) => {
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

export default function TripsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [isArabic, setIsArabic] = useState(false);

  const filteredTrips = mockTrips.filter(trip => 
    activeTab === 'upcoming' ? trip.status === 'upcoming' : trip.status === 'completed'
  );

  const renderTripCard = ({ item }: { item: Trip }) => (
    <TouchableOpacity style={styles.tripCard}>
      <View style={styles.tripHeader}>
        <View style={styles.tripDate}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.tripDateText}>
            {new Date(item.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </Text>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.tripTimeText}>{item.time}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: `${getStatusColor(item.status)}20` }
        ]}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(item.status) }
          ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.tripRoute}>
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, styles.routeDotStart]} />
          <Text style={styles.routeLocation}>{item.from}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, styles.routeDotEnd]} />
          <Text style={styles.routeLocation}>{item.to}</Text>
        </View>
      </View>

      <View style={styles.tripDetails}>
        <View style={styles.driverInfo}>
          <User size={16} color="#6B7280" />
          <Text style={styles.driverName}>{item.driver}</Text>
          <View style={[
            styles.tripTypeBadge,
            { backgroundColor: `${getTypeColor(item.type)}20` }
          ]}>
            <Text style={[
              styles.tripTypeText,
              { color: getTypeColor(item.type) }
            ]}>
              {item.type}
            </Text>
          </View>
        </View>
        
        <View style={styles.tripMeta}>
          {item.rating && (
            <View style={styles.rating}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          )}
          <Text style={styles.tripPrice}>
            {item.price === 0 ? (isArabic ? 'مجاني' : 'Free') : `${item.price} BHD`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>
            {isArabic ? 'رحلاتي' : 'My Trips'}
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#1E40AF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.newTripButton}
              onPress={() => router.push('/booking')}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'upcoming' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText,
            ]}>
              {isArabic ? 'القادمة' : 'Upcoming'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'completed' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}>
              {isArabic ? 'المكتملة' : 'Completed'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Trip List */}
      <FlatList
        data={filteredTrips}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tripList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Calendar size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>
              {isArabic 
                ? activeTab === 'upcoming' 
                  ? 'لا توجد رحلات قادمة' 
                  : 'لا توجد رحلات مكتملة'
                : activeTab === 'upcoming'
                  ? 'No upcoming trips'
                  : 'No completed trips'
              }
            </Text>
            <Text style={styles.emptyDescription}>
              {isArabic
                ? 'ابدأ رحلتك الأولى الآن'
                : 'Start your first trip now'
              }
            </Text>
            <TouchableOpacity 
              style={styles.startTripButton}
              onPress={() => router.push('/booking')}
            >
              <Text style={styles.startTripText}>
                {isArabic ? 'احجز رحلة' : 'Book a Ride'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
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
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newTripButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1E40AF',
  },
  tripList: {
    padding: 20,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tripDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tripDateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  tripTimeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  tripRoute: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeDotStart: {
    backgroundColor: '#10B981',
  },
  routeDotEnd: {
    backgroundColor: '#EF4444',
  },
  routeLine: {
    width: 1,
    height: 20,
    backgroundColor: '#D1D5DB',
    marginLeft: 4,
    marginVertical: 2,
  },
  routeLocation: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  driverName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  tripTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tripTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    textTransform: 'capitalize',
  },
  tripMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#F59E0B',
  },
  tripPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E40AF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  startTripButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  startTripText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});