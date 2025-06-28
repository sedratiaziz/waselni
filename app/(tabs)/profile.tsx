import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Phone, CreditCard, Settings, CircleHelp as HelpCircle, Shield, Star, ChevronRight, CreditCard as Edit, Globe, Bell, Lock } from 'lucide-react-native';

const profileData = {
  name: 'Sara Al-Zahra',
  nameAr: 'سارة الزهراء',
  email: 'sara.alzahra@uob.edu.bh',
  phone: '+973 3612 3456',
  university: 'University of Bahrain',
  universityAr: 'جامعة البحرين',
  studentId: 'UOB2024-CS-1234',
  rating: 4.9,
  trips: 47,
  memberSince: 'January 2024',
};

const menuItems = [
  {
    id: '1',
    title: 'Payment Methods',
    titleAr: 'طرق الدفع',
    icon: CreditCard,
    screen: 'payment',
    hasChevron: true,
  },
  {
    id: '2',
    title: 'Notifications',
    titleAr: 'الإشعارات',
    icon: Bell,
    screen: 'notifications',
    hasChevron: true,
  },
  {
    id: '3',
    title: 'Privacy & Security',
    titleAr: 'الخصوصية والأمان',
    icon: Lock,
    screen: 'privacy',
    hasChevron: true,
  },
  {
    id: '4',
    title: 'Language',
    titleAr: 'اللغة',
    icon: Globe,
    screen: 'language',
    hasChevron: true,
  },
  {
    id: '5',
    title: 'Help & Support',
    titleAr: 'المساعدة والدعم',
    icon: HelpCircle,
    screen: 'help',
    hasChevron: true,
  },
  {
    id: '6',
    title: 'Settings',
    titleAr: 'الإعدادات',
    icon: Settings,
    screen: 'settings',
    hasChevron: true,
  },
];

export default function ProfileScreen() {
  const [isArabic, setIsArabic] = useState(false);

  const renderMenuItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIcon}>
          <item.icon size={20} color="#1E40AF" />
        </View>
        <Text style={styles.menuItemText}>
          {isArabic ? item.titleAr : item.title}
        </Text>
      </View>
      {item.hasChevron && (
        <ChevronRight size={20} color="#6B7280" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isArabic ? 'الملف الشخصي' : 'Profile'}
          </Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#1E40AF" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1'
              }}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <Shield size={16} color="#FFFFFF" />
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {isArabic ? profileData.nameAr : profileData.name}
            </Text>
            <Text style={styles.profileUniversity}>
              {isArabic ? profileData.universityAr : profileData.university}
            </Text>
            <Text style={styles.profileStudentId}>
              {profileData.studentId}
            </Text>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profileData.rating}</Text>
              <View style={styles.statLabel}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.statText}>
                  {isArabic ? 'تقييم' : 'Rating'}
                </Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profileData.trips}</Text>
              <Text style={styles.statText}>
                {isArabic ? 'رحلة' : 'Trips'}
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'معلومات الاتصال' : 'Contact Information'}
          </Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Mail size={20} color="#6B7280" />
              <Text style={styles.contactText}>{profileData.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Phone size={20} color="#6B7280" />
              <Text style={styles.contactText}>{profileData.phone}</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isArabic ? 'الإعدادات' : 'Settings'}
          </Text>
          <View style={styles.menuContainer}>
            {menuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Account Status */}
        <View style={styles.accountStatus}>
          <View style={styles.statusHeader}>
            <Shield size={20} color="#10B981" />
            <Text style={styles.statusTitle}>
              {isArabic ? 'حساب موثق' : 'Verified Account'}
            </Text>
          </View>
          <Text style={styles.statusDescription}>
            {isArabic 
              ? 'تم التحقق من هويتك الجامعية'
              : 'Your university identity has been verified'
            }
          </Text>
          <Text style={styles.memberSince}>
            {isArabic 
              ? `عضو منذ ${profileData.memberSince}`
              : `Member since ${profileData.memberSince}`
            }
          </Text>
        </View>

        {/* App Version */}
        <View style={styles.appVersion}>
          <Text style={styles.versionText}>
            {isArabic ? 'إصدار التطبيق' : 'App Version'} 1.0.0
          </Text>
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#1E40AF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 4,
  },
  profileUniversity: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E40AF',
    marginBottom: 4,
  },
  profileStudentId: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
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
  contactInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  accountStatus: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statusTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#10B981',
  },
  statusDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  memberSince: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  appVersion: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
});