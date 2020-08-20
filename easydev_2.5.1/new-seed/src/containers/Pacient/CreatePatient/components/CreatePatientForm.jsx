import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderSelectField from '../../../../shared/components/form/Select';
import ExpandButton from '../../../../shared/components/Buttons/ExpandButton';

class CreatePatientForm extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    const cities = [
      { value: 'Beograd', label: 'Beograd' },
      { value: 'Nis', label: 'Nis' }
    ]

    this.state = {
      cities: cities
    }
  }

  render() {
    const { handleSubmit, reset, isLoading } = this.props;
    const { cities } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h4 className="page-title" >New Pacient Formulae</h4>
              <h1 className="subhead">Please, insert mandatory user data for creating new one inside system</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Name</span>
                <div className="form__form-group-field">
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="John"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Surname</span>
                <div className="form__form-group-field">
                  <Field
                    name="surname"
                    component="input"
                    type="text"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">City</span>
                <div className="form__form-group-field">
                  <Field
                    name="city"
                    component={renderSelectField}
                    options={cities}
                    placeholder={"Select city"}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">JMBG number</span>
                <div className="form__form-group-field">
                  <Field
                    name="jmbg"
                    component="input"
                    type="number"
                    placeholder="0123456789"
                  />
                </div>
                <span class="form__form-group-description">You can find this number on back side of your medical ID </span>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">LBO number</span>
                <div className="form__form-group-field">
                  <Field
                    name="lbo"
                    component="input"
                    type="number"
                    placeholder="012345678"
                  />
                </div>
                <span class="form__form-group-description">This number can be fund on front side of your medical ID </span>
              </div>
    {/*
              <div className="form__form-group">
                <span className="form__form-group-label">Disabled Field</span>
                <div className="form__form-group-field">
                  <Field
                    name="disableInput"
                    component="input"
                    type="text"
                    placeholder="Disabled Input"
                    disabled
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">E-mail</span>
                <div className="form__form-group-field">
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Password</span>
                <div className="form__form-group-field">
                  <Field
                    name="password"
                    component="input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className={`form__form-group-button${showPassword ? ' active' : ''}`}
                    onClick={e => this.showPassword(e)}
                  ><EyeIcon />
                  </button>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Icon Left</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <EmailIcon />
                  </div>
                  <Field
                    name="leftIcon"
                    component="input"
                    type="email"
                    placeholder="Icon Left Input"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Icon Right</span>
                <div className="form__form-group-field">
                  <Field
                    name="rightIcon"
                    component="input"
                    type="text"
                    placeholder="Icon Right Input"
                  />
                  <div className="form__form-group-icon">
                    <AccountSearchIcon />
                  </div>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">
                  Add file
                </span>
                <div className="form__form-group-field">
                  <Field
                    name="fileVertical"
                    component={renderFileInputField}
                  />
                </div>
              </div>
    */}
              <ButtonToolbar className="form__button-toolbar">
                {/* <Button color="primary" type="submit">Submit</Button> */}
                <ExpandButton title="Submit" load={isLoading} ></ExpandButton>
                <Button type="button" onClick={reset}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'CreatePatientForm', // a unique identifier for this form
})(CreatePatientForm);
