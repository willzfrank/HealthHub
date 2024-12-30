import React from 'react'
import { motion } from 'framer-motion'
import LoginForm from '../../component/HealthHubComponent/LoginForm'
import Footer from '../../component/HealthHubComponent/Footer'
import BackgroundImage from '../../component/HealthHubComponent/BackgroundImage'

type Props = {}

const HealthHubLogin: React.FC<Props> = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full md:w-1/2 h-full relative flex flex-col items-center justify-center md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex items-center gap-1.5 justify-center flex-col max-w-md"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            src="/images/healthhub/healthhub_logo.svg"
            alt="logo"
            className="mb-2 hidden md:block"
          />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-[16px]">
            Login to continue caring for your patients
          </p>
          <LoginForm />
        </motion.div>
        <Footer />
      </div>
      <BackgroundImage isMobile={false} />
      <BackgroundImage isMobile={true} />
    </div>
  )
}

export default HealthHubLogin
