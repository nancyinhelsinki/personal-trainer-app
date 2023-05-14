import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import _ from "lodash";

function Dashboard({ trainings }) {
  const trainingsByActivity = _.groupBy(trainings, "activity");
  const activitiesSumByDuration = Object.entries(trainingsByActivity).map(
    ([key, value]) => {
      const sum = _.sumBy(value, "duration");
      return { activity: key, duration: sum };
    }
  );

  return (
    <BarChart width={700} height={500} data={activitiesSumByDuration}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="activity" />
      <YAxis
        label={{
          value: "Duration (mins)",
          position: "insideLeft",
          angle: -90,
          dy: 50,
        }}
      />
      <Tooltip />
      <Legend />
      <Bar dataKey="duration" fill="#1976d2" name="Duration" />
    </BarChart>
  );
}

export default Dashboard;
