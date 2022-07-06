import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setModal } from '../../store/app/app.actions'
import { utilService } from '../../services/util.service'

import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'

export const ModalDates = ({ task, updateTask, element, group }) => {
  const modalRef = useRef()
  const [value, setValue] = React.useState(task.dueDate)
  const [time, setTime] = useState(utilService.getTimeFormat(value))

  const dispatch = useDispatch()

  const onSave = () => {
    const updatedTask = { ...task }

    const newDate = utilService.getNewDateTime(value, time)
    if (newDate) updatedTask.dueDate = newDate
    else updatedTask.dueDate = value

    const activity = {
      actionType: 'change date',
      dueDate: updatedTask.dueDate,
      task: {
        id: task.id,
        title: task.title,
      },
      group: {
        id: group.id,
        title: group.title,
      },
    }

    updateTask(updatedTask, activity)
    dispatch(setModal(null))
  }

  const onRemove = () => {
    const updatedTask = { ...task }
    updatedTask.dueDate = ''
    updateTask(updatedTask)
    dispatch(setModal(null))
  }

  const handleChange = ({ target }) => {
    setTime(target.value)
  }

  return (
    <div className="modal-dates" ref={modalRef}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={value}
          toolbarTitle={utilService.getYearMonthFormat(value)}
          onChange={(newValue) => {
            setValue(new Date(newValue).getTime())
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <div className="date-container">
        <div className="display-date">{utilService.getDateTimeFormat(value).displayDateOnly}</div>
        <input className="pick-time" type="text" onChange={handleChange} value={time}></input>
      </div>
      <div className="save" onClick={onSave}>
        Save
      </div>
      <div className="save gray" onClick={onRemove}>
        Remove
      </div>
    </div>
  )
}
