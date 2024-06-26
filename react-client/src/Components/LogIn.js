//UserDetailsForm.js
import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import { Link } from 'react-router-dom';
import '../assets/css/custom.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            user: {},
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }


    componentWillMount(){
        let url = 'http://localhost:8080/isLoggedIn';
        axios.get(url,{withCredentials:true})
            .then(res => {
                if (res.data.errorMsg === "") {
                    localStorage.setItem('id', res.data.id);
                    localStorage.setItem('name', res.data.name);
                    localStorage.setItem('email', res.data.email);
                    this.props.history.push('/home')
                }
                else {
                    this.props.history.push('/login')
                }
            })
            .catch(err => {
                console.error(err);
            });
      
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleSubmit() {
        let loginUpAPI = 'http://localhost:8080/login';
        let email = this.state.email.trim();
        let password = this.state.password;
        if (!email || !password) {
            return;
        }
        var apiPayload = { email: email, password: password };
        axios.post(loginUpAPI, apiPayload,{withCredentials:true})
            .then(res => {
                // eslint-disable-next-line
                if (res.data.errorMsg != '') {
                    this.setState({
                        errorMessage: res.data.errorMsg
                    });
                } else {
                    this.setState({
                        errorMessage: ''
                    });
                    localStorage.setItem('id', res.data.data.id);
                    localStorage.setItem('name', res.data.data.name);
                    localStorage.setItem('email', res.data.data.email);
                    this.props.history.push('/home');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    renderRows() {
        // eslint-disable-next-line
        if (this.state.errorMessage != '') {
            return (
                <p class="text-danger" >{this.state.errorMessage}</p>
            );
        }
    }
    render() {

        return (
            <div className="text-center divclasscenter"  >
                <form className="form-signup" method="POST">
                    {/* <img className="mb-4" src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg" alt="" /> */}
                    <h1  className="h3 mb-3 font-weight-normal">Iltimos ro'yxatdan o'ting</h1>
                    <div>
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                            {this.renderRows()}
                        </div>
                    </div>

                    <label className="sr-only">Elektron pochta</label>
                    <input type="email" name="email" className="form-control" placeholder="Elektron pochta" required="" autoFocus=""
                        value={this.state.email} onChange={this.handleUserInput} />
                    <br />                   <label className="sr-only">Parol</label>
                    <input type="password" name="password" className="form-control" placeholder="Parol" required=""
                        value={this.state.password} onChange={this.handleUserInput} />
                    <div className="checkbox mb-3">
                        <br />       <label>
                            <input type="checkbox" value="remember-me" /> Menga eslat
        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="button"
                        disabled={!this.state.formValid}
                        onClick={this.handleSubmit.bind(this)}>Tizmga kirish</button>
                    <p className="mt-5 mb-3 text-muted">© Bee Quick</p>


                    <div>
                        <a href='' id="forgot-password-btn" >Parolni unutdingizmi?</a>

                    </div>


                    <div className="modal-footer">

                        <span className="login-form-signup-link">
                            Akkauntingiz bormi?
                        <Link to="/signup"><a className="switch-to-signup ml-2">Royxatdan o'tish</a></Link>
                        </span>

                    </div>
                </form>
            </div>


        )
    }
}

export default withRouter(SignIn);