import React, { Component } from 'react';
import AlertErrors from '../components/AlertErrors';
import { Button, Form, Container, Alert } from "react-bootstrap";
import { connect } from 'react-redux';
import { authorized } from '../store/actions/auth';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
 
class Profile extends Component {

    state = {
        profile: {
            first_name: '',
            last_name: '',
            email: ''
        },
        errors: [],
        success: false
    }

    componentDidMount() {
        if(this.props.loggedIn) {
            axios.get('/api/users')
            .then(results => {            
                const {first_name, last_name, email} = results.data;
                this.setState({
                    profile: {
                        first_name,
                        last_name,
                        email
                    }
                });
            })
            .catch(err => {
                if(err.response.status === 401) {
                    this.props.authorized(false);
                    this.props.history.push({pathname:'/'});
                }
                console.log(err);
            });
        } else {
            this.props.history.push({pathname:'/'});
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.patch('/api/users', this.state.profile)
        .then(results => {
            if(results.data) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        errors: [],
                        success: true
                    }
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
                    errors,
                    success: false
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
                {this.state.success? <Alert variant="success">Profile Updated.</Alert>:null}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text" 
                            placeholder="Enter First Name" 
                            name="first_name"
                            value={this.state.profile.first_name}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name" 
                            name="last_name"
                            value={this.state.profile.last_name}
                            onChange={this.handleChange}
                        />
                    </Form.Group>                    

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email"
                            value={this.state.profile.email}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Password" 
                            name="password"
                            autocomplete="off"
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));