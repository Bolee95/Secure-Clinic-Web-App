import React from 'react';
import {
    Container
} from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import AllAmmendsForHospitalTable from './components/allAmmendsForHospitalTable';
import fileDownload from 'js-file-download';

class AllAmmendsForHospital extends React.Component {

        constructor() {
            super();

            this.state = {
                loading: false,
                ammends: []
            };

            this.approveTapped = this.approveTapped.bind(this);
            this.documentClicked = this.documentClicked.bind(this);
            this.getPatients = this.getPatients.bind(this);
        }

        componentDidMount() {
            this.getPatients();
        }

        getPatients() {
            var store = require('store');
            // TO-DO: Return old implementation, current one is for testing only!
            const hospitalCode = 'AA'; //store.get('user').hospitalCode;

            this.setState({
                loading: true
            });
            axios({
                    method: 'GET',
                    url: '/shared/getAllAmmendsForHosptial',
                    headers: {
                        'Identity_name': 'doctor'
                    },
                    params: {
                        'hospitalCode': hospitalCode
                    }
                })
                .then(response => {
                    let ammends = [];
                    for (let index = 0; index < response.data.length; index++) {
                        let arrayItem = response.data[index];
                        let ammend = {
                            'index': index,
                            'action': arrayItem.action,
                            'description': arrayItem.description,
                            'hospitalCode': arrayItem.hospitalCode,
                            'ordinationCode': arrayItem.ordinationCode,
                            'serviceCode': arrayItem.serviceCode,
                            'pacientLbo': arrayItem.pacientLbo,
                        }

                        var evidences = arrayItem.evidences;

                        if (evidences === undefined) {
                            evidences = [];
                        }

                        var links = [];
                        for (var i = 0; i < evidences.length; i++) {
                            let test = <div> <button className = "base-btn"
                            onClick = {
                                (i) => this.documentClicked(i)
                            }
                            value = {
                                evidences[i]
                                }> Evidence {[i]} </button></div>
                                links.push(test);
                        }

                        ammend.evidences = links;


                        let isReviewed = arrayItem.isReviewed;
                        if (isReviewed !== undefined && !isReviewed) {
                            ammends.push(ammend);
                        }
                    }

                    this.setState({
                        ammends: ammends,
                        loading: false
                    });
                }, error => {
                    window.alert(error)
                })
                .then(() => {
                    this.setState({
                        loading: false
                    });
                })
        }

        documentClicked(e) {
            let documentId = e.target.value;
            axios({
                    method: 'GET',
                    url: '/shared/getFile',
                    params: {
                        'fileId': documentId
                    },
                    responseType: 'blob',
                })
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

            axios({
                    method: 'POST',
                    url: '/shared/approveAmmend',
                    data: bodyFormData,
                    headers: {
                        'Identity_name': 'doctor'
                    }
                })
                .then(response => {
                    window.alert('success!');
                    this.getPatients();
                }, error => {
                    window.alert('error');
                })
        }

        render() {
            const {
                ammends,
                loading
            } = this.state;

            if (loading) {
                return ( < Loading loading = {
                        loading
                    }
                    />);
                }

                return ( 
                    <Container className = "dashboard" >
                    <AllAmmendsForHospitalTable data = { ammends }
                                                 onApprove = { this.approveTapped }
                    />
                     </Container>
                )
            };
        }

        export default AllAmmendsForHospital;