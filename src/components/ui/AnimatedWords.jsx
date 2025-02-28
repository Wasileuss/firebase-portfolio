// import { useEffect, useState } from 'react'
//
// const wordsData = [
//   { text: 'WordPress', className: 'pomegranate' },
//   { text: 'JavaScript', className: 'wisteria' },
//   { text: 'React/Next', className: 'belize' },
// ]
//
// const AnimatedWords = () => {
//   const [currentWordIndex, setCurrentWordIndex] = useState(0)
//   const [letterStates, setLetterStates] = useState([])
//
//   useEffect(() => {
//     const wordsArray = wordsData.map((word) =>
//       word.text.split('').map(() => 'behind'),
//     )
//     setLetterStates(wordsArray)
//   }, [])
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       changeWord()
//     }, 3000)
//     return () => clearInterval(interval)
//   }, [currentWordIndex])
//
//   const changeWord = () => {
//     const current = currentWordIndex
//     const next = (current + 1) % wordsData.length
//
//     setLetterStates((prevStates) => {
//       const newStates = [...prevStates]
//
//       newStates[current] = newStates[current].map(() => 'out')
//
//       setTimeout(() => {
//         // Reset current word opacity and animate next word letters in
//         newStates[next] = wordsData[next].text.split('').map(() => 'behind')
//         setLetterStates([...newStates])
//
//         wordsData[next].text.split('').forEach((_, i) => {
//           setTimeout(() => {
//             newStates[next][i] = 'in'
//             setLetterStates([...newStates])
//           }, i * 100)
//         })
//
//         setCurrentWordIndex(next)
//       }, 50)
//
//       return newStates
//     })
//   }
//
//   return (
//     <div className="rotator">
//       <div className="h-title">
//         <div className="h-title__content">
//           <span id="h-title-p">
//             {wordsData.map((word, wordIndex) => (
//               <span
//                 key={wordIndex}
//                 className={`word ${word.className}`}
//                 style={{
//                   opacity: currentWordIndex === wordIndex ? 1 : 0,
//                 }}
//               >
//             <span style={{ position: 'absolute', display: 'inline-block', left: '-35px' }}>&lt;</span>
//                 {word.text.split('').map((letter, letterIndex) => (
//                   <span
//                     key={letterIndex}
//                     className={`letter ${
//                       letterStates[wordIndex]?.[letterIndex] || 'behind'
//                     }`}
//                   >
//                           {letter}
//                         </span>
//                 ))}
//                     </span>
//             ))}
//                 </span>
//         </div>
//         <span className="title-position">Developer /&gt;</span>
//       </div>
//     </div>
//   )
// }
//
// export default AnimatedWords

