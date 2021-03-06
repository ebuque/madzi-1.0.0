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
let {paymentAmount, rechargeCode, debtAmount, vat, availabilityService, waterVolume, waterAmount, customerAddress, customerName, scale, category, meterNumber, transactionId} = "";
 let html = "";

import {observer, inject} from "mobx-react";
@inject("store")
@observer
export default class PaymentDone extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      timePassed: false,
      rec:""
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

    html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 15px;
                text-align: justify;
            }
    
            h1, h2, h3{
                color: #05185E;
            }
            hr{
                width: 90%;
                margin-left: 0;
            }
            div{
                width: 50%;
                margin-left: 0;
            }
            .dataehora{
              position: absolute;
                right: 50%;
            }
            img{
                position: absolute;
                right: 50%;
              
            }
        </style>
    </head>

    <body>
        <h3>C??digo da recarga: `+this.props.store.rechargeCode+`</h3> 
            <hr>
            <h3>Compra</h3>
            <label>Valor Pago: `+`${this.toDecimal(this.props.store.paymentAmount)}`+`MT</label><br>
            <label>Divida Paga: `+`${this.toDecimal(this.props.store.debtAmount)}`+`MT</label><br>
            <label>IVA: `+`${this.toDecimal(this.props.store.vat)}`+`MT</label><br>
    
            <h3>Taxas</h3>
            <label>Fixa: 0.00MT</label><br>
            <label>Desp. Servico: `+`${this.toDecimal(this.props.store.availabilityService)}`+`MT</label><br>
    
            <h3>Consumo</h3>
            <label>Valor: `+`${this.toDecimal(this.props.store.waterAmount)}`+`MT</label><br>
            <label>Volume: `+`${this.toDecimal(this.props.store.waterVolume)}`+`m3</label><br>
            <label>Cliente: `+`${this.props.store.customerName}`+`</label><br>
            <label>Nr. do Contador: `+`${this.props.store.meterNumber}`+`</label><br>
            <label>Regiao: `+`${this.props.store.customerAddress}`+`</label><br>
            <label>Bairro: `+`${this.props.store.neighborhood}`+`</label><br>
            <label>Escalao: `+`${this.props.store.scale}`+`</label><br>
            <label>Tarifario: `+`${this.props.store.category}`+`</label><br>
            <label>Referencia: `+`${this.props.store.transactionId}`+`</label><br><hr>
            <label class="dataehora">Data e hora: `+`${this.props.store.dataehora}`+`</label><br>
            <div>
                <img src="https://erasmobuque.life/fipagmadzi.png"/>
          </div>
    </body>
    </html>
    `;
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({html});
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
             <Text style={styles.lblDone}>Transa????o {'\n'}Bem-sucedida</Text>
        </View>
        <View style={styles.receip}>
              <View style={styles.rowRecharge}> 
                    <Text style={styles.voucher}>C??digo da recarga:{'\n'}{this.props.store.rechargeCode}</Text>
              </View>
              <View style={styles.rowRechargeDetails}>
              
              <Text style={styles.voucher}>Compra</Text>
              <Text style={styles.txtDetails}>Valor Pago: {this.toDecimal(this.props.store.paymentAmount)}MT</Text>
              <Text style={styles.txtDetails}>D??vida Paga: {this.toDecimal(this.props.store.debtAmount)}MT</Text>
              <Text style={styles.txtDetails}>IVA: {this.toDecimal(this.props.store.vat)}MT</Text>
              <Text style={styles.voucher}>Taxas</Text>
              <Text style={styles.txtDetails}>Fixa: 0MT</Text>
              <Text style={styles.txtDetails}>Desp. Servico: {this.toDecimal(this.props.store.availabilityService)}MT</Text>
              <Text style={styles.voucher}>Consumo</Text>
              <Text style={styles.txtDetails}>Valor: {this.toDecimal(this.props.store.waterAmount)}MT</Text>
              <Text style={styles.txtDetails}>Volume: {this.toDecimal(this.props.store.waterVolume)}m3</Text>
             
              <Text style={styles.txtDetails}>Cliente: {this.props.store.customerName}</Text>
              <Text style={styles.txtDetails}>Nr. do Contador: {this.props.store.meterNumber}</Text>
              <Text style={styles.txtDetails}>Regi??o: {this.props.store.customerAddress}</Text>
              <Text style={styles.txtDetails}>Bairro: {this.props.store.neighborhood}</Text>
              <Text style={styles.txtDetails}>Escal??o: {this.props.store.scale}</Text>
              <Text style={styles.txtDetails}>Tarif??rio: {this.props.store.category}</Text>
              <Text style={styles.txtDetails}>Refer??ncia: {this.props.store.transactionId}</Text>
              <View style={styles.footerLIne}>
              <Text style={styles.txtDataehora}>Data e hora: {this.props.store.dataehora}</Text>
              </View>

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
  txtDataehora:{
    fontSize:height*0.015,
    right:-width*0.3
  },
  footerLIne:{
    borderTopWidth:1,
      width:width*0.8,
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
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'row',

    
    
  },
  centerViewScrool:{
    paddingTop:height*0.02,
    marginTop:height*0.1,
    height:height,
    position:'absolute',
  },
  receip:{
   width:width-2,
   alignItems: 'center',
   marginTop:0,
   borderWidth:2,
   borderColor:'#2191ff',
   borderRadius:height*0.03,

   
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
