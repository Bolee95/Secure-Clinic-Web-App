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
    }

    componentDidMount() {

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

    render() {
        const { pendings, loading } = this.state;
        console.log("Is loading " + loading);

        if (loading) {
            return (<Loading loading={loading} />);
        }

        return (    
            <Container className="dashboard">
                <AllPendingsForHospitalTable data={pendings}/>
            </Container>
        )
    };
}

export default AllPendingsForHospitalComponent;