/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { array, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardBody, Col } from 'reactstrap';
import { ThemeProps } from '../../../../shared/prop-types/ReducerProps';
import DataTable from 'react-data-table-component';

class WaitingListForPacientTable extends PureComponent {
  static propTypes = {
    title: string.isRequired,
    pacients: array.isRequired,
    theme: ThemeProps.isRequired
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
        selector: 'pacientScore',
        name: 'Score',
        sortable: true
      },
      {
        selector: 'dateOfPlacement',
        name: 'Date of Placement',
        sortable: false
      },
      {
        selector: 'maxWaitingDate',
        name: 'Maximum Waiting Date',
        sortable: false
      }
    ];

    this.state = {
      data: [],
      headers: headers
    };
  }


  render() {
    const { headers } = this.state;
    const { theme, pacients, title } = this.props;

    return (      
      <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Waiting list for {title}</h5>
            <h5 className="subhead">List of pacients</h5>
          </div>
      <DataTable pagination={true} 
                 theme={ theme.className === 'theme-light' ? 'light' : 'dark'}
                 noHeader={true}
                 columns={headers}
                 data={pacients}/>
        </CardBody>
       </Card>
      </Col>
    );
  }
}

export default withRouter(connect(state => ({
  theme: state.theme,
}))(WaitingListForPacientTable));