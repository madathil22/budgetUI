import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../common/IconButton';
import './PlanComponent.css';
class PlanComponent extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            incomes: [
                { value: 3800, label: '10-Jun-2020' },
                { value: 1800, label: '15-Jun-2020' },
                { value: 3800, label: '30-Jun-2020' }
            ],
            liabilities: [
                { value: 2000, label: 'Mortgage' },
                { value: 421, label: 'Evu college' },
                { value: 1235, label: 'Daycare' }
            ],
            chedder: 0,
            hits: 0,
            left: 0,
            leftclass: 'jumbotron jumbotron-fluid'
        }
    }

    handleIncomeChange = (data, actiontypes) => {
        var cheese = data.value;
        var baki = cheese - this.state.hits;

        this.setState({ chedder: cheese, left: baki },this.setBakiStyle);
    }

    handleLiabilityChange = (data, actiontypes) => {
        const lagi = data.reduce((prev, curr) => prev + curr.value, 0);
        const baki = this.state.chedder - lagi;

        this.setState({ hits: lagi, left: baki },this.setBakiStyle);
    }

    setBakiStyle = () => {
        if (parseInt(this.state.left) > 0) {
            this.setState({ leftclass: 'jumbotron jumbotron-fluid leftPositive' })
        } else {
            this.setState({ leftclass: 'jumbotron jumbotron-fluid leftNegative' })
        }
    }
    render() {
        const animatedComponents = makeAnimated();
        return (
            <div className="container py-3 px-3">
                <div className="card">
                    <div className="card-header"><h3>Plan</h3></div>
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-4">
                                    <form>
                                        <div className="form-group text-left">
                                            <label>Set Plan:</label>
                                            <Select options={this.state.incomes} onChange={this.handleIncomeChange} />
                                        </div>
                                        <div className="form-group text-left">
                                            <label>Add Liabilities:</label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                options={this.state.liabilities}
                                                onChange={this.handleLiabilityChange}
                                            />
                                        </div>

                                        <IconButton onclicking={this.handleUpdate} label="Save" icon={faSave} />

                                    </form >
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="jumbotron jumbotron-fluid chedder">
                                        <div className="container">
                                            <h1 className="display-4">{this.state.chedder}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="jumbotron jumbotron-fluid drain">
                                        <div className="container">
                                            <h1 className="display-4">{this.state.hits}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className={this.state.leftclass}>
                                        <div className="container">
                                            <h1 className="display-4">{this.state.left}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlanComponent;
