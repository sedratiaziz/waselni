import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Mail, Lock, User, Phone, GraduationCap, Eye, EyeOff } from 'lucide-react-native';
import { useAuthContext } from '@/components/AuthProvider';

export default function SignupScreen() {
  const { signUp } = useAuthContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    fullNameAr: '',
    phone: '',
    university: '',
    universityAr: '',
    studentId: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!formData.email || !formData.password || !formData.fullName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(formData.email, formData.password, {
      fullName: formData.fullName,
      fullNameAr: formData.fullNameAr,
      phone: formData.phone,
      university: formData.university,
      universityAr: formData.universityAr,
      studentId: formData.studentId,
      userType: 'student',
    });
    setIsLoading(false);

    if (error) {
      Alert.alert('Signup Failed', error.message);
    } else {
      Alert.alert(
        'Success',
        'Account created successfully! Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
      );
    }
  };

  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Waselni and start your journey</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="Email *"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <User size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="Full Name *"
                value={formData.fullName}
                onChangeText={(value) => updateFormData('fullName', value)}
                autoComplete="name"
              />
            </View>

            <View style={styles.inputContainer}>
              <User size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="Full Name (Arabic)"
                value={formData.fullNameAr}
                onChangeText={(value) => updateFormData('fullNameAr', value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Phone size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            </View>

            <View style={styles.inputContainer}>
              <GraduationCap size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="University"
                value={formData.university}
                onChangeText={(value) => updateFormData('university', value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <GraduationCap size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="University (Arabic)"
                value={formData.universityAr}
                onChangeText={(value) => updateFormData('universityAr', value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <User size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="Student ID"
                value={formData.studentId}
                onChangeText={(value) => updateFormData('studentId', value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="Password *"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password *"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <Text style={styles.signupButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  eyeButton: {
    padding: 4,
  },
  signupButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E40AF',
  },
});