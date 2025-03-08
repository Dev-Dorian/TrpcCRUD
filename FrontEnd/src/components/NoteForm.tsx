import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { trpc } from '../trpc'


function NoteForm() {
    const [note, setNote] = useState({
        title: "",
        description: ""
    })

    const addNote = trpc.note.create.useMutation()
    const utils = trpc.useContext()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addNote.mutate(note, {
            onSuccess: () => {
                console.log("Note added successfully")
                utils.note.get.invalidate()
            }
        })
        console.log(note)

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        console.log(e)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Title' name='title' autoFocus onChange={handleChange} />
            <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
            <button>Send</button>
        </form>
    )
}

export default NoteForm