import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import AllPendingsForHospitalTable from './components/allPendingsForHospitalTable';
import fileDownload from 'js-file-download';

class AllPendingsForHospitalComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            pendings: []
        };

        this.approveTapped = this.approveTapped.bind(this);
        this.documentClicked = this.documentClicked.bind(this);
    }

    componentDidMount() {
        this.getPatients();
    }

    getPatients() {
        var store = require('store');
        const hospitalCode = store.get('user').hospitalCode;

        this.setState({ loading: true });
        axios({ method: 'GET', url: '/shared/getPendingsForHospital', headers: { 'Identity_name': 'doctor1' }, params: { 'hospitalCode': hospitalCode }})
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

                let documents = arrayItem.documentIds;

                var links = [];
                for (var i=0; i < documents.length; i++) {
                    let test = <div><button className="base-btn" onClick={(i) => this.documentClicked(i)} value={documents[i]}>Document {[i]}</button></div>
                    links.push(test);
                }

                pending.documents = links;


                let isReviewed = arrayItem.isReviewed;
                if (isReviewed !== undefined && !isReviewed) {
                    pendings.push(pending);
                }   
            }

            this.setState({
                pendings: pendings,
                loading: false
            })
        }, error => {
           window.alert(error)    
        })
    }

    documentClicked(e) {        
        let documentId = e.target.value;
        axios({ method: 'GET',
            url: '/shared/getFile',
            params: { 'fileId': documentId },
            responseType: 'blob',})
        .then(response => {
            let filename = response.headers['filename'];
            let mimeType = response.headers['mimeType'];
            fileDownload(response.data, filename, mimeType);
        }, error => {
            window.alert(error);
        });
    }

    approveTapped(rowData) {

        const storage = require('store');
        const licenceId = storage.get('user').licenceId;

        var bodyFormData = new FormData();
        bodyFormData.set('licenceId', licenceId);
        bodyFormData.set('pacientLbo', rowData.pacientLbo);
        bodyFormData.set('serviceCode', rowData.serviceCode);
        bodyFormData.set('hospitalCode', rowData.hospitalCode);
        bodyFormData.set('ordinationCode', rowData.ordinationCode);

        axios({ method: 'POST', url: '/shared/approvePending', data: bodyFormData, headers: { 'Identity_name': 'doctor1' } })
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