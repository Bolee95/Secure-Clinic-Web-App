import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DropZone from './components/DropZone';
import axios from 'axios';

class UploadFilesComponent extends Component {

    constructor() {
        super();

        this.processFormData = this.processFormData.bind(this);
        this.downloadFileTest = this.downloadFileTest.bind(this);
        this.getPacientsPrivateData = this.getPacientsPrivateData.bind(this);
        this.updatePacientsDocumentsList = this.updatePacientsDocumentsList.bind(this);

        this.state = {
            isLoading: false,
            pacientsPrivateData: []
        }
    }

    componentDidMount() {
        this.downloadFileTest();
        this.getPacientsPrivateData();
    }

    getPacientsPrivateData() {

        this.setState({ loading: true });
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
           window.alert(error);    
        })
    }

    downloadFileTest() {
        // axios({ method: 'GET',
        //         url: '/shared/getFile',
        //         params: { 'fileId': '7UVTuqzpc8LdBFkbvbVeL8' },
        //         responseType: 'blob',})
        //         .then(response => {
        //             let filename = response.headers['filename'];
        //             let mimeType = response.headers['mimeType'];
        //             fileDownload(response.data, filename, mimeType);
        //         }, error => {
        //             window.alert(error);
        //         });
    }


    processFormData(data) {
        this.setState({ isLoading: true });

        let formData = new FormData();

        if (data["pacient"] === undefined) {
            window.alert("No pacient has been selected");
            this.setState({ isLoading: false });
            return;
        } 
        let selectedPacientsLbo = data["pacient"].value;

        for (var i = 0; i< data["files"].length; i++) {
            let file = data["files"][i];
            formData.append('file[' + i + ']', file);
        }

        axios({ method: 'POST', 
                url: '/shared/uploadFiles', 
                data: formData,
                headers: { 'Identity_name': 'admin', 'content-type': 'multipart/form-data' }})
        .then(response => {
            
            this.updatePacientsDocumentsList(response.data, selectedPacientsLbo);
            
        }, error => {
            this.setState({ isLoading: false });
            window.alert(error);
        });
    }

    updatePacientsDocumentsList(documentsList, pacientLbo) {

        let formData = new FormData();

        formData.set('pacientLbo', pacientLbo);
        formData.set('documentId', documentsList);
        axios({ method: 'POST',
                url: '/shared/privateData/addNewDocumentId',
                data: formData,
                headers: { 'Identity_name': 'admin' } })
        .then(response => {
            window.alert("Succedd");
        }, error => {
            window.alert(error);
        })
        .then(() => {
            this.setState({ isLoading: false });
        });

    }

    render() {

        const { isLoading, pacientsPrivateData } = this.state;
        return (
            <Container>
                <Row>
                    <Col md={12}>
                    <h4 className="page-title" >Pacient files</h4>
                        <h3 className="page-subhead subhead">Please, drop manually or select files which should be associeted with pacient
                        </h3>
                    </Col>
                </Row>
                <Row>

                    <DropZone onSubmit={this.processFormData} isLoading={isLoading} pacients={pacientsPrivateData} />
                </Row>
            </Container>
            );
    }
}

export default UploadFilesComponent;
