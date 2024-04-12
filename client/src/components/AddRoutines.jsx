import { useState } from 'react'

const AddRoutines = ({ setNewRoutine, setAddForm }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [goal, setGoal] = useState('')

  const handleChange = (e) => {
    setIsChecked(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:8080/api/v1/routines', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        is_public: isChecked,
        goal
      })
    })
    const newRoutineData = await res.json();
    setNewRoutine(newRoutineData);
    setIsChecked(false);
    setGoal("");
    setAddForm(false);
  }

  return (
    <div className='add-routine'>
      <h3>New Routine:</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label >is this routine public?</label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleChange(e)}
        /><br />
        <label >goal:</label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        /><br />
        <button>Submit Routine</button>
      </form>
    </div>
  )
}

export default AddRoutines
