import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { title } from 'process';
import Note from '../models/note'

const getNotes = publicProcedure.query(async () => {
    const notes = await Note.find()
    return notes
})

const createNotes = publicProcedure.input(z.object({
    title: z.string(),
    description: z.string(),
})).mutation(async ({ input }) => {
    const newNote = new Note({
        title: input.title,
        description: input.description
    })
    const savedNote = await newNote.save()
    return savedNote
    // console.log(input)
    // return "received"
})

const deleteNote = publicProcedure.input(z.string()).mutation(async ({ input }) => {
    throw new Error("Error custom!!!")
    const noteFound = await Note.findByIdAndDelete(input)
    if (!noteFound) throw new Error("Note Not Found")
    return true
})

export const notesRouter = router({
    create: createNotes,
    get: getNotes,
    delete: deleteNote
}) 