import React, { useState, useEffect, useRef } from 'react';
 
import { View, Text, Button, StyleSheet, Dimensions,
   
  TouchableOpacity,
  Image,
  Animated,
  Easing,ActivityIndicator,
  TouchableHighlight,
//  AsyncStorage,
  Switch,
  ImageBackground,
  TextInput } from 'react-native';

  import {FlatList} from 'react-native-gesture-handler';

const DetailsScreen = ({navigation}) => { 
  const [loader, setLoader] = useState(false);
  const [tableData, settableData] = useState([]);
  const [temptableData, settemptableData] = useState([]);
   
  const searchFilterFunction = text => {
    setRefresh(true);
    
    if (text == '' || text == null) {
      setRefresh(true);
      //alert('');
      settableData(temptableData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
    else {
      var arrayholder = temptableData;
      console.log(arrayholder);
      const newData = arrayholder.filter(item => {
        const itemData = `${item.KEaccountnumber1.toUpperCase()} ${item.NConsumerName1.toUpperCase()} ${item.ConsumerName1.toUpperCase()}`;

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      settableData(newData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
    // this.setState({data: newData});
   };
   useEffect(() => {
    console.log('test');
    alert('asdfsdafs');
    setLoader(true);

   
    AsyncStorage.getItem('RO').then(items => {
      var data=[];
      data = items ? JSON.parse(items) : {};
        

  
   setLoader(false);
   data.filter(items => {

    let data1 = data.filter(x => x.Status == 'Pending');

      console.log("data1:"+ data1);
       settableData(data1);
       settemptableData(data1);
    //  }
   });
  });
  
  
  }, []);
    return (
     
      
   
      
          
          <View style={styles.container}>

          <Text>Details Screen</Text>
        <Button
            title="Go to details screen...again"
            onPress={() => navigation.push("Details")}
        />
        <Button
            title="Go to home"
            onPress={() => navigation.navigate("Home")}
        />
        <Button
            title="Go back"
            onPress={() => navigation.goBack()}
        />
       
            <ImageBackground
              source={require('../assets/logo2.png')}
              style={{
                width: '100%',
                height: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}> 
                  <TextInput
                    onChangeText={text => searchFilterFunction(text)}
                    autoCorrect={false}
                    placeholder="Search"
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: '#C2C2C2',
                      textAlignVertical: 'center',
                      fontSize: 16,
                      height: 40,
                      borderRadius: 25,
                      paddingHorizontal: 20,
                      alignSelf: 'center',
                      width: '94%',
                      marginVertical: 10,
                      color:'black',
      
                      elevation: 4,
                    }}
                  />
             {loader ? (
              <ActivityIndicator />
               ) : (
              <FlatList
                style={{flex: 1, width: '100%'}}
                data = {(tableData.length)>0 ? tableData : 0 }
                //data.splice(index, 1);0
                extraData={tableData}
                keyExtractor={item => item.id}
                ListFooterComponent={() => {
                 
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginBottom: 20,
                        height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                     {tableData ? (
                  tableData.length > 0 ? (
                    <View />
                  ) : (
                    <View />
                  )
                ) : (
                  <Text>No Record to Show</Text>
                )}
                      
                     
                    </View>
                } 
                } 
                
      
                renderItem={({item, index}) => {
                  // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');
      
                  return (
                    <Swipeable
                      rightButtons={[
                        <TouchableOpacity
                          style={{
                            height: selectedsub.name == 'OMR' ? 120 : 100,
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
                              'RO',
                              JSON.stringify(data),
                            ).then(() => {
                          
      
                              route.params.update();
      
                              
                              setLoader(false);
                            });
      
                            // setTimeout(() => {
                            //   setLoader(false);
                            // }, 500);
                          }}>
                          <Image
                            style={{height: 30, width: 30}}
                            source={require('../assets/logo2.png')}
                          />
                          <Text>Delete</Text>
                        </TouchableOpacity>,
                         
                      ]}>
                      <TouchableOpacity
                        // disabled={true}
                        onPress={() => {
                        //  alert('asdfasd');
                         navigation.reset({
                          index: 0,
                          routes: [{name: 'ConsumerDetail'}],
                        })
                        navigation.navigate('ConsumerDetail', {
                          data: item,
                          index: index,
                          otherParam: item.filterkey ,
                        });
      
                         
                        }}
                        style={{
                          height: selectedsub.name == 'OMR' ? 160 : 140,
                          backgroundColor: 'white',
                          alignSelf: 'center',
                          borderRadius: 15,
                          // marginHorizontal:2,
                          marginVertical: 8,
                          width: '96%',
                          justifyContent: 'center',
                          borderWidth: 1,
      
                          borderColor: '#ddd',
                          borderBottomWidth: 0,
                          shadowColor: '#000',
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
                              backgroundColor: 'rgba(248,147,30,255)',
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
                                color: '#FFFFFF', //'#FFFFFF',
                                marginBottom: 4,
                              }}>
                               {'Consumer Name'}
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
                             {'KE Account No : \n' + "KE Account No"}
                            </Text>
                          
                            <Text
                              style={{
                                marginLeft: 5,
                                fontSize: 13,
                                color: 'black',
                              }}>
                              {'Contract : \n' + "Contract"}
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
                                marginRight:10,
                                borderRadius: 15,
                              }}>
                              <Text
                                style={{
                                  marginLeft: 70,
                                  fontSize: 13,
                                  color: 'black',
                                }}>
                                { item.ActionType1}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  color: '#0873C3',
                                }}
                              />
                            </View>
                            </View>
                            {"sdfasdfsafasdfsd"}
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
                               
                               
      
                               <View
                              style={{
                                // backgroundColor: '#0873C3',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 90,
                                width: 140,
                                marginRight:10,
                                borderRadius: 15,
                                display:'none',
                              }}>
                              <Text
                                style={{
                                  marginLeft: 70,
                                  fontSize: 13,
                                  color: 'black',
                                }}>
                                { item.filterkey}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  color: '#0873C3',
                                }}
                              />
                            </View>
      
                               <TouchableOpacity
                              // disabled={loader}
                              
                              style={styles.loginBtn}
                              onPress={() => {
                                //alert('asfasf');
                                 
                                navigation.navigate('EditRecordDetails', {
                                  data: item,
                                  index: index,
                                  otherParam: item.filterkey ,
                                });
                                 
      
                              }}>
                              <View
                                style={{
                                  height: 30,
                                  //width: '97%',
                                  borderColor: 'white',
                                 // height: 15,
                                width: 140,
                                 borderRadius: 30,
                                //  borderWidth: 2,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  
                                }}>
                                         
                                <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
                                <Image
                                    style={{height: 20, width: 20}}
                                    source={require('../assets/logo2.png')}
                                  />
                                 Edit Record
                               
                                 </Text>
                              </View>
                            </TouchableOpacity>
                            
                            
                            
                            </View> 
                          </View>  
                          <View
                            style={{
                              backgroundColor: '#5d2d91',
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
                        </View>
                      </TouchableOpacity>
                    </Swipeable>
                  );
                }} 
      
              />
            )}
            
            
            </ImageBackground>
          </View>
        );
      



    
    
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:'white',
    
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
