import axios from 'axios';
import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import CreateUserForm from './components/CreateUserForm';

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

    var bodyFormData = new FormData();
    bodyFormData.set('userName', data['licenceId']);

    axios({ method: 'POST', url: '/admin/registerUserWallet', data: bodyFormData, headers: { 'Identity_name': 'admin' }})
    .then(response => {
      this.createNewEntity(data);
    }, error => {
      window.alert(error);
      this.setState({ isLoading: false });
    });
  }

  // identityName, licenceId, role, name, surname, hospitalName, hospitalCode
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

    axios({ method: 'POST', url: '/admin/createEntity', data: formData, headers: { 'Identity_name': 'admin' }})
    .then(response => {
      window.alert('success!');
    }, error => {
      window.alert(error);
    })
    .then( () => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;

    // if (isLoading) {
    //     return (<Loading loading={isLoading} />);
    // }

    return (
      <Container className="dashboard">
        <CreateUserForm onSubmit={this.processFormData} isLoading={isLoading}></CreateUserForm>
      </Container>
    )
  };
}

export default CreateUserComponent;