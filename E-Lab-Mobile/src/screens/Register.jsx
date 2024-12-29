import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Snackbar } from "react-native-paper";
import axios from "axios";
import Constants from "expo-constants";

// API tabanlı URL'yi alıyoruz
const baseURL = Constants.expoConfig.extra.apiBaseUrl;

const RegisterScreen = ({ navigation }) => {
  // Kullanıcı verilerini ve diğer durum değişkenlerini tanımlıyoruz
  const [formData, setFormData] = useState({
    fullName: "", // Kullanıcının tam adı
    email: "", // Kullanıcının e-posta adresi
    birthDate: "", // Kullanıcının doğum tarihi
    password: "", // Kullanıcının şifresi
  });
  const [loading, setLoading] = useState(false); // Yükleniyor durumu
  const [errorMessage, setErrorMessage] = useState(""); // Hata mesajı
  const [successMessage, setSuccessMessage] = useState(""); // Başarı mesajı

  // TextInput değerlerini güncelleyen fonksiyon
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Kullanıcı kayıt işlemi fonksiyonu
  const handleRegister = async () => {
    setLoading(true); // Yükleniyor durumu başlatılıyor
    try {
      // API'ye POST isteği gönderiyoruz
      const response = await axios.post(`${baseURL}/account/register`, formData);
      setSuccessMessage("Kullanıcı başarıyla kaydedildi!"); // Başarı mesajı
      console.log(response.data); // Sunucudan dönen yanıtı konsola yazdırıyoruz
      navigation.navigate("Login"); // Kayıt başarılı ise Login ekranına yönlendir
    } catch (error) {
      // Hata durumunda hata mesajını ayarla
      setErrorMessage(error.response?.data?.message || "Kayıt başarısız oldu.");
      console.error("Kullanıcı kaydında hata:", error); // Hata mesajını konsola yazdır
    } finally {
      setLoading(false); // Yükleniyor durumu sonlandırılıyor
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16, backgroundColor: "white" }}>
      {/* Başlık */}
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>Register</Text>

      {/* Tam Ad Input Alanı */}
      <TextInput
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          marginBottom: 16,
        }}
        placeholder="Tam Ad"
        value={formData.fullName}
        onChangeText={(value) => handleChange("fullName", value)}
      />

      {/* E-posta Input Alanı */}
      <TextInput
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          marginBottom: 16,
        }}
        placeholder="E-posta"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
      />

      {/* Doğum Tarihi Input Alanı */}
      <TextInput
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          paddingLeft: 10,
          marginBottom: 16,
        }}
        placeholder="Doğum Tarihi (YYYY-MM-DD)"
        value={formData.birthDate}
        onChangeText={(value) => handleChange("birthDate", value)}
      />

      {/* Şifre Input Alanı */}
      <TextInput
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          marginBottom: 16,
        }}
        placeholder="Şifre"
        secureTextEntry // Şifre alanı gizli
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
      />

      {/* Kayıt Butonu */}
      <Button title={loading ? "Kayıt Yapılıyor..." : "Kayıt Ol"} onPress={handleRegister} disabled={loading} />

      {/* Başarı Mesajı */}
      <Snackbar
        visible={!!successMessage}
        onDismiss={() => setSuccessMessage("")}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: "green", marginBottom: 20 }}
      >
        {successMessage}
      </Snackbar>

      {/* Hata Mesajı */}
      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage("")}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: "red", marginBottom: 20 }}
      >
        {errorMessage}
      </Snackbar>

      {/* Giriş Ekranına Yönlendirme */}
      <Text style={{ textAlign: "center", marginTop: 16 }}>
        Hesabın zaten var mı?{" "}
        <Text style={{ color: "blue" }} onPress={() => navigation.navigate("Login")}>
          Giriş yap
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;
