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
        center: true
      },
      {
        selector: 'pacientLbo',
        name: 'Pacient LBO',
        sortable: true,
        center: true
      },
      {
        selector: 'pacientScore',
        name: 'Score',
        sortable: true, 
        center: true
      },
      {
        selector: 'dateOfPlacement',
        name: 'Date of Placement',
        sortable: false,
        center: true
      },
      {
        selector: 'maxWaitingDate',
        name: 'Maximum Waiting Date',
        sortable: false,
        center: true
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

    const customStyles = {
      cells: {
        style: {
          paddingLeft: '5px',
          paddingRight: '5px',
          wordBreak: 'break-all'
        },
      },
    };

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
                 grow={true}
                 striped={true}
                 data={pacients}
                 customStyles={customStyles}/>
        </CardBody>
       </Card>
      </Col>
    );
  }
}

export default withRouter(connect(state => ({
  theme: state.theme,
}))(WaitingListForPacientTable));