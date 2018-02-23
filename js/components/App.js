import React, { Component } from 'react';

import ZipForm from './Form';
import Distance from './Distance';


class App extends Component {

    constructor() {
        super();
        this.state = {
            error: '',
            locationOne: {
                zip: '',
                name: ''
            },
            locationTwo: {
                zip: '',
                name: ''
            }
        }
        // this.hanleChange = this.hanleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {

        const locationOne = data.zipOne;
        const locationTwo = data.zipTwo;

        const zipcode = /\d{5}(?:[-\s]\d{4})?/g;

        fetch('/api/zip', {
            body: JSON.stringify(data),
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
        .then(res => res.json())
        .then(data => this.setState({
            distance: `${data.distance} Miles`,
            locationOne: {
                zip: locationOne,
                name: `${data.zipOne.City}, ${data.zipOne.State}`
            },
            locationTwo: {
                zip: locationTwo,
                name: `${data.zipTwo.City}, ${data.zipTwo.State}`
            }
        }))
    }

    render() {
        return (
            <div className="App">
                <div id='background'>
                    <h1>Calculate the distance between two zipcodes</h1>
                </div>
                <div className='app-div'>
                    <ZipForm
                        onSubmit={this.handleSubmit}
                        ZipOne={this.state.locationOne}
                        ZipTwo={this.state.locationTwo}
                        onChange={this.hanleChange} />
                    <Distance
                        distance={this.state.distance}
                        locationOne={this.state.locationOne}
                        locationTwo={this.state.locationTwo} />
                </div>
            </div>
        );
    }
}

export default App;