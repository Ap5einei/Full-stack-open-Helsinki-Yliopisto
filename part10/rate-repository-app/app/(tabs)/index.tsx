import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from '../../components/RepositoryList';

export default function HomeScreen() {
  const { repositories, loading, error } = useRepositories();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error!</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tervetuloa Full Stack Open Osa 10 -projektiin!</Text>
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});
