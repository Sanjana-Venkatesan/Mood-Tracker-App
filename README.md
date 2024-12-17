## Mood-Based Quote Generator

This React Native project is an interactive application that allows users to select their current mood and receive a relevant quote. The app uses a simple and engaging UI with colorful mood buttons, navigation between screens, and backend integration for logging moods.

### Features
- **Mood Selection:** Users can choose from a variety of moods, such as Happy, Sad, Calm, and more.
- **Dynamic Quotes:** Each mood triggers navigation to a dedicated screen displaying a mood-specific quote.
- **History Screen:** View a history of selected moods.
- **Backend Integration:** Logs selected moods to a backend server using a POST request.

### Technologies Used
- **React Native**: For building the cross-platform mobile app.
- **React Navigation**: Manages navigation between screens (Stack Navigator).
- **Expo**: Provides tools and libraries (e.g., `LinearGradient`) to enhance UI/UX.
- **Shared Element Transition**: Animations for mood button transitions.
- **Backend Integration**: Logs mood data to an external API.

### Project Structure
```
App.js                // Main navigation setup
screens/
  HomeScreen.js       // Mood selection screen
  QuoteScreen.js      // Displays mood-based quotes
  HistoryScreen.js    // Displays mood history
```

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Sanjana-Venkatesan/Mood-Tracker-App.git
   cd Mood-Tracker-App
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the project:
   ```bash
   expo start
   ```
4. Run on your device or simulator:
   - Android: Press **a**
   - iOS: Press **i**

### How to Use
1. Select a mood from the **Home Screen**.
2. The app will navigate to the **Quote Screen**, displaying a relevant quote.
3. Access previous mood logs from the **History Screen**.
4. Moods are sent to the backend for logging.

### Backend Endpoint
The app logs mood selections to the following endpoint:
```
POST https://quotes-for-your-moodz.onrender.com/moods
Content-Type: application/json
Body: { "mood": "<Selected Mood>" }
```

### Future Enhancements
- Add dynamic quote fetching based on mood.
- Implement user authentication to save personalized mood history.
- Improve animations for smoother transitions.

---

### Author
Created by **Sanjana**. Feel free to contribute or fork this repository!

---

### License
This project is licensed under the MIT License.

