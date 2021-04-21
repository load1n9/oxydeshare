import React, { useState } from 'react'
import { Container, Button, Row, Col, Navbar, Nav, Form } from 'react-bootstrap'
import './Home.css'

export default function Home() {
    const [theme, setTheme] = useState('dark')
    const [language, setLanguage] = useState('whistle')
    function newRoom() {
        window.location.href = `/room/${Math.random().toString(36).substring(7)}/?language=${language}`;
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light")
    }

    function handleChange(e) {
        setLanguage(e.target.value)
    }
    return (
        <div className={theme === "light" ? 'light' : 'dark'}>
            <Navbar bg={theme === "light" ? 'light' : 'dark'} variant={theme === "light" ? 'light' : 'dark'} expand="lg">
                <Navbar.Brand href="#home">OxydeShare</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Button onClick={toggleTheme}>{theme === "vs-light" ? '🌞' : '🌛'}</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container style={{ marginTop: '20%' }}>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Form.Group id="language" value={language} onChange={handleChange} >
                            <Form.Control as="select">
                                <option>whistle</option>
                                <option>javascript</option>
                                <option>python</option>
                                <option>typescript</option>
                                <option>html</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" onClick={newRoom}>Create Room</Button>
                    </Col>
                    <Col md="auto"></Col>
                </Row>
            </Container>
        </div>
    )
}
