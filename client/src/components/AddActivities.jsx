import { useState } from 'react'

const AddActivities = ({ setAddForm, activities, setActivities }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:8080/api/v1/activities', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description
      })
    })
    const newActivityData = await res.json();
    setActivities([...activities, newActivityData])
    setName("");
    setDescription("");
    setAddForm(false);
  }


  return (
    <div className='add-activity' >
      <h3>New Activity:</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label >Activity Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <label >Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <button>Submit Activity</button>
      </form>
    </div>
  )
}

export default AddActivities