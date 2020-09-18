import React from 'react';
import { Container } from 'reactstrap';
import CreatePatientForm from './components/CreatePatientForm';
import { showNotification } from './../../../shared/Notification';
import axios from 'axios';
import { store } from 'store';

class CreatePatientComponent extends React.Component {

  constructor() {
    super();

    this.state = { 
      isLoading : false
    };

    this.processFormData = this.processFormData.bind(this);
  }

  processFormData(data) {
    this.setState({ isLoading: true });

    var store = require('store');
    let hospitalCode = store.get('user').hospitalCode;
    let hospitalName = store.get('user').hospitalName;
    let licenceId = store.get('user').licenceId;

    var bodyFormData = new FormData();
    bodyFormData.set('name', data['name']);
    bodyFormData.set('surname', data['surname']);
    bodyFormData.set('jmbg', data['jmbg']);
    bodyFormData.set('lbo', data['lbo']);
    bodyFormData.set('city', data['city'].value);
    bodyFormData.set('hospitalCode', hospitalCode);
    bodyFormData.set('hospitalName', hospitalName);

    axios({ method: 'POST', url: '/doctor/addPacient', data: bodyFormData, headers: { 'Identity_name': licenceId }})
    .then(response => {
      showNotification('success', 'You have successfully created Pacient!');
    }, error => {
      showNotification('danger', error.response.data.message);
    }).then(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {

    const { isLoading } = this.state;

    return (
      <Container className="dashboard">
        <CreatePatientForm onSubmit={this.processFormData} isLoading={isLoading}></CreatePatientForm>
      </Container>
    )
  };
}

export default CreatePatientComponent;