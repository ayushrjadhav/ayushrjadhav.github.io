import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import About from './About';
import BlogReviews from './BlogReviews';
import Subscribe from './Subscribe';
import Footer from './Footer';
import Divider from './Divider';


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

  
const Home = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0">
      <Hero />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <About />
          </Col>
        </Row>
        <Divider color="#1a237e" />

        {/* Projects Section Styled Like Blog Section */}
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2>Projects</h2>
            <p>Explore my current and past projects in software and hardware development.</p>

            <Button
                onClick={() => navigate('/projects')}
                style={buttonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="mt-3"
            >
        Explore My Work
      </Button>
          </Col>
        </Row>

        <Divider color="#1a237e" />
        <Row className="justify-content-center">
          <Col md={8}>
            <BlogReviews />
          </Col>
        </Row>
        <Divider color="#1a237e" />

        <Row className="justify-content-center">
          <Col md={8}>
            <Subscribe />
          </Col>
        </Row>
        <Divider color="#1a237e" />
      </Container>
      <Footer />
    </Container>
  );
};

export default Home;
