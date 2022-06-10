import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const FacebookExample = () => {
  const [tab, setTab] = useState('Discrepany Recorded');
  const [list, setList] = useState([
    {
      id: 1,
      name: 'Discrepany Recorded',
      active: true,
    },
    {
      id: 2,
      name: 'Load Detail',
      active: false,
    },
    {
      id: 3,
      name: 'Discrepany and Findings',
      active: false,
    },
    {
      id: 4,
      name: 'Appliance Detail',
      active: false,
    },
    {
      id: 5,
      name: 'Meter Detail - System',
      active: false,
    },
    {
      id: 6,
      name: 'Meter Detail - Onsite',
      active: false,
    },
    {
      id: 7,
      name: 'Customer Acknowlegment',
      active: false,
    },
  ]);
  // let list =

  let onChangeTabHandler = (name, id) => {
    setTab(name);

    setList(
      list.map((li, index) =>
        li.name == name
          ? {
              ...li,
              active: true,
            }
          : {
              ...li,
              active: false,
            },
      ),
    );
    // setList(update);
    // console.log(list);
  };
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {list.map(li => {
            return (
              <View
                style={[
                  styles.sub_container,
                  {
                    backgroundColor: li.active == true ? '#8C52FF' : '#fff',
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => onChangeTabHandler(li.name, li.id)}>
                  <Text
                    style={[
                      styles.text_style,
                      {color: li.active == true ? '#fff' : '#000'},
                    ]}>
                    {li.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View>
        {tab == 'Discrepany Recorded' && (
          <Text style={{marginTop: 10}}>Discrepnay Recorded</Text>
        )}
        {tab == 'Load Detail' && (
          <Text style={{marginTop: 10}}>Load Detail</Text>
        )}
        {tab == 'Discrepany and Findings' && (
          <Text style={{marginTop: 10}}> Discrepany and Findings</Text>
        )}
      </View>
    </View>
  );
};

export default FacebookExample;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  sub_container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    height: 40,
    // backgroundColor: 'white',
    elevation: 2,
    padding: 5,
    marginTop: 10,
    marginLeft: 2,
    marginBottom: 10,
  },
  text_style: {
    color: '#000',
  },
});