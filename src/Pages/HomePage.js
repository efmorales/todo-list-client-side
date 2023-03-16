import { useState } from "react";
import ToDoCard from "../Components/ToDoCard";

//home page component 
const HomePage = (props) => {

    const {toDoList, setToDoList } = props


    return (
        <div>

            <h1>Full Stack To-do App</h1>
            {toDoList.map((item, index) => {
                return <ToDoCard toDo={item} setToDoList={setToDoList} key={index} />
            })}
        </div>
    )
}

export default HomePage