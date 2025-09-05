import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import API from '../../api';
import DeleteRenderer from '../common/DeleteRederer';
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../common/IconButton';

class LiabilityComponent extends Component<any, any> {

    constructor() {
        super();
        this.state = {
            isDialogOpen: false,
            name: '',
            description: '',
            value: '',
            columnDefs: [
                {
                    headerName: "Action", type: 'nonEditableColumn', width: 100, cellRenderer: 'deleterender'
                }, {
                    headerName: "Name", field: "name", width: 100, cellRenderer: 'agAnimateShowChangeCellRenderer', onCellValueChanged: this.handlecellvaluechange
                }, {
                    headerName: "Description", field: "description", width: 200, cellRenderer: 'agAnimateShowChangeCellRenderer', onCellValueChanged: this.handlecellvaluechange
                }, {
                    headerName: "Amount", sort: 'desc', field: "amount", type: 'numericColumn', width: 200, cellRenderer: 'agAnimateShowChangeCellRenderer', onCellValueChanged: this.handlecellvaluechange
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

    handleNameChange = event => {
        this.setState({ name: event.target.value })
    }

    handleDescriptionChange = event => {
        this.setState({ description: event.target.value })
    }

    handleValueChange = event => {
        this.setState({ value: event.target.value })
    }

    handlecellvaluechange = event => {
        event.data.modified = true;
    }

    render() {
        return (
            <div className="container py-3 mt-3">

                <div className="card">
                    <div className="card-header"><h3>Liabilities</h3></div>
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-4">
                                    <form>
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
                                        <IconButton onclicking={this.handleSubmit} label="Add" icon={faPlus}/>

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
                                            onGridReady={this.onGridReady}
                                        >
                                        </AgGridReact>
                                    </div>
                                    <br />
                                    <IconButton onclicking={this.handleUpdate} label="Save" icon={faSave}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        );
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

    handleUpdate = event => {
        event.preventDefault();

        var updatedrecs = this.state.rowData.filter(function (data) {
            return data.modified === true;
        });
        API({
            method: 'post',
            url: 'budget/updateliability',
            data: JSON.stringify(updatedrecs)
        }).then(res => {
            this.getGridData();
        });
    }

    onDeleteRecord = recId => {
        console.log("deleteing" + recId);
        API.post('budget/deleteliability?recId=' + recId).then(res => {
            this.getGridData();
        });
    };


    getGridData() {
        API.get(`budget/getAllLiability`).then(res => {
            this.setState({ rowData: res.data })
        });
    }
}



export default LiabilityComponent;
