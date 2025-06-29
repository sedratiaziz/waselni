import React from 'react';
import { Platform } from 'react-native';

// Conditionally import react-native-maps only on native platforms
let MapView, Marker, PROVIDER_GOOGLE;

if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
} else {
  // Provide web fallbacks
  MapView = ({ children, ...props }) => (
    <div style={{ width: '100%', height: 400, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Map not available on web platform</p>
    </div>
  );
  Marker = ({ children, ...props }) => null;
  PROVIDER_GOOGLE = null;
}

export { MapView, Marker, PROVIDER_GOOGLE };