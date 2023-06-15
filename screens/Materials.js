/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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

function Material({navigation}, props) {
  const [name, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFeeder, setSelectedFeeder] = useState('');
  const [selectedPQC, setSelectedPQC] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedsub, setSelectedsub] = props.selectedsub;
  const [loader, setLoader] = useState(false);
  const item = {};
  const tableHead = ['Item', 'Description', 'Quantity'];
  const tableData = [
    ['1', '2', '3'],
    ['a', 'b', 'c'],
    ['1', '2', '3'],
  ];

  const material = [
    {
      __metadata: {
        id: "https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_MATERIALS_LISTSet('2')",
        uri: "https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_MATERIALS_LISTSet('2')",
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
  const element = (data, index) => (
    // <TouchableOpacity onPress={() => this._alertIndex(index)}>
    //   <View style={styles.btn}>
    //     <Text style={styles.btnText}>button</Text>
    //   </View>
    // </TouchableOpacity>
    <TextInput />
  );
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Text>Material</Text>
        {selectedsub ? (
          <Picker
            // selectedValue={selectedsub}
            style={{height: 50, width: '100%'}}
            // onValueChange={(itemValue, itemIndex) => setSelectedsub(itemValue)}>
          >
            {/* {material.map(data => {
            return <Picker.Item label={data.Maktx} value={data.Maktx} />;
          })} */}
            {material
              .filter(obj => obj.SubProj.includes(selectedsub))
              .map(obj => {
                return <Picker.Item label={obj.Maktx} value={obj.Maktx} />;
              })}
            {/* {material.reduce(function(filtered, option) {
            if (option.SubProj == selectedsub) {
              var someNewValue = {name: option.name, newProperty: 'Foo'};
              filtered.push(someNewValue);
            }
            return (
              <Picker.Item label={filtered.Maktx} value={filtered.Maktx} />
            );
          }, null)} */}
          </Picker>
        ) : (
          <View />
        )}
      </View>

      {/* <ModalDropdown options={["DTS-000000","DTS-000001","DTS-000002","DTS-000004","DTS-001660","DTS-003584","DTS-003657","DTS-52010","DTS-52011","DTS-525411","DTS-525412","DTS-525413","DTS-525414","DTS-525415","DTS-525416","DTS-525417","DTS-525418","DTS-525419","DTS-525420","DTS-525421","DTS-525422","DTS-525424","DTS-525425"]}/> */}
      <Text>Performa</Text>

      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {/* <Rows data={tableData} textStyle={styles.text} /> */}
        {tableData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={cellIndex === 2 ? element(cellData, index) : cellData}
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          disabled={loader}
          style={styles.loginBtn}
          onPress={() => {
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
        <TouchableOpacity
          disabled={loader}
          style={styles.loginBtn}
          onPress={() => {
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
          <Text style={{color: 'white', fontSize: 18}}>Post</Text>
        </TouchableOpacity>
      </View>
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
    width: '45%',
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

export default Material;
