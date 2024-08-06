'use client'
import { ChangeEvent, useState } from "react";

// type FormObject = {
//     [key: ]
// }

interface Props {
    form: any
    changed: (event: ChangeEvent<HTMLInputElement>) => void
}

const useForm = (initialObj): Props => {

    const [form, setForm] = useState(initialObj);

    const changed = ({target}: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = target;

        setForm({
            ...form,
            [name]: value
        })
    }

  return {
    form,
    changed
  }
}

export default useForm
