import React from 'react';
import CardanoImage from 'assets/img/cardanoIcon.png';
import ReactImageFallback from "react-image-fallback";
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


            <ReactImageFallback
                src={this.props.imageUrl}
                width="75"
                height="70"
                fallbackImage={CardanoImage}
                style={{
                    borderRadius: "50%",
                    width: this.props.width,
                    height: this.props.width,
                    // background: "red",
                    display: "block"
                }} />

            // <img
            //     alt={CardanoImage}
            //     src={this.props.imageUrl}
            //     style={{
            //         borderRadius: "50%",
            //         width: this.props.width,
            //         height: this.props.width,
            //         // background: "red",
            //         display: "block"
            //     }}
            // />
        )
    };
};

