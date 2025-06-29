import React from 'react';
import { Platform } from 'react-native';

// Use Platform.select to conditionally import react-native-maps
const MapComponents = Platform.select({
  native: () => require('react-native-maps'),
  default: () => null,
});

// Initialize components based on platform
let MapView, Marker, PROVIDER_GOOGLE;

if (Platform.OS !== 'web' && MapComponents) {
  const Maps = MapComponents();
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
} else {
  // Provide web fallbacks
  MapView = ({ children, ...props }) => (
    <div style={{ 
      width: '100%', 
      height: 400, 
      backgroundColor: '#f0f0f0', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      borderRadius: 8,
      border: '1px solid #ddd'
    }}>
      <p style={{ color: '#666', fontSize: 16 }}>Map not available on web platform</p>
    </div>
  );
  Marker = ({ children, ...props }) => null;
  PROVIDER_GOOGLE = null;
}

export { MapView, Marker, PROVIDER_GOOGLE };