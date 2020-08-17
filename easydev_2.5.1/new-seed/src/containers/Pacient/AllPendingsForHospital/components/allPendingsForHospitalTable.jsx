/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import PropTypes, { array } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardBody, Col, ButtonToolbar } from 'reactstrap';
import { ThemeProps } from '../../../../shared/prop-types/ReducerProps';
import DataTable from 'react-data-table-component';
import Modal from '../../../../shared/components/ModalPopUp';

class AllPendingsForHospitalTable extends PureComponent {
  static propTypes = {
    data: array.isRequired,
    theme: ThemeProps.isRequired,
    onApprove: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.onRowClick = this.onRowClick.bind(this);
    this.onApproveClick = this.onApproveClick.bind(this);

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
        selector: 'pacientJmbg',
        name: 'Pacient JMBG',
        sortable: true,
      },
      {
        selector: 'hospitalCode',
        name: 'Hospital Code',
        sortable: true,
      },
     
      {
        selector: 'serviceCode',
        name: 'Service Code',
        sortable: true,
      },
      {
        selector: 'ordinationCode',
        name: 'Ordination Code',
        sortable: true,
      },
      {
        selector: 'approvePending',
        name: 'Actions',
        cell: row =>  <ButtonToolbar className="form__button-toolbar">
                                   <Modal
                                     color="primary"
                                     title="Question"
                                     btn="Approve"
                                     message="Are you sure you want to approve this patient's pending for waiting list?"
                                     onAgreed={ () => this.onApproveClick(row)}/>
      </ButtonToolbar>,
      }
    ];

    this.state = {
      data: [],
      headers: headers
    };
  }

  onApproveClick(row) {
    const { onApprove } = this.props;
    onApprove(row);
  }

  onRowClick(row) {
    window.alert(row.pacientLbo);
  }


  render() {
    const { headers } = this.state;
    const { theme, data } = this.props;

    return (      
      <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">All pendings in hospital</h5>
            <h5 className="subhead">List of all pendings for hospital in which is current user registered</h5>
          </div>
      <DataTable pagination={true} 
                 theme={ theme.className === 'theme-light' ? 'light' : 'dark'}
                 noHeader={true}
                 columns={headers}
                 data={data}
                 onRowClicked={this.onRowClick}/>
        </CardBody>
       </Card>
      </Col>
    );
  }
}

export default withRouter(connect(state => ({
  theme: state.theme,
}))(AllPendingsForHospitalTable));