import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value}
    });
// 'e' here is event
// 'onChange' is an event handler. It is used as a universal event handler here. 
//For example: If email is used, it can be used as onChange.email
    
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
    };

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        if (!data.password) errors.password = "Password section can't be blank";
        return errors;
    };

    render() {
        const {data, errors} = this.state;
        
        return (
            <Form onSubmit= {this.onSubmit}> 
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email"> Email </label>
                    <input type ="email" id="email" name="email" placeholder="something@something.com" value={data.email} onChange={this.onChange} />
            {errors.email && < InlineError text={errors.email} /> }
                </Form.Field>
            
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password"> Password </label>
                    <input type ="password" id="password" name="password" placeholder="********" value={data.password} onChange={this.onChange} />
                {errors.password && < InlineError text={errors.password} /> }
                </Form.Field>
                <Button primary> Login </Button>
            </Form>
        );
    }
}

export default LoginForm;