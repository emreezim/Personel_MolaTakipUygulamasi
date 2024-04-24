//Gerekli modüllerin import edilmesi
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ImageBackground,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { app_db, useAdmin, usePersonel } from "./firebaseConfig";



//Ana sayfadaki "Giriş Yap,Kayıt Ol,Admin Girişi" butonların çalışmasını ve kullanıcıyı istediği sayfaya yönlendirmesini sağlayan kısımlar
export const LoginScreen = ({ navigation }) => {
  const personelName = usePersonel();
  const Pname = personelName.map((p) => p.Username); 
  const Ppass = personelName.map((p) => p.Password); 

  const [username, setUsername] = useState(""); //Kullanıcıdan personelName almasını sağlayan bölüm
  const [password, setPassword] = useState(""); //Kullanıcıdan personelPassword almasını sağlayan bölüm
  pername = username;

  const personel = [Ppass, Pname];//Personel bilgileri sonrasında kullancağımız kodlar için dizi içine alındı.

  const handleLogin = () => {//Kullanıcının giriş işlemlerini yapmasını sağlayan kodlar
    let durum = false;
    for (let i = 0; i < personel[0].length; i++) {
      if (username == personel[1][i] && password == personel[0][i]) {//TextInput yerine yazdığımız değer,veritabanından gelen değerlerle uyumlumu olup olmadığını kontrol eder.
        Alert.alert("Personel Girişi Başarılı");
        navigation.navigate("PersonelScreen");
        durum = true;
        break;
      }
    }
    if (durum == false) { //Bilgilerin uyuşmaması halinde kodun çalışacağı kısmı
      Alert.alert("Hatalı Giriş");
    }
  };

  const handleAdminLogin = () => {//Admin girişine yönlendireceği kısım
    navigation.navigate("AdminLoginScreen");
  };
  useFocusEffect(//Bu sayfaya her dönüldüğünde TextInput değerlenin sıfırlanmasını sağlar.
    React.useCallback(() => {
      setUsername("");
      setPassword("");
    }, [])
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.background}
      >
        <Text style={styles.title}>Giriş Yap</Text>
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.buttonContainer}>
          <Button title="Giriş Yap" onPress={handleLogin} />
          <Button
            title="Kayıt Ol"
            onPress={() => navigation.navigate("RegisterScreen")}
          />
          <Button title="Admin Girişi" onPress={handleAdminLogin} /> 
        </View>
      </ImageBackground>
    </View>
  );
};

//Görsel düzenlemeler
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
  },
});
export function getUsername() {
  return pername;
}
export default LoginScreen;
