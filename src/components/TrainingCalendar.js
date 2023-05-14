import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import dayjs from "dayjs";

const localizer = dayjsLocalizer(dayjs);

function TrainingCalendar({ trainings }) {
  const myEventsList = trainings.map((training) => {
    return {
      start: dayjs(training.date).toDate(),
      end: dayjs(training.date).add(training.duration, "minute").toDate(),
      title:
        training.activity +
        " / " +
        training.customer.firstname +
        " " +
        training.customer.lastname,
    };
  });

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700, width: 1000 }}
      />
    </div>
  );
}
export default TrainingCalendar;
