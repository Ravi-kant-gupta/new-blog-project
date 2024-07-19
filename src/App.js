import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BlogPostDetails from './components/BlogPostDetails';
import BlogPostList from './components/BlogPostList';
import Navbar from './components/NavBar';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<BlogPostList />} />
        <Route path="/post/:id" element={<BlogPostDetails />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;


