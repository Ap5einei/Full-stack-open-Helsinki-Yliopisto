import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export type Repository = {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
};

type Props = {
  item: Repository;
};

const formatNumber = (num: number) =>
  num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();

const RepositoryItem: React.FC<Props> = ({ item }) => (
  <View testID="repositoryItem" style={styles.container}>
    <View style={styles.header}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.stats}>
      <View style={styles.statItem}>
        <Text style={styles.statCount}>{formatNumber(item.stargazersCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statCount}>{formatNumber(item.forksCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statCount}>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statCount}>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#555',
    marginBottom: 4,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    fontSize: 12,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontWeight: 'bold',
  },
});

export default RepositoryItem;
