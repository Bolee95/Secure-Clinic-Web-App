/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardBody, Col } from 'reactstrap';
//import DataPaginationTable from '../../../../shared/components/table/DataPaginationTable';
//import Pagination from '../../../../shared/components/pagination/Pagination';
import { ThemeProps } from '../../../../shared/prop-types/ReducerProps';
import DataTable from 'react-data-table-component';

class AllPatientsTable extends PureComponent {
  static propTypes = {
    //data: PatientsProps.isRequired,
    theme: ThemeProps.isRequired
  };

  constructor() {
    super();

    const headers = [
      {
        selector: 'first_name',
        name: 'First Name',
        sortable: true,
      },
      {
        selector: 'last_name',
        name: 'Last Name',
        sortable: true,
      },
      {
        selector: 'lbo',
        name: 'LBO Number',
        sortable: true,
      },
      {
        selector: 'JMBG',
        name: 'JMBG Number',
        sortable: true,
      },
      {
        selector: 'hospital_name',
        name: 'Hospital Name',
        sortable: true,
      },
      {
        selector: 'hospital_code',
        name: 'Hospital Code',
        sortable: true,
      },
      {
        selector: 'waiting_status',
        name: 'Waiting Status',
        sortable: true,
      },
      {
        selector: 'city',
        name: 'City',
        sortable: true,
      },
      {
        selector: 'waiting_list_code',
        name: 'Waiting List Code',
        sortable: true
      }
    ];

    const data = [ {first_name: 'Bogdan', last_name: 'ilic', lbo: '01234'}, { first_name: 'Darko', last_name: 'Ilic', lbo: '23454' }]

    this.state = {
      data: data,
      headers: headers //,
      //rowsToShow: currentPageRows,
      //pageOfItems: initialPageNumber,
      //itemsToShow: initialRowsCount,
    };
  }

  onChangePage = (pageOfItems) => {
    const { rows, itemsToShow } = this.state;
    if (pageOfItems) {
      const rowsToShow = this.filterRows(rows, pageOfItems, itemsToShow);
      this.setState({ rowsToShow, pageOfItems });
    }
  };

  getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
    - start.getTime()))).toLocaleDateString();

  createRows = (numberOfRows) => {
    const rows = [];
    for (let i = 1; i < numberOfRows + 1; i += 1) {
      rows.push({
        id: i,
        first: ['Maria', 'Bobby  ', 'Alexander'][Math.floor((Math.random() * 3))],
        last: ['Morisson', 'Brown  ', 'Medinberg'][Math.floor((Math.random() * 3))],
        user: ['@dragon', '@hamster', '@cat'][Math.floor((Math.random() * 3))],
        age: Math.min(100, Math.round(Math.random() * 30) + 20),
        date: this.getRandomDate(new Date(2002, 3, 1), new Date(1954, 3, 1)),
        location: ['Melbourne', 'Tokio', 'Moscow', 'Rome'][Math.floor((Math.random() * 4))],
        work: ['Nova Soft', 'Dog Shop', 'Aspirity', 'Business Bro', 'Starlight'][Math.floor((Math.random() * 5))],
      });
    }
    return rows;
  };

  filterRows = (originalRows, pageNumber, rowsOnPage) => {
    const rowsFrom = rowsOnPage * (pageNumber - 1);
    const rowsTo = rowsFrom + rowsOnPage;
    return originalRows.slice(rowsFrom, rowsTo);
  };

  onSorting = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      }
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    };
    const {
      rows, pageOfItems, itemsToShow,
    } = this.state;
    if (sortDirection !== 'NONE') {
      let sortRows = [...rows].sort(comparer);
      sortRows = this.filterRows(sortRows, pageOfItems, itemsToShow);
      this.setState({ rowsToShow: sortRows });
      return sortRows;
    }
    const sortRows = this.filterRows(rows, pageOfItems, itemsToShow);
    this.setState({ rowsToShow: sortRows });
    return sortRows;
  };

  render() {
    const { headers, data } = this.state;
    const { theme } = this.props;

    return (
      
      <DataTable pagination={true} 
                 theme={ theme.className === 'theme-light' ? 'light' : 'dark'}
                 title="Test"
                 columns={headers}
                 data={data}/>
      /*}
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">All patients in system</h5>
              <h5 className="subhead"></h5>
            </div>
            <DataPaginationTable
              heads={this.heads}
              rows={rowsToShow}
              onSorting={this.onSorting}
            />
            <Pagination
              itemsCount={rows.length}
              itemsToShow={itemsToShow}
              pageOfItems={pageOfItems}
              onChangePage={this.onChangePage}
            />
          </CardBody>
        </Card>
      </Col>
    */
    );
  }
}

export default withRouter(connect(state => ({
  theme: state.theme,
}))(AllPatientsTable));