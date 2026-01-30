# 📚 Personal Library App

Aplikacja internetowa do zarządzania osobistą kolekcją książek. 
Pozwala użytkownikom na tworzenie wirtualnej biblioteki, wyszukiwanie nowych pozycji za pomocą Google Books API oraz prowadzenie notatek dla każdej książki.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## 📸 Zrzuty ekranu

| Logowanie | Biblioteka | Google Api |
|:---------:|:-----------------:|:-----------------:|
| ![Login Screen](./ss/login.png) | ![Library Screen](./ss/home.png) | ![Library Screen](./ss/api.png) |

## ✨ Główne funkcjonalności

* **🔐 Autentykacja:** Bezpieczne logowanie i rejestracja użytkowników (JWT). (niesety tylko autentykacja "konto" jest jedno.)
* **🌍 Integracja z Google Books:** Wyszukiwanie książek w zewnętrznej bazie i dodawanie ich jednym kliknięciem.
* **📝 Notatki:** Możliwość dodawania, wyświetlania i usuwania osobistych notatek do każdej książki.
* **⭐ Ulubione:** Oznaczanie książek jako ulubione i filtrowanie widoku.
* **🎨 Nowoczesny UI:** Responsywny interfejs zbudowany w oparciu o **Tailwind CSS** (Grid, Flexbox, Glassmorphism).
* **🔎 Filtrowanie:** Szybkie przeszukiwanie własnej kolekcji po tytule lub autorze.

## 🛠️ Technologie

**Frontend:**
* React (Vite)
* Tailwind CSS (Styling)
* React Router DOM (Nawigacja)
* Context API (Zarządzanie stanem autoryzacji)

**Backend:**
* Node.js & Express
* MongoDB & Mongoose (Baza danych)
* JSON Web Token (Autentykacja)

## 🚀 Instalacja i uruchomienie

Postępuj zgodnie z instrukcją, aby uruchomić projekt lokalnie.

### Wymagania wstępne
* Node.js (wersja 14+)
* Baza danych MongoDB (lokalna lub Atlas)
* Tailwind v13

### 1. Klonowanie repozytorium
```bash
git clone [https://github.com/twoj-nick/personal-library-app.git](https://github.com/twoj-nick/personal-library-app.git)
cd personal-library-app
```
### ⚙️ 2. Backend (Serwer)

Przejdź do folderu backendu:

```bash
cd backend
npm install
```
Utwórz plik .env w katalogu backend i uzupełnij dane:

```bash
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.cof2i8k.mongodb.net/?appName=cluster
JWT_SECRET=twoj_klucz
```
Uruchom serwer:

```bash
npm run dev
```
### 💻 3. Frontend (Klient)

W nowym oknie terminala przejdź do folderu frontendu:

```bash
cd frontend
npm install
```
Upewnij się, że Tailwind CSS jest zainicjalizowany:

```bash
npx tailwindcss init -p
```
Uruchom aplikację:

```bash
npm run dev
```
### 🤝 Autor

Szymon W







