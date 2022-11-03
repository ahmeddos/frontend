import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CourseContextProvider} from './Context/CourseContext';
import { AuthContextProvider } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
     <CourseContextProvider>
     <App />
     </CourseContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);