/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  AsyncStorage,
  Switch,
  Image,
  Picker,
  ScrollView,
} from 'react-native';
import Moment from 'moment';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
import DatePicker from 'react-native-datepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import InputSpinner from 'react-native-input-spinner';
import RNFetchBlob from 'rn-fetch-blob';
const base64 = require('base-64');
import Modal from 'react-native-modal';
//import Carousel from 'react-native-snap-carousel';
//import ImageViewer from 'react-native-image-zoom-viewer';
//import * as Animatable from 'react-native-animatable';
//import Accordion from 'react-native-collapsible/Accordion';
 
// import { Dropdown } from 'react-native-material-dropdown';
// import ModalDropdown from 'react-native-modal-dropdown';
// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
import Swiper from 'react-native-swiper';
import {FlatList} from 'react-native-gesture-handler';
import { cos } from 'react-native-reanimated';
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

function New1({navigation}) {
  const [name, setName] = useState('');
  const [PMT, setPMT] = useState('');
  const [DTSData, setDTSData] = useState([]);
  const [FeederData, setFeederData] = useState([]);
  const [PQCData, setPQCData] = useState([]);
  const [ProjectsData, setProjectsData] = useState([]);
  const [SubProjectsData, setSubProjectsData] = useState([]);
  const [FilteredSubProjectsData, setFilteredSubProjectsData] = useState([]);
  const [FilteredDtsData, setFilteredDtsData] = useState([]);
  const [MaterialsData, setMaterialsData] = useState([]);
  const [MeterNoData, setMeterNoData] = useState([]);
  const [load, setLoad] = useState(false);
  const [storageLocationData, setStorageLocationData] = useState([]);
  const [TempMeterNoData, setTempMeterNoData] = useState([]);
  const [MeterNoDataShow, setMeterNoDataShow] = useState([]);
  const [MeterNoSelected, setMeterNoSelected] = useState([]);
  const [WbsData, setWbsData] = useState([]);
  const [ApproversData, setApproversData] = useState([]);
  const [userPassword, setUserPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFeeder, setSelectedFeeder] = useState('');
  const [selectedPQC, setSelectedPQC] = useState('');
  const [selectedWBS, setSelectedWBS] = useState('');
  const [selectedAprrover, setSelectedAprrover] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [loading, setLoading] = useState(false);
  const [reloadlist, setReloadList] = useState(false);
  const [selectedsub, setSelectedsub] = useState('');
  const [loader, setLoader] = useState(false);
  const [temptableData, settemptableData] = useState([], []);
  const [tableData, settableData] = useState([], []);
  const [meterData, setMeterData] = useState([], []);
  const [selectedMaterial, setselectedMaterial] = useState('');
  const [selectedMaterialDetail, setselectedMaterialDetail] = useState([]);
  const [date, setDate] = useState('');
  const [KEaccountnumber, setKEaccountnumber] = useState('');
  const [contractnumber, setcontractnumber] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [dropdownRefresh, setDropdownRefresh] = useState(false);
  const [indexer, setIndexer] = useState(0);
  const [loadingindexerTextInput, setLoadingTextInput] = useState(false);
  const [error, setError] = useState('');
  const [uploadingMsg, setUploadingMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [FilteredWbsData, setFilteredWbsData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [User, setUser] = useState({});
  const [Password, setPassword] = useState('');
  const [consumertype, setconsumertype] = useState(false);
  const [safety, setsafety] = useState(false);
  const [sarbulandi, setsarbulandi] = useState(false);
  const [theft, settheft] = useState(false);
  const [azadi, setazadi] = useState(false); 
  const [NewConnection_Conversion, setNewConnection_Conversion] = useState(false);
  const [Awareness_Advocacy, setAwareness_Advocacy] = useState(false);
   
  const [safety1, setsafety1] = useState(false);
  const [sarbulandi1, setsarbulandi1] = useState(false);
  const [theft1, settheft1] = useState(false);
  const [azadi1, setazadi1] = useState(false); 
  const [NewConnection_Conversion1, setNewConnection_Conversion1] = useState(false);
  
  const [complaint1, setcomplaint1] = useState(false);
  const [complaint2, setcomplaint2] = useState(false);
  const [complaint3, setcomplaint3] = useState(false);
  const [complaint4, setcomplaint4] = useState(false);
  const [complaint5, setcomplaint5] = useState(false);
   
  const [ReferredIBC, setReferredIBC] = useState(false);

  const item = {};
  const tableHead = ['Item', 'Description', 'Unit', 'Quantity'];
  // const tableData = [['1', '2', '3'], ['a', 'b', 'c'], ['1', '2', '3']]; setUser
    
  
  const [isLiked, setIsLiked] = useState([
      { id: 1, value: true, name: "Online Validation", selected: false },
      { id: 2, value: false, name: "Offline Validation", selected: false },
      { id: 3, value: false, name: "New Record", selected: false }
    ]);


    const onRadioBtnClick = (item) => {
      let updatedState = isLiked.map((isLikedItem) =>
        isLikedItem.id === item.id
          ? { ...isLikedItem, selected: true }
          : { ...isLikedItem, selected: false }
      );
      setIsLiked(updatedState);
    };

    const RadioButton = ({ onPress, selected, children }) => {
      return (
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity onPress={onPress} style={styles.radioButton}>
            {selected ? <View style={styles.radioButtonIcon} /> : null}
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.radioButtonText}>{children}</Text>
          </TouchableOpacity>
        </View>
      );
    };


  useEffect(() => {
    AsyncStorage.getItem('User').then(items => {
      var data = items ? JSON.parse(items) : {};
      // var datatable = [];
      setUser(data);
    });
    /*AsyncStorage.getItem('DTS').then(async (items) => {
      var data =  items ? await JSON.parse(items) : [];
      // var datatable = [];
      console.log('DTS items', items);
       setDTSData(data);
    });
*/
    AsyncStorage.getItem('DTS').then(async (items) => {
      var data =  items ? await JSON.parse(items) : [];
      // var datatable = [];
      console.log('DTS items', items);
       setDTSData(data);
    }).then(async()=>{
AsyncStorage.getItem('DTS2').then(async (items) => {
      var data =  items ? await JSON.parse(items) : [];
      // var datatable = [];
      console.log('DTS items', items);
       setDTSData([...DTSdata,...items]);
    });
});

    

    AsyncStorage.getItem('Feeder').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];

      setFeederData(data);
    });

    AsyncStorage.getItem('PQC').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];
      const unique = data.filter((thing, index) => {
        const _thing = thing.name;
        return (
          index ==
          data.findIndex(obj => {
            return obj.name == _thing;
          })
        );
      });
      console.log('PQC AAA', unique);
      setPQCData(unique);
    });

    AsyncStorage.getItem('Projects').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];

      setProjectsData(data);
    });

    AsyncStorage.getItem('SubProject').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];

      setSubProjectsData(data);
    });
    AsyncStorage.getItem('User').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];

      setUser(data);
    });
    AsyncStorage.getItem('Materials').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];

      setMaterialsData(data);
    });
    AsyncStorage.getItem('MeterNo').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];

      setMeterNoData(data);
      setTempMeterNoData(data);

      const unique = data.filter((thing, index) => {
        const _thing = thing.BLager;
        return (
          index ==
          data.findIndex(obj => {
            return obj.BLager == _thing;
          })
        );
      });
      var arr = [];
      for (var i = 0; i < unique.length; i++) {
        arr.push({
          id: i,
          name: unique[i].BLager,
        });
      }

      setStorageLocationData(arr);
      console.log('Meter AAA', data);
    });
    AsyncStorage.getItem('Wbs').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];

      setWbsData(data);
    });
    AsyncStorage.getItem('Aprrovers').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];

      setApproversData(data);
    });
  }, []);

  const selection = [
    {
      name: 'Services',
      id: 'Services',
    },
    {
      name: 'Sub-Mains',
      id: 'Sub-Mains',
    },
  ];
  const element = (data, index, tableData, selectedsub) => (
    <TextInput
      keyboardType="number-pad"
      onChangeText={text => {
        var data = tableData;
        if (selectedsub == 'OMR') {
          data[index][4] = text;
        } else {
          data[index][3] = text;
        }
        settableData(data);
        // tableData[index][3] = text
      }}
    />
  );
  const searchFilterFunction = text => {
    setRefresh(true);
    if (text == '' || text == null) {
      setRefresh(true);
      settableData(temptableData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }

    // settemptableData(tableData);
    else {
      var arrayholder = temptableData;
      const newData = arrayholder.filter(item => {
        const itemData = `${item.Matnr.toUpperCase()} ${item.Maktx.toUpperCase()}`;

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
  const elementDropdown = (data, index, tableData, selectedsub, type) => (
    <Picker
      selectedValue={data[3]}
      style={{
        height: 50,
        width: 170,
        right: -100,
        position: 'absolute',
        zIndex: 20,
        fontSize: 9,
      }}

      itemStyle={{backgroundColor: 'grey', color: 'blue', fontSize: 9}}
      onValueChange={(itemValue, itemIndex) => {
        var data = tableData;
        // console.log(selection[itemIndex].label);
        // console.log(data[index][3]);
        data[index][3] = selection[itemIndex].label;
        settableData(data);
      }}>
      {selection.map(data => {
        return <Picker.Item label={data.label} value={data.value} />;
      })}
    </Picker>
  );



  const swiper = useRef(null);
  return (
    <View style={{flex: 1, width: '100%'}}>
      <Swiper
        ref={swiper}
        style={styles.wrapper}
        dotColor={'transparent'}
        activeDotColor={'transparent'}
        keyboardShouldPersistTaps="handled"
        showsButtons={false}
        loop={false}
        // showsPagination={true}
        scrollEnabled={false}>
        <View style={styles.slide1 }>

        <Text
            style={{
              fontSize: 26,
              marginBottom: 20,
              marginTop: 20,
              // color: '#F6921E',
              // elevation: 10,
              fontWeight: 'bold',
              textAlign: 'center',
              // fontSize: 22,
             // color: '#FFFFFF',
            }}>
            Roshni Baji
          </Text>
       <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              marginTop: 20,
              // color: '#F6921E',
              // elevation: 10,
              fontWeight: 'bold',
              textAlign: 'center',
              // fontSize: 22,
             // color: '#FFFFFF',
            }}>
            Women Ambassador Programme by KE
          </Text>

          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              marginTop: 20,
              // color: '#F6921E',
              // elevation: 10,
              fontWeight: 'bold',
              textAlign: 'center',
              // fontSize: 22,
             // color: '#FFFFFF',
            }}>
            Consumer Details
          </Text>

          

          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 15}}>      
          KE Account Number
          </Text>

         
           
            
          <TextInput
            // selectedValue={selectedFeeder}
            KEaccountnumber={KEaccountnumber}
            onChangeText={text => setKEaccountnumber(text)}
            style={{
              height: 50,
              width: '76%',
              fontSize: 16,
               color: 'black',
              marginBottom: 50,
              borderBottomWidth: 0.8,
            }}
            placeholder={'Enter Text'}
            placeholderText={{fontSize: 16, color: 'grey'}}
          />  

      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 15}}>      
         Contract Number
          </Text>   

          <TextInput
            // selectedValue={selectedFeeder}
            //value={PMT}
            contractnumber={contractnumber}
            onChangeText={text => setcontractnumber(text)}
            style={{
              height: 50,
              width: '76%',
              fontSize: 16,
               color: 'black',
              marginBottom: 50,
              borderBottomWidth: 0.8,
            }}
            placeholder={'Enter Text'}
            placeholderText={{fontSize: 16, color: 'grey'}}
          /> 


          {/* <TouchableOpacity
          style={{
            width: '40%',
            height: 45,
            borderColor: '#1191D0',
            borderWidth: 0.8,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1191D0',
          }}
          onPress={() => {
            if (date) {
              if (PMT) {
                swiper.current.scrollBy(1, true);
              }
            }
          }}>
          <Text style={{fontSize: 16, color: 'white'}}>Next</Text>
        </TouchableOpacity> */}

                 



                
  {isLiked.map((item) => (
     <RadioButton
       onPress={() => onRadioBtnClick(item)}
       selected={item.selected}
       key={item.id}
     >
       {item.name}
     </RadioButton>
  ))}

          <Text style={{color: 'red'}}>{error}</Text>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // position: 'absolute',
              // bottom: 20,
            }}>
            <View />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                if (KEaccountnumber) {
                if (contractnumber) {
                  swiper.current.scrollBy(1, true);
                  setError('');
                } else {
                  setError('Enter Contract Number');
                }
              }
                  else{
                  setError('Enter KE Account Number');


                }
              }}>
              <Text
                style={{
                  color: '#1191D0',
                  fontSize: 16,
                }}>
                Next
              </Text>
              <Image
                style={{height: 28, width: 28}}
                source={require('../assets/next.png')}
              />
            </TouchableOpacity>
          </View>
        </View>


             
        <View style={styles.slide3}>
          <View style={{width: '80%'}}>         
          

        <View
          style={{
            height: 2,
            // marginVertical: 14,
            width: '100%',
            // backgroundColor: 'rgba(0,0,0,0.1)',
          }}></View>
          <ScrollView>
          <View
            style={{
              // marginTop: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>

<View
          style={{
            height: 70,
            width: '100%',
           // position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000000' }}>
            Consumer Details
          </Text>
        </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                width: '88%',
                marginTop: 20,
              }}>
              <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold' }}>Consumer Name : </Text>
              </View>
              <View style={{ flex: 0.5 }}>
                <Text>{/*{this.props.item.Matnr}*/}</Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                marginVertical: 14,
                width: '90%',
                backgroundColor: 'black',
              }}></View>
            <View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
              <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold' }}>CNIC # </Text>
              </View>
              <View style={{ flex: 0.5 }}>
                <Text>{/*{this.props.item.ClusterReg}*/}</Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                marginVertical: 14,
                width: '90%',
                backgroundColor: 'black',
              }}></View>
             
             <View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
              <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold' }}>Contact # </Text>
              </View>
              <View style={{ flex: 0.5 }}>
                <Text>{/*{this.props.item.ClusterReg}*/}</Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                marginVertical: 14,
                width: '90%',
                backgroundColor: 'black',
              }}></View>


