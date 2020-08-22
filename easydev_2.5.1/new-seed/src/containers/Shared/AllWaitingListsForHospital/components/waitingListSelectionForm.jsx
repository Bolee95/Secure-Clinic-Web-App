/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Card, CardBody, Col } from 'reactstrap';
import { ThemeProps } from '../../../../shared/prop-types/ReducerProps';
import renderSelectField from '../../../../shared/components/form/Select';
import AllWaitingListsForHospitalTable from '../components/allWaitingListsForHospitalTable';
import { Container } from 'reactstrap';
import { array } from 'prop-types';


class WaitingListSelectionForm extends PureComponent {
  static propTypes = {
    waitingLists: array.isRequired,
    theme: ThemeProps.isRequired
  };

  constructor() {
    super();
    this.waitingListSelected = this.waitingListSelected.bind(this);

    this.state = {
        pacients: []
    }
  }

  waitingListSelected(e) {  
        const selectedWaitingList = this.props.waitingLists.find(waitingList => waitingList.key == e.value); 
        if (selectedWaitingList != null) {
            this.setState({ pacients: selectedWaitingList.pacients });
      }
  }

  render() {
    const { waitingLists } = this.props;
    const { pacients } = this.state;

    let waitingListsArray = [];

    for (let index = 0; index < waitingLists.length; index++) {
        let waitingListItem = waitingLists[index];
        let waitingListSelectItem = { value: waitingListItem.key, label: waitingListItem.serviceName + ', ' + waitingListItem.ordinationName + ', ' + waitingListItem.hospitalName }
        waitingListsArray.push(waitingListSelectItem);
    }

    return (      
        <Container className="dashboard">
        <Col md={12} lg={12}>
        <Card>
            <CardBody>
            <div className="card__title">
                <h5 className="bold-text">All Waiting lists for hospital</h5>
                <h5 className="subhead">List of all waiting lists for hospital in which is current user registered</h5>
            </div>
            <form className="form" onSubmit={() => {}}>
              <div className="form__form-group">
            <span className="form__form-group-label">Waiting List</span>
                <div className="form__form-group-field">
                  <Field
                    name="waitingList"
                    component={renderSelectField}
                    options={waitingListsArray}
                    placeholder={"Select Waiting List"}
                    onChange={this.waitingListSelected}
                  />
                </div>
            </div>
            </form>
            <AllWaitingListsForHospitalTable pacients={pacients}>
             </AllWaitingListsForHospitalTable>
            </CardBody>
        </Card>
        </Col>
        </Container>
    );
  }
}

export default reduxForm({
     form: 'CreatePatientForm'
})(WaitingListSelectionForm);