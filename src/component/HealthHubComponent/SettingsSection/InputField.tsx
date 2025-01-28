import { Input } from 'antd'

interface InputFieldProps {
  label: string
  type: string
  id: string
  defaultValue: string
  placeholder: string
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  defaultValue,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-[#666666] text-[15px] mb-2 font-medium"
      >
        {label}
      </label>
      <Input
        id={id}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="p-3 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA]"
      />
    </div>
  )
}
