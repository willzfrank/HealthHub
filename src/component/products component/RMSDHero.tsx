import { useState, useEffect } from 'react'

const RMSDHero = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const slides = [
    {
      image: '/images/RMS-image-1.svg',
      title: 'Revenue Management System',
    },
    {
      image: '/images/RMS-image-2.svg',
      title: 'Smart Analytics',
    },
    {
      image: '/images/RMS-image-3.svg',
      title: 'Performance Tracking',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div>
      <div className="relative h-[680px]">
        <h2 className="text-center font-lato font-semibold text-2xl md:my-10 md:text-[52px] ">
          Revenue Management System (ReMS)
        </h2>
        <div className="relative z-10 max-w-7xl mx-auto h-[80%] flex items-center justify-center overflow-hidden">
          <div className="flex items-center justify-center w-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-500 cursor-pointer md:px-0 px-2.5 ease-in-out ${
                  index === activeIndex
                    ? 'scale-110 z-20'
                    : index === (activeIndex + 1) % slides.length
                    ? 'scale-90 -translate-x-1/4 z-10'
                    : 'scale-90 translate-x-1/4 z-10'
                }`}
                style={{
                  position: 'absolute',
                  opacity: index === activeIndex ? 1 : 0.7,
                }}
              >
                <div className="w-full h-full">
                  <div className="w-full h-full p-8 flex flex-col justify-between">
                    <div className="w-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RMSDHero
