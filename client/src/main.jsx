import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1a1b26',
                color: '#f0f1ff',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                fontSize: '0.9rem'
              },
              success: { iconTheme: { primary: '#43e97b', secondary: '#1a1b26' } },
              error: { iconTheme: { primary: '#ff6584', secondary: '#1a1b26' } }
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
