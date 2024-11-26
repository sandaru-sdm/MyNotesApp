# MyNotes App

MyNotes is a note-taking application with a PHP backend server and a React Native mobile frontend.

## Features

- User registration and login
- Add, view, update, and delete notes
- Smooth navigation and persistent data storage

## Requirements

- Node.js (v16 or higher)
- Expo CLI
- XAMPP (for MySQL and Apache servers)
- MySQL database
- PHP
- Android or iOS emulator/device

## Setup Instructions

### Backend (PHP Server)

1. **Install XAMPP**
   - Download and install from [XAMPP website](https://www.apachefriends.org/)
   - Start Apache and MySQL modules from the XAMPP control panel

2. **Set Up MySQL Database**
   - Open phpMyAdmin at `http://localhost/phpmyadmin`
   - Create a database named `mynotes`
   - Create tables for users and notes (see Database Configuration section)

3. **Configure Backend**
   - Place `MyNotesServer` folder in XAMPP's `htdocs` directory
   - Update `connection.php` with your database credentials

4. **Start Backend Server**
   - Access server at `http://localhost/MyNotesServer`

### Frontend (React Native App)

1. **Install Node.js**
   - Download and install from [Node.js website](https://nodejs.org/)

2. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

3. **Set Up React Native Project**
   ```bash
   cd MyNotesApp-main
   npm install
   ```

4. **Run the App**
   ```bash
   npm start
   ```
   - Use Expo developer tools to choose platform

## Database Configuration

### Create Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

### Create Notes Table
```sql
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Troubleshooting

### Server Issues
- Ensure XAMPP Apache and MySQL services are running
- Check for typos in `connection.php`

### App Issues
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Clear Expo cache
expo start -c
```

## License
Open-source project. Contributions welcome!

## Contact
For issues or contributions, please open a GitHub issue or submit a pull request.
