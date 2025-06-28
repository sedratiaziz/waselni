import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft,
  MapPin,
  Search,
  Clock,
  Users,
  CreditCard,
  Calendar,
  Star
} from 'lucide-react-native';
import { router } from 'expo-router';

const mockDestinations = [
  { name: 'University of Bahrain', nameAr: 'جامعة البحرين', type: 'university' },
  { name: 'Bahrain Polytechnic', nameAr: 'بوليتكنك البحرين', type: 'university' },
  { name: 'RCSI Bahrain', nameAr: 'الكلية الملكية للجراحين', type: 'university' },
  { name: 'AMA International University', nameAr: 'جامعة أما الدولية', type: 'university' },
  { name: 'City Centre Bahrain', nameAr: 'سيتي سنتر البحرين', type: 'mall' },
  { name: 'Seef Mall', nameAr: 'سيف مول', type: 'mall' },
];

const vehicleTypes = [
  {
    id: 'minibus',
    name: 'Minibus',
    nameAr: 'حافلة صغيرة',
    price: 2.5,
    capacity: '8-12 passengers',
    eta: '5-8 min',
    color: '#F59E0B',
  },
  {
    id: 'private',
    name: 'Private Car',
    nameAr: 'سيارة خاصة',
    price: 4.0,
    capacity: '1-4 passengers',
    eta: '3-6 min',
    color: '#1E40AF',
  },
  {
    id: 'volunteer',
    name: 'Volunteer',
    nameAr: 'متطوع',
    price: 0,
    capacity: '1-3 passengers',
    eta: '10-15 min',
    color: '#10B981',
  },
];

