import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Phone, MapPin, TriangleAlert as AlertTriangle, Users, Star, MessageCircle, Settings, Eye, CircleCheck as CheckCircle } from 'lucide-react-native';

const emergencyContacts = [
  { name: 'Emergency Services', number: '999', type: 'emergency' },
  { name: 'Police', number: '17999999', type: 'police' },
  { name: 'Waselni Support', number: '17123456', type: 'support' },
];

const safetyFeatures = [
  {
    id: '1',
    title: 'Real-time Tracking',
    titleAr: 'التتبع المباشر',
    description: 'Share your trip with trusted contacts',
    descriptionAr: 'شارك رحلتك مع جهات الاتصال الموثوقة',
    icon: MapPin,
    enabled: true,
  },
  {
    id: '2',
    title: 'Driver Verification',
    titleAr: 'التحقق من السائق',
    description: 'All drivers undergo background checks',
    descriptionAr: 'جميع السائقين يخضعون لفحوصات أمنية',
    icon: CheckCircle,
    enabled: true,
  },
  {
    id: '3',
    title: 'In-app Emergency',
    titleAr: 'الطوارئ داخل التطبيق',
    description: 'Quick access to emergency services',
    descriptionAr: 'وصول سريع لخدمات الطوارئ',
    icon: AlertTriangle,
    enabled: true,
  },
  {
    id: '4',
    title: 'Anonymous Reporting',
    titleAr: 'الإبلاغ المجهول',
    description: 'Report safety concerns anonymously',
    descriptionAr: 'أبلغ عن المخاوف الأمنية بشكل مجهول',
    icon: Eye,
    enabled: false,
  },
];

