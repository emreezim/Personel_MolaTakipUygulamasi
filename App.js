//Gerekli modülleri ve sayfaları import ettik
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import PersonelScreen from "./screens/PersonelScreen";
import PersonelManagementScreen from "./screens/PersonelManagementScreen";
import AllEmployeesBreaksScreen from "./screens/AllEmployeesBreaksScreen";
import PersonelRaporuScreen from "./screens/PersonelRaporuScreen.js";
import AdminLoginScreen from "./screens/AdminLoginScreen";
import AdminMainScreen from "./screens/AdminMainScreen";
import RegisterScreen from "./screens/RegisterScreen";
import YeniPersonelEkleScreen from "./screens/YeniPersonelEkle";
import PersonelSilScreen from "./screens/PersonelSilScreen.js";
import PasswordChangeScreen from "./screens/PasswordChangeScreen.js";

const Stack = createStackNavigator(); //Stack navigator oluşturulması

const App = () => {//Sayfaların birbirine bağlanması ve yönlendirilmesini sağlayan ana kod blokları. (Burayı iskelet olarak düşünebiliriz :) )
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false // Başlığı gizlemek için
        }}
      >
        <Stack.Screen 
          name="PersonelSilScreen" 
          component={PersonelSilScreen} 
          options={({ navigation }) => ({
            headerLeftContainerStyle: { marginLeft: 10 },
            headerLeft: (props) => (
              <HeaderBackButton {...props} tintColor={'blue'} onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen 
          name="YeniPersonelEkle" 
          component={YeniPersonelEkleScreen} 
          options={({ navigation }) => ({
            headerLeftContainerStyle: { marginLeft: 10 },
            headerLeft: (props) => (
              <HeaderBackButton {...props} tintColor={'blue'} onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AdminMainScreen" component={AdminMainScreen} />
        <Stack.Screen 
          name="PersonelManagement" 
          component={PersonelManagementScreen} 
        />
        <Stack.Screen 
          name="AllEmployeesBreaks" 
          component={AllEmployeesBreaksScreen} 
        />
        <Stack.Screen 
          name="PersonelRaporuScreen" 
          component={PersonelRaporuScreen} 
        />
        <Stack.Screen 
          name="PersonelScreen" 
          component={PersonelScreen} 
        />
        <Stack.Screen 
          name="RegisterScreen" 
          component={RegisterScreen} 
        />
        <Stack.Screen 
          name="AdminLoginScreen" 
          component={AdminLoginScreen} 
        />
        <Stack.Screen
          name="PasswordChangeScreen"
          component={PasswordChangeScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;