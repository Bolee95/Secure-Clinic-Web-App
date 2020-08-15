import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ExampleCard from './components/ExampleCard';
import CheckBox from './../../shared/components/form/CheckBox';

const ExamplePage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Example Page One</h3>
      </Col>
    </Row>
    <Row>
      <ExampleCard />
    </Row>
    <Row>
      <Col md={6}>
      <CheckBox name="remember_me" label="Remember me" onChange={() => {}} />
      </Col>
    </Row>
  </Container>
);

export default ExamplePage;
