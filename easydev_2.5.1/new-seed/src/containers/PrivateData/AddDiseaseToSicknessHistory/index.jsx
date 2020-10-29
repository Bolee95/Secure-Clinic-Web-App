import React from 'react';
import { Container } from 'reactstrap';
import AddDiseaseToSicknesshistoryForm from './components/addDiseaseToSicknessHistoryForm';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import { showNotification } from './../../../shared/Notification';

class AddDiseaseToSicknessHistoryComponent extends React.Component {

  constructor() {
    super();

    const diseases = [{
        'diseaseCode': 'AA1',
        'diseaseName': 'Artritis'
    },
    {   
        'diseaseCode': 'AA2',
        'diseaseName': 'AHA'
    },
    {  
        'diseaseCode': 'AA3',
        'diseaseName': 'Hipotermija'
    },
    {
        'diseaseCode': 'AA4',
        'diseaseName': 'Bronhitis',
    },
    {
        'diseaseCode': 'AA5',
        'diseaseName': 'Aritmija'
    }
  ];

    this.state = { 
      isLoading : false,
      pacientsPrivateData: [],
      diseases: diseases,
      formSubmited: false
    };

    this.processFormData = this.processFormData.bind(this);
    this.loadPacientsPrivateData = this.loadPacientsPrivateData.bind(this);
  }

  componentDidMount() {
    this.loadPacientsPrivateData();
  }

  loadPacientsPrivateData() {
    this.setState({ isLoading: true });

    axios({ method: 'GET', url: '/shared/privateData/getPacientPrivateData/all', headers: { 'Identity_name': 'doctor1' }})
      .then(response => {
        let pacientsPrivateData = [];
        for (let index = 0; index < response.data.length; index++) {
            let privateDataItem = response.data[index];
            let pacientPrivateData = {
                'key': privateDataItem.key,
                'lbo': privateDataItem.lbo,
                'cardId': privateDataItem.cardId,
                'screenName': privateDataItem.screenName
            }
   
            pacientsPrivateData.push(pacientPrivateData);
        }

        this.setState({
            pacientsPrivateData: pacientsPrivateData,
            loading: false
        })
      }, error => {
         showNotification('danger', error.response.data.message);
      })
      .then(() => {
          this.setState({
              isLoading: false
          })
      })
  }

  processFormData(data) {

    var store = require('store');
    const licenceId = store.get('user').licenceId;

    this.setState({ formSubmited: true });

    if (data['disease'] === undefined) {
      showNotification('danger', 'No disase selected');
      this.setState({ formSubmited: false });
      return;
    }

    const selectedPatientPrivateData = this.state.pacientsPrivateData.find(privateData => privateData.lbo === data['patient'].value);
    const selectedDisease = data['disease'].value;
    const isActive = data['active'].value === 'YES' ? true : false;
    var bodyFormData = new FormData();
    bodyFormData.set('pacientLbo', selectedPatientPrivateData.lbo);
    bodyFormData.set('diseaseCode', selectedDisease.diseaseCode);
    bodyFormData.set('diseaseName', selectedDisease.diseaseName);
    bodyFormData.set('isActive', isActive );

    axios({ method: 'POST', url: '/shared/privateData/addNewDiseaseToSicknessHistory', data: bodyFormData, headers: { 'Identity_name': licenceId }})
    .then(response => {
      showNotification('success', 'You have successfully added new Disease to Sickness History!');
    }, error => {
      showNotification('danger', error.response.data.message);
    }).then(() => {
      this.setState({ formSubmited: false });
    });
  }

  render() {

    const { isLoading, pacientsPrivateData, formSubmited, diseases} = this.state;

    if (isLoading) {
        return (<Loading loading={isLoading} />);
    }

    return (
      <Container className="dashboard">
        <AddDiseaseToSicknesshistoryForm onSubmit={this.processFormData} 
                                        updateSelectionData={this.updateOrdinationsAndServices}
                                        isLoading={formSubmited}
                                        pacientsPrivateData={pacientsPrivateData}
                                        diseases={diseases}/>
      </Container>
    );
  };
}

export default AddDiseaseToSicknessHistoryComponent;