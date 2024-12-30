import { ArrowRight } from 'iconsax-react'
import { useState, useEffect } from 'react'

const HomeHero = () => {
  const words = ['Value', 'Result', 'Growth', 'Profit']
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingSpeed = 150
    const deletingSpeed = 100
    const pauseDuration = 1500

    const handleTyping = () => {
      const fullWord = words[currentWordIndex]

      if (!isDeleting && displayedText.length < fullWord.length) {
        setDisplayedText((prev) => prev + fullWord[prev.length])
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText((prev) => prev.slice(0, -1))
      } else if (displayedText === fullWord && !isDeleting) {
        setTimeout(() => setIsDeleting(true), pauseDuration)
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false)
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
      }
    }

    const typingInterval = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(typingInterval)
  }, [displayedText, isDeleting, currentWordIndex, words])

  return (
    <header className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row items-center min-h-[80vh] justify-between  md:min-h-[calc(100vh-4rem)] pl-4 sm:pl-6 lg:pl-8">
          {/* Text Content */}
          <div className="flex-1 pr-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#2749B7] mb-6 font-aldrich">
              <div className="relative w-max">
                <span>Delivering</span>
                <img
                  src="/images/text-image.svg"
                  alt=""
                  className="absolute -top-2 right-[-30px] w-10 h-10"
                />
              </div>
              <span className="block mt-2">
                {displayedText}
                {
                  <span className="inline-block w-[3px] h-[1em] bg-[#2749B7] animate-pulse ml-1"></span>
                }
                -Oriented
              </span>
              <span className="block mt-2">Digital Solutions</span>
            </h1>
            <span className="font-lato text-[20px]">
              Digital solutions crafted to elevate operations, simplify
              management and create value
            </span>

            {/* CTA Button with Shadow */}
            <button
              className="group border border-black flex items-center mt-2 gap-2 px-6 py-4 text-lg font-semibold shadow-custom-black
                text-black transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-[0_20px_35px_-5px_rgba(30,70,248,0.4)]"
            >
              Get Started
              <ArrowRight size="32" color="#1C1C1C" />
            </button>
          </div>

          {/* Image Container */}
          <div className="md:flex hidden flex-1 relative">
            <img
              src="/images/hero-image.svg"
              alt="Digital Solutions Illustration"
              className="w-full h-auto object-contain max-w-[90%] xl:max-w-[100%] mx-auto animate-float"
            />
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div
        className="md:block hidden absolute inset-y-0 right-0 w-1/2 bg-gray-50/50 -z-10
          transform -skew-x-12 origin-top-right"
      />

      <img src="/images/spiral-arrow.svg" alt="" />
    </header>
  )
}

export default HomeHero
