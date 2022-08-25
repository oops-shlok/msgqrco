/* eslint-disable prettier/prettier */
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BarcodeScanner from './Screens/BarcodeScanner';
import Home from './Screens/Home';
import Info from './Screens/Info';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Qr from './Screens/Qr';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Upload from './Screens/Upload';
import Firest from './Screens/Firest';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        drawerStyle: {width: 350},
      }}
      // screenOptions={{draw}}
      // screenOptions={{
      //   drawerPosition: 'right'
      // }}
      drawerContent={props => <BarcodeScanner {...props} />}>
      <Drawer.Screen name="BottomTab" component={BottomTabs} />
    </Drawer.Navigator>
  );
};
const Homest = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Upload" component={Upload} />
    </Stack.Navigator>
  );
};

const CatalogueScreens = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Qr" component={Qr} />

    </Stack.Navigator>
  );
};
const Gscreens = ()=>{
return(
  <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Qr" component={Firest} />

    </Stack.Navigator>
)
}

const BottomTabs = () => {
  const getTabBarStyle = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    let display =
      routeName === 'BarcodeScanner' || routeName === 'Info' ? 'none' : 'flex';
    return {display};
  };

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Scan Here"
        component={CatalogueScreens}
        options={({route}) => ({
          // tabBarStyle: getTabBarStyle(route),
          title: '',
          tabBarIcon: ({size, focused, color}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  backgroundColor: focused ? '#24CE85' : 'transparent',
                  height: 50,
                  width: 130,
                }}>
                <Text style={{color: focused ? 'white' : '#24CE85'}}>
                  Scan Here
                </Text>
              </View>
            );
          },
        })}
      />
      <Tab.Screen
        name="Generator"
        component={Homest}
        options={({route}) => ({
          // tabBarStyle: getTabBarStyle(route),
          title: '',
          tabBarIcon: ({size, focused, color}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  backgroundColor: focused ? '#24CE85' : 'transparent',
                  height: 50,
                  width: 130,
                }}>
                <Text style={{color: focused ? 'white' : '#24CE85'}}>
                  Generator
                </Text>
              </View>
            );
          },
        })}
      />
       <Tab.Screen
        name="Sign"
        component={Gscreens}
        options={({route}) => ({
          // tabBarStyle: getTabBarStyle(route),
          title: '',
          tabBarIcon: ({size, focused, color}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  backgroundColor: focused ? '#24CE85' : 'transparent',
                  height: 50,
                  width: 130,
                }}>
                <Text style={{color: focused ? 'white' : '#24CE85'}}>
                  Sign
                </Text>
              </View>
            );
          },
        })}
      />
      
    </Tab.Navigator>
    
  );
};

export default function App() {
  return (
    
    
    <NavigationContainer>

      {/* <BottomTabs /> */}
      <DrawerNavigator />

      {/* 
    <Drawer.Navigator useLegacyImplementation initialRouteName="CatalogueScreens">
      <Drawer.Screen
        name="CatalogueScreens"
        options={{ drawerLabel: 'First page Option' }}
        component={CatalogueScreens}
      /> */}
      {/* </Drawer.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
