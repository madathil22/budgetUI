import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  onclicking: (evnt: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  icon: any;
};

class IconButton extends Component<Props> {
  callParentFunction = (evnt: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onclicking(evnt);
  };

  render() {
    return (
      <button className="btn btn-primary" onClick={this.callParentFunction}>
        <FontAwesomeIcon icon={this.props.icon} /> {this.props.label}
      </button>
    );
  }
}

export default IconButton;
