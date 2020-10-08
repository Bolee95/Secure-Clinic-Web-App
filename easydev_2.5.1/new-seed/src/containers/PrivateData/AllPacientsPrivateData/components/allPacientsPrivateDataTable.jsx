/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { array } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ThemeProps } from '../../../../shared/prop-types/ReducerProps';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';


class AllPacientsPrivateDataTable extends PureComponent {
  static propTypes = {
    sicknessHistory: array.isRequired,
    theme: ThemeProps.isRequired,
  };

  constructor() {
    super();

    const headers = [
      {
        selector: 'diseaseName',
        name: 'Disease Name',
        sortable: true,
        center: true
      },
      {
        selector: 'diseaseCode',
        name: 'Disease Code',
        sortable: true,
        center: true
      },
      {
        selector: 'active',
        name: 'Disease Active',
        sortable: true,
        center: true
      }
    ];

    this.state = {
      headers: headers
    };

  }

  render() {
    const { headers } = this.state;
    const { theme, sicknessHistory } = this.props;

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
                     striped={true}
                     grow={true}
                     columns={headers}
                     data={sicknessHistory}
                     customStyles={customStyles}/>       
    );
  }
}


export default withRouter(connect(state => ({
  theme: state.theme,
}))(AllPacientsPrivateDataTable));