export default function SafetyScreen() {
  const [isArabic, setIsArabic] = useState(false);
  const [shareLocation, setShareLocation] = useState(true);

  const handleEmergencyCall = (number: string, name: string) => {
    Alert.alert(
      isArabic ? 'اتصال طوارئ' : 'Emergency Call',
      isArabic 
        ? `هل تريد الاتصال بـ ${name}؟`
        : `Do you want to call ${name}?`,
      [
        {
          text: isArabic ? 'إلغاء' : 'Cancel',
          style: 'cancel',
        },
        {
          text: isArabic ? 'اتصل' : 'Call',
          style: 'destructive',
          onPress: () => {
            // In a real app, this would initiate a phone call
            console.log(`Calling ${number}`);
          },
        },
      ]
    );
  };

  const renderEmergencyContact = (contact: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.emergencyButton,
        contact.type === 'emergency' && styles.emergencyButtonPrimary,
      ]}
      onPress={() => handleEmergencyCall(contact.number, contact.name)}
    >
      <Phone 
        size={24} 
        color={contact.type === 'emergency' ? '#FFFFFF' : '#1E40AF'} 
      />
      <View style={styles.emergencyButtonText}>
        <Text style={[
          styles.emergencyButtonTitle,
          contact.type === 'emergency' && styles.emergencyButtonTitlePrimary,
        ]}>
          {contact.name}
        </Text>
        <Text style={[
          styles.emergencyButtonNumber,
          contact.type === 'emergency' && styles.emergencyButtonNumberPrimary,
        ]}>
          {contact.number}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSafetyFeature = (feature: any) => (
    <View key={feature.id} style={styles.featureCard}>
      <View style={styles.featureHeader}>
        <View style={styles.featureIcon}>
          <feature.icon 
            size={20} 
            color={feature.enabled ? '#10B981' : '#6B7280'} 
          />
        </View>
        <View style={styles.featureInfo}>
          <Text style={styles.featureTitle}>
            {isArabic ? feature.titleAr : feature.title}
          </Text>
          <Text style={styles.featureDescription}>
            {isArabic ? feature.descriptionAr : feature.description}
          </Text>
        </View>
        <View style={[
          styles.featureStatus,
          { backgroundColor: feature.enabled ? '#DCFCE7' : '#F3F4F6' }
        ]}>
          <Text style={[
            styles.featureStatusText,
            { color: feature.enabled ? '#16A34A' : '#6B7280' }
          ]}>
            {feature.enabled 
              ? (isArabic ? 'مفعل' : 'Active')
              : (isArabic ? 'معطل' : 'Inactive')
            }
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isArabic ? 'مركز الأمان' : 'Safety Center'}
          </Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#1E40AF" />
          </TouchableOpacity>
        </View>

        {/* Emergency Alert */}
        <View style={styles.emergencyAlert}>
          <View style={styles.emergencyAlertIcon}>
            <Shield size={24} color="#EF4444" />
          </View>
          <View style={styles.emergencyAlertContent}>
            <Text style={styles.emergencyAlertTitle}>
              {isArabic ? 'تأكد من سلامتك' : 'Stay Safe'}
            </Text>
            <Text style={styles.emergencyAlertDescription}>
              {isArabic 
                ? 'استخدم ميزات الأمان أدناه أثناء رحلتك'
                : 'Use the safety features below during your trip'
              }
            </Text>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'جهات الاتصال الطارئة' : 'Emergency Contacts'}
          </Text>
          <View style={styles.emergencyContacts}>
            {emergencyContacts.map(renderEmergencyContact)}
          </View>
        </View>

        {/* Safety Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'ميزات الأمان' : 'Safety Features'}
          </Text>
          <View style={styles.safetyFeatures}>
            {safetyFeatures.map(renderSafetyFeature)}
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'نصائح السلامة' : 'Safety Tips'}
          </Text>
          <View style={styles.safetyTips}>
            <View style={styles.tipCard}>
              <Users size={20} color="#1E40AF" />
              <Text style={styles.tipText}>
                {isArabic 
                  ? 'تحقق من هوية السائق ولوحة المركبة'
                  : 'Verify driver identity and vehicle plate'
                }
              </Text>
            </View>
            <View style={styles.tipCard}>
              <MessageCircle size={20} color="#1E40AF" />
              <Text style={styles.tipText}>
                {isArabic 
                  ? 'شارك تفاصيل رحلتك مع الأصدقاء أو العائلة'
                  : 'Share trip details with friends or family'
                }
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Star size={20} color="#1E40AF" />
              <Text style={styles.tipText}>
                {isArabic 
                  ? 'قيم السائق بعد الرحلة'
                  : 'Rate the driver after your trip'
                }
              </Text>
            </View>
          </View>
        </View>

        {/* Report Issue */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.reportButton}>
            <AlertTriangle size={20} color="#EF4444" />
            <Text style={styles.reportButtonText}>
              {isArabic ? 'أبلغ عن مشكلة أمنية' : 'Report Safety Issue'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Location Sharing Toggle */}
        <View style={styles.locationCard}>
          <View style={styles.locationCardHeader}>
            <MapPin size={20} color="#1E40AF" />
            <Text style={styles.locationCardTitle}>
              {isArabic ? 'مشاركة الموقع' : 'Location Sharing'}
            </Text>
          </View>
          <Text style={styles.locationCardDescription}>
            {isArabic 
              ? 'السماح لجهات الاتصال الموثوقة بتتبع موقعك أثناء الرحلة'
              : 'Allow trusted contacts to track your location during trips'
            }
          </Text>
          <TouchableOpacity 
            style={[
              styles.locationToggle,
              shareLocation && styles.locationToggleActive,
            ]}
            onPress={() => setShareLocation(!shareLocation)}
          >
            <Text style={[
              styles.locationToggleText,
              shareLocation && styles.locationToggleTextActive,
            ]}>
              {shareLocation 
                ? (isArabic ? 'مفعل' : 'Enabled')
                : (isArabic ? 'معطل' : 'Disabled')
              }
            </Text>
          </TouchableOpacity>
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
  emergencyAlert: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  emergencyAlertIcon: {
    marginRight: 12,
  },
  emergencyAlertContent: {
    flex: 1,
  },
  emergencyAlertTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#DC2626',
    marginBottom: 4,
  },
  emergencyAlertDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#7F1D1D',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  emergencyContacts: {
    gap: 12,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 16,
  },
  emergencyButtonPrimary: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  emergencyButtonText: {
    flex: 1,
  },
  emergencyButtonTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 2,
  },
  emergencyButtonTitlePrimary: {
    color: '#FFFFFF',
  },
  emergencyButtonNumber: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  emergencyButtonNumberPrimary: {
    color: '#FEE2E2',
  },
  safetyFeatures: {
    gap: 12,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  featureStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featureStatusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  safetyTips: {
    gap: 12,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 8,
  },
  reportButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#EF4444',
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  locationCardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  locationCardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  locationToggle: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationToggleActive: {
    backgroundColor: '#DCFCE7',
  },
  locationToggleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B7280',
  },
  locationToggleTextActive: {
    color: '#16A34A',
  },
});