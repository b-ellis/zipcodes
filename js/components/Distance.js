import React, { Component } from 'react'

export default class Distance extends Component {
    render() {
        return (
            <div className='results-wrapper'>
                {this.props.locationOne.name != '' ?
                    <h4>The distance between <br />{this.props.locationOne.name} <br/> and <br/> {this.props.locationTwo.name} <br/> is </h4> :
                    null}
                <h2>{this.props.distance}</h2>
            </div>
        )
    }
}