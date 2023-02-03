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

const DeleteSIRs = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [postedSIRs, setPostedSIRs] = useState(false);

  useEffect(() => {
    console.log('Screen:Delete SIR:');
    getPostedSIRs();
  }, []);

  const getPostedSIRs = () => {
    let count = 0;
    AsyncStorage.getItem('SIRDigitization').then(items => {
      let localdata = [];
      var SIRCompletedData = items ? JSON.parse(items) : {};
      SIRCompletedData = SIRCompletedData.filter(singleItem => {
        if (singleItem.Status == 'Post') {
          localdata.push({
            Sirnr: singleItem.Sirnr,
          });
        }
      });

      var filterData = localdata.filter(item => {
        count++;
        console.log(item);
      });
      setPostedSIRs(count);
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
          <Text style={{color: 'white', fontSize: 15}}>
            Posted SIR Count: {postedSIRs}
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
});

export default DeleteSIRs;
