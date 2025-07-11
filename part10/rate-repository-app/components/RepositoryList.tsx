import React from 'react';
import { FlatList } from 'react-native';
import RepositoryItem, { Repository } from './RepositoryItem';

type RepositoryEdge = {
  node: Repository;
};

type Props = {
  repositories: {
    edges: RepositoryEdge[];
  };
};

const RepositoryListContainer: React.FC<Props> = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryListContainer;
