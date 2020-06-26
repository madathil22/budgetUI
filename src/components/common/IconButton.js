import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class IconButton extends Component {
    
    callParentFunction=(evnt)=>{
        this.props.onclicking(evnt);
    }

    render() {
        return (
            <button className="btn btn-primary" onClick={this.callParentFunction}>
                <FontAwesomeIcon icon={this.props.icon} /> {this.props.label}
            </button>
        );
    }
}

export default IconButton;