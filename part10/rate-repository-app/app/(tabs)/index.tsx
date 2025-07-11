import { View, Text, StyleSheet, Platform, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        style={styles.reactLogo}
      />
      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Step 1: Try it</Text>
        <Text>
          Edit <Text style={styles.bold}>app/index.tsx</Text> to see changes. Press{' '}
          <Text style={styles.bold}>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Step 2: Explore</Text>
        <Text>
          Tap the Explore tab to learn more about what's included in this starter app.
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Step 3: Get a fresh start</Text>
        <Text>
          When you're ready, run <Text style={styles.bold}>npm run reset-project</Text> to get a fresh{' '}
          <Text style={styles.bold}>app</Text> directory. This will move the current{' '}
          <Text style={styles.bold}>app</Text> to <Text style={styles.bold}>app-example</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stepContainer: {
    marginVertical: 8,
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  reactLogo: {
    height: 64,
    width: 64,
    marginBottom: 16,
  },
});
