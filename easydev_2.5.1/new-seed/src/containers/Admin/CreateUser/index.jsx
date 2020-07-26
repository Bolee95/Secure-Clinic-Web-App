import React from 'react';
import { Container } from 'reactstrap';
import CreateUserForm from './components/CreateUserForm';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';

class CreateUserComponent extends React.Component {

  constructor() {
    super();

    this.state = { 
      isLoading : false
     };

    this.processFormData = this.processFormData.bind(this);
  }

  processFormData(data) {
    this.setState({ loadingStarted: true });

    var bodyFormData = new FormData();
    bodyFormData.set('userName', data['username']);

    axios({ method: 'POST', url: '/admin/registerUserWallet', data: bodyFormData, headers: { 'Identity_name': 'admin' }})
    .then(response => {
      console.log(response);
      window.alert("Succedd");
    }, error => {
      window.alert(error);
      console.log(error);
    }).then(() => {
        this.setState({ isLoading: false });
    });
    console.log("On submit data passed:" + JSON.stringify(data, null ,2));
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
        return (<Loading loading={isLoading} />);
    }

    return (
      <Container className="dashboard">
        <CreateUserForm onSubmit={this.processFormData}></CreateUserForm>
      </Container>
    )
  };
}

export default CreateUserComponent;