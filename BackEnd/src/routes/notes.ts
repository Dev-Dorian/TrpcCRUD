import { publicProcedure, router } from '../trpc'

const getNotes = publicProcedure.query(() => {
    return [{
        id: 1,
        title: 'Note Dorian',
        content: 'Content 1'
    }]
})

export const notesRouter = router({
    get: getNotes,
})