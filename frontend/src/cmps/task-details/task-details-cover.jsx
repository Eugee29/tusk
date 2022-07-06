import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setModal } from '../../store/app/app.actions'
import { utilService } from '../../services/util.service'

import FastAverageColor from 'fast-average-color'
import { FaWindowMaximize } from 'react-icons/fa'
import { VscClose } from 'react-icons/vsc'

export function TaskDetailsCover({ task, updateTask }) {
  const buttonRef = useRef()
  const [bgColor, setBgColor] = useState(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const dispatch = useDispatch()

  const fac = new FastAverageColor()

  useEffect(() => {
    if (task?.style?.imgURL) loadBgColor()
    // eslint-disable-next-line
  }, [task])

  const loadBgColor = async () => {
    try {
      const color = await fac.getColorAsync(task.style.imgURL)
      setBgColor(color.hexa)
    } catch (err) {
      setBgColor('white')
    }
  }

  const onFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }
  const onGoBack = (ev) => {
    ev.stopPropagation()
    setIsFullScreen(false)
  }

  const onModal = (category) => {
    dispatch(
      setModal({
        element: buttonRef.current,
        category,
        title: category,
        props: { task, updateTask },
      })
    )
  }

  return (
    <header>
      {task?.style?.bgColor && (
        <div className="task-details-cover color" style={{ backgroundColor: `${task.style.bgColor}` }}>
          <button
            ref={buttonRef}
            onClick={(ev) => {
              ev.stopPropagation()
              onModal('Cover')
            }}
          >
            {' '}
            <FaWindowMaximize /> Cover{' '}
          </button>
        </div>
      )}

      {task?.style?.imgURL && utilService.getExtension(task.style.imgURL) === 'image' && (
        <div
          className="task-details-cover img point"
          onClick={onFullScreen}
          style={{ backgroundColor: bgColor, backgroundImage: `url('${task.style.imgURL}')` }}
        >
          <button
            ref={buttonRef}
            onClick={(ev) => {
              ev.stopPropagation()
              onModal('Cover')
            }}
          >
            <FaWindowMaximize />
            Cover
          </button>
        </div>
      )}
      {task?.style?.imgURL && utilService.getExtension(task.style.imgURL) === 'video' && (
        <div className="task-details-cover img">
          <video height="160" width="100%" muted controls>
            <source src={task.style.imgURL} type="video/mp4"></source>
          </video>
          <button
            ref={buttonRef}
            onClick={(ev) => {
              ev.stopPropagation()
              onModal('Cover')
            }}
          >
            <FaWindowMaximize />
            Cover
          </button>
        </div>
      )}
      {isFullScreen && (
        <div className="background-blur" onClick={onGoBack}>
          <button className="go-back-button" onClick={onGoBack}>
            <VscClose className="close-icon" style={{ color: '#ffffff' }} />
          </button>
          <div className="full-screen">
            <div
              className="task-details-cover img"
              style={{ backgroundImage: `url('${task.style.imgURL}')`, height: '80vh' }}
            ></div>
          </div>
        </div>
      )}

      {isFullScreen && (
        <div className="background-blur">
          <button className="go-back-button" onClick={onGoBack}>
            <VscClose className="close-icon" style={{ color: '#ffffff' }} />
          </button>
          <div className="full-screen">
            <div
              className="task-details-cover img"
              style={{ backgroundImage: `url('${task.style.imgURL}')`, height: '80vh' }}
            ></div>
          </div>
        </div>
      )}
    </header>
  )
}
