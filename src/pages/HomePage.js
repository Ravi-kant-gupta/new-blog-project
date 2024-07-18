import { Container } from '@mui/material';
import React from 'react';
import BlogPostList from '../components/BlogPostList';

const HomePage = () => {
  return (
    <Container maxWidth={false} style={{ padding: '0 16px' }}>
      <BlogPostList />
    </Container>
  );
};

export default HomePage;
