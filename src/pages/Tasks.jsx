import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getDocuments } from "../services/firestoreService";
import { Link } from "react-router-dom";
import styles from "./styles/Tasks.module.css";
import Navbar from "../components/Navbar";
import LineTasks from "../components/LineTasks";
import { transformProjects } from "../utils/taskUtils";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const { user } = useContext(AuthContext);

  const getTasks = async () => {
    try {
      const tasks = await getDocuments("tasks", user.uid);
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const transformedProjects = transformProjects(tasks);

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles["container"]}>
        <div className={styles["chart-container"]}>
          <LineTasks tasks={tasks} />
        </div>
        <div className={styles["project-list"]}>
          {transformedProjects.map((project, index) => (
            <Link
              to={`/edit-task/${project.id}`}
              key={index}
              className={styles["project-card"]}
              style={{ backgroundColor: `${project.color}` }}
            >
              <div className={styles["project-name"]}>{project.name}</div>
              <div className={styles["progress-bar"]}>
                <div
                  className={styles["progress"]}
                  style={{
                    width: `${(project.completed / project.total) * 100}%`,
                  }}
                ></div>
              </div>
              <div className={styles["task-count"]}>
                {project.completed} de {project.total} tareas completadas
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
