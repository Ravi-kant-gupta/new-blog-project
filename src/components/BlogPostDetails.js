import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import newsData from '../components/data'; // Import your newsData array

const BlogPostDetails = () => {
  const { id } = useParams();
  const post = newsData[id];
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container-fluid py-5 main-page">
    <div className="row mx-5">
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
    </div>
  );
};

export default BlogPostDetails;

