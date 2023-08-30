/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useRef, useEffect, createRef} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Moment from 'moment';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {DrawerContent} from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import ApiScreenB40 from './screens/ApiScreenB40';
import ApiScreenB40Display from './screens/ApiScreenB40Display';

import ApiScreenA40 from './screens/ApiScreenA40';
import ApiScreenA40Display from './screens/ApiScreenA40Display';

import ApiScreenB40UnPlanned from './screens/ApiScreenB40UnPlanned';
import ApiScreenA40UnPlanned from './screens/ApiScreenA40UnPlanned';

import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import HomeScreen from './screens/HomeScreen';
import HomeScreenPlannedSaved from './screens/HomeScreenPlannedSaved';
import HomeScreenPlannedCompleted from './screens/HomeScreenPlannedCompleted';
import HomeScreenPlannedSummary from './screens/HomeScreenPlannedSummary';

// Ordinary Planned / UnPlanned / Display Start
import ApiScreen from './screens/ApiScreen';
import Test from './screens/Test';
import ApiScreenUnPlanned from './screens/ApiScreenUnPlanned';
import ApiScreenDisplay from './screens/ApiScreenDisplay';
// Ordinary Planned / UnPlanned / Display End

import SavedPlannedCases from './screens/SavedPlannedCases';

import HomeScreenUnPlanned from './screens/HomeScreenUnPlanned';
import HomeScreenUnPlannedSaved from './screens/HomeScreenUnPlannedSaved';
import HomeScreenUnPlannedCompleted from './screens/HomeScreenUnPlannedCompleted';
import HomeScreenUnPlannedSummary from './screens/HomeScreenUnPlannedSummary';

import SupportScreen from './screens/SupportScreen';
import SafetyHazardCase from './screens/SafetyHazardCase';
import PostSIRImages from './screens/PostSIRImages';
import Update1 from './screens/Update1';
import SafetyHazardDetail from './screens/SafetyHazardDetail';
import SafetyHazardEditRecordDetails from './screens/SafetyHazardEditRecordDetails';

import SafetyHazardPosted from './screens/SafetyHazardPosted';
import LoadingScreenforDataDownload from './screens/LoadingScreenforDataDownload';
import DownloadMasterData from './screens/DownloadMasterData';
import DeleteSIRs from './screens/DeleteSIRs';
import ChangePassword from './screens/ChangePassword';

import {AuthContext} from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';

