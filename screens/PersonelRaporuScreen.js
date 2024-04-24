import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  FlatList,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { app_db } from "./firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
//Personel Raporları sayfasındaki "Başlangıç Tarihi Seç" ve "Bitiş Tarihi Seç" butonlarına işlev kazandırdığı kısım
const PersonelRaporuScreen = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePickerModal, setShowStartDatePickerModal] =
    useState(false);
  const [showEndDatePickerModal, setShowEndDatePickerModal] = useState(false);

  const navigation = useNavigation(); 

  useEffect(() => {//Veritabanından mola başlangıç ve bitiş tarihlerinin çekilmesini sağlayan 
    if (startDate && endDate) {
      const fetchData = async () => {
        const endDateTime = new Date(endDate);
        endDateTime.setDate(endDateTime.getDate());
        const startDatetime = new Date(startDate);
        startDatetime.setDate(startDatetime.getDate() - 1);

        const q = query(
          collection(app_db, "EmployeShiftTable"),
          where("MolaBas", ">", startDatetime),
          where("MolaBit", "<", endDateTime)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = {};
          querySnapshot.forEach((doc) => {
            const item = doc.data();
            if (data[item.Username]) {
              data[item.Username].push(item);
            } else {
              data[item.Username] = [item];
            }
          });
          setFilteredData(data);
        });

        return unsubscribe;
      };

      fetchData();
    }
  }, [startDate, endDate]);
//Başlangıç ve bitiş tarihlerini seçmemizi sağlayan ekranın çalışmasını sağlayan kısım.
  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePickerModal(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePickerModal(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const showStartDatePicker = () => {
    setShowStartDatePickerModal(true);
  };

  const showEndDatePicker = () => {
    setShowEndDatePickerModal(true);
  };

  const calculateTotalMolaSure = (shifts) => {
    let totalSeconds = 0;

    shifts.forEach((shift) => {
      const fark = shift.GecSure;
      
      totalSeconds += fark;
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${hours} saat ${minutes} dakika ${seconds} saniye`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.username}</Text>
      <Text>Toplam Mola Süresi: {calculateTotalMolaSure(item.shifts)}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/foto.jpg")}
      style={styles.container}
    >
      <Text style={styles.header}></Text>
      <Text style={styles.header}>Personel Raporları</Text>
      <View style={styles.datePickerContainer}>
        <Button
          onPress={showStartDatePicker}
          title="Başlangıç Tarihi Seç"
          color="#007bff"
        />
        <View style={{ width: 10 }} />
        <Button
          onPress={showEndDatePicker}
          title="Bitiş Tarihi Seç"
          color="#007bff"
        />
      </View>

      {showStartDatePickerModal && (//Başlangıç ve bitiş tarihlerini seçmemizi sağlayan ekranın gözükmesini sağlayan kısım.
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeStartDate}
          locale="tr"
        />
      )}

      {showEndDatePickerModal && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeEndDate}
          locale="tr"
        />
      )}

      {Object.keys(filteredData).length === 0 ? (
        <Text style={styles.emptyText}>Veri bulunamadı.</Text>
      ) : (
        <FlatList
          data={Object.entries(filteredData).map(([username, shifts]) => ({
            username,
            shifts,
          }))}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  item: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 100,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
    color: "white",
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});

export default PersonelRaporuScreen;
