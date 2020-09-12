import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderSelectField from '../../../../shared/components/form/Select';
import ExpandButton from '../../../../shared/components/Buttons/ExpandButton';

class CreateUserForm extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
  };

  // identityName, licenceId, role, name, surname, hospitalName, hospitalCode

  render() {
    const { handleSubmit, reset, isLoading } = this.props;

    let roles = [{ label: 'Doctor', value: 'doctor1' },
                 { label: 'Tehnical', value: 'tehnical'},
                 { label: 'Director', value: 'director'},
                 { label: 'Admin', value: 'admin' }];

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h4 className="page-title" >New System Entity Formulae</h4>
              <h1 className="subhead">Please, insert mandatory fields for creating new entity for system</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span clform__form-group-descriptionform__form-group-descriptionassName="form__form-group-label">Name</span>
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
                <span clform__form-group-descriptionform__form-group-descriptionassName="form__form-group-label">Surname</span>
                <div className="form__form-group-field"></div>
                  <Field
                    name="surname"
                    component="input"
                    type="text"
                    placeholder="Doe"
                  />
              </div>
              <div className="form__form-group">
                <span clform__form-group-descriptionform__form-group-descriptionassName="form__form-group-label">Licence ID</span>
                <div className="form__form-group-field"></div>
                  <Field
                    name="licenceId"
                    component="input"
                    type="text"
                    placeholder="qwerty1234"
                  />
              </div>
              <div className="form__form-group">
                <span clform__form-group-descriptionform__form-group-descriptionassName="form__form-group-label">Role</span>
                <div className="form__form-group-field"></div>
                   <Field
                    name="role"
                    component={renderSelectField}
                    options={roles}
                    placeholder={"Select role"}
                  />
              </div>
              <ButtonToolbar className="form__button-toolbar">
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
  form: 'CreateUserForm',
})(CreateUserForm);
