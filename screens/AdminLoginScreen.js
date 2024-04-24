//Gerekli modülleri import ettik
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
import { useAdmin} from "./firebaseConfig";
import { useFocusEffect } from '@react-navigation/native';
//Admin giriş işlemleri ve durumlarını oluşturduğumuz kısım
const AdminLoginScreen = ({ navigation }) => {
  const AdminName = useAdmin();

  const Aname = AdminName.map((a) => a.Name);
  const Apass = AdminName.map((a) => a.Password);
  const [adminUsername, setAdminUsername] = useState("");//Kullanıcıdan adminUsername almasını sağlayan bölüm
  const [adminPassword, setAdminPassword] = useState("");//Kullanıcıdan adminPassword almasını sağlayan bölüm
  const admin = [Aname, Apass];
  const handleAdminLogin = () => {
    if (adminUsername == admin[0] && adminPassword == admin[1]) {
      Alert.alert("Admin Girişi Başarılı");

      navigation.navigate("AdminMainScreen");
    } else {
      Alert.alert("Hata", "Admin kullanıcı adı veya şifre yanlış!");
    }
  };
// useFocusEffect kullanarak TextInput değerlerini sıfırla
useFocusEffect(
  React.useCallback(() => {
    setAdminUsername("");
    setAdminPassword("");
  }, [])
);
  //Admin kullanıcı adını ve şifresinini kullanıcıdan alıp giriş yapmak için textbox,butonların ve metinlerin oluşturulduğu kısımlar
  return (
    <ImageBackground
      source={require("../assets/acd.jpg")}//Arka plan ekledik
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Admin Girişi</Text>
        <TextInput
          style={styles.input}
          placeholder="Admin Kullanıcı Adı"
          value={adminUsername}
          onChangeText={setAdminUsername}
          placeholderTextColor="white"
        />
        <TextInput
          style={styles.input}
          placeholder="Admin Şifre"
          secureTextEntry={true}
          value={adminPassword}
          onChangeText={setAdminPassword}
          placeholderTextColor="white"
        />
        <Button title="Giriş Yap" onPress={handleAdminLogin} />
      </View>
      <View style={styles.goBackButton}>
        <Button //Sol üstteki "<--" butonun çalışmasını sağlayan kodlar
          title="<--"
          onPress={() => navigation.goBack()}
          color="#007bff"
        />
      </View>
    </ImageBackground>
  );
};

//Görsel düzenlemeler
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
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
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "white",
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});

export default AdminLoginScreen;
