import React, { Component } from 'react';
import axios from 'axios';
import Dialog from 'react-dialog';
import API from '../../api';


class LiabilityComponent extends Component {

    constructor() {
        super();
        this.state = {
            isDialogOpen: false,
            name: '',
            description: '',
            value: ''
        }
    }
    openDialog = () => this.setState({ isDialogOpen: true })

    handleClose = () => this.setState({ isDialogOpen: false })

    handleNameChange = event => {
        this.setState({ name: event.target.value })
    }

    handleDescriptionChange = event => {
        this.setState({ description: event.target.value })
    }

    handleValueChange = event => {
        this.setState({ value: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();

        API.post(`budget/saveliability`, {
            id: null,
            name: this.state.name,
            description: this.state.description,
            amount: this.state.value
        }).then(res => {
            this.openDialog();
        });
    }

    render() {
        return (
            <div className="container py-3 mt-3">
                <div className="card">
                    <div className="card-header"><h3>Add Liabilities</h3></div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group text-left">
                                <label>Name:</label>
                                <input type="text" className="form-control" name="name" placeholder="Enter Name" required onChange={this.handleNameChange} />
                            </div>
                            <div className="form-group text-left">
                                <label>Description:</label>
                                <input type="text" className="form-control" name="description" placeholder="Enter Description" onChange={this.handleDescriptionChange} />
                            </div>
                            <div className="form-group text-left">
                                <label>Amount:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">$</div>
                                    </div>
                                    <input type="number" className="form-control" name="amount" placeholder="Enter amount" required onChange={this.handleValueChange} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>

                        </form >
                    </div>
                </div>
                {
                    this.state.isDialogOpen &&
                    <Dialog
                        title="Liability Save Status"
                        modal={true}
                        onClose={this.handleClose}
                    >
                        <h1>Liability saved</h1>
                    </Dialog>
                }
            </div >

        );
    }
}

export default LiabilityComponent;