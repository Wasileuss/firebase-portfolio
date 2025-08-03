import { useEffect, useState } from 'react'
import { db } from '../firebaseConfig.js'
import { collection, onSnapshot } from 'firebase/firestore'

function useFetchCollection(collectionName) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        const updatedData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))

        setData(updatedData)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [collectionName])

  return { data, loading }
}

export default useFetchCollection
