import React from 'react';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import AllPacientsPrivateDataForm from './components/allPacientsPrivateDataForm';
import { showNotification } from './../../../shared/Notification';

class AllPacientsPrivateDataComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            pacientsPrivateData: [],
        };
    }

    componentDidMount() {
        this.pacientsPrivateData();
    }

    pacientsPrivateData() {
        var store = require('store');
        const licenceId = store.get('user').licenceId;
        this.setState({ loading: true });

        axios({ method: 'GET', url: '/shared/privateData/getPacientPrivateData/all', headers: { 'Identity_name': licenceId }})
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

                let documentIds = [];
                let documentsIdsArray = privateDataItem.documentsIds;
                
                for (let index = 0; index < documentsIdsArray.length; index++) {
                    documentIds.push(documentsIdsArray[index]);
                }

                pacientPrivateData.documentIds = documentIds;

                let sicknessHistory = [];
                let diseaseArray = privateDataItem.sicknessHistory;
                
                for (let index = 0; index < diseaseArray.length; index++) {
                    let diseaseItem = diseaseArray[index];
                    let disease = {
                        'active': diseaseItem.isActive ? 'YES' : 'NO',
                        'diseaseCode': diseaseItem.diseaseCode,
                        'diseaseName': diseaseItem.diseaseName
                    }
                    sicknessHistory.push(disease);
                }

                pacientPrivateData.sicknessHistory = sicknessHistory;

                pacientsPrivateData.push(pacientPrivateData);
            }

            this.setState({
                pacientsPrivateData: pacientsPrivateData,
                loading: false
            })
        }, error => {
           showNotification('danger', error.response.data.message);
        })
    }

    render() {
        const { pacientsPrivateData, loading } = this.state;

        if (loading) {
            return (<Loading loading={loading} />);
        }

        return (    
           <AllPacientsPrivateDataForm pacientsPrivateData={pacientsPrivateData}/>
        )
    };
}

export default AllPacientsPrivateDataComponent;