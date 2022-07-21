import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet, StatusBar, Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert, ActivityIndicator
} from 'react-native';
import Moment from 'moment';

import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
 
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function SupportScreen({ navigation }) {

  //  const { colors } = useTheme();

  //const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, settableData] = useState([]);
  const item = {};
  const [temptableData, settemptableData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [user, setUser] = useState('');

  const [currentDate, setCurrentDate] = useState('');
  const {  supportScreen } = React.useContext(AuthContext);
  
  useEffect(() => {
    console.log('Ali');
    console.log('test');
    console.log('test');
    // console.log('test');
    //  getPendingOrders();

    var date = new Date()
    date =Moment(date).format("DD-MM-YYYY") ;
    setCurrentDate(date); 
  }, []);




  return (
    <View style={styles.container}>

     <View style={{ padding: 3 }}>
      </View>
      <View style={styles.footerMaster}>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              // flex: 0.45,
              paddingLeft: 5,
              //   flexDirection: 'row',
              //  justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Text
              style={{
                marginTop: -15,
                fontSize: 13,
                // fontWeight: 'bold',
                color: 'black', //'#FFFFFF',
                //     marginBottom: 4,
              }}>
              {'Data / Time:' + currentDate}
            </Text>

            <Text
              style={{
                marginTop: 15,
                color: 'black',
                fontSize: 13,
              }}>
              {'User Name: Syed M. Shoaib'}
            </Text>

            <Text
              style={{
                marginTop: 15,
                fontSize: 13,
                color: 'black',

              }}>
              {'IBC: North Nazimabad'}
            </Text>


          </View>
        </View>

      </View>

      <View style={{ padding: 5 }}>
      </View>

      <View style={styles.footer}>




        <View
          style={{
            right: 0,
            top: 0,
            flexDirection: 'row',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              marginRight: 10,
              fontSize: 16,
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'black'
            }}>
            Welcome
          </Text>
          <TouchableOpacity
            // onPress={this._onPress}
            //style={[styles.button, { backgroundColor: '#3636D3' }]}
            activeOpacity={1}>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 30,
            width: '32%',
            color: '#1565C0',
            flexDirection: 'row',
            //alignItems:'flex-start',
            //justifyContent: 'left',
          }}>


          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#1565C0' }}>
            {/* <Icon name="thumb-up" size={30} color="brown" />  */}

          </Text>
          <Text style={{ marginLeft: 5, fontSize: 25, fontWeight: 'bold', color: '#1565C0' }}>
            Planned SIR

          </Text>

        </View>

        <View style={{ padding: 15, marginBottom: 10 }}>
        </View>

        <View
          style={{
            height: 40,
            width: '96%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft:-5,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                // routes: [{name: 'HomeScreen'}],
                //  routes: [{name: 'SIR Digitization Ordinary'}],
                ///      routes: [{name: 'Site Inspection Report'}],  
                routes: [{ name: 'HomeScreen' }],
              });
            }}
            style={{
              //  height: 22,
              width: '23%',
              // backgroundColor: '#E349EC',
              //    alignItems: 'center',
              //  justifyContent: 'center',
            }}>
            <View
              style={{
                height: 22,
                // width: '95%',
                backgroundColor: '#E349EC',
                alignItems: 'center',
                justifyContent: 'center',
              }}>


              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                Assigned
              </Text>
            </View></TouchableOpacity>
          <View
            style={{
              height: 22,
              width: '23%',
              backgroundColor: '#944BF8',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft:2,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,



                  routes: [{ name: 'Site Inspection Report' }],
                });
              }}
              style={{
                //  height: 22,
                width: '55%',
                // backgroundColor: '#E349EC',
                //    alignItems: 'center',
                //  justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                Saved
              </Text></TouchableOpacity>
          </View>
          <View
            style={{
              height: 22,
              width: '30%',
              backgroundColor: '#3636D3',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft:2,
            }}>

            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,

                  routes: [{ name: 'Site Inspection Above 40' }],
                });
              }}
              style={{
                //  height: 22,
                // width: '90%',
                // backgroundColor: '#E349EC',
                //    alignItems: 'center',
                //  justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                Un-Attempted
              </Text></TouchableOpacity>

          </View>
          <View
            style={{
              height: 22,
              width: '30%',
              backgroundColor: '#3636D3',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft:2,
            }}>

            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,

                  routes: [{ name: 'Planned Saved SIR' }],
                });
              }}
              style={{
                //  height: 22,
               // width: '90%',
                // backgroundColor: '#E349EC',
                //    alignItems: 'center',
                //  justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                Post
              </Text></TouchableOpacity>

          </View>

        </View>
        <View style={{ padding: 15, marginBottom: 10 }}>
        </View>
        <View
          style={{
            //height: 50,
            // width: '32%',
            color: '#1565C0',
            flexDirection: 'row',
            //alignItems:'flex-start',
            //justifyContent: 'left',
          }}>


          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#1565C0' }}>
            {/*  <Icon name="thumb-down" size={30} color="brown" />   */}

          </Text>
          <Text style={{ marginLeft: 5, fontSize: 25, fontWeight: 'bold', color: '#1565C0' }}>
            Un-Planned SIR

          </Text>

        </View>
        <View style={{ padding: 15, marginBottom: 10 }}>
        </View>

        <View
          style={{
            height: 40,
            width: '96%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                // routes: [{name: 'HomeScreen'}],
                routes: [{ name: 'Un-Planned SIR' }],
              });
            }}
            style={{
              //  height: 22,
              width: '23%',
              // backgroundColor: '#E349EC',
              //    alignItems: 'center',
              //  justifyContent: 'center',
            }}>

            <View
              style={{
                height: 22,
                // width: '23%',
                backgroundColor: '#E349EC',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                Assigned
              </Text>
            </View></TouchableOpacity>
          <View
            style={{
              height: 22,
              width: '23%',
              backgroundColor: '#944BF8',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
              Saved
            </Text>
          </View>
          <View
            style={{
              height: 22,
              width: '30%',
              backgroundColor: '#3636D3',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
              Un-Attempted
            </Text>
          </View>
          <View
            style={{
              height: 22,
              width: '20%',
              backgroundColor: '#3636D3',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
              Post
            </Text>
          </View>

        </View>

        <View style={{ padding: 15, marginBottom: 10 }}></View>

        <View
          style={{
            //height: 50,
            // width: '32%',
            color: '#1565C0',
            flexDirection: 'row',
            //alignItems:'flex-start',
            //justifyContent: 'left',
          }}>


          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#1565C0' }}>
            {/*  <FontAwesome name="ambulance" size={30} color="brown" />   */}

          </Text>
          <Text style={{ marginLeft: 5, fontSize: 25, fontWeight: 'bold', color: '#1565C0' }}>
            Safety Hazard Cases

          </Text>

        </View>

        <View style={{ padding: 15, marginBottom: 10 }}>
        </View>
        <View
          style={{
            height: 40,
            width: '96%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 25
          }}>

          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                // routes: [{name: 'HomeScreen'}],
                routes: [{ name: 'Saved Safety Hazard' }],
              });
            }}
            style={{
              //  height: 22,
              width: '40%',
              // backgroundColor: '#E349EC',
              //    alignItems: 'center',
              //  justifyContent: 'center',
            }}>

            <View
              style={{
                height: 22,
                // width: '23%',
                backgroundColor: '#E349EC',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                Saved
              </Text>
            </View></TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                // routes: [{name: 'HomeScreen'}],
                routes: [{ name: 'Posted Safety Hazards' }],
              });
            }}
            style={{
              //  height: 22,
              width: '40%',
              // backgroundColor: '#E349EC',
              //    alignItems: 'center',
              //  justifyContent: 'center',
            }}>

            <View
              style={{
                height: 22,
                // width: '23%',
                backgroundColor: '#E349EC',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                Post
              </Text>
            </View></TouchableOpacity>



        </View>


        <View style={{ padding: 15, marginBottom: 10 }}></View>

      </View>





    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1565C0',

    //  alignItems: 'center', 
    //    justifyContent: 'center'
  },



  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    // top:0,
    // color: '#0D90D0',
    backgroundColor: 'white',

    //elevation: 4,
    // shadowOffset: { width: 15, height: 15 },
    //  shadowColor: 'black',
    // shadowOpacity: 0.8,
    // shadowRadius: 20,
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 80
  },

  dashboad: {
    height: 80,
    marginLeft: 10,
    width: '30%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 2,
    paddingVertical: 2,
    elevation: 10


  },

  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  footerMaster: {
    flex: .5,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,

    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    //  fontSize: 30,
    textAlign: 'center',

  },
  text_footer: {
    color: '#05375a',

  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1565C0',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    // elevation: 4,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    marginLeft: 22,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 30,
    width: '90%',

    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    width: '98%',
    paddingLeft: 10,
    height: 50,
    color: 'black',
  },
});

export default SupportScreen;
