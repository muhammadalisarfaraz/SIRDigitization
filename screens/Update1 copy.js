/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
//  AsyncStorage,
  Switch,
  Image, ImageBackground,
  Picker,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
 
const base64 = require('base-64');
import Swipeable from 'react-native-swipeable';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';

/*import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
*/
// import { Dropdown } from 'react-native-material-dropdown';
// import ModalDropdown from 'react-native-modal-dropdown';
// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
import DatePicker from 'react-native-datepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import InputSpinner from 'react-native-input-spinner';

// import { Dropdown } from 'react-native-material-dropdown';
// import ModalDropdown from 'react-native-modal-dropdown';
// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
//import Swiper from 'react-native-swiper';
import {FlatList} from 'react-native-gesture-handler';

function renderRow() {
  return (
    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
      <View style={{flex: 1, alignSelf: 'stretch'}}>
        <Text>asd</Text>
      </View>{' '}
      {/* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
      <View style={{flex: 1, alignSelf: 'stretch'}} />
      <View style={{flex: 1, alignSelf: 'stretch'}} />
      <View style={{flex: 1, alignSelf: 'stretch'}} />
      <View style={{flex: 1, alignSelf: 'stretch'}} />
    </View>
  );
}

function Update1({route,navigation}) {
  const [name, setName] = useState('');
 
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFeeder, setSelectedFeeder] = useState('');
  const [selectedPQC, setSelectedPQC] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedsub, setSelectedsub] = useState('');
  const [loader, setLoader] = useState(false);
  const [tableData, settableData] = useState([]);
  const [tableData1, settableData1] = useState([]);
  const [selectedMaterial, setselectedMaterial] = useState('');
  const [selectedMaterialDetail, setselectedMaterialDetail] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const item = {};
  const [uploadingMsg, setUploadingMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [temptableData, settemptableData] = useState([]);

  const [User, setUser] = useState({});

  const tableHead = ['KE Account Number', 'Consumer', 'Contract', 'Action'];
 //const tableData = [['1', '2', '3'], ['a', 'b', 'c'], ['1', '2', '3']];
 const [refresh, setRefresh] = useState(false);
 
 const element = (data, index, navigation) => (
    <TouchableOpacity
      onPress={() => {
        navigation();
      }}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Open</Text>
      </View>
    </TouchableOpacity>
  );
   useEffect(() => {
    setLoader(true);
    
    AsyncStorage.getItem('RoshniBajiA').then(items => {
      var data=[];
      data = items ? JSON.parse(items) : {};
        console.log("data", data);
      settableData(data);
      settemptableData(data);
  
   setLoader(false);
   /*data.filter(items => {

    let data1 = data.filter(x => x.Status == 'Pending');
 
      // settableData(data1);
     //  settemptableData(data1);
    //  }
   });*/
  });
 
    
  
  }, []);
 
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

   const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={tableData}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loader ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };


  return (

    
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Pic4.jpg')}
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
          ItemSeparatorComponent={ItemSeparatorView}
          enableEmptySections={true}
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
          /*ListFooterComponent={() => {
            return (
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
            );
          }}
          */

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
                    <Image
                      style={{height: 30, width: 30}}
                      source={require('../assets/dustbin.png')}
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
                        { item.ConsumerName1==''?item.NConsumerName1:item.ConsumerName1}
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
                       {'KE Account No : \n' + item.KEaccountnumber1}
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
                      {Moment(item.SDate).format('YYYY-MM-DD')==Moment(item.SDate).format('YYYY-MM-DD') ?
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
                              source={require('../assets/edit.png')}
                            />
                           Edit Record
                         
                           </Text>
                        </View>
                      </TouchableOpacity>
                      
                      
                      
                      </View> 
                    </View> : <view></view>} 
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
      <Modal
        style={{alignItems: 'center', justifyContent: 'center'}}
        isVisible={isModalVisible}>
        <View
          style={{
            width: '80%',
            height: 250,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Text style={{color: 'red', fontSize: 24, fontWeight: 'bold'}}>
            Error
          </Text>

          <Text style={{color: 'red', fontSize: 16, textAlign: 'center'}}>
            {error ? error : ''}
          </Text>

          <Button
            title="Close"
            color="red"
            onPress={() => {
              setModalVisible(!isModalVisible);
              setError('');
            }}
          />
        </View>
      </Modal>
      <Modal
        style={{alignItems: 'center', justifyContent: 'center'}}
        isVisible={isSuccessModalVisible}>
        <View
          style={{
            width: '80%',
            height: 250,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Text style={{color: 'green', fontSize: 24, fontWeight: 'bold'}}>
            Success
          </Text>

          <Text style={{color: 'green', fontSize: 16, textAlign: 'center'}}>
            {uploadingMsg == '' ? 'Saved Successfully' : uploadingMsg}
          </Text>

          <Button
            title="Close"
            color="green"
            onPress={() => {
              setSuccessModalVisible(!isSuccessModalVisible);
              setError('');
              setTimeout(() => {
                navigation.goBack();
              }, 1000);
            }}
          />
        </View>
      </Modal>
      
      </ImageBackground>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {flex: 1, width: '100%', backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  //   container: {
  //     flex: 1,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 50,
    color: '#465881',
    marginBottom: 40,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    width: '80%',
    backgroundColor: 'lightgrey',
    // borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    width: '98%',
    paddingLeft: 10,
    height: 50,
    color: 'black',
  },
  forgot: {
    color: '#465881',
    fontSize: 11,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  loginBtn: {
    width: 135,
    backgroundColor: 'rgba(93,45,145,255)',
    // borderRadius: 25,
    height: 35,
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
     elevation: 4,
     shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 50,
    right: -1,
    bottom: 0,
    borderBottomRightRadius: 15,

  },
});

export default Update1;
