# TeamInspire_OCBC


# OCBC IVR Ignite Suite

A repository containing four modern React Native applications for banking automation, user experience, and voice interaction research.

***

## Applications Included

- **FAQ_Revamp**
  - Enhanced FAQ system with interactive search and updated content modules.
- **PhoneIVR**
  - Touch-tone IVR menu demo app with text-to-speech and menu navigation.
- **AI Chatbot**
  - Conversational AI demo app for customer support and info retrieval.
- **Auto Translation**
  - Automatic translation utility for chat and IVR messaging, multi-language support.

***

## Table of Contents

- [Applications Included](#applications-included)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Environment Variables](#environment-variables)
    - [Installing Dependencies](#installing-dependencies)
    - [Android Setup](#android-setup)
    - [Running the Apps](#running-the-apps)
- [Usage](#usage)
- [Repository Structure](#repository-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

***

## Tech Stack

- React Native (TypeScript/JavaScript)
- react-native-tts, react-navigation, Expo
- Node.js, Android Studio, JDK 17+
- Additional AI/translation APIs as needed

***

## Setup

### Prerequisites

- Node.js (LTS)
- Android Studio (SDK, emulator, build-tools)
- JDK 17+
- Mac with Xcode (if building for iOS)

### Environment Variables

- Set `ANDROID_HOME` to your SDK directory:
  ```
  D:\Android\Sdk
  ```
- Add SDK `platform-tools` etc. to system PATH.

### Installing Dependencies

For **each app folder**, run:
```bash
npm install
```

### Android Setup

- In `android/local.properties` (inside each app’s `android` folder):
  ```
  sdk.dir=D:/Android/Sdk
  ```

### Running the Apps

1. Open your desired app folder (e.g., `PhoneIVR`) in VS Code.
2. Start Android emulator in Android Studio.
3. In project root, run:
    ```bash
    npx react-native run-android
    ```
4. For iOS (Mac only):
    ```bash
    npx react-native run-ios
    ```

***

## Usage

- Launch the individual app on your emulator or device.
- Interact with their unique features:
  - IVR menus (`PhoneIVR`)
  - FAQ search (`FAQRevamp`)
  - AI conversation (`AI Chatbot`)
  - Translate/chat (`Auto Translation`)

***

## Repository Structure

```
  FAQ_Revamp/
    App.tsx
  PhoneIVR/
    android/
    ios/
    App.tsx
  AI Chatbot/
  Auto Translation/
  .gitignore
  README.md
```

***

## Troubleshooting

- **jcenter() Gradle error:** In `node_modules/react-native-tts/android/build.gradle`, replace `jcenter()` with `mavenCentral()`
- **SDK or build issues:** Set proper `local.properties`, `ANDROID_HOME`, reboot, verify with `npx react-native doctor`
- **Text-to-Speech or AI errors:** Update packages, review API configs.

***

## License
