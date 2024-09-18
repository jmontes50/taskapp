function transformProjects(projects) {
  return projects.map((project, index) => {
    const total = project.tasks.length;
    const completed = project.tasks.filter((task) => task.completed).length;

    return {
      id: project.id,
      name: project.name,
      completed,
      total,
      color: project.color,
    };
  });
}

function groupTasksByDay(projects) {
  const days = new Array(7).fill(0);

  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.completed && task.completionDate) {
        const completionDate = new Date(task.completionDate);
        const dayOfWeek = completionDate.getUTCDay(); 
        const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        days[adjustedDay]++;
      }
    });
  });

  return days;
}

export {
    transformProjects,
    groupTasksByDay
}
