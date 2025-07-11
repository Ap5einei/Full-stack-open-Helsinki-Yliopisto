module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-native-community|@react-native-picker|@react-native-segmented-control/segmented-control)"
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
