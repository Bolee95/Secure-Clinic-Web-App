import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import showResults from '../../Show';
import DropZone from './components/DropZone';
import axios from 'axios';
import fileDownload from 'js-file-download';

class UploadFilesComponent extends Component {

    constructor() {
        super();

        this.processFormData = this.processFormData.bind(this);
        this.downloadFileTest = this.downloadFileTest.bind(this);

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        this.downloadFileTest();
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
        
        for (var i = 0; i< data["files"].length; i++) {
            let file = data["files"][i];
            formData.append('file[' + i + ']', file);
        }
        formData.append('fileUploaded', true);

        axios({ method: 'POST', 
                url: '/shared/uploadFiles', 
                data: formData,
                headers: { 'Identity_name': 'admin', 'content-type': 'multipart/form-data' }})
        .then(response => {
            console.log(response);
            window.alert("Succedd");
        }, error => {
            window.alert(error);
        })
        .then(() => {
            this.setState({ isLoading: false });
        });
    }

    render() {

        const { isLoading } = this.state;
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
                    <DropZone onSubmit={this.processFormData} isLoading={isLoading} />
                </Row>
            </Container>
            );
    }
}

export default UploadFilesComponent;
