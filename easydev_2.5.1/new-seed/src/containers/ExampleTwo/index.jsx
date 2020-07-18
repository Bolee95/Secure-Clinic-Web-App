import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ExampleCard from './components/ExampleCard';
import BasicTable from './components/BasicTable';
import ResponsiveTable from './components/ResponsiveTable';
import BorderedTable from './components/BorderedTable';

const ExamplePage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Example Page Two</h3>
      </Col>
      <Col md={12}>
       <BorderedTable></BorderedTable>
      </Col>
      <Col md={12}>
        <ResponsiveTable></ResponsiveTable>
      </Col>
    </Row>
    <Row>
      <ExampleCard />
    </Row>
  </Container>
);

export default ExamplePage;
