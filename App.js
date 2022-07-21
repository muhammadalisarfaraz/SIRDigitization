/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */



import React, { useEffect } from 'react';
import { View, ActivityIndicator, LogBox } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Moment from 'moment';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import ApiScreenB40 from './screens/ApiScreenB40';
import ApiScreenB40Display from './screens/ApiScreenB40Display'


import ApiScreenA40 from './screens/ApiScreenA40';
import ApiScreenA40Display from './screens/ApiScreenA40Display'


import ApiScreenB40UnPlanned from './screens/ApiScreenB40UnPlanned';
import ApiScreenA40UnPlanned from './screens/ApiScreenA40UnPlanned';

import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import HomeScreen from './screens/HomeScreen';
// Ordinary Planned / UnPlanned / Display Start
import ApiScreen from './screens/ApiScreen';
import ApiScreenUnPlanned from './screens/ApiScreenUnPlanned';
import ApiScreenDisplay from './screens/ApiScreenDisplay';
// Ordinary Planned / UnPlanned / Display End


import SavedPlannedCases from './screens/SavedPlannedCases';

import HomeScreenUnPlanned from './screens/HomeScreenUnPlanned';
import SupportScreen from './screens/SupportScreen';
import SafetyHazardCase from './screens/SafetyHazardCase';
import Update1 from './screens/Update1';
import SafetyHazardDetail from './screens/SafetyHazardDetail';
import SafetyHazardEditRecordDetails from './screens/SafetyHazardEditRecordDetails';

import SafetyHazardPosted from './screens/SafetyHazardPosted';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';
import BackgroundGeolocation, {
  Location,
  Subscription
} from "react-native-background-geolocation";

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [location, setLocation] = React.useState('');



  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#1565C0',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    console.log("action.type", action.type);
    console.log("prevState", prevState);
    console.log("action.token", action.token);
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
        case 'SUPPORT':
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      // setUserToken('fgkj');
      setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);


  useEffect(() => {

 

    setTimeout(async () => {
      setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      console.log('user token: ', userToken);
<<<<<<< Updated upstream
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 3000);

<<<<<<< HEAD
     const onLocation = BackgroundGeolocation.onLocation((location) => {
=======
=======
      dispatch({ type: 'SUPPORT' });
    }, 1000);
 
>>>>>>> Stashed changes



    const onLocation = BackgroundGeolocation.onLocation((location) => {
>>>>>>> 461a707569af6d45df0c335e2b57f9e2f8400eb6
      console.log('[onLocation]', location.coords.latitude);
      // storeData('latitude', location.coords.latitude)
      // storeData('longitude', location.coords.longitude)
      let cDdate = new Date();
      cDdate = Moment(cDdate).format("DD-MM-YYYY");
      // console.log("cDdate", cDdate);
      AsyncStorage.getItem('SIRDigitizationLocation')
        .then(items => {
          var data1 = [];

          data1 = items ? JSON.parse(items) : [];

          data1 = [
            ...data1,
            {

              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              EntryDate: cDdate
            }]

          AsyncStorage.setItem('SIRDigitizationLocation', JSON.stringify(data1))
          console.log("data1", data1);
        })

      setLocation(JSON.stringify(location, null, 2));
    })

    const onMotionChange = BackgroundGeolocation.onMotionChange((event) => {
      console.log('[onMotionChange]', event);
    });

    const onActivityChange = BackgroundGeolocation.onActivityChange((event) => {
      console.log('[onMotionChange]', event);
    })

    const onProviderChange = BackgroundGeolocation.onProviderChange((event) => {
      console.log('[onProviderChange]', event);
    })

    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 5,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,
      startOnBoot: true,
      batchSync: false,
      autoSync: true,
    }).then((state) => {
      // setEnabled(state.enabled)
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
    //  if (!state.enabled) {
      //  BackgroundGeolocation.start()
     // }

    });
      return () => {
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    }


<<<<<<< HEAD
   }, []);
 
