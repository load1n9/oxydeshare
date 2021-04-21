import React, { useState } from 'react'
import MonacoEditor from 'react-monaco-editor';
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap'
import { WhistleLanguageDef } from "../utils/WhistleConfig";
import { options } from "../utils/options";

const socket = io()

function Room() {
    let { roomId } = useParams();
    const [code, setCode] = useState('')
    const [theme, setTheme] = useState('vs-dark')
    const [language, setLanguage] = useState('whistle')

    function editorWillMount(monaco) {
        const params = new URLSearchParams(window.location.search);
        if (params.has("language")) {
            setLanguage(params.get("language"))
        }
        monaco.languages.register({
            id: "whistle",
        });
        monaco.languages.setMonarchTokensProvider("whistle", WhistleLanguageDef);
    }
    function editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
        socket.emit('join', { roomId })

    }
    function onChange(newValue, _e) {
        setCode(newValue)
        console.log(_e)
        socket.emit('changecode', { code: newValue, roomId: roomId })
    }

    function toggleTheme() {
        setTheme(theme === "vs-light" ? "vs-dark" : "vs-light")
    }

    socket.on('init', (data) => {
        setCode(data)
    })
    socket.on('newcode', ({ newCode }) => {
        setCode(newCode)
    })
    return (
        <div className="App">
            <Navbar bg={theme === "vs-light" ? 'light' : 'dark'} variant={theme === "vs-light" ? 'light' : 'dark'} expand="lg">
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
            <MonacoEditor
                height="93.08vh"
                language={language}
                theme={theme}
                value={code}
                options={options}
                onChange={onChange}
                editorWillMount={editorWillMount}
                editorDidMount={editorDidMount}
                loading={"Loading..."}
            />
        </div>
    )
}

export default Room
