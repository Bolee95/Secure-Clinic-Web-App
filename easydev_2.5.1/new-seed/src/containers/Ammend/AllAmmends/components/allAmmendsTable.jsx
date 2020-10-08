/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import PropTypes, { array } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardBody, Col } from 'reactstrap';
import { ThemeProps } from '../../../../shared/prop-types/ReducerProps';
import DataTable from 'react-data-table-component';

class AllAmmendsTable extends PureComponent {
  static propTypes = {
    data: array.isRequired,
    theme: ThemeProps.isRequired,
    onApprove: PropTypes.func.isRequired
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
        selector: 'hospitalCode',
        name: 'Hospital Code',
        sortable: true,
        center: true
      },
      {
        selector: 'ordinationCode',
        name: 'Ordination Code',
        sortable: true,
        center: true
      },
      {
        selector: 'serviceCode',
        name: 'Service Code',
        sortable: true,
        center: true
      },
      {
        selector: 'action',
        name: 'Reason',
        center: true
      },
      {
        selector: 'isReviewed',
        name: 'Is reviewed',
        center: true
      },
      {
        selector: 'evidences',
        name: 'Evidences',
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
            <h5 className="bold-text">All Ammends</h5>
            <h5 className="subhead">List of all ammends in which is current entity registered</h5>
          </div>
      <DataTable pagination={true} 
                 theme={ theme.className === 'theme-light' ? 'light' : 'dark'}
                 noHeader={true}
                 columns={headers}
                 data={data}
                 striped={true}
                 grow={true}
                 customStyles={customStyles}
                 onRowClicked={this.onRowClick}/>
        </CardBody>
       </Card>
      </Col>
    );
  }
}

export default withRouter(connect(state => ({
  theme: state.theme,
}))(AllAmmendsTable));