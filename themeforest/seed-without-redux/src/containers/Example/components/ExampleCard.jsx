import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import CheckBox from './../../../shared/components/form/CheckBox';



class ExampleCard extends PureComponent {

    constructor() {
      super();
      this.state = {
        checkBoxOn: false,
      };
    }


    changeCheckbox = (e) => {
      e.preventDefault();
      this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    };

    render() {
      const { checkBoxOn } = this.state;
      console.log(checkBoxOn);
      return (
        <Col md={12}>
          <Card>
            <CardBody>
              <div className="card__title">
                <h5 className="bold-text">Example title</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
              <p>Your content here</p>
              <CheckBox name="remember _me" label="Remember me" onChange={() => {}} onClick />
            </CardBody>
          </Card>
        </Col>
      );
    }
}

export default ExampleCard;
