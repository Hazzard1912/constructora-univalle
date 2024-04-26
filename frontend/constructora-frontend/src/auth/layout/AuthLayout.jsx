import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/AuthLayout.css";

export const AuthLayout = ({ children, title = "" }) => {
    return (
        <Container fluid>
            <Row className="g-0">
                <Col xs={12} md={6} lg={8} className="d-lg-block">
                    <div className="auth-image"></div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <Card className="auth-card">
                        <Card.Body className="auth-card-body">
                            <Card.Title className="auth-title">{title}</Card.Title>
                            {children}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}