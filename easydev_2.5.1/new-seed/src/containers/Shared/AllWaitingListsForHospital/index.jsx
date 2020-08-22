import React from 'react';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import WaitingListSelectionForm from './components/waitingListSelectionForm';

class AllWaitingListsForHospital extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            waitingLists: [],
        };

        this.returnFormatedDate = this.returnFormatedDate.bind(this);
    
    }

    componentDidMount() {
        this.getWaitingLists();
    }

    getWaitingLists() {
        var store = require('store');
        const hospitalCode = store.get('user').hospitalCode;

        this.setState({ loading: true });
        axios({ method: 'GET', url: '/shared/getAllWaitingListsForHospital', headers: { 'Identity_name': 'doctor' }, params: { 'hospitalCode': hospitalCode }})
        .then(response => {
            let waitingLists = [];
            for (let index = 0; index < response.data.length; index++) {
                let waitingListItem = response.data[index];
                let waitingList = {
                    'key': waitingListItem.key,
                    'hospitalName': waitingListItem.hospitalName,
                    'ordinationName': waitingListItem.ordinationName,
                    'serviceName': waitingListItem.serviceName,
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
                        'dateOfPlacement': this.returnFormatedDate(pacientItem.dateOfPlacement),
                        'pacientLbo': pacientItem.pacientLbo,
                        'pacientPlace': pacientItem.pacientPlace,
                        'pacientScore': pacientItem.pacientScore,
                        'pacientScreenName': pacientItem.pacientScreenName,
                        'maxWaitingDate': this.returnFormatedDate(pacientItem.maxWaitingDate)
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

    returnFormatedDate(date) {
        const nonformatedDate = new Date(date); 
        //let formattedDate = nonformatedDate.getFullYear() + "-" + (nonformatedDate.getMonth() + 1) + "-" + nonformatedDate.getDate() + " " + nonformatedDate.getHours() + ":" + nonformatedDate.getMinutes() + ":" + nonformatedDate.getSeconds();
        let formattedDate = nonformatedDate.getDate() + '.' + nonformatedDate.getMonth() + '.' + nonformatedDate.getFullYear();
        //window.alert(formattedDate);
        return formattedDate;
    }

    render() {
        const { waitingLists, loading } = this.state;
        console.log("Is loading " + loading);

        if (loading) {
            return (<Loading loading={loading} />);
        }

        
        return (    
           <WaitingListSelectionForm waitingLists={waitingLists}/>
        )
    };
}

export default AllWaitingListsForHospital;