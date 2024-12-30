import { Link } from 'react-router-dom'

const ProductShowcase = () => {
  const products = [
    {
      title: 'Revenue Management System',
      description:
        'A robust tax administration solution capable of incorporating all revenue streams for state and local government collections.',
      id: 'rms',
    },
    {
      title: 'Hospital Management System',
      description:
        'An all-in-one hospital management solution streamlining patient care, operations, and administrative processes for healthcare facilities.',
      id: 'hms',
    },
    {
      title: 'School Management System',
      description:
        'A comprehensive school management solution that simplifies enrollment, academics, and communication for effective school administration.',
      id: 'sms',
    },
    {
      title: 'Transport Management System',
      description:
        'A unified public transport management solution streamlining fare collection, vehicle and driver management for optimized transit services.',
      id: 'tms',
    },
    {
      title: 'Judiciary Management System',
      description:
        'An end-to-end judiciary management solution streamlining filings, case management, and court scheduling for efficient legal operations.',
      id: 'jms',
    },
    {
      title: 'Payroll Management System',
      description:
        'A robust payroll solution that automates compensation, benefits, and compliance for streamlined payroll operations.',
      id: 'pms',
    },
  ]

  return (
    <section className="bg-[#F6F2E9] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-lato sm:text-4xl font-[500] text-left text-gray-800 mb-12">
          We lead the market with our unique <br className="hidden sm:block" />{' '}
          products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => {
            const [firstWord, ...restOfTitle] = product.title.split(' ')

            return (
              <div
                key={product.id}
                className="border border-gray-300 p-6 bg-white shadow-custom-black group hover:shadow-2xl transition-shadow duration-200"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-lato text-[500]">
                  {firstWord} <br /> {restOfTitle.join(' ')}
                </h3>
                <p className="text-gray-700 mb-6 font-lato font-normal">
                  {product.description}
                </p>
                <div className="flex items-center justify-center">
                  <Link
                    to={
                      product.title === 'Revenue Management System'
                        ? '/revenue-management-system'
                        : `/products#${product.id}`
                    }
                    className="px-4 py-2 text-black font-medium border border-black shadow-custom-black group-hover:shadow-xl transition-shadow duration-200"
                  >
                    Know More
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
