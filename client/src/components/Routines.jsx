import { useState, useEffect } from 'react'
import AddRoutines from './AddRoutines'
import Combine from './Combine'

const Routines = ({ activities }) => {
  const [routines, setRoutines] = useState([])
  const [routinesActivities, setRoutinesActivities] = useState([])
  const [displayAddForm, setDisplayAddForm] = useState(false)
  const [displayActivityForm, setDisplayActivityForm] = useState(false)
  const [goal, setGoal] = useState({})

  useEffect(() => {
    const fetchRoutines = async () => {
      const res = await fetch('http://localhost:8080/api/v1/routines')
      const routineData = await res.json()
      setRoutines(routineData)
    }
    const fetchRoutinesActivities = async () => {
      const res = await fetch('http://localhost:8080/api/v1/routinesactivities')
      const routineActivityData = await res.json()
      setRoutinesActivities(routineActivityData)
    }
    fetchRoutines();
    fetchRoutinesActivities();
  }, [])

  const getAssociatedActivities = (routineId) => {
    const idCountMap = {};
    routinesActivities.forEach(ra => {
      if (ra.routine_id === routineId) {
        idCountMap[ra.activity_id] = ra.count
      }
    })
    const nameAndCounts = []
    for (let id in idCountMap) {
      activities.forEach(act => {
        if (act.id === parseInt(id)) {
          nameAndCounts.push([act.name, idCountMap[id]])
        }
      })
    }
    return nameAndCounts
  }

  const showGoal = async (id) => {
    const res = await fetch(`http://localhost:8080/api/v1/routines/${id}`)
    const routineGoal = await res.json()
    setGoal(routineGoal)
  }


  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8080/api/v1/routines/${id}`, {
      method: 'DELETE'
    })
    const updatedRoutinesData = await res.json();
    setRoutines(updatedRoutinesData);
  }

  return (
    <div className='routines'>
      {
        routines.length &&
        routines.map(routine => {
          const associatedActivities = getAssociatedActivities(routine.id)
          return (
            routine.is_public &&
            <div className='single-routine'>
              <h3> Routine #{routine.id}</h3>
              {
                goal.id === routine.id ?
                  <p className='description'>{routine.goal}</p> :
                  <>
                    <button onClick={() => showGoal(routine.id)}>show goal</button><br />
                  </>
              }
              {
                associatedActivities.length > 0 &&
                <div>
                  <h3> activities associate with this routine:</h3>
                  <ul>
                    {
                      associatedActivities.map(activity => {
                        return <li>{activity[0]}. reps: {activity[1]}</li>
                      })
                    }
                  </ul>
                </div>
              }
              {
                displayActivityForm ?
                  <Combine
                    routineId={routine.id}
                    routinesActivities={routinesActivities}
                    setRoutinesActivities={setRoutinesActivities}
                    activities={activities}
                    setDisplayActivityForm={setDisplayActivityForm} /> :
                  <div>
                    <span>Add an activity to this routine:</span>
                    <button onClick={() => setDisplayActivityForm(true)}>
                      Add</button><br />
                  </div>
              }
              <button onClick={() => handleDelete(routine.id)}>
                delete routine</button>
            </div>
          )
        })
      }
      {
        displayAddForm ?
          <AddRoutines
            setDisplayAddForm={setDisplayAddForm}
            routines={routines}
            setRoutines={setRoutines}
          /> :
          <button onClick={() => setDisplayAddForm(true)}>Add Routine</button>
      }
    </div>
  )
}

export default Routines