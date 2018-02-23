import React, { Component } from 'react';

import ZipForm from './Form';
import Distance from './Distance';


class App extends Component {

    constructor() {
        super();
        this.state = {
            error: '',
            locationOne: '',
            locationTwo: ''
        }
        this.hanleChange = this.hanleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hanleChange(event) {
        if (event.target.className === 'form-control one') {
            this.setState({
                locationOne: event.target.value
            })
        } else {
            this.setState({
                locationTwo: event.target.value
            })
        }
    }

    handleSubmit(data) {

        console.log(data)

        const locationOne = data.zipOne;
        const locationTwo = data.zipTwo

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
                distance: `${data} Miles`,
                locationOne,
                locationTwo
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