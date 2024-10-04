# Movie App Frontend

This is the frontend of the **Movie App**, a web application that allows users to search for and explore various movies. It uses modern web technologies to provide a seamless and responsive user experience.

## Features

- **Search Movies**: Search for your favorite movies by title.
- **Movie Details**: View detailed information about each movie including synopsis, cast, release date, and ratings.
- **Responsive Design**: Fully responsive design, optimized for mobile and desktop views.
- **User-Friendly Interface**: Simple, clean, and intuitive UI.

## Built With

- **React**: A JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for API calls.
- **React Router**: Handles navigation and routing within the app.
- **TailwindCSS**: Used for styling the application with a modular and maintainable approach.

## Installation

1. **Clone the repository**:
 ```bash
 git clone https://github.com/namhh-dev/movie-app-fe.git
 cd movie-app-fe
 ```
2. Install dependencies: Make sure you have Node.js installed, then run:
```bash
npm install
```

3. Start the application: To run the app in development mode:
```bash
npm start
```
The app will be available at http://localhost:3000.

Available Scripts
In the project directory, you can run:
npm start: Runs the app in development mode.
npm run build: Builds the app for production.
npm run eject: Exposes the configuration files for advanced users.
API Configuration
This project uses the TMDb API for fetching movie data. To configure the API:

Get your API key from TMDb.
Create a .env file in the root of the project.
Add the following line to the .env file:
```bash
REACT_APP_API_KEY=your_tmdb_api_key_here
```
Folder Structure
src/components: Reusable UI components.
src/pages: Main pages of the application (e.g., Home, Movie Details).
src/services: Handles API calls.
Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

License
This project is licensed under the MIT License - see the LICENSE file for details.
[MIT](https://choosealicense.com/licenses/mit/)
