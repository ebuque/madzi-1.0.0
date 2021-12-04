import React, { useState } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import "react-native-gesture-handler";
import {Provider} from "mobx-react";
import { NavigationContainer } from "@react-navigation/native";

//Import  Screens
import Welcome from "./src/screens/Welcome";
import Main from "./src/screens/Main";
import PrePago from "./src/screens/PrePago";
import PrePagoDashBoard from './src/screens/PrePagoDashBoard';
import PrePagoPayment from './src/screens/PrePagoPayment';
import MPesa from "./src/screens/MPesa";
import PaymentDone from "./src/screens/PaymentDone"

//Import store
import store from "./src/store";
const DrawerNavigation = createDrawerNavigator({
  Welcome: Welcome,
  Main: Main,
  PrePago: PrePago,
  PrePagoDashBoard: PrePagoDashBoard,
  PrePagoPayment:PrePagoPayment,
  MPesa:MPesa,
  PaymentDone:PaymentDone,
  });

const StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation,
    },
    Welcome: Welcome,
    Main: Main,
    PrePago: PrePago,
    PrePagoDashBoard: PrePagoDashBoard,
    PrePagoPayment:PrePagoPayment,
    MPesa:MPesa,
    PaymentDone:PaymentDone,
  },
  {
    headerMode: "none",
  }
);

const AppContainer = createAppContainer(StackNavigation);

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return isLoadingComplete ? (
      <Provider store={store}>
      <NavigationContainer>
        
        <AppContainer />
     
        
      </NavigationContainer>
      </Provider>
    ) : (
      <AppLoading />
    );
  }
}
async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      "Segoe-Regular": require("./assets/fonts/Segoe-ui.ttf"),
      "Segoe-Bold": require("./assets/fonts/Segoe-UI-Bold.ttf"),
    }),
  ]);
}
function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
