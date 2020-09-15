import React from 'react';
import { Container } from 'reactstrap';
import DeleteUserForm from './components/DeleteUserForm';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import { showNotification } from '../../../shared/Notification';

class DeleteUserComponent extends React.Component {

  constructor() {
    super();

    this.state = { 
      isLoading : false
     };

    this.processFormData = this.processFormData.bind(this);
  }

  processFormData(data) {
    this.setState({ loadingStarted: true });

    let store = require('store');
    let licenceId = store.get('user').licenceId;

    var bodyFormData = new FormData();
    bodyFormData.set('username', data['username']);

    axios({ method: 'DELETE', url: '/admin/deleteUserWallet', data: bodyFormData, headers: { 'Identity_name': licenceId }})
    .then(response => {
      showNotification('success', 'Entity successfully deleted!');
    }, error => {
      showNotification('danger', error);
    }).then(() => {
        this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
        return (<Loading loading={isLoading} />);
    }

    return (
      <Container className="dashboard">
        <DeleteUserForm onSubmit={this.processFormData}></DeleteUserForm>
      </Container>
    )
  };
}

export default DeleteUserComponent;