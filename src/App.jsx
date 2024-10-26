import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import BlogReviews from './components/BlogReviews';
import Subscribe from './components/Subscribe';
import Footer from './components/Footer';
import Divider from './components/Divider';

function App() {
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
        <Row className="justify-content-center">
          <Col md={8}>
            <Projects />
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
}

export default App;