//    useEffect(() => {
//     // BackgroundGeolocation.start();
// }, []);
 
   if( loginState.isLoading ) {
     return(
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large"/>
       </View>
     );
   }
   return (
     <PaperProvider theme={theme}>
     <AuthContext.Provider value={authContext}>
     <NavigationContainer theme={theme}>
       { loginState.userToken !== null ? (
         <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
           <Drawer.Screen name="SIR Digitization" component={MainTabScreen} />
           <Drawer.Screen name="SupportScreen" component={SupportScreen} />
           <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
           <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
           
         
         
           <Drawer.Screen name="Safety Hazard Case" component={SafetyHazardCase} />
           <Drawer.Screen name="Saved Safety Hazard" component={Update1} />
           <Drawer.Screen name="Safety Hazards Detail" component={SafetyHazardDetail} />
           <Drawer.Screen name="Edit Safety Hazard" component={SafetyHazardEditRecordDetails} />
           <Drawer.Screen name="Posted Safety Hazards" component={SafetyHazardPosted} />
           
           
           <Drawer.Screen name="Un-Planned SIR" component={HomeScreenUnPlanned} />
           
           
           
           <Drawer.Screen name="SIR Digitization Ordinary" component={ApiScreen} />
           <Drawer.Screen name="Ordinary Un-Planned" component={ApiScreenUnPlanned} />
           <Drawer.Screen name="Planned Saved SIR" component={SavedPlannedCases} />

           <Drawer.Screen name="SIR Ordinary View" component={ApiScreenDisplay} />
           <Drawer.Screen name="SIR Below 40 View" component={ApiScreenB40Display} />
           <Drawer.Screen name="SIR Above 40 View" component={ApiScreenA40Display} />
           
        
           <Drawer.Screen name="Site Inspection Report" component={ApiScreenB40} />
           <Drawer.Screen name="Below 40 Un-Planned" component={ApiScreenB40UnPlanned} />
           <Drawer.Screen name="Site Inspection Above 40" component={ApiScreenA40} />
           <Drawer.Screen name="Above 40 Un-Planned" component={ApiScreenA40UnPlanned} />
           <Drawer.Screen name="HomeScreen" component={HomeScreen} />
           
          </Drawer.Navigator>
       )
     :
           <RootStackScreen/>
     }
     </NavigationContainer>
     </AuthContext.Provider>
     </PaperProvider>
   );
 }
 
 export default App;
 
=======

  }, []);

  /*useEffect(() => {
    BackgroundGeolocation.start();
  }, []);
*/
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="SIR Digitization" component={MainTabScreen} />
             {/* <Drawer.Screen name="SupportScreen" component={SupportScreen} />

              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />



              <Drawer.Screen name="Safety Hazard Case" component={SafetyHazardCase} />
              <Drawer.Screen name="Saved Safety Hazard" component={Update1} />
              <Drawer.Screen name="Safety Hazards Detail" component={SafetyHazardDetail} />
              <Drawer.Screen name="Edit Safety Hazard" component={SafetyHazardEditRecordDetails} />
              <Drawer.Screen name="Posted Safety Hazards" component={SafetyHazardPosted} />


              <Drawer.Screen name="Un-Planned SIR" component={HomeScreenUnPlanned} />



              <Drawer.Screen name="SIR Digitization Ordinary" component={ApiScreen} />
              <Drawer.Screen name="Ordinary Un-Planned" component={ApiScreenUnPlanned} />
              <Drawer.Screen name="Planned Saved SIR" component={SavedPlannedCases} />

              <Drawer.Screen name="SIR Ordinary View" component={ApiScreenDisplay} />
              <Drawer.Screen name="SIR Below 40 View" component={ApiScreenB40Display} />
              <Drawer.Screen name="SIR Above 40 View" component={ApiScreenA40Display} />


              <Drawer.Screen name="Site Inspection Report" component={ApiScreenB40} />
              <Drawer.Screen name="Below 40 Un-Planned" component={ApiScreenB40UnPlanned} />
              <Drawer.Screen name="Site Inspection Above 40" component={ApiScreenA40} />
              <Drawer.Screen name="Above 40 Un-Planned" component={ApiScreenA40UnPlanned} />
              <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          */}
            </Drawer.Navigator>
           )
            :
            <RootStackScreen />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;
>>>>>>> 461a707569af6d45df0c335e2b57f9e2f8400eb6
