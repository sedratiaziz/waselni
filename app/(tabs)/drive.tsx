import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Car, DollarSign, Clock, Users, MapPin, TrendingUp, Settings, Calendar, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react-native';

interface EarningsData {
  today: number;
  week: number;
  month: number;
  rides: number;
  rating: number;
}

const mockEarnings: EarningsData = {
  today: 45.50,
  week: 312.75,
  month: 1247.30,
  rides: 23,
  rating: 4.8,
};

const upcomingRides = [
  {
    id: '1',
    time: '09:30',
    pickup: 'Al-Manama Souq',
    destination: 'University of Bahrain',
    passenger: 'Sara Al-Zahra',
    type: 'minibus',
    price: 2.5,
  },
  {
    id: '2',
    time: '14:15',
    pickup: 'Bahrain Mall',
    destination: 'RCSI Bahrain',
    passenger: 'Ahmed Mohammed',
    type: 'private',
    price: 4.0,
  },
];

export default function DriveScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [isArabic, setIsArabic] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isArabic ? 'لوحة السائق' : 'Driver Dashboard'}
          </Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#1E40AF" />
          </TouchableOpacity>
        </View>

        {/* Online Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusInfo}>
              <View style={[
                styles.statusIndicator,
                { backgroundColor: isOnline ? '#10B981' : '#6B7280' }
              ]} />
              <Text style={styles.statusTitle}>
                {isOnline 
                  ? (isArabic ? 'متصل - جاهز للرحلات' : 'Online - Ready for rides')
                  : (isArabic ? 'غير متصل' : 'Offline')
                }
              </Text>
            </View>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: '#D1D5DB', true: '#10B981' }}
              thumbColor={isOnline ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>
          {isOnline && (
            <Text style={styles.statusDescription}>
              {isArabic 
                ? 'أنت مرئي للطلاب الذين يبحثون عن رحلات'
                : 'You are visible to students looking for rides'
              }
            </Text>
          )}
        </View>

        {/* Earnings Overview */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <Text style={styles.cardTitle}>
              {isArabic ? 'نظرة عامة على الأرباح' : 'Earnings Overview'}
            </Text>
            <TrendingUp size={20} color="#10B981" />
          </View>
          
          <View style={styles.earningsGrid}>
            <View style={styles.earningsItem}>
              <Text style={styles.earningsValue}>{mockEarnings.today} BHD</Text>
              <Text style={styles.earningsLabel}>
                {isArabic ? 'اليوم' : 'Today'}
              </Text>
            </View>
            <View style={styles.earningsItem}>
              <Text style={styles.earningsValue}>{mockEarnings.week} BHD</Text>
              <Text style={styles.earningsLabel}>
                {isArabic ? 'هذا الأسبوع' : 'This Week'}
              </Text>
            </View>
            <View style={styles.earningsItem}>
              <Text style={styles.earningsValue}>{mockEarnings.month} BHD</Text>
              <Text style={styles.earningsLabel}>
                {isArabic ? 'هذا الشهر' : 'This Month'}
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Users size={16} color="#6B7280" />
              <Text style={styles.statText}>
                {mockEarnings.rides} {isArabic ? 'رحلة' : 'rides'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>★ {mockEarnings.rating}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
          </Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <MapPin size={24} color="#1E40AF" />
              <Text style={styles.actionText}>
                {isArabic ? 'تحديد الموقع' : 'Set Location'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Calendar size={24} color="#1E40AF" />
              <Text style={styles.actionText}>
                {isArabic ? 'الجدولة' : 'Schedule'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Car size={24} color="#1E40AF" />
              <Text style={styles.actionText}>
                {isArabic ? 'تفاصيل المركبة' : 'Vehicle Info'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <DollarSign size={24} color="#1E40AF" />
              <Text style={styles.actionText}>
                {isArabic ? 'السحب' : 'Withdraw'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Rides */}
        <View style={styles.upcomingRides}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'الرحلات القادمة' : 'Upcoming Rides'}
          </Text>
          {upcomingRides.map((ride) => (
            <View key={ride.id} style={styles.rideCard}>
              <View style={styles.rideHeader}>
                <View style={styles.rideTime}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.rideTimeText}>{ride.time}</Text>
                </View>
                <View style={styles.rideType}>
                  <Text style={[
                    styles.rideTypeText,
                    { color: ride.type === 'minibus' ? '#F59E0B' : '#1E40AF' }
                  ]}>
                    {ride.type}
                  </Text>
                </View>
              </View>
              
              <View style={styles.rideRoute}>
                <View style={styles.routePoint}>
                  <View style={[styles.routeDot, styles.pickupDot]} />
                  <Text style={styles.routeText}>{ride.pickup}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routePoint}>
                  <View style={[styles.routeDot, styles.destinationDot]} />
                  <Text style={styles.routeText}>{ride.destination}</Text>
                </View>
              </View>

              <View style={styles.rideFooter}>
                <Text style={styles.passengerName}>{ride.passenger}</Text>
                <Text style={styles.ridePrice}>{ride.price} BHD</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Driver Requirements */}
        <View style={styles.requirementsCard}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'متطلبات السائق' : 'Driver Requirements'}
          </Text>
          <View style={styles.requirementsList}>
            <View style={styles.requirementItem}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.requirementText}>
                {isArabic ? 'رخصة قيادة سارية' : 'Valid driving license'}
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.requirementText}>
                {isArabic ? 'فحص أمني مكتمل' : 'Background check completed'}
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <AlertCircle size={20} color="#F59E0B" />
              <Text style={styles.requirementText}>
                {isArabic ? 'تأمين المركبة (معلق)' : 'Vehicle insurance (pending)'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  settingsButton: {
    padding: 8,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  statusDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 24,
  },
  earningsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  earningsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  earningsItem: {
    alignItems: 'center',
  },
  earningsValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#1E40AF',
    marginBottom: 4,
  },
  earningsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  ratingContainer: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#F59E0B',
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1F2937',
    marginTop: 8,
    textAlign: 'center',
  },
  upcomingRides: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rideTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rideTimeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
  },
  rideType: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rideTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  rideRoute: {
    marginBottom: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 2,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pickupDot: {
    backgroundColor: '#10B981',
  },
  destinationDot: {
    backgroundColor: '#EF4444',
  },
  routeLine: {
    width: 1,
    height: 16,
    backgroundColor: '#D1D5DB',
    marginLeft: 4,
    marginVertical: 2,
  },
  routeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passengerName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  ridePrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E40AF',
  },
  requirementsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  requirementsList: {
    gap: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  requirementText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
});