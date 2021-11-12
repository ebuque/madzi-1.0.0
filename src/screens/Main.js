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
                  <View style={styles.profilePhoto}><Text style={styles.initialLetterIfNoPhoto}>U</Text></View>
                  <Text style={styles.userName}>User Name</Text>
                  <Text style={styles.userEmail}>user@domain.com</Text>
              </View>
        </View>
        <View style={styles.centerView}>
              <View style={styles.logoView}>
                <Text style={styles.logo}>LOGO</Text>
              </View>
              <Text style={styles.appNameDesc}>Aplicativo de gestão de água</Text>
              <Text style={styles.appName}>MADZI</Text>
        </View>
        <View style={styles.buttonsView}>
              <TouchableOpacity style={styles.prePaidButton}><Text style={styles.buttonTxt}>Pré-pago</Text></TouchableOpacity>
              <TouchableOpacity style={styles.postPaidButton}><Text style={styles.buttonTxt}>Pós-pago</Text></TouchableOpacity>
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
    backgroundColor:"yellow",
    width:width -70,
    height: "25%",
    justifyContent:'center',
    flexDirection:"row-reverse",
  },
  centerView:{
    width:width-70,
    height:"30%",
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonsView:{
   width:width-70,
   height:"35%",
   alignItems: 'center',
   justifyContent:'center'
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
  prePaidButton:{
    backgroundColor:"#05185e",
    width:"95%",
    height:60,
    margin: 8,
    borderRadius:80/2,
    alignItems:'center',
    justifyContent:'center'
  },
  postPaidButton:{
    backgroundColor:"#2191ff",
    width:"95%",
    height:60,
    margin: 8,
    borderRadius:80/2,
    alignItems:'center',
    justifyContent:'center'
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
  appNameDesc:{
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
  }
});
