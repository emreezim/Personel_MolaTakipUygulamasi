//Gerekli modülleri import ettik
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useSad } from "./firebaseConfig";

//Kullanıcının mola süresini başlatma durdurma gibi fonksiyonlarının bulunduğu kısım
const AllEmployeesBreaksScreen = ({ navigation }) => {
  const employees = useSad();

  const employeesData = employees.map((employee) => {
    const molaBas = new Date(employee.MolaBas.toDate());//Mola başlangıç tarihini veritabanından çekme.
    const molaBit = new Date(employee.MolaBit.toDate());//Mola bitiş tarihini veritabanından çekme.

    return {
      name: employee.Username,
      molaSuresi: employee.GecSure,
      molaBas: molaBas,
      molaBit: molaBit,
    };
  });

  employeesData.sort((a, b) => b.molaBas - a.molaBas);

  return (// Arka plan ve sayfanın içinde bulunan metinlerin kullanıldığı kısım.
    <ImageBackground
      source={require("../assets/zaman.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <ScrollView style={styles.scrollView}>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.columnHeader}>          Personel</Text>
              <Text style={styles.columnHeader}> Mola Süresi</Text>
              <Text style={styles.columnHeader}> Mola Başlangıç</Text>
              <Text style={styles.columnHeader}> Mola Bitiş</Text>
            </View>
            {}
            {employeesData.map((employee, index) => ( //Mola sürelerinin bitişini başlangıcını veritabanına kaydetmeyi yarayan kısımlar.
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{employee.name}</Text>
                <Text style={styles.cell}>{employee.molaSuresi} sn</Text>
                <Text style={styles.cell}>
                  {employee.molaBas.toLocaleDateString()} {"\n"}
                  {employee.molaBas.toLocaleTimeString()}
                </Text>
                <Text style={styles.cell}>
                  {employee.molaBit.toLocaleDateString()} {"\n"}
                  {employee.molaBit.toLocaleTimeString()}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
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
    textTransform: "uppercase",
  },
  scrollView: {
    width: "100%",
  },
  table: {
    borderWidth: 1,
    borderColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  columnHeader: {
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    color: "black",
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});

export default AllEmployeesBreaksScreen;
