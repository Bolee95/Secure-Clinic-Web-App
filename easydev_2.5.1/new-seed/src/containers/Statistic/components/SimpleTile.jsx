/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import {
  Card, CardBody, Col, Progress,
} from 'reactstrap';

const SimpleTile = ({ title, color, value }) => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <CardBody className="dashboard__card-widget">
        <div className="mobile-app-widget">
          <div className="mobile-app-widget__top-line mobile-app-widget__top-line--lime">
            <p className="mobile-app-widget__total-stat">{value}</p>
            <TrendingUpIcon className="dashboard__trend-icon" />
          </div>
          <div className="mobile-app-widget__title">
            <h5>{title}</h5>
          </div>
          <div className={"progress-wrap progress-wrap--small progress-wrap--" + color + "-gradient progress-wrap--label-top"}>
            <Progress value={100}><p className="progress__label"></p></Progress>
          </div>
        </div>
      </CardBody>
    </Card>
  </Col>
);

SimpleTile.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default SimpleTile;
