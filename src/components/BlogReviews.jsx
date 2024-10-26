import React from 'react';
import { Button } from 'react-bootstrap';

const buttonStyle = {
  backgroundColor: 'white',
  color: '#1a237e', // Deep blue color for text
  border: 'none',
  fontWeight: 'bold',
  padding: '0.6rem 1.5rem',
  borderRadius: '25px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
};

const handleMouseEnter = (e) => {
  e.target.style.backgroundColor = '#ffd54f'; // Light yellow hover color
  e.target.style.color = '#1a237e';
};

const handleMouseLeave = (e) => {
  e.target.style.backgroundColor = 'white';
  e.target.style.color = '#1a237e';
};

const BlogReviews = () => {
  return (
    <div className="text-center my-5">
      <h2>Blog, Book, and Movie Reviews</h2>
      <p>Check out my latest reads, movie reviews, and casual blog posts.</p>
      <Button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="mt-3"
      >
        Read my Blog
      </Button>
    </div>
  );
};

export default BlogReviews;
