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
  AsyncStorage,
  Image,
  Picker,
  ScrollView,
} from 'react-native';
/*
import {
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

function UpdateDetails({navigation, route}) {
  const [name, setName] = useState('');
  const [PMT, setPMT] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFeeder, setSelectedFeeder] = useState('');
  const [selectedPQC, setSelectedPQC] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedsub, setSelectedsub] = useState('');
  const [loader, setLoader] = useState(false);
  const [tableData, settableData] = useState([]);
  const [selectedMaterial, setselectedMaterial] = useState('');
  const [selectedMaterialDetail, setselectedMaterialDetail] = useState([]);

  const item = {};
  const tableHead = ['Item', 'Description', 'Unit', 'Quantity'];
  // const tableData = [['1', '2', '3'], ['a', 'b', 'c'], ['1', '2', '3']];
  const vendor = [
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_VENDORS_LISTSet(Lifnr='100003',Name='A.G.E.Industries%20%28Pvt%29%20Ltd.')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_VENDORS_LISTSet(Lifnr='100003',Name='A.G.E.Industries%20%28Pvt%29%20Ltd.')",
        type: 'ZPM_PQC_SRV.GET_VENDORS_LIST',
      },
      Lifnr: '100003',
      Name: 'A.G.E.Industries (Pvt) Ltd.',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_VENDORS_LISTSet(Lifnr='100032',Name='Amber%20Capacitors%20Ltd.')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_VENDORS_LISTSet(Lifnr='100032',Name='Amber%20Capacitors%20Ltd.')",
        type: 'ZPM_PQC_SRV.GET_VENDORS_LIST',
      },
      Lifnr: '100032',
      Name: 'Amber Capacitors Ltd.',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_VENDORS_LISTSet(Lifnr='101287',Name='A.KARIMJEE%20%26%20SONS')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_VENDORS_LISTSet(Lifnr='101287',Name='A.KARIMJEE%20%26%20SONS')",
        type: 'ZPM_PQC_SRV.GET_VENDORS_LIST',
      },
      Lifnr: '101287',
      Name: 'A.KARIMJEE & SONS',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_VENDORS_LISTSet(Lifnr='970286',Name='Anum')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_VENDORS_LISTSet(Lifnr='970286',Name='Anum')",
        type: 'ZPM_PQC_SRV.GET_VENDORS_LIST',
      },
      Lifnr: '970286',
      Name: 'Anum',
    },
  ];
  const feeder = [
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-000001')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-000001')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-000001',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-000004')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-000004')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-000004',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-000420')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-000420')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-000420',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003543')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003543')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003543',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003545')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003545')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003545',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003546')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003546')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003546',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003548')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003548')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003548',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003549')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003549')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003549',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003551')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003551')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003551',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003553')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003553')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003553',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003554')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003554')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003554',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003555')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003555')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003555',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003556')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003556')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003556',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003557')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003557')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003557',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003558')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003558')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003558',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003559')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003559')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003559',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003560')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003560')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003560',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003561')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003561')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003561',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003562')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003562')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003562',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003563')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003563')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003563',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003564')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003564')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003564',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003565')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003565')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003565',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003566')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003566')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003566',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003567')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003567')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003567',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003568')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003568')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003568',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003569')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003569')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003569',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003570')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003570')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003570',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003571')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003571')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003571',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003572')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003572')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003572',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003573')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003573')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003573',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003574')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003574')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003574',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003575')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003575')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003575',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003576')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003576')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003576',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003577')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003577')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003577',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003578')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003578')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003578',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003579')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003579')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003579',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003580')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003580')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003580',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003581')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003581')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003581',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003582')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003582')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003582',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003583')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003583')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003583',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003584')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003584')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003584',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003585')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003585')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003585',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003586')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003586')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003586',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003587')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003587')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003587',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003588')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003588')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003588',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003590')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003590')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003590',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003591')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003591')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003591',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003592')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003592')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003592',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003597')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003597')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003597',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003598')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003598')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003598',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003599')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003599')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003599',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003600')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003600')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003600',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003601')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003601')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003601',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003602')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003602')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003602',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003603')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003603')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003603',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003604')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003604')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003604',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003605')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003605')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003605',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003606')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003606')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003606',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003607')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003607')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003607',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003608')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003608')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003608',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003609')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003609')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003609',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003610')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003610')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003610',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003611')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003611')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003611',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003612')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003612')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003612',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003613')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003613')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003613',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003614')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003614')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003614',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003615')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003615')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003615',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003616')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003616')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003616',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003617')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003617')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003617',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003618')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003618')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003618',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003619')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003619')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003619',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003620')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003620')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003620',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003621')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003621')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003621',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003622')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003622')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003622',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003623')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003623')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003623',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003624')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003624')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003624',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003625')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003625')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003625',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003626')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003626')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003626',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003627')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003627')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003627',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003628')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003628')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003628',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003629')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003629')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003629',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003630')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003630')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003630',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003631')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003631')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003631',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003632')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003632')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003632',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003633')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003633')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003633',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003634')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003634')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003634',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003635')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003635')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003635',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003636')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003636')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003636',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003637')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003637')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003637',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003638')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003638')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003638',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003639')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003639')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003639',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003640')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003640')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003640',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003641')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003641')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003641',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003642')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003642')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003642',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003643')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003643')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003643',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003644')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003644')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003644',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003645')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003645')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003645',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003646')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003646')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003646',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003647')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003647')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003647',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003648')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003648')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003648',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003649')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003649')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003649',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003650')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003650')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003650',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003651')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003651')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003651',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003652')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003652')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003652',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003653')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003653')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003653',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003654')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003654')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003654',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003658')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003658')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003658',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003659')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003659')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003659',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003660')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003660')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003660',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003661')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003661')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003661',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003662')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003662')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003662',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003663')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003663')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003663',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003664')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003664')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003664',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003665')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003665')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003665',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003666')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003666')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003666',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003667')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003667')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003667',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003668')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003668')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003668',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003669')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003669')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003669',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003670')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003670')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003670',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003671')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003671')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003671',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003672')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003672')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003672',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003673')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003673')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003673',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003674')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003674')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003674',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003675')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003675')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003675',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003676')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003676')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003676',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003677')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003677')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003677',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003678')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003678')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003678',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003679')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003679')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003679',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003680')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003680')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003680',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003681')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003681')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003681',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003682')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003682')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003682',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003683')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003683')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003683',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003684')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003684')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003684',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003685')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003685')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003685',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003694')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003694')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003694',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003695')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003695')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003695',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003704')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003704')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003704',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003705')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003705')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003705',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003706')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003706')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003706',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003707')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003707')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003707',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003708')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003708')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003708',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003709')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003709')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003709',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003710')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003710')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003710',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003711')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003711')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003711',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003712')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003712')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003712',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003713')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003713')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003713',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003714')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003714')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003714',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003715')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003715')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003715',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003716')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003716')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003716',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003717')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003717')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003717',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003720')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003720')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003720',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003721')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003721')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003721',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003722')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003722')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003722',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003723')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003723')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003723',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003724')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003724')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003724',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003725')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003725')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003725',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003726')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003726')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003726',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003727')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003727')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003727',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003728')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003728')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003728',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003729')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003729')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003729',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003730')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003730')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003730',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003731')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003731')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003731',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003732')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003732')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003732',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003733')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003733')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003733',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003734')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003734')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003734',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003735')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003735')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003735',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003736')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003736')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003736',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003744')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003744')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003744',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003754')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003754')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003754',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003755')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003755')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003755',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003764')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003764')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003764',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003765')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003765')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003765',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003766')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003766')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003766',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003767')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003767')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003767',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003774')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003774')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003774',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003775')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003775')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003775',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003776')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003776')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003776',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003784')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003784')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003784',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003794')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003794')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003794',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003804')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003804')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003804',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003805')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003805')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003805',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003806')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003806')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003806',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003807')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003807')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003807',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003808')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003808')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003808',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003809')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003809')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003809',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003810')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003810')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003810',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003811')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003811')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003811',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003812')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003812')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003812',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003814')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003814')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003814',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003824')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003824')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003824',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003834')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003834')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003834',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003835')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003835')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003835',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003836')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003836')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003836',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003837')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003837')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003837',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003838')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003838')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003838',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003839')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003839')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003839',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003840')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-003840')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-003840',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-004000')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet('FDR-004000')",
        type: 'ZPM_PQC_SRV.GET_FEEDER_IDS',
      },
      Tplnr: 'FDR-004000',
    },
  ];
  const dts = [
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-000000')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-000000')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-000000',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-000001')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-000001')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-000001',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-000002')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-000002')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-000002',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-000004')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-000004')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-000004',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-001660')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-001660')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-001660',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-003584')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-003584')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-003584',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-003657')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-003657')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-003657',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-52010')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-52010')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-52010',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-52011')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-52011')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-52011',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525411')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525411')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525411',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525412')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525412')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525412',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525413')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525413')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525413',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525414')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525414')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525414',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525415')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525415')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525415',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525416')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525416')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525416',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525417')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525417')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525417',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525418')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525418')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525418',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525419')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525419')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525419',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525420')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525420')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525420',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525421')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525421')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525421',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525422')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525422')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525422',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525424')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525424')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525424',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525425')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525425')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525425',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525426')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525426')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525426',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525427')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525427')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525427',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525428')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525428')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525428',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525429')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525429')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525429',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525430')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525430')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525430',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525431')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525431')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525431',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525432')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525432')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525432',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525433')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525433')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525433',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525434')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525434')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525434',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525435')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525435')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525435',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525436')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525436')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525436',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525437')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525437')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525437',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525438')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525438')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525438',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525439')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525439')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525439',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525440')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525440')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525440',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525441')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525441')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525441',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525442')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525442')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525442',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525443')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525443')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525443',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525444')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525444')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525444',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525445')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525445')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525445',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525446')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525446')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525446',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525447')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525447')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525447',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525448')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525448')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525448',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525449')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525449')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525449',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525450')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525450')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525450',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525451')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525451')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525451',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525452')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525452')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525452',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525453')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525453')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525453',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525454')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525454')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525454',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525455')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525455')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525455',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525456')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525456')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525456',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525457')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525457')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525457',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525458')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525458')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525458',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525459')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525459')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525459',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525460')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525460')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525460',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525461')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525461')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525461',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525462')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525462')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525462',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525463')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525463')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525463',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525464')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525464')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525464',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525465')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525465')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525465',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525466')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525466')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525466',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525468')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525468')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525468',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525474')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525474')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525474',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525476')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525476')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525476',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525477')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525477')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525477',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525478')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525478')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525478',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525479')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525479')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525479',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525490')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525490')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525490',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525493')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525493')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525493',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525508')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525508')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525508',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525509')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525509')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525509',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525518')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525518')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525518',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525519')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525519')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525519',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525520')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525520')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525520',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525521')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525521')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525521',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525522')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525522')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525522',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525523')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525523')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525523',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525524')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525524')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525524',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525525')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525525')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525525',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525526')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525526')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525526',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525527')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525527')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525527',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525528')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525528')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525528',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525529')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525529')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525529',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525530')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525530')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525530',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525531')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525531')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525531',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525533')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525533')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525533',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525535')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525535')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525535',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525536')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525536')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525536',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525537')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525537')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525537',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525539')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525539')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525539',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525540')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525540')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525540',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525541')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525541')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525541',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525542')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525542')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525542',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525543')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525543')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525543',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525544')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525544')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525544',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525545')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525545')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525545',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525546')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525546')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525546',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525548')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525548')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525548',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525550')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525550')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525550',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525551')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525551')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525551',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525552')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525552')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525552',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525553')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525553')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525553',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525554')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525554')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525554',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525556')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525556')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525556',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525559')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525559')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525559',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525563')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525563')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525563',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525564')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525564')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525564',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525566')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525566')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525566',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525567')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525567')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525567',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525576')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525576')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525576',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525577')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525577')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525577',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525578')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525578')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525578',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525579')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525579')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525579',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525580')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525580')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525580',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525581')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525581')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525581',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525582')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525582')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525582',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525583')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525583')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525583',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525584')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525584')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525584',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525586')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525586')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525586',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525587')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525587')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525587',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525596')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525596')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525596',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525597')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525597')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525597',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525598')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525598')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525598',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525599')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525599')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525599',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525600')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525600')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525600',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525601')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525601')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525601',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525602')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525602')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525602',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525603')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525603')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525603',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525604')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525604')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525604',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525605')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525605')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525605',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525606')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-525606')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-525606',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600401')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600401')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600401',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600402')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600402')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600402',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600403')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600403')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600403',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600411')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600411')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600411',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600412')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600412')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600412',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600413')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600413')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600413',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600414')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600414')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600414',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600421')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600421')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600421',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600422')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600422')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600422',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600431')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600431')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600431',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600432')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600432')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600432',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600433')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600433')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600433',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600434')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600434')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600434',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600435')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600435')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600435',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600441')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600441')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600441',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600442')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600442')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600442',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600443')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600443')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600443',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600444')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600444')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600444',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600445')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600445')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600445',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600446')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600446')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600446',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600447')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600447')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600447',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600451')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600451')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600451',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600452')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600452')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600452',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600453')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600453')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600453',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600454')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600454')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600454',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600462')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600462')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600462',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600463')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600463')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600463',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600464')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600464')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600464',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600465')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600465')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600465',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600466')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600466')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600466',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600467')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600467')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600467',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600469')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600469')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600469',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600471')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600471')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600471',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600472')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet('DTS-600472')",
        type: 'ZPM_PQC_SRV.GET_DTS_LIST',
      },
      Tplnr: 'DTS-600472',
    },
  ];
  const project = [
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PROJECTS_LISTSet('1')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PROJECTS_LISTSet('1')",
        type: 'ZPM_PQC_SRV.GET_PROJECTS_LIST',
      },
      ProjId: '1',
      ProjectName: 'VILLAGE ELECTRIFICATION',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PROJECTS_LISTSet('2')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PROJECTS_LISTSet('2')",
        type: 'ZPM_PQC_SRV.GET_PROJECTS_LIST',
      },
      ProjId: '2',
      ProjectName: 'LT ABC',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PROJECTS_LISTSet('3')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PROJECTS_LISTSet('3')",
        type: 'ZPM_PQC_SRV.GET_PROJECTS_LIST',
      },
      ProjId: '3',
      ProjectName: 'FEEDER LAYING',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PROJECTS_LISTSet('4')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PROJECTS_LISTSet('4')",
        type: 'ZPM_PQC_SRV.GET_PROJECTS_LIST',
      },
      ProjId: '4',
      ProjectName: 'GROUNDING',
    },
  ];
  const subProject = [
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_SUB_PROJECTS_LISTSet('2')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_SUB_PROJECTS_LISTSet('2')",
        type: 'ZPM_PQC_SRV.GET_SUB_PROJECTS_LIST',
      },
      ProjId: '2',
      SubProj: 'CONNECTION SHIFTING',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_SUB_PROJECTS_LISTSet('2')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_SUB_PROJECTS_LISTSet('2')",
        type: 'ZPM_PQC_SRV.GET_SUB_PROJECTS_LIST',
      },
      ProjId: '2',
      SubProj: 'MAINS',
    },
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_SUB_PROJECTS_LISTSet('2')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_SUB_PROJECTS_LISTSet('2')",
        type: 'ZPM_PQC_SRV.GET_SUB_PROJECTS_LIST',
      },
      ProjId: '2',
      SubProj: 'OMR',
    },
  ];
  const material = [
    {
      __metadata: {
        id:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_MATERIALS_LISTSet('2')",
        uri:
          "https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_MATERIALS_LISTSet('2')",
        type: 'ZPM_PQC_SRV.GET_MATERIALS_LIST',
      },
      ProjId: '2',
      ProjectName: 'LT ABC',
      SubProj: 'OMR',
      Matnr: '400098',
      Maktx: 'Drill',
      Meins: 'M',
      Type: '',
    },
  ];
  const element = (data, index, tableData, selectedsub) => (
    <TextInput
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

  const elementDropdown = (data, index, tableData, selectedsub, type) => (
    <Picker
      selectedValue={selectedValue}
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
        data[index][3] = itemValue;
      }}>
      <Picker.Item label={'Services'} value={'Services'} />
      <Picker.Item label={'Sub-Mains'} value={'Sub-Mains'} />
    </Picker>
  );
  useEffect(() => {
    AsyncStorage.getItem('Workorders').then(items => {
      var data = items ? JSON.parse(items) : [];
      var index = route.params.index;
      // console.log(route.params)
      var datail = data[index];
      console.log(datail);
      setSelectedValue(datail.dts);
      setSelectedFeeder(datail.feeder);
      setSelectedPQC(datail.pqc);
      setSelectedProject(datail.project);
      setSelectedsub(datail.subproject);
      settableData(datail.materails);
      setPMT(datail.name);
      // setSelectedFeeder(datail.feeder)
    });
  }, [route.params.index]);
  return (
    <ScrollView style={styles.container}>
      <View style={{}}>
        <Text>Name of PMT/ Substation</Text>
        <TextInput
          // selectedValue={selectedFeeder}
          value={PMT}
          disabled={true}
          // onChangeText={(text)=>setPMT(text)}
          style={{height: 50, width: '100%'}}
          placeholder={'Enter Text'}
        />
      </View>
      <View style={{}}>
        <Text>Feeder</Text>
        <Picker
          selectedValue={selectedFeeder}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedFeeder(itemValue)
          }>
          {feeder.map(data => {
            return <Picker.Item label={data.Tplnr} value={data.Tplnr} />;
          })}
        </Picker>
      </View>
      <View style={{}}>
        <Text>DTS</Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          {dts.map(data => {
            return <Picker.Item label={data.Tplnr} value={data.Tplnr} />;
          })}
        </Picker>
      </View>

      <View style={{}}>
        <Text>PQC</Text>
        <Picker
          selectedValue={selectedPQC}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) => setSelectedPQC(itemValue)}>
          {vendor.map(data => {
            return <Picker.Item label={data.Name} value={data.Name} />;
          })}
        </Picker>
      </View>
      <View style={{}}>
        <Text>Project</Text>
        <Picker
          selectedValue={selectedProject}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedProject(itemValue)
          }>
          {project.map(data => {
            return <Picker.Item label={data.ProjectName} value={data.ProjId} />;
          })}
        </Picker>
      </View>
      <View style={{}}>
        {selectedProject ? (
          <View>
            <Text>Sub Project</Text>

            <Picker
              selectedValue={selectedsub}
              style={{height: 50, width: '100%'}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedsub(itemValue)
              }>
              {subProject
                .filter(obj => obj.ProjId.includes(selectedProject))
                .map(obj => {
                  return (
                    <Picker.Item label={obj.SubProj} value={obj.SubProj} />
                  );
                })}
            </Picker>
          </View>
        ) : (
          <View />
        )}
      </View>

      {/* <ModalDropdown options={["DTS-000000","DTS-000001","DTS-000002","DTS-000004","DTS-001660","DTS-003584","DTS-003657","DTS-52010","DTS-52011","DTS-525411","DTS-525412","DTS-525413","DTS-525414","DTS-525415","DTS-525416","DTS-525417","DTS-525418","DTS-525419","DTS-525420","DTS-525421","DTS-525422","DTS-525424","DTS-525425"]}/> */}
      <Text>Performa</Text>
      {/* <Cell
                key={cellIndex}
                data={cellIndex === 4 ? element(cellData, index,tableData) : cellData}
                textStyle={styles.text}
              /> */}
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row
          data={
            selectedsub == 'OMR'
              ? ['Item', 'Description', 'Unit', 'Selection', 'Quantity']
              : ['Item', 'Description', 'Unit', 'Quantity']
          }
          style={styles.head}
          textStyle={styles.text}
        />
        {/* <Rows data={tableData} textStyle={styles.text} /> */}
        {tableData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  selectedsub == 'OMR'
                    ? cellIndex == 3
                      ? material[index].Type == 'X'
                        ? elementDropdown(
                            cellData,
                            index,
                            tableData,
                            selectedsub,
                          )
                        : null
                      : cellIndex == 4
                      ? element(cellData, index, tableData, selectedsub)
                      : cellData
                    : cellData
                }
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
      <View style={{flexDirection: 'row', marginBottom: 40}}>
        <TouchableOpacity
          disabled={loader}
          style={styles.loginBtn}
          onPress={() => {
            var datas;
            AsyncStorage.getItem('Workorders').then(items => {
              items.map(item => {
                if (PMT == item.name) {
                  AsyncStorage.setItem(
                    'Workorders',
                    JSON.stringify({
                      name: PMT,
                      dts: selectedValue,
                      feeder: selectedFeeder,
                      pqc: selectedPQC,
                      project: selectedProject,
                      subproject: selectedsub,
                      materails: tableData,
                    }),
                  );
                  navigation.goBack();
                }
              });
            });

            console.log('Login Pressed');
            setLoader(true);
            // postRequest(
            //   item,
            //   () => {
            //     navigation.reset({
            //       index: 0,
            //       routes: [{name: 'MainList'}],
            //     });
            //   },
            //   'Login',
            //   name,
            //   userPassword,
            //   () => {
            //     return setLoader(false);
            //   },
            // );
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
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
    width: '100%',
    backgroundColor: '#465881',
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
});

export default UpdateDetails;
