This is a simple weather application built with React. It allows users to search for any city and get current weather information. The app remembers the last searched city and pre-fills it on reload.

Features:

* Search weather by city
* Displays temperature, min/max temperature, humidity, feels-like temperature, and description
* Shows a loader while fetching data
* Handles errors for invalid city names
* Remembers last searched city using `localStorage`
* Shows a 5-day forecast when clicked
* Responsive design for mobile devices

Setup & Run Locally:

Clone the repository and install dependencies:

```bash
git clone https://github.com/Shruti2024-star/weather-app
cd weatherapi
npm install
```

Create a `.env` file in the root and add your OpenWeatherMap API key:

```env
VITE_API_KEY=your_api_key_here
```

Notes:

* Replace `your_api_key_here` with your actual API key
* Do **not** commit your `.env` file
* Vite automatically loads variables starting with `VITE_`

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

Running Tests (optional):

```bash
npm run test
```

Assumptions & Design Choices:

* API Choice: OpenWeatherMap API
* State Management: `useState` hooks
* UI Library: Material-UI (MUI)
* Error Handling: User-friendly messages for invalid cities
* Loader: Spinner while fetching data
* 5-Day Forecast: Added
* Responsive Design: Mobile optimized

Future Enhancements:

* Store full weather data in `localStorage`
* Improved styling and animations
* Add temperature trend graph

Live Demo:
[View Live App](https://weather-app-git-main-shrutis-projects-0dfe08cb.vercel.app/)








 











