import React from 'react';
import { Container } from 'reactstrap';
import CreatePatientForm from './components/CreatePatientForm';
import ShowResults from '../../Show';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';

class CreatePatientComponent extends React.Component {

  constructor() {
    super();

    this.state = { 
      loadingStarted : false
     };

    this.printPassedData = this.printPassedData.bind(this);
  }

  printPassedData(data) {
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
      this.setState({ loadingStarted: false});
      window.alert(error);
      console.log(error);
    })

    console.log("On submit data passed:" + JSON.stringify(data, null ,2));
  }

  render() {
      return (
      <Container className="dashboard">
        {/*<Loading loading={this.state.loadingStarted}></Loading>*/}
        <CreatePatientForm onSubmit={this.printPassedData}></CreatePatientForm>
      </Container>
      )
  };
}

export default CreatePatientComponent;