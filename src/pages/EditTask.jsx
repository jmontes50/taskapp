import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./styles/NewTask.module.css";
import Navbar from "../components/Navbar";
import { updateDocument, getDocument } from "../services/firestoreService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const { user } = useContext(AuthContext);

  const [project, setProject] = useState({
    name: "",
    color: "#FFFFFF",
    tasks: [],
    uid: user.uid,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const notify = () => toast.success("Proyecto editado con éxito");

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const addTask = () => {
    setProject((prevProject) => ({
      ...prevProject,
      tasks: [
        ...prevProject.tasks,
        { name: "", completed: false, completionDate: "" },
      ],
    }));
  };

  const handleTaskChange = (index, field, value) => {
    setProject((prevProject) => {
      const newTasks = [...prevProject.tasks];
      if (field === "completed" && value === true) {
        newTasks[index].completionDate = Date.now();
      } else if (field === "completed" && value === false) {
        newTasks[index].completionDate = "";
      }
      newTasks[index] = { ...newTasks[index], [field]: value };
      return { ...prevProject, tasks: newTasks };
    });
  };

  const removeTask = (index) => {
    setProject((prevProject) => ({
      ...prevProject,
      tasks: prevProject.tasks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateDocument("tasks", id, project);
      notify();
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProject = async () => {
      const doc = await getDocument("tasks", id);
      setProject(doc);
    };
    getProject();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles["form-container"]}>
        <h2 className={styles["form-title"]}>Editar Proyecto</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} htmlFor="projectName">
              Nombre del Proyecto
            </label>
            <input
              id="projectName"
              className={styles["form-input"]}
              type="text"
              name="name"
              value={project.name}
              onChange={handleProjectChange}
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} htmlFor="projectColor">
              Color
            </label>
            <input
              id="projectColor"
              className={styles["form-input"]}
              type="color"
              name="color"
              value={project.color}
              onChange={handleProjectChange}
            />
          </div>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Tareas</label>
            <ul className={styles["task-list"]}>
              {project.tasks.map((task, index) => (
                <li key={index} className={styles["task-item"]}>
                  <input
                    className={styles["task-checkbox"]}
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) =>
                      handleTaskChange(index, "completed", e.target.checked)
                    }
                  />
                  <input
                    className={`${styles["task-input"]}, ${styles["form-input"]}`}
                    type="text"
                    value={task.name}
                    onChange={(e) =>
                      handleTaskChange(index, "name", e.target.value)
                    }
                    placeholder="Nombre de la tarea"
                    required
                  />

                  <button
                    type="button"
                    className={styles["task-remove"]}
                    onClick={() => removeTask(index)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles["add-task-btn"]}
              onClick={addTask}
            >
              <i className="fa-solid fa-plus"></i> Agregar Tarea
            </button>
          </div>
          <button type="submit" className={styles["submit-btn"]}>
            Guardar Proyecto
          </button>
        </form>
      </div>
    </>
  );
}
