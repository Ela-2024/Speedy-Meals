# Speedy Meals

Welcome to **Speedy Meals**, a meal management application built for the JavaScript Belt Exam. This application allows users to add their favorite dishes, view details, update them, and delete them from a database.

## Features

### **Red Belt Features**
- **Dashboard:** Displays all meals currently available.
- **Add Meals:** Users can add new meals.
- **Meal Details Page:** Shows detailed information about a meal.
- **Update Meals:** Users can update meal information.
- **Remove Meals:** Users can delete meals from the database.
- **Validations:**
  - Meal name, cook time, and directions are required.
  - Meal names must be between 3 and 20 characters.
  - Cook time must be between 2 and 240 minutes.
  - Directions must be at least 10 characters long.
  - Ingredients are optional.

### **Black Belt Features** (Optional for Mastery Level)
To earn a **Black Belt**, you must implement at least three of the following features:

#### **React I**
- Lifted State
- Separation of Stateful and Stateless Components
- Multiple uses of Conditional Styling

#### **React II**
- Single-state Object
- useReducer Hook
- Custom Hook
- useContext Hook

#### **MongoDB**
- Query Filters
- Advanced Validations

#### **MERN I**
- Axios HTTP Service

#### **MERN II**
- Normalize Server-side Error Messages
- Front-end Validation

## **Installation and Setup**

### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/speedy-meals.git
cd speedy-meals
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the **server** directory and add:
```
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.mongodb.net/yourDatabase?retryWrites=true&w=majority
PORT=8000
```

### **4. Start the Server**
```sh
node server.js
```

### **5. Start the Frontend**
Navigate to the client folder and run:
```sh
npm start
```