import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

// API temel URL'sini alma
const baseURL = Constants.expoConfig.extra.apiBaseUrl;

// AuthContext oluşturuluyor
export const AuthContext = createContext();

// Token yönetimi ve kullanıcı login/logout işlemlerinden sorumlu AuthProvider
export const AuthProvider = ({ children }) => {
  // Kullanıcının oturum durumu
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Kullanıcının rolü
  const [role, setRole] = useState(null);
  // Erişim tokeni
  const [accessToken, setAccessToken] = useState(null);
  // Yenileme tokeni
  const [refreshToken, setRefreshToken] = useState(null);

  // Uygulama başlatıldığında kullanıcı oturum durumunu kontrol etme
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // AsyncStorage'dan token ve rol bilgilerini alma
        const storedToken = await AsyncStorage.getItem("accessToken");
        const storedRole = await AsyncStorage.getItem("role");

        if (storedToken && storedRole) {
          // Eğer token ve rol bilgisi varsa, bunları duruma kaydet
          setAccessToken(storedToken);
          setRole(storedRole);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Oturum durumu kontrol edilirken hata oluştu", error);
      }
    };
    checkAuth();
  }, []);

  // Kullanıcı giriş fonksiyonu
  const login = async (formData) => {
    try {
      console.log("Giriş denemesi yapılıyor, form verileri:", formData);

      // API'ye giriş isteği gönderme
      const response = await axios.post(`${baseURL}/account/login`, formData);

      console.log("Giriş yanıtı:", response);

      if (response.data && response.data.data) {
        // Gelen yanıt içerisindeki gerekli bilgileri al
        const { role, accessToken, refreshToken } = response.data.data;

        // Token ve rol bilgilerini AsyncStorage'a kaydet
        await AsyncStorage.setItem("role", role);
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);

        // Durum güncelleme işlemleri
        setRole(role);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsAuthenticated(true);

        return response;
      } else {
        console.error("Beklenmedik yanıt yapısı:", response);
      }
    } catch (error) {
      console.error("Giriş başarısız:", error);
      if (error.response) {
        console.error("Hata yanıtı:", error.response); // Hata yanıtı mevcutsa logla
      }
      if (error.request) {
        console.error("Hata isteği:", error.request); // Hata isteği mevcutsa logla
      }
      throw error;
    }
  };

  // Kullanıcı çıkış fonksiyonu
  const logout = async () => {
    try {
      // AsyncStorage'dan token ve rol bilgilerini sil
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("role");
      // Durum bilgilerini sıfırla
      setAccessToken(null);
      setRole(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Çıkış işlemi başarısız:", error);
    }
  };

  return (
    // AuthContext sağlayıcıyı döndür
    <AuthContext.Provider value={{ isAuthenticated, role, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
