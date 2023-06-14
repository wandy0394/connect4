import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GameContext, GameProvider } from './feature/gameplay/GameContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
)
