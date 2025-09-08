# Arogya Mitra

Arogya Mitra is an AI-powered multilingual chatbot designed to serve as a medical assistant for rural Madhya Pradesh. The chatbot provides users with essential health-related information, including details about nearby clinics, hospitals, pharmacies, and government health schemes. It also emphasizes data privacy and user consent in compliance with HIPAA regulations.

## Features

- **Multilingual Support**: Users can interact with the chatbot in multiple languages, with a default option set to English.
- **Health Information**: The chatbot answers health-related questions, explains symptom causes, and suggests home remedies.
- **Location-Based Services**: Users can find nearby clinics, hospitals, and pharmacies based on their location.
- **Government Schemes**: Information about available government health schemes is readily accessible.
- **Data Privacy**: The application adheres to strict privacy protocols, ensuring user data is handled securely and with consent.

## Project Structure

```
arogya-mitra
├── src
│   ├── app.ts
│   ├── index.ts
│   ├── config
│   │   └── privacy.ts
│   ├── controllers
│   │   ├── chatbotController.ts
│   │   └── userController.ts
│   ├── data
│   │   ├── clinics.json
│   │   ├── hospitals.json
│   │   ├── pharmacies.json
│   │   └── schemes.json
│   ├── interfaces
│   │   └── index.ts
│   ├── middleware
│   │   └── consentMiddleware.ts
│   ├── services
│   │   ├── aiService.ts
│   │   ├── languageService.ts
│   │   └── locationService.ts
│   ├── ui
│   │   ├── components
│   │   │   ├── WelcomePage.tsx
│   │   │   ├── LanguageSelector.tsx
│   │   │   ├── ConsentModal.tsx
│   │   │   └── ChatInterface.tsx
│   │   └── styles
│   │       └── main.css
│   └── utils
│       └── helpers.ts
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd arogya-mitra
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```
Access the chatbot through your web browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
