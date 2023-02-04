import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  //AsyncStorage,
  Image,
  ImageBackground,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const HomeScreenPlannedSummary = ({navigation}) => {
  //   const [data, setdata] = useState();
  const [assignedCases, setAssignedCases] = useState(0);
  const [savedCases, setSavedCases] = useState(0);
  const [pendingCases, setPendingCases] = useState(0);
  const [postCases, setPostCases] = useState(0);
  const [safetyHazardCases, setsafetyHazardCases] = useState(0);

  const [startOfMonth, setstartOfMonth] = useState(
    moment().startOf('month').subtract(1, 'days').format('YYYYMMDD'),
  );
  const [endOfMonth, setendOfMonth] = useState(
    moment().endOf('month').add(1, 'days').format('YYYYMMDD'),
  );

  const loadData = () => {
    AsyncStorage.getItem('SIRDigitization').then(items => {
      console.log('startOfMonth: ' + startOfMonth);
      console.log('endOfMonth: ' + endOfMonth);

      var SIRData = items ? JSON.parse(items) : {};
      SIRData = SIRData.filter(x => x.Random == '');

      console.log('total cases: ' + SIRData.length);

      setAssignedCases(SIRData.length);

      setSavedCases(SIRData.filter(x => x.Status == 'Save').length);

      setPostCases(SIRData.filter(x => x.Status == 'Post').length);

      setPendingCases(SIRData.filter(x => x.Status == '').length);
    });

    AsyncStorage.getItem('SafetyHazard').then(items => {
      var SafetyHazardData = items ? JSON.parse(items) : {};
      setsafetyHazardCases(SafetyHazardData.length);
      console.log('total setsafetyHazardCases: ' + SafetyHazardData.length);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ImageBackground
      //           source={require('../assets/images/kebackground.jpg')}
      style={{
        width: '100%',
        resizeMode: 'contain',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/images/kelogo.jpg')}
      />
      <View style={styles.header}>
        <Text style={styles.text_main}>Planned Cases Summary</Text>
      </View>
      <View style={styles.formheader}>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Assigned Cases:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{assignedCases}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Saved Cases</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{savedCases}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Pending Cases</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{pendingCases}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Post Cases</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{postCases}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Safety Hazard Cases</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{safetyHazardCases}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  text_main: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    // top:0,
    // color: '#0D90D0',
    color: '#ffff',
    //marginBottom: 10,
    marginTop: 5,
    //elevation: 4,
    //shadowOffset: { width: 15, height: 15 },
    //shadowColor: 'black',
    //shadowOpacity: 0.8,
    //shadowRadius: 20,
  },
  text_left: {
    color: '#111012',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    padding: 15,
  },
  text_right: {
    color: '#111012',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
  },

  formheader: {
    flex: 1,
    //   paddingBottom: 50,
    //        backgroundColor: "red",
  },

  header: {
    width: '100%',
    backgroundColor: 'rgba(93,45,145,255)',
    height: 30,
    //  paddingTop: 100,
    //        flex: 1,
    //      justifyC3ntent: 'flex-end',
    //paddingHorizontal: 20,
    //  marginTop: 200,
    //  paddingBottom: 100
  },

  tinyLogo: {
    width: '96%',
    height: 100,
    paddingHorizontal: 20,
    resizeMode: 'contain',
  },
});

export default HomeScreenPlannedSummary;