import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {VideoProvider } from './stream/stream.context.jsx' 

createRoot(document.getElementById('root')).render(
  <VideoProvider>
    <App />
  </VideoProvider>
)
