import React from 'react';
import { Container } from 'reactstrap';
import CreatePatientForm from './components/CreatePatientForm';
import { showNotification } from './../../../shared/Notification';
import axios from 'axios';

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

    var bodyFormData = new FormData();
    bodyFormData.set('name', data['name']);
    bodyFormData.set('surname', data['surname']);
    bodyFormData.set('jmbg', data['jmbg']);
    bodyFormData.set('lbo', data['lbo']);
    bodyFormData.set('city', data['city'].value);

    axios({ method: 'POST', url: '/doctor/addPacient', data: bodyFormData, headers: { 'Identity_name': 'admin' }})
    .then(response => {
      showNotification('success', 'You have successfully created Pacient!');
    }, error => {
      showNotification('danger', error);
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