import React from 'react';
import { Container } from 'reactstrap';
import AddNewServiceForm from './components/addNewServiceForm';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import { showNotification } from './../../../shared/Notification';
import importedOrdinations from './../../../resources/Ordinations';

class AddNewServiceComponent extends React.Component {

  constructor() {
    super();

    this.state = { 
      isLoading : false,
      formSubmited: false,
      ordinations: [],
      services: []
    };

    this.processFormData = this.processFormData.bind(this);
    this.updateOrdinationsAndServices = this.updateOrdinationsAndServices.bind(this);
  }

  componentDidMount() {
      this.setState({ isLoading: true });

      var ordinations = [];

      for (let index = 0; index < importedOrdinations.length; index++) {
          let ordinationItem = importedOrdinations[index];
          let ordination = {
              "name": ordinationItem['ordinationName'],
              "code": ordinationItem['ordinationCode']
          };

          var services = [];

          for(let index = 0; index < ordinationItem.services.length; index++) {
              let serviceItem = ordinationItem.services[index];
              let service = {
                  "name": serviceItem['serviceName'],
                  "code": serviceItem['serviceCode'],
                  "waitingTime": serviceItem['waitingTime']
              };

              services.push(service);
          }

          ordination.services = services;

          ordinations.push(ordination);
      }

      this.setState({
        ordinations: ordinations,
        isLoading: false
    })
  }

  updateOrdinationsAndServices(ordinationCode) {

    let selectedOrdination = this.state.ordinations.find(ordination => ordination.code === ordinationCode);

    this.setState({
         services: selectedOrdination.services,
    });
}

  processFormData(data) {

    var bodyFormData = new FormData();

    let store = require('store');
    let licenceId = store.get('user').licenceId;
    let hospitalCode = store.get('user').hospitalCode;

    this.setState({ formSubmited: true });

    if (data['ordinationCode'] === undefined) {
        this.setState({ formSubmited: false });
        showNotification('info', 'No ordination selected!');
        return;
    }

    if (data['serviceCode'] === undefined) {
        this.setState({ formSubmited: false });
        showNotification('info', 'No service selected!');
        return;
    }

    const selectedService = this.state.services.find(service => service.code === data['serviceCode'].value);
    const selectedOrdination = this.state.ordinations.find(ordination => ordination.code === data['ordinationCode'].value);

    bodyFormData.set('serviceName', selectedService['name']);
    bodyFormData.set('serviceCode', selectedService['code']);
    bodyFormData.set('ordinationName', selectedOrdination['ordinationName']);
    bodyFormData.set('ordinationCode', selectedOrdination['ordinationCode']);
    bodyFormData.set('hospitalCode', hospitalCode);

    axios({ method: 'POST', url: '/admin/addNewService', data: bodyFormData, headers: { 'Identity_name': licenceId }})
    .then(response => {
      showNotification('success', 'You have successfully added new Service!');
    }, error => {
      showNotification('danger', error.response.data.message);
    }).then(() => {
      this.setState({ formSubmited: false });
    });
  }

  render() {

    const { isLoading, formSubmited, ordinations, services } = this.state;

    var store = require('store');
    let hospitalName = store.get('user').hospitalName;

    if (isLoading) {
        return (<Loading loading={isLoading} />);
    }

    return (
      <Container className="dashboard">
        <AddNewServiceForm onSubmit={this.processFormData} 
                           updateSelectionData={this.updateOrdinationsAndServices}
                           isLoading={formSubmited}
                           ordinations={ordinations}
                           services={services}
                           hospitalName={hospitalName}>
                           </AddNewServiceForm>
      </Container>
    );
  };
}

export default AddNewServiceComponent;