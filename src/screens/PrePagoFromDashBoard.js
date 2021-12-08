import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Keyboard,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView, 
  TextInput, 
  Platform, 
  TouchableWithoutFeedback, 
  Button, 
} from "react-native";
import * as Google from "expo-google-app-auth";
import {IOS_GCLIENT_ID, ANDROID_GCLIENT_ID} from '@env';
const iosClientId = IOS_GCLIENT_ID;
const androidClientId = ANDROID_GCLIENT_ID;
import { Input } from 'react-native-elements';
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);

import {observer, inject} from "mobx-react";
@inject("store")
@observer
export default class PrePagoFromDashBoard extends Component{
  constructor(props) {
    super(props);
    this.state = {
     code : "",
		 messageValue : "",
     messageMeterNumber : "",
     messageProblems : "",
     messageMeterEmpty : "",
     amount : "",
     isLoading: false
    };
  }
 componentDidMount() {}

 verifyAccount = () =>
 {
   this.setState({isLoading: true});
   if(this.state.code==""){
    this.setState({isLoading: false, messageMeterEmpty: "Por favor preencha o nr. de contador"});
   }else if(this.state.amount==""){
    this.setState({isLoading: false, messageValue: "Por favor preencha valor a pagar"});
   }else{
     fetch(`${this.props.store.apiHost}${this.props.store.simulateEndPoint}?eId=${this.props.store.eld}&eKey=${this.props.store.eKey}&userId=${this.props.store.userId}&meterNumber=${this.state.code}&amount=${this.state.amount}&token=${this.props.store.token}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response )=> response.json()).then(
        (json)=> {
           
        if (json.errorCode==null) {
            this.setState({isLoading: false, messageMeterEmpty: "", messageMeterNumber: "", messageProblems: "", messageValue: "" });
            this.props.store.addValue('customerName', json.customerName);
            this.props.store.addValue('meterNumber', json.meterNumber);
            this.props.store.addValue('customerAddress', json.customerDistrict);
            this.props.store.addValue('paymentAmount', this.state.amount)
            this.props.store.addValue('simulationId', json.simulationId)
            const { navigate } = this.props.navigation;
            navigate("PrePagoPayment");
        } else {
          this.setState({isLoading: false, messageMeterNumber: "Nr. de Contador inválido"})
         
        }
        
      }).catch((error) => {
        this.setState({isLoading: false, messageProblems: "Desculpa, estamos a enfrentar alguns problemas"})
        
      }).finally(() => {
        this.setState({ isLoading: false });
      });
   }
      
 }

  onMainMenuClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("PrePagoDashBoard");
  };

  onContinueClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("PrePagoDashBoard");
  };


  
  render() {
    if (this.state.isLoading==true) {
      return (<View style={{flex:1,
        backgroundColor: "#EAECE9",
       alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size="large" color="#00035c"/>
        </View>)
    } else 
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
       <View style={styles.header}>
              <View style={styles.homeIcon}>
                    <TouchableOpacity onPress={this.onMainMenuClicked} style={styles.mainMenu}>
										    <Image style={styles.backArrow} source={require('../../assets/img/back-black.png')}/>
                        <Text style={styles.txtMainMenu}>Voltar</Text>
                    </TouchableOpacity>
              </View>
              {/* <View style={styles.profile}>
                  <View style={styles.circleView}>
                  <View style={styles.profilePhoto}><Text style={styles.initialLetterIfNoPhoto}>{this.props.store.user.charAt(0)}</Text></View>
                  </View>
                  <Text style={styles.userName}>{this.props.store.user}</Text>
                  <Text style={styles.userEmail}>{this.props.store.email}</Text>
                
              </View> */}
        </View>
        <View style={styles.centerView}>

          <View style={styles.inputWidgetCenter}>
              <View style={styles.logoView}>
                <Image style={styles.logo} source={require('../../assets/img/logo.png')}/>
              </View>
              <Text style={styles.lblNrContador}>Digita o número {'\n'}do Contador</Text>
              <View style={styles.inputWidget}>

              <TextInput style={styles.input}
                value={this.state.code}
                keyboardType="numeric"
                maxLength={13}
                minLength={11}
                onChangeText={(meterNumber) => this.setState({ code:meterNumber})}
                />
               <Text style={styles.errorMsg}>{this.state.messageMeterNumber}</Text>
              </View>
            <Text style={styles.lblNrContador2}>{'\n'}Digita o valor</Text>
            <TextInput style={styles.input2}
                value={this.state.amount}
                keyboardType="numeric"
                onChangeText={(n) => this.setState({ amount:n })}
                maxLength={6}
                />
                <Text style={styles.errorMsgv}>{this.state.messageValue}</Text>
           </View>
            
        </View>
        <View style={styles.buttonsView}>
              <TouchableOpacity onPress={this.verifyAccount} style={styles.continueButtonn}><Text style={styles.buttonTxt}>Continuar</Text></TouchableOpacity>
        </View>
        </View>
        </TouchableWithoutFeedback>
</KeyboardAvoidingView>

  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc',
    alignItems: 'center',
    
  },
  errorMsg:{
    color:'red',
    fontWeight:'bold',
    position:'absolute',
    left:0,
    top: height*0.1
  },
  errorMsgv:{
    color:'red',
    fontWeight:'bold',
    left:-width*0.1,
    paddingTop:height*0.02,
  },
  header:{
    width:width*0.9,
    height: height*0.15,
    flexDirection:"row",
    backgroundColor:"#fafbfc",
    top:-height*0.06
  },
  centerView:{
    alignItems: 'center',
    width:width*0.9,
    height: height*0.6,
    justifyContent:'center',
    marginTop:-height*0.06,
    zIndex:-3
  },
  buttonsView:{
    width:width*0.9,
   height:height*0.1,
   alignItems: 'center',
   justifyContent:'center',
  },
  footerLogo:{
    position: 'absolute',
    bottom:'5%',
    width:130,
    height:40,
    alignItems: 'center',
    padding:8
  },
  
  continueButtonn:{
    backgroundColor:"#05185e",
    width:width*0.55,
    height:height*0.070,
    borderRadius:height*0.1/2,
    alignItems:'center',
    justifyContent:'center',
    
  },
  mainMenu:{
    alignItems:"center",
    justifyContent:"center",
		flexDirection:"row",
		padding:12,
		position: 'absolute',
		top: height*0.05,
  },

  buttonTxt:{
    color: "white",
    fontSize: 20,
  },
  logoView:{
    width:height*0.2,
    height:height*0.1,
    alignItems:"center",
    justifyContent:"center",
    margin:height*0.02,
    marginTop:-height*0.1,
  },
  logo:{
    resizeMode: 'contain',
    flex:1
  },
  lblNrContador:{
    color:"#05185e",
    fontSize:height*0.04,
    fontWeight:"bold",
    marginLeft:-height*0.10
  },
  lblNrContador2:{
    color:"#05185e",
    fontSize:height*0.04,
    fontWeight:"bold",
    marginLeft:-height*0.16
  },
  circleView:{
    borderWidth:1,
    borderColor:"#2191ff",
    height: 30,
    width: 30,
    borderRadius:30/2,
    alignItems:'center',
    justifyContent:'center'
  },
  profilePhoto:{
    height: 25,
    width: 25,
    borderRadius:25/2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"#2191ff",
  },
  initialLetterIfNoPhoto:{
    color:"white",
    fontSize:14,
    fontWeight:"bold"
  },
  logOut:{
    backgroundColor:"red",
    borderRadius:40,
  },
  userName:{
    fontWeight:"bold",
		fontSize:13
  },
	userEmail:{
		fontSize:12
	},
  inputWidgetCenter:{
    justifyContent: "center",
    alignItems: "center",
    flex:1,  
      
  },
  inputWidget: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width*0.88,
		height:height*0.1,
		borderWidth:2,
		borderColor:"#05185e",
		borderRadius:16,
    
  },
	txtMainMenu:{
		color:"#05185e",
		fontWeight:"bold",
    marginBottom:-10,
    left:-width*0.05
	},
  
  input: {
    height:height*0.08,
    width:width*0.8,
    textAlign:"center",
    justifyContent:"center",
    marginBottom:-height*0.01,
    fontSize:height*0.040
    },
  
    input2: {
      height:height*0.08,
      width:width*0.8,
      textAlign:"center",
      justifyContent:"center",
      marginBottom:-height*0.01,
      borderColor: "#000000",
      borderBottomWidth: 1,
      fontSize:height*0.04
      
      },
      backArrow:{
        
        width:30,
        height:30,
        marginTop:10,
        left:-width*0.05
      }
      ,
    inner: {
      padding: height*0.11,
      flex: 1,
      justifyContent: "space-around",
      
    },
});
