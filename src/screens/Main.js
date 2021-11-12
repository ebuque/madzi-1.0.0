import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);

export default class Welcome extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPrePagoClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("PrePago");
  };

  onPosPagoClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("PosPago");
  };
  render() {
  return (
    <SafeAreaView style={styles.container}>

        <View style={styles.header}>
              <View style={styles.profile}>
                  <View style={styles.profilePhoto}></View>
                  <Text style={styles.userName}>User Name</Text>
                  <Text style={styles.userEmail}>user@domain.com</Text>
              </View>
        </View>
        <View style={styles.centerView}>
              <View style={styles.logo}></View>
              <Text style={styles.appNameDesc}>Aplicativo de gestão de água</Text>
              <Text style={styles.appName}>MADZI</Text>
        </View>
        <View style={styles.buttons}>
              <TouchableOpacity style={styles.prePaidButton}><Text style={styles.buttonTxt}>Pré-pago</Text></TouchableOpacity>
              <TouchableOpacity style={styles.postPaidButton}><Text style={styles.buttonTxt}>Pós-pago</Text></TouchableOpacity>
        </View>
        <View style={styles.buttomLogo}>
              <Text style={styles.btnLogo}>FIPAG</Text>
        </View>
    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00035c',
    alignItems: 'center',
    height: height,
    
  },
  body:{
    flex: 1,
    alignItems: 'center',
    
  },
  welcome:{
      color: "white",
      fontSize: 24,
      fontWeight: 'bold'
  },
  welcomeBottom:{
    color: "white",
      fontSize: 34,
      fontWeight: 'bold'
  },
  buttonMSG:{
      color: "#00035c",
      fontSize: 18,
  },
  welcomeDesc:{
    color: "white",
    fontSize: 18,
    marginTop:30,
  },
  welcomeMsg: {
    top:"10%",
    width:width-70,
    height:200,
    alignItems:'center',
    justifyContent: 'center',
  },
  logo:{
    top:"10%",
    borderColor:"white",
    borderWidth: 1,
    width:200,
    height:200,
    borderRadius: 200/2,
    alignItems:'center',
    justifyContent: 'center',
  },
    logoIn:{
    borderColor:"white",
    borderWidth: 1,
    width:180,
    height:180,
    borderRadius: 180/2,
    backgroundColor:"white"
  }, 
  logoImg:{
    width:"100%",
    height:"100%",
    borderRadius: 180/2,
  },
  loginButton :{
    top:"15%",
    width:300,
    height:55,
    borderRadius:100,
    backgroundColor:"white",
    
  },
  footerLogo:{
    position: 'absolute',
    bottom:50,
    width:200,
    height:40,
    alignItems: 'center',
    
  },
  googleImg :{
    width: 35,
    height:35,
    marginRight:5

  },
  touchableButton :{
    flex:1,
    width:"100%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
