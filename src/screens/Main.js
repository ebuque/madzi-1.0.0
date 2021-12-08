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
export default class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      timePassed: false,
    };
  }


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
  goToPrePaid =()=>{
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
          const { navigate } = this.props.navigation;
          navigate("PrePago");        
      }).catch((error) => {
        this.setState({isLoading: false})
        const { navigate } = this.props.navigation;
        navigate("PrePago")
      }).finally(() => {
        this.setState({ isLoading: false });
        const { navigate } = this.props.navigation;
        navigate("PrePago")
      });
  };
  goToPostPaid =()=>{
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
          const { navigate } = this.props.navigation;
          navigate("PosPago");        
      }).catch((error) => {
        this.setState({isLoading: false})
        const { navigate } = this.props.navigation;
        navigate("PosPago")
      }).finally(() => {
        this.setState({ isLoading: false });
        const { navigate } = this.props.navigation;
        navigate("PosPago")
      });
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
              <View style={styles.profile}>
                  <View style={styles.circleView}>
                  <View style={styles.profilePhoto}><Text style={styles.initialLetterIfNoPhoto}>{this.props.store.user.charAt(0)}</Text></View>
                  </View>
                  <Text style={styles.userName}>{this.props.store.user}</Text>
                  <Text style={styles.userEmail}>{this.props.store.email}</Text>
              </View>
        </View>
        <View style={styles.centerView}>
              <View style={styles.logoView}>
                <Image style={styles.logo} source={require('../../assets/img/logo.png')}/>
              </View>
              <Text style={styles.appNameDesc}>Aplicativo de gestão de água</Text>
              <Text style={styles.appName}>MADZI</Text>
        </View>
        <View style={styles.buttonsView}>
              <TouchableOpacity onPress={this.goToPrePaid} style={styles.prePaidButton}><Text style={styles.buttonTxt}>Pré-pago</Text></TouchableOpacity>
              <TouchableOpacity onPress={this.goToPostPaid} style={styles.postPaidButton}><Text style={styles.buttonTxt}>Pós-pago</Text></TouchableOpacity>
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
    width:width*0.9,
    height: height*0.20,
    justifyContent:'center',
    flexDirection:"row-reverse",
    marginTop:height*0.05,
  
  },
  centerView:{
    width:width*0.9,
    height:height*0.30,
    alignItems: 'center',
    justifyContent:'center',
    
    
  },
  buttonsView:{
   width:width*0.9,
   height:height*0.25,
   alignItems: 'center',
   justifyContent:'center',
   marginTop:0,
  },
  footerLogo:{
    position: 'absolute',
    bottom:height*0.03,
    width:height*0.001,
    height:40,
    alignItems: 'center',
    padding:8
  },
  prePaidButton:{
    backgroundColor:"#05185e",
    width:width * 0.90,
    height:height*0.10,
    margin: 8,
    borderRadius:height*0.10/2,
    alignItems:'center',
    justifyContent:'center'
  },
  postPaidButton:{
    backgroundColor:"#2191ff",
    width:width * 0.90,
    height:height*0.10,
    margin: 8,
    borderRadius:height*0.10/2,
    alignItems:'center',
    justifyContent:'center'
  },
  profile:{
    marginLeft:width*0.45,
    alignItems:"center",
    justifyContent:"center",
    marginTop:-height*0.05,
    width:width*0.5
  },
  logOutTxt:{
    color:"white",
    fontSize:14,
    paddingRight:5,
    paddingLeft:5,
    
  },
  buttonTxt:{
    color: "white",
    fontSize: height*0.03,
  },
  logoView:{
    width:width * 0.30,
    height:height * 0.15,
    alignItems:"center",
    justifyContent:"center",
    marginTop:-(width * 0.01),
  },
  appNameDesc:{
    color:"#05185e",
    fontSize:width * 0.05,
    fontWeight:"bold",
    margin:width * 0.02,
  },
  appName:{
    color:"#05185e",
    fontSize:width * 0.08,
    fontWeight:"bold",
    
  },
  circleView:{
    borderWidth:1,
    borderColor:"#2191ff",
    height: height*0.05,
    width: height*0.05,
    borderRadius:height*0.05/2,
    alignItems:'center',
    justifyContent:'center'
  },
  profilePhoto:{
    height: height*0.04,
    width: height*0.04,
    borderRadius:height*0.04/2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"#2191ff",
  },
  initialLetterIfNoPhoto:{
    color:"white",
    fontSize:height*0.024,
    fontWeight:"bold"
  },
  logOut:{
    backgroundColor:"red",
    borderRadius:height*0.05,
  },
  userName:{
    fontWeight:"bold"
  },
  userEmail:{
    
  }
});
