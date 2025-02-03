import {useState, useRef, useEffect} from "react"
import { db, storage } from "../../firebaseConfig.js"
import { v4 as uuidv4 } from "uuid"
import { getDownloadURL, ref as storageRef, uploadBytes, deleteObject } from "firebase/storage"
import { addDoc, collection, serverTimestamp, updateDoc, doc, deleteDoc } from "firebase/firestore"
import Modal from "../client/Modal.jsx"
import useFetchCollection from "../../hooks/useFetchCollection.js"
import Select from "../ui/Select.jsx"
import Input from "../ui/Input.jsx"
import Button from "../ui/Button.jsx"
import { useAuth } from './Auth.jsx'

function Admin() {
    const [selectedCategory, setSelectedCategory] = useState("projects")
    const { data} = useFetchCollection(selectedCategory)
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")
    const [desc, setDesc] = useState("")
    const [content, setContent] = useState("")
    const [period, setPeriod] = useState("")
    const [num, setNum] = useState("")
    const [editItem, setEditItem] = useState(null)
    const [oldImgUrls, setOldImgUrls] = useState([])
    const [images, setImages] = useState(["", "", ""])
    const fileInputRefs = [useRef(null), useRef(null), useRef(null)]
    const [showModal, setShowModal] = useState(false)
    const [expandedItem, setExpandedItem] = useState(null)
    const { logout } = useAuth()

    useEffect(() => {
        document.body.classList.toggle("lock", showModal)

        return () => {
            document.body.classList.remove("lock")
        }
    }, [showModal])

    const toggleAccordion = (id) => {
        setExpandedItem(prev => (prev === id ? null : id));
    }

    const handleUpload = async (e, index) => {
        const file = e.target.files[0]

        if (!file) {
            console.error("No file selected")
            return
        }

        if (editItem && oldImgUrls[index]) {
            const imgRef = storageRef(storage, oldImgUrls[index])
            try {
                await deleteObject(imgRef)
            } catch (error) {
                console.error("Error deleting old file:", error.message)
            }
        }

        const imageRef = storageRef(storage, `Images/${selectedCategory}/${uuidv4()}`)

        try {
            const data = await uploadBytes(imageRef, file)
            const imgUrl = await getDownloadURL(data.ref)
            setImages(prev => {
                const newImages = [...prev]
                newImages[index] = imgUrl
                return newImages
            })
        } catch (error) {
            console.error("Error uploading file:", error.message)
        }
    }

    const handleClick = async () => {
        if (!title || !link || !desc || !images[0]) {
            alert("Please complete the required fields, including at least one image")
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
                    num,
                    images
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
                    num,
                    images,
                    timestamp: serverTimestamp()
                })
            }

            setTitle("")
            setLink("")
            setDesc("")
            setContent("")
            setPeriod("")
            setNum("")
            setImages(["", "", ""])
            fileInputRefs.forEach(ref => ref.current.value = null)
        } catch (error) {
            console.error("Error adding/updating document:", error.message)
            alert("An error occurred while adding/updating the document. Please try again.")
        }
        setShowModal(false)
    }

    const handleEdit = (id) => {
        const itemToEdit = data.find(item => item.id === id)
        if (itemToEdit) {
            setTitle(itemToEdit.title)
            setLink(itemToEdit.link)
            setDesc(itemToEdit.desc)
            setContent(itemToEdit.content)
            setPeriod(itemToEdit.period)
            setNum(itemToEdit.num)
            setImages(itemToEdit.images)
            setEditItem(id)
            setOldImgUrls(itemToEdit.images)
            setShowModal(true)
        }
    }

    const handleCloseModal = () => {
        setTitle("")
        setLink("")
        setDesc("")
        setContent("")
        setPeriod("")
        setNum("")
        setImages(["", "", ""])
        setEditItem(null)
        fileInputRefs.forEach(ref => {
            if (ref.current) {
                ref.current.value = null
            }
        })
        setShowModal(false)
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?")
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, selectedCategory, id))
                const itemToDelete = data.find(item => item.id === id)
                if (itemToDelete) {
                    for (const imgUrl of itemToDelete.images) {
                        if (imgUrl) {
                            const imgRef = storageRef(storage, imgUrl)
                            await deleteObject(imgRef)
                        }
                    }
                }
            } catch (error) {
                console.error("Error deleting document:", error.message)
                alert("An error occurred while deleting the document. Please try again.")
            }
        }
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
      <div className="admin">
          <h1 className="admin__title title">Admin Panel</h1>
          <div className="admin__header">
              <Select selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <Button className="input-border" variant="primary" type="button" onClick={() => setShowModal(true)}>Add
                  New</Button>
              <Button className="input-border" variant="delete" type="button" onClick={logout}>Logout</Button>
          </div>
          <Modal isOpen={showModal} editItem={editItem} onClose={handleCloseModal}>
              <Input className="input-border" type="text" onChange={(e) => setTitle(e.target.value)} value={title}
                     placeholder="Title*" required />
              <Input className="input-border" type="text" onChange={(e) => setNum(e.target.value)} value={num}
                     placeholder="Item Number" required />
              <Input className="input-border" type="text" onChange={(e) => setLink(e.target.value)} value={link}
                     placeholder="Link*" required />
              <textarea className="input-border" onChange={(e) => setDesc(e.target.value)} value={desc}
                        placeholder="Description*" required />
              <Input className="input-border" type="text" onChange={(e) => setContent(e.target.value)} value={content}
                     placeholder="Content" />
              <Input className="input-border" type="text" onChange={(e) => setPeriod(e.target.value)} value={period}
                     placeholder="Period" />
              {images.map((img, index) => (
                <div className="admin__image-input" key={index}>
                    <Input className="input-border" type="file" onChange={(e) => handleUpload(e, index)}
                           ref={fileInputRefs[index]} />
                    <Input className="input-border" type="text" value={img} onChange={(e) => setImages(prev => {
                        const newImages = [...prev]
                        newImages[index] = e.target.value
                        return newImages
                    })} placeholder={`Image ${index + 1} URL`} />
                </div>
              ))}
              <Button className="input-border" variant={editItem ? "secondary" : "primary"}
                      onClick={handleClick}>{editItem ? "Update" : "Add"}</Button>
          </Modal>
          <ul className="admin__list">
              {data.sort((a, b) => b.num - a.num).map(value => (
                <li className="admin__item" key={value.id}>
                    <h3 className="admin__title input-border" onClick={() => toggleAccordion(value.id)}>
                        {capitalize(value.category)}: No.{value.num}
                    </h3>
                    <div className={`accordion-content ${expandedItem === value.id ? "expanded" : ""}`}>
                        <p className="input-border">{value.title}</p>
                        <p className="input-border input-border--break">{value.link}</p>
                        <p className="input-border">{value.desc}</p>
                        <p className="input-border">{value.content}</p>
                        <p className="input-border">{value.period}</p>
                        <div className="admin__images">
                            {value.images?.map((img, index) => img &&
                              <img key={index} src={img} alt={`img-${index}`} height="50px" />
                            )}
                        </div>
                        <div className="admin__buttons">
                            <Button className="input-border" type="button" variant="secondary"
                                    onClick={() => handleEdit(value.id)}>Edit</Button>
                            <Button className="input-border" type="button" variant="delete"
                                    onClick={() => handleDelete(value.id)}>Delete</Button>
                        </div>
                    </div>
                </li>
              ))}
          </ul>
      </div>
    )
}

export default Admin
