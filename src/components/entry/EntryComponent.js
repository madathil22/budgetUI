import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

class EntryComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Make", field: "make"
            }, {
                headerName: "Model", field: "model"
            }, {
                headerName: "Price", field: "price"
            }],
            rowData: [{
                make: "Toyota", model: "Celica", price: 35000
            }, {
                make: "Ford", model: "Mondeo", price: 32000
            }, {
                make: "Porsche", model: "Boxter", price: 72000
            }]
        }
    }

    render() {
        return (
            <div className="container py-3 mt-3">
                <div className="card">
                    <div className="card-header"><h3>Liabilities</h3></div>
                    <div className="card-body">
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        );
    }
}

export default EntryComponent;