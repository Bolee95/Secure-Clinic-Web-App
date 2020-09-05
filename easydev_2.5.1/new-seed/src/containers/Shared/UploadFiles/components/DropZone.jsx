import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import ExpandButton from '../../../../shared/components/Buttons/ExpandButton';
import PropTypes from 'prop-types';
import renderDropZoneMultipleField from '../../../../shared/components/form/DropZoneMultiple';
import renderSelectField from '../../../../shared/components/form/Select';

class DropZone extends PureComponent {

    static propTypes = {    
        handleSubmit: PropTypes.func.isRequired,
        pacients: PropTypes.array.isRequired,
        reset: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
      };

    render() {

        const { handleSubmit, reset, isLoading, pacients } = this.props;

        let pacientsArray = [];

        for (let index = 0; index < pacients.length; index++) {
            let privateDataItem = pacients[index];
            console.log(privateDataItem.lbo)
            let privateDataSelectItem = { value: privateDataItem.lbo, label: privateDataItem.screenName + ' - ' + privateDataItem.lbo }
            pacientsArray.push(privateDataSelectItem);
        }

        return(
        <Col md={12} lg={12}>
            <Card>
            <CardBody>
                <div className="card__title">
                </div>
                <form className="form" onSubmit={handleSubmit}>
                <Field
                    name="pacient"
                    component={renderSelectField}
                    options={pacientsArray}
                    placeholder={"Select pacient"}
                    onChange={this.pacientSelected}
                  />
                <Field
                    name="files"
                    component={renderDropZoneMultipleField}
                />
                <ButtonToolbar className="form__button-toolbar">
                <ExpandButton title="Submit" load={isLoading} ></ExpandButton>
                    <Button type="button" onClick={reset}>
                    Cancel
                    </Button>
                </ButtonToolbar>
                </form>
            </CardBody>
            </Card>
        </Col>
        );
    }
}

export default reduxForm({
  form: 'drop_files_form', 
})(DropZone);