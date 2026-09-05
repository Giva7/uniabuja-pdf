import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { AdminPage } from './components/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App