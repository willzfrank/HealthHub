import { Link } from 'react-router-dom'

type ManagementSystemProps = {
  system: {
    title: string
    firstText: string
    secondText: string
    secondTextHeader?: string
    thirdText?: string
    continueReading?: boolean
    backgroundColor: string
    buttonText: string
    buttonColor: string
    buttonLink: string
  }
  id?: string
}

const ManagementsSection = ({ system, id }: ManagementSystemProps) => {
  return (
    <section
      id={id}
      className="py-16 md:py-24 md:px-8"
      style={{ backgroundColor: system.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="">
          {/* Header Section */}
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-lato font-bold text-center text-gray-900">
              {system.title}
            </h2>
            <p className=" leading-relaxed font-lato text-[25px]">
              {system.firstText}
            </p>
          </div>
          {/* Main Content */}
          {system?.secondTextHeader && (
            <h2 className="font-[700] font-lato text-[25px]">
              Taxpayer Lifecycle Management{' '}
            </h2>
          )}
          <div className="prose prose-lg">
            <p className="leading-relaxed font-lato text-[25px]">
              {system.secondText}
            </p>
          </div>

          <div className="mt-8 text-[25px] leading-relaxed font-lato">
            <p>
              {system.thirdText}
              {system.continueReading && (
                <Link
                  to="/revenue-management-system"
                  className="text-[#1E46F8] hover:text-blue-700 ml-1"
                >
                  continue reading
                  <div className="inline-block w-[3ch] text-left">
                    <span className="animate-[ellipsis_1.5s_steps(4,end)_infinite]">
                      ...
                    </span>
                  </div>
                </Link>
              )}
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex items-center mt-5 justify-center">
            <a
              href={system.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="
        px-6 py-3
        font-medium 
        border-2
        shadow-custom-black 
        transition-all duration-300
        relative
        overflow-hidden
      "
                style={{
                  backgroundColor: system.buttonColor,
                  borderColor:
                    system.buttonColor === 'white'
                      ? 'black'
                      : system.buttonColor,
                }}
              >
                <span className="relative z-10 text-black">
                  {system.buttonText}
                </span>
                <div
                  className="
          absolute inset-0 
          bg-black 
          transform translate-y-full 
          group-hover:translate-y-0 
          transition-transform duration-300
        "
                ></div>
              </button>
            </a>
          </div>
        </div>

        {/* Optional: Decorative Element */}
        <div className="absolute right-0 top-0 -z-10">
          <div className="w-64 h-64 bg-[#F0E6D3] rounded-full opacity-50 blur-3xl"></div>
        </div>
      </div>
    </section>
  )
}

export default ManagementsSection
