import axios from 'axios'

export const uploadService = {
  uploadImg,
}
async function uploadImg(ev) {
  const CLOUD_NAME = 'tusk'
  const UPLOAD_PRESET = 'sg0rbgo0'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', ev.target.files[0])

  try {
    const res = await axios.post(UPLOAD_URL, formData)
    return res.data
  } catch (err) {
    throw err
  }
}
