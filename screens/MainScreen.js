//Gerekli modülleri import ettik
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

//Ana ekrana yönlendirmesini sağlayan kod blokları
export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Ekran</Text>
      <Button title="Çıkış Yap" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Admin Girişi"
        onPress={() => navigation.navigate("AdminLoginScreen")}
      />{" "}
      {}
    </View>
  );
}

//Görsel düzenlemeler
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
