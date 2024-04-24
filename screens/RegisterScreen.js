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
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app_db } from "./firebaseConfig";
const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState(""); //Kullanıcıdan username almasını sağlayan bölüm
  const [password, setPassword] = useState(""); //Kullanıcıdan şifre almasını sağlayan bölüm

  const handleRegister = async () => {//Kullanının giriş yapmasını ve bunu veritabanına kayıt olmasını sağlayan kod blokları
    if (!username || !password) {//Her iki bilgide girilmemişse uyarı versin.
      Alert.alert("Hata", "Lütfen kullanıcı adı ve şifre giriniz.");
      return;
    }
    const q = query(collection(app_db, "Users"), where("Username", "==", username));//// Kullanıcı adının veritabanında mevcut olup olmadığını kontrol eden kısım.
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {//Kayıt edilmek istenen kullanıcı veritabanında zaten mevcut ise uyarı ver.
      Alert.alert("Hata", "Bu kullanıcı adı zaten mevcut.");
      return;
    }
    await addDoc(collection(app_db, "Users"), {//Kayıt edilmek istenen kullanıcı veritabanında yok ise yeni kullanıcıyı kaydet.
      Password: password,
      Username: username,
    });
  
      Alert.alert("Başarılı", "Kayıt işlemi başarıyla tamamlandı.");
      navigation.goBack();
  };

  return (//Kullanıcı Adını ve Şifreyi kullanıcıdan almamızı sağlayan sayfa içindeki metinleri oluşturduğumuz kısım 
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/abc.jpg")}
        style={styles.background}
      >
        <Text style={styles.title}>Kayıt Ol</Text>
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
        <Button title="Kayıt Ol" onPress={handleRegister} />
        <View style={styles.goBackButton}>
        <Button //Sol üstteki "<--" butonun çalışmasını sağlayan kodlar
          title="<--"
          onPress={() => navigation.goBack()}
          color="#007bff"
        />
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
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});

export default RegisterScreen;
