// import { Alert, Box, Container, Grid, Pagination, Typography } from '@mui/material';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import BlogPostItem from './BlogPostItem';

// const BlogPostList = () => {
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2024-07-16&to=2024-07-16&sortBy=popularity&apiKey=489aeec502c74daab1c03e35b513e4b2&page=${page}`);
//         console.log(response);
//         setPosts(response.data.articles);
//         setTotalPages(Math.ceil(response.data.totalResults / 20));
//         setError(null);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch blog posts. Please try again later.');
//       }
//     };
//     fetchPosts();
//   }, [page]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [page]);

//   return (
//     <Container maxWidth={false} style={{ padding: '0 16px' }}>
//       {/* <Typography variant="h4" gutterBottom>Blog Posts</Typography> */}
//       <Box sx={{ backgroundColor: '#1976d2', color: '#fff', padding: '10px 20px', borderRadius: '5px', marginBottom: '20px' }}>
//         <Typography variant="h4" gutterBottom>Blog Posts</Typography>
//       </Box>
//       {error && (
//         <Alert severity="error" style={{ marginBottom: '20px' }}>
//           {error}
//         </Alert>
//       )}
//       {!error && (
//         <Grid container spacing={4}>
//           {posts.map((post, index) => (
//             <Grid item key={index} xs={12} sm={6} md={4}>
//               <BlogPostItem post={post} />
//             </Grid>
//           ))}
//         </Grid>
//       )}
//       <Pagination
//         count={totalPages}
//         page={page}
//         onChange={(event, value) => setPage(value)}
//         color="primary"
//         style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
//       />
//     </Container>
//   );
// };

// export default BlogPostList;


import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import newsData from '../components/data'; // Import your newsData array
import './styles.css'; // Import your custom CSS

const BlogPostList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const startIndex = (page - 1) * pageSize;
  const paginatedPosts = newsData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="container-fluid py-5 main-page">
      <div className="row">
        {paginatedPosts.map((post, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card image-container">
              {post.urlToImage && <img src={post.urlToImage} className="card-img-top" alt='Post' />}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <Link to={`/post/${startIndex + index}`} className="btn btn-primary">Read more</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mt-4">
        <button onClick={handlePreviousPage} className="btn btn-danger" disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage} className="btn btn-success" disabled={startIndex + pageSize >= newsData.length}>Next</button>
      </div>
    </div>
  );
};

export default BlogPostList;



