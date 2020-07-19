import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import DataTable from './components/DataTable';
import { PatientProps } from './../../../shared/prop-types/TableProps';

class AllPatientsComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            patients: []
        };
    }

    componentWillMount() {
        axios({ method: 'GET', url: '/doctor/getPacient/all', headers: { 'Identity_name': 'admin'}})
        .then(response => {
          console.log(response)
        //   for (const person in response) {
        //       if (response.hasOwnProperty('name')) {
        //           const element = response[person];
                  
        //       }
        //   }
          window.alert("Succedd")
        }, error => {
          window.alert(error)
          
        })
      }

    render() {
        return (
            <Container className="dashboard">
                <DataTable data={this.patients}/>
            </Container>
        )
    };
}

export default AllPatientsComponent;