import BackgroundGeolocation, {
  Location,
  Subscription,
} from 'react-native-background-geolocation';
import {getTimestamp} from 'react-native-reanimated/lib/reanimated2/core';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [sirdate, setSirDate] = useState('');
  const [sirtime, setSirTime] = useState('');

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
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    console.log('action.type::', action.type);
    //    console.log('prevState', prevState);
    console.log('action.token::', action.token);
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          //userToken: null, // Added by Saad on 09-Dec-2022
          userToken: action.token, // commented by Saad on 09-Dec-2022
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          //userToken: null, // Added by Saad on 09-Dec-2022
          userToken: action.token, // commented by Saad on 09-Dec-2022
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
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        // setUserToken('fgkj');
        setIsLoading(false);
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }

        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          //    console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fgkj');
        setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }),
    [],
  );

  const getAsyncData = (location, Action) => {
    console.log('Function In------------------------');
    let cDdate = new Date();
    cDdate = Moment(cDdate).format('DD-MM-YYYY');
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    setSirDate(Moment().format('DD.MM.YYYY'));
    setSirTime(Moment().format('HH:MM:SS'));

    AsyncStorage.getItem('LoginCredentials').then(credentialsitems => {
      var userCredentials = [];
      userCredentials = credentialsitems ? JSON.parse(credentialsitems) : [];
      console.log(
        '*******************LoginCredentials********************************',
      );
      console.log(userCredentials);
      AsyncStorage.getItem('SIRDigitizationLocation').then(items => {
        var data1 = [];
        data1 = items ? JSON.parse(items) : [];
        console.log(
          '************************SIRDigitizationLocation***************************',
        );
        //console.log(data1);

        data1 = [
          ...data1,
          {
            Pernr: userCredentials[0].pernr,
            Device: userCredentials[0].Imei,
            Latitude: latitude.toString(),
            Longitude: longitude.toString(),
            Erdat: Moment().format('DD.MM.YYYY'),
            Ertime: Moment().format('HH:MM:SS'),
            //CaseType: Action,
          },
        ];

        AsyncStorage.setItem('SIRDigitizationLocation', JSON.stringify(data1));
        //console.log("data1", data1);
      });
    });
  };

  useEffect(() => {
    setTimeout(async () => {
      setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        //        userToken = await AsyncStorage.getItem('userToken');  // Commented by Saad on 12-12-2022
        userToken = await AsyncStorage.getItem('userToken'); // Added by Saad on 12-12-2022
      } catch (e) {
        //  console.log(e);
      }
      //console.log('***user token: ', userToken);

      //dispatch({type: 'RETRIEVE_TOKEN', token: userToken}); // Commented by Saad on 12-12-2022
      dispatch({type: 'LOGIN', token: userToken}); // Added by Saad on 12-12-2022
    }, 3000);

    const onLocation = BackgroundGeolocation.onLocation(location => {
      console.log('location', location);
      // console.log('[onLocation]', location.coords.latitude);
      // storeData('latitude', location.coords.latitude)
      // storeData('longitude', location.coords.longitude)

      getAsyncData(location, 'onLocation');

      setLocation(JSON.stringify(location, null, 2));
    });

    const onMotionChange = BackgroundGeolocation.onMotionChange(event => {
      console.log('[onMotionChange]', event);
      // console.log("event.location", event.location.coords.latitude );
      //   console.log("event.longitude", event.location.coords.longitude );
      //  console.log("event.timestamp", event.location.timestamp );
      getAsyncData(event.location, 'onMotionChange');
    });

    const onActivityChange = BackgroundGeolocation.onActivityChange(event => {
      console.log('[onActivityChange]', event);
      //   alert(event);
    });

    const onProviderChange = BackgroundGeolocation.onProviderChange(event => {
      console.log('[onProviderChange]', event);
    });

    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 5,
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,
      startOnBoot: true,
      batchSync: false,
      autoSync: true,
    }).then(state => {
      // setEnabled(state.enabled)
      console.log(
        '- BackgroundGeolocation is configured and ready: ',
        state.enabled,
      );
      if (!state.enabled) {
        BackgroundGeolocation.start();
      }
    });
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // const Stack = createNativeStackNavigator();

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {/* <RootStackScreen />  */}
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen
                name="SupportScreen"
                component={SupportScreen}
                options={{
                  title: 'Dashboard Screen',
                  //headerStyle: {backgroundColor: 'green'},
                  //headerTintColor: '#fff',
                  //headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Drawer.Screen
                name="SIR Digitization"
                component={MainTabScreen}
              />

              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />

              <Drawer.Screen
                name="Safety Hazard Case"
                component={SafetyHazardCase}
              />
              <Drawer.Screen name="Post SIR Images" component={PostSIRImages} />
              <Drawer.Screen
                name="Saved Safety Hazard"
                component={Update1}
                options={{
                  title: 'Posted Safety Hazard',
                }}
              />
              <Drawer.Screen
                name="Safety Hazards Detail"
                component={SafetyHazardDetail}
              />
              <Drawer.Screen
                name="Edit Safety Hazard"
                component={SafetyHazardEditRecordDetails}
              />
              <Drawer.Screen
                name="Posted Safety Hazards"
                component={SafetyHazardPosted}
              />

              <Drawer.Screen
                name="LoadingScreenforDataDownload"
                component={LoadingScreenforDataDownload}
                options={{
                  title: 'Download SIR Data',
                  //headerStyle: {backgroundColor: 'green'},
                  //headerTintColor: '#fff',
                  //headerTitleStyle: {fontWeight: 'bold'},
                }}
              />

              <Drawer.Screen
                name="DownloadMasterData"
                component={DownloadMasterData}
                options={{
                  title: 'Master Data',
                }}
              />

              <Drawer.Screen
                name="DeleteSIRs"
                component={DeleteSIRs}
                options={{
                  title: 'Syncronize SIR Data',
                  //headerStyle: {backgroundColor: 'green'},
                  //headerTintColor: '#fff',
                  //headerTitleStyle: {fontWeight: 'bold'},
                }}
              />

              <Drawer.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                  title: 'Change Password',
                }}
              />

              <Drawer.Screen
                name="Un-Planned SIR"
                component={HomeScreenUnPlanned}
                options={{
                  title: 'Un-Planned SIR',
                }}
              />

              <Drawer.Screen
                name="SIR Digitization Ordinary"
                component={ApiScreen}
                options={{
                  title: 'Site Inspection Report (ORD)',
                  headerStyle: {backgroundColor: '#1565C0'},
                  headerTintColor: '#fff',
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Drawer.Screen
                name="SIR Digitization Ordinaryss"
                component={Test}
              />
              <Drawer.Screen
                name="Ordinary Un-Planned"
                component={ApiScreenUnPlanned}
              />
              <Drawer.Screen
                name="Planned Saved SIR"
                component={SavedPlannedCases}
              />

              <Drawer.Screen
                name="SIR Ordinary View"
                component={ApiScreenDisplay}
              />
              <Drawer.Screen
                name="SIR Below 40 View"
                component={ApiScreenB40Display}
              />
              <Drawer.Screen
                name="SIR Above 40 View"
                component={ApiScreenA40Display}
              />

              <Drawer.Screen
                name="Site Inspection Report"
                component={ApiScreenB40}
                options={{
                  title: 'Site Inspection Report (B40)',
                  headerStyle: {backgroundColor: '#1565C0'},
                  headerTintColor: '#fff',
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Drawer.Screen
                name="Below 40 Un-Planned"
                component={ApiScreenB40UnPlanned}
              />
              <Drawer.Screen
                name="Site Inspection Above 40"
                component={ApiScreenA40}
                options={{
                  title: 'Site Inspection Report (A40)',
                  headerStyle: {backgroundColor: '#1565C0'},
                  headerTintColor: '#fff',
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Drawer.Screen
                name="Above 40 Un-Planned"
                component={ApiScreenA40UnPlanned}
              />
              <Drawer.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  title: 'Assigned Cases Screen',
                }}
              />
              <Drawer.Screen
                name="HomeScreenPlannedSaved"
                component={HomeScreenPlannedSaved}
                options={{
                  title: 'Saved Cases Screen',
                }}
              />
              <Drawer.Screen
                name="HomeScreenPlannedCompleted"
                component={HomeScreenPlannedCompleted}
                options={{
                  title: 'Post Cases Screen',
                }}
              />
              <Drawer.Screen
                name="HomeScreenUnPlannedSaved"
                component={HomeScreenUnPlannedSaved}
                options={{
                  title: 'Saved Un-Planned SIR',
                }}
              />
              <Drawer.Screen
                name="HomeScreenUnPlannedCompleted"
                component={HomeScreenUnPlannedCompleted}
                options={{
                  title: 'Post Un-Planned SIR',
                }}
              />
              <Drawer.Screen
                name="HomeScreenPlannedSummary"
                component={HomeScreenPlannedSummary}
                options={{
                  title: 'Planned SIR Summary',
                  //headerStyle: {backgroundColor: 'green'},
                  //headerTintColor: '#fff',
                  //headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Drawer.Screen
                name="HomeScreenUnPlannedSummary"
                component={HomeScreenUnPlannedSummary}
                options={{
                  title: 'Un-Planned SIR Summary',
                  //headerStyle: {backgroundColor: 'green'},
                  //headerTintColor: '#fff',
                  //headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
