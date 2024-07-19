// import { render, screen } from '@testing-library/react';
// import React from 'react';
// import { MemoryRouter, Route } from 'react-router-dom'; // Importing MemoryRouter instead of BrowserRouter
// import BlogPostDetails from '../components/BlogPostDetails';
// import newsData from '../components/data';

// const renderWithRouter = (ui, { route = '/' } = {}) => {
//   window.history.pushState({}, 'Test page', route);

//   return render(
//     <MemoryRouter initialEntries={[route]}>
//       {ui}
//     </MemoryRouter>
//   );
// };

// describe('BlogPostDetails Component', () => {
//   test('renders post details correctly', () => {
//     const postId = 0; // Replace with a valid post index
//     renderWithRouter(
//       <Route path="/post/:id">
//         <BlogPostDetails />
//       </Route>,
//       { route: `/post/${postId}` }
//     );

//     const post = newsData[postId];
//     expect(screen.getByText(post.title)).toBeInTheDocument();
//     expect(screen.getByText(post.author)).toBeInTheDocument();
//     expect(screen.getByText(new Date(post.publishedAt).toLocaleDateString())).toBeInTheDocument();
//     expect(screen.getByText(post.content)).toBeInTheDocument();
//   });

//   test('renders "Post not found" for invalid post id', () => {
//     const invalidPostId = newsData.length; // Out of bounds index
//     renderWithRouter(
//       <Route path="/post/:id">
//         <BlogPostDetails />
//       </Route>,
//       { route: `/post/${invalidPostId}` }
//     );

//     expect(screen.getByText('Post not found')).toBeInTheDocument();
//   });
// });

// import { render, screen } from '@testing-library/react';
// import React from 'react';
// import { MemoryRouter, Route } from 'react-router-dom'; // Importing MemoryRouter and Route
// import BlogPostDetails from '../components/BlogPostDetails';
// import newsData from '../components/data'; // Example data source

// // Helper function to render component with Router context
// const renderWithRouter = (ui, { route = '/' } = {}) => {
//   window.history.pushState({}, 'Test page', route);

//   return render(
//     <MemoryRouter initialEntries={[route]}>
//       {ui}
//     </MemoryRouter>
//   );
// };

// describe('BlogPostDetails Component', () => {
//   test('renders post details correctly', () => {
//     const postId = 0; // Replace with a valid post index
//     renderWithRouter(
//       <Route path="/post/:id">
//         <BlogPostDetails />
//       </Route>,
//       { route: `/post/${postId}` }
//     );

//     const post = newsData[postId]; // Assuming newsData is an array of posts
//     expect(screen.getByText(post.title)).toBeInTheDocument();
//     expect(screen.getByText(post.author)).toBeInTheDocument();
//     expect(screen.getByText(new Date(post.publishedAt).toLocaleDateString())).toBeInTheDocument();
//     expect(screen.getByText(post.content)).toBeInTheDocument();
//   });

//   test('renders "Post not found" for invalid post id', () => {
//     const invalidPostId = newsData.length; // Out of bounds index
//     renderWithRouter(
//       <Route path="/post/:id">
//         <BlogPostDetails />
//       </Route>,
//       { route: `/post/${invalidPostId}` }
//     );

//     expect(screen.getByText('Post not found')).toBeInTheDocument();
//   });
// });

// BlogPostDetails.test.js

// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
// import { MemoryRouter, Route } from 'react-router-dom';
// import BlogPostDetails from './BlogPostDetails';

// jest.mock('axios');

// describe('BlogPostDetails Component', () => {
//   const mockedPost = {
//     title: 'Test Post',
//     author: 'Test Author',
//     publishedAt: '2024-07-16',
//     urlToImage: 'https://example.com/image.jpg',
//     content: 'Test content',
//   };

//   beforeEach(() => {
//     axios.get.mockResolvedValue({ data: { articles: [mockedPost] } });
//   });

//   it('renders loading text initially', async () => {
//     render(
//       <MemoryRouter initialEntries={['/post/2024-07-16']}>
//         <Route path="/post/:id">
//           <BlogPostDetails />
//         </Route>
//       </MemoryRouter>
//     );

//     expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

//     // Wait for axios to resolve and component to update
//     await waitFor(() => {
//       expect(screen.getByText(mockedPost.title)).toBeInTheDocument();
//     });
//   });

//   it('renders post details correctly', async () => {
//     render(
//       <MemoryRouter initialEntries={['/post/2024-07-16']}>
//         <Route path="/post/:id">
//           <BlogPostDetails />
//         </Route>
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(mockedPost.title)).toBeInTheDocument();
//       expect(screen.getByText(`by ${mockedPost.author}`)).toBeInTheDocument();
//       expect(screen.getByText(mockedPost.content)).toBeInTheDocument();
//       expect(screen.getByAltText(mockedPost.title)).toBeInTheDocument();
//     });
//   });

//   it('handles post not found', async () => {
//     axios.get.mockResolvedValue({ data: { articles: [] } });

//     render(
//       <MemoryRouter initialEntries={['/post/2024-07-16']}>
//         <Route path="/post/:id">
//           <BlogPostDetails />
//         </Route>
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/Post not found/i)).toBeInTheDocument();
//     });
//   });
// });

import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogPostList from '../components/BlogPostList';
import newsData from '../components/data';

describe('BlogPostList Component', () => {
  beforeEach(() => {
    act(() => {
      render(
        <Router>
          <BlogPostList />
        </Router>
      );
    });
  });

  test('renders the correct number of posts per page', () => {
    const posts = screen.getAllByRole('heading', { level: 5 });
    expect(posts.length).toBeLessThanOrEqual(20); // Check if no more than 20 posts are rendered per page
  });

  test('navigates to the next and previous pages', () => {
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton); // Click Next button

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeEnabled(); // Assert Previous button is enabled after clicking Next

    fireEvent.click(previousButton); // Click Previous button
    expect(previousButton).toBeDisabled(); // Assert Previous button is disabled after going back to first page
  });

  test('disables Next button on the last page', () => {
    const nextButton = screen.getByText('Next');
    for (let i = 0; i < Math.ceil(newsData.length / 20); i++) {
      fireEvent.click(nextButton); // Click Next button until the last page
    }

    expect(nextButton).toBeDisabled(); // Assert Next button is disabled on the last page
  });
});


