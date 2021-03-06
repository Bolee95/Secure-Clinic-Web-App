import React from 'react';
import {
    Container
} from 'reactstrap';
import AmmendForm from './components/ammendForm';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import { showNotification } from './../../../shared/Notification';

class CreateAmmendComponent extends React.Component {

        constructor() {
            super();

            this.state = {
                isLoading: false,
                formSubmited: false,
                pacients: [],
                waitingLists: []
            };

            this.processFormData = this.processFormData.bind(this);
            this.updatePacients = this.updatePacients.bind(this);
            this.createNewAmmend = this.createNewAmmend.bind(this);
        }

        componentDidMount() {

            var hospitalCode;
            var store = require('store');
            var user = store.get('user');
            if (user !== undefined) {
                hospitalCode = user.hospitalCode;
                if (hospitalCode === undefined) {
                    // TO-DO: should be removed, this is for testing purposes only!
                    hospitalCode = 'AA';
                }
            }

            this.setState({
                isLoading: true
            });

            axios({
                    method: 'GET',
                    url: '/shared/getAllWaitingListsForHospital',
                    headers: { 'Identity_name': user.licenceId },
                    params: { 'hospitalCode': hospitalCode  }
                })
                .then(response => {
                    let waitingLists = [];
                    for (let index = 0; index < response.data.length; index++) {
                        let arrayItem = response.data[index];
                        let waitingList = {
                            'key': arrayItem.key,
                            'hospitalCode': arrayItem.hospitalCode,
                            'ordinationCode': arrayItem.ordinationCode,
                            'serviceCode': arrayItem.serviceCode,
                            'hospitalName': arrayItem.hospitalName,
                            'ordinationName': arrayItem.ordinationName,
                            'serviceName': arrayItem.serviceName,
                            'maxWaitingDays': arrayItem.maxWaitingDays,
                        }


                        var pacients = [];
                        for (let index = 0; index < arrayItem.pacients.length; index++) {
                            let pacientItem = arrayItem.pacients[index];
                            let pacient = {
                                'lbo': pacientItem.pacientLbo,
                                'screenName': pacientItem.pacientScreenName
                            }

                            pacients.push(pacient);
                        }

                        waitingList.pacients = pacients;

                        waitingLists.push(waitingList);
                    }

                    this.setState({
                        waitingLists: waitingLists,
                        isLoading: false
                    })
                }, error => {
                    showNotification('danger', error.response.data.message);
                })
        }

        updatePacients(waitingListKey) {

            let selectedWaitingList = this.state.waitingLists.find(waitingList => waitingList.key === waitingListKey);

            this.setState({
                pacients: selectedWaitingList.pacients
            });
        }

        processFormData(data) {

            let store = require('store');
            let licenceId = store.get('user').licenceId;

            this.setState({
                formSubmited: true
            });

            if (data['pacient'] === undefined) {
                this.setState({
                    formSubmited: false
                });
                showNotification('info', 'No pacient selected!');
                return;
            }

            if (data['reason'] === undefined) {
                this.setState({
                    formSubmited: false
                });
                showNotification('info', 'No Ammend reason selected!');
                return;
            }

            var documentsFormData = new FormData();

            if (data["files"] === undefined) {
                data["files"] = [];
            }

            for (var i = 0; i < data["files"].length; i++) {
                let file = data["files"][i];
                documentsFormData.append('file[' + i + ']', file);
            }

            axios({
                    method: 'POST',
                    url: '/shared/uploadFiles',
                    data: documentsFormData,
                    headers: {
                        'Identity_name': licenceId,
                        'content-type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.createNewAmmend(data, response.data);
                }, error => {
                    this.setState({
                        formSubmited: false
                    });
                    showNotification('danger', error.response.data.message);
                });
        }

        createNewAmmend(data, documentIds) {
            var bodyFormData = new FormData();

            let store = require('store');
            let licenceId = store.get('user').licenceId;

            const selectedPacient = this.state.pacients.find(pacient => pacient.lbo === data['pacient'].value);
            const selectedWaitingList = this.state.waitingLists.find(waitingList => waitingList.key === data['waitingList'].value);

            bodyFormData.set('pacientLbo', selectedPacient.lbo);
            bodyFormData.set('screenname', selectedPacient.screenName);
            bodyFormData.set('action', data['reason'].value);
            bodyFormData.set('description', data['description']);
            bodyFormData.set('evidencesIds', documentIds);
            bodyFormData.set('hospitalCode', selectedWaitingList.hospitalCode);
            bodyFormData.set('ordinationCode', selectedWaitingList.ordinationCode);
            bodyFormData.set('serviceCode', selectedWaitingList.serviceCode);
            bodyFormData.set('hospitalName', selectedWaitingList.hospitalName);
            bodyFormData.set('ordinationName', selectedWaitingList.ordinationName);
            bodyFormData.set('serviceName', selectedWaitingList.serviceName);

            axios({
                    method: 'POST',
                    url: '/shared/createAmmend',
                    data: bodyFormData,
                    headers: {
                        'Identity_name': licenceId
                    }
                })
                .then(response => {
                    showNotification('success', 'You have successfully created Ammend!');
                }, error => {
                    showNotification('danger', error.response.data.message);
                }).then(() => {
                    this.setState({
                        formSubmited: false
                    });
                });
        }

        render() {

            const {
                isLoading,
                formSubmited,
                pacients,
                waitingLists
            } = this.state;

            if (isLoading) {
                return ( < Loading loading = {
                        isLoading
                    }
                    />);
                }

                return (
                <Container className="dashboard">
                    <AmmendForm onSubmit={ this.processFormData } 
                                updateSelectionData={ this.updatePacients } 
                                isLoading={ formSubmited }
                                pacients={ pacients } 
                                waitingLists={ waitingLists } 
                                >
                    </AmmendForm>
                </Container>
                );
            };
        }

        export default CreateAmmendComponent;