import { ArrowRight } from 'iconsax-react'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const ITServices = (props: Props) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-[500] text-left text-gray-800 mb-12 font-lato">
          We offer a variety of IT Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              id: 'dpi',
              title: 'Digital Public Infrastructure',
              description:
                'Transform your government’s system and service delivery with our robust Digital Public Infrastructure (DPI) solutions.',
              bgColor: 'bg-white',
              textColor: 'text-black',
              headerColor: 'text-black',
              buttonShadow: 'shadow-custom-black',
            },
            {
              id: 'erp',
              title: 'Enterprise Resource Planning',
              description:
                'Get custom software tailored for your unique needs, including front-end, and core back-end technology.',
              bgColor: 'bg-[#1E46F8]',
              textColor: 'text-white',
              headerColor: 'text-white',
              buttonShadow: 'shadow-custom-black',
            },
            {
              id: 'dpa',
              title: 'Digital Process Automation',
              description:
                'Optimize workflows with built-to-fit intelligent automation solutions designed for operational efficiency.',
              bgColor: 'bg-black',
              textColor: 'text-black',
              headerColor: 'text-white',
              buttonShadow: 'shadow-custom-blue',
            },
          ].map((product, index) => {
            const [firstWord, ...restOfTitle] = product.title.split(' ')

            return (
              <div
                key={product.title}
                className={`border border-black p-6 ${product.bgColor}`}
              >
                <h3
                  className={`text-2xl font-[500] font-lato ${product.headerColor} mb-4`}
                >
                  {firstWord} <br /> {restOfTitle.join(' ')}
                </h3>
                <p
                  className={`mb-6 font-lato font-normal ${product.headerColor}`}
                >
                  {product.description}
                </p>
                <Link
                  to={`/services#${product.id}`}
                  className={`px-4 w-max flex items-center gap-0.5 py-2 font-normal font-lato bg-white border border-black ${product.buttonShadow} group-hover:shadow-xl transition-shadow duration-200`}
                >
                  Learn More
                  <ArrowRight size="32" color="#1C1C1C" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ITServices
