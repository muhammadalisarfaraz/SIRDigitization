/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { useEffect } from 'react';
 import { View, ActivityIndicator } from 'react-native';
 import { 
   NavigationContainer, 
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme as NavigationDarkTheme
 } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 
 import { 
   Provider as PaperProvider, 
   DefaultTheme as PaperDefaultTheme,
   DarkTheme as PaperDarkTheme 
 } from 'react-native-paper';
 
 import { DrawerContent } from './screens/DrawerContent';
 
 import MainTabScreen from './screens/MainTabScreen';
 /*
 
 import ApiScreenB40 from './screens/ApiScreenB40';
 
 */
 
 import ApiScreenB40 from './screens/ApiScreenB40';
 import ApiScreenA40 from './screens/ApiScreenA40';



 

 import ApiScreenB40UnPlanned from './screens/ApiScreenB40UnPlanned';
 import ApiScreenA40UnPlanned from './screens/ApiScreenA40UnPlanned';
 
 import SettingsScreen from './screens/SettingsScreen';
 import BookmarkScreen from './screens/BookmarkScreen';
 
 import HomeScreen from './screens/HomeScreen';
 import ApiScreen from './screens/ApiScreen';
 import ApiScreenUnPlanned from './screens/ApiScreenUnPlanned';
 import HomeScreenUnPlanned from './screens/HomeScreenUnPlanned';
 import SupportScreen from './screens/SupportScreen';
 import { obsDiscrepanciesB40 } from "./util/obsDiscrepanciesB40";
 import SafetyHazardCase from './screens/SafetyHazardCase';
 import ConsumerDetail from './screens/ConsumerDetail';
 import Update1 from './screens/Update1';
 import SafetyHazardDetail from './screens/SafetyHazardDetail';
 import SafetyHazardEditRecordDetails from './screens/SafetyHazardEditRecordDetails';
 
 import SafetyHazardPosted from './screens/SafetyHazardPosted';

 import { AuthContext } from './components/context';
 
 import RootStackScreen from './screens/RootStackScreen';
 
 import AsyncStorage from '@react-native-community/async-storage';
 
 const Drawer = createDrawerNavigator();
 
 const App = () => {
     const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null); 
 
   const [isDarkTheme, setIsDarkTheme] = React.useState(false);
 
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
     switch( action.type ) {
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
     }
   };
 
   const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
 
   const authContext = React.useMemo(() => ({
     signIn: async(foundUser) => {
       // setUserToken('fgkj');
         setIsLoading(false);
       const userToken = String(foundUser[0].userToken);
       const userName = foundUser[0].username;
       
       try {
         await AsyncStorage.setItem('userToken', userToken);
       } catch(e) {
         console.log(e);
       }
        console.log('user token: ', userToken);
       dispatch({ type: 'LOGIN', id: userName, token: userToken });
     },
     signOut: async() => {
       // setUserToken(null);
        setIsLoading(false);
       try {
         await AsyncStorage.removeItem('userToken');
       } catch(e) {
         console.log(e);
       }
       dispatch({ type: 'LOGOUT' });
     },
     signUp: () => {
       // setUserToken('fgkj');
        setIsLoading(false);
     },
     toggleTheme: () => {
       setIsDarkTheme( isDarkTheme => !isDarkTheme );
     }
   }), []);
 
   useEffect(() => {
     setTimeout(async() => {
       setIsLoading(false);
       let userToken;
       userToken = null;
       try {
         userToken = await AsyncStorage.getItem('userToken');
       } catch(e) {
         console.log(e);
       }
      console.log('user token: ', userToken);
       dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
     }, 1000);
   }, []);
 
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
           <Drawer.Screen name="ConsumerDetail" component={ConsumerDetail} />
         
         
           <Drawer.Screen name="Safety Hazard Case" component={SafetyHazardCase} />
           <Drawer.Screen name="Saved Safety Hazard" component={Update1} />
           <Drawer.Screen name="Safety Hazards Detail" component={SafetyHazardDetail} />
           <Drawer.Screen name="Edit Safety Hazard" component={SafetyHazardEditRecordDetails} />
           <Drawer.Screen name="Posted Safety Hazards" component={SafetyHazardPosted} />
           
           <Drawer.Screen name="Ordinary Un-Planned" component={ApiScreenUnPlanned} />
           <Drawer.Screen name="Un-Planned SIR" component={HomeScreenUnPlanned} />


           
           <Drawer.Screen name="SIR Digitization Ordinary" component={ApiScreen} />
          {/* <Drawer.Screen name="Site Inspection Report" component={ApiScreenB40} />
       */}
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
 