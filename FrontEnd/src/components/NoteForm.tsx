import React, { ChangeEvent, FormEvent, useContext, useState } from "react"
import { trpc } from "../trpc"

const initialState = {
    title: "",
    description: ""
}

function NoteForm() {
    const [note, setNote] = useState(initialState)

    const addNote = trpc.note.create.useMutation()
    const utils = trpc.useContext()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addNote.mutate(note, {
            onSuccess: () => {
                console.log("Note added successfully")
                utils.note.get.invalidate()
                setNote(initialState)
            }
        })
        console.log(note)

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        console.log(e)
    }
    return (
        <form className="bg-zinc-900 p-10 rounded-md" onSubmit={handleSubmit}>
            <input className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3 text-5xl" type="text" placeholder="Title" value={note.title} name="title" autoFocus onChange={handleChange} />
            <textarea className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3" name="description" placeholder="Description" value={note.description} onChange={handleChange}></textarea>
            <button className="bg-zinc-500 px-3 py-2 rounded-md text-white">Send</button>
        </form>
    )
}

export default NoteForm