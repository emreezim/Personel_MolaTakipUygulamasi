//Gerekli modülleri import ettik
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app_db } from "./firebaseConfig";
const YeniPersonelEkleScreen = ({ navigation }) => {
  const [personelAdi, setPersonelAdi] = useState(""); //Kullanıcıdan Personel Adını almamızı sağlayan bölüm
  const [personelSifre, setPersonelSifre] = useState(""); //Kullanıcıdan Personel Şifresini almamızı sağlayan bölüm

  const handleEklePress = async () => {//Yeni personeli ekleyip veritabanına kaydetmesine yarayan kod blokları
    if (!personelAdi || !personelSifre) {//Her iki bilgide girilmemişse uyarı versin.
      Alert.alert("Hata", "Lütfen kullanıcı adı ve şifre giriniz.");
      return;
    }
    const q = query(collection(app_db, "Users"), where("Username", "==", personelAdi));// Kullanıcı adının veritabanında mevcut olup olmadığını kontrol eden kısım.
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {//Kayıt edilmek istenen kullanıcı veritabanında zaten mevcut ise uyarı ver.
      Alert.alert("Hata", "Bu kullanıcı adı zaten mevcut.");
      return;
    }
    await addDoc(collection(app_db, "Users"), {//Kayıt edilmek istenen kullanıcı veritabanında yok ise yeni kullanıcıyı kaydet.
      Password: personelSifre,
      Username: personelAdi,
    });

    Alert.alert("Yeni personel eklendi");

    navigation.goBack();
  };

  return (//YeniPersonelEkleScreen kısmındaki personel bilgilerini kullanıcıdan almamızı sağlayan kısımları ve metinleri oluşturduğumuz kısım
    <ImageBackground
      source={require("../assets/cc.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Yeni Personel Ekle</Text>
        <TextInput
          style={styles.input}
          placeholder="Personel Adı"
          value={personelAdi}
          onChangeText={(text) => setPersonelAdi(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Personel Şifre"
          value={personelSifre}
          onChangeText={(text) => setPersonelSifre(text)}
          secureTextEntry={true} // Şifre alanını gizler
        />
        <View style={styles.buttonContainer}>
          <Button title="Ekle" onPress={handleEklePress} />
        </View>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "80%",
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});

export default YeniPersonelEkleScreen;
