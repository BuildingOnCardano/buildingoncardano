import React from 'react';
import {
    Button, Row, Input, FormGroup, Col, Label
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { DataUsageSharp } from '@material-ui/icons';

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
        if (this.props.existingSalesDetails.length > 0) {
            return this.props.existingSalesDetails;
        }
        else {
            return [saleObject];
        }
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
                                <Label for="name" sm={inputnamewidth}>Sale End Date</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input type="select" name="upcomingSale"
                                        value={this.state.inputList[i].upcomingSale}
                                        onChange={e => this.handleInputChange(e, i)}
                                    >
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
                                <Label for="name" sm={inputnamewidth}>Sale Detail Link</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        className="ml10"
                                        name="saleDetailLink"
                                        placeholder="Sale Details Link"
                                        value={x.saleDetailLink}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Sale Token Price</Label>
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
                                <Label for="name" sm={inputnamewidth}>Token Distribution Detail</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        className="ml10"
                                        name="tokenDistributionDetail"
                                        placeholder="Token Distribution Detail"
                                        value={x.tokenDistributionDetail}
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
                                <Col sm={inputfieldwidth}>
                                    {this.state.inputList.length !== 1 && <Button
                                        className="mr10"
                                        onClick={() => this.handleRemoveClick(i)}>Remove</Button>}
                                    {this.state.inputList.length - 1 === i && <Button onClick={this.handleAddClick}>Add Another</Button>}
                                </Col>
                            </FormGroup>
                        </div>
                    );
                })}
            </div >
        );
    }
};


