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
  ScrollView
} from "react-native";
const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);

import {observer, inject} from "mobx-react";
@inject("store")
@observer
export default class PrePagoDashBoard extends Component{
  constructor(props) {
    super(props);
    this.state = {
     code : "",
		 message : "",
    isLoading:false,
    };
  }
  componentDidMount() {}


  onMainMenuClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("Main");
  };

  PrePagoPayment = () =>{
     this.setState({isLoading: true});
     if(this.props.store.user!==""){
        this.setState({isLoading: false});
        const { navigate } = this.props.navigation;
        navigate("PrePagoPayment");
     }else{
        this.setState({isLoading: false});
        const { navigate } = this.props.navigation;
        navigate("Welcome");
     }
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
          <View style={styles.backAndProfile}>
              <View style={styles.backIcon}>
                    <TouchableOpacity onPress={this.onMainMenuClicked} style={styles.mainMenu}>
										    <Image style={styles.backArrow} source={require('../../assets/img/back.png')}/>
                        <Text style={styles.txtMainMenu}>Menu Pincipal</Text>
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
                <Text style={{color:'#2190fe', fontSize:height*0.025, fontWeight:'bold', margin:8, marginLeft:32}}>Cliente:</Text>
                <Text style={{color:'white', fontSize:height*0.030, fontWeight:'bold', marginLeft:8, marginLeft:32}}>{this.props.store.customerName}</Text>
                <Text style={{color:'#2190fe', fontSize:height*0.025, fontWeight:'bold', margin:8, marginLeft:32}} >No. Contador: {this.props.store.meterNumber}</Text>
                <Text style={{color:'#2190fe', fontSize:height*0.025, fontWeight:'bold', margin:8, marginLeft:32}} >Endereço: {this.props.store.customerAddress}</Text>
            </View>
        </View>
        <ScrollView style={styles.centerView}>
          <View style={{alignItems:'center'}}>
              <TouchableOpacity onPress={this.PrePagoPayment} style={styles.actionButton1}><Text style={styles.buttonTxt}>Comprar Água</Text></TouchableOpacity>
              <TouchableOpacity style={styles.actionButton2}><Text style={styles.buttonTxt}>Pagar Dívidas</Text></TouchableOpacity>
              <TouchableOpacity style={styles.actionButton3}><Text style={styles.buttonTxt}>Reclamações</Text></TouchableOpacity>
              <TouchableOpacity style={styles.actionButton4}><Text style={styles.buttonTxt3}>Histórico de Compras</Text></TouchableOpacity>
          </View>
        </ScrollView>
       
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
    
  },
  backAndProfile:{
    flexDirection:"row",
    height:height*0.1
  },
  clientDetails:{
    height:height*0.2,
    flexDirection:'column'
  },
  header:{
    height: height*0.3,
    justifyContent:'center',
    backgroundColor:"#00035c",
    width:width,
    borderBottomRightRadius:height*0.06,
    borderBottomLeftRadius:height*0.06,
    marginTop:height*0.05
  },
  centerView:{
    width:width*0.95,
	  top:-height*0.05,
    paddingTop:height*0.135,
    zIndex: -3,
    elevation:-3
  },
  footerLogo:{
    position: 'absolute',
    bottom:'5%',
    width:130,
    height:40,
    alignItems: 'center',
    padding:8
  },
  actionButton1:{
    backgroundColor:"#05185e",
    width:width*0.90,
    height:height*0.1,
    marginTop: -height*0.05,
    borderRadius:height*0.1/2,
    alignItems:'center',
    justifyContent:'center'
  },
    actionButton2:{
    backgroundColor:"#2190fe",
    width:width*0.90,
    height:height*0.1,
    borderRadius:height*0.1/2,
    alignItems:'center',
    justifyContent:'center',
    margin:16
  },
    actionButton3:{
    backgroundColor:"#b8c8e2",
    width:width*0.90,
    height:height*0.1,
    borderRadius:height*0.1/2,
    alignItems:'center',
    justifyContent:'center'
  },
    actionButton4:{
    backgroundColor:"#fbfbfd",
    width:width*0.90,
    height:height*0.1,
    borderWidth:1,
    borderColor:'#2190fe',
    borderRadius:height*0.1/2,
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
		top: height*0.09,
  },
  profile:{
    marginLeft:height*0.20,
    alignItems:"center",
    justifyContent:"center",
		padding:10,
		marginTop:height*0.05,
  },
  logOutTxt:{
    color:"white",
    fontSize:height*0.014,
    paddingRight:5,
    paddingLeft:5,
  },
  buttonTxt:{
    color: "white",
    fontSize: height*0.03,
  },
  buttonTxt3:{
    color: "#05185e",
    fontSize: height*0.03,
  },
  logoView:{
    width:height*0.1,
    height:height*0.1,
    alignItems:"center",
    justifyContent:"center"
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
		fontSize:height*0.025,
    color:"white"
  },
	userEmail:{
		fontSize:height*0.015,
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