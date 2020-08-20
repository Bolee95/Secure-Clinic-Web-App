/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import PropTypes, { array } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Card, CardBody, Col, ButtonToolbar } from 'reactstrap';
import { ThemeProps } from '../../../../shared/prop-types/ReducerProps';
import DataTable from 'react-data-table-component';
import renderSelectField from '../../../../shared/components/form/Select';


class AllWaitingListsForHospitalTable extends PureComponent {
  static propTypes = {
    waitingLists: array.isRequired,
    theme: ThemeProps.isRequired,
  };

  constructor() {
    super();

    const headers = [
      {
        selector: 'index',
        name: 'Index',
        sortable: true,
      },
      {
        selector: 'pacientLbo',
        name: 'Pacient LBO',
        sortable: true,
      },
      {
        selector: 'pacientPlace',
        name: 'Place',
        sortable: true,
      },
      {
        selector: 'dateOfPlacement',
        name: 'Date of placement',
        sortable: true,
      },
      {
        selector: 'pacientScore',
        name: 'Score',
        sortable: true,
      }
    ];

    this.state = {
      waitingLists: [],
      pacients: [],
      headers: headers
    };

    this.waitingListSelected = this.waitingListSelected.bind(this);
  }

  waitingListSelected(e) {  
        const selectedWaitingList = this.props.waitingLists.find(waitingList => waitingList.key == e.value); 
        if (selectedWaitingList != null) {
            this.setState({ pacients: selectedWaitingList.pacients });
      }
  }

  render() {
    const { headers, pacients } = this.state;
    const { theme ,waitingLists } = this.props;

    let waitingListsArray = [];

    for (let index = 0; index < waitingLists.length; index++) {
        let waitingListItem = waitingLists[index];
        let waitingListSelectItem = { value: waitingListItem.key, label: waitingListItem.key }
        waitingListsArray.push(waitingListSelectItem);
    }

    return (      
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
            <DataTable pagination={true} 
                        //theme={ theme.className === 'theme-light' ? 'light' : 'dark'}
                        noHeader={true}
                        columns={headers}
                        data={pacients}/>
            </CardBody>
        </Card>
        </Col>
       
    );
  }
}

export default reduxForm({
     form: 'CreatePatientForm'
})(AllWaitingListsForHospitalTable);