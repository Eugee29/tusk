export const DashboardAllTasks = ({ tasks }) => {
  return (
    <div className="dashboard-all-tasks dashboard-side-item">
      <div className="text-container">
        <h1 className="title">All tasks</h1>
        <h2 className="info">{tasks.length} Tasks</h2>
      </div>
    </div>
  )
}
