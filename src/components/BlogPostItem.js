// import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
// import React from 'react';
// import { Link } from 'react-router-dom';

// const BlogPostItem = ({ post }) => {
//   return (
//     <Card>
//       <CardMedia
//         component="img"
//         alt={post.title}
//         height="140"
//         image={post.urlToImage || 'default-image-url'}  // Use a default image if urlToImage is null
//       />
//       <CardContent>
//         <Typography variant="h6" component="div">{post.title}</Typography>
//         <Typography variant="body2" color="textSecondary">{post.description}</Typography>
//         <Typography variant="body2" color="textSecondary">{new Date(post.publishedAt).toLocaleDateString()}</Typography>
//         <Button component={Link} to={`/post/${post.publishedAt}`} variant="contained" color="primary" style={{ marginTop: '10px' }}>
//           Read More
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default BlogPostItem;

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My Blog</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Empty div to maintain layout */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
