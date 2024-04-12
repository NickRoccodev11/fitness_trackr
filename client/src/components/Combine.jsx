import { useState } from 'react'

const Combine = ({ setAddActivity, activities, routineId, routinesActivities, setRoutinesActivities}) => {
  const [selectedActivityId, setSelectedActivityId] = useState(null)
  const [count, setCount] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/v1/routinesactivities', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        routine_id: routineId,
        activity_id: selectedActivityId,
        count
      })
    })
    const routineActivityData = await res.json();
    console.log(routineActivityData)
    console.log(routinesActivities)
    setRoutinesActivities([...routinesActivities, routineActivityData])
    setSelectedActivityId(null)
    setCount(null)
    setAddActivity(false)
  }

  return (
    <div className='combine'>
      <form onSubmit={(e) => handleSubmit(e)} >
        <label > Choose activity to add to routine</label>
        <select
          value={selectedActivityId}
          onChange={(e) => setSelectedActivityId(e.target.value)}
        >
          <option value=""> Select an Activity</option>
          {
            activities.map(activity => {
              return <option key={activity.id} value={activity.id} required>
                {activity.name}
              </option>
            })
          }
        </select>
        <label > Select number of reps:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button>add activity to routine</button>
      </form>
    </div>
  )
}

export default Combine
