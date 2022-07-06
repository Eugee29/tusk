import { ArchivedPreview } from './archived-preview'

export function ArchivedList({ board, onUpdateBoard }) {
  if (!board.groups) return

  const groups = board.groups.map((group) => group.tasks.map((task) => ({ groupId: group.id, task })))
  const tasks = []
  for (let i = 0; i < groups.length; i++) {
    tasks.push(...groups[i])
  }

  return (
    <div className="group-preview archived">
      <div className="task-list archived">
        {tasks.some((task) => task.task.archivedAt) ? (
          tasks.map(
            (task, index) =>
              task.task.archivedAt && (
                <ArchivedPreview
                  key={task.task.id}
                  board={board}
                  groupId={task.groupId}
                  task={task.task}
                  index={index}
                  onUpdateBoard={onUpdateBoard}
                />
              )
          )
        ) : (
          <div className="empty">Archive empty</div>
        )}
      </div>
    </div>
  )
}