export default function BookingScreen() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('minibus');
  const [scheduleRide, setScheduleRide] = useState(false);
  const [isArabic, setIsArabic] = useState(false);

  const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isArabic ? 'احجز رحلة' : 'Book a Ride'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Location Inputs */}
        <View style={styles.locationSection}>
          <View style={styles.locationInputContainer}>
            <View style={styles.locationDots}>
              <View style={[styles.locationDot, styles.fromDot]} />
              <View style={styles.locationLine} />
              <View style={[styles.locationDot, styles.toDot]} />
            </View>
            <View style={styles.locationInputs}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.locationInput}
                  placeholder={isArabic ? 'من أين؟' : 'From where?'}
                  value={fromLocation}
                  onChangeText={setFromLocation}
                  placeholderTextColor="#9CA3AF"
                />
                <MapPin size={20} color="#6B7280" />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.locationInput}
                  placeholder={isArabic ? 'إلى أين؟' : 'Where to?'}
                  value={toLocation}
                  onChangeText={setToLocation}
                  placeholderTextColor="#9CA3AF"
                />
                <Search size={20} color="#6B7280" />
              </View>
            </View>
          </View>
        </View>

        {/* Quick Destinations */}
        <View style={styles.quickDestinations}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'وجهات سريعة' : 'Quick Destinations'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockDestinations.map((destination, index) => (
              <TouchableOpacity
                key={index}
                style={styles.destinationChip}
                onPress={() => setToLocation(destination.name)}
              >
                <Text style={styles.destinationChipText}>
                  {isArabic ? destination.nameAr : destination.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Vehicle Selection */}
        <View style={styles.vehicleSection}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'اختر نوع المركبة' : 'Choose Vehicle Type'}
          </Text>
          {vehicleTypes.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleCard,
                selectedVehicle === vehicle.id && styles.vehicleCardSelected,
              ]}
              onPress={() => setSelectedVehicle(vehicle.id)}
            >
              <View style={styles.vehicleInfo}>
                <View style={[
                  styles.vehicleIcon,
                  { backgroundColor: `${vehicle.color}20` }
                ]}>
                  <Text style={[styles.vehicleIconText, { color: vehicle.color }]}>
                    {vehicle.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.vehicleDetails}>
                  <Text style={styles.vehicleName}>
                    {isArabic ? vehicle.nameAr : vehicle.name}
                  </Text>
                  <Text style={styles.vehicleCapacity}>{vehicle.capacity}</Text>
                  <View style={styles.vehicleStats}>
                    <Clock size={14} color="#6B7280" />
                    <Text style={styles.vehicleEta}>{vehicle.eta}</Text>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.vehicleRating}>4.8</Text>
                  </View>
                </View>
              </View>
              <View style={styles.vehiclePrice}>
                <Text style={styles.vehiclePriceText}>
                  {vehicle.price === 0 
                    ? (isArabic ? 'مجاني' : 'Free')
                    : `${vehicle.price} BHD`
                  }
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Schedule Options */}
        <View style={styles.scheduleSection}>
          <View style={styles.scheduleHeader}>
            <Text style={styles.sectionTitle}>
              {isArabic ? 'خيارات الجدولة' : 'Schedule Options'}
            </Text>
            <TouchableOpacity
              style={[
                styles.scheduleToggle,
                scheduleRide && styles.scheduleToggleActive,
              ]}
              onPress={() => setScheduleRide(!scheduleRide)}
            >
              <Text style={[
                styles.scheduleToggleText,
                scheduleRide && styles.scheduleToggleTextActive,
              ]}>
                {scheduleRide 
                  ? (isArabic ? 'مجدول' : 'Scheduled')
                  : (isArabic ? 'الآن' : 'Now')
                }
              </Text>
            </TouchableOpacity>
          </View>

          {scheduleRide && (
            <View style={styles.scheduleOptions}>
              <TouchableOpacity style={styles.scheduleOption}>
                <Calendar size={20} color="#1E40AF" />
                <Text style={styles.scheduleOptionText}>
                  {isArabic ? 'اختر التاريخ والوقت' : 'Select Date & Time'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Payment Method */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'طريقة الدفع' : 'Payment Method'}
          </Text>
          <TouchableOpacity style={styles.paymentMethod}>
            <CreditCard size={20} color="#1E40AF" />
            <Text style={styles.paymentMethodText}>
              {isArabic ? 'بطاقة ائتمان ****1234' : 'Credit Card ****1234'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trip Summary */}
        <View style={styles.tripSummary}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'ملخص الرحلة' : 'Trip Summary'}
          </Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {isArabic ? 'نوع المركبة' : 'Vehicle Type'}
              </Text>
              <Text style={styles.summaryValue}>
                {isArabic ? selectedVehicleData?.nameAr : selectedVehicleData?.name}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {isArabic ? 'الوقت المتوقع' : 'Estimated Time'}
              </Text>
              <Text style={styles.summaryValue}>{selectedVehicleData?.eta}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {isArabic ? 'السعر' : 'Price'}
              </Text>
              <Text style={[styles.summaryValue, styles.summaryPrice]}>
                {selectedVehicleData?.price === 0 
                  ? (isArabic ? 'مجاني' : 'Free')
                  : `${selectedVehicleData?.price} BHD`
                }
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push('/trip')}
        >
          <Text style={styles.bookButtonText}>
            {isArabic ? 'تأكيد الحجز' : 'Confirm Booking'}
          </Text>
        </TouchableOpacity>
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
  locationSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDots: {
    alignItems: 'center',
    marginRight: 16,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  fromDot: {
    backgroundColor: '#10B981',
  },
  toDot: {
    backgroundColor: '#EF4444',
  },
  locationLine: {
    width: 2,
    height: 40,
    backgroundColor: '#D1D5DB',
    marginVertical: 8,
  },
  locationInputs: {
    flex: 1,
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  quickDestinations: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  destinationChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  destinationChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  vehicleSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  vehicleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  vehicleCardSelected: {
    borderColor: '#1E40AF',
    backgroundColor: '#EFF6FF',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  vehicleIconText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  vehicleCapacity: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  vehicleStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vehicleEta: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  vehicleRating: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#F59E0B',
  },
  vehiclePrice: {
    alignItems: 'flex-end',
  },
  vehiclePriceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E40AF',
  },
  scheduleSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleToggle: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scheduleToggleActive: {
    backgroundColor: '#1E40AF',
  },
  scheduleToggleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#6B7280',
  },
  scheduleToggleTextActive: {
    color: '#FFFFFF',
  },
  scheduleOptions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scheduleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  scheduleOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  paymentSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  paymentMethodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  tripSummary: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
  },
  summaryPrice: {
    color: '#1E40AF',
    fontSize: 16,
  },
  bottomAction: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  bookButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});