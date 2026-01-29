# 📚 Personal Library App

Aplikacja webowa typu **full-stack** służąca do zarządzania biblioteczką książek.  
Umożliwia  dodawanie książek z Google Books, oznaczanie ulubionych pozycji oraz tworzenie notatek przypisanych do książek.

Projekt został wykonany jako aplikacja kliencko-serwerowa z rozdzielonym frontendem i backendem.

---

## 🎯 Cel projektu

Celem projektu było:
- stworzenie kompletnej aplikacji webowej
- wykorzystanie nowoczesnego stosu technologicznego (React, Vite, Tailwind CSS)
- implementacja REST API
- praca z MongoDB
- zachowanie czytelnej architektury i dobrej organizacji kodu

---

## 🛠️ Wykorzystane technologie

### Frontend
- **React 19**
- **Vite**
- **React Router DOM**
- **Tailwind CSS 3**
- **PostCSS**
- **Fetch API**
- **Context API**

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**

### Zewnętrzne API
**Google Books API**
- wyszukiwanie książek po tytule
- pobieranie metadanych (autor, okładka, rok wydania)
- dane normalizowane przed zapisem do bazy
  
---

## 🧠 Architektura frontendu

### Założenia

- separacja logiki (pages / components / api)
- brak zewnętrznych bibliotek UI
- stylowanie wyłącznie przez **Tailwind CSS**
- komponenty wielokrotnego użytku
- czytelny routing

### Stylowanie

- Tailwind CSS (podejście *utility-first*)
- responsywność (*mobile-first*)
- animacje CSS (`fade-in`)
- brak klasycznych plików `.css` per komponent

---
|


