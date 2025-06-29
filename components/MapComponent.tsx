import React from 'react';
import { Platform } from 'react-native';

// Import react-native-maps directly since this file is only for native platforms
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// Re-export the native components
export { MapView, Marker, PROVIDER_GOOGLE };