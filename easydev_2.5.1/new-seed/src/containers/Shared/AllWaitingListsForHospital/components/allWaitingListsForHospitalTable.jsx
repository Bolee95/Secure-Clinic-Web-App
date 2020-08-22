/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { array } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ThemeProps } from '../../../../shared/prop-types/ReducerProps';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';


class AllWaitingListsForHospitalTable extends PureComponent {
  static propTypes = {
    pacients: array.isRequired,
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
        selector: 'pacientScreenName',
        name: 'Patient name',
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
        selector: 'maxWaitingDate',
        name: 'Maximum waitning date',
        sortable: true,
      },
      {
        selector: 'pacientScore',
        name: 'Score',
        sortable: true,
      }
    ];

    this.state = {
      headers: headers
    };

  }

  render() {
    const { headers } = this.state;
    const { theme, pacients } = this.props;

    return (      
          <DataTable pagination={true} 
                     theme={ theme.className === 'theme-light' ? 'light' : 'dark'}
                     noHeader={true}
                     columns={headers}
                     data={pacients}/>       
    );
  }
}


export default withRouter(connect(state => ({
  theme: state.theme,
}))(AllWaitingListsForHospitalTable));