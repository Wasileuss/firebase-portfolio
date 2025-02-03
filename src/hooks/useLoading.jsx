import { useEffect, useState } from "react"

const useLoading = ( data ) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data])

  return { loading }
}

export default useLoading
