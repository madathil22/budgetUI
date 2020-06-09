import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import API from '../../api';

class EntryComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {
                    headerName: "ID", field: "id", type: 'nonEditableColumn'
                }, {
                    headerName: "Name", field: "name"
                }, {
                    headerName: "Description", field: "description"
                }, {
                    headerName: "Amount", field: "amount", type: 'numericColumn', cellEditor: 'numericCellEditor'
                }],
            defaultColDef: {
                editable: true,
                // make every column use 'text' filter by default
                filter: 'agTextColumnFilter'
            },
            columnTypes: {
                'nonEditableColumn': { editable: false }
            },
            components: { numericCellEditor: this.getNumericCellEditor() },
            editType: 'fullRow',
            rowData: []
        }
    }

    componentDidMount() {
        API.get(`budget/getAllLiability`).then(res => {
            debugger;
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

    getNumericCellEditor() {
        function isCharNumeric(charStr) {
            return !!/\d/.test(charStr);
        }
        function isKeyPressedNumeric(event) {
            var charCode = getCharCodeFromEvent(event);
            var charStr = String.fromCharCode(charCode);
            return isCharNumeric(charStr);
        }
        function getCharCodeFromEvent(event) {
            event = event || window.event;
            return typeof event.which === 'undefined' ? event.keyCode : event.which;
        }
        function NumericCellEditor() { }
        NumericCellEditor.prototype.init = function (params) {
            this.focusAfterAttached = params.cellStartedEdit;
            this.eInput = document.createElement('input');
            this.eInput.style.width = '100%';
            this.eInput.style.height = '100%';
            this.eInput.value = isCharNumeric(params.charPress)
                ? params.charPress
                : params.value;
            var that = this;
            this.eInput.addEventListener('keypress', function (event) {
                if (!isKeyPressedNumeric(event)) {
                    that.eInput.focus();
                    if (event.preventDefault) event.preventDefault();
                }
            });
        };
        NumericCellEditor.prototype.getGui = function () {
            return this.eInput;
        };
        NumericCellEditor.prototype.afterGuiAttached = function () {
            if (this.focusAfterAttached) {
                this.eInput.focus();
                this.eInput.select();
            }
        };
        NumericCellEditor.prototype.isCancelBeforeStart = function () {
            return this.cancelBeforeStart;
        };
        NumericCellEditor.prototype.isCancelAfterEnd = function () { };
        NumericCellEditor.prototype.getValue = function () {
            return this.eInput.value;
        };
        NumericCellEditor.prototype.focusIn = function () {
            var eInput = this.getGui();
            eInput.focus();
            eInput.select();
            console.log('NumericCellEditor.focusIn()');
        };
        NumericCellEditor.prototype.focusOut = function () {
            console.log('NumericCellEditor.focusOut()');
        };
        return NumericCellEditor;
    }

    render() {
        return (
            <div className="container py-3 mt-3">
                <div className="card">
                    <div className="card-header"><h3>Liability</h3></div>
                    <div className="card-body">
                        <div
                            className="ag-theme-alpine"

                        >
                            <AgGridReact
                                columnDefs={this.state.columnDefs}
                                rowData={this.state.rowData}
                                defaultColDef={this.state.defaultColDef}
                                columnTypes={this.state.columnTypes}
                                components={this.state.components}
                                editType={this.state.editType}
                                onGridReady={this.onGridReady}
                                domLayout='autoHeight'>
                            </AgGridReact>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



}

export default EntryComponent;