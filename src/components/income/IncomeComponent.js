import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import API from '../../api';
import Modal from 'react-bootstrap/Modal';
import DeleteRenderer from '../common/DeleteRederer';

class IncomeComponent extends Component {

    constructor() {
        super();
        this.state = {
            isDialogOpen: false,
            source: '',
            incomedate: '',
            income: '',
            columnDefs: [
                {
                    headerName: "Action", type: 'nonEditableColumn', width: 100, cellRenderer: 'deleterender'
                },
                {
                    headerName: "Source", field: "source", width: 100, cellRenderer: 'agAnimateShowChangeCellRenderer', onCellValueChanged: this.handlecellvaluechange
                }, {
                    headerName: "Date", sort: 'desc', field: "incomedate", width: 200, cellRenderer: 'agAnimateShowChangeCellRenderer', onCellValueChanged: this.handlecellvaluechange
                }, {
                    headerName: "Income", field: "income", type: 'numericColumn', width: 200, cellRenderer: 'agAnimateShowChangeCellRenderer', onCellValueChanged: this.handlecellvaluechange
                }],
            context: { componentParent: this },
            defaultColDef: {
                editable: true,
                resizable: true,
                sortable: true,
                filter: 'agTextColumnFilter',
                flex: 1
            },
            frameworkComponents: {
                deleterender: DeleteRenderer,
            },
            columnTypes: {
                'nonEditableColumn': { editable: false }
            },
            editType: 'fullRow',
            rowData: []
        }
    }

    componentDidMount() {
        this.getGridData();
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }
  
    handleSourceChange = event => {
        this.setState({ source: event.target.value })
    }

    handleIncomeDateChange = event => {
        this.setState({ incomedate: event.target.value })
    }

    handleIncomeChange = event => {
        this.setState({ income: event.target.value })
    }

    handlecellvaluechange = event => {
        event.data.modified = true;
    }

    handleClose = () => { this.setState({ isDialogOpen: false }) };
    handleShow = () => { this.setState({ isDialogOpen: true }) };

    

    render() {
        return (
            <div className="container py-3 px-3">
                <div className="card">
                    <div className="card-header"><h3>Incomes</h3></div>
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-4">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group text-left">
                                            <label>Source:</label>
                                            <input type="text" className="form-control" placeholder="Enter Income Source" required onChange={this.handleSourceChange} />
                                        </div>
                                        <div className="form-group text-left">
                                            <label>Date:</label>
                                            <input type="date" className="form-control" onChange={this.handleIncomeDateChange} />
                                        </div>
                                        <div className="form-group text-left">
                                            <label>Income:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">$</div>
                                                </div>
                                                <input type="number" className="form-control" placeholder="Enter amount" required onChange={this.handleIncomeChange} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Add</button>

                                    </form >
                                </div>
                                <div className="col-8">
                                    <div className="ag-theme-alpine" style={{
                                        width: '100%',
                                        height: '80%'
                                    }}>
                                        <AgGridReact
                                            columnDefs={this.state.columnDefs}
                                            rowData={this.state.rowData}
                                            defaultColDef={this.state.defaultColDef}
                                            columnTypes={this.state.columnTypes}
                                            editType={this.state.editType}
                                            frameworkComponents={this.state.frameworkComponents}
                                            context={this.state.context}
                                            onGridReady={this.onGridReady}>
                                        </AgGridReact>
                                    </div>
                                    <br />
                                    <button className="btn btn-primary" onClick={this.handleUpdate}>Save</button>
                                </div>
                            </div>

                            <Modal show={this.state.isDialogOpen} onHide={this.handleClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                            </Modal>


                        </div>
                    </div>
                </div>


            </div >

        );
    }


    handleSubmit = event => {
        event.preventDefault();

        API.post(`budget/saveincome`, {
            id: null,
            source: this.state.source,
            incomedate: this.state.incomedate,
            income: this.state.income
        }).then(res => {
            this.getGridData();
        });
    }

    handleUpdate = event => {
        event.preventDefault();

        var updatedrecs = this.state.rowData.filter(function (data) {
            return data.modified === true;
        });
        API({
            method: 'post',
            url: 'budget/updateincome',
            data: JSON.stringify(updatedrecs)
        }).then(res => {
            this.getGridData();
        });
    }

    onDeleteRecord = recId => {
        console.log("deleteing"+recId);       
        API.post('budget/deleteincome?recId='+recId).then(res => {
            this.getGridData();
        });
    };
    
    getGridData() {
        API.get(`budget/getAllIncome`).then(res => {
            this.setState({ rowData: res.data })
        });
    }

    
}

export default IncomeComponent;