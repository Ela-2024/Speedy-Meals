import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import CreateMeal from './components/CreateMeal'
import EditMeal from './components/EditMeal'
import MealDetails from './components/MealDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/meals/new" element={<CreateMeal />} />
      <Route path="/meals/:id/edit" element={<EditMeal />} />
      <Route path="/meals/:id" element={<MealDetails />} />
    </Routes>
  )
}

export default App
