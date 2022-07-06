import { useEffect } from 'react'
import { useState } from 'react'

export function LabelList({ labelIds, board, toggleLabels, isLabelsOpen }) {
  const [boardLabels, setBoardLabels] = useState()
  const [taskLabels, setTaskLabels] = useState(labelIds)

  useEffect(() => {
    setBoardLabels(board.labels)
    setTaskLabels(labelIds)
    // eslint-disable-next-line
  }, [labelIds])

  const getLabelValueById = (type, labelId) => {
    if (!boardLabels) return
    const currLabel = boardLabels.find((label) => label.id === labelId)
    const { color, title } = currLabel

    if (type === 'color') return { backgroundColor: `${color}` }
    if (type === 'title') return title
  }

  const getLabelClass = () => {
    let className
    if (isLabelsOpen === 'initial') {
      return 'label'
    } else className = isLabelsOpen ? 'label open' : 'label close'
    return className
  }

  const onToggleLabel = (ev) => {
    ev.stopPropagation()
    toggleLabels()
  }

  return (
    <section className="label-list">
      {taskLabels &&
        taskLabels.map((label) => (
          <div
            onClick={onToggleLabel}
            className={getLabelClass()}
            key={label}
            style={getLabelValueById('color', label)}
          >
            {' '}
            {getLabelValueById('title', label)}{' '}
          </div>
        ))}
    </section>
  )
}
