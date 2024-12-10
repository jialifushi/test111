import React, { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [task, setTask] = useState({
    name: '',
    startDate: '',
    workDays: 0,
    includeSaturday: false,
    includeSunday: false,
    includeHolidays: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({
      name: '',
      startDate: '',
      workDays: 0,
      includeSaturday: false,
      includeSunday: false,
      includeHolidays: false
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={task.name} onChange={handleChange} placeholder="任务名称" required />
      <input type="date" name="startDate" value={task.startDate} onChange={handleChange} required />
      <input type="number" name="workDays" value={task.workDays} onChange={handleChange} placeholder="工作天数" required />
      <label>
        <input type="checkbox" name="includeSaturday" checked={task.includeSaturday} onChange={handleChange} />
        周六作为工作天数
      </label>
      <label>
        <input type="checkbox" name="includeSunday" checked={task.includeSunday} onChange={handleChange} />
        周日作为工作天数
      </label>
      <label>
        <input type="checkbox" name="includeHolidays" checked={task.includeHolidays} onChange={handleChange} />
        法定节假日作为工作天数
      </label>
      <button type="submit">提交</button>
    </form>
  );
}

export default TaskForm;
