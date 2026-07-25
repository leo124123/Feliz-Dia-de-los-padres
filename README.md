# ¡Feliz Día del Padre! ❤️ - Aplicación Móvil Interactiva

Una aplicación móvil interactiva, emotiva e intuitiva construida con **React Native** y **Expo SDK 54**, diseñada especialmente para celebrar el Día del Padre en familia.

![Expo SDK 54](https://img.shields.io/badge/Expo-SDK%2054-000000?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge)

---

## ✨ Características Principales

- 👨‍👩‍👧‍👦 **Secciones de la Familia:** 3 módulos interactivos dedicados a **Esposa ❤️**, **Hijo 👦** e **Hija 👧**.
- 🔤 **Desafío de Adivinanza (El Ahorcado):** El papá debe descifrar la palabra secreta con ayuda de pistas e intentos de vida. **No se puede acceder a la carta hasta resolver el juego.**
- 💌 **Carta Animada (Sobre de Regalo):** Al tocar el sello en el centro del sobre, este se abre con una animación fluida revelando la carta emotiva personalizada.
- 🏆 **Recompensa y Gran Final:** Al completar las 3 secciones, se activa automáticamente la pantalla de celebración con confeti, trofeo dorado y el mensaje principal: **"¡PAPI, TE AMAMOS! ❤️"**.
- 🔄 **Persistencia de Estado:** Marca cada sección como leída (`✓ Carta Leída`) y permite reiniciar el avance para revivir la experiencia cuantas veces quiera.

---

## 🛠️ Estructura del Proyecto

```text
Feliz dia de los padres/
├── App.js                   # Navegación principal y estado de la aplicación
├── index.js                 # Punto de entrada registrado para Expo y pnpm
├── app.json                 # Configuración del paquete y manifest de Expo
├── package.json             # Dependencias (Expo SDK 54, React Native 0.81)
└── src/
    ├── data/
    │   └── familyData.js    # Palabras secretas, pistas y cartas personalizadas
    └── components/
        ├── MainMenu.js      # Menú de selección de personajes con barra de progreso
        ├── HangmanGame.js   # Juego de adivinanza estilo ahorcado
        ├── EnvelopeLetter.js# Carta interactiva con sobre animado
        └── GrandFinale.js   # Pantalla de celebración final "¡Papi te amamos!"
```

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/leo124123/Feliz-Dia-de-los-padres.git
cd Feliz-Dia-de-los-padres
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Iniciar el servidor de desarrollo Expo
```bash
pnpm start
```
o
```bash
npx expo start
```

---

## 📱 Probar en tu Celular con Expo Go

1. Descarga la aplicación **Expo Go** desde Google Play Store (Android) o App Store (iOS).
2. En Expo Go, escanea el código QR proyectado en la terminal o selecciona **"Enter URL manually"** e ingresa la IP local de tu servidor (ej. `exp://192.168.100.150:8082`).

---

## ✏️ Personalización de Contenidos

Para cambiar las palabras secretas, pistas o cartas de amor, edita el archivo:
📁 `src/data/familyData.js`

```javascript
export const FAMILY_DATA = [
  {
    id: 'esposa',
    role: 'Esposa',
    word: 'AMOR',
    hint: 'Pista: Lo que construimos juntos cada día...',
    messageTitle: 'Para el hombre de mi vida 💖',
    message: 'Tu mensaje personalizado aquí...'
  },
  // ...
];
```

---

## 📜 Licencia

Desarrollado con ❤️ para celebrar a todos los padres en su día.
