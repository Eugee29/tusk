import { useState, useEffect, useRef } from 'react'

import { utilService } from '../services/util.service'

export function ChangeBackgroundList({ board, onUpdateBoard }) {
  const unsplash = useRef()
  const [isColorOpen, setIsColorOpen] = useState(false)
  const [isImgOpen, setIsImgOpen] = useState(false)
  const [img, setImg] = useState('')
  const [res, setRes] = useState(unsplash.current || [])

  useEffect(() => {
    setRes(utilService.getDemoImages())
  }, [])

  const onToggleColor = () => {
    setIsColorOpen(!isColorOpen)
    setIsImgOpen(false)
  }
  const onToggleImg = () => {
    setIsImgOpen(!isImgOpen)
    setIsColorOpen(false)
  }

  const onPickColor = (color) => {
    const style = { bgImg: color }
    onUpdateBoard({ ...board, style: style })
  }

  const onPickImg = (url) => {
    const style = { bgImg: url }
    onUpdateBoard({ ...board, style: style })
  }

  const ACCESS_KEY = '6R9IL0iFJQ_9wFH326TzYeiQv7t3gmhpSGsUQcW78e8'

  const fetchRequest = async () => {
    const data = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${ACCESS_KEY}`)
    const dataJ = await data.json()
    const result = dataJ.results
    const miniRes = result.map((img) => img.urls)
    setRes(miniRes)
    unsplash.current = miniRes
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    fetchRequest()
    setImg('')
  }

  if (!board.groups) return

  return (
    <div className="background-list">
      <div className="category" onClick={onToggleImg}>
        <div
          className="image"
          style={{
            backgroundImage: `url('https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg')`,
          }}
        >
          {' '}
        </div>
        <div className="title">Photos</div>
      </div>

      <div className="category" onClick={onToggleColor}>
        <div
          className="image"
          style={{
            backgroundImage: `url('https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg')`,
          }}
        >
          {' '}
        </div>
        <div className="title">Colors</div>
      </div>

      {isColorOpen && (
        <div className="color-container">
          <button onClick={() => onPickColor('#0079bf')} style={{ backgroundColor: `#0079bf` }}></button>
          <button onClick={() => onPickColor('#d29034')} style={{ backgroundColor: `#d29034` }}></button>
          <button onClick={() => onPickColor('#519839')} style={{ backgroundColor: `#519839` }}></button>
          <button onClick={() => onPickColor('#b04632')} style={{ backgroundColor: `#b04632` }}></button>
          <button onClick={() => onPickColor('#89609e')} style={{ backgroundColor: `#89609e` }}></button>
          <button onClick={() => onPickColor('#cd5a91')} style={{ backgroundColor: `#cd5a91` }}></button>
          <button onClick={() => onPickColor('#4bbf6b')} style={{ backgroundColor: `#4bbf6b` }}></button>
          <button onClick={() => onPickColor('#00aecc')} style={{ backgroundColor: `#00aecc` }}></button>
          <button onClick={() => onPickColor('#838c91')} style={{ backgroundColor: `#838c91` }}></button>
        </div>
      )}

      {isImgOpen && (
        <div className="img-container">
          <div className="search-photos">
            <form onSubmit={onSubmit}>
              <input
                placeholder="Search Anything..."
                type="text"
                value={img}
                onChange={(ev) => setImg(ev.target.value)}
              ></input>
            </form>
            <span className="icon"></span>
          </div>

          <div className="unsplash-container">
            <div className="img-container ">
              {!!res.length &&
                res.map((val, idx) => (
                  <div
                    key={idx}
                    className="image"
                    onClick={() => onPickImg(val.full)}
                    style={{ backgroundImage: `url('${val.full}')` }}
                  >
                    {' '}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
