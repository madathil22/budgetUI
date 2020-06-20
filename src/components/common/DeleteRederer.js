import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
export default class DeleteRenderer extends Component {
    constructor(props) {
        super(props);
        this.invokeParentMethod = this.invokeParentMethod.bind(this);
    }

    invokeParentMethod() {
        this.props.context.componentParent.onDeleteRecord(
            `${this.props.data.id}`
        );
    }

    render() {
        return (
            <span>
                <button onClick={this.invokeParentMethod} className="btn btn-sm" style={{
                    backgroundColor: 'transparent'
                }}>
                    <FontAwesomeIcon icon={faMinusCircle} color="RED"/>
                </button>
            </span>
        );
    }
}