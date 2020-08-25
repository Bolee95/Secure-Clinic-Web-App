/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Card, CardBody, Col } from 'reactstrap';
import { ThemeProps } from '../../../../shared/prop-types/ReducerProps';
import renderSelectField from '../../../../shared/components/form/Select';
import AllPacientsPrivateDataTable from '../components/allPacientsPrivateDataTable';
import { Container } from 'reactstrap';
import { array } from 'prop-types';


class AllPacientsPrivateDataForm extends PureComponent {
  static propTypes = {
    pacientsPrivateData: array.isRequired,
    theme: ThemeProps.isRequired
  };

  constructor() {
    super();
    this.pacientSelected = this.pacientSelected.bind(this);

    this.state = {
        sicknessHistory: []
    }
  }

  pacientSelected(e) {  
        const selectedPacientPrivateData = this.props.pacientsPrivateData.find(privateData => privateData.lbo == e.value); 
        if (selectedPacientPrivateData != null) {
            this.setState({ sicknessHistory: selectedPacientPrivateData.sicknessHistory });
      }
  }

  render() {
    const { pacientsPrivateData } = this.props;
    const { sicknessHistory } = this.state;

    let pacientsArray = [];

    for (let index = 0; index < pacientsPrivateData.length; index++) {
        let privateDataItem = pacientsPrivateData[index];
        console.log(privateDataItem.lbo)
        let privateDataSelectItem = { value: privateDataItem.lbo, label: privateDataItem.screenName + ' - ' + privateDataItem.lbo }
        pacientsArray.push(privateDataSelectItem);
    }

    return (      
        <Container className="dashboard">
        <Col md={12} lg={12}>
        <Card>
            <CardBody>
            <div className="card__title">
                <h5 className="bold-text">All pacients private data</h5>
                <h5 className="subhead">List of all pacients private data registered in system</h5>
            </div>
            <form className="form" onSubmit={() => {}}>
              <div className="form__form-group">
            <span className="form__form-group-label">Pacient private data</span>
                <div className="form__form-group-field">
                  <Field
                    name="waitingList"
                    component={renderSelectField}
                    options={pacientsArray}
                    placeholder={"Select pacient"}
                    onChange={this.pacientSelected}
                  />
                </div>
            </div>
            </form>
            <AllPacientsPrivateDataTable sicknessHistory={sicknessHistory}/> 
            </CardBody>
        </Card>
        </Col>
        </Container>
    );
  }
}

export default reduxForm({
     form: 'AllPacientsPrivateDataForm'
})(AllPacientsPrivateDataForm);