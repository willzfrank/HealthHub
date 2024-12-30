import React from 'react'

const ServiceHero = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row items-center min-h-[80vh] md:min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
          {/* Text Content */}
          <div className="flex-1 pr-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-aldrich font-normal leading-tight text-[#2749B7] mb-6">
              <span>Here, </span>
              <span className="block mt-2">Technology</span>
              <span className="block mt-2">Meets</span>
              <span className="block mt-2">Ingenuity</span>
            </h1>
          </div>

          {/* Image Container */}
          <div className="hidden md:flex flex-1 relative">
            <img
              src="/images/product-hero-image.svg"
              alt="Digital Solutions Illustration"
              className="w-full h-auto object-contain max-w-[90%] xl:max-w-[100%] mx-auto animate-float"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default ServiceHero
