import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    user: { username: 'testuser', name: 'Test User' }
  }

  render(<Blog blog={blog} />)
  expect(screen.getByText('Test Blog')).toBeDefined()
  expect(screen.getByText('Test Author')).toBeDefined()
})
