import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import PropTypes from 'prop-types';

// Klasa koja se dodaje u UI kroz index 
class LogInForm extends PureComponent {
  // Props-i koji se prosledjuju prilikom kreiranja komponente
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    logInAsUser: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  constructor() {
    super();

    this.logInAsUserTapped = this.logInAsUserTapped.bind(this);
    this.userIdChanged = this.userIdChanged.bind(this);

    this.state = {
      userIdInputText: ''
    }
  }

  logInAsUserTapped() {
    this.props.logInAsUser(this.state.userIdInputText);
  }

  userIdChanged(e) {
      this.setState({ userIdInputText: e.target.value });
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
              onChange={this.userIdChanged}
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
        <button className="btn btn-primary account__btn account__btn--small" type="submit">Log in as Entity</button>
        <button className="btn btn-outline-primary account__btn account__btn--small" type="button" onClick={this.logInAsUserTapped}>Log in as User</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'log_in_form',
})(LogInForm);
