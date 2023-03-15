import axios from 'axios';
import { useState } from 'react';



const ToDoFormPage = (props) => {

    const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [priority, setPriority] = useState("")

    const handleCreateToDo = async () => {
        axios.post('/urlendpoint', {
            title: title,
            description: description,
            priority: priority
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return (
		<div>
			<h1>Create ToDo Form</h1>
			<label>Title</label>
			<input type="text" onChange={(e)=>{
				setTitle(e.target.value)
			}} />
			<br/>
			<label>Description</label>
			<textarea type="text" onChange={(e)=>{
				setDescription(e.target.value)
			}} />
			<br/>
			<label>Priority</label>
			<select onChange={(e)=>{
				setPriority(e.target.value)
			}}>
				<option>High</option>
				<option>Medium</option>
				<option>Low</option>
			</select>
			<br/>
			<button onClick={()=>{
				handleCreateToDo()
				//navigate("/")
			}}>Create ToDo</button>
		</div>
	)
}

export default ToDoFormPage