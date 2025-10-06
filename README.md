# CyberFeed Website

This is the official frontend for CyberFeed, a simple social media application built with React and Vite. It provides a user-friendly interface for interacting with the CyberFeed API.

---

## Links

* **Live Website**: https://cyberfeed-website.vercel.app/
* **API URL**: https://cyberfeed-controller.vercel.app
---

## Features

* **User Authentication**:
    * User registration and login.
    * Persistent sessions with JWT and refresh tokens.
    * Protected routes for authenticated users.
* **Post Management**:
    * Create new posts with text and optional image uploads.
    * View a feed of all user posts.
    * View, edit, and delete your own posts.
    * Dynamic avatars using Boring Avatars.
* **User Interface**:
    * Clean, responsive design built with Tailwind CSS.
    * Seamless navigation with React Router.

---

## Tech Stack

* **Framework**: React 19 + Vite
* **Styling**: Tailwind CSS
* **Routing**: React Router DOM
* **HTTP Client**: Axios
* **UI Components**: Boring Avatars

---

## Installation

1.  **Clone this repository:**

    ```bash
    git clone https://github.com/rfa863/cyberfeed-website.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd cyberfeed-website
    ```

3.  **Install the dependencies:**

    ```bash
    npm install
    ```

4.  **Create a `.env` file from the example:**

    ```bash
    cp .env.example .env
    ```

5.  **Set the API URL in your new `.env` file**:

    ```
    VITE_API_URL='https://cyberfeed-controller.vercel.app'
    ```

---

## Available Scripts

* **To run the app in development mode:**
    Open your browser to `http://localhost:5173`

    ```bash
    npm run dev
    ```

* **To build the app for production:**

    ```bash
    npm run build
    ```

* **To lint the project files:**

    ```bash
    npm run lint
    ```

* **To preview the production build locally:**

    ```bash
    npm run preview
    ```
