import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet, StatusBar, Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,ActivityIndicator
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
 
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeable from 'react-native-swipeable';
import { FlatList } from 'react-native-gesture-handler';
 
import axios from 'axios';

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, settableData] = useState([]);
  const item = {};
  const [temptableData, settemptableData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [user, setUser] = useState('');
  useEffect(() => {
    console.log('test');
  //  getPendingOrders();
  getApiData1();
}, []);

   

  const getApiData1 = async () => {
    console.log('get api data function');
    setLoader(true);
    try {
      let response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      setLoader(false);
   //console.log('res', response.data);
      setPendingOrders(response.data);
    } catch (error) {
      alert(error);
      setLoader(false);
     // console.log('Error ', error);
    }
  };


    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>



        <View style={{ padding: 20 }}>
      </View>
      
 
      <Animatable.View
        animation="bounceIn"
      >

        <View
          style={{

            // marginBottom:200,
            //   padding: 20 ,
            width: '100%',
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

          }}>
          <View
            style={styles.dashboad}>

            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1565C0' }}>
              500
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#1565C0' }}>Residential</Text>
          </View>

 
            <View
              style={styles.dashboad}>

              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1565C0' }}>
                200
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#1565C0' }}>Commercial</Text>
            </View>

             
              <View
                style={styles.dashboad}>

                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1565C0' }}>
                  300
                </Text>
                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#1565C0' }}>Industrial</Text>
              </View>
           
          </View> 

        <View style={{ padding: 20 }}>
        </View>


        <View style={styles.searchView}>
          <Image
            style={{ width: 26, height: 28 }}
            source={require('../assets/search.png')}
          />

          <TextInput
            onChangeText={text => searchFilterFunction(text)}
            autoCorrect={false}
            placeholder="Search SIR"
            placeholderTextColor="#1565C0"
            style={{
              // backgroundColor: '#C2C2C2',
              textAlignVertical: 'center',
              fontSize: 16,
              height: 40,
              borderRadius: 25,
              paddingHorizontal: 10,
              alignSelf: 'center',
              width: '94%',
              marginVertical: 10,
              backgroundColor: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#1565C0'
              // elevation: 4,
            }}

          />
        </View>
      </Animatable.View>

      {loader ? (
        <ActivityIndicator
        color="#1191D0"
        size="small"
      
      />
    ) : (
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: "white"//colors.background
        }]}
      >
 




        <FlatList
          style={{flex: 1, width: '100%'}}
          data={pendingOrders.length > 0 ? pendingOrders : 0}
          //data.splice(index, 1);0
          extraData={pendingOrders}
          keyExtractor={item => item.id}
 
          // onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginBottom: 2,
                  height: 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {pendingOrders ? (
                  pendingOrders.length > 0 ? (
                    <TouchableOpacity onPress={() => loadData('more')}>
                      <Text  style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>Load More</Text>
                      {loading ? (
                        <ActivityIndicator
                          color="black"
                          style={{marginLeft: 8}}
                        />
                      ) : null}
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )
                ) : (
                  <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}} >No Record to Show</Text>
                )}
              </View>
            );
          }}
          renderItem={({item, index}) => {
            // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');

            return (
              <Swipeable
                rightButtons={[
                  <TouchableOpacity
                    style={{
                      width: 80,
                      marginVertical: 17,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                    onPress={() => {
                      setLoader(true);
                      let data = tableData;
                      data.splice(index, 1);
                      // alert(index);
                      settableData(data);
                      AsyncStorage.setItem(
                        'RoshniBajiA',
                        JSON.stringify(data),
                      ).then(() => {
                        route.params.update();

                        setLoader(false);
                      });

                      // setTimeout(() => {
                      //   setLoader(false);
                      // }, 500);
                    }}>
                    { <Image
                      style={{height: 30, width: 30}}
                      source={require('../assets/dustbin.png')}
                    /> }
                    <Text>Delete</Text>
                  </TouchableOpacity>,
                ]}>
                <TouchableOpacity
                  // disabled={true}
                  onPress={() => {
                    //  alert('asdfasd');
                  
                  
                    navigation.navigate('SIR Digitization Ordinary', {
                      data: item,
                      index: index,
                      otherParam: item.filterkey,
                    });
                  }}
                  style={{
                  
                    backgroundColor: '#f0f0f1',
                    alignSelf: 'center',
                    borderRadius: 15,
                    // marginHorizontal:2,
                    marginVertical: 3,
                    width: '100%',
                    justifyContent: 'center',
                    borderWidth: 1,

                    borderColor: 'black',
                    borderBottomWidth: 0,
                    shadowColor: 'black',
                    shadowOffset: {width: 10, height: 10},
                    shadowOpacity: 0.8,
                    shadowRadius: 15,
                    elevation: 10,
                    // borderBottomColor: 'grey',
                    // borderBottomWidth: 0.5,
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View
                      style={{
                        backgroundColor: '#1565C0',
                        flexDirection: 'row',
                        // paddingHorizontal: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 15,
                        height: 34,
                        position: 'absolute',
                        borderBottomLeftRadius: 15,
                        left: -1,
                        bottom: 0,
                      }}>
                      <Text
                        style={{
                          // marginLeft: 5,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: 'white', //'#FFFFFF',
                          marginBottom: 4,
                        }}>
                        {"Consumer Name: "}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.45,
                        paddingLeft: 10,
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          marginLeft: 5,
                          color: 'black',
                          fontSize: 13,
                        }}>
                        {'KE Account No : \n' + item.id}
                      </Text>

                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 13,
                          color: 'black',
                        }}>
                        {'Contract : \n' + item.contractnumber1}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: '#0873C3',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: '#0873C3',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 0.55,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        // marginBottom: 6,
                      }}>
                      <View
                        style={{
                          // backgroundColor: '#0873C3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 90,
                          width: 140,
                          marginRight: 10,
                          borderRadius: 15,
                        }}>
                        <Text
                          style={{
                            marginLeft: 70,
                            fontSize: 13,
                            color: 'black',
                          }}>
                          {item.ActionType1}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#1565C0',
                          }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 0.55,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        // marginBottom: 6,
                      }}>
                      <View
                        style={{
                          // backgroundColor: '#0873C3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 65,
                          width: 180,
                          borderRadius: 15,
                        }}> 
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#1565C0',
                        flexDirection: 'row',
                        paddingHorizontal: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 140,
                        height: 34,
                        position: 'absolute',
                        borderTopRightRadius: 15,
                        right: -1,
                      }}>
                      <Text
                        style={{
                          // marginLeft: 5,
                          fontSize: 13,
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>
                        {'Dated : ' + item.LoginDate}
                      </Text>
                    </View>


                    <View
                      style={{
                        backgroundColor: '#1565C0',
                        flexDirection: 'row',
                        // paddingHorizontal: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 15,
                        height: 34,
                        position: 'absolute',
                        borderBottomRightRadius: 15,
                        right: -5,
                        bottom: 0,
                      }}>
                      <Text
                        style={{
                          // marginLeft: 5,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: 'white', //'#FFFFFF',
                          marginBottom: 4,
                        }}>
                       {'Consumer # : ' + item.LoginDate}
                      </Text>
                    </View>



                  </View>
                </TouchableOpacity>
              </Swipeable>
            );
          }}
        />
         </Animatable.View>
      )}

         

      
      </View>
    );
};

export default HomeScreen;

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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
