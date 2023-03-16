import { useState } from "react";

import axios from "axios";

//call endpoint from .env file
const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

// todo card 
const ToDoCard = (props) => {

    const { toDo, setToDoList  } = props;
    const [title, setTitle] = useState(toDo.title);
    const [priority, setPriority] = useState(toDo.priority);
    const [description, setDescription] = useState(toDo.descrption);
    const [isEditing, setIsEditing] = useState(false);

    //implement handlers 
    const handleSetToDoComplete = () => {
      const updatedToDo = { ...toDo, isComplete: !toDo.isComplete };
      axios
        .put(`${urlEndPoint}/todos/update/${toDo.id}`, updatedToDo)
        .then((response) => {
          console.log(response);
          setToDoList((prevToDoList) =>
            prevToDoList.map((item) => (item.id === toDo.id ? updatedToDo : item))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleDeleteToDo = () => {
      axios
        .delete(`${urlEndPoint}/todos/delete/${toDo.id}`)
        .then((response) => {
          console.log(response);
          setToDoList((prevToDoList) => prevToDoList.filter((item) => item.id !== toDo.id));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleUpdateToDo = () => {
    const updatedToDo = { ...toDo, title, priority, description };
    axios
      .put(`${urlEndPoint}/todos/update/${toDo.id}`, updatedToDo)
      .then((response) => {
        console.log(response);
        setToDoList((prevToDoList) =>
          prevToDoList.map((item) => (item.id === toDo.id ? updatedToDo : item))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
    return (
        <div>
          {!isEditing && <h2>{toDo.title}</h2>}
          {isEditing && (
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          )}
          <p>ID: {toDo.id}</p>
          {!isEditing && <p>Description: {toDo.description}</p>}
          {isEditing && (
                    <>
            <textarea
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
                    <br/>
                    </>
          )}
                
          {!isEditing && <p>Priority: {toDo.priority}</p>}
          {isEditing && (
            <select
              onChange={(e) => {
                setPriority(e.target.value);
              }}
                        value={priority}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          )}
          {/* <p>Is Complete: {toDo.isComplete ? "Complete" : "Incomplete"}</p>
          <p>Creation Date: {toDo.creationDate.toString()}</p>
          <p>Last Modified: {toDo.lastModified.toString()}</p>
          <p>
            Completed Date: {toDo.completedDate && toDo.completedDate.toString()}
          </p> */}
          <button
            onClick={() => {
              handleSetToDoComplete();
            }}
          >
            Toggle Complete
          </button>
          <button
            onClick={() => {
              handleDeleteToDo();
            }}
          >
            Delete ToDo
          </button>
                {!isEditing && 
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit ToDo
          </button>
                }
                {isEditing && 
          <button
            onClick={() => {
              setIsEditing(false);
                        handleUpdateToDo()
            }}
          >
            Update ToDo
          </button>
                }
        </div>
      );
}

export default ToDoCard;