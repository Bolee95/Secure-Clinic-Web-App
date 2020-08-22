import React from 'react';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import WaitingListForPacientTable from './components/WaitingListForPacientTable';
import { Container } from 'reactstrap';
import { isThisHour } from 'date-fns/esm';

class WaitingListForPacientComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            pacients: [],
            title: ''
        };

        this.returnFormatedDate = this.returnFormatedDate.bind(this);
    
    }

    componentDidMount() {
        this.getWaitingList();
    }

    getWaitingList() {
        var store = require('store');
        const hospitalCode = store.get('user').hospitalCode;
        const ordinationCode = store.get('user').ordinationCode;
        const serviceCode = store.get('user').serviceCode;

        this.setState({ loading: true });
        axios({ method: 'GET', url: '/shared/getWaitingList', headers: { 'Identity_name': 'doctor' }, params: { 'hospitalCode': hospitalCode, 'ordinationCode': ordinationCode, 'serviceCode': serviceCode }})
        .then(response => {
            let title;
            let pacients = [];   
            let waitingListItem = response.data;

            let waitingList = {
                'key': waitingListItem.key,
                'hospitalName': waitingListItem.hospitalName,
                'ordinationName': waitingListItem.ordinationName,
                'serviceName': waitingListItem.serviceName,
                'maxWaitingDays': waitingListItem.maxWaitingDays
            }

            title = waitingList.serviceName + ', ' + waitingList.ordinationName + ', ' + waitingList.hospitalName;
            let pacientsArray = waitingListItem.pacients;
            
            if (pacientsArray) {
                for (let index = 0; index < pacientsArray.length; index++) {
                    let pacientItem = pacientsArray[index];
                    let pacient = {
                        'index': index + 1,
                        'pacientLbo': pacientItem.pacientLbo,
                        'pacientScore': pacientItem.pacientScore,
                        'maxWaitingDate': this.returnFormatedDate(pacientItem.maxWaitingDate),
                        'dateOfPlacement': this.returnFormatedDate(pacientItem.dateOfPlacement)
                    }

                    pacients.push(pacient);
                }
            }

            waitingList.pacients = pacients;
            this.setState({
                pacients: pacients,
                loading: false,
                title: title
            })
        }, error => {
           window.alert(error);    
        }).then(() => {
            this.setState({
                loading: false
            });
        })
    }

    returnFormatedDate(date) {
        const nonformatedDate = new Date(date); 
        let formattedDate = nonformatedDate.getDate() + '.' + nonformatedDate.getMonth() + '.' + nonformatedDate.getFullYear();
        return formattedDate;
    }

    render() {
        const { pacients, loading, title } = this.state;

        if (loading) {
            return (<Loading loading={loading} />);
        }

        return (    
            <Container className="dashboard">
             <WaitingListForPacientTable pacients={pacients} title={title} />
           </Container>
        )
    };
}

export default WaitingListForPacientComponent;