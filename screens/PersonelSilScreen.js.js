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
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app_db } from "./firebaseConfig";
import { useNavigation } from "@react-navigation/native"; 

const PersonelSilScreen = () => {//Personel Silme İşlemlerinin çalışmasını sağlayan kod blokları
  const [username, setUsername] = useState("");//Kullanıcıdan silinmesi istenen kullanının adını almasını sağlayan bölüm
  const navigation = useNavigation(); 

  const handleDelete = async () => {//İstenilen kullanıcıyı veritabanından çekip istenilen işlevi kazandıran fonksiyon
    const usersCollectionRef = collection(app_db, "Users");

    const q = query(usersCollectionRef, where("Username", "==", username));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];

        await deleteDoc(doc(usersCollectionRef, userDoc.id));
        Alert.alert("Kullanıcı Başarıyla Silindi");
      } else {
        Alert.alert("Belirtilen kullanıcı bulunamadı.");
      }
    } catch (error) {
      console.error("Kullanıcı silinirken bir hata oluştu: ", error);
    }

    setUsername("");
  };

  return (//PersonelSilScreen sekmesindeki butonların ve metinlerin oluşturulduğu kısım
    <ImageBackground
      source={require("../assets/aa.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Personel Sil</Text>
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          placeholderTextColor="white"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Sil" onPress={handleDelete} />
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
    color: "white",
  },
  buttonContainer: {
    width: "80%",
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});

export default PersonelSilScreen;
