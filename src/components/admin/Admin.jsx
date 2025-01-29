import { useEffect, useState, useRef } from "react";
import { db, storage } from "../../firebaseConfig.js";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref as storageRef, uploadBytes, deleteObject } from "firebase/storage";
import { addDoc, collection, onSnapshot, serverTimestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Modal from "../client/Modal/Modal.jsx";

function Admin() {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [target, setTarget] = useState("");
    const [rel, setRel] = useState("");
    const [desc, setDesc] = useState("");
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("projects");
    const [editItem, setEditItem] = useState(null);
    const [oldImgUrl, setOldImgUrl] = useState("");
    const [img, setImg] = useState("");
    const fileInputRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, selectedCategory), (snapshot) => {
            const updatedData = snapshot.docs.map((val) => ({
                ...val.data(),
                id: val.id,
            }));
            setData(updatedData);
        });

        return () => {
            unsubscribe();
        };
    }, [selectedCategory]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            console.error("No file selected");
            return;
        }

        if (editItem && oldImgUrl) {
            const imgRef = storageRef(storage, oldImgUrl);
            try {
                await deleteObject(imgRef);
            } catch (error) {
                console.error("Error deleting old file:", error.message);
            }
        }

        const images = storageRef(storage, `Images/${uuidv4()}`);

        try {
            const data = await uploadBytes(images, file);
            const imgUrl = await getDownloadURL(data.ref);
            setImg(imgUrl);
        } catch (error) {
            console.error("Error uploading file:", error.message);
        }
    };

    const handleClick = async () => {
        if (!title || !link || !desc) {
            alert("Please complete the required fields");
            return;
        }

        try {
            if (editItem) {
                await updateDoc(doc(db, selectedCategory, editItem), {
                    titleVal: title,
                    linkVal: link,
                    targetVal: target,
                    relVal: rel,
                    descVal: desc,
                    imgUrl: img
                });
                setEditItem(null);
                setOldImgUrl("");  // Reset old image URL after updating
            } else {
                await addDoc(collection(db, selectedCategory), {
                    category: selectedCategory,
                    titleVal: title,
                    linkVal: link,
                    targetVal: target,
                    relVal: rel,
                    descVal: desc,
                    imgUrl: img,
                    timestamp: serverTimestamp()
                });
            }

            setTitle("");
            setLink("");
            setTarget("");
            setRel("");
            setDesc("");
            setImg("");
            fileInputRef.current.value = null;
        } catch (error) {
            console.error("Error adding/updating document:", error.message);
            alert("An error occurred while adding/updating the document. Please try again.");
        }
        setShowModal(false)
    };

    const handleCancel = () => {
        setTitle("");
        setLink("");
        setTarget("");
        setRel("");
        setDesc("");
        setImg("");
        setEditItem(null);
        setOldImgUrl("");
        fileInputRef.current.value = null;
        setShowModal(false);
    };

    const handleModalClose = () => {
        handleCancel()
    };

    const handleEdit = async (id) => {
        const itemToEdit = data.find(item => item.id === id);
        if (itemToEdit) {
            setTitle(itemToEdit.titleVal);
            setLink(itemToEdit.linkVal);
            setTarget(itemToEdit.targetVal);
            setRel(itemToEdit.relVal);
            setDesc(itemToEdit.descVal);
            setImg(itemToEdit.imgUrl);
            setEditItem(id);
            setOldImgUrl(itemToEdit.imgUrl);
            setShowModal(true);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, selectedCategory, id));

                const itemToDelete = data.find(item => item.id === id);
                if (itemToDelete && itemToDelete.imgUrl) {
                    const imgRef = storageRef(storage, itemToDelete.imgUrl);
                    await deleteObject(imgRef);
                }
            } catch (error) {
                console.error("Error deleting document:", error.message);
                alert("An error occurred while deleting the document. Please try again.");
            }
        }
    };

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
    };

    const sortedData = data.slice().sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);

    return (
        <div className="admin">
            <select className="input-border" onChange={handleChangeCategory} value={selectedCategory}>
                <option value="projects">Projects</option>
                <option value="courses">Courses</option>
                <option value="about">About</option>
            </select><br/>
            <button className="input-border" onClick={() => setShowModal(true)}>Add New</button>
            <Modal isOpen={showModal} editItem={editItem} onClose={handleModalClose}>
                <input className="input-border" onChange={(e) => setTitle(e.target.value)} value={title}
                       placeholder="Title*" required/><br/>
                <input className="input-border" onChange={(e) => setLink(e.target.value)} value={link}
                       placeholder="Link*" required/><br/><br/>
                <input className="input-border" onChange={(e) => setTarget(e.target.value)} value={target}
                       placeholder="Targ"/><br/><br/>
                <input className="input-border" onChange={(e) => setRel(e.target.value)} value={rel}
                       placeholder="Rel"/><br/><br/>
                <textarea className="input-border" onChange={(e) => setDesc(e.target.value)} value={desc}            placeholder="Description*" required/><br/>
                <input className="input-border" type="file" onChange={(e) => handleUpload(e)}
                       ref={fileInputRef}/><br/><br/>
                <input className="input-border" type="text" name="imgUrl" value={img}
                       onChange={(e) => setImg(e.target.value)} placeholder="Image URL" id=""/>
                <button className="input-border" onClick={handleClick}>{editItem ? "Update" : "Add"}</button>
                {editItem && <button className="input-border" onClick={handleCancel}>Cancel</button>}<br/><br/><br/>
            </Modal>
            {sortedData &&
                sortedData.map((value) => (
                    <div key={value.id}>
                    <h3 className="input-border">{value.category}</h3>
                        <Link className="input-border" to={value.linkVal} target="_blank"
                              rel="noopener noreferrer">{value.titleVal}</Link>
                        <p className="input-border">{value.linkVal}</p>
                        <p className="input-border">{value.targetVal}</p>
                        <p className="input-border">{value.relVal}</p>
                        <p className="input-border">{value.descVal}</p>
                        <img src={value.imgUrl} alt="img" width="100px"/>
                        <p className="input-border">{value.imgUrl}</p>
                        <p className="input-border">Added
                            on: {value.timestamp && new Date(value.timestamp.seconds * 1000).toLocaleString()}</p>
                        <button className="input-border" onClick={() => handleEdit(value.id)}>Edit</button>
                        <button className="input-border" onClick={() => handleDelete(value.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}

export default Admin;
