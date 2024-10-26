import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Projects = () => {
  return (
    <Container fluid="md" className="my-5">
      <h1 className="text-center mb-4">Embedded Systems / Microprocessor Projects</h1>
      
      {/* Tic-Tac-Toe Game */}
      <Row className="justify-content-center mb-5">
        <Col md={6} className="text-center">
          <Card className="shadow-sm">
            <Card.Img variant="top" src="path-to-your-image/tic-tac-toe.jpg" alt="Tic-Tac-Toe Game" />
            <Card.Body>
              <Card.Title>Tic-Tac-Toe Game</Card.Title>
              <Card.Text>
                This project brings the classic game of Tic-Tac-Toe to microprocessor boards, allowing for both single-player and multiplayer modes.
                <br /><br />
                In the initial version, players could choose to play either as "X" or "O" in a two-player mode on a single board. The game tracked each player's moves and displayed the winner. In the enhanced version, we added the ability to play across two separate microprocessor boards, updating moves in real-time.
              </Card.Text>
              <Button variant="primary" href="your-link-to-code" target="_blank" rel="noopener noreferrer">
                View Code
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Whack-a-Mole Game */}
      <Row className="justify-content-center mb-5">
        <Col md={6} className="text-center">
          <Card className="shadow-sm">
            <Card.Img variant="top" src="path-to-your-image/whack-a-mole.jpg" alt="Whack-a-Mole Game" />
            <Card.Body>
              <Card.Title>Whack-a-Mole Game</Card.Title>
              <Card.Text>
                Inspired by the classic arcade game, this Whack-a-Mole game allows players to compete on two microcontrollers. Each player races to "whack" the mole as it appears at random positions on their board.
                <br /><br />
                This real-time multiplayer experience syncs gameplay across both boards. Watch the video demo for a full gameplay experience!
              </Card.Text>
              <Button variant="primary" href="your-link-to-code" target="_blank" rel="noopener noreferrer" className="me-2">
                View Code
              </Button>
              <Button variant="danger" href="https://youtu.be/AHKmsUBKkDs" target="_blank" rel="noopener noreferrer">
                Watch Demo
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Projects;
