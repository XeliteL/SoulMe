import Select from "@/shared/ui/Select"

import { phoneCodes } from "../../config/phoneCodes"

interface PhoneCodeSelectProps {
  buttonClassName?: string
}

const PhoneCodeSelect = ({ buttonClassName }: PhoneCodeSelectProps) => (
  <Select
    id="support-phone-code"
    name="phoneCode"
    label="Телефонный код страны"
    buttonClassName={buttonClassName}
    options={phoneCodes}
  />
)

export default PhoneCodeSelect
