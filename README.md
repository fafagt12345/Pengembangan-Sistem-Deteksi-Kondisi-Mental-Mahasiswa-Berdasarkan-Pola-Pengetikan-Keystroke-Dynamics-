# Sistem Deteksi Kondisi Mental Berdasarkan Pola Pengetikan (Keystroke Dynamics)

Proyek ini adalah sistem analisis kesehatan mental berbasis web yang menggunakan teknik *Keystroke Dynamics* untuk mendeteksi indikasi kondisi psikologis mahasiswa (Normal, Stress Ringan, Stress Sedang, Stress Tinggi) berdasarkan ritme mengetik.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI & Framer Motion
- **Backend/Database**: Firebase (Firestore & Auth)
- **Storage**: Cloudinary (Avatar Upload)
- **State Management**: Zustand
- **Analytics**: Recharts

## 📋 Fitur Utama

- **Realtime Keystroke Tracking**: Mencatat *Dwell Time*, *Flight Time*, dan *WPM*.
- **Mental Health Analysis**: Algoritma heuristik untuk menentukan status mental berdasarkan pola pengetikan.
- **Interactive Dashboard**: Visualisasi data analitik untuk mahasiswa dan admin.
- **Modern Auth**: Login via Email/Password dan Google Auth.
- **Responsive Design**: Mendukung tampilan mobile dan desktop dengan mode gelap (dark mode).

## 🛠️ Persiapan Lingkungan (Setup)

### 1. Clone Repositori
```bash
git clone https://github.com/username/project-name.git
cd project-name
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env.local` di root direktori dan masukkan kredensial berikut:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
```

### 4. Menjalankan Aplikasi
```bash
npm run dev
```
Buka http://localhost:3000 di browser Anda.

## 🧪 Metodologi Penelitian

Sistem ini menangkap variabel *Keystroke Dynamics* sebagai berikut:
1. **Dwell Time**: Durasi penekanan satu tombol (Key Down ke Key Up).
2. **Flight Time**: Jeda waktu antar penekanan tombol (Key Up ke Key Down tombol berikutnya).
3. **Error Rate**: Frekuensi penggunaan backspace/delete.

Data ini kemudian diolah untuk melihat korelasi antara kecepatan/ritme mengetik dengan tingkat stres atau kelelahan kognitif.

## 🛡️ Firebase Security Rules

Pastikan untuk mengatur Firestore Rules agar data aman:
```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    match /typing_sessions/{sessionId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---
**Dikembangkan oleh:**
Mahasiswa S1 Informatika - Universitas Negeri Surabaya (UNESA)

---
*Proyek ini dibuat untuk tujuan penelitian akademis dan pengembangan sistem deteksi dini kesehatan mental.*