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
  KeyboardAvoidingView
} from "react-native";
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


  onMainMenuClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("PrePago");
  };

  Logout = () =>{
    const { navigate } = this.props.navigation;
    navigate("Welcome");
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


    <SafeAreaView style={styles.container} onPress={Keyboard.dismiss}> 

        <View style={styles.header}>
          <View style={styles.backAndProfile}>
              <View style={styles.backIcon}>
                    <TouchableOpacity onPress={this.onMainMenuClicked} style={styles.mainMenu}>
										    <Image style={styles.backArrow} source={require('../../assets/img/back.png')}/>
                        <Text style={styles.txtMainMenu}>Pagamento</Text>
                    </TouchableOpacity>
              </View>
              <View style={styles.profile}>
                  <View style={styles.circleView}>
                  <View style={styles.profilePhoto}><Text style={styles.initialLetterIfNoPhoto}>{this.props.store.user.charAt(0)}</Text></View>
                  </View>
                  <Text style={styles.userName}>{this.props.store.user}</Text>
                  <Text style={styles.userEmail}>{this.props.store.email}</Text>
                   <TouchableOpacity onPress={this.Logout} style={styles.logOut}><Text style={styles.logOutTxt}>Terminar sessão</Text></TouchableOpacity>
              </View>
            </View>
            <View style={styles.clientDetails}>
                <Text style={{color:'#2190fe', fontSize:18, fontWeight:'bold', margin:8, marginLeft:32}}>Cliente:</Text>
                <Text style={{color:'white', fontSize:24, fontWeight:'bold', marginLeft:8, marginLeft:32}}>{this.props.store.customerName}</Text>
                <Text style={{color:'#2190fe', fontSize:18, fontWeight:'bold', margin:8, marginLeft:32}} >No. Contador: {this.props.store.meterNumber}</Text>
                <Text style={{color:'#2190fe', fontSize:18, fontWeight:'bold', margin:8, marginLeft:32}} >Endereço: {this.props.store.customerAddress}</Text>
            </View>
        </View>


        <View style={styles.viewAmount}>
          <Text style={styles.lblAmount}>Insira o valor</Text>
          <View style={styles.viewAmountInputs}>
           <TextInput
            style={styles.amountValue}
            placeholder="1024.00"
            onChangeText={(text) => this.setState({ amount:text })}
            defaultValue={this.state.amount}
            keyboardType="numeric"
            maxLength={5}
          />
        
        </View>
        </View>

        <View style={styles.viewPaymentSystems}>
          <Text style={styles.lblPayments}>Pagar com:</Text>
          <View style={styles.viewFirstRow}>
          <TouchableOpacity style={styles.paymentButtonsMP}>
            <Text style={styles.lblPaymentBtn}>M-pesa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButtonsCM}>
            <Text style={styles.lblPaymentBtn}>Conta Móvel</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.viewSecondRow}>
          <TouchableOpacity style={styles.paymentButtonsCD}>
            <Text style={styles.lblPaymentBtn}>Cartão de Credito/Debito</Text>
          </TouchableOpacity>
          </View>
        </View>
          <View style={styles.footerLogo}>
             <Image style={styles.imgFooterLogo} source={require('../../assets/img/fipagmadzi.png')}/>
          </View>
    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc',
    alignItems: 'center',    
  },
  amountValue:{
    backgroundColor:"#454F5A",
    width:width * 0.5,
    height:height/16,
    borderRadius:9,
    fontSize:26,
    alignItems:'center',
    justifyContent:'center',
    color: "white"
  },
  decimals:{
    backgroundColor:"#454F5A",
    width:width/8,
    height:height/16,
    borderRadius:9,
    fontSize:26,
    alignItems:'center',
    justifyContent:'center',
    margin:16
  },
  lblAmount:{
    fontSize:26,
    fontWeight:"bold",
    marginTop:10,
    marginLeft:16,
  },
  lblPayments:{
    fontSize:26,
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
    width:width-30,
    height: height/8,
    flexDirection:"row",
    color:"#202121"
  },
  dot:{
    fontSize:80,
    marginTop:-40,
    color:"#202121"
  },
  viewFirstRow:{
    width:width-30,
    alignItems:'center',
    justifyContent:"center",
    height: height/8,
    flexDirection:"row",
    margin:8
  },
  viewSecondRow:{
    width:width-30,
    alignItems:'center',
    justifyContent:"center",
    height: height/10,
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
     borderTopRightRadius:50,
     borderTopLeftRadius:50
   },
  backAndProfile:{
    flexDirection:"row",
    height:'40%'
  },
  clientDetails:{
    height:'60%',
    flexDirection:'column',
  },
  header:{
    width:width -30,
    height: height * 0.3,
    justifyContent:'center',
    backgroundColor:"#00035c",
    width:'100%',
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50
  },
  centerView:{
    width:width-30,
    height:"30%",
    alignItems: 'center',
	  top:80
  },
  footerLogo:{
    position: 'absolute',
    bottom:'5%',
    width:130,
    height:40,
    alignItems: 'center',
    padding:8
  },
  btnLogo:{
    color: "#00035c",
    fontSize: 34,
    fontWeight: 'bold'
  },
  actionButton1:{
    backgroundColor:"#05185e",
    width:"95%",
    height:60,
    marginTop: -40,
    borderRadius:80/2,
    alignItems:'center',
    justifyContent:'center'
  },
    actionButton2:{
    backgroundColor:"#2190fe",
    width:"95%",
    height:60,
    borderRadius:80/2,
    alignItems:'center',
    justifyContent:'center',
    margin:16
  },
    actionButton3:{
    backgroundColor:"#b8c8e2",
    width:"95%",
    height:60,
    borderRadius:80/2,
    alignItems:'center',
    justifyContent:'center'
  },
    actionButton4:{
    backgroundColor:"#fbfbfd",
    width:"95%",
    borderWidth:1,
    borderColor:'#2190fe',
    height:60,
    borderRadius:80/2,
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
		top: 75,
  },
  profile:{
    marginLeft:160,
    alignItems:"center",
    justifyContent:"center",
		padding:10,
		marginRight:-10
  },
  logOutTxt:{
    color:"white",
    fontSize:14,
    paddingRight:5,
    paddingLeft:5,
  },
  logoView:{
    width:80,
    height:80,
    alignItems:"center",
    justifyContent:"center"
  },
  lblNrContador:{
    color:"#05185e",
    fontSize:18,
    fontWeight:"bold",
    margin:8
  },
  appName:{
    color:"#05185e",
    fontSize:34,
    fontWeight:"bold",
    marginBottom:-100
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
		fontSize:13,
    color:"white"
  },
	userEmail:{
		fontSize:12,
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