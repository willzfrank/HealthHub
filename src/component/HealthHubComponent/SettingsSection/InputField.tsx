type InputFieldProps = {
  label: string
  type: string
  id: string
  placeholder: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputField = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-[#666666] text-[15px] mb-2 font-medium">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="p-3 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA]"
    />
  </div>
)
