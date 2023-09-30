import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './success.css';

const Success = () => {
    const navigate = useNavigate();
    const [user_info, setUser_info] = useState([]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("data"));

        if (user === "" || user === null) {
            navigate("/login");
        } else {
            setUser_info(user);
        }
    }, [navigate]);

    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <label>{user_info}</label>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <Card>
                    <Card.Body>
                        <h2>Welcome, {user_info}!</h2>
                        <p>This is your fantastic website's login page.</p>
                        <Link to="/login">
                            <Button variant="primary">Logout</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Success;
