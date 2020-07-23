import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import DataTable from './components/DataTable';
import { PatientProps } from './../../../shared/prop-types/TableProps';
import { array } from 'prop-types';

class AllPatientsComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            patients: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios({ method: 'GET', url: '/doctor/getPacient/all', headers: { 'Identity_name': 'admin' }})
        .then(response => {
  
        let newPatients = []
        for (let index = 0; index < response.data.length; index++) {
            let arrayItem = response.data[index];
            let patient = {
                'first_name': arrayItem.name,
                'last_name': arrayItem.surname,
                'city': arrayItem.city,
                'lbo': arrayItem.lbo,
                'JMBG': arrayItem.jmbg,
                'hospital_name': arrayItem.hospitalName,
                'hospital_code': arrayItem.hospitalCode,
                'waiting_status': arrayItem.currentWaitingStatus,
                'waiting_list_code': arrayItem.waitingListCode
            }
            newPatients.push(patient);
        }

        this.setState({
             patients: newPatients,
             loading: false
         })

        }, error => {
           window.alert(error)    
        })
      }

    render() {
        const { patients, loading } = this.state;
        console.log("Is loading " + loading);

        if (loading) {
            return (<Loading loading={loading} />);
        }

        return (    
            <Container className="dashboard">
                <DataTable data={patients}/>
            </Container>
        )
    };
}

export default AllPatientsComponent;