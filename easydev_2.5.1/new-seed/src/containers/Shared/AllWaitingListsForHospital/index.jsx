import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import AllWaitingListsForHospitalTable from './components/allWaitingListsForHospitalTable';

class AllWaitingListsForHospital extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            waitingLists: [],
        };
    
    }

    componentDidMount() {
        this.getWaitingLists();
    }

    getWaitingLists() {
        var store = require('store');
        const hospitalCode = store.get('user').hospitalCode;

        this.setState({ loading: true });
        axios({ method: 'GET', url: '/shared/getAllWaitingListsForHospital', headers: { 'Identity_name': 'doctor' }, params: { 'hospitalCode': 'AB' }})
        .then(response => {
            let waitingLists = [];
            for (let index = 0; index < response.data.length; index++) {
                let waitingListItem = response.data[index];
                let waitingList = {
                    'key': waitingListItem.key,
                    'hospitalCode': waitingListItem.hospitalCode,
                    'ordinationCode': waitingListItem.ordinationCode,
                    'serviceCode': waitingListItem.serviceCode
                }

                let pacients = [];
                let pacientsArray = waitingListItem.pacients;
                
                for (let index = 0; index < pacientsArray.length; index++) {
                    let pacientItem = pacientsArray[index];
                    let pacient = {
                        'index': index + 1,
                        'dateOfPlacement': pacientItem.dateOfPlacement,
                        'pacientLbo': pacientItem.pacientLbo,
                        'pacientPlace': pacientItem.pacientPlace,
                        'pacientScore': pacientItem.pacientScore
                    }

                    pacients.push(pacient);
                }

                waitingList.pacients = pacients;

                waitingLists.push(waitingList);
            }

            this.setState({
                waitingLists: waitingLists,
                loading: false
            })
        }, error => {
           window.alert(error);    
        })
    }

    render() {
        const { waitingLists, loading } = this.state;
        console.log("Is loading " + loading);

        if (loading) {
            return (<Loading loading={loading} />);
        }

        
        return (    
            <Container className="dashboard">
                <AllWaitingListsForHospitalTable waitingLists={waitingLists}/>
            </Container>
        )
    };
}

export default AllWaitingListsForHospital;