import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TrophyCalculator from './components/TrophyCalculator.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrophyCalculator />
  </StrictMode>,
)
