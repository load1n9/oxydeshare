import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'

export default function Home() {

    function newRoom() {
        window.location.href = `/room/${Math.random().toString(36).substring(7)}`;
    }
    return (
        <Container style={{marginTop: '20%'}}>
            <Row className="justify-content-md-center">
                <Col md="auto"></Col>
                <Col md="auto"><Button variant="primary" onClick={newRoom}>Create Room</Button></Col>
                <Col md="auto"></Col>
            </Row>
        </Container>
    )
}
