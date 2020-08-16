import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class CreateUserForm extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    const { handleSubmit, reset } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h4 className="page-title" >New System User Formulae</h4>
              <h1 className="subhead">Please, insert mandatory fields for creating new user for system</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span clform__form-group-descriptionform__form-group-descriptionassName="form__form-group-label">Name</span>
                <div className="form__form-group-field">
                  <Field
                    name="username"
                    component="input"
                    type="text"
                    placeholder="Admin1234"
                  />
                </div>
              </div>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Submit</Button>
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
