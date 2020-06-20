import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
export default class DeleteRenderer extends Component {
    constructor(props) {
        super(props);

        this.invokeParentMethod = this.invokeParentMethod.bind(this);
    }

    invokeParentMethod() {
        this.props.context.componentParent.methodFromParent(
            `Row: ${this.props.node.rowIndex}, Col: ${this.props.colDef.headerName}`
        );
    }

    render() {
        return (
            <span>
                <button onClick={this.invokeParentMethod} className="btn btn-sm" style={{
                    backgroundColor: 'transparent',
                    color: 'RED'
                }}>
                    <FontAwesomeIcon icon={faMinusCircle} />
                </button>
            </span>
        );
    }
}