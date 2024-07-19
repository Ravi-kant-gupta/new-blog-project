// import './App.css';
// import logo from './logo.svg';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css';
// import HomePage from './pages/HomePage';
// import PostPage from './pages/PostPage';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<HomePage />} />
//         <Route exact path="/post/:id" element={<PostPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BlogPostDetails from './components/BlogPostDetails';
import Navbar from './components/BlogPostItem';
import BlogPostList from './components/BlogPostList';
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


