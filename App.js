import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Appbar, Menu} from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomNavigationBar({navigation, back}) {
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState('');
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      {/* <Drawer.Section title="Some title">
        <Drawer.Item
          label="First Item"
          active={active === 'first'}
          onPress={() => setActive('first')}
        />
        <Drawer.Item
          label="Second Item"
          active={active === 'second'}
          onPress={() => setActive('second')}
        />
      </Drawer.Section> */}
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="My awesome app" />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }>
          <Menu.Item
            onPress={() => {
              console.log('Option 1 was pressed');
            }}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 2 was pressed');
            }}
            title="Option 2"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 3 was pressed');
            }}
            title="Option 3"
            disabled
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Root() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="Profile" component={Profile} /> */}
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={{
          header: props => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
