import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const DashboardComplete = ({ tasks }) => {
  const completeTasks = tasks.filter((task) => task.isComplete)

  const percentOfComplete = tasks.length ? parseInt((completeTasks.length / tasks.length) * 100) : 0

  return (
    <div className="dashboard-due-soon dashboard-side-item">
      <div className="text-container">
        <h1 className="title">Completed</h1>
        <h2 className="info">{completeTasks.length} tasks</h2>
      </div>
      <div className="chart-container">
        <CircularProgressbar
          value={percentOfComplete}
          text={`${percentOfComplete}%`}
          styles={buildStyles({ pathColor: '#5aac44', textColor: '#5aac44' })}
        />
      </div>
    </div>
  )
}
