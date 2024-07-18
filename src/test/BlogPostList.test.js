// import { render, screen } from '@testing-library/react';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import { BrowserRouter as Router } from 'react-router-dom';
// import BlogPostList from '../components/BlogPostList';

// test('renders BlogPostList component and fetches posts', async () => {
//   const mock = new MockAdapter(axios);
//   const mockData = {
//     articles: [
//       {
//         title: 'Test Post 1',
//         description: 'This is a test description for post 1',
//         publishedAt: '2024-07-16T00:00:00Z',
//         urlToImage: 'test-image-url-1',
//       },
//       {
//         title: 'Test Post 2',
//         description: 'This is a test description for post 2',
//         publishedAt: '2024-07-16T00:00:00Z',
//         urlToImage: 'test-image-url-2',
//       },
//     ],
//     totalResults: 2,
//   };
  
//   mock.onGet(/newsapi\.org\/v2\/everything/).reply(200, mockData);

//   render(
//     <Router>
//       <BlogPostList />
//     </Router>
//   );
  
//   expect(await screen.findByText('Test Post 1')).toBeInTheDocument();
//   expect(await screen.findByText('Test Post 2')).toBeInTheDocument();
// });

import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogPostList from '../components/BlogPostList';
import newsData from '../components/data';

describe('BlogPostList Component', () => {
  test('renders the correct number of posts per page', () => {
    act(() => {
      render(
        <Router>
          <BlogPostList />
        </Router>
      );
    });

    const posts = screen.getAllByRole('heading', { level: 5 });
    expect(posts.length).toBeLessThanOrEqual(20);
  });

  test('navigates to the next and previous pages', () => {
    act(() => {
      render(
        <Router>
          <BlogPostList />
        </Router>
      );
    });

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeEnabled();

    fireEvent.click(previousButton);
    expect(previousButton).toBeDisabled();
  });

  test('disables Next button on the last page', () => {
    act(() => {
      render(
        <Router>
          <BlogPostList />
        </Router>
      );
    });

    const nextButton = screen.getByText('Next');
    for (let i = 0; i < Math.ceil(newsData.length / 20); i++) {
      fireEvent.click(nextButton);
    }

    expect(nextButton).toBeDisabled();
  });
});


