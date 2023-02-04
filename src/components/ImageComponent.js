import React from "react";
import ReactImageFallback from 'react-image-fallback';
import CardanoImage from 'assets/img/cardanoIcon.png';
import "../styles/styles.css";

export default class ImageComponent extends React.Component {
    state = { isOpen: false, image: "" };


    async componentDidMount() {
        this.setState({ image: this.props.image });
    }

    handleShowDialog = () => {
        this.setState({ isOpen: !this.state.isOpen });
        console.log("cliked");
    };

    render() {
        return (
            <div>
                <ReactImageFallback
                    src={this.state.image}
                    width="50"
                    height="50"
                    fallbackImage={CardanoImage}
                />
                {this.state.isOpen && (
                    <dialog
                        className="dialog"
                        style={{ position: "absolute" }}
                        open
                        onClick={this.handleShowDialog}
                    >
                        <img
                            className="image"
                            src={this.state.image}
                            onClick={this.handleShowDialog}
                        />
                    </dialog>
                )}
            </div>
        );
    }
}