//Gerekli modülleri import ettik
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  ScrollView,
} from "react-native";
import { app_db, useSad } from "./firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { getUsername } from "./LoginScreen";

//PersonelScreen kısmındaki Molayı Başlat İşe Dön Geçmiş Mola Sürelerini Göster gibi butonlarına işlev kazandıran,ilgili kısımları veritabanına ekleyen ve kullanıcıya gösteren kısım.
const PersonelScreen = ({ navigation }) => {
  const [molaBaslangic, setMolaBaslangic] = useState(null);
  const [gecmisMolalar, setGecmisMolalar] = useState([]);
  const [gecenSure, setGecenSure] = useState(0);
  const [gecmisMolalarGoster, setGecmisMolalarGoster] = useState(false);

  const empoloye = useSad();

  useEffect(() => {
    const fetchData = async () => {//Bu ekrana giriş yapan kullanıcının Mola başlangıç,bitiş ve Geçen Süre bilgilerinin Veritabanından çekildiği kısım.
      const q = query(
        collection(app_db, "EmployeShiftTable"),
        orderBy("MolaBas", "desc"),
        where("Username", "==", getUsername()),
        limit(10)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setGecmisMolalar(data);
      });
      return unsubscribe;
    };

    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    let timer;
    if (molaBaslangic) {//Mola Başlangıç butonuna işlev kazandıran kısım
      timer = setInterval(() => {
        const gecenZaman = Math.floor((new Date() - molaBaslangic) / 1000);
        setGecenSure(gecenZaman);
      }, 1000);
    } else {
      setGecenSure(0);
    }
    return () => clearInterval(timer);
  }, [molaBaslangic]);

  const molaBaslat = () => {
    setMolaBaslangic(new Date());
  };

  const molaBitir = async () => {//Molayı bitirince veritabanındaki tabloya mola süresini ekleyemeye yarayan fonksiyon kısmı
    if (molaBaslangic) {
      const bitis = new Date();
      const sure = Math.floor((bitis - molaBaslangic) / 1000);
      await addDoc(collection(app_db, "EmployeShiftTable"), {
        Username: getUsername(),
        MolaBas: molaBaslangic,
        MolaBit: bitis,
        GecSure: sure,
      });
      setMolaBaslangic(null);
    }
  };

  const toggleGecmisMolalar = () => {
    setGecmisMolalarGoster(!gecmisMolalarGoster);
  };

  const saatVeSaniyeCinsindenYaz = (sure) => {//Tutulan sürenin istenilen biçime dönüşmesini sağlayan kısım
    const saat = Math.floor(sure / 3600);
    const dakika = Math.floor((sure % 3600) / 60);
    return `${saat} Saat ${dakika} Dakika`;
  };

  return (//Personel Ekranındaki geçen süreyi gösteren "Geçmiş Mola Sürelerini Göster" butonuna basıldığına veri tablosunun kullanıcıya göstereceği kısmın içeriğini oluşturacağı bölüm.
    <ImageBackground
      source={require("../assets/kk.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Personel Ekranı</Text>
        <Text style={styles.gecenSure}>Geçen Süre: {gecenSure} saniye</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Molayı Başlat"
            onPress={molaBaslat}
            style={styles.button}
          />
          <View style={styles.buttonSpacer}></View>
          <Button title="İşe Dön" onPress={molaBitir} style={styles.button} />
        </View>
        <Button
          title={
            gecmisMolalarGoster
              ? "Geçmiş Mola Sürelerini Gizle"
              : "Geçmiş Mola Sürelerini Göster"
          }
          onPress={toggleGecmisMolalar}
          style={styles.gecmisButton}
        />
        {gecmisMolalarGoster && (
          <View style={styles.conta}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.columnHeader}> Personel</Text>
                  <Text style={styles.columnHeader}> Mola Süresi</Text>
                  <Text style={styles.columnHeader}> Başlangıç Zamanı</Text>
                  <Text style={styles.columnHeader}> Bitiş Zamanı</Text>
                </View>
                {gecmisMolalar.map((mola, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.cell}>{mola.Username} </Text>
                    <Text style={styles.cell}>
                      {saatVeSaniyeCinsindenYaz(mola.GecSure)}{" "}
                    </Text>
                    <Text style={styles.cell}>
                      {new Date(mola.MolaBas.toDate()).toLocaleTimeString()}
                      {"\n"}
                      {new Date(mola.MolaBas.toDate()).toLocaleDateString()}
                    </Text>
                    <Text style={styles.cell}>
                      {new Date(mola.MolaBit.toDate()).toLocaleTimeString()}
                      {"\n"}
                      {new Date(mola.MolaBit.toDate()).toLocaleDateString()}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
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

//Görsel düzenlemeler
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "white",
  },
  conta: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
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
    textAlign: "center",
  },
  gecenSure: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  button: {
    width: 150,
  },
  buttonSpacer: {
    width: 20,
  },
  gecmisButton: {
    marginTop: 20,
    width: 200,
    color: "white",
    fontSize: 20,
  },
  columnHeader: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    color: "white",
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: -80,
  },
});

export default PersonelScreen;
