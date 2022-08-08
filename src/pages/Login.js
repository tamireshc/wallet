import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../actions/index';

const MIN_LENGTH_PASSWORD = 5;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  validateInputs = () => {
    const { email, password } = this.state;
    const regex = /[\w.-]+@[\w-]+\.[\w.-]+/gi;
    const validateSenha = password.length <= MIN_LENGTH_PASSWORD;
    console.log('validado');
    console.log(!email.match(regex), validateSenha);
    const validate = (email.match(regex) && !validateSenha);
    console.log(validate);
    return !validate;
    // return (!regex.test(email) && validateSenha);
  };

  render() {
    const { email, password } = this.state;
    const { dispatch, history } = this.props;
    console.log(this.props);
    console.log(this.validateInputs(email, password));
    return (
      <main className="login-container">
        <section>
          <h2>Create Wallet</h2>
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
            onKeyDown={ this.validateInputs }
            data-testid="email-input"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ this.handleChange }
            onKeyDown={ this.validateInputs }
            data-testid="password-input"
            placeholder="senha - Insira 6 dígitos"
          />
          <button
            type="button"
            disabled={ this.validateInputs() }
            onClick={ () => {
              dispatch(registerUser(email));
              history.push('./carteira');
            } }
          >
            Entrar
          </button>

        </section>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
