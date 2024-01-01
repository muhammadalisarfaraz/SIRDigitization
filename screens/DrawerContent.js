import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon1 from 'react-native-vector-icons/MaterialIcons';

import {AuthContext} from '../components/context';

export function DrawerContent(props) {
  const paperTheme = useTheme();

  const {signOut, toggleTheme} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/images/kelogo.jpg')}
            />
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>SIR Application</Title>
                <Caption style={styles.caption}>Version: 2.2</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              style={{borderBottomColor: '#000', borderBottomWidth: 1}}
              label="Dashboard"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="download-multiple" color={color} size={size} />
              )}
              label="Download SIR"
              style={{borderBottomColor: '#000', borderBottomWidth: 1}}
              onPress={() => {
                props.navigation.navigate('LoadingScreenforDataDownload');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="update" color={color} size={size} />
              )}
              label="Update Master Data"
              style={{borderBottomColor: '#000', borderBottomWidth: 1}}
              onPress={() => {
                props.navigation.navigate('DownloadMasterData');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="database-sync" color={color} size={size} />
              )}
              label="Syncronize SIR Data"
              style={{borderBottomColor: '#000', borderBottomWidth: 1}}
              onPress={() => {
                props.navigation.navigate('DeleteSIRs');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="key-change" color={color} size={size} />
              )}
              label="Change Password"
              style={{borderBottomColor: '#000', borderBottomWidth: 1}}
              onPress={() => {
                props.navigation.navigate('ChangePassword');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="safe" color={color} size={size} />
              )}
              label="Safety Hazard Case"
              style={{borderBottomColor: '#000', borderBottomWidth: 1}}
              onPress={() => {
                props.navigation.navigate('Safety Hazard Case');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="image-move" color={color} size={size} />
              )}
              label="SIR Image Utility"
              style={{borderBottomColor: '#000', borderBottomWidth: 1}}
              onPress={() => {
                props.navigation.navigate('Post SIR Images');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="ladybug" color={color} size={size} />
              )}
              label="SIR Error Handling Utility"
              style={{borderBottomColor: '#000', borderBottomWidth: 1}}
              onPress={() => {
                props.navigation.navigate('StatusReset');
              }}
            />
            {/*
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="My Buildings"
              onPress={() => {
                props.navigation.navigate('BookmarkScreen');
              }}
            />
            */}

            {/*
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="location-enter" color={color} size={size} />
              )}
              label="Tracking Details"
              onPress={() => {
                props.navigation.navigate('SettingsScreen');
              }}
            />
              */}
          </Drawer.Section>
          <Drawer.Section title="Application Theme">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="logout" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tinyLogo: {
    width: '76%',
    height: 50,
    // borderRadius: 50,
    // borderWidth: 1,
    // paddingHorizontal: 20,
    resizeMode: 'contain',
  },
});
