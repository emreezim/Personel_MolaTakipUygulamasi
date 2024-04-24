import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, Alert, FlatList, ImageBackground, StyleSheet } from 'react-native';
//Firebase ile ilgili Fonksiyonlar İmport edildi.
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { usePersonel } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const PasswordChangeScreen = () => {
  
  const [currentUsername, setCurrentUsername] = useState('');//Mevcut kullanıcı adı için kullanacağımız Değişken tanımlaması
  const [currentPassword, setCurrentPassword] = useState('');//Mevcut Şifre için kullanacağımız Değişken tanımlaması
  const [showPassword, setShowPassword] = useState(false);   //Yeni kullanıcı adı için kullanacağımız Değişken tanımlaması
  const [suggestions, setSuggestions] = useState([]);        //Yeni Şifre için kullanacağımız Değişken tanımlaması
  const personelName = usePersonel();                        //Personel koleksiyonundan gelen verileri kullanmak için Değişken tanımlaması
  const app_db = getFirestore();                             //Veritabanı bağlantısı için.
  const navigation = useNavigation();                        //Yönlendirme için kullanılan değişken

  const [newUsername, setNewUsername] = useState('');
//Yeni kullanıcı ile Mevcut kullanıcı değerlerindeki Text İşlemleri
  const handleChangeText = (text, inputType) => {
    if (inputType === 'currentUsername') {
      setCurrentUsername(text);
    } else if (inputType === 'newUsername') {
      setNewUsername(text);
    }

    if (inputType === 'newUsername' && text === '') {
      setNewUsername('');
    }

    if (text) {
      const filteredSuggestions = personelName.filter(user =>
        user.Username.toLowerCase().startsWith(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  //Flatlist den seçilen değeri Değişkene atama kısmı
  const handleSelectUser = (username, password) => {
    setCurrentUsername(username);
    setCurrentPassword(password);
    setSuggestions([]);
  };
//Kontrol ve Veritabanı Kısımları
  const handleChangePress = async () => {
    if (currentUsername === '' || currentPassword === '') {
      Alert.alert('Hata', 'Mevcut kullanıcı adı ve şifre gereklidir.');
      return;
    }

    if (newUsername === currentUsername) {
      Alert.alert('Uyarı', 'Mevcut kullanıcı adı ile yeni kullanıcı adı aynı olamaz.');
      return;
    }

    try {
      const querySnapshot = await getDocs(query(collection(app_db, 'Users'), where('Username', '==', currentUsername)));

      if (querySnapshot.empty) {
        Alert.alert('Uyarı', 'Güncellemek istediğiniz kullanıcı adı bulunamadı.');
        return;
      }
//Güncelleme işleminin yapıldığı kısım.
      const updatedUsername = newUsername !== '' ? newUsername : currentUsername;

      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        await updateDoc(docRef, {
          Username: updatedUsername,
          Password: currentPassword
        });
      });

      Alert.alert('Başarılı', 'Kullanıcı bilgileri başarıyla güncellendi.');

      setCurrentUsername('');
      setNewUsername('');
      setCurrentPassword('');
      setSuggestions([]);
    } catch (error) {
      console.error('Error updating document: ', error);
      Alert.alert('Hata', 'Kullanıcı bilgileri güncellenirken bir hata oluştu.');
    }
  };

  //Kullanıcı ,Şifre gibi butonların oluşturulduğu kısım.
  return (
    <ImageBackground
      source={require("../assets/tt.jpg")}
      style={styles.background}
    >
<View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Mevcut Kullanıcı Adı"
          placeholderTextColor="black"
          value={currentUsername}
          onChangeText={(text) => handleChangeText(text, 'currentUsername')}
        />
        <TextInput
          style={styles.input}
          placeholder="Yeni Kullanıcı Adı"
          placeholderTextColor="black"
          value={newUsername}
          onChangeText={(text) => handleChangeText(text, 'newUsername')}
        />
        {currentUsername != '' && (
          <FlatList
            style={styles.flatList}
            data={suggestions}
            renderItem={({ item }) => (
              <Text style={styles.listItem} onPress={() => handleSelectUser(item.Username, item.Password)}>{item.Username}</Text>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
        <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Şifre"
          placeholderTextColor="black"
          secureTextEntry={!showPassword}
          value={currentPassword}
          onChangeText={text => setCurrentPassword(text)}
        />
        <TouchableOpacity
          style={[styles.button, styles.showPasswordButton]}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.buttonText}>{showPassword ? 'Gizle' : 'Göster'}</Text>
        </TouchableOpacity>
        

      </View>
      <TouchableOpacity style={styles.button} onPress={handleChangePress}>
        <Text style={styles.buttonText}>Değişiklikleri Kaydet</Text>
      </TouchableOpacity>
      </View>

      

     
      <View style={styles.goBackButton}>
        <Button
          title="<--"
          onPress={() => navigation.goBack()}
          color="#007bff"
        />
      </View>
      </View>
    </ImageBackground>
  );
};

//Görsel Düzenlemeler
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 2,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 250,
  },
  flatList: {
    maxHeight: 150,
    width: 250,
  },
  listItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 200,
    borderWidth: 2,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  showPasswordButton: {
    marginLeft: 10,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: '100%',
    height: '100%',
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});

export default PasswordChangeScreen;
