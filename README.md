# LumFlights API

LumFlights, Nest.js framework'ü kullanılarak geliştirilmiş modern bir uçuş rezervasyon sistemi API'sidir.

## 🚀 Teknolojiler

- **Framework:** [Nest.js](https://nestjs.com/) (v11)
- **Kimlik Doğrulama:** Firebase Authentication
- **Veritabanı:** Firebase Firestore
- **Dil:** TypeScript
- **Deployment:** Vercel

## 🛠️ Özellikler

- **Rol Tabanlı Yetkilendirme**
  - Admin ve Staff rolleri
  - Guard'lar ile güvenli endpoint erişimi
  - Firebase Authentication entegrasyonu

- **Rezervasyon Yönetimi**
  - Rezervasyon oluşturma
  - Rezervasyon listeleme (temel ve detaylı görünüm)
  - Rezervasyon iptal etme
  - Rezervasyon durumu takibi

- **Güvenlik**
  - Firebase Authentication ile token bazlı güvenlik
  - CORS yapılandırması
  - Role-based access control (RBAC)

## 🏗️ Proje Yapısı

## 👥 Demo Hesapları

Uygulamayı test etmek için aşağıdaki hesapları kullanabilirsiniz:

### Admin Hesabı
- **Email:** admin@lumflights.com
- **Şifre:** Admin123!
- **Yetkiler:** Tüm işlemlere tam erişim

### Staff Hesapları
Ana Staff hesabı:
- **Email:** staff@lumflights.com
- **Şifre:** Staff123!

Diğer Staff hesapları:
- **Email Pattern:** staff1@lumflights.com - staff9@lumflights.com
- **Şifre (tümü için):** Staff123!
- **Yetkiler:** Temel rezervasyon işlemleri

> **Not:** Bu hesaplar demo amaçlıdır ve sadece test için kullanılmalıdır.
