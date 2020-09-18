import axios from 'axios';
import React from 'react';
import { Container } from 'reactstrap';
import CreateUserForm from './components/CreateUserForm';
import { showNotification } from '../../../shared/Notification';

class CreateUserComponent extends React.Component {

  constructor() {
    super();

    this.state = { 
      isLoading : false
     };

    this.processFormData = this.processFormData.bind(this);
    this.createNewEntity = this.createNewEntity.bind(this);
  }

  processFormData(data) {
    
    this.setState({ isLoading: true });

    let store = require('store');
    let licenceId = store.get('user').licenceId;

    var bodyFormData = new FormData();
    bodyFormData.set('userName', data['licenceId']);

    axios({ method: 'POST', url: '/admin/registerUserWallet', data: bodyFormData, headers: { 'Identity_name': licenceId }})
    .then(response => {
      this.createNewEntity(data);
    }, error => {
      showNotification('danger', error.response.data.message);
      this.setState({ isLoading: false });
    });
  }

  createNewEntity(data) {

    var store = require('store');
    let currentUser = store.get('user');
    
    var formData = new FormData();
    formData.set('licenceId', data['licenceId']);
    formData.set('role', data['role'].value);
    formData.set('name', data['name']);
    formData.set('surname', data['surname']);
    formData.set('hospitalName', currentUser.hospitalName);
    formData.set('hospitalCode', currentUser.hospitalCode);


    axios({ method: 'POST', url: '/admin/createEntity', data: formData, headers: { 'Identity_name': currentUser.licenceId }})
    .then(response => {
      showNotification('success', 'New Entity successfully created!');
    }, error => {
      showNotification('danger', error.response.data.message);
    })
    .then( () => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Container className="dashboard">
        <CreateUserForm onSubmit={this.processFormData} isLoading={isLoading}></CreateUserForm>
      </Container>
    )
  };
}

export default CreateUserComponent;