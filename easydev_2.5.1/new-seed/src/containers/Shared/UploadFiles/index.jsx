import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import showResults from '../../Show';
import DropZone from './components/DropZone';

class UploadFilesComponent extends Component {

    constructor() {
        super();

        this.processFormData = this.processFormData.bind(this);

        this.state = {
            isLoading: false
        }
    }


    processFormData(data) {
        this.setState({ isLoading: true })
        window.alert(JSON.stringify(data, null, 2));
        console.log(JSON.stringify(data, null, 2));
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
