import { ChecklistPreview } from './checklist-preview'

export const ChecklistList = ({ task, updateTask }) => {
  const { checklists } = task

  const updateChecklist = (checklistToUpdate) => {
    const updatedChecklists = checklists.map((checklist) =>
      checklist.id === checklistToUpdate.id ? checklistToUpdate : checklist
    )
    updateTask({ ...task, checklists: updatedChecklists })
  }

  return (
    <ul className="checklist-list">
      {checklists.map((checklist) => (
        <ChecklistPreview
          key={checklist.id}
          checklist={checklist}
          updateChecklist={updateChecklist}
          checklists={checklists}
          updateTask={updateTask}
          task={task}
        />
      ))}
    </ul>
  )
}
