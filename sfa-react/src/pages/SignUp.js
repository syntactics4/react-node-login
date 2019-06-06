import React, { Component } from 'react';
import { Button, Form, Container } from "react-bootstrap";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import AlertErrors from '../components/AlertErrors';

class SignUp extends Component {

    state = {
        profile: {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        },
        errors: []
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post('/api/users', this.state.profile)
        .then(results => {
            if(results.data) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        error: []
                    }
                });
                this.props.history.push({
                    pathname: '/',
                    search:'?registered=true'
                });
            }
        })
        .catch(err => {
            console.log(err.response.data.error);
            let errors = [{
                message: 'Something went wrong, please try again'
            }];               
            if(err.response.status === 400 && err.response.data.error) {
                errors = err.response.data.error;
            }
            this.setState((prevState) => {
                return {
                    ...prevState,
                    errors
                }
            });
        });
    }

    handleChange = event => {
        const state = {...this.state};
        state.profile[event.target.name] = event.target.value;
        this.setState(state);
    }

    render() {
        return (
            <Container>
                <AlertErrors errors={this.state.errors}/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="first_name" 
                            placeholder="Enter First Name"
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="last_name" 
                            placeholder="Enter Last Name" 
                            onChange={this.handleChange}
                        />
                    </Form.Group>                    

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            placeholder="Enter email" 
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" block>
                        Sign Up
                    </Button>
                </Form> 
            </Container>
        );
    }

}

export default withRouter(SignUp);