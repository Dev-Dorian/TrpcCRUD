

import { trpc } from '../trpc'

interface Props {
    note: {
        _id: string;
        title: string;
        description: string;
        done: boolean;
    }
}

function NoteCard({ note }: Props) {
    const deleteNote = trpc.note.delete.useMutation();
    const utils = trpc.useContext();

    return (
        <div>
            <h1>{note.title}</h1>
            <p>{note.description}</p>

            <button onClick={() => {
                deleteNote.mutate(note._id, {
                    onSuccess: (data) => {
                        if (data) {
                            utils.note.get.invalidate()
                        }
                    },
                    onError: (error) => {
                        console.log(error)
                    }
                })
            }}>Delete</button>
            <button>{note.done ? "Undone" : "Done"}</button>
        </div>
    )
}

export default NoteCard