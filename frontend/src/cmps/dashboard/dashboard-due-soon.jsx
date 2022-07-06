import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const DashboardDueSoon = ({ tasks }) => {
  const dueSoon = tasks.filter(
    (task) => task.dueDate && !task.isComplete && Date.now() - task.dueDate < 1000 * 60 * 60 * 24
  )

  const percentOfComplete = tasks.length ? parseInt((dueSoon.length / tasks.length) * 100) : 0

  return (
    <div className="dashboard-due-soon dashboard-side-item">
      <div className="text-container">
        <h1 className="title">Due soon</h1>
        <h2 className="info">{dueSoon.length} Tasks</h2>
      </div>
      <div className="chart-container">
        <CircularProgressbar
          value={percentOfComplete}
          text={`${percentOfComplete}%`}
          styles={buildStyles({ pathColor: '#FAC213', textColor: '#FAC213' })}
        />
      </div>
    </div>
  )
}