<View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
              <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold' }}>Complete Address </Text>
              </View>
              <View style={{ flex: 0.5 }}>
                <Text>{/*{this.props.item.ClusterReg}*/}</Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                marginVertical: 14,
                width: '90%',
                backgroundColor: 'black',
              }}></View>


   

<View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
              <View style={{ flex: 0.65, alignItems: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold' }}>
                Consumer type
                </Text>
              </View>
              <View style={{ flex: 0.35, alignItems: 'flex-start' }}>
                <Switch
                  value={consumertype}
                  onValueChange={() => {
                    
                      setconsumertype(!consumertype) 
                    
                  }}></Switch>
              </View>
            </View>

        
          

            


        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>



      
      
       
             </View>
        </ScrollView>


        



            <SearchableDropdown
              onItemSelect={item => {
                //  alert(JSON.stringify(item));
                setSelectedsub('');
                setLoading(true);
                setFilteredSubProjectsData([]);
                settableData([]);
                setError('');

                setSelectedProject(item);
                var subproj = SubProjectsData.filter(obj =>
                  obj.projid.includes(item.projid),
                );
                setFilteredSubProjectsData(subproj);
                console.log('sub', subproj);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);

                if (subproj == [] || subproj == '') {
                  // setRefresh(true);

                  setSelectedsub(subproj);
                  // settableData([]);
                  console.log(subproj);
                  var arr = [];
                  // alert(JSON.stringify(MaterialsData[0]));
                  var meters = MeterNoData;
                  var datameter = [];
                  var materials = MaterialsData.filter(obj =>
                    obj.ProjId.includes(item.projid),
                  ).map((obj, index) => {
                    //   setselectedMaterialDetail([
                    //   material[index].Matnr,
                    //   material[index].Maktx,
                    //   material[index].Meins,
                    //   '1',
                    // ]);
                    // alert(index)
                    console.log(obj);
                    var number = obj.Matnr;
                    var meter = meters.filter(objj =>
                      objj.Matnr.includes(number),
                    );
                    datameter.push(...meter);
                    console.log(meter);
                    if (item.name == 'OMR') {
                      arr.push({
                        // ...obj,
                        Matnr: obj.Matnr,
                        Maktx: obj.Maktx,
                        Meins: obj.Meins,
                        Type: obj.Type,
                        GrRcpt: obj.Type == 'X' ? 'Services' : 'Sub-Mains',
                        ReqQty: '0',
                      });
                    } else {
                      arr.push({
                        Matnr: obj.Matnr,
                        Maktx: obj.Maktx,
                        Meins: obj.Meins,
                        Type: obj.Type,
                        ReqQty: '0',
                      });
                    }
                  });
                  // alert(JSON.stringify(arr[0]));
                  const unique = datameter.filter((thing, index) => {
                    const _thing = thing.BLager;
                    return (
                      index ==
                      datameter.findIndex(obj => {
                        return obj.BLager == _thing;
                      })
                    );
                  });
                  var array = [];
                  for (var i = 0; i < unique.length; i++) {
                    array.push({
                      id: i,
                      name: unique[i].BLager,
                    });
                  }

                  setStorageLocationData(array);
                  setMeterNoData(datameter);
                  setTempMeterNoData(datameter);
                  settableData(arr);
                  settemptableData(arr);

                  // setRefresh(false);
                }
              }}
              // onRemoveItem={(item, index) => {
              //   setSelectedFeeder(null);
              // }}
              selectedItems={selectedProject}
              multi={false}
              containerStyle={{padding: 5}}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: 'black',
                borderWidth: 0.8,
                // borderRadius: 5,
              }}
              itemTextStyle={{color: 'black', fontSize: 14}}
              itemsContainerStyle={{maxHeight: 140}}
              items={ProjectsData}
              // defaultIndex={2}
              resetValue={false}
              textInputProps={{
                placeholder: 'Select Project',
                underlineColorAndroid: 'transparent',
                style: {
                  padding: 12,
                  borderWidth: 0.8,
                  borderColor: '#F6921E',
                  backgroundColor: 'rgba(246,146,30,0.1)',
                  borderRadius: 4,
                  fontSize: 16,
                  // borderRadius: 5,
                },
                // onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
            {/* <Picker
          selectedValue={selectedProject}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedProject(itemValue)
          }>
          {ProjectsData.map(data => {
            return <Picker.Item label={data.name} value={data.projid} />;
          })}
        </Picker> */}
          </View>
          <View
            style={{
              height: 0.5,
              width: '70%',
              backgroundColor: 'black',
              marginVertical: 20,
            }}
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <View style={{width: '80%'}}>
              {JSON.stringify(FilteredSubProjectsData) != '[]' ? (
                <View>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Sub Project
                  </Text>
                  <SearchableDropdown
                    onItemSelect={item => {
                      //  alert(JSON.stringify(item));
                      setSelectedsub(item);
                      var arr = [];
                      var array = [];
                      // alert(JSON.stringify(MaterialsData[0]));
                      var meters = MeterNoData;
                      var datameter = [];

                      var materials = MaterialsData.filter(obj =>
                        obj.SubProj.includes(item.name),
                      ).map((obj, index) => {
                        //   setselectedMaterialDetail([
                        //   material[index].Matnr,
                        //   material[index].Maktx,
                        //   material[index].Meins,
                        //   '1',
                        // ]);
                        // alert(index)
                        console.log(obj);
                        var number = obj.Matnr;

                        var meter = meters.filter(objj =>
                          objj.Matnr.includes(number),
                        );
                        datameter.push(...meter);
                        console.log(meter);
                        if (item.name == 'OMR') {
                          arr.push({
                            Matnr: obj.Matnr,
                            Maktx: obj.Maktx,
                            Meins: obj.Meins,
                            Type: obj.Type,
                            GrRcpt: obj.Type == 'X' ? 'Services' : 'Sub-Mains',
                            ReqQty: '0',
                          });
                          var matnr = obj.Matnr;
                        } else {
                          arr.push({
                            Matnr: obj.Matnr,
                            Maktx: obj.Maktx,
                            Meins: obj.Meins,
                            Type: obj.Type,
                            ReqQty: '0',
                          });
                          var matnr = obj.Matnr;
                        }
                      });

                      // alert(JSON.stringify(arr[0]));
                      // setMeterData(array);
                      const unique = datameter.filter((thing, index) => {
                        const _thing = thing.BLager;
                        return (
                          index ==
                          datameter.findIndex(obj => {
                            return obj.BLager == _thing;
                          })
                        );
                      });
                      var array = [];
                      for (var i = 0; i < unique.length; i++) {
                        array.push({
                          id: i,
                          name: unique[i].BLager,
                        });
                      }

                      setStorageLocationData(array);
                      setMeterNoData(datameter);
                      setTempMeterNoData(datameter);
                      settableData(arr);
                      settemptableData(arr);

                      console.log('Materials ' + arr);
                    }}
                    // onRemoveItem={(item, index) => {
                    //   setSelectedFeeder(null);
                    // }}
                    selectedItems={selectedsub}
                    multi={false}
                    containerStyle={{padding: 5}}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: '#ddd',
                      borderColor: 'black',
                      borderWidth: 0.8,
                      // borderRadius: 5,
                    }}
                    itemTextStyle={{color: 'black', fontSize: 14}}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={FilteredSubProjectsData}
                    // defaultIndex={2}
                    resetValue={false}
                    textInputProps={{
                      placeholder: 'Select Project',
                      underlineColorAndroid: 'transparent',
                      style: {
                        padding: 12,
                        borderWidth: 0.8,
                        borderColor: '#F6921E',
                        backgroundColor: 'rgba(246,146,30,0.1)',
                        borderRadius: 4,
                        fontSize: 16,
                        // borderRadius: 5,
                      },
                      // onTextChange: text => alert(text)
                    }}
                    listProps={{
                      nestedScrollEnabled: true,
                    }}
                  />
                  {/* <Picker
              selectedValue={selectedsub}
              style={{height: 50, width: '100%'}}
              onValueChange={(itemValue, itemIndex) => {
                var arr = [];
                settableData(arr);

                setSelectedsub(itemValue);
                MaterialsData.filter(obj =>
                  obj.SubProj.includes(itemValue),
                ).map((obj, index) => {
                  //   setselectedMaterialDetail([
                  //   material[index].Matnr,
                  //   material[index].Maktx,
                  //   material[index].Meins,
                  //   '1',
                  // ]);
                  if (itemValue == 'OMR') {
                    arr.push([
                      MaterialsData[index].Matnr,
                      MaterialsData[index].Maktx,
                      MaterialsData[index].Meins,
                      '',
                      '0',
                    ]);
                  } else {
                    arr.push([
                      MaterialsData[index].Matnr,
                      MaterialsData[index].Maktx,
                      MaterialsData[index].Meins,
                      '0',
                    ]);
                  }
                });
                console.log(arr);
                settableData(arr);
              }}>
              {SubProjectsData.filter(obj =>
                obj.ProjId.includes(selectedProject),
              ).map(obj => {
                return <Picker.Item label={obj.SubProj} value={obj.SubProj} />;
              })}
            </Picker> */}
                </View>
              ) : (
                <View />
              )}
            </View>
          )}
          <Text style={{color: 'red', marginTop: 10}}>{error}</Text>

          {/* <TouchableOpacity
          style={{
            width: '40%',
            height: 45,
            borderColor: '#1191D0',
            borderWidth: 0.8,
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1191D0',
            // marginBottom:60
          }}
          onPress={() => {
            if (selectedProject) {
              if (selectedsub) {
                swiper.current.scrollBy(1, true);
              }
            }
          }}>
          <Text style={{fontSize: 16, color: 'white'}}>Next</Text>
        </TouchableOpacity> */}
          {/* <Text style={styles.text}>And simple</Text> */}
          <View
            style={{
              // position: 'absolute',
              // top: 20,
              backgroundColor: '#FFFFFF',
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                swiper.current.scrollBy(-1, true);
              }}>
              <Image
                style={{height: 28, width: 28}}
                source={require('../assets/previous.png')}
              />
              <Text
                style={{
                  color: '#1191D0',
                  fontSize: 16,
                }}>
                Prev
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                if (selectedProject) {
                  if (selectedsub) {
                    swiper.current.scrollBy(1, true);
                    setError('');
                  } else {
                    setError('Missing Sub Project');
                  }
                } else {
                  setError('Missing Project');
                }
              }}>
              <Text
                style={{
                  color: '#1191D0',
                  fontSize: 16,
                }}>
                Next
              </Text>
              <Image
                style={{height: 28, width: 28}}
                source={require('../assets/next.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.slide2}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            viewIsInsideTabBar={true}
            style={{
              flex: 1,
              width: '100%',
            }}>
            <View style={{width: '80%', marginTop: 30}}>
             
            <View
          style={{
            height: 70,
            width: '100%',
          
            backgroundColor: 'rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
                
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}>
              Awareness/Advocacy
          </Text>
                
                
              </View>
              <View
          style={{
            height: 1,
            marginVertical: 20,
            width: '100%',
            backgroundColor: 'black',
          }}></View>

            <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Safety{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={safety}
              onValueChange={() => {
                setsafety(!safety)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>
 
        
 <        View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Sarbulandi{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={sarbulandi}
              onValueChange={() => {
                setsarbulandi(!sarbulandi)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>
        
        <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Azadi{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={azadi}
              onValueChange={() => {
                setazadi(!azadi)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>

<View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            New Connection/Conversion{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={NewConnection_Conversion}
              onValueChange={() => {
                setNewConnection_Conversion(!NewConnection_Conversion)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>


<View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Theft{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={theft}
              onValueChange={() => {
                settheft(!theft)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>

          
<View
          style={{
            height: 70,
            width: '100%',          
            backgroundColor: 'rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>                
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}>
              Development
          </Text>
                
                
              </View>
              <View
          style={{
            height: 1,
            marginVertical: 20,
            width: '100%',
            backgroundColor: 'black',
          }}></View>

            <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Safety{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={safety1}
              onValueChange={() => {
                setsafety1(!safety1)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>
 
        
 <        View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Sarbulandi{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={sarbulandi1}
              onValueChange={() => {
                setsarbulandi1(!sarbulandi1)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>
        
        <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Azadi{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={azadi1}
              onValueChange={() => {
                setazadi1(!azadi1)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>

<View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            New Connection/Conversion{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={NewConnection_Conversion1}
              onValueChange={() => {
                setNewConnection_Conversion1(!NewConnection_Conversion1)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>


<View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Theft{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={theft1}
              onValueChange={() => {
                settheft1(!theft1)
              }}></Switch>
          </View>
        </View>



        <View
          style={{
            height: 70,
            width: '100%',          
            backgroundColor: 'rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>                
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}>
              Complaints
          </Text>
                
                
              </View>
              <View
          style={{
            height: 1,
            marginVertical: 20,
            width: '100%',
            backgroundColor: 'black',
          }}></View>

            <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Complaint 1{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={complaint1}
              onValueChange={() => {
                setcomplaint1(!complaint1)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>
 
 <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Complaint 2{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={complaint2}
              onValueChange={() => {
                setcomplaint2(!complaint2)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>

<View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Complaint 3{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={complaint3}
              onValueChange={() => {
                setcomplaint3(!complaint3)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>


<View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Complaint 4{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={complaint4}
              onValueChange={() => {
                setcomplaint4(!complaint4)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>

<View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Complaint 5{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={complaint5}
              onValueChange={() => {
                setcomplaint5(!complaint5)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>


        <View
          style={{
            height: 70,
            width: '100%',          
            backgroundColor: 'rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>                
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}>
              Referral
          </Text>
                
                
              </View>
              <View
          style={{
            height: 1,
            marginVertical: 20,
            width: '100%',
            backgroundColor: 'black',
          }}></View>

            <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Referred IBC{' '}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
            <Switch
             // disabled={this.state.SwitchDisabled}
              value={ReferredIBC}
              onValueChange={() => {
                setReferredIBC(!ReferredIBC)
              }}></Switch>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
          }}></View>

 
<View
          style={{
            height: 70,
            width: '100%',          
            backgroundColor: 'rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>                
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}>
              Photos of Surveyed Meter
          </Text>
                
                
              </View>
              <View
          style={{
            height: 1,
            marginVertical: 20,
            width: '100%',
            backgroundColor: 'black',
          }}></View>


<View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
            Remarks{' '}
            </Text>
          </View>


<View
            style={{
              flexDirection: 'row',
              flex: 1,
              width: '88%',
              alignSelf: 'center',
            }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              {/* <Text style={{fontWeight: 'bold'}}>Any comment (if any): </Text>
          </View>
          <View
            style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}> */}
              <TextInput
                multiline={true}
                placeholder={'Any comment (if required)'}
                style={{
                  height: 150,
                  width: '100%',
                  borderWidth: 0.75,
                  textAlign: 'left',
                  textAlignVertical: 'top',
                }}></TextInput>
            </View>
          </View></View>
          <View
            style={{
              height: 1,
              marginVertical: 14,
              width: '90%',
              backgroundColor: 'black',
              alignSelf: 'center',
            }}></View>


<View
              style={{ height: 80, width: 1, backgroundColor: 'black' }}></View>

              <SearchableDropdown
                // onItemSelect={item => {
                //   //  alert(JSON.stringify(item));
                //   setSelectedFeeder(item);
                // }}
                onItemSelect={item => {
                  //  alert(JSON.stringify(item));
                  setSelectedValue('');
                  // setLoading(true);
                  // setFilteredSubProjectsData([]);
                  // settableData([]);
                  setError('');

                  // setSelectedProject(item);
                  setSelectedFeeder(item);
                  console.log('item',item);
                  console.log('item.feeder_id',item.feeder_id);
                  console.log('DTSData',DTSData);

                  let dts = DTSData.filter(obj =>
                    obj.feeder_id.includes(item.feeder_id),
                  );
                  var acc_proj = WbsData.filter(obj =>
                    obj.projid.includes(selectedProject.projid),
                  );
                  var acc_subproj = acc_proj.filter(obj =>
                    obj.spcode.includes(selectedsub.spcode),
                  );
                  var acc_feeder = acc_proj.filter(obj =>
                    obj.feeder_id.includes(item.feeder_id),
                  );
                  const uniqueArray = acc_feeder.filter((item, index) => {
                    const _thing = item.name;
                    return (
                      index ===
                      acc_feeder.findIndex(obj => {
                        return obj.name === _thing;
                      })
                    );
                  });
                  setFilteredWbsData(uniqueArray);
                  
                  setFilteredDtsData(dts);
                  console.log('dts', dts);
                }}
                // onRemoveItem={(item, index) => {
                //   setSelectedFeeder(null);
                // }}
                selectedItems={selectedFeeder}
                multi={false}
                containerStyle={{padding: 5}}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: 'black',
                  borderWidth: 0.8,

                  // borderRadius: 5,
                }}
                itemTextStyle={{color: 'black', fontSize: 14}}
                itemsContainerStyle={{maxHeight: 140}}
                items={FeederData}
                // defaultIndex={2}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Select Feeder',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 0.8,
                    borderColor: '#F6921E',
                    backgroundColor: 'rgba(246,146,30,0.1)',
                    borderRadius: 4,
                    fontSize: 16,
                    // borderRadius: 5,
                  },
                  // onTextChange: text => alert(text)
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
              {/* <Picker
          selectedValue={selectedFeeder}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedFeeder(itemValue)
          }>
          {FeederData.map(data => {
            return <Picker.Item label={data.name} value={data.name} />;
          })}
        </Picker> */}
            </View>
            <View
              style={{
                height: 0.5,
                width: '70%',
                backgroundColor: 'black',
                marginVertical: 20,
              }}
            />
            <View style={{width: '80%'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>DTS</Text>
              <SearchableDropdown
                onItemSelect={item => {
                    console.log(JSON.stringify(item));
                  setSelectedValue(item);
                }}
                // onRemoveItem={(item, index) => {
                //   setSelectedFeeder(null);
                // }}
                selectedItems={selectedValue}
                multi={false}
                containerStyle={{padding: 5}}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: 'black',
                  borderWidth: 0.8,
                  // borderRadius: 5,
                }}
                itemTextStyle={{color: 'black', fontSize: 14}}
                itemsContainerStyle={{maxHeight: 140}}
                items={FilteredDtsData}
                // defaultIndex={2}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Select DTS',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 0.8,
                    borderColor: '#F6921E',
                    backgroundColor: 'rgba(246,146,30,0.1)',
                    borderRadius: 4,
                    fontSize: 16,
                    // borderRadius: 5,
                  },
                  // onTextChange: text => alert(text)
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
              {/* <Picker
            selectedValue={selectedValue}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            {DTSData.map(data => {
              return <Picker.Item label={data.Tplnr} value={data.Tplnr} />;
            })}
          </Picker> */}
            </View>
            <View
              style={{
                height: 0.5,
                width: '70%',
                backgroundColor: 'black',
                marginVertical: 20,
              }}
            />
            <View style={{width: '80%'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>PQC</Text>
              <SearchableDropdown
                onItemSelect={item => {
                  //  alert(JSON.stringify(item));
                  console.log(item);
                  setSelectedPQC(item);
                }}
                // onRemoveItem={(item, index) => {
                //   setSelectedFeeder(null);
                // }}
                selectedItems={selectedPQC}
                multi={false}
                containerStyle={{padding: 5}}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: 'black',
                  borderWidth: 0.8,
                  // borderRadius: 5,
                }}
                itemTextStyle={{color: 'black', fontSize: 14}}
                itemsContainerStyle={{maxHeight: 140}}
                items={PQCData}
                // defaultIndex={2}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Select PQC',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 0.8,
                    borderColor: '#F6921E',
                    backgroundColor: 'rgba(246,146,30,0.1)',
                    borderRadius: 4,
                    fontSize: 16,
                    // borderRadius: 5,
                  },
                  // onTextChange: text => alert(text)
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
              {/* <Picker
            selectedValue={selectedPQC}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedPQC(itemValue)}>
            {PQCData.map(data => {
              return <Picker.Item label={data.Name} value={data.Name} />;
            })}
          </Picker> */}
            </View>
            <View
              style={{
                height: 0.5,
                width: '70%',
                backgroundColor: 'black',
                marginVertical: 10,
              }}
            />
            <View style={{width: '80%'}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>WBS</Text>
              <SearchableDropdown
                onItemSelect={item => {
                  //  alert(JSON.stringify(item));
                  console.log(item);
                  setSelectedWBS(item);
                }}
                // onRemoveItem={(item, index) => {
                //   setSelectedFeeder(null);
                // }}
                selectedItems={selectedWBS}
                multi={false}
                containerStyle={{padding: 5}}
                itemStyle={{
                  padding: 6,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: 'black',
                  borderWidth: 0.8,
                  // borderRadius: 5,
                }}
                itemTextStyle={{color: 'black', fontSize: 12}}
                itemsContainerStyle={{maxHeight: 100}}
                items={FilteredWbsData}
                // defaultIndex={2}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Select WBS',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 6,
                    borderWidth: 0.8,
                    borderColor: '#F6921E',
                    backgroundColor: 'rgba(246,146,30,0.1)',
                    borderRadius: 4,
                    fontSize: 13,
                    // borderRadius: 5,
                  },
                  // onTextChange: text => alert(text)
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
              {/* <Picker
            selectedValue={selectedPQC}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedPQC(itemValue)}>
            {PQCData.map(data => {
              return <Picker.Item label={data.Name} value={data.Name} />;
            })}
          </Picker> */}
            </View>
            {/* <TouchableOpacity
          onPress={() => {
            swiper.current.scrollBy(1, true);
          }}>
          <Text>Next</Text>
        </TouchableOpacity> */}
            <Text style={{color: 'red', marginTop: 10}}>{error}</Text>

            {/* <TouchableOpacity
            style={{
              width: '40%',
              height: 45,
              borderColor: '#1191D0',
              borderWidth: 0.8,
              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1191D0',
              // marginBottom:60
            }}
            onPress={() => {
              if (selectedFeeder) {
                if (selectedValue) {
                  if (selectedPQC) {
                    swiper.current.scrollBy(1, true);
                  }
                }
              }
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>Next</Text>
          </TouchableOpacity> */}

            <View
              style={{
                marginTop: 20,
                // marginBottom: 20,
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  swiper.current.scrollBy(-1, true);
                }}>
                <Image
                  style={{height: 28, width: 28}}
                  source={require('../assets/previous.png')}
                />
                <Text
                  style={{
                    color: '#1191D0',
                    fontSize: 16,
                  }}>
                  Prev
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setRefresh(true);
                  setReloadList(true);
                  if (selectedFeeder) {
                    if (selectedValue) {
                      if (selectedPQC) {
                        if (selectedWBS) {
                          swiper.current.scrollBy(1, true);
                          setError('');
                        } else {
                          setError('Missing WBS');
                        }
                      } else {
                        setError('Missing PQC');
                      }
                    } else {
                      setError('Missing DTS');
                    }
                  } else {
                    setError('Missing Feeder');
                  }
                  setTimeout(() => {
                    setRefresh(false);
                    setReloadList(false);
                  }, 1000);
                }}>
                <Text
                  style={{
                    color: '#1191D0',
                    fontSize: 16,
                  }}>
                  Next
                </Text>
                <Image
                  style={{height: 28, width: 28}}
                  source={require('../assets/next.png')}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.slide3}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{flex: 1, width: '100%'}}>
            <TextInput
              onChangeText={text => searchFilterFunction(text)}
              autoCorrect={false}
              placeholder="Search"
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
                elevation: 4,
              }}
            />
            {refresh ? (
              <ActivityIndicator />
            ) : (
              <View style={{flex: 1, width: '100%'}}>
                <FlatList
                  style={{flex: 1, width: '100%'}}
                  data={tableData}
                  extraData={tableData}
                  keyExtractor={item => item.id}
                  // ListHeaderComponent={() => {
                  //   return (
                  //     <View
                  //       style={{
                  //         marginTop: 40,
                  //         width: '90%',
                  //         alignSelf:'center',
                  //         flexDirection: 'row',
                  //         alignItems: 'center',
                  //         justifyContent: 'space-between',
                  //       }}>
                  //       <TouchableOpacity
                  //         style={{
                  //           flexDirection: 'row',
                  //           alignItems: 'center',
                  //           justifyContent: 'center',
                  //         }}
                  //         onPress={() => {
                  //           swiper.current.scrollBy(-1, true);
                  //         }}>
                  //         <Image
                  //           style={{height: 28, width: 28}}
                  //           source={require('../assets/previous.png')}
                  //         />
                  //         <Text
                  //           style={{
                  //             color: '#1191D0',
                  //             fontSize: 16,
                  //           }}>
                  //           Prev
                  //         </Text>
                  //       </TouchableOpacity>
                  //       <View />
                  //     </View>
                  //   );
                  // }}
                  // ListFooterComponent={() => {
                  //   return (
                  //     <View
                  //       style={{
                  //         width: '90%',
                  //         alignSelf: 'center',
                  //         marginBottom: 20,
                  //         height: 60,
                  //         flexDirection: 'row',
                  //         alignItems: 'center',
                  //         justifyContent: 'space-between',
                  //       }}>
                  //       <TouchableOpacity
                  //         style={{
                  //           width: '45%',
                  //           height: 45,
                  //           borderColor: '#1191D0',
                  //           borderWidth: 0.8,
                  //           marginTop: 15,
                  //           alignItems: 'center',
                  //           justifyContent: 'center',
                  //           backgroundColor: '#1191D0',
                  //           // marginBottom:60
                  //         }}
                  //         onPress={() => {
                  //           setError('');
                  //           setPassword('');
                  //           setAuthModalVisible(true);
                  //         }}>
                  //         <Text style={{fontSize: 16, color: 'white'}}>
                  //           Save
                  //         </Text>
                  //       </TouchableOpacity>
                  //       <TouchableOpacity
                  //         style={{
                  //           width: '45%',
                  //           height: 45,
                  //           borderColor: '#1191D0',
                  //           borderWidth: 0.8,
                  //           marginTop: 15,
                  //           alignItems: 'center',
                  //           justifyContent: 'center',
                  //           backgroundColor: '#1191D0',
                  //           // marginBottom:60
                  //         }}
                  //         onPress={() => {
                  //           // console.log(
                  //           //   JSON.stringify({
                  //           //     d: {
                  //           //       LoggedId: User.ImUser,
                  //           //       DtsId: selectedValue.dts_id,
                  //           //       FdrId: selectedValue.feeder_id,
                  //           //       Pqc: selectedPQC.v_id,
                  //           //       PqcName: selectedPQC.name,
                  //           //       ProjId: selectedProject.projid,
                  //           //       ProjectName: selectedProject.name,
                  //           //       SubProj: 'P03',
                  //           //       AeName: User.ImUser,
                  //           //       FdrName: selectedValue.feeder_desc,
                  //           //       PmtName: PMT,
                  //           //       CaseId: '1234',
                  //           //       GridName: 'Test Grid',
                  //           //       SDate: '20201202',
                  //           //       CDate: '20201202',
                  //           //       Return: '',
                  //           //       WO_MATERIALSSet: tableData,
                  //           //       WO_MAPPINGSSet: [],
                  //           //     },
                  //           //   }),
                  //           // );
                  //           setPinModalVisible(true);
                  //         }}>
                  //         <Text style={{fontSize: 16, color: 'white'}}>
                  //           Upload
                  //         </Text>
                  //       </TouchableOpacity>
                  //     </View>
                  //   );
                  // }
                  // }
                  renderItem={({item, index, separators}) => {
                    // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');

                    return (
                      <View
                        style={{
                          height: selectedsub.name == 'OMR' ? 140 : 100,
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
                              flex: 0.55,
                              paddingLeft: 10,
                              justifyContent: 'space-between',
                              paddingVertical: 10,
                            }}>
                            <Text
                              style={{
                                marginLeft: 5,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#0A8FCF',
                                marginBottom: 4,
                              }}>
                              {'Item : ' + item.Matnr}
                            </Text>
                            <Text
                              style={{
                                marginLeft: 5,
                                fontSize: 13,
                              }}>
                              {'Desc : \n' + item.Maktx}
                            </Text>

                            {loader ? (
                              indexer == index ? (
                                <ActivityIndicator
                                  style={{alignSelf: 'flex-start'}}
                                />
                              ) : item.Type == 'X' ? (
                                <View style={{flexDirection: 'row'}}>
                                  <Switch
                                    value={
                                      tableData[index].GrRcpt == 'Services'
                                        ? true
                                        : false
                                    }
                                    onValueChange={value => {
                                      // alert(tableData[index].services)
                                      setIndexer(index);
                                      setLoader(true);
                                      var data = tableData;
                                      data[index].GrRcpt =
                                        value == true
                                          ? 'Services'
                                          : 'Sub-Mains';
                                      settableData(data);
                                      setTimeout(() => {
                                        setLoader(false);
                                      }, 100);
                                      // useEffect() 188991  5711  rehan
                                    }}
                                    // onChange={() => {

                                    // }}
                                    style={{alignSelf: 'flex-start'}}
                                  />
                                  <Text
                                    style={{
                                      color:
                                        tableData[index].GrRcpt == 'Sub-Mains'
                                          ? 'red'
                                          : 'green',
                                    }}>
                                    {tableData[index].GrRcpt == 'Services'
                                      ? 'Services'
                                      : 'Sub-Mains'}
                                  </Text>
                                </View>
                              ) : (
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#0A8FCF',
                                  }}
                                />
                              )
                            ) : selectedsub.name == 'OMR' ? (
                              item.Type == 'X' ? (
                                <View style={{flexDirection: 'row'}}>
                                  <Switch
                                    value={
                                      tableData[index].GrRcpt == 'Services'
                                        ? true
                                        : false
                                    }
                                    onValueChange={value => {
                                      // alert(tableData[index].services)
                                      setIndexer(index);
                                      setLoader(true);
                                      var data = tableData;
                                      data[index].GrRcpt =
                                        value == true
                                          ? 'Services'
                                          : 'Sub-Mains';
                                      settableData(data);
                                      setTimeout(() => {
                                        setLoader(false);
                                      }, 100);
                                      // useEffect() 188991  5711  rehan
                                    }}
                                    // onChange={() => {

                                    // }}
                                    style={{alignSelf: 'flex-start'}}
                                  />
                                  <Text
                                    style={{
                                      color:
                                        tableData[index].GrRcpt == 'Sub-Mains'
                                          ? 'red'
                                          : 'green',
                                    }}>
                                    {tableData[index].GrRcpt == 'Services'
                                      ? 'Services'
                                      : 'Sub-Mains'}
                                  </Text>
                                </View>
                              ) : (
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#0A8FCF',
                                  }}
                                />
                              )
                            ) : (
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  color: '#0A8FCF',
                                }}
                              />
                            )}
                          </View>
                          <View
                            style={{
                              flex: 0.45,
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              // marginBottom: 6,
                            }}>
                            <View
                              style={{
                                // backgroundColor: '#0A8FCF',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 60,
                                width: 140,
                                borderRadius: 15,
                              }}>
                              <InputSpinner
                                max={9999}
                                min={0}
                                step={1}
                                height={40}
                                width={120}
                                color={'#0A8FCF'}
                                // colorMax={'#f04048'}
                                // colorMin={'#40c5f4'}
                                value={item.ReqQty}
                                onChange={num => {
                                  // console.log(num);
                                  setRefresh(true);
                                  var data = tableData;
                                  // settableData([]);
                                  data[index].ReqQty = num.toString();
                                  // alert(JSON.stringify(data));

                                  settableData(data);
                                  setRefresh(false);
                                }}
                                onDecrease={() => {
                                  setReloadList(true);
                                  var data = MeterNoDataShow;
                                  data.pop();
                                  setMeterNoDataShow(data);
                                  setTimeout(() => {
                                    setReloadList(false);
                                  }, 1000);
                                }}
                                onIncrease={() => {
                                  setReloadList(true);

                                  var array = MeterNoDataShow;
                                  var materials = MeterNoData.filter(
                                    objj => objj.Matnr.includes(item.Matnr),
                                    //   ,
                                    // ).map((objj, index) => {
                                    //   array.push({
                                    //     Consumer: '',
                                    //     Matnr: objj.Matnr,
                                    //     MeterNo: '',
                                    //   });
                                    // }
                                  );
                                  console.log(materials);
                                  if (materials.length > 0) {
                                    array.push({
                                      Consumer: '',
                                      Matnr: item.Matnr,
                                      MeterNo: '',
                                    });
                                  }
                                  console.log(array);
                                  setMeterNoDataShow(array);
                                  setTimeout(() => {
                                    setReloadList(false);
                                  }, 1000);
                                }}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              backgroundColor: 'rgba(0,0,0,0.1)',
                              flexDirection: 'row',
                              paddingHorizontal: 6,
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 80,
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
                                color: 'rgba(0,0,0,0.5)',
                              }}>
                              {'Unit : ' + item.Meins}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            )}

            {MeterNoDataShow.length != 0 ? (
              <Text style={{fontSize: 18, marginLeft: 10, fontWeight: 'bold'}}>
                Meter Number
              </Text>
            ) : (
              <View />
            )}
            {reloadlist ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="handled"
                data={MeterNoDataShow}
                extraData={MeterNoDataShow}
                keyExtractor={item => item.id}
                // ListHeaderComponent={() => {
                //   return (
                //     <View
                //       style={{
                //         marginTop: 40,
                //         width: '90%',
                //         alignSelf:'center',
                //         flexDirection: 'row',
                //         alignItems: 'center',
                //         justifyContent: 'space-between',
                //       }}>
                //       <TouchableOpacity
                //         style={{
                //           flexDirection: 'row',
                //           alignItems: 'center',
                //           justifyContent: 'center',
                //         }}
                //         onPress={() => {
                //           swiper.current.scrollBy(-1, true);
                //         }}>
                //         <Image
                //           style={{height: 28, width: 28}}
                //           source={require('../assets/previous.png')}
                //         />
                //         <Text
                //           style={{
                //             color: '#1191D0',
                //             fontSize: 16,
                //           }}>
                //           Prev
                //         </Text>
                //       </TouchableOpacity>
                //       <View />
                //     </View>
                //   );
                // }}
                ListFooterComponent={() => {
                  return (
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginBottom: 20,
                        height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={{
                          width: '45%',
                          height: 45,
                          borderColor: '#1191D0',
                          borderWidth: 0.8,
                          marginTop: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#1191D0',
                          // marginBottom:60
                        }}
                        onPress={() => {
                          setError('');
                          setPassword('');
                          setAuthModalVisible(true);
                        }}>
                        <Text style={{fontSize: 16, color: 'white'}}>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: '45%',
                          height: 45,
                          borderColor: '#1191D0',
                          borderWidth: 0.8,
                          marginTop: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#1191D0',
                          // marginBottom:60
                        }}
                        onPress={() => {
                          // console.log(
                          //   JSON.stringify({
                          //     d: {
                          //       LoggedId: User.ImUser,
                          //       DtsId: selectedValue.dts_id,
                          //       FdrId: selectedValue.feeder_id,
                          //       Pqc: selectedPQC.v_id,
                          //       PqcName: selectedPQC.name,
                          //       ProjId: selectedProject.projid,
                          //       ProjectName: selectedProject.name,
                          //       SubProj: 'P03',
                          //       AeName: User.ImUser,
                          //       FdrName: selectedValue.feeder_desc,
                          //       PmtName: PMT,
                          //       CaseId: '1234',
                          //       GridName: 'Test Grid',
                          //       SDate: '20201202',
                          //       CDate: '20201202',
                          //       Return: '',
                          //       WO_MATERIALSSet: tableData,
                          //       WO_MAPPINGSSet: [],
                          //     },
                          //   }),
                          // );
                          setPinModalVisible(true);
                        }}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Send To PQC
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                renderItem={({item, index, separators}) => {
                  // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');

                  return (
                    <View
                      style={{
                        height: 180,
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
                            flex: 0.55,
                            paddingLeft: 10,
                            justifyContent: 'space-between',
                            paddingVertical: 10,
                          }}>
                          <Text
                            style={{
                              marginLeft: 5,
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#0A8FCF',
                              marginBottom: 4,
                            }}>
                            {'Item : ' + item.Matnr}
                          </Text>
                          <SearchableDropdown
                            keyboardShouldPersistTaps="handled"
                            onItemSelect={items => {
                              //  alert(JSON.stringify(item));
                              // console.log(indexx);
                              // setReloadList(true);
                              // setIndexer(indexx);
                              // setLoader(true);
                              // var data = MeterNoDataShow;
                              // // settableData([]);
                              // data[index].MeterNo = items.name.toString();
                              // setMeterNoDataShow(data);
                              // console.log(data);
                              // // setTimeout(() => {
                              //   setReloadList(false);
                              // }, 1000);
                              // setSelectedWBS(item);
                            }}
                            // onRemoveItem={(item, index) => {
                            //   setSelectedFeeder(null);
                            // }}
                            // selectedItems={storageLocationData[index]}
                            multi={false}
                            containerStyle={{padding: 5, width: 120}}
                            itemStyle={{
                              padding: 6,
                              marginTop: 2,
                              backgroundColor: '#ddd',
                              borderColor: 'black',
                              borderWidth: 0.8,
                              // borderRadius: 5,
                            }}
                            itemTextStyle={{color: 'black', fontSize: 12}}
                            itemsContainerStyle={{maxHeight: 100}}
                            items={storageLocationData}
                            // defaultIndex={2}
                            resetValue={false}
                            textInputProps={{
                              placeholder: 'S Location',
                              style: {
                                padding: 6,
                                borderWidth: 0.8,
                                borderColor: '#F6921E',
                                backgroundColor: 'rgba(246,146,30,0.1)',
                                borderRadius: 4,
                                fontSize: 13,
                                // borderRadius: 5,
                              },
                              // onTextChange: text => alert(text)
                            }}
                            listProps={{
                              nestedScrollEnabled: true,
                            }}
                          />
                          <TextInput
                            placeholder={
                              MeterNoDataShow[index].Consumer == ''
                                ? 'Consumer No'
                                : MeterNoDataShow[index].Consumer
                            }
                            onChangeText={num => {
                              var data = MeterNoDataShow;
                              // settableData([]);
                              data[index].Consumer = num.toLocaleLowerCase();
                              setMeterNoDataShow(data);

                              // alert(JSON.stringify(data));
                              // var array = MeterNoDataShow;
                            }}
                            onSubmitEditing={event => {
                              setReloadList(true);
                              setLoadingTextInput(true);
                              var data = MeterNoDataShow;
                              // settableData([]);
                              data[
                                index
                              ].Consumer = event.nativeEvent.text.toLocaleUpperCase();
                              setMeterNoDataShow(data);
                              setTimeout(() => {
                                setLoadingTextInput(false);
                                setReloadList(false);
                              }, 1000);
                            }}
                            placeholderTextColor={
                              MeterNoDataShow[index].Consumer == ''
                                ? 'rgba(0,0,0,0.2)'
                                : 'black'
                            }
                            // placeholder={}
                            // value={MeterNoDataShow[index].Consumer}
                            // onSubmitEditing={text => {
                            //   // setRefresh(true);
                            //   // var data = meterData;
                            //   // settableData([]);
                            //   // data[
                            //   //   index
                            //   // ].Consumer = text.toString().toLocaleUpperCase();
                            //   // alert(JSON.stringify(data));
                            //   // settableData(data);
                            //   // setRefresh(false);
                            // }}
                            style={{borderBottomWidth: 1, width: 100}}
                          />
                        </View>
                        <View
                          style={{
                            flex: 0.45,
                            position: 'absolute',
                            right: 0,
                            // top: 60,
                            bottom: 40,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            // marginBottom: 6,
                          }}>
                            {load?<ActivityIndicator></ActivityIndicator>:                          <View
                            style={{
                              // backgroundColor: '#0A8FCF',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: 60,
                              width: 140,
                              borderRadius: 15,
                            }}>
                            <SearchableDropdown
                              keyboardShouldPersistTaps="handled"
                              onItemSelect={(items,ind) => {
                                //  alert(JSON.stringify(item));
                                // console.log(indexx);
                                // setReloadList(true);
                                // setIndexer(indexx);
                                // setLoader(true);
                                setLoad(true);
                                var data = MeterNoDataShow;
                                // settableData([]);
                               console.log(MeterNoData)
                               var isthere = MeterNoSelected.filter((val) => val.includes(items.name.toString()));
                               console.log('isthere :  ',isthere)
                               if(isthere.length != 0)
                               {
                                console.log(data);

                                 alert('Value already Selected')
                               }
                               else
                               {
                               var temp = MeterNoSelected;
                               temp.push(items.name.toString());
                               setMeterNoSelected(temp);
                               
                               console.log('index: ',index)
                                data[index].MeterNo = items.name.toString();
                                setMeterNoDataShow(data);
                                

                                // var temp = MeterNoData;
                                // temp.splice(items.id,1);
                                // setMeterNoData(temp);
                                console.log(data);
                               }
                               setLoad(false);
                                // setTimeout(() => {
                                //   setReloadList(false);
                                // }, 1000);
                                // setSelectedWBS(item);
                              }}
                              // onRemoveItem={(item, index) => {
                              //   setSelectedFeeder(null);
                              // }}
                              selectedItems={MeterNoDataShow[index]}
                              multi={false}
                              containerStyle={{padding: 5, width: 120}}
                              itemStyle={{
                                padding: 6,
                                marginTop: 2,
                                backgroundColor: '#ddd',
                                borderColor: 'black',
                                borderWidth: 0.8,
                                // borderRadius: 5,
                              }}
                              itemTextStyle={{color: 'black', fontSize: 12}}
                              itemsContainerStyle={{maxHeight: 100}}
                              items={MeterNoData}
                              // defaultIndex={2}
                              resetValue={false}
                              textInputProps={{
                                placeholder:
                                  MeterNoDataShow[index].MeterNo == ''
                                    ? 'Meter No'
                                    : MeterNoDataShow[index].MeterNo,
                                underlineColorAndroid: 'transparent',
                                placeholderTextColor:
                                  MeterNoDataShow[index].MeterNo == ''
                                    ? 'rgba(0,0,0,0.2)'
                                    : 'black',
                                    value:MeterNoDataShow[index].MeterNo,
                                style: {
                                  padding: 6,
                                  borderWidth: 0.8,
                                  borderColor: '#F6921E',
                                  backgroundColor: 'rgba(246,146,30,0.1)',
                                  borderRadius: 4,
                                  fontSize: 13,
                                  // borderRadius: 5,
                                },
                                // onTextChange: text => alert(text)
                              }}
                              listProps={{
                                nestedScrollEnabled: true,
                              }}
                            />
                            {/* <TextInput
                              placeholder={'Meter No'}
                              onSubmitEditing={event => {
                                console.log(event);
                                setRefresh(true);

                                var materials = MeterNoData.filter(objj =>
                                  objj.Sernr.includes(
                                    event.nativeEvent.text.toLocaleUpperCase(),
                                  ),
                                );
                                if (materials.length > 0) {
                                  var data = MeterNoDataShow;
                                  // settableData([]);
                                  data[
                                    index
                                  ].MeterNo = event.nativeEvent.text.toLocaleUpperCase();
                                  setMeterNoDataShow(data);
                                } else {
                                  alert('Enter Valid Meter Number');
                                }
                                console.log(materials);
                                setRefresh(false);

                                // if (item.MeterNo != text) {
                                //   alert('Enter Valid Meter Number');
                                // }
                              }}
                              style={{borderBottomWidth: 1, width: 100}}
                            /> */}
                          </View>}
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
            <View
              style={{
                marginTop: 10,
                marginBottom: 20,
                width: '90%',
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  swiper.current.scrollBy(-1, true);
                }}>
                <Image
                  style={{height: 28, width: 28}}
                  source={require('../assets/previous.png')}
                />
                <Text
                  style={{
                    color: '#1191D0',
                    fontSize: 16,
                  }}>
                  Prev
                </Text>
              </TouchableOpacity>
              <Text />
            </View>
          </ScrollView>
        </View>
      </Swiper>
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
              // setTimeout(() => {
              navigation.goBack();
              // }, 1000);
            }}
          />
        </View>
      </Modal>
      <Modal
        style={{alignItems: 'center', justifyContent: 'center'}}
        isVisible={isAuthModalVisible}>
        <View
          style={{
            width: '80%',
            height: 200,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Text style={{color: 'green', fontSize: 24, fontWeight: 'bold'}}>
            Are you sure?
          </Text>

          {/* <TextInput
            // selectedValue={selectedFeeder}
            value={Password}
            onChangeText={text => setPassword(text)}
            onFocus={() => {
              setError('');
            }}
            style={{
              height: 50,
              width: '80%',
              fontSize: 16,
              marginBottom: 50,
              borderBottomWidth: 0.8,
            }}
            secureTextEntry={true}
            placeholder={'Enter Password'}
            placeholderText={{fontSize: 16, color: 'grey'}}
          /> */}
          {/* <Text style={{color: 'red', fontSize: 16, textAlign: 'center'}}>
            {error ? error : ''}
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              width: '70%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Button
              title=" Yes "
              color="green"
              onPress={() => {
                // setError('');

                // if (Password != User.ImPassword) {
                //   setError('Password Incorrect');
                //   return;
                // } else {
                AsyncStorage.getItem('Workorders')
                  .then(items => {
                    var data = [];
                    data = items ? JSON.parse(items) : [];
                    data = [
                      ...data,
                      {
                        Date: date,
                        SDate: Moment(Date.now()).format('YYYY-MM-DD'),
                        PmtName: PMT,
                        Dts: selectedValue,
                        Fdr: selectedFeeder,
                        Pqc: selectedPQC,
                        Approver: selectedAprrover,
                        Wbs: selectedWBS,
                        Project: selectedProject,
                        SubProj: selectedsub,
                        WO_MATERIALSSet: tableData,
                        WO_MAPPINGSSet: MeterNoDataShow,
                      },
                    ];

                    AsyncStorage.setItem('Workorders', JSON.stringify(data));
                    // alert('Saved Locally Successfully');

                    setAuthModalVisible(!isAuthModalVisible);
                    // navigation.goBack();
                  })
                  .then(() => {
                    setSuccessModalVisible(!isSuccessModalVisible);
                    setError('');
                    // setTimeout(() => {
                    // navigation.goBack();
                    // }, 1000);
                  })
                  .catch(err => {
                    // alert(JSON.stringify(err));
                    setError(JSON.stringify(err));
                    setModalVisible(true);
                  });
              }}
              // }
            />

            <Button
              title=" No "
              color="red"
              onPress={() => {
                setAuthModalVisible(!isAuthModalVisible);
                // setError('');
                // navigation.goBack();
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        style={{alignItems: 'center', justifyContent: 'center'}}
        isVisible={isPinModalVisible}>
        <View
          style={{
            width: '80%',
            height: 300,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Text style={{color: 'green', fontSize: 18, fontWeight: 'bold'}}>
            Send for Approval
          </Text>
          <View style={{width: '100%'}}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Approver</Text>
            <SearchableDropdown
              onItemSelect={item => {
                //  alert(JSON.stringify(item));
                console.log(item);
                setSelectedAprrover(item);
              }}
              // onRemoveItem={(item, index) => {
              //   setSelectedFeeder(null);
              // }}
              selectedItems={selectedAprrover}
              multi={false}
              containerStyle={{padding: 5}}
              itemStyle={{
                padding: 6,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: 'black',
                borderWidth: 0.8,
                // borderRadius: 5,
              }}
              itemTextStyle={{color: 'black', fontSize: 12}}
              itemsContainerStyle={{maxHeight: 100}}
              items={ApproversData}
              // defaultIndex={2}
              resetValue={false}
              textInputProps={{
                placeholder: 'Select Approver',
                underlineColorAndroid: 'transparent',
                style: {
                  padding: 6,
                  borderWidth: 0.8,
                  borderColor: '#F6921E',
                  backgroundColor: 'rgba(246,146,30,0.1)',
                  borderRadius: 4,
                  fontSize: 13,
                  // borderRadius: 5,
                },
                // onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
            {/* <Picker
            selectedValue={selectedPQC}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedPQC(itemValue)}>
            {PQCData.map(data => {
              return <Picker.Item label={data.Name} value={data.Name} />;
            })}
          </Picker> */}
          </View>
          {/* <TouchableOpacity
          onPress={() => {
            swiper.current.scrollBy(1, true);
          }}>
          <Text>Next</Text>
        </TouchableOpacity> */}
          <Text style={{color: 'red', marginTop: 10}}>{error}</Text>

          {/* <Text style={{color: 'red', fontSize: 16, textAlign: 'center'}}>
            {error ? error : ''}
          </Text> */}
          {uploading ? (
            <View
              style={{
                width: '70%',
                height: 50,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator />
              <Text style={{marginTop: 20}}>Loading...</Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                height: 50,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Button
                title=" Submit "
                color="green"
                onPress={() => {
                  setUploading(true);
                  setUploadingMsg('');
                  setError('');
                  console.log(
                    JSON.stringify({
                      d: {
                        LoggedId: User.ImUser,
                        DtsId: selectedValue.dts_id,
                        FdrId: selectedValue.feeder_id,
                        Pqc: selectedPQC.v_id,
                        PqcName: selectedPQC.name,
                        ProjId: selectedProject.projid,
                        ProjectName: selectedProject.name,
                        SubProj: 'P03',
                        AeName: User.ImUser,
                        FdrName: selectedValue.feeder_desc,
                        PmtName: PMT,
                        ApproverId: selectedAprrover.name,
                        Wbs: selectedWBS.name,
                        CaseId: '1234',
                        GridName: 'Test Grid',
                        SDate: Moment(Date.now())
                          .format('YYYY-MM-DD')
                          .split('-')
                          .join(''),
                        CDate: Moment(date)
                          .format('YYYY-MM-DD')
                          .split('-')
                          .join(''),
                        Return: '',
                        WO_MATERIALSSet: tableData,
                        WO_MAPPINGSSet: MeterNoDataShow,
                      },
                    }),
                  );
                  if (selectedAprrover) {
                    RNFetchBlob.config({
                      trusty: true,
                    })
                      .fetch(
                        'POST',
                        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/CREATE_WOSet',
                        {
                          // Authorization:
                          // 'Basic ' + base64.encode('mm02:sapsap3'),
                          'Content-Type': 'application/json',
                          Accept: 'application/json',
                          'X-CSRFToken': '',
                          'X-Requested-With': 'XMLHttpRequest',
                        },
                        JSON.stringify({
                          d: {
                            LoggedId: User.ImUser,
                            DtsId: selectedValue.dts_id,
                            FdrId: selectedValue.feeder_id,
                            Pqc: selectedPQC.v_id,
                            PqcName: selectedPQC.name,
                            ProjId: selectedProject.projid,
                            ProjectName: selectedProject.name,
                            SubProj: selectedsub.spcode,
                            AeName: User.ImUser,
                            FdrName: selectedValue.feeder_desc,
                            ApproverId: selectedAprrover.name,
                            Wbs: selectedWBS.name,
                            PmtName: PMT,
                            CaseId: '1234',
                            GridName: 'Test Grid',
                            SDate: Moment(Date.now())
                              .format('YYYY-MM-DD')
                              .split('-')
                              .join(''),
                            CDate: Moment(date)
                              .format('YYYY-MM-DD')
                              .split('-')
                              .join(''),
                            Return: '',
                            WO_MATERIALSSet: tableData,
                            WO_MAPPINGSSet: MeterNoDataShow,
                          },
                        }),
                      )
                      .then(res => res.json())
                      .then(res => {
                        // alert(JSON.stringify(res));
                        console.log(res);
                        setUploadingMsg(res.d.Return);
                        setUploading(false);
                        setSuccessModalVisible(!isSuccessModalVisible);
                        setError('');
                        // setTimeout(() => {
                        // navigation.goBack();
                        // }, 1000);
                        // setError('Unable to Upload');
                        // setModalVisible(true);
                        // setLoader(false);
                        // // setItems(res.values);
                        // let SubProject = res.d.results;
                        // let arr = [];
                        // for (var i = 0; i < SubProject.length; i++) {
                        //   arr.push({
                        //     id: i,
                        //     name: SubProject[i].SubProj,
                        //     projid: SubProject[i].ProjId,
                        //     uri: SubProject[i].__metadata.uri,
                        //     type: SubProject[i].__metadata.type,
                        //     orgid: SubProject[i].__metadata.id,
                        //   });
                        // }
                        // // alert(JSON.stringify(SubProject));
                        // // console.log(JSON.stringify(SubProject))
                        // AsyncStorage.setItem('SubProject', JSON.stringify(arr));
                      })
                      .catch(error => {
                        // setLoader(false);
                        // setError('Unable to Upload');
                        setUploadingMsg('');

                        console.log(error);
                        setModalVisible(true);
                        alert(
                          'Something went wrong! Please check internet connectivity.    ' +
                            JSON.stringify(error),
                        );
                      });
                  } else {
                    setUploading(false);
                    setUploadingMsg('');
                    setError('Select Approver');
                  }
                }}
                // }
              />
              <Button
                title=" Cancel "
                color="red"
                onPress={() => {
                  setUploadingMsg('');

                  setPinModalVisible(!isPinModalVisible);
                  // setError('');
                  // navigation.goBack();
                }}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

// const postRequest = (item, back, userAction, name, userPassword, loader) => {
//   // var key = [7, 8, 3, 1, 2, 9, 3, 8, 4, 7, 1, 2, 0, 4, 9, 8];
//   // encryption();
//   // var ciphertext = CryptoJS.AES.encrypt(
//   //   'Zuca8655',
//   //   CryptoJS.enc.Utf8.parse('7831293847120498'),
//   //   {
//   //     iv: CryptoJS.enc.Utf8.parse('7831293847120498'),
//   //     mode: CryptoJS.mode.CBC,
//   //   },
//   // );
//   // console.log('encrypted text', ciphertext.toString());
//   // // The initialization vector (must be 16 bytes)  7831293847120498
//   //   var iv = [7, 8, 3, 1, 2, 9, 3, 8, 4, 7, 1, 2, 0, 4, 9, 8];

//   //   // // Convert text to bytes (must be a multiple of the segment size you choose below)   Zuca8655

//   //   var text = strEncodeUTF16('Zuca8655');
//   //   var textBytes = aesjs.utils.utf8.toBytes(text);
//   // console.log(textBytes)
//   //   var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
//   //   var encryptedBytes = aesCbc.encrypt(textBytes);

//   //   // // To print or store the binary data, you may convert it to hex
//   //   var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
//   //   alert(encryptedHex + '   bytes : ' + textBytes);
//   // // "104fb073f9a131f2cab49184bb864ca2"

//   // "TextMustBeAMultipleOfSegmentSize"'zahra.ali'

//   if (name == '' || userPassword == '') {
//     loader();
//     alert('Email or Password missing');
//     return;
//   }
//   var ciphertext = CryptoJS.AES.encrypt(
//     userPassword,
//     CryptoJS.enc.Utf8.parse('7831293847120498'),
//     {
//       iv: CryptoJS.enc.Utf8.parse('7831293847120498'),
//       mode: CryptoJS.mode.CBC,
//     },
//   );
//   var details = {
//     userId: name,
//     password: ciphertext.toString(),
//     /*
//     body: {
//       SRStatus: 'Request forwarded to HoD',
//       UserAction: userAction,
//       WFFlag: 'TAG',
//       Comments: 'Ok',
//     },
// */
//   };
//   console.log(details);
//   var formBody = [];
//   for (var property in details) {
//     var encodedKey = encodeURIComponent(property);
//     var encodedValue = encodeURIComponent(details[property]);
//     formBody.push(encodedKey + '=' + encodedValue);
//   }
//   formBody = formBody.join('&');
//   var URL = 'http://mmr-dev.kesc.com.pk:886/ITHD/api/v1/token';
//   fetch(URL, {
//     method: 'POST',
//     headers: {
//       //      Accept: 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//     },
//     body: formBody,
//   })
//     .then(response => response.json())
//     .then(async responseJson => {
//       if (responseJson.Status == false) {
//         alert(JSON.stringify(responseJson.Message));

//         loader();
//       } else {
//         loader();

//         await AsyncStorage.setItem('user', JSON.stringify(details)).then(() => {
//           AsyncStorage.setItem(
//             'userdetails',
//             JSON.stringify(responseJson.Data),
//           );
//         });
//         back();
//       }
//     })
//     .catch(error => {
//       loader();
//       alert('Something went wrong! Please check internet connectivity.');
//     });
// };

// class ToggleClass extends React.Component {
//   state = {
//     status: false,
//   };

//   render() {
//     return (
//       <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
//         <Switch
//           value={item.services}
//           onValueChange={value => {
//             // alert(tableData[index].services)
//             setRefresh(false);
//             var data = tableData;
//             data[index].services = value;
//             settableData(data);
//             setRefresh(true);
//             // useEffect()
//           }}
//           onChange={() => {}}
//           style={{alignSelf: 'flex-start'}}
//         />

//         <TouchableOpacity
//           style={{flex: 1}}
//           onPress={() => console.log(this.props.freelancer_name)}>
//           <Text>{this.props.freelancer_name}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             const newStatus = !this.state.status;
//             this.setState({
//               status: newStatus,
//             });
//             console.log('status: ', this.state.status);
//           }}>
//           <Text>{this.state.status ? 'ACTIVE' : 'INACTIVE'}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, fontSize: 10},
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
    color: '#1191D0',
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
  inputText: {
    width: '98%',
    paddingLeft: 10,
    height: 50,
    color: 'black',
  },
  forgot: {
    color: '#1191D0',
    fontSize: 11,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  loginBtn: {
    width: '45%',
    backgroundColor: '#1191D0',
    // borderRadius: 25,
    height: 50,
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //flexDirection: 'row',
    backgroundColor: 'white',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },


  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 45
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#98CFB6"
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16
  }

});

export default New1;