// import { useEffect, useState } from 'react'
//
// const wordsData = [
//   { text: 'WordPress', className: 'pomegranate' },
//   { text: 'JavaScript', className: 'wisteria' },
//   { text: 'React/Next', className: 'belize' },
// ]
//
// const AnimatedWords = () => {
//   const [currentWordIndex, setCurrentWordIndex] = useState(0)
//   const [letterStates, setLetterStates] = useState([])
//
//   useEffect(() => {
//     // Initialize letterStates with 'behind' for each letter of each word
//     const wordsArray = wordsData.map((word) =>
//       word.text.split('').map(() => 'behind'),
//     )
//     setLetterStates(wordsArray)
//
//     // Start animating immediately after initial setup
//     animateWordChange()
//   }, [])
//
//   useEffect(() => {
//     // Animate word change every 3 seconds
//     const interval = setInterval(() => {
//       animateWordChange()
//     }, 3000)
//     return () => clearInterval(interval)
//   }, [currentWordIndex])
//
//   const animateWordChange = () => {
//     const current = currentWordIndex
//     const next = (current + 1) % wordsData.length
//
//     setLetterStates((prevStates) => {
//       const newStates = [...prevStates]
//
//       // Fade out current word
//       newStates[current] = newStates[current].map(() => 'out')
//
//       setTimeout(() => {
//         // Reset current word opacity and animate next word in
//         newStates[next] = wordsData[next].text.split('').map(() => 'behind')
//         setLetterStates([...newStates])
//
//         wordsData[next].text.split('').forEach((_, i) => {
//           setTimeout(() => {
//             newStates[next][i] = 'in'
//             setLetterStates([...newStates])
//           }, i * 100)
//         })
//
//         setCurrentWordIndex(next)
//       }, 50)
//
//       return newStates
//     })
//   }
//
//   return (
//     <div className="rotator">
//       <div className="h-title">
//         <div className="h-title__content">
//           <span id="h-title-p">
//             {wordsData.map((word, wordIndex) => (
//               <span
//                 key={wordIndex}
//                 className={`word ${word.className}`}
//                 style={{
//                   opacity: currentWordIndex === wordIndex ? 1 : 0,
//                 }}
//               >
//                 <span style={{ position: 'absolute', display: 'inline-block', left: '-35px' }}>&lt;</span>
//                 {word.text.split('').map((letter, letterIndex) => (
//                   <span
//                     key={letterIndex}
//                     className={`letter ${
//                       letterStates[wordIndex]?.[letterIndex] || 'behind'
//                     }`}
//                   >
//                     {letter}
//                   </span>
//                 ))}
//               </span>
//             ))}
//           </span>
//         </div>
//         <span className="title-position">Developer /&gt;</span>
//       </div>
//     </div>
//   )
// }
//
// export default AnimatedWords

import { useEffect, useState } from 'react'

const wordsData = [
  { text: 'WordPress', className: 'pomegranate' },
  { text: 'JavaScript', className: 'wisteria' },
  { text: 'React/Next', className: 'belize' },
]

const AnimatedWords = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [letterStates, setLetterStates] = useState([])

  useEffect(() => {
    // Ініціалізація стану для кожної літери як 'behind'
    const wordsArray = wordsData.map((word) =>
      word.text.split('').map(() => 'behind'),
    )
    setLetterStates(wordsArray)

    // Починаємо анімацію відразу
    animateWordChange()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      animateWordChange()
    }, 3000)
    return () => clearInterval(interval)
  }, [currentWordIndex])

  const animateWordChange = () => {
    const current = currentWordIndex
    const next = (current + 1) % wordsData.length

    setLetterStates((prevStates) => {
      const newStates = [...prevStates]

      // 🚀 Поступове зникнення букв
      wordsData[current].text.split('').forEach((_, i) => {
        setTimeout(() => {
          newStates[current][i] = 'out'
          setLetterStates([...newStates])
        }, i * 100)
      })

      setTimeout(() => {
        // Скидання поточного слова та підготовка нового
        newStates[next] = wordsData[next].text.split('').map(() => 'behind')
        setLetterStates([...newStates])

        // 🚀 Плавне появлення букв нового слова
        wordsData[next].text.split('').forEach((_, i) => {
          setTimeout(() => {
            newStates[next][i] = 'in'
            setLetterStates([...newStates])
          }, i * 100)
        })

        setCurrentWordIndex(next)
      }, wordsData[current].text.length * 100 + 200) // Затримка перед показом нового слова

      return newStates
    })
  }

  return (
    <div className="rotator">
      <div className="h-title">
        <div className="h-title__content">
          <span id="h-title-p">
            {wordsData.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className={`word ${word.className}`}
                style={{
                  opacity: currentWordIndex === wordIndex ? 1 : 0,
                }}
              >
                <span style={{ position: 'absolute', display: 'inline-block', left: '-35px' }}>&lt;</span>
                {word.text.split('').map((letter, letterIndex) => (
                  <span
                    key={letterIndex}
                    className={`letter ${
                      letterStates[wordIndex]?.[letterIndex] || 'behind'
                    }`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </div>
        <span className="title-position">Developer /&gt;</span>
      </div>
    </div>
  )
}

export default AnimatedWords
