import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import AllPendingsTable from './components/allPendingsTable';

class AllPendingsComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            pendings: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios({ method: 'GET', url: '/shared/getPendingsForHospital', headers: { 'Identity_name': 'doctor' }})
        .then(response => {
            let pendings = [];
            for (let index = 0; index < response.data.length; index++) {
                let arrayItem = response.data[index];
                let pending = {
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
                <AllPendingsTable data={pendings}/>
            </Container>
        )
    };
}

export default AllPendingsComponent;