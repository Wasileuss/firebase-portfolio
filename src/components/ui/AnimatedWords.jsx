import { useEffect, useState } from "react"

const wordsData = [
    { text: "WordPress", className: "pomegranate" },
    { text: "JavaScript", className: "wisteria" },
    { text: "React/Next", className: "belize" },
]

const AnimatedWords = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [letterStates, setLetterStates] = useState([])

    useEffect(() => {
        const wordsArray = wordsData.map((word) =>
            word.text.split("").map(() => "behind")
        )
        setLetterStates(wordsArray)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            changeWord()
        }, 3000)
        return () => clearInterval(interval)
    }, [currentWordIndex])

    const changeWord = () => {
        const current = currentWordIndex
        const next = (current + 1) % wordsData.length

        setLetterStates((prevStates) => {
            const newStates = [...prevStates]

            newStates[current] = newStates[current].map(() => "out")

            setTimeout(() => {
                // Reset current word opacity and animate next word letters in
                newStates[next] = wordsData[next].text.split("").map(() => "behind")
                setLetterStates([...newStates])

                wordsData[next].text.split("").forEach((_, i) => {
                    setTimeout(() => {
                        newStates[next][i] = "in"
                        setLetterStates([...newStates])
                    }, i * 100)
                })

                setCurrentWordIndex(next)
            }, 50)

            return newStates
        })
    }

    return (
        <div className="rotator">
            <h2 className="h-title">
                <span id="h-title-p">
                  {wordsData.map((word, wordIndex) => (
                      <span
                          key={wordIndex}
                          className={`word ${word.className}`}
                          style={{
                              opacity: currentWordIndex === wordIndex ? 1 : 0,
                          }}
                      >
                      {word.text.split("").map((letter, letterIndex) => (
                          <span
                              key={letterIndex}
                              className={`letter ${
                                  letterStates[wordIndex]?.[letterIndex] || "behind"
                              }`}
                          >
                          {letter}
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
                <span className="title-position">Frontend Developer</span>
            </h2>
        </div>
    )
}

export default AnimatedWords
