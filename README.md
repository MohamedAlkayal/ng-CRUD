# Angular User Management System

This project is an Angular-based user management system that allows users to register, view, update, and delete user profiles. It utilizes Angular framework for the frontend and JSON Server for backend emulation.

## Features

- User Registration: Users can register with their name, email, date of birth, and phone number.
- View Profile: Users can view their profile information.
- Update Profile: Users can edit and update their profile information.
- Delete Profile: Users can delete their profile from the system.

## Setup

1. **Clone the repository:**

    ```bash
    git clone <repository-url>


2. **Install Dependencies:**
Navigate to the project directory and install the dependencies using npm or yarn:

    npm install


3. **Start JSON Server:**
The project uses JSON Server to emulate a backend REST API. Start JSON Server by running the following command:

    son-server --watch db.json


4. **Start Angular Development Server:**
Open a new terminal window and start the Angular development server:

    ng serve


5. **Open the Application:**
Once both servers are running, open your web browser and navigate to `http://localhost:4200/` to access the application.

## Technologies Used

- Angular
- JSON Server
- HTML/CSS
- TypeScript

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.


## Project Structure

- `src/app/components`: Contains all Angular components.
- `src/app/services`: Contains Angular services for API communication.
- `src/app/models`: Contains TypeScript interfaces for data models.
- `src/assets`: Contains static assets such as images or CSS files.
- `db.json`: JSON file serving as the mock database for JSON Server.

