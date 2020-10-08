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
        selector: 'pacientLbo',
        name: 'Pacient LBO',
        sortable: true,
        center: true
      },
      {
        selector: 'pacientJmbg',
        name: 'Pacient JMBG',
        sortable: true,
        center: true
      },
      {
        selector: 'hospitalName',
        name: 'Hospital Name',
        sortable: true,
        grow: 2,
        center: true
      },
      {
        selector: 'ordinationName',
        name: 'Ordination Name',
        sortable: true,
        center: true,
        grow: 1
      },
      {
        selector: 'serviceName',
        name: 'Service Name',
        center: true,
        grow: 1
      },
      {
        selector: 'score',
        name: 'Score',
        sortable: true,
        center: true 
      },
      {
        selector: 'isReviewed',
        name: 'Is Pending Reviewed',
        center: true
      },
      {
        selector: 'documents',
        name: 'Documents',
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
            <h5 className="bold-text">All pendings in system</h5>
            <h5 className="subhead">List of all pendings for all hospitals registered</h5>
          </div>
      <DataTable pagination={true} 
                 theme={ theme.className === 'theme-light' ? 'light' : 'dark'}
                 noHeader={true}
                 striped={true}
                 grow={true}
                 columns={headers}
                 data={data}
                 customStyles={customStyles}/>
        </CardBody>
       </Card>
      </Col>
    );
  }
}

export default withRouter(connect(state => ({
  theme: state.theme,
}))(AllPatientsTable));