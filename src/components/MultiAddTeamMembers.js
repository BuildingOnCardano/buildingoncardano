import React from 'react';
import {
    Button, Label, Input, FormGroup, Col
} from 'reactstrap';

const inputnamewidth = 2;
const inputfieldwidth = 8;
const teamMemberObject = { memberName: "", position: "", twitter: "", linkedin: "", img: "" };

export default class MultiAddTeamMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputList: this.getInitialList(),
            setInputList: null
        };
    }

    getInitialList() {
        try {
            if (this.props.existingTeam.length > 0) {
                return this.props.existingTeam;
            }
        } catch (error) {

        }
        return [{ memberName: "", position: "", twitter: "", linkedin: "", img: "" }];

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
        list.push({ memberName: "", position: "", twitter: "", linkedin: "", img: "" });
        this.setState({ inputList: list });
    }

    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                {this.state.inputList.map((x, i) => {
                    return (
                        <div>
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Name</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        name="memberName"
                                        placeholder="Enter Team Member Name"
                                        value={this.state.inputList[i].memberName}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Position / Role</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        className="ml10"
                                        name="position"
                                        placeholder="Position/Role"
                                        value={x.position}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Twitter Url</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        name="twitter"
                                        placeholder="Twitter Url"
                                        value={x.twitter}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Linkedin Url</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        className="ml10"
                                        name="linkin"
                                        placeholder="Linkedin Url"
                                        value={x.linkin}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Github Url</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        className="ml10"
                                        name="github"
                                        placeholder="Url"
                                        value={x.github}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={inputnamewidth}>Image Url of Team Member</Label>
                                <Col sm={inputfieldwidth}>
                                    <Input
                                        className="ml10"
                                        name="img"
                                        placeholder="Img Url"
                                        value={x.img}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </Col>
                            </FormGroup>

                            {this.state.inputList.length !== 1 && <Button
                                className="mr10"
                                onClick={() => this.handleRemoveClick(i)}>Remove</Button>}
                            {this.state.inputList.length - 1 === i && <Button onClick={this.handleAddClick}>Add Another Team Member</Button>}

                        </div>
                    );
                })}
            </div>
        );
    }
};


