import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderSelectField from '../../../../shared/components/form/Select';
import ExpandButton from '../../../../shared/components/Buttons/ExpandButton';

class AddDiseaseToSicknessHistoryForm extends PureComponent {
  static propTypes = {
    pacientsPrivateData: PropTypes.array.isRequired,
    diseases: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    const { handleSubmit, reset, isLoading, pacientsPrivateData, diseases} = this.props;

    var patientsData = [];
    var diseasesData = [];

    for (let index = 0; index < pacientsPrivateData.length; index++) {
        let privateDataItem = pacientsPrivateData[index];
        let hospitalDataSelectionItem = { value: privateDataItem.lbo, label: privateDataItem.screenName + " - " + privateDataItem.lbo };
        patientsData.push(hospitalDataSelectionItem);
    }

    for (let index = 0; index < diseases.length; index++) {
        let diseaseItem = diseases[index];
        let diseaseSelectionItem = { value: { 'diseaseCode': diseaseItem.diseaseCode, 'diseaseName': diseaseItem.diseaseName }, label: diseaseItem.diseaseName };
        diseasesData.push(diseaseSelectionItem);
    }

    let isActive = [{ value: 'YES', label: 'YES' }, { value: 'NO', label: 'NO' }];

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h4 className="page-title" >New disease in Sickness History</h4>
              <h1 className="subhead">Please, select mandatory fields for adding new sickness to history for user</h1>
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
                <span className="form__form-group-label">Disease</span>
                <div className="form__form-group-field">
                  <Field
                    name="disease"
                    component={renderSelectField}
                    options={diseasesData}
                    placeholder={"Select disease"}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Is disease active?</span>
                <div className="form__form-group-field">
                  <Field
                    name="active"
                    component={renderSelectField}
                    options={isActive}
                    placeholder={"Select option"}
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
  form: 'AddDiseaseToSicknessHistoryForm', 
})(AddDiseaseToSicknessHistoryForm);
