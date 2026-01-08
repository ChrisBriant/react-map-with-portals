import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider as AuthProvider } from "./context/AuthContext.jsx";
import { Provider as DataProvider } from "./context/DataContext.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <DataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataProvider>
  </AuthProvider>
)
