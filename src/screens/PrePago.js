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
} from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);

import {observer, inject} from "mobx-react";
@inject("store")
@observer
export default class PrePago extends Component{
  constructor(props) {
    super(props);
    this.state = {
     code : "",
		 message : "",
     isLoading: false
    };
  }
 componentDidMount() {}

 verifyAccount = () =>
 {
   this.setState({isLoading: true});
   if(this.state.code!==""){
     fetch(`${this.props.store.apiHost}${this.props.store.simulateEndPoint}?eId=${this.props.store.eld}&eKey=${this.props.store.eKey}&userId=${this.props.store.userId}&meterNumber=${this.state.code}&amount=0&token=${this.props.store.token}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response )=> response.json()).then(
        (json)=> {
           
        if (json.errorCode==null) {
            this.setState({isLoading: false});
            this.props.store.addValue('customerName', json.customerName);
            this.props.store.addValue('meterNumber', json.meterNumber);
            this.props.store.addValue('customerAddress', json.customerDistrict);
            const { navigate } = this.props.navigation;
            navigate("PrePagoDashBoard");
        } else {
          this.setState({isLoading: false, message: "Nr. de Contador inválido"})
          alert(this.state.message)
        }
        
      }).catch((error) => {
        this.setState({isLoading: false, message: "Desculpa, estamos a enfrentar alguns problemas ⚒️"})
        alert(this.state.message + error)
      }).finally(() => {
        this.setState({ isLoading: false });
      });
   }else{
    this.setState({isLoading: false, message: "Por favor preencha o nr. de contador"});
    alert(this.state.message)
   }
      
 }

  onMainMenuClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("Main");
  };

  onContinueClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("PrePagoDashBoard");
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
    <SafeAreaView style={styles.container}>

        <View style={styles.header}>
              <View style={styles.homeIcon}>
                    <TouchableOpacity onPress={this.onMainMenuClicked} style={styles.mainMenu}>
										    <Image style={styles.homeSvg} source={require('../../assets/img/home.png')}/>
                        <Text style={styles.txtMainMenu}>MENU PRINCIPAL</Text>
                    </TouchableOpacity>
              </View>
              <View style={styles.profile}>
                  <View style={styles.circleView}>
                  <View style={styles.profilePhoto}><Text style={styles.initialLetterIfNoPhoto}>{this.props.store.user.match(/\b\w/g).join('')}</Text></View>
                  </View>
                  <Text style={styles.userName}>{this.props.store.user}</Text>
                  <Text style={styles.userEmail}>{this.props.store.email}</Text>
                   <TouchableOpacity onPress={this.Logout} style={styles.logOut}><Text style={styles.logOutTxt}>Terminar sessão</Text></TouchableOpacity>
              </View>
        </View>
        <View style={styles.centerView}>
              <View style={styles.logoView}>
                <Image style={styles.logo} source={require('../../assets/img/logo.png')}/>
              </View>
              <Text style={styles.lblNrContador}>Digita o número {'\n'}do Contador</Text>
              <View style={styles.inputWidget}>
                <SmoothPinCodeInput
                cellSize={20}
                codeLength={13}
                cellStyle={{
                  borderBottomWidth: 2,
                  borderColor: "#05185e",
                 
                }}
                textStyle={{
                  fontSize: 24,
                  color: '#05185e'
                }}
                autoFocus={false}
                animated={true}
                cellStyleFocused={{
                  borderColor: "white",
                }}
                cellStyle={styles.input}
                value={this.state.code}
                onTextChange={(meterNumber) => this.setState({ code:meterNumber, message:"" })}
                onFulfill={Keyboard.dismiss}
              />
             
            </View>
        </View>
        <View style={styles.buttonsView}>
              <TouchableOpacity onPress={this.verifyAccount} style={styles.continueButtonn}><Text style={styles.buttonTxt}>Continuar</Text></TouchableOpacity>
        </View>
          <View style={styles.footerLogo}>
             <Image style={styles.imgFooterLogo} source={require('../../assets/img/footer-logo-blue.png')}/>
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
    height: height,
    
  },
  header:{
    width:width -30,
    height: "25%",
    justifyContent:'center',
    flexDirection:"row",
  },
  centerView:{
    width:width-30,
    height:"30%",
    alignItems: 'center',
	  top:80
  },
  buttonsView:{
   width:width-30,
   height:"10%",
   alignItems: 'center',
   justifyContent:'center',
	 marginTop:60
	 
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
  continueButtonn:{
    backgroundColor:"#05185e",
    width:"55%",
    height:80,
    margin: 32,
    borderRadius:80/2,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:-80
  },
  mainMenu:{
    alignItems:"center",
    justifyContent:"center",
		flexDirection:"row",
		padding:12,
		position: 'absolute',
		top: 75,
  },
	homeIcon:{
		padding:12,
		marginLeft:-10,
		marginRight:20
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
  buttonTxt:{
    color: "white",
    fontSize: 20,
  },
  logoView:{
    width:80,
    height:80,
    alignItems:"center",
    justifyContent:"center",
    margin:32,
    marginTop:-50
  },
  lblNrContador:{
    color:"#05185e",
    fontSize:24,
    fontWeight:"bold",
    margin:22,
    marginLeft:-130
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
		fontSize:13
  },
	userEmail:{
		fontSize:12
	},
  inputWidget: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width-30,
		height:80,
		borderWidth:2,
		borderColor:"#05185e",
		borderRadius:16
  },
	txtMainMenu:{
		color:"#05185e",
		fontWeight:"bold",
    marginBottom:-10,
    marginLeft:5
	},
  homeSvg:{
    width:25,
    height:25
  },
  input: {
    borderBottomWidth: 2,
    height:40,
    width:22
    } 
});
