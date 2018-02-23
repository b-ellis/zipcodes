import React, { Component } from 'react';
import { Form, Text, StyledText } from 'react-form';

class ZipForm extends Component {

    constructor(){
        super();
    }

    warningValidator(values) {
        const zipcode = /\d{5}(?:[-\s]\d{4})?/g;

        return {
            zipOne: !values.zipOne ||
                !values.zipOne.match(zipcode) ? 'Input a valid zipcode' : null,
            zipTwo: !values.zipTwo ||
                !values.zipTwo.match(zipcode) ? 'Input a valid zipcode' : null
        };
    };

    onSubmitFailure(errors, formApi, onSubmitError) {
        console.log(this)
    }

    render() {
        return (
            <Form
                onSubmit={(submittedValues, e, fromApi) => {
                    if (fromApi.warnings.zipOne === null && fromApi.warnings.zipTwo === null) {
                        fromApi.resetAll();
                        return this.props.onSubmit(submittedValues)
                    }

                }}
                validateWarning={this.warningValidator}
                dontValidateOnMount
                validateOnSubmit
                onSubmitFailure={this.onSubmitFailure}
            >
                {formApi => (
                    <div className='form-wrapper'>
                        <form className='zip-form' onSubmit={formApi.submitForm} id="form1">
                            <label htmlFor="zipcodes">Enter Zipcodes</label>
                            <StyledText placeholder='zipcode 1'
                                required
                                field="zipOne"
                                id="zipOne"
                                maxLength='5'
                                className="form-control" />

                            <StyledText placeholder='zipcode 2'
                                required
                                field='zipTwo'
                                id='zipTwo'
                                maxLength='5'
                                className="form-control" />
                            <button className='btn btn-primary' type="submit">Calculate Distance</button>
                        </form>
                    </div>
                )
                }
            </Form>
        );
    }
}

module.exports = ZipForm;