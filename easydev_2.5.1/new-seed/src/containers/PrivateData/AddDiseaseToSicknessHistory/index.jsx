import React from 'react';
import { Container } from 'reactstrap';
import AddDiseaseToSicknesshistoryForm from './components/addDiseaseToSicknessHistoryForm';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';

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
    }];

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

    axios({ method: 'GET', url: '/shared/privateData/getPacientPrivateData/all', headers: { 'Identity_name': 'doctor' }})
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
         window.alert(error)    
      })
      .then(() => {
          this.setState({
              isLoading: false
          })
      })
  }

  processFormData(data) {

    this.setState({ formSubmited: true });

    const selectedPatientPrivateData = this.state.pacientsPrivateData.find(privateData => privateData.lbo == data['patient'].value);
    const selectedDisease = data['disease'].value;
    const isActive = data['active'].value == 'YES' ? true : false;
    var bodyFormData = new FormData();
    bodyFormData.set('pacientLbo', selectedPatientPrivateData.lbo);
    bodyFormData.set('diseaseCode', selectedDisease.diseaseCode);
    bodyFormData.set('diseaseName', selectedDisease.diseaseName);
    bodyFormData.set('isActive', isActive );

    axios({ method: 'POST', url: '/shared/privateData/addNewDiseaseToSicknessHistory', data: bodyFormData, headers: { 'Identity_name': 'doctor' }})
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