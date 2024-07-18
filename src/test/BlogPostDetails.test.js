import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom'; // Importing MemoryRouter instead of BrowserRouter
import BlogPostDetails from '../components/BlogPostDetails';
import newsData from '../components/data';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe('BlogPostDetails Component', () => {
  test('renders post details correctly', () => {
    const postId = 0; // Replace with a valid post index
    renderWithRouter(
      <Route path="/post/:id">
        <BlogPostDetails />
      </Route>,
      { route: `/post/${postId}` }
    );

    const post = newsData[postId];
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.author)).toBeInTheDocument();
    expect(screen.getByText(new Date(post.publishedAt).toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText(post.content)).toBeInTheDocument();
  });

  test('renders "Post not found" for invalid post id', () => {
    const invalidPostId = newsData.length; // Out of bounds index
    renderWithRouter(
      <Route path="/post/:id">
        <BlogPostDetails />
      </Route>,
      { route: `/post/${invalidPostId}` }
    );

    expect(screen.getByText('Post not found')).toBeInTheDocument();
  });
});
