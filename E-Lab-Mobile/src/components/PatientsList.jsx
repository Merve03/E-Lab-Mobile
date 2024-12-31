import React from "react";
import { View, Text } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

import axiosInstance from "../utils/axiosSetup"; // API'ye bununla istek yollanacak

// Bu bileşen, admin (doktor) ekranına eklenecek olan hastaların listelendiği bir bileşen.
const PatientsList = () => {
  return (
    <View
      style={{
        flex: 1, // Bileşeni esnek bir şekilde ekranın tamamına yay
        justifyContent: "center", // İçeriği dikey olarak ortala
        alignItems: "center", // İçeriği yatay olarak ortala
      }}
    >
      {/* react-native-paper kütüphanesinin Card bileşeni ile stil verilmiş bir kapsayıcı */}
      <Card
        style={{
          width: "80%", // Kart genişliğini ekranın %80'i kadar yap
          padding: 16, // Kartın içindeki elemanlara boşluk ekle
        }}
      >
        <Title>Hastalar listelenecek</Title>
        {/* Hastalar burada listelenecek alan */}
      </Card>
    </View>
  );
};

export default PatientsList;
