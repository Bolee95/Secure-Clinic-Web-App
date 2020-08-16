import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Klasa koja se dodaje u UI kroz index 
class LogInForm extends PureComponent {
  // Props-i koji se prosledjuju prilikom kreiranja komponente
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    // Definisanje i postavljanje state-a koji se koriste da bi se azurirao UI komponente
    // this.state = {
    //   showPassword: false,
    // };
  }

  // Definicija f-je koja se rposledjuje u OnClick neke komponente i koja menja trenutno stanje state-a
  // showPassword = (e) => {
  //   e.preventDefault();
  //   this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  // };

  render() {
    const { handleSubmit, isLoading } = this.props;
    // const { showPassword } = this.state;

    return (
      // className definisan u form.scss fajlu
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Card ID</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            {/* ReduxForm Field polje */ }
            <Field
              name="userId"
              component="input"
              type="text"
              placeholder="Card ID"
            />
          </div>
        </div>
        {/*
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="password"
              component="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <button
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
              type="button"
            ><EyeIcon />
            </button>
            
          </div>
          <div className="account__forgot-password">
            <a href="/">Forgot a password?</a>
          </div>
        </div>
       
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Field
              name="remember_me"
              component={renderCheckBoxField}
              label="Remember me"
            />
          </div>
        </div>
         */}
        {/* Komponente koje funkcionisu slicno kao href */}
        <button className="btn btn-primary account__btn account__btn--small" type="submit">Log In</button>
        <Link className="btn btn-outline-primary account__btn account__btn--small" to="/pages/">Hijack login</Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'log_in_form',
})(LogInForm);
