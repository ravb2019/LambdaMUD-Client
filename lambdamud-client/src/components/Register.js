import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import {
    Col, Form,
    FormGroup, Label, Input,
    Button,
    FormText,
  } from 'reactstrap';

// Component Register allows to enter login, password, confirm password
// and register new user.  
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password1: "",
            password2: ""
        }
    }

    // method to change input display on UI with user entered values
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const user = this.state
        
        // POST username, password and confirm password to /api/registration
        // and if successful set token in localStorage and navigate user
        // to play game
        fetch("https://lambdamud--bhavik.herokuapp.com/api/registration/", {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(response => {
				localStorage.setItem('token', response.key)
                this.props.history.push('/play')
            })
		this.setState({ username: "", password: "", confirm_password: "" })
    }

    render() {
        return (            
            <Fragment>
				<h2>Register User</h2>
				<Form onSubmit={this.handleSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="username" sm={2}>Username</Label>
                            <Col sm={10}>
                                <Input
                                    name="username"
                                    id="username"
                                    type="text"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <FormText>Username must be 6 to 11 characters long.</FormText>
                            </Col>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input
                                    name="password1"
                                    id="password"
                                    type="password"
                                    value={this.state.password1}
                                    onChange={this.handleChange}
                                />        
                                <FormText>Password must be 8 to 11 characters long.</FormText>
                            </Col>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup row>
                            <Label for="confirm-password" sm={2}>Confirm Password</Label>
                            <Col sm={10}>
                                <Input
                                    name="password2"
                                    id="confirm-password"
                                    type="password"
                                    value={this.state.password2}
                                    onChange={this.handleChange}
                                />
                                <FormText>Confirm password</FormText>
                            </Col>
                        </FormGroup>
                    </Col>
                    
                    <Col>
                        <Button>Register User</Button>
                    </Col>                
                </Form>
            </Fragment>    
        )
    }
}

export default withRouter(Register)