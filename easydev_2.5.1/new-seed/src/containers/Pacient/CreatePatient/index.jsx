import React from 'react';
import { Container } from 'reactstrap';
import CreatePatientForm from './components/CreatePatientForm';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';

class CreatePatientComponent extends React.Component {

  constructor() {
    super();

    this.state = { 
      loadingStarted : false
    };

    this.processFormData = this.processFormData.bind(this);
  }

  processFormData(data) {
    this.setState({ loadingStarted: true });

    var bodyFormData = new FormData();
    bodyFormData.set('Name', data['name']);
    bodyFormData.set('Surname', data['surname']);
    bodyFormData.set('jmbg', data['jmbg']);
    bodyFormData.set('lbo', data['lbo']);

    axios({ method: 'POST', url: '/doctor/addPacient', data: bodyFormData, headers: { 'Identity_name': 'admin' }})
    .then(response => {
      console.log(response);
      window.alert("Succeed");
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
      return <Loading loading={isLoading}/>
    }


    return (
      <Container className="dashboard">
        <CreatePatientForm onSubmit={this.processFormData}></CreatePatientForm>
      </Container>
    )
  };
}

export default CreatePatientComponent;