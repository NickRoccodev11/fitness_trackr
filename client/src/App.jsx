import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Activities from './components/Activities';
import Routines from './components/Routines';
import Navbar from './components/Navbar';


function App() {
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    const fetchActivities = async () => {
      const res = await fetch('http://localhost:8080/api/v1/activities')
      const allActivities = await res.json();
      setActivities(allActivities)
    }
    fetchActivities()
  }, [])

  return (
    <div className="app">
      <Navbar />
      <h1>Fitness Trackr</h1>
      <Routes>
        <Route path="/activities" element={
          <Activities
            setActivities={setActivities}
            activities={activities} />}
        />
        <Route path="/routines" element={<Routines
          activities={activities} />}
        />
      </Routes>
    </div>
  )
}

export default App
