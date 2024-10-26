import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TicTacToeImage from '../images/image.png';
import WhackAMoleImage from '../images/whack-a-mole.png';

const ProjectPage = () => {
  // Embedded Systems / Microprocessor Projects
  const embeddedProjects = [
    {
      title: 'Tic-Tac-Toe Game',
      description: `
        This project brings the classic game of Tic-Tac-Toe to microprocessor boards, allowing for both single-player and multiplayer modes.
        In the initial version, players could choose to play as "X" or "O" in a two-player mode on a single board. The game tracked moves and displayed the winner.
        The enhanced version allowed real-time gameplay across two separate microprocessor boards.
      `,
      imageUrl: TicTacToeImage,
      codeLink: 'https://github.com/ayushrjadhav',
    },
    {
      title: 'Whack-a-Mole Game',
      description: `
        Inspired by the classic arcade game, this Whack-a-Mole game lets players compete on two microcontrollers. 
        Each player races to "whack" the mole as it appears at random positions. Real-time multiplayer functionality syncs gameplay across both boards.
      `,
      imageUrl: WhackAMoleImage,
      codeLink: 'https://github.com/ayushrjadhav/WhackAMole',
      videoLink: 'https://youtu.be/AHKmsUBKkDs',
    },
  ];

  // UI/UX Projects
  const uiUxProjects = [
    {
      title: 'Badger Buddies',
      description: `
        Welcome to Badger Buddies! This project involved using multiple pages, state management, 
        and various Bootstrap components with data from The Madison Cat Project, helping real cats find homes!
      `,
      codeLink: 'https://github.com/CS571-F24/hw5-ayushrjadhav', // Update with actual link if available
    },
    {
      title: 'BadgerChat',
      description: `
        BadgerChat is a React-based chat application allowing users to chat in different chatrooms. 
        This assignment used a real API and was a cumulative assessment of core React concepts.
      `,
      codeLink: 'https://github.com/CS571-F24/hw6-ayushrjadhav', // Update with actual link if available
    },
  ];

  // ML/AI Projects
  const mlAiProjects = [
    {
      title: 'Image Classification with CNNs',
      description: `
        Built and trained a Convolutional Neural Network (CNN) to classify images from the CIFAR-10 dataset, 
        achieving significant accuracy and gaining insights into image recognition techniques.
      `,
      codeLink: 'https://github.com/your-repo-link', // Update with actual link if available
    },
    {
      title: 'Natural Language Processing Chatbot',
      description: `
        Developed a chatbot using sequence-to-sequence models and transformers, such as GPT, to handle complex 
        language processing tasks and generate human-like responses.
      `,
      codeLink: 'https://github.com/your-repo-link', // Update with actual link if available
    },
  ];

  // Function to render project cards based on provided data
  const renderProjectCards = (projects) => (
    <Row className="d-flex justify-content-center">
      {projects.map((project, index) => (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={index}>
          <Card className="shadow-sm h-100">
            {project.imageUrl && (
              <Card.Img 
                variant="top" 
                src={project.imageUrl} 
                alt={project.title} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
            )}
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title className="font-weight-bold">{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
              </div>
              <div>
                <Button 
                  variant="primary" 
                  href={project.codeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="me-2 mb-2 w-100"
                >
                  View Code
                </Button>
                {project.videoLink && (
                  <Button 
                    variant="danger" 
                    href={project.videoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-100"
                  >
                    Watch Demo
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <Container fluid className="my-5 px-5">
      <h2 className="text-center mb-4">My Projects</h2>

      {/* Embedded Systems / Microprocessor Projects Section */}
      <h3 className="text-center mb-3">Embedded Systems Projects</h3>
      {renderProjectCards(embeddedProjects)}

      {/* UI/UX Projects Section */}
      <h3 className="text-center mt-5 mb-3">UI/UX Projects</h3>
      {renderProjectCards(uiUxProjects)}

      {/* ML/AI Projects Section */}
      <h3 className="text-center mt-5 mb-3">ML/AI Projects</h3>
      {renderProjectCards(mlAiProjects)}
    </Container>
  );
};

export default ProjectPage;
