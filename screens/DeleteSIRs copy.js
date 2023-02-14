import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import base64 from 'react-native-base64';
import LinearGradient from 'react-native-linear-gradient';

const DeleteSIRs = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [postedSIRCount, setPostedSIRCount] = useState('');
  const [postedSIRtobeDeletedCount, setPostedSIRtobeDeletedCount] =
    useState('');
  const [storeInDeviceText, SetStoreInDeviceText] = useState('');
  const [postedSIRList, setPostedSIRList] = useState([]);
  const [tobeDeletedSIRList, setTobeDeletedSIRList] = useState([]);

  useEffect(() => {
    console.log('Screen:Delete SIR:');

    getLoginCredentials();
  }, []);

  const getLoginCredentials = () => {
    var data1 = [];
    let pernr;
    AsyncStorage.getItem('LoginCredentials')
      .then(items => {
        data1 = items ? JSON.parse(items) : [];
        pernr = data1[0].pernr;
      })
      .then(res => {
        getPostedSIRs(pernr);
      });
  };

  const getDeletedSIRfromSAP = () => {
    let count = 0;
    let returnedListData = [];

    axios({
      method: 'POST',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_STATUS_RETURN_SRV/HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        HeaderToItem: postedSIRList,
      }),
    })
      .then(res => {
        console.log(
          '******************getDeletedSIRfromSAP UPDATED*********************************',
        );
        if (res.data.d.HeaderToItem != null) {
          res.data.d.HeaderToItem.results.forEach(singleResult => {
            returnedListData.push({
              Sirnr: singleResult.Sirnr,
            });
            count++;
          });
        }
        console.log(returnedListData);
        setPostedSIRtobeDeletedCount(count);
        setTobeDeletedSIRList(returnedListData);
      })
      .catch(error => {
        console.error('getDeletedSIRfromSAP:error: ' + error);
      });
  };

  const getPostedSIRs = pernr => {
    let count = 0;
    let localdata = [];
    AsyncStorage.getItem('SIRDigitization').then(items => {
      var SIRCompletedData = items ? JSON.parse(items) : {};
      SIRCompletedData = SIRCompletedData.filter(singleItem => {
        //if (singleItem.Status == 'Post') {
        localdata.push({
          Sirnr: singleItem.Sirnr,
          Pernr: pernr,
        });
        // }
      });

      var filterData = localdata.filter(item => {
        count++;
        console.log(item);
      });
      setPostedSIRCount(count);
      setPostedSIRList(localdata);
    });
  };

  const StoreInDevice = () => {
    AsyncStorage.getItem('SIRDigitization').then(async items => {
      let data = JSON.parse(items);

      let data1 = data.filter((item, index) => {
        return !tobeDeletedSIRList.some(subItem => {
          return subItem.Sirnr === item.Sirnr;
        });
      });
      console.log('after deleting ');
      console.log(data1.length);
      AsyncStorage.setItem('SIRDigitization', JSON.stringify(data1));
      SetStoreInDeviceText('Removed from Mobile Successfully');
    });
  };

  return (
    <View style={styles.container}>
      {loader ? (
        <View style={{flex: 1, backgroundColor: '#1565C0', marginTop: 70}}>
          <ActivityIndicator
            size="large"
            style={{transform: [{scaleX: 5}, {scaleY: 5}]}}
            color="white"
          />
        </View>
      ) : (
        <>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              flex: 1,
            }}>
            Total cases SIR Count: {postedSIRCount}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              //    backgroundColor: '#1565C0',
              //  padding: 15
              flex: 1,
            }}
            onPress={() => {
              getDeletedSIRfromSAP();
            }}>
            <LinearGradient
              colors={['#1565C0', '#64b5f6']}
              style={styles.submit}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Get Posted SIR's to be Deleted
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 24, flex: 1}}>
            Total cases to be Deleted Count: {postedSIRtobeDeletedCount}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              //    backgroundColor: '#1565C0',
              //  padding: 15
            }}
            onPress={() => {
              StoreInDevice();
            }}>
            <LinearGradient
              colors={['#1565C0', '#64b5f6']}
              style={styles.submit}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Delete from Mobile Data
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 24, flex: 1}}>
            {storeInDeviceText}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  submit: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default DeleteSIRs;
