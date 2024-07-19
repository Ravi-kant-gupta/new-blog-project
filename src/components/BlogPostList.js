import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import newsData from '../components/data';
import './styles.css';

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



