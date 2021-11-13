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
import * as Google from "expo-google-app-auth";
import {IOS_GCLIENT_ID, ADNROID_GCLIENT_ID} from '@env';

const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);
const iosClientId = IOS_GCLIENT_ID;
const androidClientId = ADNROID_GCLIENT_ID;

export default class Welcome extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  onGoogleLoginClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("Main");
  };

  render() {
  return (
    <SafeAreaView style={styles.container}>

        <View style={styles.body}>
          <View style={styles.logo}>
            <View style={styles.logoIn}>
                <Image style={styles.logoImg} source={require("../../assets/icon.png")} />
             </View>
          </View>
          <View style={styles.welcomeMsg}>
             
              <Text style={styles.welcome}>
                Seja Bem-vindo!
              </Text>
              <Text style={styles.welcomeDesc}>
                Caro utilizador, para que tenha uma melhor experiência ao utilizar a aplicação Madzi, por favor cadastre-se abaixo.
              </Text>
          </View>
          
          <View style={styles.loginButton}>
              <TouchableOpacity onPress={this.onGoogleLoginClicked} style={styles.touchableButton}>
              <Image style = {styles.googleImg} source={require('../../assets/img/google.png')}/>
              <Text style={styles.buttonMSG}>
                    Continuar com Google
              </Text>
               </TouchableOpacity>
          </View>
         
          <View style={styles.footerLogo}>
              <Text style={styles.welcomeBottom}>
                FIPAG
              </Text>
          </View>
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
