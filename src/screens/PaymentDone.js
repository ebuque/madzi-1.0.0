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
  ScrollView,
} from "react-native";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as Google from "expo-google-app-auth";
import {IOS_GCLIENT_ID, ANDROID_GCLIENT_ID} from '@env';
const iosClientId = IOS_GCLIENT_ID;
const androidClientId = ANDROID_GCLIENT_ID;
const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);


const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }

            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Hello, UppLabs!</h1>
    </body>
    </html>
`;

import {observer, inject} from "mobx-react";
import { color } from "react-native-reanimated";
@inject("store")
@observer
export default class PaymentDone extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      timePassed: false,
    };
  }

  toDecimal = (n) => {

    return  parseFloat(n).toFixed(2);
  }



  goToMain =()=>{
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
          navigate("PrePagoDashBoard");        
      }).catch((error) => {
        this.setState({isLoading: false})
        const { navigate } = this.props.navigation;
        navigate("PrePagoDashBoard");
      }).finally(() => {
        this.setState({ isLoading: false });
        const { navigate } = this.props.navigation;
        navigate("PrePagoDashBoard");
      });
  };
  

  printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
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
    <SafeAreaView style={styles.container}>

   
        <ScrollView style={styles.centerViewScrool}>
        <View style={styles.centerView}>
        <Image style={styles.done} source={require('../../assets/img/done.png')}/>
             <Text style={styles.lblDone}>Transação {'\n'}Bem-sucedida</Text>
        </View>
        <View style={styles.receip}>
              <View style={styles.rowRecharge}> 
                    <Text style={styles.voucher}>Código da recarga:{'\n'}{this.props.store.rechargeCode}</Text>
              </View>
              <View style={styles.rowRechargeDetails}>
              
              <Text style={styles.voucher}>Compra</Text>
              <Text style={styles.txtDetails}>Valor Pago: {this.toDecimal(this.props.store.paymentAmount)}MT</Text>
              <Text style={styles.txtDetails}>Dívida Paga: {this.toDecimal(this.props.store.debtAmount)}MT</Text>
              <Text style={styles.txtDetails}>IVA: {this.toDecimal(this.props.store.vat)}MT</Text>
              <Text style={styles.voucher}>Taxas</Text>
              <Text style={styles.txtDetails}>Fixa: 0MT</Text>
              <Text style={styles.txtDetails}>Desp. Servico: {this.toDecimal(this.props.store.availabilityService)}MT</Text>
              <Text style={styles.voucher}>Consumo</Text>
              <Text style={styles.txtDetails}>Valor: {this.toDecimal(this.props.store.waterAmount)}MT</Text>
              <Text style={styles.txtDetails}>Volume: {this.toDecimal(this.props.store.waterVolume)}m3</Text>
             
              <Text style={styles.txtDetails}>Cliente: {this.props.store.customerName}</Text>
              <Text style={styles.txtDetails}>Nr. do Contador: {this.props.store.meterNumber}</Text>
              <Text style={styles.txtDetails}>Região: {this.props.store.customerAddress}</Text>
              <Text style={styles.txtDetails}>Escalão: {this.props.store.scale}</Text>
              <Text style={styles.txtDetails}>Tarifário: {this.props.store.category}</Text>
              <Text style={styles.txtDetails}>Referência: {this.props.store.transactionId}</Text>

              <View style={styles.footerLogo}>
             <Image style={styles.imgFooterLogo} source={require('../../assets/img/fipagmadzi.png')}/>
          </View>
 
              </View>
              <View style={styles.buttonsView}>
            <TouchableOpacity style={styles.saveButton} onPress={this.printToFile}><Text style={{color:'#05185e', fontSize:18}}>Guardar</Text></TouchableOpacity>
            <TouchableOpacity style={styles.seeButton} onPress={this.goToMain}><Text style={{color:'white', fontSize:18}}>Terminar</Text></TouchableOpacity>
          </View>
        </View>
         </ScrollView>
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
  buttonsView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  footerLogo:{
    right:-width*0.5
  },
  txtDetails:{
      fontSize:height*0.020
  },
  rowRecharge:{
      borderBottomWidth:1,
      width:width*0.8,
      height:height*0.1,
      
  },
  rowRechargeDetails:{
    borderBottomWidth:1,
    width:width*0.8,
    justifyContent:'center'
  },
  header:{
    width:width*0.9,
    height: height*0.16,
    justifyContent:'center',
    flexDirection:"row-reverse",
    marginTop:height*0.02,
  
  },
  centerView:{
    width:width*0.9,
    height:height*0.15,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'row',
    marginTop:-height*0.05,
    zIndex:-3
    
    
  },
  centerViewScrool:{
    paddingTop:height*0.02,
    marginTop:height*0.05
  },
  receip:{
   width:width-2,
   height:height*0.7,
   alignItems: 'center',
   marginTop:0,
   borderWidth:2,
   borderColor:'#2191ff',
   borderTopEndRadius:height*0.03,
   borderTopLeftRadius:height*0.03,
   borderBottomColor:'transparent'
   
  },
  
  done:{
      width:width*0.15,
      height:height*0.15,
      resizeMode:'contain',
      marginLeft:-width*0.25
  }
  ,
  lblDone:{
    fontSize:height*.03,
    fontWeight:"bold",
    color:'#05185E',
    marginLeft:16,
  },
  voucher:{
    fontSize:height*.022,
    fontWeight:"bold",
    color:'#05185E',
    marginTop:8
  },
  seeButton:{
    backgroundColor:"#05185e",
    width:width * 0.30,
    height:height*0.05,
    margin: 8,
    borderRadius:height*0.10/2,
    alignItems:'center',
    justifyContent:'center'
  },
  saveButton:{
    backgroundColor:"white",
    width:width * 0.3,
    height:height*0.05,
    margin: 8,
    borderRadius:height*0.10/2,
    alignItems:'center',
    borderWidth:1.5,
    borderColor:'#05185e',
    justifyContent:'center'
  },
  profile:{
    marginLeft:width*0.45,
    alignItems:"center",
    justifyContent:"center",
    marginTop:-height*0.05
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
