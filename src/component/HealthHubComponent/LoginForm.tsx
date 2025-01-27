import { Form, Input, Button, Checkbox } from 'antd'
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  CheckCircleFilled,
  LoadingOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useLogin } from '../../api/hooks/useLogin'

const LoginForm: React.FC = () => {
  const [form] = Form.useForm()
  const { login, loginStatus } = useLogin()

  const onFinish = (values: { email: string; password: string }) => {
    login(values)
  }

  return (
    <Form form={form} onFinish={onFinish} className="w-full" layout="vertical">
      <motion.div whileHover={{ scale: 1.01 }}>
        <Form.Item
          label={
            <span className="text-[#263A43] text-[16px] md:text-[12px] md:font-normal font-semibold">
              Email
            </span>
          }
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            placeholder="Enter your email"
            className="h-[44px] w-full md:w-[400px]"
            style={{
              backgroundColor: 'inherit',
              borderColor: '#B1B1B1',
            }}
          />
        </Form.Item>
      </motion.div>

      <motion.div whileHover={{ scale: 1.01 }}>
        <Form.Item
          label={
            <span className="text-[#263A43] text-[16px] md:text-[12px] md:font-normal font-semibold">
              Password
            </span>
          }
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="h-[44px] w-full md:w-[400px]"
            style={{
              backgroundColor: 'inherit',
              borderColor: '#B1B1B1',
            }}
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined style={{ color: '#8E8E8E', fontSize: '12px' }} />
              ) : (
                <EyeInvisibleOutlined
                  style={{ color: '#8E8E8E', fontSize: '12px' }}
                />
              )
            }
          />
        </Form.Item>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }}>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className="text-[#C4C4C4] text-[12px]">
            Remember me
          </Checkbox>
        </Form.Item>
      </motion.div>

      <Form.Item>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loginStatus === 'loading' || loginStatus === 'Logged In'}
            className="h-[44px] w-full md:w-[400px]"
            style={{
              background: 'linear-gradient(to right, #0A2FB6, #4964DB)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.span
              key={loginStatus}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.075 }}
              className="flex items-center justify-center gap-1 text-white"
            >
              {loginStatus === 'Logged In' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.075, type: 'spring' }}
                >
                  <CheckCircleFilled
                    style={{
                      fontSize: '16px',
                      marginRight: '8px',
                      color: 'white',
                    }}
                  />
                </motion.span>
              )}

              {loginStatus === 'loading' ? (
                <LoadingOutlined
                  style={{
                    fontSize: '16px',
                    marginRight: '8px',
                    color: 'white',
                  }}
                  spin
                />
              ) : (
                loginStatus
              )}
            </motion.span>
          </Button>
        </motion.div>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
