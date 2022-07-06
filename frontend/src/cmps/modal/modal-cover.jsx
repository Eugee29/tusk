import React, { useState } from 'react'

import { boardService } from '../../services/board.service'
import { uploadService } from '../../services/upload.service'
import { utilService } from '../../services/util.service'

export const ModalCover = ({ task, updateTask }) => {
  const [isOnPreviewTextColor, setIsOnPreviewTextColor] = useState(false)
  const [newTask, setNewTask] = useState(task)
  const [isCover, setIsCover] = useState(task.style.isCover || '')

  const fileURL = ''

  const onPreviewTextColor = (bool) => {
    setIsOnPreviewTextColor(bool)
  }

  const onChangeCover = (bool) => {
    setIsCover(bool)
    const updatedTask = { ...newTask }
    updatedTask.style.isCover = bool
    updateTask(updatedTask)
    setNewTask(updatedTask)
  }

  const onLightFont = (bool) => {
    const updatedTask = { ...newTask }
    updatedTask.style.isCover = true
    updatedTask.style.isLight = bool
    updateTask(updatedTask)
    setNewTask(updatedTask)
  }

  const onPickColor = (color) => {
    const updatedTask = { ...newTask }
    const style = { bgColor: color, isCover: isCover }
    updatedTask.style = style
    updateTask(updatedTask)
    setNewTask(updatedTask)
  }

  const onPickAttachments = (attach) => {
    const updatedTask = { ...newTask }
    const style = { imgURL: attach, isCover: isCover }
    updatedTask.style = style
    updateTask(updatedTask)
    setNewTask(updatedTask)
  }

  const onPickUnsplash = (url) => {
    const updatedTask = { ...newTask }
    const style = { imgURL: url, isCover: isCover }
    updatedTask.style = style
    updateTask(updatedTask)
    setNewTask(updatedTask)
  }

  const onRemoveCover = () => {
    const updatedTask = { ...newTask }
    const style = {}
    updatedTask.style = style
    updateTask(updatedTask)
    setNewTask(updatedTask)
  }

  const addAttachment = async (ev) => {
    ev.preventDefault()

    if (!ev.target.files) ev.target.files = [fileURL]
    if (!newTask.attachments) newTask.attachments = []
    let attachment = boardService.getEmptyAttachment()
    const updatedTask = { ...newTask }

    try {
      const res = await uploadService.uploadImg(ev)
      attachment.fileName = res.original_filename
      attachment.fileUrl = res.secure_url
      updatedTask.attachments.unshift(attachment)
      updateTask(updatedTask)
      setNewTask(updatedTask)
    } catch (err) {
      attachment.fileName = fileURL
      attachment.fileUrl = fileURL
      updatedTask.attachments.unshift(attachment)
      updateTask(updatedTask)
      setNewTask(updatedTask)
    }
  }

  return (
    <React.Fragment>
      <div className="size-section">
        <h3 className="label">Size</h3>
        <div className="box-container">
          <button
            className={`box-half`}
            onClick={() => {
              onPreviewTextColor(false)
              onChangeCover(false)
            }}
          >
            <div
              className="background"
              style={{ background: newTask?.style?.imgURL ? `url('${newTask.style.imgURL}')` : newTask.style.bgColor }}
            ></div>
            <div className="lines">
              <div className="lines_1"></div>
              <div className="lines_2"></div>
              <div className="lines_3">
                <div className="lines_3_1"></div>
                <div className="lines_3_2"></div>
              </div>
              <div className="lines_4"></div>
            </div>
          </button>

          <button
            className={`box-full`}
            onClick={() => {
              onPreviewTextColor(true)
              onChangeCover(true)
            }}
            style={
              newTask?.style?.imgURL
                ? {
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('${newTask.style.imgURL}')`,
                  }
                : { background: newTask.style.bgColor }
            }
          >
            <div className="lines">
              <div className="lines_1"></div>
              <div className="lines_2"></div>
            </div>
          </button>
          <span onClick={onRemoveCover} className="cover-btn">
            Remove cover
          </span>
        </div>
      </div>

      {isOnPreviewTextColor && (
        <div className="textcolor-section">
          <h3 className="label">Text color</h3>
          <div className="box-container">
            <button
              className={`box-full`}
              onClick={() => {
                onLightFont(true)
              }}
              style={
                newTask?.style?.imgURL
                  ? {
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${newTask.style.imgURL}')`,
                    }
                  : { background: newTask.style.bgColor }
              }
            >
              <h3>{newTask.title}</h3>
            </button>
            <button
              className={`box-full`}
              onClick={() => {
                onLightFont(false)
              }}
              style={
                newTask?.style?.imgURL
                  ? {
                      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('${newTask.style.imgURL}')`,
                    }
                  : { background: newTask.style.bgColor }
              }
            >
              <h3 className="dark">{newTask.title}</h3>
            </button>
          </div>
        </div>
      )}

      <div className="colors-section">
        <h3 className="label">Colors</h3>
        <div className="box-container">
          <button onClick={() => onPickColor('#7BC86C')} style={{ backgroundColor: `#7BC86C` }}></button>
          <button onClick={() => onPickColor('#F5DD29')} style={{ backgroundColor: `#F5DD29` }}></button>
          <button onClick={() => onPickColor('#FFAF3F')} style={{ backgroundColor: `#FFAF3F` }}></button>
          <button onClick={() => onPickColor('#EF7564')} style={{ backgroundColor: `#EF7564` }}></button>
          <button onClick={() => onPickColor('#CD8DE5')} style={{ backgroundColor: `#CD8DE5` }}></button>
          <button onClick={() => onPickColor('#5BA4CF')} style={{ backgroundColor: `#5BA4CF` }}></button>
          <button onClick={() => onPickColor('#29CCE5')} style={{ backgroundColor: `#29CCE5` }}></button>
          <button onClick={() => onPickColor('#6DECA9')} style={{ backgroundColor: `#6DECA9` }}></button>
          <button onClick={() => onPickColor('#FF8ED4')} style={{ backgroundColor: `#FF8ED4` }}></button>
          <button onClick={() => onPickColor('#172B4D')} style={{ backgroundColor: `#172B4D` }}></button>
        </div>
      </div>

      <div className="attachments-section">
        <h3 className="label">Attachments</h3>
        <div className="box-container">
          {newTask?.attachments &&
            !!newTask?.attachments.length &&
            newTask?.attachments.map(
              (attachment) =>
                utilService.isImage(attachment.fileUrl) && (
                  <button
                    key={attachment.id}
                    onClick={() => onPickAttachments(attachment.fileUrl)}
                    className="box-full"
                    style={{ backgroundImage: `url('${attachment.fileUrl}')` }}
                  ></button>
                )
            )}
        </div>

        <label htmlFor="file-upload" className="custom-file-upload cover-btn">
          <i className=""></i> Upload a cover image
        </label>
        <input id="file-upload" type="file" onInput={addAttachment} />
      </div>

      <div className="unsplash-section">
        <h3 className="label">Photos from Unsplash</h3>
        <div className="box-container">
          <button
            className="box-full"
            onClick={() =>
              onPickUnsplash(
                'https://images.unsplash.com/photo-1653511442060-00c7b10827c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDZ8MzE3MDk5fHx8fHwyfHwxNjUzNzQzMTM5&ixlib=rb-1.2.1&q=80&w=200'
              )
            }
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1653511442060-00c7b10827c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDZ8MzE3MDk5fHx8fHwyfHwxNjUzNzQzMTM5&ixlib=rb-1.2.1&q=80&w=200')`,
            }}
          ></button>
          <button
            className="box-full"
            onClick={() =>
              onPickUnsplash(
                'https://images.unsplash.com/photo-1653496905343-b1fc1277e3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDV8MzE3MDk5fHx8fHwyfHwxNjUzNzQzMTM5&ixlib=rb-1.2.1&q=80&w=200'
              )
            }
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1653496905343-b1fc1277e3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDV8MzE3MDk5fHx8fHwyfHwxNjUzNzQzMTM5&ixlib=rb-1.2.1&q=80&w=200')`,
            }}
          ></button>
          <button
            className="box-full"
            onClick={() =>
              onPickUnsplash(
                'https://images.unsplash.com/photo-1652543549421-ea252bd209f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjUzNzQzMTM5&ixlib=rb-1.2.1&q=80&w=200'
              )
            }
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1652543549421-ea252bd209f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjUzNzQzMTM5&ixlib=rb-1.2.1&q=80&w=200')`,
            }}
          ></button>
          <button
            className="box-full"
            onClick={() =>
              onPickUnsplash(
                'https://images.unsplash.com/photo-1653450283266-c788c2ca4ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjUzODAwNzQ5&ixlib=rb-1.2.1&q=80&w=200'
              )
            }
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1653450283266-c788c2ca4ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjUzODAwNzQ5&ixlib=rb-1.2.1&q=80&w=200')`,
            }}
          ></button>
          <button
            className="box-full"
            onClick={() =>
              onPickUnsplash(
                'https://images.unsplash.com/photo-1653419831613-56ed2a1c8ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjUzNzQzMTM5&ixlib=rb-1.2.1&q=80&w=200'
              )
            }
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1653419831613-56ed2a1c8ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjUzNzQzMTM5&ixlib=rb-1.2.1&q=80&w=200')`,
            }}
          ></button>
          <button
            className="box-full"
            onClick={() =>
              onPickUnsplash(
                'https://images.unsplash.com/photo-1653592328269-09c14b3628f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjUzNzQzMTM5&ixlib=rb-1.2.1&q=80&w=200'
              )
            }
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1653592328269-09c14b3628f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjUzNzQzMTM5&ixlib=rb-1.2.1&q=80&w=200')`,
            }}
          ></button>
        </div>
      </div>
    </React.Fragment>
  )
}
