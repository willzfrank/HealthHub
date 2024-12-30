import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EyeSlash, Eye } from 'iconsax-react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const LoginForm: React.FC<Props> = () => {
  const [showPassword, setShowPassword] = useState(false)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleDivClick = () => {
    passwordInputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit}>
      <motion.div whileHover={{ scale: 1.01 }} className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 text-[#263A43] text-[16px] md:text-[12px] md:font-normal font-semibold"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="p-2 border border-[#B1B1B1] bg-inherit rounded-md w-full md:w-[400px] h-[44px] focus:outline-none focus:border-[#4964DB] focus:ring-1 focus:ring-[#4964DB] transition-all duration-300"
        />
      </motion.div>
      <motion.div whileHover={{ scale: 1.01 }} className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 text-[#263A43] text-[16px] md:text-[12px] md:font-normal font-semibold"
        >
          Password
        </label>
        <div
          className="relative p-2 rounded-md h-[44px] w-full md:w-[400px] border border-[#B1B1B1]"
          onClick={handleDivClick}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            ref={passwordInputRef}
            placeholder="Enter your password"
            className="border-none outline-none w-full h-full bg-inherit"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setShowPassword(!showPassword)
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeSlash size="12" color="#8E8E8E" />
            ) : (
              <Eye size="12" color="#8E8E8E" />
            )}
          </button>
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-1.5"
      >
        <input
          type="checkbox"
          name="remember"
          id="remember"
          className="w-[10px] h-[10px] border border-[#C4C4C4] rounded-md"
        />
        <label htmlFor="remember" className="text-[#C4C4C4] text-[12px]">
          Remember me
        </label>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="bg-gradient-to-r from-[#0A2FB6] to-[#4964DB] h-[44px] text-white w-full md:w-[400px] py-2 rounded-md transition-all duration-300 hover:shadow-lg"
      >
        Login
      </motion.button>
    </form>
  )
}

export default LoginForm
