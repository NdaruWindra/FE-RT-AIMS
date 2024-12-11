import { useMemo } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IDataFormSettingSelect } from '@/utils/type'
import { useForm, FieldValues, FieldPath } from 'react-hook-form'

interface FormSettingsProps<T extends FieldValues> {
  data: IDataFormSettingSelect[]
  name: FieldPath<T>
  label: string
  placeholder: string
  disabled?: boolean
}

export function FormSettings<T extends FieldValues>({
  data,
  name,
  label,
  placeholder,
  disabled = false,
}: FormSettingsProps<T>) {
  const form = useForm<T>()

  // Memoize the select items to prevent unnecessary re-renders
  const renderedSelectItems = useMemo(() => {
    return data.map((selectItem) => (
      <div key={selectItem.label}>
        <FormLabel>{selectItem.label}</FormLabel>
        <Select disabled={disabled}>
          <SelectTrigger className='w-full text-[80%] md:text-base'>
            <SelectValue placeholder={selectItem.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {selectItem.selectItem.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ))
  }, [data, disabled])

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-2'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} disabled={disabled} {...field} />
          </FormControl>
          {renderedSelectItems}
        </FormItem>
      )}
    />
  )
}
