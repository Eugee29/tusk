import { useDispatch } from 'react-redux'
import { setModal } from '../../store/app/app.actions'

export const TodoActions = ({ checklist, updateChecklist, todoId }) => {
  const dispatch = useDispatch()

  const onDeleteTodo = () => {
    dispatch(setModal(null))
    const updatedTodos = checklist.todos.filter((todo) => todo.id !== todoId)
    const updatedChecklist = { ...checklist, todos: updatedTodos }
    updateChecklist(updatedChecklist)
  }

  return (
    <section className="todo-actions">
      <button className="delete-btn" onClick={onDeleteTodo}>
        Delete
      </button>
    </section>
  )
}
