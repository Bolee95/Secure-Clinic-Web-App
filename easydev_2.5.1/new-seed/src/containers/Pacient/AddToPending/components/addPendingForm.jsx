import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderSelectField from '../../../../shared/components/form/Select';
import ExpandButton from '../../../../shared/components/Buttons/ExpandButton';

class AddPendingForm extends PureComponent {
  static propTypes = {
    patients: PropTypes.array.isRequired,
    hospitals: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updateSelectionData: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.processHospitalSelection = this.processHospitalSelection.bind(this);
  }

  processHospitalSelection(e) {
    const { updateSelectionData } = this.props;
    updateSelectionData(e.value);
  }

  render() {
    const { handleSubmit, reset, isLoading, hospitals, patients, ordinations, services } = this.props;

    var patientsData = [];
    var hospitalsData = [];
    var ordinationsData = [];
    var servicesData = [];

    for (let index = 0; index < hospitals.length; index++) {
        let hospital = hospitals[index];
        let hospitalData = { value: hospital.code, label: hospital.name + ", " + hospital.city };
        hospitalsData.push(hospitalData);
    }

    for (let index = 0; index < patients.length; index++) {
        let patient = patients[index];
        let patientData = { value: patient.lbo, label: patient.firstName + " " + patient.lastName };
        patientsData.push(patientData);
    }

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
              <h4 className="page-title" >New Pacient Formulae</h4>
              <h1 className="subhead">Please, insert mandatory user data for creating new one inside system</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
            <div className="form__form-group">
                <span className="form__form-group-label">Patient</span>
                <div className="form__form-group-field">
                  <Field
                    name="patient"
                    component={renderSelectField}
                    options={patientsData}
                    placeholder={"Select patient"}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Hospital</span>
                <div className="form__form-group-field">
                  <Field
                    name="hospitalCode"
                    component={renderSelectField}
                    options={hospitalsData}
                    onChange={this.processHospitalSelection}
                    placeholder={"Select hospital"}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Ordination</span>
                <div className="form__form-group-field">
                  <Field
                    name="ordinationCode"
                    component={renderSelectField}
                    options={ordinationsData}
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
  form: 'CreatePatientForm', // a unique identifier for this form
})(AddPendingForm);
