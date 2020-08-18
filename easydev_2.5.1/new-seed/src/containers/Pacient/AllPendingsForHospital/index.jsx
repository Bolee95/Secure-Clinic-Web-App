import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import AllPendingsForHospitalTable from './components/allPendingsForHospitalTable';

class AllPendingsForHospitalComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            pendings: []
        };

        this.approveTapped = this.approveTapped.bind(this);
    }

    componentDidMount() {
        this.getPatients();
    }

    getPatients() {
        var store = require('store');
        const hospitalCode = store.get('user').hospitalCode;

        this.setState({ loading: true });
        axios({ method: 'GET', url: '/shared/getPendingsForHospital', headers: { 'Identity_name': 'doctor' }, params: { 'hospitalCode': hospitalCode }})
        .then(response => {
            let pendings = [];
            for (let index = 0; index < response.data.length; index++) {
                let arrayItem = response.data[index];
                let pending = {
                    'index': index,
                    'hospitalCode': arrayItem.hospitalCode,
                    'ordinationCode': arrayItem.ordinationCode,
                    'pacientLbo': arrayItem.pacientLbo,
                    'serviceCode': arrayItem.serviceCode,
                    'pacientJmbg': arrayItem.pacientJmbg,
                    'pacientScreenName': arrayItem.pacientScreenName,
                    'hospitalName': arrayItem.hospitalName,
                    'ordinationName': arrayItem.ordinationName,
                    'serviceName': arrayItem.serviceName
                }
                pendings.push(pending);
            }

            this.setState({
                pendings: pendings,
                loading: false
            })
        }, error => {
           window.alert(error)    
        })
    }

    approveTapped(rowData) {

        const storage = require('store');
        const licenceId = storage.get('user').userId;

        var bodyFormData = new FormData();
        bodyFormData.set('licenceId', licenceId);
        bodyFormData.set('pacientLbo', rowData.pacientLbo);
        bodyFormData.set('serviceCode', rowData.serviceCode);
        bodyFormData.set('hospitalCode', rowData.hospitalCode);
        bodyFormData.set('ordinationCode', rowData.ordinationCode);

        axios({ method: 'POST', url: '/shared/approvePending', data: bodyFormData, headers: { 'Identity_name': 'doctor' } })
        .then(response => {
            window.alert('succedd');
            this.getPatients();
        }, error => {
            window.alert('error');
        })
    }

    render() {
        const { pendings, loading } = this.state;
        console.log("Is loading " + loading);

        if (loading) {
            return (<Loading loading={loading} />);
        }

        return (    
            <Container className="dashboard">
                <AllPendingsForHospitalTable data={pendings} onApprove={this.approveTapped}/>
            </Container>
        )
    };
}

export default AllPendingsForHospitalComponent;