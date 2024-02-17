import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]); // Holds the list of tasks
  const [inputValue, setInputValue] = useState(""); // Holds the value of the input field
  const [filter, setFilter] = useState("all"); // Holds the current filter type
  const [isLoading, setIsLoading] = useState(true); // Indicates whether the data is being loaded
  const [editTaskId, setEditTaskId] = useState(null); // Holds the ID of the task being edited
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch todos from an API
  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=4"
      );
      const todos = await response.json();
      setTasks(todos);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching todos:", error);
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Add a new task
  const handleAddTask = async () => {
    if (inputValue.trim() === "") {
      return;
    }

    const newTask = {
      title: inputValue,
      completed: false,
    };

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: JSON.stringify(newTask),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const addedTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setInputValue("");
      toast.success("Task added successfully");
    } catch (error) {
      console.log("Error adding task:", error);
      toast.error("Error adding task");
    }
  };

  // Handle checkbox change for a task
  const handleTaskCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully");
  };

  // Edit a task
  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setInputValue(taskToEdit.title);
  };

  // Update a task
  const handleUpdateTask = async () => {
    if (inputValue.trim() === "") {
      return;
    }

    const updatedTask = {
      title: inputValue,
      completed: false,
    };

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${editTaskId}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedTask),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const updatedTaskData = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId
            ? { ...task, title: updatedTaskData.title }
            : task
        )
      );
      setInputValue("");
      setEditTaskId(null);
      toast.success("Task updated successfully");
    } catch (error) {
      console.log("Error updating task:", error);
      toast.error("Error updating task");
    }
  };

  // Mark all tasks as completed
  const handleCompleteAll = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, completed: true }))
    );
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return task.completed;
    } else if (filter === "uncompleted") {
      return !task.completed;
    }
    return true;
  });

  // Display loading message while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center p-10">
        <ToastContainer />
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3">
          <div className="flex items-center mb-6">
            <h1 className="mr-6 text-4xl font-bold text-purple-600">
              TO DO APP
            </h1>
          </div>
          <div className="relative">
            <div className="flex justify-center items-center gap-6">
              <input
                id="add"
                autoFocus
                value={inputValue}
                onChange={handleInputChange}
                type="text"
                placeholder="What needs to be done today?"
                className="w-full px-2 py-3 border rounded outline-none border-grey-600"
              />
              <button
                className="h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md"
                onClick={editTaskId ? handleUpdateTask : handleAddTask}
              >
                {editTaskId ? "Update" : "Add"}
              </button>
            </div>

            <div className="flex items-center justify-center mt-4">
              <i className="fas fa-check-double text-3xl mr-2"></i>
              <p
                className="cursor-pointer text-blue-500 hover:underline mr-4"
                onClick={handleCompleteAll}
              >
                Complete all tasks
              </p>
              <p
                className="cursor-pointer text-red-500 hover:underline"
                onClick={handleClearCompleted}
              >
                Delete completed tasks
              </p>
            </div>
          </div>
          <ul className="list-reset">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="relative flex items-center justify-between px-2 py-6 border-b"
              >
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  data-id={task.id}
                  className="custom-checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskCheckboxChange(task.id)}
                />
                <label
                  className={
                    task.completed
                      ? "line-through inline-block mt-1 text-gray-600"
                      : "inline-block mt-1 text-gray-600"
                  }
                  htmlFor={`task-${task.id}`}
                >
                  {task.title}
                </label>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                  className="w-4 h-4 cursor-pointer"
                  data-id={task.id}
                  onClick={() => handleEditTask(task.id)}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                  className="w-4 h-4 cursor-pointer"
                  data-id={task.id}
                  onClick={() => handleDeleteTask(task.id)}
                />
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center mt-4">
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none"
              >
                Filter
              </button>
              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => handleFilterChange("all")}
                    >
                      All
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => handleFilterChange("uncompleted")}
                    >
                      Uncompleted
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => handleFilterChange("completed")}
                    >
                      Completed
                    </a>
                  </div>
                </div>
              )}
            </div>
            <i className="fas fa-check-double text-3xl mr-2"></i>
            <p className="text-blue-500  mr-4">
              Completed:{" "}
              <span id="c-count">
                {tasks.filter((task) => task.completed).length}
              </span>
            </p>
            <p className=" text-red-500 " onClick={handleClearCompleted}>
              Total Tasks: <span id="tasks-counter">{tasks.length}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
