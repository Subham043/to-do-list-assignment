import React, { useState, useEffect } from 'react'
import './Main.css'
import { Container, Modal, Button } from 'react-bootstrap';
import { BiTime } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Main = () => {
    const [show, setShow] = useState(false);
    const [task, setTask] = useState([]);
    const [progressTask, setProgressTask] = useState([]);
    const [completeTask, setCompleteTask] = useState([]);
    const [taskText, setTaskText] = useState("")
    const [taskTime, setTaskTime] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //success notification toast
    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: Date().toLocaleString()
    });

    //error notification toast
    const notifyError = (message) => toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: Date().toLocaleString()
    });

    useEffect(() => {
        let localTask = JSON.parse(localStorage.getItem("task"));
        if (localTask !== null) {
            setTask(localTask)
        }
    }, [])


    //form submission handler
    const submitHandler = (e) => {
        e.preventDefault();
        if (taskText === "") {
            notifyError("Task Field is required")
        } else if (taskTime === "") {
            notifyError("Task Timer is required")
        } else {
            let formData = {
                id: uuidv4(),
                name: taskText,
                time: taskTime,
                category: "assigned",
                color: "#ffbe33"
            }
            setTask([...task, formData])
            let localTask = JSON.parse(localStorage.getItem("task"));
            if (localTask !== null) {
                let newLocalTask = [...localTask, formData];
                localStorage.setItem("task", JSON.stringify(newLocalTask));

            } else {
                let taskArr = [];
                taskArr.push(formData)
                localStorage.setItem("task", JSON.stringify(taskArr));
            }
            notifySuccess("Task Assigned Successfully")
            setTaskText("")
            setTaskTime("")
        }
    }

    const deleteHandler = (id) => {
        let nonDeletedtasks = task.filter(item => {
            return item.id !== id;
        })

        setTask(nonDeletedtasks)
        let localTask = JSON.parse(localStorage.getItem("task"));
        if (localTask !== null) {
            localStorage.setItem("task", JSON.stringify(nonDeletedtasks));

        } else {
            localStorage.setItem("task", JSON.stringify(nonDeletedtasks));
        }
        notifySuccess("Task Deleted Successfully")
    }


    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        if (result.source.droppableId === "assigned" && result.destination.droppableId === "progress") {
            let progressTaskList = task.filter(item => {
                return item.id === result.draggableId
            })
            setProgressTask([...progressTask, ...progressTaskList])
            let assignedTaskList = task.filter(item => {
                return item.id !== result.draggableId
            })
            setTask(assignedTaskList)
        } else if (result.source.droppableId === "progress" && result.destination.droppableId === "assigned") {
            let newassignedTaskList = progressTask.filter(item => {
                return item.id === result.draggableId
            })
            setTask([...task, ...newassignedTaskList])
            let newprogressTaskList = progressTask.filter(item => {
                return item.id !== result.draggableId
            })
            setProgressTask(newprogressTaskList)
        } else if (result.source.droppableId === "progress" && result.destination.droppableId === "completed") {
            let completedTaskList = progressTask.filter(item => {
                return item.id === result.draggableId
            })
            setCompleteTask([...completeTask, ...completedTaskList])
            let newnewprogressTaskList = progressTask.filter(item => {
                return item.id !== result.draggableId
            })
            setProgressTask(newnewprogressTaskList)
        } else if (result.source.droppableId === "completed" && result.destination.droppableId === "progress") {
            let newnewnewprogressTaskList = completeTask.filter(item => {
                return item.id === result.draggableId
            })
            setProgressTask([...progressTask, ...newnewnewprogressTaskList])
            let newcompleteTaskList = completeTask.filter(item => {
                return item.id !== result.draggableId
            })
            setCompleteTask(newcompleteTaskList)
        }
    }





    return (
        <div className="main__outer__div">
            <Container>
                <div className="task__form__div">
                    <form onSubmit={submitHandler}>
                        <div className="task__input__div">
                            <input type="text" placeholder="Add New Task..." value={taskText} onChange={(e) => setTaskText(e.target.value)} />
                        </div>
                        <div className="task__button__div">
                            <button className="task__timer__btn" type="button" onClick={handleShow}><BiTime /></button>
                            <button type="submit">Add</button>
                        </div>
                    </form>
                </div>
                <div className="task__status__div">
                    <DragDropContext onDragEnd={handleOnDragEnd}>

                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                <div className="task__assigned__div__heading">
                                    TASK ASSIGNED
                                </div>
                                <Droppable droppableId="assigned">
                                    {(provided) => (
                                        <div className="task__assigned__card__outer__div"  {...provided.droppableProps} ref={provided.innerRef}>
                                            {task.map((item, i) => {
                                                return (
                                                    <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={i}>
                                                        {(provided) => (
                                                            <div className={`task__${item.category}__card mb-3`} style={{ color: "white", backgroundColor: item.color, borderColor: item.color }} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                <p><BsListTask /> {item.name}</p>
                                                                <p><BiTime /> {item.time}</p>
                                                                <div className="task__delete__btn">
                                                                    <button onClick={() => deleteHandler(item.id)}>Delete</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                <div className="task__progress__div__heading">
                                    TASK IN PROGRESS
                                </div>
                                <Droppable droppableId="progress">
                                    {(provided) => (
                                        <div className="task__progress__card__outer__div"  {...provided.droppableProps} ref={provided.innerRef} >
                                            {progressTask.map((item, i) => {
                                                return (
                                                    <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={i}>
                                                        {(provided) => (
                                                            <div className={`task__progress__card mb-3`} style={{ color: "#002bd4", backgroundColor: "white", borderColor: "#002bd4" }} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                <p><BsListTask /> {item.name}</p>
                                                                <p><BiTime /> {item.time}</p>
                                                                
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                <div className="task__completed__div__heading">
                                    TASK COMPLETED
                                </div>
                                <Droppable droppableId="completed">
                                    {(provided) => (
                                        <div className="task__completed__card__outer__div"  {...provided.droppableProps} ref={provided.innerRef}>
                                            {completeTask.map((item, i) => {
                                                return (
                                                    <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={i}>
                                                        {(provided) => (
                                                            <div className={`task__completed__card mb-3`} style={{ color: "#07bf0f", backgroundColor: "white", borderColor: "#07bf0f" }} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                <p><BsListTask /> {item.name}</p>
                                                                <p><BiTime /> {item.time}</p>
                                                                
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>

                        </div>

                    </DragDropContext>
                </div>
            </Container>


            <Modal aria-labelledby="contained-modal-title-vcenter"
                centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Timer</Modal.Title>
                </Modal.Header>
                <Modal.Body><input type="time" value={taskTime} onChange={(e) => (setTaskTime(e.target.value))} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Set</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    )
}

export default Main
