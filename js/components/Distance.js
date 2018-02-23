import React, { Component } from 'react'

export default class Distance extends Component {
    render() {
        return (
            <div>
                {this.props.locationOne ?
                    <h4>The distance between {this.props.locationOne} and {this.props.locationTwo} is </h4> :
                    null}
                <h2>{this.props.distance}</h2>
            </div>
        )
    }
}