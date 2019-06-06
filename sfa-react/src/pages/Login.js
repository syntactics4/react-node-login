import React, { Component } from 'react';
import { Button, Form, Container, Alert } from "react-bootstrap";
import axios from 'axios';
import { connect } from 'react-redux';
import { authorized } from '../store/actions/auth';
import { withRouter } from 'react-router-dom';

import AlertErrors from '../components/AlertErrors';

class Login extends Component {

    state = {
        login: {
            email: '',
            password: ''
        },
        errors: [],
        registered: false
    }

    componentDidMount()
    {
        if(this.props.location.search === '?logout=true') {
            axios.post('/logout')
            .then(result => {
                this.props.authorized(false);
                this.props.history.push({pathname: '/'});
            })
            .catch(err => {
                this.setState(prevState=>{
                    return {
                        ...prevState,
                        errors: [{message:"There was a problem logging out"}]
                    }
                });
            })
        }
        if(this.props.location.search === '?registered=true') {
            this.setState(prevState=>{
                return {
                    ...prevState,
                    registered: true
                }
            });
            this.props.history.push({pathname: '/'});
        }        
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post('/api/authenticate', this.state.login)
        .then(results => {
            if(results.data) {
                this.props.authorized(true);
                this.props.history.push({
                    pathname: '/profile'
                });
            }
        })
        .catch(err => {
            let errors = [{
                message: 'Something went wrong, please try again'
            }];
            if(err.response.status === 401 && err.response.data.error) {
                errors = [err.response.data.error];
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
        state.login[event.target.name] = event.target.value;
        this.setState(state);
    }

    render() {     
        return (
            <Container>
                <AlertErrors errors={this.state.errors}/>
                {this.state.registered? <Alert variant="success">Registration compete. Please login.</Alert>:null}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email" 
                            placeholder="Enter email"
                            name="email"
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}                        
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" block>
                        Login
                    </Button>
                </Form> 
            </Container>          
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.authorized
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authorized: params =>  dispatch(authorized(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));