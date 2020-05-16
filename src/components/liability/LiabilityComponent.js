import React, { Component } from 'react';

class LiabilityComponent extends Component {

    render() {
        return (
            <div className="container py-3 mt-3">
                <div className="card">
                    <div className="card-header"><h3>Add Liabilities</h3></div>
                    <div className="card-body">
                        <form>
                            <div className="form-group text-left">
                                <label>Name:</label>
                                <input type="text" className="form-control" name="name" placeholder="Enter Name" required/>
                            </div>
                            <div className="form-group text-left">
                                <label>Description:</label>
                                <input type="text" className="form-control" name="description" placeholder="Enter Description" />
                            </div>
                            <div className="form-group text-left">
                                <label>Amount:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">$</div>
                                    </div>
                                    <input type="number" className="form-control" name="amount" placeholder="Enter amount" required/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>

                        </form >
                    </div>
                </div>
            </div >

        );
    }
}

export default LiabilityComponent;