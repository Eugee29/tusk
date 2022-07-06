import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const DashboardOverdue = ({ tasks }) => {
  const overdue = tasks.filter((task) => task.dueDate && !task.isComplete && Date.now() - task.dueDate > 0)

  const percentOfComplete = tasks.length ? parseInt((overdue.length / tasks.length) * 100) : 0

  return (
    <div className="dashboard-overdue dashboard-side-item">
      <div className="text-container">
        <h1 className="title">Overdue</h1>
        <h2 className="info">{overdue.length} Tasks</h2>
      </div>
      <div className="chart-container">
        <CircularProgressbar
          value={percentOfComplete}
          text={`${percentOfComplete}%`}
          styles={buildStyles({ pathColor: '#b04632', textColor: '#b04632' })}
        />
      </div>
    </div>
  )
}
