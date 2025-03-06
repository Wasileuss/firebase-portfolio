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
  updateDoc,
} from 'firebase/firestore'
import Modal from '../client/Modal.jsx'
import useFetchCollection from '../../hooks/useFetchCollection.js'
import Select from '../ui/Select.jsx'
import Button from '../ui/Button.jsx'
import AdminForm from './AdminForm.jsx'
import AdminItem from './AdminItem.jsx'

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
  const [editItem, setEditItem] = useState('')
  const [oldImgUrls, setOldImgUrls] = useState([])
  const [images, setImages] = useState(['', '', ''])
  const fileInputRefs = [useRef(null), useRef(null), useRef(null)]
  const [showModal, setShowModal] = useState(false)
  const [expandedItem, setExpandedItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
    if (!file) return

    setIsLoading(true)

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
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
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
    fileInputRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.value = null
      }
    })
  }

  const handleClick = async () => {
    if (!title) {
      alert('Please complete the required fields')
      return
    }

    setIsLoading(true)

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
        })
      }

      resetForm()
    } catch (error) {
      console.error('Error adding/updating document:', error.message)
      alert(
        'An error occurred while adding/updating the document. Please try again.',
      )
    } finally {
      setIsLoading(false)
      setShowModal(false)
    }
  }

  const handleCloseModal = () => {
    resetForm()
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
          disabled={isLoading} // Блокуємо кнопку при завантаженні
        >
          {isLoading ? 'Loading...' : 'Add New'}
        </Button>
      </form>
      <Modal isOpen={showModal} editItem={editItem} onClose={handleCloseModal}>
        <AdminForm
          title={title}
          setTitle={setTitle}
          num={num}
          setNum={setNum}
          link={link}
          setLink={setLink}
          desc={desc}
          setDesc={setDesc}
          content={content}
          setContent={setContent}
          period={period}
          setPeriod={setPeriod}
          info1={info1}
          setInfo1={setInfo1}
          info2={info2}
          setInfo2={setInfo2}
          info3={info3}
          setInfo3={setInfo3}
          images={images}
          setImages={setImages}
          fileInputRefs={fileInputRefs}
          oldImgUrls={oldImgUrls}
          handleUpload={handleUpload}
          handleClick={handleClick}
          editItem={editItem}
          setEditItem={setEditItem}
          isLoading={isLoading} // Передаємо в AdminForm
        />
      </Modal>
      <ul className="admin__list">
        {data
          .sort((a, b) => {
            const numA = typeof a.num === 'number' ? a.num : Number(a.num)
            const numB = typeof b.num === 'number' ? b.num : Number(b.num)
            return numB - numA
          })
          .map((value) => (
            <AdminItem
              key={value.id}
              value={value}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              expandedItem={expandedItem}
              toggleAccordion={toggleAccordion}
            />
          ))}
      </ul>
    </div>
  )
}

export default Admin
