import React from 'react';
import {
    Container
} from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import AllAmmendsForHospitalTable from './components/allAmmendsForHospitalTable';
import fileDownload from 'js-file-download';
import { ammendStringForType } from './../../../shared/AmmendType';

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
            
            const hospitalCode = store.get('user').hospitalCode;
            const licenceId = store.get('user').licenceId;

            this.setState({
                loading: true
            });
            axios({
                    method: 'GET',
                    url: '/shared/getAllAmmendsForHosptial',
                    headers: {
                        'Identity_name': 'doctor1'
                    },
                    params: {
                        'hospitalCode': hospitalCode,
                        'licenceId': licenceId
                    }
                })
                .then(response => {
                    let ammends = [];
                    for (let index = 0; index < response.data.length; index++) {
                        let arrayItem = response.data[index];
                        let ammend = {
                            'index': index,
                            'action': ammendStringForType(arrayItem.action),
                            'description': arrayItem.description,
                            'hospitalName': arrayItem.hospitalName,
                            'ordinationName': arrayItem.ordinationName,
                            'serviceName': arrayItem.serviceName,
                            'hospitalCode': arrayItem.hospitalCode,
                            'ordinationCode': arrayItem.ordinationCode,
                            'serviceCode': arrayItem.serviceCode,
                            'pacientLbo': arrayItem.pacientLbo,
                            'screenname': arrayItem.screenName,
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

            let approvedAmmend = this.state.ammends.find(ammend =>  ammend.pacientLbo === rowData.pacientLbo);

            var bodyFormData = new FormData();
            bodyFormData.set('licenceId', licenceId);
            bodyFormData.set('pacientLbo', approvedAmmend.pacientLbo);
            bodyFormData.set('serviceCode', approvedAmmend.serviceCode);
            bodyFormData.set('hospitalCode', approvedAmmend.hospitalCode);
            bodyFormData.set('ordinationCode', approvedAmmend.ordinationCode);

            axios({
                    method: 'POST',
                    url: '/shared/approveAmmend',
                    data: bodyFormData,
                    headers: {
                        'Identity_name': 'doctor1'
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