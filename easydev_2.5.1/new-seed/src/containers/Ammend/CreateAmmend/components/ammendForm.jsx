import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderSelectField from '../../../../shared/components/form/Select';
import ExpandButton from '../../../../shared/components/Buttons/ExpandButton';
import renderDropZoneMultipleField from '../../../../shared/components/form/DropZoneMultiple';
import { ammendStringForType } from '../../../../shared/AmmendType';

class AmmendForm extends PureComponent {
  static propTypes = {
    pacients: PropTypes.array.isRequired,
    waitingLists: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updateSelectionData: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.processWaitingListSelection = this.processWaitingListSelection.bind(this);
  }

  processWaitingListSelection(e) {
    const { updateSelectionData } = this.props;
    updateSelectionData(e.value);
  }

  render() {
    const { handleSubmit, reset, isLoading, waitingLists, pacients} = this.props;

    var waitingListsData = [];
    var pacientsData = [];
    
    for (let index = 0; index < waitingLists.length; index++) {
        let waitingList = waitingLists[index];
        let waitingListData = { value: waitingList.key, label: waitingList.serviceName + ', ' + waitingList.ordinationName + ', ' + waitingList.hospitalName };
        waitingListsData.push(waitingListData);
    }

    for (let index = 0; index < pacients.length; index++) {
        let pacient = pacients[index];
        let pacientData = { value: pacient.lbo, label: pacient.screenName + ' - ' + pacient.lbo };
        pacientsData.push(pacientData);
    }

    var reasonOfAmmend = [{
            value: 1,
            label: ammendStringForType("1")
        },
        {
            value: 2,
            label: ammendStringForType("2")
        },
        {
            value: 3,
            label: ammendStringForType("3")
        }
    ];

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h4 className="page-title" >New Ammend Formulae</h4>
              <h1 className="subhead">Please, insert and select mandatory data for creating new ammend for pacient on waiting list</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
            <div className="form__form-group">
                <span className="form__form-group-label">Waiting List</span>
                <div className="form__form-group-field">
                  <Field
                    name="waitingList"
                    component={renderSelectField}
                    options={waitingListsData}
                    onChange={this.processWaitingListSelection}
                    placeholder={"Select Waiting List"}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Pacient</span>
                <div className="form__form-group-field">
                  <Field
                    name="pacient"
                    component={renderSelectField}
                    options={pacientsData}
                    placeholder={"Select Pacient"}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Reason</span>
                <div className="form__form-group-field">
                  <Field
                    name="reason"
                    component={renderSelectField}
                    options={reasonOfAmmend}
                    placeholder={"Select reason of ammend"}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Description</span>
                <div className="form__form-group-field">
                   <Field
                    name="description"
                    component="input"
                    type="text"
                    placeholder={"Write down description for creating ammend..."}
                  />
                </div>
              </div>
              <Field
                    name="files"
                    component={renderDropZoneMultipleField}
                />
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
  form: 'AmmendForm',
})(AmmendForm);
