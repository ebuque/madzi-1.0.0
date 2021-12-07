import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import * as Google from "expo-google-app-auth";
import {IOS_GCLIENT_ID, ANDROID_GCLIENT_ID} from '@env';
const iosClientId = IOS_GCLIENT_ID;
const androidClientId = ANDROID_GCLIENT_ID;
const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);


import {observer, inject} from "mobx-react";
@inject("store")
@observer
export default class Welcome extends Component{

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      accessToken:null,
      email:null,
      isLoading:false,
    };
  }

  googleLogin = async () =>{
     this.setState({isLoading: true});
     try {
     const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: iosClientId,
      androidClientId: androidClientId,
     // iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
      androidStandaloneAppClientId: androidClientId,
    });

    if (type === 'success') {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
        this.props.store.addValue("fullname", user.givenName+" "+user.familyName)
        this.props.store.addValue("email", user.email)
        this.props.store.addValue("accessToken", accessToken);
        this.setState({isLoading: false});    
        const { navigate } = this.props.navigation;
        navigate("Main");
    }else {
      this.setState({isLoading: false});
      return { cancelled: true };
    }
  } catch (e) {
    this.setState({isLoading: false});   
    alert("Erro: "+e);
    return { error: true };
  }
  }
 

  onPress = () => {
    this.googleLogin();
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

        <View style={styles.body}>
          <View style={styles.logo}>
            <View style={styles.logoIn}>
                <Image style={styles.logoImg} source={require("../../assets/img/logo.png")} />
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
              <TouchableOpacity onPress={this.onPress} style={styles.touchableButton}>
              <Image style = {styles.googleImg} source={require('../../assets/img/google.png')}/>
              <Text style={styles.buttonMSG}>
                    Continuar com Google
              </Text>
               </TouchableOpacity>
          </View>
         
          <View style={styles.footerLogo}>
             <Image style={styles.imgFooterLogo} source={require('../../assets/img/footer-logo-white.png')}/>
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

    
  },
  body:{
    flex: 1,
    alignItems: 'center',
    
  },
  welcome:{
      color: "white",
      fontSize: width * 0.06,
      fontWeight: 'bold'
  },
  welcomeBottom:{
    color: "white",
      fontSize: width * 0.06,
      fontWeight: 'bold'
  },
  buttonMSG:{
      color: "#00035c",
      fontSize: width * 0.05,
  },
  welcomeDesc:{
    color: "white",
    fontSize: width * 0.045,
    marginTop:30,
  },
  welcomeMsg: {
    top:"10%",
    width:width*0.8,
    height:height * 0.3,
    alignItems:'center',
    justifyContent: 'center',
  },
  logo:{
    top:"10%",
    borderColor:"white",
    borderWidth: 1,
    width:width * 0.45,
    height:width * 0.45,
    borderRadius: (width * 0.45)/2,
    alignItems:'center',
    justifyContent: 'center',
  },
    logoIn:{
    borderColor:"white",
    borderWidth: 1,
    width:width * 0.4,
    height:width * 0.4,
    borderRadius: (width * 0.4)/2,
    backgroundColor:"white",
    alignItems:'center',
    justifyContent:'center'
  },
  logoImg:{
  flex:1,
  resizeMode:"contain",
  width:"100%",
  height:"100%"
  }, 
   loginButton :{
    top:"15%",
    width:width/1.3,
    height:height/12,
    borderRadius:100,
    backgroundColor:"white",
    
  },
  footerLogo:{
    position: 'absolute',
    bottom:'2%', 
    width:130,
    height:40,
    alignItems: 'center',
    padding:8
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
