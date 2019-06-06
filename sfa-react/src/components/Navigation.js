import React, {Component} from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends Component {

    links = [
        {
            name: 'User Profile',
            to: {
                pathname: '/profile'
            },
            private: true,
            key: 'profile'
        },
        {
            name: 'Log Out',
            to: {
                pathname: '/',
                search: '?logout=true'
            },
            private: true,
            key: 'logout'
        },
        {
            name: 'Log In',
            to: {
                pathname: '/'
            },
            private: false,
            key: 'home'
        },
        {
            name: 'Sign Up',
            to: {
                pathname: '/signup'
            },
            private: false,
            key: 'signup'
        }
    ];

    buildLinks() {
        return this.links.map((link, index) => {
            if(this.props.loggedIn === link.private) {
                return (
                    <Nav.Item key={index}>
                        <LinkContainer to={link.to} exact>
                            <Nav.Link eventKey={link.key}>{link.name}</Nav.Link>                            
                        </LinkContainer>
                    </Nav.Item>
                );
            } else {
                return null;
            }
        });
    }

    render() {
        return (
            <Nav 
                className="justify-content-center" 
                variant="pills"
                defaultActiveKey="home"
            >
                {this.buildLinks()}
            </Nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.authorized
    }
}

export default connect(mapStateToProps)(withRouter(Navigation));