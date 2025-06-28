const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver configuration for web platform
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Configure resolver to handle native-only modules on web
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Add platform-specific extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'];

// Configure resolver to return empty modules for native-only packages on web
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Handle native-only modules that might cause issues on web
  const nativeOnlyModules = [
    '@react-native-community/geolocation',
    'react-native-device-info',
    'react-native-permissions',
  ];

  if (platform === 'web' && nativeOnlyModules.some(mod => moduleName.startsWith(mod))) {
    // Return a mock module path for web
    return {
      filePath: __dirname + '/node_modules/react-native-web/dist/index.js',
      type: 'sourceFile',
    };
  }

  // Use default resolver for everything else
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;