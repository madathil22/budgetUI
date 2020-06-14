import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import API from '../../api';

class IncomeComponent extends Component {

    constructor() {
        super();
        this.state = {
            isDialogOpen: false,
            name: '',
            description: '',
            value: '',
            columnDefs: [
                {
                    headerName: "ID", field: "id", type: 'nonEditableColumn',width: 50
                }, {
                    headerName: "Source", field: "source",width: 70
                }, {
                    headerName: "Date", field: "date",width: 100
                }, {
                    headerName: "Income", field: "income", type: 'numericColumn'
                }],
            defaultColDef: {
                editable: true,
                resizable: true,
                sortable:true,
                filter: 'agTextColumnFilter'
            },
            columnTypes: {
                'nonEditableColumn': { editable: false }
            },
            editType: 'fullRow',
            rowData: []
        }
    }
    openDialog = () => this.setState({ isDialogOpen: true })

    handleClose = () => this.setState({ isDialogOpen: false })

    handleNameChange = event => {
        this.setState({ name: event.target.value })
    }

    handleDateChange = event => {
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
            this.getGridData();
        });
    }

    componentDidMount() {
        this.getGridData();
    }

    getGridData() {
        API.get(`budget/getAllLiability`).then(res => {
            this.setState({ rowData: res.data })
        });
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.sizeToFit();
    }

    sizeToFit = () => {
        this.gridApi.sizeColumnsToFit();
    };


    render() {
        return (
            <div className="container py-3 mt-3">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-header"><h3>Add Income</h3></div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group text-left">
                                        <label>Source:</label>
                                        <input type="text" className="form-control" name="source" placeholder="Enter Income Source" required onChange={this.handleNameChange} />
                                    </div>
                                    <div className="form-group text-left">
                                        <label>Date:</label>
                                        <input type="date" className="form-control" name="description" onChange={this.handleDateChange} />
                                    </div>
                                    <div className="form-group text-left">
                                        <label>Income:</label>
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
                    </div>
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header"><h3>Incomes</h3></div>
                            <div className="card-body">
                                <div className="ag-theme-alpine" style={{
                                    width: '100%',
                                    height: '600px'
                                }}>
                                    <AgGridReact
                                        columnDefs={this.state.columnDefs}
                                        rowData={this.state.rowData}
                                        defaultColDef={this.state.defaultColDef}
                                        columnTypes={this.state.columnTypes}
                                        editType={this.state.editType}
                                        onGridReady={this.onGridReady}>
                                    </AgGridReact>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default IncomeComponent;