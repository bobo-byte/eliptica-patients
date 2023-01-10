# Eliptica React Native App

# Introduction

Welcome to the Eliptica React Native App! This app was created for demonstration purposes for an interview at Eliptica. The app has drawer navigation and three pages:

1. "Login". The authentication is done through OAuth (e.g., @react-oauth/google). This is the initial landing screen if the user is not yet authenticated.
2. "Add patient". This page contains input fields for Name, Sex, Birthday (and year).
3. "Patients." A searchable list of added patients. This is the initial landing page if the user is already authenticated.

# Installation and Setup

## Prerequisites

Before getting started with the app, you will need to have the following tools installed: 

- Expo CLI
- Node.js(version 10 or higher)
- npm(comes with Node.js)

## Getting Started

1. Installing Expo CLI by running the following command: 

    
    ```bash
    npm install -g expo-cli
    ```
    
2. Clone the repository and navigate to the project directory:
    
    ```bash
    git clone https://github.com/bobo-byte/eliptica-patients.git
    cd eliptica-app
    ```
    
3. Install the dependencies by running the following command:
    
    ```bash
    npm install
    ```
    

## Setting up ESLinting

To set up Eslint for an Expo project, follow the steps in the **[Expo documentation](https://docs.expo.io/versions/latest/guides/debugging#linting-with-eslint).**

### Setting up eslint in an Expo Project

1. Install the **`eslint`** and **`@typescript-eslint/parser`** packages by running the following command in the root of your project:
    
    ```bash
    npm install eslint @typescript-eslint/parser --save-dev
    ```
    
2. Create a configuration file for eslint by running the following command:
    
    ```bash
    npx eslint --init
    ```
    
3. Follow the prompts to set up the configuration file. When prompted for the type of configuration, select "Use a popular style guide" and choose "Airbnb" as the style guide. When prompted for the configuration file format, select "JavaScript".
   

4. Install the necessary plugins by running the following command:
    
    ```bash
    npm install eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks --save-dev
    ```
    

5. Add the following lines to your **`.eslintrc.js`** file:
    
    ```bash
    module.exports = {
      parser: "@typescript-eslint/parser",
      extends: ["airbnb"],
      plugins: ["@typescript-eslint"],
      rules: {
        "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
      },
    };
    ```
    

6. Run the linter by running the following command:
    
    ```bash
    npx eslint .
    ```
    

This will lint all the files in the current directory and display any linting errors or warnings.


## Using .env

This project uses the **`react-native-dotenv`** package to manage environment variables. Please see the official documentation for more information on how to use this package **[official documentation](https://github.com/zetachang/react-native-dotenv)**.

The **`react-native-dotenv`** package allows you to use environment variables in your React Native app by creating a **`.env`** file at the root of your project. The **`.env`**file should not be version controlled, as it may contain sensitive information such as API keys.

To use the **`react-native-dotenv`** package, follow these steps:

1. Create a **`.env`** file in the root of your project and add your environment variables in the following format:
    
    ```bash
    VARIABLE_NAME=value
    ```
    
2. In your React Native code, you can access the environment variables using the **`process.env`** object. For example, to access the **`VARIABLE_NAME`** variable, you would use **`process.env.VARIABLE_NAME`**.


## Backend with Supabase

This app uses **[supabase](https://supabase.io/)** for the backend. Refer to their documentation for full use.

To use Supabase as the backend for your app, follow these steps:

1. Sign up for a Supabase account at **[https://app.supabase.io/register](https://app.supabase.io/register)**.
2. Create a new project and copy the URL and key from the Project Settings page.
3. Set up the **`.env`** file by creating a file called **`.env`** in the root of the project and adding the following lines:
    
    ```bash
    SUPABASE_URL=<your-supabase-project-url>
    SUPABASE_KEY=<your-supabase-project-key>
    ```
    
4. In the **`supabase.ts`** file, replace the placeholder values in the **`SUPABASE_URL`** and **`SUPABASE_KEY`** constants with your project URL and key.
5. You can then use the Supabase client in your app by importing the **`supabase`** object from the **`supabase.ts`** file and calling its methods. 

For example:

```bash
import { supabase } from './services/supabase';
const result = await supabase.from('users').select('*');
```

Refer to the **[Supabase](https://docs.supabase.io/docs/js-client)** documentation for more information on using the Supabase client in your app.


# **Project Structure**

The project is structured into 8 directories: **`components`**, **`contexts`**, **`hooks`**, **`models`**, **`navigation`**, **`screens`**, **`services`**, and **`utils`**.

### **Components**

 This directory contains all the reusable React Native components, including Higher Order Level Components. There are 10 components (**`Chip`**, **`CustomDrawerContent.tsx`**, **`DeletePatientButton.tsx`**, **`FCInput`**, **`FCSelect.tsx`**, **`Loading.tsx`**, **`PatientListItem.tsx`**, **`RHFMaskedInput.tsx`**, **`Screen.tsx`**, **`SearchSelectComponet.tsx`**) and one Higher Order Level Component (**`withScreen.tsx`**).

### **Contexts**

This directory contains context creations for different types of lower-frequency updated data, such as auth. I have three context files: **`AuthContext.ts`**, **`BaseContext.ts`**, and **`ScreenContext.ts`**. **`BaseContext.ts`** is shared across all components from **`App.tsx`** while **`AuthContext.ts`** is only shared to the **`AuthenticatedStack`** and **`ScreenContext.ts`** is for any screen that holds low-frequency data that is prop drilled through multiple components.

### **Hooks**

This directory holds React hooks used to abstract database logic such as search, session, and context extraction, and other logic. There are 5 files in this directory: **`useOAuth.ts`**, **`usePatients.ts`**, **`usePatientSearch.ts`**, **`useSession.ts`**, and **`useSupabase.ts`**.

### **Models**

This directory contains an abstract representation of a patient entity from the database. It also subscribes to service interfaces from the **`services`**directory to access database client logic. There is one file in this directory: **`Patients.ts`**.

### **Navigation**

This directory contains React Navigation navigator stacks that separate authenticated and unauthenticated screens. This directory has two files: **`AuthenticatedStack.tsx`**and **`UnAuthenticatedStack.tsx`**.

### **Screens**

This directory contains all the views/screens for the app. There are 3 screens in this directory: **`AddPatients.tsx`**, **`Login.tsx`**, and **`Patients.tsx`**.

### **Services**

This directory contains all the service logic required by different view-side logic, such as hook functionality and state requests. There are two directories in this directory: **`database`** and **`strategy`**. There is also one file in this directory: **`supabase.ts`**, which sets up the Supabase client.

### **Utils**

This directory contains utility files that have been used throughout the project. It consists of 7 directories and separations for each use case. There is only one file in this directory called **`helpers.ts`**. The 7 directories in this directory are: **`components`**, **`constants`**, **`database`**, **`errors`**, **`navigation`**, **`strategy`**, and **`types`**.

# **Additional & Deployment**

## **Running Expo Tunnel**

You can use Expo Tunnel to bypass network restrictions if you cannot start the app using `expo start` due to a restrictive network. To do this, follow these steps:

1. Navigate to the project directory:

```bash
cd eliptica-patients
```

1. Run the following command to start Expo Tunnel:

```bash
expo start --tunnel or npm run tunnel
```

This will create a tunnel to the Expo servers, allowing you to view the app from a device on the same network.

## **Testing**

To run the test suite for the app, use the following command:

```bash
npm run test
```

## **Linting**

To lint the code for the app, use the following command:

```bash
npm run lint
```

This will check the code for any formatting or style errors using Eslint.

## **Generating documentation with typedoc**

Read `typedoc` [documentation](https://typedoc.org) for full guide

To generate documentation for this project run the following script command

```bash
npm run doc
```

or alternatively, 

```bash
typedoc --out docs/documentation --entryPointStrategy expand ./  --exclude '**/__test__/**/*' --exclude '**/node_modules/**/*'
```

## **Building for Production**

To build the app for production, use the following command:

```bash
expo build
```

This will create a production build of the app and output the result to the **`build`** directory.

## **Deployment**

To deploy the app to the App Store or Google Play, follow the instructions in the Expo **[documentation](https://docs.expo.io/distribution/building-standalone-apps/)**
