//Gerekli modüllerin import edilmesi
import React from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";

const AdminMainScreen = ({ navigation }) => {

  //Admin menüsü çatısı altında bulunan sekmelerin butonları bulunan sayfalara yönlendirilmesini(navigate etmesini) ve metinlerin oluşturulduğu kısım.
  return (
    <ImageBackground
      source={require("../assets/asdf.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Admin Menüsü</Text>
        <View style={styles.buttonContainer}>
          <Button //"Personel Yönetimi" butonuna basıldığında "PersonelManagement" sayfasına git.
            title="Personel Yönetimi"
            onPress={() => navigation.navigate("PersonelManagement")}
          />
          <Button //"Tüm Personellerin Mola Süreleri" butonuna basıldığında "AllEmployeesBreaks" sayfasına git.
            title="Tüm Personellerin Mola Süreleri"
            onPress={() => navigation.navigate("AllEmployeesBreaks")}
          />
          <Button //"Personel Raporu" butonuna basıldığında "PersonelRaporuScreen" sayfasına git.
            title="Personel Raporu"
            onPress={() => navigation.navigate("PersonelRaporuScreen")}
          />
          <Button //"Çıkış Yap" butonuna basıldığında "AdminLoginScreen" sayfasına git.
            title="Çıkış Yap"
            onPress={() => navigation.navigate("AdminLoginScreen")}
          />
        </View>
      </View>
      <View style={styles.goBackButton}>
        <Button
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
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    marginTop: 20,
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});

export default AdminMainScreen;
