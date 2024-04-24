import React from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";

//Personel yönetimini sayfasındaki butonların istediği sekmeye yönlendirme işlevini kazandıran kısım
const PersonelManagementScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/insankay.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Personel Yönetimi</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Yeni Personel Ekle"
            onPress={() => navigation.navigate("YeniPersonelEkle")} //"Yeni Personel Ekle" butonuna basıldığında "YeniPersonelEkle" sayfasına yönlendirir
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Personel Güncelle"
            onPress={() => navigation.navigate("PasswordChangeScreen")} //"Yeni Personel Ekle" butonuna basıldığında "YeniPersonelEkle" sayfasına yönlendirir
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Personel Sil"
            onPress={() => navigation.navigate("PersonelSilScreen")}//"Personel Sil" butonuna basıldığında "PersonelSilScreen" sayfasına yönlendirir
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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});

export default PersonelManagementScreen;