import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import PropTypes from "prop-types";
import { storage } from "../../../firebaseConfig.js";

function ImageForm({ handleClick, editItem }) {
    const [title, setTitle] = useState(editItem ? editItem.titleVal : "");
    const [images, setImages] = useState(editItem ? editItem.imgUrls : ["", "", ""]);
    const fileInputRefs = useRef([null, null, null]);

    const handleUpload = async (e, index) => {
        const file = e.target.files[0];

        if (!file) {
            console.error("No file selected");
            return;
        }

        const imagesRef = storageRef(storage, `Images/${uuidv4()}`);
        try {
            const data = await uploadBytes(imagesRef, file);
            const imgUrl = await getDownloadURL(data.ref);
            console.log(`Uploaded Image ${index + 1} URL:`, imgUrl);

            const updatedImages = [...images];
            updatedImages[index] = imgUrl;
            setImages(updatedImages);
        } catch (error) {
            console.error("Error uploading file:", error.message);
        }
    };

    const handleUrlChange = (e, index) => {
        const updatedImages = [...images];
        updatedImages[index] = e.target.value;
        setImages(updatedImages);
    };

    const handleSubmit = () => {
        if (!title || images.some((img) => !img)) {
            alert("Please complete the required fields");
            return;
        }
        handleClick(title, images);
    };

    return (
        <div>
            <input
                className="input-border"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title*"
                required
            />
            <br />
            {images.map((imgUrl, index) => (
                <div key={index}>
                    <input
                        className="input-border"
                        type="file"
                        onChange={(e) => handleUpload(e, index)}
                        ref={(el) => (fileInputRefs.current[index] = el)}
                    />
                    <br />
                    <input
                        className="input-border"
                        type="text"
                        value={imgUrl}
                        placeholder={`Image ${index + 1} URL`}
                        onChange={(e) => handleUrlChange(e, index)}
                    />
                    <br />
                </div>
            ))}
            <br/>
            <button className="input-border" onClick={handleSubmit}>
                {editItem ? "Update" : "Add"}
            </button>
        </div>
    );
}

ImageForm.propTypes = {
    handleClick: PropTypes.func.isRequired,
    editItem: PropTypes.object,
    setImages: PropTypes.func.isRequired,
};

export default ImageForm;
