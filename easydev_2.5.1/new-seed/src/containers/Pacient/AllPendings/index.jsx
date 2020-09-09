import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import AllPendingsTable from './components/allPendingsTable';
import fileDownload from 'js-file-download';

class AllPendingsComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            pendings: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios({ method: 'GET', url: '/shared/getAllPendings', headers: { 'Identity_name': 'doctor' }})
        .then(response => {
            let pendings = [];
            for (let index = 0; index < response.data.length; index++) {
                let arrayItem = response.data[index];

                let isReviewed = (arrayItem.isReviewed == undefined) || (arrayItem.isReviewed == false) ? 'NO' : 'YES';

                let pending = {
                    'pacientLbo': arrayItem.pacientLbo,
                    'pacientJmbg': arrayItem.pacientJmbg,
                    'hospitalName': arrayItem.hospitalName,
                    'ordinationName': arrayItem.ordinationName,
                    'serviceName': arrayItem.serviceName,
                    'score': arrayItem.score,
                    'isReviewed': isReviewed
                }

                var documents = arrayItem.documentIds;

                if (documents === undefined) {
                    documents = [];
                }

                var links = [];
                for (var i=0; i < documents.length; i++) {
                    let test = <div><button className="base-btn" onClick={(i) => this.documentClicked(i)} value={documents[i]}>Document {[i]}</button></div>
                    links.push(test);
                }

                pending.documents = links;

                pendings.push(pending);
            }

            this.setState({
                pendings: pendings,
                loading: false
            })
        }, error => {
           window.alert(error)    
        })
      }

      documentClicked(e) {        
        let documentId = e.target.value;
        axios({ method: 'GET',
            url: '/shared/getFile',
            params: { 'fileId': documentId },
            responseType: 'blob',})
        .then(response => {
            let filename = response.headers['filename'];
            let mimeType = response.headers['mimeType'];
            fileDownload(response.data, filename, mimeType);
        }, error => {
            window.alert(error);
        });
    }

    render() {
        const { pendings, loading } = this.state;
        console.log("Is loading " + loading);

        if (loading) {
            return (<Loading loading={loading} />);
        }

        return (    
            <Container className="dashboard">
                <AllPendingsTable data={pendings}/>
            </Container>
        )
    };
}

export default AllPendingsComponent;