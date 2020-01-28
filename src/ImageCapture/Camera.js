import React, { Component } from 'react';
import fixRotation from 'fix-image-rotation';
import Webcam from './WebCam'
import Button from '../Basics/SimpleButton'
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';


export default class Camera extends Component {
    constructor() {
        super();
        this.webcam = null;
        this.state = {
            capturedImage: null,
            captured: false,
            uploading: false,
            capturing: false

        }
    }

    myRotationFunction = async function (ArrayOfFilesToBeRotated) {
        let blobOfArray = await fixRotation.fixRotation(ArrayOfFilesToBeRotated)
        return blobOfArray
    }

    captureImage = async () => {

        let image = this.webcam.takePhoto();
        let captureHeight;

        image.getPhotoCapabilities().then(settings => {
            if (settings) {
                //Makesure Adjusted size is in range of min-max
                captureHeight = settings.imageHeight.max / 2;

                if (captureHeight < settings.imageHeight.min) {
                    captureHeight = settings.imageHeight.max;
                }
            }
            image.takePhoto({ imageHeight: captureHeight }).then(blob => {

                this.myRotationFunction([blob]).then(test => {
                    let reader = new FileReader();
                    reader.readAsDataURL(test[0]); // converts the blob to base64 and calls onload
                    reader.onload = () => {
                        this.setState({
                            captured: true,
                            capturedImage: reader.result,
                            capturing: false
                        })
                        this.props.returnPhoto(reader.result);
                    };

                });
            })
                .catch(error => console.error('takePhoto() error:', error));
        });
    }

    discardImage = () => {
        this.setState({
            captured: false,
            capturedImage: null
        })
    }

    uploadImage = () => {
        
    }

    componentDidMount() {
        // initialize the camera
        this.canvasElement = document.createElement('canvas');
        this.webcam = new Webcam(
            document.getElementById('webcam'),
            this.canvasElement
        );
        this.webcam.setup().catch(() => {
            alert('Error getting access to your camera');
        });
    }

    componentWillUnmount() {
        this.webcam.endVideo();
    }

    render() {

        const imageDisplay = this.state.capturedImage ?
            <img src={this.state.capturedImage} alt="captured" />
            :
            <span />;

        const buttons = this.state.captured ?
            <div className="camera-buttons">
                <Button variant="contained" color="secondary" onClick={this.discardImage} > Retake Photo </Button>
            </div> :
            <div className="camera-buttons">
                <Button variant="contained"  color="primary" onClick={this.captureImage} > Take Picture </Button>
            </div>

        const exit = (<Exit><IconButton onClick={this.props.handleExit}><CloseIcon /></IconButton></Exit>)


        return (
            <Container>
                {exit}
                <div className="webcam-container">
                <video width="350px" autoPlay playsInline muted id="webcam" className={this.state.captured ? "hidden" : ""} />
                </div>

                <br />
                <div className={"imageCanvas " + this.state.captured ? "" : "hidden"}>
                    {imageDisplay}
                </div>
                
                {buttons}
            </Container>
        )
    }
}

const Exit = styled.div`
position: fixed;
top: 0px;
left: 10px;
color: white;
z-index: 10;
`

const Container = styled.div`

.hidden{
    visibility: hidden;
    display: none;
    height: 0px;
    margin: 0px;
    padding: 0px;
  }

.imageCanvas{
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: black;
    text-align: center;
  }

  img{
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: black;
    height: 100vh;
    width: 100%;
    object-fit: cover;
    display: block;
    margin: auto;
   
  }

  #webcam{
    padding: 0;
    display: block;
    margin: auto;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }

  .webcam-container{
    position: fixed;
    top: 0;
    z-index: 1;
    #background-color: black;

  }

  .camera-buttons{
      position: fixed;
      bottom: 60px;
      z-index: 10;
      width: 100%;
      display: flex;
      justify-content: center;
  }


`