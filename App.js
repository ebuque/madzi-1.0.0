import React, { useState } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

//Import  Screens
import Welcome from "./src/screens/Welcome";
import Main from "./src/screens/Main";
const DrawerNavigation = createDrawerNavigator({
  Welcome: Welcome,
  Main: Main
  });

const StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation,
    },
    Welcome: Welcome,
    Main: Main
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
     
      <NavigationContainer>
        
        <AppContainer />
     
        
      </NavigationContainer>
    
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
