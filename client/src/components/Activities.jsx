import { useState } from 'react'
import AddActivities from './AddActivities';

const Activities = ({ activities, setActivities }) => {
  const [addForm, setAddForm] = useState(false)
  const [description, setDescription] = useState({})

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8080/api/v1/activities/${id}`, {
      method: 'DELETE'
    })
    const updatedActivitiesData = await res.json();
    setActivities(updatedActivitiesData);
  }

  const showDescription = async (id) => {
    const res = await fetch(`http://localhost:8080/api/v1/activities/${id}`)
    const activityDesctiption = await res.json();
    setDescription(activityDesctiption)
  }

  return (
    <div className='activities'>
      {
        activities.length &&
        activities.map(activity => {
          return (
            <div key={activity.id} className='single-activity' >
              <h3>{activity.name}</h3>
              {
                description.id === activity.id ?
                  <p className='description'>{description.description}</p> :
                  <>
                    <button onClick={() => showDescription(activity.id)}>
                      show description</button><br />
                  </>
              }





              <button onClick={() => handleDelete(activity.id)} >
                delete activity</button>
            </div>
          )
        })
      }
      {
        addForm ?
          <AddActivities
            setAddForm={setAddForm}
            activities={activities}
            setActivities={setActivities}
          /> :
          <button onClick={() => setAddForm(true)}>Add a new activity</button>
      }
    </div>
  )
}

export default Activities