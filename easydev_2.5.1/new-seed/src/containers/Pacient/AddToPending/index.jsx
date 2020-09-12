import React from 'react';
import { Container } from 'reactstrap';
import AddPendingForm from './components/addPendingForm';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';

class NewPendingComponent extends React.Component {

  constructor() {
    super();

    this.state = { 
      isLoading : false,
      formSubmited: false,
      patients: [],
      hospitals: [],
      ordinations: [],
      services: []
    };

    this.processFormData = this.processFormData.bind(this);
    this.updateOrdinationsAndServices = this.updateOrdinationsAndServices.bind(this);
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
                    'city': arrayItem.city,
                    'lbo': arrayItem.lbo,
                    'jmbg': arrayItem.jmbg,
                    'hospital_name': arrayItem.hospitalName,
                    'hospital_code': arrayItem.hospitalCode,
                    'waiting_status': arrayItem.currentWaitingStatus,
                    'waiting_list_code': arrayItem.waitingListCode
                }

                if (patient['waiting_status'] == 1) {
                    newPatients.push(patient);
                }
            }

            this.setState({
                patients: newPatients,
                isLoading: false
            })
        }, error => {
           window.alert(error)    
        })

        axios({ method: 'GET', url: '/shared/getHospital/all', headers: { 'Identity_name': 'admin' }})
        .then(response => {
            let hospitals = [];
            for (let index = 0; index < response.data.length; index++) {
                let arrayItem = response.data[index];
                let hospital = {
                    'city': arrayItem.city,
                    'code': arrayItem.hospitalCode,
                    'name': arrayItem.hospitalName,
                }

                var ordinations = [];
                for (let index = 0; index < arrayItem.ordinations.length; index++) {
                  let ordinationItem = arrayItem.ordinations[index];
                  let ordination = {
                    'code': ordinationItem.ordinationCode,
                    'name': ordinationItem.ordinationName
                  }

                  ordinations.push(ordination);
                }

                hospital.ordinations = ordinations;

                var services = [];
                for (let index = 0; index < arrayItem.services.length; index++) {
                  
                  let serviceItem = arrayItem.services[index];
                  let service = {
                    'name': serviceItem.serviceName,
                    'code': serviceItem.serviceCode,
                    'dayCapacity': serviceItem.dayCapacity
                  }

                  services.push(service);
                }

                hospital.services = services;

                hospitals.push(hospital);
            }

            this.setState({
                hospitals: hospitals,
                isLoading: false
            })

        }, error => {
           window.alert(error)    
        })
  }

  updateOrdinationsAndServices(hospitalCode) {

    let selectedHospital = this.state.hospitals.find(hospital => hospital.code == hospitalCode);

    this.setState({ services: selectedHospital.services, 
                    ordinations: selectedHospital.ordinations });
  }

  processFormData(data) {

    this.setState({ formSubmited: true });

    if (data['patient'] === undefined) {
      this.setState({ formSubmited: false });
      window.alert("No patient selected");
      return;
    }

    var documentsFormData = new FormData();
    for (var i = 0; i< data["files"].length; i++) {
      let file = data["files"][i];
      documentsFormData.append('file[' + i + ']', file);
    }


    axios({ method: 'POST', 
    url: '/shared/uploadFiles', 
    data: documentsFormData,
    headers: { 'Identity_name': 'admin', 'content-type': 'multipart/form-data' }})
    .then(response => {
      this.addNewPending(data, response.data);
    }, error => {
      this.setState({ formSubmited: false });
      window.alert(error);
    });
    
  }

  addNewPending(data, documentIds) {
    var bodyFormData = new FormData();

    const selectedPatient = this.state.patients.find(patient => patient.lbo === data['patient'].value);

    bodyFormData.set('pacientLbo', data['patient'].value);
    bodyFormData.set('pacientJmbg', selectedPatient['jmbg']);
    bodyFormData.set('pacientScreenName', data['patient'].label);
    bodyFormData.set('hospitalName', data['hospitalCode'].label);
    bodyFormData.set('serviceName', data['serviceCode'].label);
    bodyFormData.set('ordinationName', data['ordinationCode'].label);
    bodyFormData.set('serviceCode', data['serviceCode'].value);
    bodyFormData.set('hospitalCode', data['hospitalCode'].value);
    bodyFormData.set('ordinationCode', data['ordinationCode'].value);
    bodyFormData.set('score', data['score']);
    bodyFormData.set('documentIds', documentIds);

    axios({ method: 'POST', url: '/doctor/createNewPending', data: bodyFormData, headers: { 'Identity_name': 'doctor1' }})
    .then(response => {
      console.log(response);
      window.alert("Succeed");
    }, error => {
      
      window.alert(error);
      console.log(error);
    }).then(() => {
      this.setState({ formSubmited: false });
    });
  }

  render() {

    const { isLoading, formSubmited, patients, hospitals, ordinations, services } = this.state;

    if (isLoading) {
        return (<Loading loading={isLoading} />);
    }

    return (
      <Container className="dashboard">
        <AddPendingForm onSubmit={this.processFormData} 
                        updateSelectionData={this.updateOrdinationsAndServices}
                        isLoading={formSubmited}
                        patients={patients}
                        hospitals={hospitals}
                        ordinations={ordinations}
                        services={services}></AddPendingForm>
      </Container>
    );
  };
}

export default NewPendingComponent;