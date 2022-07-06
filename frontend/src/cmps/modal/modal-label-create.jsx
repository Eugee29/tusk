import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setModal } from '../../store/app/app.actions'

import { utilService } from '../../services/util.service.js'

export const ModalLabelCreate = ({ task, board, onUpdateBoard, updateTask }) => {
  const [labelName, setLabelName] = useState('')
  const [color, setColor] = useState('#7bc86c')
  const [updatedBoard, setUpdatedBoard] = useState(board)
  const { modal } = useSelector(({ appModule }) => appModule)

  const searchInput = useRef(null)
  const firstLoad = useRef(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!firstLoad.current) firstLoad.current = true
    else onUpdateBoard(updatedBoard)
    // eslint-disable-next-line
  }, [updatedBoard])

  const onCreateLabel = () => {
    board.labels.push({
      id: utilService.makeId(3),
      title: labelName,
      color: color,
    })
    setUpdatedBoard(board)
    onOpenModal('Labels')
  }

  const onPickColor = (color) => {
    setColor(color)
  }

  const handleChange = ({ target }) => {
    setLabelName(target.value)
  }

  const onOpenModal = (category) => {
    dispatch(
      setModal({
        element: modal.element,
        category,
        title: category,
        props: {
          task,
          updateTask,
          board,
          onUpdateBoard,
          element: modal.element,
        },
      })
    )
  }

  return (
    <div className="create-section">
      <div className="search-box">
        <h3 className="label">Name</h3>
        <input ref={searchInput} type="text" name="search" value={labelName} onChange={handleChange} />
      </div>

      <div className="create-box">
        <h3 className="label">Select a color</h3>

        <div className="colors-section">
          <div className="box-container">
            <button
              onClick={() => {
                onPickColor('#7BC86C')
              }}
              style={{ backgroundColor: `#7BC86C` }}
            ></button>
            <button
              onClick={() => {
                onPickColor('#F5DD29')
              }}
              style={{ backgroundColor: `#F5DD29` }}
            ></button>
            <button
              onClick={() => {
                onPickColor('#FFAF3F')
              }}
              style={{ backgroundColor: `#FFAF3F` }}
            ></button>
            <button
              onClick={() => {
                onPickColor('#EF7564')
              }}
              style={{ backgroundColor: `#EF7564` }}
            ></button>
            <button
              onClick={() => {
                onPickColor('#CD8DE5')
              }}
              style={{ backgroundColor: `#CD8DE5` }}
            ></button>
            <button
              onClick={() => {
                onPickColor('#5BA4CF')
              }}
              style={{ backgroundColor: `#5BA4CF` }}
            ></button>
            <button
              onClick={() => {
                onPickColor('#29CCE5')
              }}
              style={{ backgroundColor: `#29CCE5` }}
            ></button>
            <button
              onClick={() => {
                onPickColor('#6DECA9')
              }}
              style={{ backgroundColor: `#6DECA9` }}
            ></button>
            <button
              onClick={() => {
                onPickColor('#FF8ED4')
              }}
              style={{ backgroundColor: `#FF8ED4` }}
            ></button>
            <button
              onClick={() => {
                onPickColor('#172B4D')
              }}
              style={{ backgroundColor: `#172B4D` }}
            ></button>
          </div>
        </div>

        <button onClick={onCreateLabel}>Create</button>
      </div>
    </div>
  )
}
