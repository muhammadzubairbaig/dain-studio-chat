# **Chat Session Management Application**

<p align="center">
  <img src="https://api.iconify.design/logos:angular-icon.svg" alt="Angular brand" width="100" height="100"/>
</p>

## **Overview**

The Chat Session Management Application developed using Angular 18.2.2. It provides a seamless interface for managing chat sessions, filtering them by date. This application follows modern Angular practices, employing a modular architecture, adhering to SOLID principles, and implementing best practices for code quality and performance. Below is an in-depth description of the project's architecture, technologies, and future improvements.

---

## **Table of Contents**

- [Documentation](#documentation)
- [Features](#features)
- [Technologies and Libraries](#technologies-and-libraries)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Code Quality and Linting](#code-quality-and-linting)
- [Error Handling and Notifications](#error-handling-and-notifications)
- [Unit Testing](#unit-testing)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Commands](#commands)


## **Documentation**

I have created detailed technical documentation for this project, which you can visit by following the link below:

[View the Documentation on Notion](https://cute-boron-2ee.notion.site/DAIN-Studios-Chat-Session-61bf32e1662540ad9f8a164a9892cb06?pvs=4)

---

## **Features**

1. **Chat Session Management**:
   - Displays a list of chat sessions.
   - View chat messages for each session with role-based styling (user vs. assistant).

2. **Date-Based Filtering**:
   - Filter chat sessions by a range of dates.
   - Visual feedback for invalid date ranges.

3. **Loading and Skeleton Screens**:
   - Seamless loading experience with skeleton screens while data is being fetched.

4. **Error Handling and Notifications**:
   - Custom error handling with user-friendly notifications when API requests fail.
   - Display specific HTTP status code messages in custom toast notifications.

5. **Responsive Design**:
   - Fully responsive UI using Tailwind CSS, ensuring a consistent experience across devices.

6. **Optimized for Performance**:
   - Uses Angular’s `ChangeDetectionStrategy.OnPush` for efficient change detection.
   - Utilizes Angular’s `HttpClient` API for better performance in Server-Side Rendering (SSR).

---

## **Technologies and Libraries**

### **Frontend Technologies**

- **Angular 18.2.2**: A powerful framework for building client-side applications.
- **TypeScript**: Superset of JavaScript that adds static typing, enhancing code readability and maintainability.
- **RxJS**: Reactive programming library for handling asynchronous data streams.
- **SCSS**: For enhanced styling capabilities beyond vanilla CSS.
- **Tailwind CSS**: Utility-first CSS framework for rapid and scalable UI development.

### **Custom Components**

- **Custom Toaster**: A custom-built toast notification system to handle error and success notifications. This eliminates the need for third-party libraries like `ngx-toastr` and gives greater control over UI and customization.

### **Testing Libraries**

- **Jasmine and Karma**: Standard frameworks for writing and running unit tests.
- **Prettier & ESLint**: Formatting and linting tools for maintaining consistent code quality and enforcing coding standards.
- **Angular HTTP Interceptors**: For handling API calls with automatic error and response handling.

---

## **Architecture**

### **Modular Approach**
The application follows a modular architecture, promoting scalability and maintainability. Each feature is broken into small, manageable modules that follow the Single Responsibility Principle (SRP).

### **Separation of Concerns**
- **Component Layer**: Handles the presentation logic (UI) and user interactions.
- **Service Layer**: Manages the business logic, API calls, and data handling.
  
### **State Management**
Given the current scale of the application, local component state is sufficient. For larger-scale applications, introducing `NgRx` or `Akita` for state management can be considered to manage shared state across the app more effectively.

---

## **Getting Started**

### **Prerequisites**

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14+)
- [Angular CLI](https://angular.io/cli) (version 12+)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### **Installation Steps**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/zubairbaig212/dain-studio-chat.git
   cd dain-studio-chat

2. **Install dependencies:**:

   ```bash
   npm install

3. **Run the application:**:

   ```bash
   ng serve
   ```

   Or you can also run the npm command to run the application

   ```bash
   npm start

4. **Open the application**:
  
   Open app in your browser at http://localhost:4200.

---

## **Code Quality and Linting**

  To maintain a consistent codebase, this project uses ESLint and Prettier for linting and formatting.

1. **Linting**:

   Run the linter to check for code issues:

   ```bash
   npm run lint
   npm run format
   ```

2. **Prettier**:

   Prettier is used to enforce consistent code formatting. It automatically formats the code when you save files or commit changes.

   Sample `.prettierrc` configuration:

   ```bash
   {
   "semi": true,
   "singleQuote": true,
   "trailingComma": "all",
   "printWidth": 120,
   "tabWidth": 4
   }

---
## **Error Handling and Notifications**

  **Custom Error Handling**

  All HTTP requests are handled through the HttpService using Angular's HttpClient. The service has an error-handling method that catches failed requests and provides appropriate error messages.

Example of error handling:

   ```bash
   {
   private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.status
        ? `Server returned code ${error.status}, message: ${error.message}`
        : 'An unknown error occurred!';
    this.customToaster.showError(errorMessage, 'Error');
    return throwError(errorMessage);
   }
  ```
  
  **Custom Toaster Notifications**

  We have implemented a Custom Toaster Component for notifications. This provides feedback to the user when an error or success event occurs. Unlike ngx-toastr, this toaster is fully customizable and built directly into the project.

---

## **Unit Testing**

  Unit tests are written for the services, components, and core business logic using Jasmine and Karma.

**Running Tests**
  
  To run unit tests, use the following command:

 ```bash
   {
   private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.status
        ? `Server returned code ${error.status}, message: ${error.message}`
        : 'An unknown error occurred!';
    this.customToaster.showError(errorMessage, 'Error');
    return throwError(errorMessage);
   }
  ```
  Tests ensure the stability and functionality of all key features, including data fetching, UI rendering, and error handling.

---
## **Project Structure**

  The project follows a modular structure, with a clear separation between components, services, models, and assets.
 ```bash
      src/
    ├── app/
    │   ├── components/            # Reusable components (chat, date-filter, toaster, etc.)
    │   ├── services/              # Application services (e.g., HttpService, CustomToasterService)
    │   ├── models/                # TypeScript interfaces and models (ChatSession, ChatMessage)
    │   └── app.module.ts          # Root module for Angular
    ├── assets/                    # Static assets (images, icons)
    ├── environments/              # Environment configurations for development and production
    └── styles/                    # Global styles and TailwindCSS setup
  ```
  
---
## **Future Enhancements**

1. **Real-Time Communication (WebSockets)**:

    Integrate WebSockets for real-time updates to the chat sessions, allowing users to see new messages as they arrive.

2. **State Management (NgRx)**:

    Use NgRx to manage global state for chat sessions and messages. This will make the app more scalable and efficient, especially as the number of users grows.

3. **Enhanced Analytics**:

    Track user activity and analyze chat session data using tools like Google Analytics, Segment, or Mixpanel.

4. **PWA Support**:

    Convert the application into a Progressive Web Application (PWA) for offline support and faster loading times.

---
## **Contributing**

We welcome contributions from the open-source community! To contribute:

1. **Fork** the repository.
2. Create a new **feature branch**: `git checkout -b feature/my-feature`.
3. **Commit** your changes: `git commit -m 'Add some feature'`.
4. **Push** the changes to the branch: `git push origin feature/my-feature`.
5. Open a **Pull Request**.

Please ensure your code passes the linting and tests before submitting a pull request.

---
## **Commands**


| Command         | Description                                              | npm                     | yarn                 |                  |
| --------------- | -------------------------------------------------------- | ----------------------- | -------------------- | -------------------- |
| `start`      | Starts the development server with a custom host         | `npm run start`           | `yarn start`                     |
| `build`         | Builds the production code                               | `npm run build`         | `yarn build`                |
| `watch`         | Builds the production code and watches for changes       | `npm run watch`         | `yarn watch`                |
| `test`          | Runs the unit tests                                      | `npm run test`          | `yarn test`                   
| `lint`          | Runs the linter                                          | `npm run lint`          | `yarn lint`                
| `lint:fix`      | Runs the linter and fixes any linting errors             | `npm run lint:fix`      | `yarn lint:fix`         |
| `format`        | Formats the code with prettier           | `npm run format`        
