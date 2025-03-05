import { useEffect, useRef, useState } from 'react'
import { db, storage } from '../../firebaseConfig.js'
import { v4 as uuidv4 } from 'uuid'
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import Modal from '../client/Modal.jsx'
import useFetchCollection from '../../hooks/useFetchCollection.js'
import Select from '../ui/Select.jsx'
import Input from '../ui/Input.jsx'
import Button from '../ui/Button.jsx'
import { capitalize } from '../../utils/capitalize.js'

const options = [
  { value: 'projects' },
  { value: 'courses' },
  { value: 'about' },
  { value: 'info' },
  { value: 'social' },
]

function Admin() {
  const [selectedCategory, setSelectedCategory] = useState('projects')
  const { data } = useFetchCollection(selectedCategory)
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [desc, setDesc] = useState('')
  const [content, setContent] = useState('')
  const [period, setPeriod] = useState('')
  const [info1, setInfo1] = useState('')
  const [info2, setInfo2] = useState('')
  const [info3, setInfo3] = useState('')
  const [num, setNum] = useState('')
  const [editItem, setEditItem] = useState(null)
  const [oldImgUrls, setOldImgUrls] = useState([])
  const [images, setImages] = useState(['', '', ''])
  const fileInputRefs = [useRef(null), useRef(null), useRef(null)]
  const [showModal, setShowModal] = useState(false)
  const [expandedItem, setExpandedItem] = useState(null)

  useEffect(() => {
    document.body.classList.toggle('lock', showModal)

    return () => {
      document.body.classList.remove('lock')
    }
  }, [showModal])

  const toggleAccordion = (id) => {
    setExpandedItem((prev) => (prev === id ? null : id))
  }

  const handleUpload = async (e, index) => {
    const file = e.target.files[0]

    // if (!file) {
    //   console.error('No file selected')
    //   return
    // }

    if (editItem && oldImgUrls[index]) {
      const imgRef = storageRef(storage, oldImgUrls[index])
      try {
        await deleteObject(imgRef)
      } catch (error) {
        console.error('Error deleting old file:', error.message)
      }
    }

    const imageRef = storageRef(
      storage,
      `images/${selectedCategory}/${uuidv4()}`,
    )

    try {
      const data = await uploadBytes(imageRef, file)
      const imgUrl = await getDownloadURL(data.ref)
      setImages((prev) => {
        const newImages = [...prev]
        newImages[index] = imgUrl
        return newImages
      })
    } catch (error) {
      console.error('Error uploading file:', error.message)
    }
  }

  const handleClick = async () => {
    if (!title) {
      alert('Please complete the required fields')
      return
    }

    try {
      if (editItem) {
        await updateDoc(doc(db, selectedCategory, editItem), {
          title,
          link,
          desc,
          content,
          period,
          info1,
          info2,
          info3,
          num,
          images,
        })
        setEditItem(null)
        setOldImgUrls([])
      } else {
        await addDoc(collection(db, selectedCategory), {
          category: selectedCategory,
          title,
          link,
          desc,
          content,
          period,
          info1,
          info2,
          info3,
          num,
          images,
          timestamp: serverTimestamp(),
        })
      }

      setTitle('')
      setLink('')
      setDesc('')
      setContent('')
      setPeriod('')
      setNum('')
      setInfo1('')
      setInfo2('')
      setInfo3('')
      setImages(['', '', ''])
      fileInputRefs.forEach((ref) => (ref.current.value = null))
    } catch (error) {
      console.error('Error adding/updating document:', error.message)
      alert(
        'An error occurred while adding/updating the document. Please try again.',
      )
    }
    setShowModal(false)
  }

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id)
    if (itemToEdit) {
      setTitle(itemToEdit.title)
      setLink(itemToEdit.link)
      setDesc(itemToEdit.desc)
      setContent(itemToEdit.content)
      setPeriod(itemToEdit.period)
      setNum(itemToEdit.num)
      setInfo1(itemToEdit.info1)
      setInfo2(itemToEdit.info2)
      setInfo3(itemToEdit.info3)
      setImages(itemToEdit.images)
      setEditItem(id)
      setOldImgUrls(itemToEdit.images)
      setShowModal(true)
    }
  }

  const handleCloseModal = () => {
    setTitle('')
    setLink('')
    setDesc('')
    setContent('')
    setPeriod('')
    setNum('')
    setInfo1('')
    setInfo2('')
    setInfo3('')
    setImages(['', '', ''])
    setEditItem(null)
    fileInputRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.value = null
      }
    })
    setShowModal(false)
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this item?',
    )
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, selectedCategory, id))
        const itemToDelete = data.find((item) => item.id === id)
        if (itemToDelete) {
          for (const imgUrl of itemToDelete.images) {
            if (imgUrl) {
              const imgRef = storageRef(storage, imgUrl)
              await deleteObject(imgRef)
            }
          }
        }
      } catch (error) {
        console.error('Error deleting document:', error.message)
        alert(
          'An error occurred while deleting the document. Please try again.',
        )
      }
    }
  }

  return (
    <div className="admin">
      <h1 className="admin__title title">Admin Panel</h1>
      <form id="admin-header" name="admin-header" className="admin__header">
        <Select
          className="admin__select"
          id="admin-select"
          name="admin-select"
          options={options}
          value={selectedCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Button
          className="admin__button input-border"
          variant="primary"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add New
        </Button>
      </form>
      <Modal isOpen={showModal} editItem={editItem} onClose={handleCloseModal}>
        <form className="admin__form" id="admin-form" name="admin-form">
          <Input
            className="input-border"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title*"
            required
          />
          <Input
            className="input-border"
            type="text"
            onChange={(e) => setNum(e.target.value)}
            value={num}
            placeholder="Item Number"
            required
          />
          <Input
            className="input-border"
            type="text"
            onChange={(e) => setLink(e.target.value)}
            value={link}
            placeholder="Link"
            required
          />
          <textarea
            className="input-border"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder="Description"
            required
          />
          <Input
            className="input-border"
            type="text"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Content"
          />
          <Input
            className="input-border"
            type="text"
            onChange={(e) => setPeriod(e.target.value)}
            value={period}
            placeholder="Period"
          />
          <Input
            className="input-border"
            type="text"
            onChange={(e) => setPeriod(e.target.value)}
            value={info1}
            placeholder="Info 1"
          />
          <Input
            className="input-border"
            type="text"
            onChange={(e) => setPeriod(e.target.value)}
            value={info2}
            placeholder="Info 2"
          />
          <Input
            className="input-border"
            type="text"
            onChange={(e) => setPeriod(e.target.value)}
            value={info3}
            placeholder="Info 3"
          />
          {images.map((img, index) => (
            <div className="admin__image-input" key={index}>
              <Input
                className="input-border"
                type="file"
                onChange={(e) => handleUpload(e, index)}
                ref={fileInputRefs[index]}
              />
              <Input
                className="input-border"
                type="text"
                value={img}
                onChange={(e) =>
                  setImages((prev) => {
                    const newImages = [...prev]
                    newImages[index] = e.target.value
                    return newImages
                  })
                }
                placeholder={`Image ${index + 1} URL`}
              />
            </div>
          ))}
          <Button
            className="admin__button"
            variant={editItem ? 'secondary' : 'primary'}
            type="button"
            onClick={handleClick}
          >
            {editItem ? 'Update' : 'Add'}
          </Button>
        </form>
      </Modal>
      <ul className="admin__list">
        {data
          .sort((a, b) => b.num - a.num)
          .map((value) => (
            <li className="admin__item" key={value.id}>
              <h3
                className="admin__title input-border"
                onClick={() => toggleAccordion(value.id)}
              >
                {capitalize(value.category)}: No.{value.num}
              </h3>
              <div
                className={`accordion-content ${expandedItem === value.id ? 'expanded' : ''}`}
              >
                <p className="input-border">Title: {value.title}</p>
                <p className="input-border input-border--break">
                  Link: {value.link}
                </p>
                <p className="input-border">Description: {value.desc}</p>
                <p className="input-border">Content: {value.content}</p>
                <p className="input-border">Period: {value.period}</p>
                <p className="input-border">Info 1: {value.info1}</p>
                <p className="input-border">Info 2: {value.info2}</p>
                <p className="input-border">Info 3: {value.info3}</p>
                <div className="admin__images">
                  {value.images?.map(
                    (img, index) =>
                      img && (
                        <img
                          className="admin__image"
                          rel="preload"
                          loading="eager"
                          key={index}
                          src={img}
                          alt={`img-${index}`}
                          height="50px"
                        />
                      ),
                  )}
                </div>
                <div className="admin__buttons">
                  <Button
                    className="input-border"
                    type="button"
                    variant="secondary"
                    onClick={() => handleEdit(value.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="input-border"
                    type="button"
                    variant="delete"
                    onClick={() => handleDelete(value.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Admin
