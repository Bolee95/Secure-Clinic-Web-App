/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { array } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardBody, Col } from 'reactstrap';
import { ThemeProps } from '../../../../shared/prop-types/ReducerProps';
import DataTable from 'react-data-table-component';

class AllPatientsTable extends PureComponent {
  static propTypes = {
    data: array.isRequired,
    theme: ThemeProps.isRequired
  };

  constructor() {
    super();

    const headers = [
      {
        selector: 'first_name',
        name: 'First Name',
        sortable: true,
        center: true
      },
      {
        selector: 'last_name',
        name: 'Last Name',
        sortable: true,
        center: true
      },
      {
        selector: 'lbo',
        name: 'LBO Number',
        sortable: true,
        center: true
      },
      {
        selector: 'JMBG',
        name: 'JMBG Number',
        sortable: true,
        center: true
      },
      {
        selector: 'waiting_status',
        name: 'Waiting Status',
        sortable: true,
        center: true
      },
      {
        selector: 'city',
        name: 'City',
        sortable: true,
        center: true,
        grow: 1
      },
      {
        selector: 'hospital_name',
        name: 'Hospital Name',
        sortable: true,
        grow: 2,
        center: true
      },
      {
        selector: 'hospital_code',
        name: 'Hospital Code',
        sortable: true,
        center: true
      },
      {
        selector: 'waiting_list_code',
        name: 'Waiting List Code',
        sortable: true,
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
    const { theme, data } = this.props;

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
            <h5 className="bold-text">All patients in system</h5>
            <h5 className="subhead">List of all patients for all hospitals registered</h5>
          </div>
      <DataTable pagination={true} 
                 theme={ theme.className === 'theme-light' ? 'light' : 'dark'}
                 noHeader={true}
                 columns={headers}
                 striped={true}
                 grow={true}
                 data={data}
                 customStyles={customStyles}
                 />
        </CardBody>
       </Card>
      </Col>
    );
  }
}

export default withRouter(connect(state => ({
  theme: state.theme,
}))(AllPatientsTable));