import { useState } from "react";
import { useFirestore } from "../../../hooks/useFirestore.js";
import Modal from "../Modal/Modal.jsx";
import ImageForm from "./ImageForm.jsx";
import { storage } from "../../../firebaseConfig.js";
import { ref as storageRef, deleteObject } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";

function AddImages() {
    const selectedCategory = "images";
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const { data = [], loading, error, addDocument, updateDocument, deleteDocument } = useFirestore(selectedCategory);

    const handleEdit = (id) => {
        const itemToEdit = data.find((item) => item.id === id);
        if (itemToEdit) {
            setEditItem(itemToEdit);
            setShowModal(true);
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        const itemToDelete = data.find((item) => item.id === id);
        if (itemToDelete && confirmDelete) {
            // Видалити всі зображення
            const deletePromises = itemToDelete.imgUrls.map((imgUrl) => {
                return deleteImageFromStorage(imgUrl);
            });

            Promise.all(deletePromises)
                .then(() => {
                    return deleteDocument(id);
                })
                .then(() => {
                    console.log("Document and images deleted successfully!");
                })
                .catch((error) => {
                    console.error("Error deleting document or images:", error);
                });
        }
    };

    const deleteImageFromStorage = async (imgUrl) => {
        try {
            const imgRef = storageRef(storage, imgUrl);
            await deleteObject(imgRef);
            console.log(`Deleted image: ${imgUrl}`);
        } catch (error) {
            console.error("Error deleting image:", error.message);
        }
    };

    const handleSubmit = (title = "", images = []) => {
        if (!title || images.length !== 3) {
            console.error("Title and exactly 3 images are required:", { title, images });
            return;
        }

        if (editItem) {
            updateDocument(editItem.id, { titleVal: title, imgUrls: images }).then(() => {
                setEditItem(null);
            });
        } else {
            addDocument({ titleVal: title, imgUrls: images, category: selectedCategory }).then(() => {
                console.log("Document added successfully!");
            });
        }
        setShowModal(false);
    };

    return (
        <div className="images">
            <button className="input-border" onClick={() => setShowModal(true)}>
                Add New
            </button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ImageForm
                    handleClick={(title, images) => handleSubmit(title, images)}
                    editItem={editItem}
                    setImages={(images) => {
                        if (editItem) {
                            setEditItem({ ...editItem, imgUrls: images });
                        }
                    }}
                />
            </Modal>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="image-list">
                {Array.isArray(data) && data.map((item) => (
                    <div key={item.id} className="image-item">
                        <h3>{item.titleVal}</h3>
                        <div className="image-group">
                            {Array.isArray(item.imgUrls) && item.imgUrls.map((url, index) => (
                                <div key={index}>
                                    <img
                                        src={url}
                                        alt={`Image ${index + 1}`}
                                        width="100px"
                                        onError={(e) => {
                                            e.target.src = "/default-image.jpg"; // Резервне зображення
                                        }}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={() => handleEdit(item.id)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddImages;
