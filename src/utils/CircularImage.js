import React from 'react';
import CardanoImage from 'assets/img/cardanoIcon.png';
import {
    Button
} from 'reactstrap';
export default class CircularImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }

    render() {
        return (
            <img
                alt={CardanoImage}
                src={this.props.imageUrl}
                style={{
                    borderRadius: "50%",
                    width: this.props.width,
                    height: this.props.width,
                    // background: "red",
                    display: "block"
                }}
            />
        )
    };
};

