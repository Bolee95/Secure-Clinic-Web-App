import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import ExpandButton from '../../../../shared/components/Buttons/ExpandButton';
import PropTypes from 'prop-types';
import renderDropZoneMultipleField from '../../../../shared/components/form/DropZoneMultiple';

class DropZone extends PureComponent {

    static propTypes = {    
        handleSubmit: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
      };

    render() {

        const { handleSubmit, reset, isLoading } = this.props;

        return(
        <Col md={12} lg={12}>
            <Card>
            <CardBody>
                <div className="card__title">
                {/* <h5 className="subhead">Please, drop manually of select files that you want to upload</h5> */}
                </div>
                <form className="form" onSubmit={handleSubmit}>
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