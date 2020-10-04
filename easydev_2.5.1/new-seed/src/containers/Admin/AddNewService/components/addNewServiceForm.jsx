import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderSelectField from '../../../../shared/components/form/Select';
import ExpandButton from '../../../../shared/components/Buttons/ExpandButton';

class AddNewServiceForm extends PureComponent {
  static propTypes = {
    ordinations: PropTypes.array.isRequired,
    services: PropTypes.array.isRequired,
    hospitalName: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updateSelectionData: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.processOrdiantionSelection = this.processOrdiantionSelection.bind(this);
  }

  processOrdiantionSelection(e) {
    const { updateSelectionData } = this.props;
    updateSelectionData(e.value);
  }

  render() {
    const { handleSubmit, reset, isLoading, ordinations, services, hospitalName } = this.props;

    var ordinationsData = [];
    var servicesData = [];

    for (let index = 0; index < ordinations.length; index++) {
      let ordination = ordinations[index];
      let ordinationData = { value: ordination.code , label: ordination.name };
      ordinationsData.push(ordinationData);
    }

    for (let index = 0; index < services.length; index++) {
      let service = services[index];
      let serviceData = { value: service.code, label: service.name };
      servicesData.push(serviceData);
    }

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h4 className="page-title" >New Service Formulae for hospital {hospitalName}</h4>
              <h1 className="subhead">Please, insert mandatory service data for creating new one inside system and hospital</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Ordination</span>
                <div className="form__form-group-field">
                  <Field
                    name="ordinationCode"
                    component={renderSelectField}
                    options={ordinationsData}
                    onChange={this.processOrdiantionSelection}
                    placeholder={"Select ordination"}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Service</span>
                <div className="form__form-group-field">
                  <Field
                    name="serviceCode"
                    component={renderSelectField}
                    options={servicesData}
                    placeholder={"Select service"}
                  />
                </div>
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
  form: 'AddNewServiceForm',
})(AddNewServiceForm);
