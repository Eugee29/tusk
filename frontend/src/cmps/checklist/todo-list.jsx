import { TodoPreview } from './todo-preview'

export const TodoList = ({ filteredChecklist, checklist, updateChecklist }) => {
  const updateTodo = (todoToUpdate) => {
    const updatedTodos = checklist.todos.map((todo) => (todo.id === todoToUpdate.id ? todoToUpdate : todo))
    updateChecklist({ ...checklist, todos: updatedTodos })
  }

  return (
    <ul className="todo-list">
      {filteredChecklist.todos.map((todo) => (
        <TodoPreview
          key={todo.id}
          todo={todo}
          updateChecklist={updateChecklist}
          checklist={filteredChecklist}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  )
}
