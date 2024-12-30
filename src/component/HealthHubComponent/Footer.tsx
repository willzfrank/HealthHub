import React from 'react'
import { motion } from 'framer-motion'

const Footer: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="md:absolute md:bottom-0 md:left-0 md:right-0 md:p-4"
    >
      <div className="flex items-center justify-between md:justify-center gap-10 md:px-8">
        <p className="text-xs md:text-sm text-[#4964DB] text-[18px]">
          Powered by Blouza Tech Limited
        </p>
        <p className="text-xs md:text-sm  text-[#4964DB]">
          All Rights Reserved. 2024
        </p>
      </div>
    </motion.div>
  )
}

export default Footer
