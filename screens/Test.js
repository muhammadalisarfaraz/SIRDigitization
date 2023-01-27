import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

const Test = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const [items, setItems] = useState([
    //        { label: '-- Please Select --', value: '', imageCount: 0 },
    {
      label: 'Disconnected',
      value: 'DC',
      imageCount: 3,
      picture1Title: 'Before DC',
      picture2Title: 'After DC',
      picture3Title: 'Premise',
      isReadingRequired: 'Y',
    },
    {
      label: 'Found DC',
      value: 'FD',
      imageCount: 2,
      picture1Title: 'After DC',
      picture2Title: 'Premise',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    {
      label: 'No Meter Hook Removed',
      value: 'NM',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'N',
    },
    {
      label: 'Temporary Premises Closed',
      value: 'TPC',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'N',
    },
    {
      label: 'Permanent Premises Closed',
      value: 'PPC',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'N',
    },
    {
      label: 'Address Not Found',
      value: 'ANF',
      imageCount: 0,
      picture1Title: '',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'N',
    },
    {
      label: 'Not Allowed',
      value: 'NA',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'N',
    },
    {
      label: 'Already Paid',
      value: 'AP',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    {
      label: 'Court Case',
      value: 'CC',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    {
      label: 'Disputed billing',
      value: 'DB',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    {
      label: 'Rebate',
      value: 'R',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    {
      label: 'Warning',
      value: 'W',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    //{ label: 'Payment Made', value: 'PM', imageCount: 1, picture1Title: 'Premise', picture2Title: '', picture3Title: '' ,isReadingRequired:'Y'}
  ]);

  return (
    <ScrollView style={styles.ScrollView1}>
      <View>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod
        </Text>
        <GestureHandlerScrollView
          nestedScrollEnabled
          style={styles.ScrollView1}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod
          </Text>
          <DropDownPicker
            listMode="MODAL"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disabled={false}
            onChangeValue={item => {
              console.log('onChangeValue: ' + item);
            }}
          />
        </GestureHandlerScrollView>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod pariatur. Excepteur sint occaecat cupidatat non proident, sunt
          in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ScrollView1: {
    //flex: 1,
    //width: '100%',
    //paddingLeft: 5,
    //backgroundColor: 'green',
  },
  ScrollView2: {
    flex: 1,
    width: '50%',
    //paddingLeft: 5,
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
  },
});

export default Test;
