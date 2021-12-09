import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView, 
  TextInput, 
  Keyboard,
  ScrollView,
  Platform, 
  TouchableWithoutFeedback, 
} from "react-native";
import * as Google from "expo-google-app-auth";
import {IOS_GCLIENT_ID, ANDROID_GCLIENT_ID} from '@env';
const iosClientId = IOS_GCLIENT_ID;
const androidClientId = ANDROID_GCLIENT_ID;
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);

import {observer, inject} from "mobx-react";
@inject("store")
@observer
export default class MPesa extends Component{
  constructor(props) {
    super(props);
    this.state = {
     amount : "",
		 message : "",
     phone: "",
    isLoading:false,
    };
  }
  

  componentDidMount() {}

  toDecimal = (n) => {

    return  parseFloat(n).toFixed(2);
  }

  onMainMenuClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("PrePagoPayment");
  };

  processTransaction = ()=>{
    this.setState({ isLoading: true }); 
    fetch(`${this.props.store.apiHost}${this.props.store.rechargeEndPoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
     'simulationId':this.props.store.simulationId,
     'eId': this.props.store.eld,
     'eKey': this.props.store.eKeyMpesa,
     'userId': this.props.store.userId,
     'token': this.props.store.token
      })
    }).then((response )=> response.json()).then(
      (json)=> {
        this.setState({ isLoading: false}); 
        this.props.store.addValue('rechargeCode', json.rechargeCode);
        this.props.store.addValue('vat', json.vat);
        this.props.store.addValue('waterAmount', json.waterAmount);
        this.props.store.addValue('waterVolume', json.waterVolume);
        this.props.store.addValue('transactionId', json.transactionId);
        this.props.store.addValue('scale', json.scale);
        this.props.store.addValue('category', json.category);
        this.props.store.addValue('debtAmount', json.debtAmount);
        this.props.store.addValue('availabilityService', json.availabilityService);
        this.props.store.addValue('dataehora', new Date().toLocaleString('en-GB', { timeZone: 'CAT' }));
        const { navigate } = this.props.navigation;
        navigate("PaymentDone");
         
    }).catch((error) => {
      this.setState({isLoading: false, message: "Desculpa, estamos a enfrentar alguns problemas"})
     
    }).finally(() => {
      this.setState({ isLoading: false });
    });
 
  }

   Mpesa = ()=>{
    this.setState({ isLoading: true });
    if(this.state.phone!==""){ 
    fetch(`${this.props.store.mpesaApiEndpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      "authRequest":{"apiKey": this.props.store.eKey,
      "appId": this.props.store.eld}, 
      "amount":this.props.store.paymentAmount, 
      "msisdn": '258'+this.state.phone, 
      "reference": this.props.store.meterNumber, 
      "sessionInformation":{"sessionId": this.props.store.sessionId,"userRequest": {"userId": this.props.store.userId}} 
      })
    }).then((response )=> response.json()).then(
      (json)=> {
        if(json==true){
    
          this.processTransaction();

          
        }else{
          this.setState({isLoading: false, message: "Desculpa, o pagamento falhou."})
         
          
        }
         
    }).catch((error) => {
      this.setState({isLoading: false, message: "Desculpa, estamos a enfrentar alguns problemas."})
     
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }else{
    this.setState({isLoading: false, message: "Por favor preencha o nr. de telefone"});
    
   }
   }


  
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
          {/* <View style={styles.backtop}>
          <View style={styles.backIcon}>
                    <TouchableOpacity onPress={this.onMainMenuClicked} style={styles.mainMenu}>
										    <Image style={styles.backArrow} source={require('../../assets/img/back.png')}/>
                        <Text style={styles.txtMainMenu}>Pagamento</Text>
                    </TouchableOpacity>
              </View>
          </View> */}
        <View style={styles.header}>
        <View style={styles.backAndProfile}>
              <View style={styles.backIcon}>
                    <TouchableOpacity onPress={this.onMainMenuClicked} style={styles.mainMenu}>
										    <Image style={styles.backArrow} source={require('../../assets/img/back.png')}/>
                        <Text style={styles.txtMainMenu}>Menu Pincipal</Text>
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
            <View style={styles.clientDetails}>
            <Text style={{color:'#2190fe', fontSize:width*0.040, fontWeight:'bold', margin:8, marginLeft:32}}>Cliente:</Text>
                <Text style={{color:'white', fontSize:width*0.050, fontWeight:'bold', marginLeft:8, marginLeft:32}}>{this.props.store.customerName}</Text>
                <Text style={{color:'#2190fe', fontSize:width*0.040, fontWeight:'bold', margin:8, marginLeft:32}} >No. Contador: {this.props.store.meterNumber}</Text>
                <Text style={{color:'#2190fe', fontSize:width*0.040, fontWeight:'bold', margin:8, marginLeft:32}} >Endereço: {this.props.store.customerAddress}</Text>
            </View>
        </View>

    <View style={styles.centerView}>
      <View>
        <View style={styles.viewAmount}>
          <Text style={styles.lblAmount}>Total a Pagar</Text>
          
          <Text style={styles.lblAmountVal}>{this.toDecimal(this.props.store.paymentAmount)}MT</Text>
        
        </View>
        
        <View style={styles.viewPaymentSystems}>
          <Text style={styles.lblPayments}>Numero com {'\n'}M-Pesa</Text>
          <View style={styles.inputWidget}>
          <TextInput style={this.state.phone ? styles.input : styles.placeholder}
                placeholder="Inserir número com M-Pesa"
                value={this.state.phone}
                keyboardType="numeric"
                maxLength={9}
                minLength={9}
                onChangeText={(phone) => this.setState({ phone:phone})}
                />
                  <Text style={styles.errorMsg}>{this.state.message}{'\n'}</Text>
                </View>
          <View style={styles.viewSecondRow}>
          <TouchableOpacity style={styles.paymentButtonsCD} onPress={this.Mpesa}>
            <Text style={styles.lblPaymentBtn}>Pagar</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>
        </View>

    </View>
    </TouchableWithoutFeedback>
    <View style={styles.footerLogo}>
             <Image style={styles.imgFooterLogo} source={require('../../assets/img/fipagmadzi.png')}/>
          </View>
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
    top: height*0.1,
  
  },
  inner:{
    padding: height*0.11,
    flex: 1,
    justifyContent: "space-around",
    alignItems:'center'
  },
  backtop:{
    position:'absolute',
    top:-5,

    flexDirection:'row',
    alignItems:'center',
    height:height*0.14,
    width:width,
    backgroundColor:"#00035c",
    paddingBottom:height*0.05,
  },
  backAndProfile:{
    flexDirection:"row",
    height:'40%'
  },
  clientDetails:{
    height:height*0.2,
    flexDirection:'column'
  },
  viewSecondRow:{
    marginTop:height*0.05
  },
  header:{
    height: height*0.3,
    justifyContent:'center',
    backgroundColor:"#00035c",
    width:width,
    top:height*0.04,
    position:'absolute',
    borderBottomRightRadius:height*0.06,
    borderBottomLeftRadius:height*0.06,
    zIndex:-3,
    elevation:-3
  },
  centerView:{
    width:width,

    //position:'absolute',
    minHeight:height*0.4,
    top:height*0.05,
    zIndex:-5,
    elevation:-5
  },
  footerLogo:{
    position: 'absolute',
    bottom:0,
    width:130,
    height:height*0.1,
    alignItems: 'center',
    padding:8,
    backgroundColor:'white',
    width:width,
    
  },
  paymentButtonsCD:{
    backgroundColor:"#05185e",
    width:width*0.90,
    height:height*0.1,
    borderRadius:height*0.1/2,
    alignItems:'center',
    justifyContent:'center'
  },
  
  mainMenu:{
    alignItems:"center",
    justifyContent:"center",
		flexDirection:"row",
		padding:12,
		position: 'absolute',
		top: height*0.09,
  },
  lblPaymentBtn:{
    fontSize:height * 0.03,
    fontWeight:"bold",
    color:"white"
  },
  lblAmountVal:{
    fontSize:width*.1,
    fontWeight:"bold",
    color:'#05185E',
    marginLeft:16,
  },
  lblAmount:{
    fontSize:height*.028,
    fontWeight:"bold",
    marginLeft:16,
  },
  lblPayments:{
    fontSize:height*.028,
    fontWeight:"bold",
    
    marginLeft:16,
  },
  profile:{
    marginLeft:height*0.20,
    alignItems:"center",
    justifyContent:"center",
		padding:10,
		marginTop:height*0.05,
  },
  viewPaymentSystems:{
    flex:1,
    margin:20,
    
  },
 
  
  logOutTxt:{
    color:"white",
    fontSize:height*0.014,
    paddingRight:5,
    paddingLeft:5,
  },
  buttonTxt:{
    color: "white",
    fontSize: height*0.03,
  },
  buttonTxt3:{
    color: "#05185e",
    fontSize: height*0.03,
  },
  logoView:{
    width:height*0.1,
    height:height*0.1,
    alignItems:"center",
    justifyContent:"center"
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
  inputWidget: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width*0.88,
		height:height*0.10,
		borderWidth:2,
		borderColor:"#05185e",
		borderRadius:16,
    
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
		fontSize:height*0.025,
    color:"white"
  },
  
  input: {
    height:height*0.08,
    width:width*0.8,
    textAlign:"center",
    justifyContent:"center",
    marginBottom:-height*0.01,
    fontSize:height*0.040
    },
    placeholder:{
      fontSize:height*0.025,
      textAlign:"center",
      justifyContent:"center",
    },
	userEmail:{
		fontSize:height*0.015,
    color:"white"
	},
	txtMainMenu:{
		color:"white",
		fontWeight:"bold",
    marginTop:-40,
    marginLeft:5
	},
	backIcon:{
		padding:12,
		marginLeft:-10,
		marginRight:20
	},
  backArrow:{
    marginTop:-40,
    width:25,
    height:25
  }
});