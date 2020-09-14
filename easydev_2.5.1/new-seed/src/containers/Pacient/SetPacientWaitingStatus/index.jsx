import React from 'react';
import { Container } from 'reactstrap';
import ChangePacientWaitingStatusForm from './components/setPacientWaitingStatusForm';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import { showNotification } from './../../../shared/Notification';

class PacientWaitingStatusComponent extends React.Component {

  constructor() {
    super();

    this.state = { 
      isLoading : false,
      formSubmited: false,
      patients: []
    };

    this.processFormData = this.processFormData.bind(this);
  }

  componentDidMount() {
      this.setState({ isLoading: true });

      axios({ method: 'GET', url: '/doctor/getPacient/all', headers: { 'Identity_name': 'admin' }})
        .then(response => {
            let newPatients = []
            for (let index = 0; index < response.data.length; index++) {
                let arrayItem = response.data[index];
                let patient = {
                    'firstName': arrayItem.name,
                    'lastName': arrayItem.surname,
                    'lbo': arrayItem.lbo,
                }

                newPatients.push(patient);
            }

            this.setState({
                patients: newPatients,
                isLoading: false
            })
        }, error => {
          showNotification('danger', error);   
        })
  }


  processFormData(data) {
    this.setState({ formSubmited: true });
    const newWaitingStatus = data['waitingStatus'].value;
    
    var targetUrl;
    if (newWaitingStatus === "0") {
        targetUrl = '/doctor/resetPacientWaitingStatus';
    } else if (newWaitingStatus === "1") {
        targetUrl = '/doctor/changePacientStatusToPending';
    }

    var bodyFormData = new FormData();
    bodyFormData.set('pacientLbo', data['patient'].value);

    axios({ method: 'POST', url: targetUrl, data: bodyFormData, headers: { 'Identity_name': 'doctor1' }})
    .then(response => {
      showNotification('success', 'You have successfully changed pacient waiting status!');
    }, error => {
      showNotification('danger', error);
    }).then(() => {
      this.setState({ formSubmited: false });
    });
  }

  render() {

    const { isLoading, formSubmited, patients } = this.state;

    if (isLoading) {
        return (<Loading loading={isLoading} />);
    }

    return (
      <Container className="dashboard">
        <ChangePacientWaitingStatusForm onSubmit={this.processFormData} 
                        isLoading={formSubmited}
                        patients={patients}
        ></ChangePacientWaitingStatusForm>
      </Container>
    );
  };
}

export default PacientWaitingStatusComponent;