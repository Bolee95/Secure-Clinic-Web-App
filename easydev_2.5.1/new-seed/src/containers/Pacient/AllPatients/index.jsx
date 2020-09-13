import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import AllPatientsTable from './components/AllPatientsTable';
import { showNotification } from './../../../shared/Notification';

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
           showNotification('danger', error);  
        })
      }

    render() {
        const { patients, loading } = this.state;

        if (loading) {
            return (<Loading loading={loading} />);
        }

        return (    
            <Container className="dashboard">
                <AllPatientsTable data={patients}/>
            </Container>
        )
    };
}

export default AllPatientsComponent;