import React from 'react';
import { render, screen } from '@testing-library/react-native';
import RepositoryListContainer from '../components/RepositoryList';

describe('RepositoryList', () => {
  it('renders repository information correctly', () => {
    const repositories = {
      edges: [
        {
          node: {
            id: '1',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/4060187?v=4',
          },
        },
        {
          node: {
            id: '2',
            fullName: 'rails/rails',
            description: 'Ruby on Rails',
            language: 'Ruby',
            forksCount: 18349,
            stargazersCount: 45377,
            ratingAverage: 100,
            reviewCount: 2,
            ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/4223?v=4',
          },
        },
      ],
    };

    render(<RepositoryListContainer repositories={repositories} />);
    const items = screen.getAllByTestId('repositoryItem');
    expect(items).toHaveLength(2);
    expect(screen.getByText('jaredpalmer/formik')).toBeTruthy();
    expect(screen.getByText('rails/rails')).toBeTruthy();
    expect(screen.getByText('Build forms in React, without the tears')).toBeTruthy();
    expect(screen.getByText('Ruby on Rails')).toBeTruthy();
    expect(screen.getByText('TypeScript')).toBeTruthy();
    expect(screen.getByText('Ruby')).toBeTruthy();
    expect(screen.getByText('1.6k')).toBeTruthy();
    expect(screen.getByText('18.3k')).toBeTruthy();
    expect(screen.getByText('21.9k')).toBeTruthy();
    expect(screen.getByText('45.4k')).toBeTruthy();
    expect(screen.getByText('88')).toBeTruthy();
    expect(screen.getByText('100')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
  });
});
