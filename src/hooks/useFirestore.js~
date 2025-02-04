import { useEffect, useState } from "react"
import { db, storage } from "../firebaseConfig"
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { ref as storageRef, deleteObject } from "firebase/storage"

export function useFirestore(selectedCategory) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onSnapshot(
            collection(db, selectedCategory),
            (snapshot) => {
                const updatedData = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setData(updatedData)
                setLoading(false)
            },
            (err) => {
                setError(err.message)
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [selectedCategory])

    const addDocument = async (newData) => {
        try {
            await addDoc(collection(db, selectedCategory), {
                ...newData,
                timestamp: serverTimestamp(),
                updatedAt: serverTimestamp(),
            })
        } catch (err) {
            setError(err.message)
        }
    }

    const updateDocument = async (id, updatedData) => {
        try {
            await updateDoc(doc(db, selectedCategory, id), {
                ...updatedData,
                updatedAt: serverTimestamp(),
            })
        } catch (err) {
            setError(err.message)
        }
    }

    const deleteDocument = async (id, imgUrl) => {
        try {
            await deleteDoc(doc(db, selectedCategory, id))
            if (imgUrl) {
                const imgRef = storageRef(storage, imgUrl)
                await deleteObject(imgRef)
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return { data, loading, error, addDocument, updateDocument, deleteDocument }
}
