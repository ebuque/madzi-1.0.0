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
    navigate("PrePago");
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
                  <View style={styles.profilePhoto}><Text style={styles.initialLetterIfNoPhoto}>{this.props.store.user.match(/\b\w/g).join('')}</Text></View>
                  </View>
                  <Text style={styles.userName}>{this.props.store.user}</Text>
                  <Text style={styles.userEmail}>{this.props.store.email}</Text>
                   <TouchableOpacity onPress={this.Logout} style={styles.logOut}><Text style={styles.logOutTxt}>Terminar sessão</Text></TouchableOpacity>
              </View>
            </View>
            <View style={styles.clientDetails}>
                <Text style={{color:'#2190fe', fontSize:18, fontWeight:'bold', margin:8, marginLeft:32}}>Cliente:</Text>
                <Text style={{color:'white', fontSize:24, fontWeight:'bold', marginLeft:8, marginLeft:32}}>Olegario Mariquele</Text>
                <Text style={{color:'#2190fe', fontSize:18, fontWeight:'bold', margin:8, marginLeft:32}} >No. Contador: 0120033004444</Text>
                <Text style={{color:'#2190fe', fontSize:18, fontWeight:'bold', margin:8, marginLeft:32}} >Endereço: Av. 24 de Julho, nr. 2930</Text>
            </View>
        </View>
        <View style={styles.centerView}>
              <TouchableOpacity style={styles.actionButton1}><Text style={styles.buttonTxt}>Comprar Água</Text></TouchableOpacity>
              <TouchableOpacity style={styles.actionButton2}><Text style={styles.buttonTxt}>Pagar Dívidas</Text></TouchableOpacity>
              <TouchableOpacity style={styles.actionButton3}><Text style={styles.buttonTxt}>Reclamações</Text></TouchableOpacity>
              <TouchableOpacity style={styles.actionButton4}><Text style={styles.buttonTxt3}>Histórico de Compras</Text></TouchableOpacity>
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
  backAndProfile:{
    flexDirection:"row",
    height:'40%'
  },
  clientDetails:{
    height:'60%',
    flexDirection:'column'
  },
  header:{
    width:width -30,
    height: "45%",
    justifyContent:'center',
    backgroundColor:"#00035c",
    width:'100%',
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50
  },
  centerView:{
    width:width-30,
    height:"30%",
    alignItems: 'center',
	  top:80
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
  actionButton1:{
    backgroundColor:"#05185e",
    width:"95%",
    height:60,
    marginTop: -40,
    borderRadius:80/2,
    alignItems:'center',
    justifyContent:'center'
  },
    actionButton2:{
    backgroundColor:"#2190fe",
    width:"95%",
    height:60,
    borderRadius:80/2,
    alignItems:'center',
    justifyContent:'center',
    margin:16
  },
    actionButton3:{
    backgroundColor:"#b8c8e2",
    width:"95%",
    height:60,
    borderRadius:80/2,
    alignItems:'center',
    justifyContent:'center'
  },
    actionButton4:{
    backgroundColor:"#fbfbfd",
    width:"95%",
    borderWidth:1,
    borderColor:'#2190fe',
    height:60,
    borderRadius:80/2,
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
		top: 75,
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
  buttonTxt3:{
    color: "#05185e",
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
		fontSize:13,
    color:"white"
  },
	userEmail:{
		fontSize:12,
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
