import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class IconButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn btn-primary" onClick={this.props.onclick}>
                <FontAwesomeIcon icon={this.props.icon} /> {this.props.label}
            </button>
        );
    }
}

export default IconButton;