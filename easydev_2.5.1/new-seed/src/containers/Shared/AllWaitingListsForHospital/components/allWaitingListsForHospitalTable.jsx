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

    var headers;
    var store = require('store');
    let licenceId = store.get('user').licenceId;
    // This is true for patient
    if (licenceId !== undefined) {
      headers = [
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
          selector: 'pacientScreenName',
          name: 'Patient name',
          sortable: true,
          center: true
        },
        {
          selector: 'pacientPlace',
          name: 'Place',
          sortable: true,
          center: true,
          grow: 1
        },
        {
          selector: 'dateOfPlacement',
          name: 'Date of placement',
          sortable: true,
          center: true
        },
        {
          selector: 'maxWaitingDate',
          name: 'Maximum waitning date',
          sortable: true,
          center: true
        },
        {
          selector: 'pacientScore',
          name: 'Score',
          sortable: true,
          center: true
        }
      ]; 
    }
    else {
      headers = [
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
          name: 'Date of placement',
          sortable: true,
          center: true
        },
        {
          selector: 'maxWaitingDate',
          name: 'Maximum waitning date',
          sortable: true,
          center: true
        }
      ]; 
    }

    this.state = {
      headers: headers
    };

  }

  render() {
    const { headers } = this.state;
    const { theme, pacients } = this.props;

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
          <DataTable pagination={true} 
                     theme={ theme.className === 'theme-light' ? 'light' : 'dark'}
                     noHeader={true}
                     columns={headers}
                     striped={true}
                     grow={true}
                     data={pacients}
                     customStyles={customStyles}/>       
    );
  }
}


export default withRouter(connect(state => ({
  theme: state.theme,
}))(AllWaitingListsForHospitalTable));