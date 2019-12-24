import React from 'react';
import App from './Screens/App';
import Login from './Screens/Login'; 

import { ThemeProvider, styled} from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { Translation, withTranslation} from "react-i18next";

const theme = createMuiTheme({
    palette: {
      primary: {
          main: "#1f4a94"
      },
      secondary:{
        main: "#FFFFFF"
      }
    }
  }); 

@withTranslation()
@inject('uiStore','patientStore')
@observer
export default class Main extends React.Component{

  componentDidMount() {

    this.initalizeApplicationState();
    this.listenForConnectivityChanges();

    /*@TODO move this code to patientStore to simplify
      Just move all of the logic from initalizeApplicationState to that file
    */
    if( this.props.patientStore.isLoggedIn){
      this.props.patientStore.getPatientInformation();
    }

  }

    handleTest = () => {
        if( this.props.uiStore.language == "en"){
          this.props.uiStore.language = "es";
        }else{
          this.props.uiStore.language = "en";
        }
    }

    render(){
        return(
        <div>
        <ThemeProvider theme={theme}>
                {this.props.patientStore.isLoggedIn ? <App /> : <Login props={{approveLogin:this.approveLogin }} />}
        </ThemeProvider>
        </div>
        )
    }

    listenForConnectivityChanges(){
      window.addEventListener('online', () => {
        this.props.uiStore.offline = false;
      });
  
      window.addEventListener('offline', () => {
        this.props.uiStore.offline = true;
      });
    }

    initalizeApplicationState(){
      //Get Notificaiton Authenticaiton key from Server
      //this.props.patientStore.getVapidKeyFromServerAndStoreLocally();
      const token =  localStorage.getItem("user.token")
      const id = localStorage.getItem("userID")

      //Initalize User Identifiers
      this.props.patientStore.initalize(token,id);

    }
}