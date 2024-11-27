import React from 'react';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import myPhoto from '../images/my-photo.jpg'; // Adjust path as needed


const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white', // Deep blue color for text
    border: 'none',
    fontWeight: 'bold',
    padding: '0.6rem 1.5rem',
    borderRadius: '25px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  };


const AboutPage = () => {
  return (
    <Container fluid className="px-5 my-5">
      <h1 className="text-center mb-4">About Me</h1>

      {/* About Me Section with Image */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Card className="p-4 shadow-sm">
            <Row className="align-items-center">
              <Col md={4} className="text-center mb-3 mb-md-0">
                <Image 
                  src={myPhoto} 
                  alt="Ayush Jadhav" 
                  roundedCircle 
                  fluid 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </Col>
              <Col md={8}>
                <h2>Who am I?</h2>
                <p>
                  I am an undergraduate student at the University of Wisconsin-Madison, majoring in Computer Engineering and Computer Science with certificates in Data Analytics and <Leadership></Leadership>.
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Academic Interests Section */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Card className="p-4 shadow-sm">
            <h2>Academic Interests</h2>
            <p>
              I am interested in computer hardware and software, with experience in embedded systems, app development, and web development. 
              I am interested in using machine learning techniques to optimize the grid system and leverage this techniques to better outage management systems.
            </p>
          </Card>
        </Col>
      </Row>

      {/* Other Interests Section */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Card className="p-4 shadow-sm">
            <h2>Other Interests</h2>
            <p>
              Outside academics, I am involved in various organizations. I am part of the Badminton Club, competing in tournaments, 
              and represent the College of Engineering in the student government. I also work part-time for a learning community on campus 
              where I train mentors and assist first-year students in transitioning to campus life.
            </p>
          </Card>
        </Col>
      </Row>

      {/* Contact Information Section */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Card className="p-4 shadow-sm text-center">
            <h2>How to Contact Me</h2>
            <p>Email: <a href="mailto:arjadhav@wisc.edu">arjadhav@wisc.edu</a></p>
            <p>
              Connect with me on: &nbsp;
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
              </a>
              &nbsp;&nbsp;
              <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            </p>
            <Button href="/Ayush Jadhav - Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ ...buttonStyle, maxWidth: '400px', margin: '0 auto' }}>
                View or Download My Resume
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Professional Highlights Section */}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <h2 className="text-center mb-4">Professional Highlights</h2>

          {/* Education */}
          <Card className="p-4 shadow-sm mb-4">
            <h3>Education</h3>
            <p><strong>University of Wisconsin-Madison</strong> - B.S. Computer Engineering & Computer Sciences, May 2025</p>
            <p>Minors: Data Analytics, Leadership Certificate</p>
            <p>Certifications: Google IT Automation with Python, Machine Learning Specialization, IBM Quantum Learning</p>
          </Card>

          {/* Engineering Experience */}
          <Card className="p-4 shadow-sm mb-4">
            <h3>Engineering Experience</h3>
            <p><strong>WEC Energy Group</strong>, Software Developer Intern, Milwaukee, WI (May 2023 - Present)</p>
            <ul>
              <li>Developed innovative software solutions for the PCAD system, increasing efficiency by 20%.</li>
              <li>Created a dynamic platform for real-time outage tracking, improving operational response.</li>
              <li>Led modernization of server systems, optimizing code and reducing downtime by 15%.</li>
            </ul>

            <p><strong>Asian Paints</strong>, Software Developer Intern, Mumbai, India (June - August 2022)</p>
            <ul>
              <li>Developed 3D rendering software for interior design, enhancing customer experience.</li>
              <li>Improved software performance and reliability by 15% through extensive testing.</li>
            </ul>
          </Card>

          {/* Project Highlights */}
          <Card className="p-4 shadow-sm mb-4">
            <h3>Selected Projects</h3>
            <ul>
              <li><strong>Image Classification with CNNs</strong> - Built and trained a CNN for image classification.</li>
              <li><strong>Natural Language Processing Chatbot</strong> - Developed a chatbot using sequence-to-sequence models and transformers.</li>
              <li><strong>Whack-a-Mole Game</strong> - Developed a multiplayer version of Whack-a-Mole using microcontrollers.</li>
            </ul>
          </Card>

          {/* Skills Section */}
          <Card className="p-4 shadow-sm">
            <h3>Skills</h3>
            <p>
              <strong>Languages:</strong> Java, Python, JavaScript, CSS, SQL, Verilog, C, React, HTML <br />
              <strong>Prototyping:</strong> SolidWorks, AutoCAD, 3D Printing
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
