import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Index() {
  const [events, setEvents] = useState([]);

  const handleTaskSubmit = (task) => {
    const endDate = calculateEndDate(task);
    const event = {
      title: task.name,
      start: task.startDate,
      end: endDate,
    };
    setEvents(prevEvents => [...prevEvents, event]);
  };

  return (
    <div>
      <TaskForm onSubmit={handleTaskSubmit} />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
}

export default Index;
