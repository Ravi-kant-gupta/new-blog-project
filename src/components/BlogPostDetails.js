// import { Button, Container, Typography } from '@mui/material';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const BlogPostDetails = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPost = async () => {
//       const response = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2024-07-16&to=2024-07-16&sortBy=popularity&apiKey=489aeec502c74daab1c03e35b513e4b2`);
//       const selectedPost = response.data.articles.find(p => p.publishedAt === id);
//       setPost(selectedPost);
//     };
//     fetchPost();
//   }, [id]);

//   if (!post) return <Typography variant="h5">Loading...</Typography>;

//   return (
//     <Container>
//       <Button variant="contained" color="secondary" onClick={() => navigate(-1)} style={{ margin: '20px 0' }}>
//         Back
//       </Button>
//       <Typography variant="h4" gutterBottom>{post.title}</Typography>
//       <img src={post.urlToImage} alt={post.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', marginBottom: '20px' }} />
//       <Typography variant="body1">{post.content}</Typography>
//     </Container>
//   );
// };

// export default BlogPostDetails;


import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import newsData from '../components/data'; // Import your newsData array

const BlogPostDetails = () => {
  const { id } = useParams();
  const post = newsData[id];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-subtitle mb-2 text-muted">{post.author} | {new Date(post.publishedAt).toLocaleDateString()}</p>
          {post.urlToImage && <img src={post.urlToImage}  alt={post.title} />}
          <p className="card-text mt-4">{post.content}</p>
          <Link to="/" className="btn btn-primary">Back to list</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetails;

