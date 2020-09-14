import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderSelectField from '../../../../shared/components/form/Select';
import ExpandButton from '../../../../shared/components/Buttons/ExpandButton';

class ChangePacientWaitingStatusForm extends PureComponent {
  static propTypes = {
    patients: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    const statuses = [{ index: '0', label: 'Reset'}, { index: '1', label: 'Set to Pending'} ];

    this.state = { 
        possibleStatus: statuses
    }
  }

  render() {
    const { handleSubmit, reset, isLoading, patients } = this.props;
    const { possibleStatus } = this.state;

    var patientsData = [];

    for (let index = 0; index < patients.length; index++) {
        let patient = patients[index];
        let patientData = { value: patient.lbo, label: patient.firstName + " " + patient.lastName };
        patientsData.push(patientData);
    }

    var statusesData = [];
    for (let index = 0; index < possibleStatus.length; index++) {
        let waitingStatus = possibleStatus[index];
        let statusData = { value: waitingStatus.index, label: waitingStatus.label };
        statusesData.push(statusData);
    }

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h4 className="page-title" >Changing Pacient Waiting Status</h4>
              <h1 className="subhead">Please, select one of suggested waiting status for selected pacient</h1>
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
                <span className="form__form-group-label">Waiting Status</span>
                <div className="form__form-group-field">
                  <Field
                    name="waitingStatus"
                    component={renderSelectField}
                    options={statusesData}
                    placeholder={"Select waiting status"}
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
  form: 'ChangePacientWaitingStatusForm', // a unique identifier for this form
})(ChangePacientWaitingStatusForm);
