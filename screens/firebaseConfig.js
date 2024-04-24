// Firebase ile ilgili fonksiyonlar import edilir.
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

// Firebase bağlantısı yapmak için Gerekli yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyDGOkobFxllDHORgvU-HXUMJhUeLE0bFPI",
  authDomain: "mobilproject-ad47e.firebaseapp.com",
  projectId: "mobilproject-ad47e",
  storageBucket: "mobilproject-ad47e.appspot.com",
  messagingSenderId: "607053902057",
  appId: "1:607053902057:web:d44e6477742d3dd64c4078"
};

// Firebase uygulamasını başlatılır veya zaten açıksa başlatılan uygulamayı kullanmaya devam eder.
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Firestore veritabanına bağlanmak için bağlantı Noktası oluşturulur.
export const app_db = getFirestore(app);
// Firebase Authentication'u başlatılır ve yerel depolama kullanıcı oturum açma durumu sağlanır
export const app_auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore koleksiyonlarına referanslar oluşturulur
const Adminref = collection(app_db, "Admin");
const personelref = collection(app_db, "Users");
const Employeref = collection(app_db, "EmployeShiftTable");

// Admin koleksiyonundaki bilgileri çekmek için fonksiyon
export const useAdmin = () => {
  const [AdminName, setProducts] = useState([]);
  useEffect(() => {
    // Belge değişikliklerini dinlemek için onSnapshot Fonksiyonu kullanılır
    return onSnapshot(Adminref, (snapshot) => {
      // Snapshot'tan alınan veri state'e ayarlanır
      setProducts(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        })
      );
    });
  }, []); 
  return AdminName; // Admin koleksiyonundaki belgelerin listesini döndürür
};

// Personel koleksiyonundaki bilgileri çekmek için Fonksiyon
export const usePersonel = () => {
  const [personelName, setProducts] = useState([]);
  useEffect(() => {
    return onSnapshot(personelref, (snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        })
      );
    });
  }, []);
  return personelName;// Personel koleksiyonundaki belgelerin listesini döndürür
};

// EmployeShiftTable koleksiyondaki bilgileri çekmek için Fonksiyon
export const useSad = () => {
  const [empname, setProducts] = useState([]);
  useEffect(() => {
    return onSnapshot(Employeref, (snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        })
      );
    });
  }, []);
  return empname;// EmployeShiftTable koleksiyonundaki belgelerin listesini döndürür
};
