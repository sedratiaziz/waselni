import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { MapPin, Navigation, Zap } from 'lucide-react-native';

interface MapComponentProps {
  style?: any;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  showsUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  children?: React.ReactNode;
  provider?: any;
}

interface MarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

// Enhanced web-compatible map component
const WebMapView: React.FC<MapComponentProps> = ({ 
  style, 
  initialRegion, 
  children,
  showsUserLocation = false,
  showsMyLocationButton = false
}) => {
  const [markers, setMarkers] = React.useState<MarkerProps[]>([]);

  // Extract markers from children
  React.useEffect(() => {
    if (children) {
      const childrenArray = React.Children.toArray(children);
      const markerData = childrenArray
        .filter((child: any) => child.type === WebMarker)
        .map((child: any) => child.props);
      setMarkers(markerData);
    }
  }, [children]);

  return (
    <View style={[styles.webMapContainer, style]}>
      {/* Map Header */}
      <View style={styles.webMapHeader}>
        <View style={styles.webMapHeaderLeft}>
          <MapPin size={16} color="#1E40AF" />
          <Text style={styles.webMapTitle}>Interactive Map</Text>
        </View>
        {showsMyLocationButton && (
          <TouchableOpacity style={styles.webLocationButton}>
            <Navigation size={16} color="#1E40AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Map Content */}
      <View style={styles.webMapContent}>
        {/* Background Grid Pattern */}
        <View style={styles.webMapGrid}>
          {Array.from({ length: 100 }, (_, i) => (
            <View key={i} style={styles.webMapGridItem} />
          ))}
        </View>

        {/* Location Info */}
        <View style={styles.webMapInfo}>
          <Text style={styles.webMapCoordinates}>
            {initialRegion ? 
              `${initialRegion.latitude.toFixed(4)}°, ${initialRegion.longitude.toFixed(4)}°` : 
              '26.2285°, 50.5860°'
            }
          </Text>
          <Text style={styles.webMapLocation}>Manama, Bahrain</Text>
        </View>

        {/* User Location Indicator */}
        {showsUserLocation && (
          <View style={styles.webUserLocation}>
            <View style={styles.webUserLocationDot} />
            <View style={styles.webUserLocationPulse} />
          </View>
        )}

        {/* Markers */}
        {markers.map((marker, index) => (
          <View key={index} style={[styles.webMarkerContainer, {
            left: `${50 + (index * 10)}%`,
            top: `${40 + (index * 8)}%`,
          }]}>
            {marker.children || (
              <View style={styles.webMarkerDefault}>
                <MapPin size={20} color="#FFFFFF" />
              </View>
            )}
            {marker.title && (
              <View style={styles.webMarkerTooltip}>
                <Text style={styles.webMarkerTitle}>{marker.title}</Text>
                {marker.description && (
                  <Text style={styles.webMarkerDescription}>{marker.description}</Text>
                )}
              </View>
            )}
          </View>
        ))}

        {/* Roads/Paths */}
        <View style={styles.webMapRoads}>
          <View style={[styles.webMapRoad, styles.webMapRoadHorizontal]} />
          <View style={[styles.webMapRoad, styles.webMapRoadVertical]} />
        </View>
      </View>

      {/* Map Footer */}
      <View style={styles.webMapFooter}>
        <View style={styles.webMapControls}>
          <TouchableOpacity style={styles.webMapControl}>
            <Text style={styles.webMapControlText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.webMapControl}>
            <Text style={styles.webMapControlText}>−</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.webMapAttribution}>
          <Text style={styles.webMapAttributionText}>Web Map View</Text>
        </View>
      </View>
    </View>
  );
};

// Enhanced web-compatible marker component
const WebMarker: React.FC<MarkerProps> = ({ 
  coordinate, 
  title, 
  description, 
  children 
}) => {
  // This component is used for data extraction in WebMapView
  // The actual rendering is handled by WebMapView
  return null;
};

// Platform-specific exports
let MapView: React.FC<MapComponentProps>;
let Marker: React.FC<MarkerProps>;
let PROVIDER_GOOGLE: any;

if (Platform.OS === 'web') {
  MapView = WebMapView;
  Marker = WebMarker;
  PROVIDER_GOOGLE = undefined;
} else {
  // Dynamically import react-native-maps only on native platforms
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default || Maps.MapView;
    Marker = Maps.Marker;
    PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
  } catch (error) {
    // Fallback to web components if react-native-maps is not available
    MapView = WebMapView;
    Marker = WebMarker;
    PROVIDER_GOOGLE = undefined;
  }
}

export { MapView, Marker, PROVIDER_GOOGLE };

const styles = StyleSheet.create({
  webMapContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  webMapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  webMapHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  webMapTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  webLocationButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webMapContent: {
    flex: 1,
    position: 'relative',
    minHeight: 200,
    backgroundColor: '#F3F4F6',
  },
  webMapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0.1,
  },
  webMapGridItem: {
    width: '10%',
    aspectRatio: 1,
    borderWidth: 0.5,
    borderColor: '#9CA3AF',
  },
  webMapInfo: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  webMapCoordinates: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  webMapLocation: {
    fontSize: 11,
    color: '#6B7280',
  },
  webUserLocation: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -8 }, { translateY: -8 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  webUserLocationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1E40AF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    zIndex: 2,
  },
  webUserLocationPulse: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E40AF',
    opacity: 0.2,
    zIndex: 1,
  },
  webMarkerContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  webMarkerDefault: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  webMarkerTooltip: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minWidth: 100,
    alignItems: 'center',
  },
  webMarkerTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  webMarkerDescription: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
    textAlign: 'center',
  },
  webMapRoads: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  webMapRoad: {
    position: 'absolute',
    backgroundColor: '#D1D5DB',
    opacity: 0.6,
  },
  webMapRoadHorizontal: {
    height: 3,
    width: '80%',
    top: '60%',
    left: '10%',
  },
  webMapRoadVertical: {
    width: 3,
    height: '70%',
    left: '70%',
    top: '15%',
  },
  webMapFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  webMapControls: {
    flexDirection: 'row',
    gap: 8,
  },
  webMapControl: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  webMapControlText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  webMapAttribution: {
    opacity: 0.7,
  },
  webMapAttributionText: {
    fontSize: 10,
    color: '#6B7280',
  },
});