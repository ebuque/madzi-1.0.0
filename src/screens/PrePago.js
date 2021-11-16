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
		 message : ""
    };
  }
 componentDidMount() {}


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
                <Text style={styles.logo}>LOGO</Text>
              </View>
              <Text style={styles.lblNrContador}>Digita o número do Contador</Text>
              <View style={styles.inputWidget}>
                <SmoothPinCodeInput
                cellSize={25}
                codeLength={10}
                cellStyle={{
                  borderBottomWidth: 2,
                  borderColor: "#05185e",
                }}
                autoFocus={false}
                animated={true}
                cellStyleFocused={{
                  borderColor: "black",
                }}
                cellStyle={styles.input}
                value={this.state.code}
                onTextChange={(code) => this.setState({ code, message:"" })}
                onFulfill={Keyboard.dismiss}
              />
             
            </View>
        </View>
        <View style={styles.buttonsView}>
              <TouchableOpacity style={styles.continueButtonn}><Text style={styles.buttonTxt}>Continuar</Text></TouchableOpacity>
        </View>
        <View style={styles.footerLogo}>
              <Text style={styles.btnLogo}>FIPAG</Text>
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
    bottom:50,
    width:200,
    height:40,
    alignItems: 'center',
    
  },
  btnLogo:{
    color: "#00035c",
    fontSize: 34,
    fontWeight: 'bold'
  },
  continueButtonn:{
    backgroundColor:"#05185e",
    width:"55%",
    height:60,
    margin: 8,
    borderRadius:80/2,
    alignItems:'center',
    justifyContent:'center'
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
		fontSize:13
  },
	userEmail:{
		fontSize:12
	},
  inputWidget: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
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
    //width: "%",
    borderBottomWidth: 1,
    fontSize: 24,
  } 
});
