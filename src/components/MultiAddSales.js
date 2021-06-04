import React from 'react';
import {
    Button, Row, Input, FormGroup, Col, Label
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { DataUsageSharp } from '@material-ui/icons';
import { isEmpty } from 'lodash';

const inputnamewidth = 2;
const inputfieldwidth = 8;
const saleObject = {
    projectName: "",
    upcomingSale: "",
    saleStartDate: "",
    saleEndDate: "",
    saleDetailLink: "",
    saleTokenPrice: "",
    tokenDistributionDetail: "",
    acceptedFunding: "",
    saleStatus: "",
};

export default class MultiAddSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputList: this.getInitialList(),
            setInputList: null,
            loading: true,
        };
    }

    getInitialList() {

        try {
            if (this.props.existingSalesDetails != null || this.props.existingSalesDetails != undefined && this.props.existingSalesDetails.length > 0) {
                return this.props.existingSalesDetails;
            }
        } catch (error) {
            
        }
        return [saleObject];
    }

    // handle input change
    handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...this.state.inputList];
        list[index][name] = value;
        this.setState({ inputList: list });
        this.props.sendData(this.state.inputList);
    };

    // handle click event of the Remove button
    handleRemoveClick = index => {
        const list = this.state.inputList;
        list.splice(index, 1);
        this.setState({ inputList: list });
    };

    // handle click event of the Add button
    handleAddClick = () => {
        const list = this.state.inputList;
        list.push({
            projectName: "",
            upcomingSale: "",
            saleStartDate: "",
            saleEndDate: "",
            saleDetailLink: "",
            saleTokenPrice: "",
            tokenDistributionDetail: "",
            acceptedFunding: "",
            saleStatus: "",
        });
        this.setState({ inputList: list });
    }

    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                {this.state.inputList.map((x, i) => {
                    return (
                        <div>
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Sale Type</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input type="select" name="upcomingSale"
                                        value={x.upcomingSale}
                                        onChange={e => this.handleInputChange(e, i)}
                                    >
                                        <option>No Token Sales</option>
                                        <option>Private Sale</option>
                                        <option>Presale</option>
                                        <option>IEO</option>
                                        <option>IDO</option>
                                        <option>ISO</option>
                                        <option>ICO</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Sale Status</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input type="select" name="saleStatus"
                                        value={x.saleStatus}
                                        onChange={e => this.handleInputChange(e, i)}
                                    >
                                        <option>Upcoming</option>
                                        <option>Completed</option>
                                        <option>Live</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Sale Start Date</Label>
                                <Col sm={inputfieldwidth}>
                                    <TextField
                                        id="date"
                                        type="date"
                                        name="saleStartDate"
                                        defaultValue={x.saleStartDate}
                                        // className={useStyles().textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Sale End Date</Label>
                                <Col sm={inputfieldwidth}>
                                    <TextField
                                        id="date"
                                        type="date"
                                        name="saleEndDate"
                                        defaultValue={x.saleEndDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>
                                                        
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Token Price</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        className="ml10"
                                        name="saleTokenPrice"
                                        placeholder="Sale Token Price"
                                        value={x.saleTokenPrice}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Accepted Funding</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        className="ml10"
                                        name="acceptedFunding"
                                        placeholder="Accepted Funding"
                                        value={x.acceptedFunding}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Sale Details</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        className="ml10"
                                        name="tokenDistributionDetail"
                                        placeholder="Link to more info on sale"
                                        value={x.tokenDistributionDetail}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>

                            
                            <FormGroup row>
                            
                            <Col sm={inputfieldwidth}>
                                    {this.state.inputList.length !== 1 && <Button
                                        className="mr10"
                                        onClick={() => this.handleRemoveClick(i)}>Remove</Button>}
                                    {this.state.inputList.length - 1 === i && <Button onClick={this.handleAddClick}>Add Another Sale</Button>}
                                </Col>
                            </FormGroup>
                        </div>
                    );
                })}
            </div >
        );
    }
};


