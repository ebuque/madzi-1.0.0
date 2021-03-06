import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView
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
export default class PrePagoPayment extends Component{
  constructor(props) {
    super(props);
    this.state = {
     amount : "",
		 message : "",
     decimal: "",
    isLoading:false,
    };
  }
  
  componentDidMount() {}

  toDecimal = (n) => {

    return  parseFloat(n).toFixed(2);
  }
  onMainMenuClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("PrePago");
  };

  Mpesa = () =>{

    this.setState({isLoading: true})
    fetch('https://google.com', /** Just to fetch something, in order to have processing time */ {
        method: 'GET',
        headers: {
          Accept: 'application/html',
          'Content-Type': 'application/html'
        }
    }).then((response )=> response.json()).then(
        (json)=> {
      
          this.setState({isLoading: false})
          
          const {navigate} = this.props.navigation;
          navigate("MPesa");      
      }).catch((error) => {
        this.setState({isLoading: false})
        const { navigate } = this.props.navigation;
        navigate("MPesa")
      }).finally(() => {
        this.setState({ isLoading: false });
        const { navigate } = this.props.navigation;
        navigate("MPesa")
      });
  };

  
  Logout = async() =>{
    this.setState({isLoading: true});

    try{
      const config = {
        iosClientId: iosClientId,
        androidClientId: androidClientId,
       // iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
        androidStandaloneAppClientId: androidClientId,
      };
      const accessToken = this.props.store.accessToken;
      
        await Google.logOutAsync({ accessToken, ...config });
        /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
        this.setState({isLoading: false});
        const { navigate } = this.props.navigation;
        navigate("Welcome");
      
    }catch(e){
      this.setState({isLoading: false});   
      alert("Erro: "+e);
      return { error: true };
    }
    

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
          <View style={styles.backAndProfile}>
              <View style={styles.backIcon}>
                    <TouchableOpacity onPress={this.onMainMenuClicked} style={styles.mainMenu}>
										    <Image style={styles.backArrow} source={require('../../assets/img/back.png')}/>
                        <Text style={styles.txtMainMenu}>Pagamento</Text>
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
                <Text style={{color:'#2190fe', fontSize:width*0.040, fontWeight:'bold', margin:8, marginLeft:32}} >Endere??o: {this.props.store.customerAddress}</Text>
           </View>
        </View>


    <ScrollView style={styles.centerView}>
      <View style={{alignItems:'center'}}>
        <View style={styles.viewAmount}>
          <Text style={styles.lblAmount}>Montante a pagar</Text>
          <View style={styles.viewAmountInputs}>
          <Text style={styles.lblAmountVal}>{this.toDecimal(this.props.store.paymentAmount)}MT</Text>
        
        </View>
        </View>

        <View style={styles.viewPaymentSystems}>
          <Text style={styles.lblPayments}>Pagar com:</Text>
          <View style={styles.viewFirstRow}>
          <TouchableOpacity style={styles.paymentButtonsMP} onPress={this.Mpesa}>
            <Text style={styles.lblPaymentBtn}>M-pesa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButtonsCM}>
            <Text style={styles.lblPaymentBtn}>Conta M??vel</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.viewSecondRow}>
          <TouchableOpacity style={styles.paymentButtonsCD}>
            <Text style={styles.lblPaymentBtn}>Cart??o de Credito/Debito</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>
        </ScrollView>
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
  clientDetails:{
    height:height*0.2,
    flexDirection:'column'
  },
  header:{
    height: height*0.3,
    justifyContent:'center',
    backgroundColor:"#00035c",
    width:width,
    borderBottomRightRadius:height*0.06,
    borderBottomLeftRadius:height*0.06,
    marginTop:height*0.05,
    position:'absolute',
    top:-5,
  },
  centerView:{
    width:width,
	  top:height*0.35,
    height:height*0.7,
    position:'absolute'

  },
  footerLogo:{
    position: 'absolute',
    bottom:0,
    width:130,
    height:height*0.1,
    alignItems: 'center',
    padding:8,
    backgroundColor:'white',
    width:width
  },
  actionButton1:{
    backgroundColor:"#05185e",
    width:width*0.90,
    height:height*0.1,
    marginTop: -height*0.05,
    borderRadius:height*0.1/2,
    alignItems:'center',
    justifyContent:'center'
  },
    actionButton2:{
    backgroundColor:"#2190fe",
    width:width*0.90,
    height:height*0.1,
    borderRadius:height*0.1/2,
    alignItems:'center',
    justifyContent:'center',
    margin:16
  },
    actionButton3:{
    backgroundColor:"#b8c8e2",
    width:width*0.90,
    height:height*0.1,
    borderRadius:height*0.1/2,
    alignItems:'center',
    justifyContent:'center'
  },
    actionButton4:{
    backgroundColor:"#fbfbfd",
    width:width*0.90,
    height:height*0.1,
    borderWidth:1,
    borderColor:'#2190fe',
    borderRadius:height*0.1/2,
    alignItems:'center',
    justifyContent:'center',
    margin:16
  },
  mainMenu:{
    alignItems:"center",
    justifyContent:"center",
		flexDirection:"row",
		padding:12,
		position: 'absolute',
		top: height*0.09,
  },
  profile:{
    marginLeft:height*0.20,
    alignItems:"center",
    justifyContent:"center",
		padding:10,
		marginTop:height*0.05,
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
    borderRadius:height*0.01,
  },
  userName:{
    fontWeight:"bold",
		fontSize:height*0.025,
    color:"white"
  },
	userEmail:{
		fontSize:height*0.015,
    color:"white"
	},
  amountValue:{
    backgroundColor:"#454F5A",
    width:width * 0.5,
    height:height/16,
    borderRadius:9,
    fontSize:height*0.028,
    alignItems:'center',
    justifyContent:'center',
    color: "white",
    paddingLeft:height*0.02,
    paddingRight:height*0.02,
  },
  decimals:{
    backgroundColor:"#454F5A",
    width:width/8,
    height:height/16,
    borderRadius:9,
    fontSize:height*0.028,
    alignItems:'center',
    justifyContent:'center',
    margin:16
  },
  lblAmount:{
    fontSize:height*.028,
    fontWeight:"bold",
  },
  lblAmountVal:{
    fontSize:width*.1,
    fontWeight:"bold",
    color:'#05185E',
  },
  lblPayments:{
    fontSize:height*0.028,
    fontWeight:"bold",
    marginLeft:16,
    color:"#05185E"
  },
  lblPaymentBtn:{
    fontSize:height * 0.03,
    fontWeight:"bold",
    color:"white"
  },
  viewAmountInputs:{
    width:width*0.9,
    height: height/8,
    flexDirection:"row",
    color:"#202121"
  },
  viewFirstRow:{
    width:width*0.9,
    alignItems:'center',
    justifyContent:"center",
    height: height*0.20,
    flexDirection:"row",
    margin:8
  },
  viewSecondRow:{
    width:width*0.90,
    alignItems:'center',
    justifyContent:"center",
    height: height*0.15,
    margin:8,
    marginTop:4
  },
   paymentButtonsCD:{
      backgroundColor:"#05185E",
      height:"100%",
      width:"100%",
      borderRadius:16,
      justifyContent:"center",
      alignItems:"center"
   },
   paymentButtonsMP:{
      backgroundColor:"#191818",
      height:"100%",
      width:"50%",
      borderRadius:16,
      justifyContent:"center",
      alignItems:"center",
      marginRight:8
   },
   paymentButtonsCM:{
      backgroundColor:"#3B8BD8",
      height:"100%",
      width:"50%",
      borderRadius:16,
      justifyContent:"center",
      alignItems:"center",
   },
   viewPaymentSystems:{
     backgroundColor:"white",
     padding:16,
     borderTopRightRadius:height*0.08,
     borderTopLeftRadius:height*0.08,
     marginTop:-height*0.05
   },
  backAndProfile:{
    flexDirection:"row",
    height:'40%'
  },
 
  lblNrContador:{
    color:"#05185e",
    fontSize:height*0.02,
    fontWeight:"bold",
    margin:8
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
  },
  inner: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection:'column',
    width:width*0.95,
    alignItems:'center',
  },
  
});