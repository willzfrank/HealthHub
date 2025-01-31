import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  isMobile: boolean
}

const BackgroundImage: React.FC<Props> = ({ isMobile }) => {
  return isMobile ? (
    <div
      className="md:hidden block w-full p-5"
      style={{
        backgroundImage: `url('/images/healthhub/Health_hub_login_blue_background.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img src="/images/healthhub/healthhub-whitelogo.svg" alt="white logo" />
      <img
        src="/images/healthhub/login_man_smiling.svg"
        alt="Doctor smiling"
        className="w-full flex items-center justify-center h-[250px]"
      />
    </div>
  ) : (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        backgroundImage: `url('/images/healthhub/Health_hub_login_blue_background.svg')`,
        backgroundSize: 'contain',
        // backgroundPosition: 'center',
      }}
      className="w-full hidden md:flex md:w-1/2 h-full items-center justify-center relative"
    >
      <motion.img
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: -140, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        src="/images/healthhub/login_man_smiling.svg"
        alt="Doctor smiling"
        className="absolute"
      />
    </motion.div>
  )
}

export default BackgroundImage
