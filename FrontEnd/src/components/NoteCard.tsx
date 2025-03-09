

import { trpc } from "../trpc"

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
    const toggleDoneNote = trpc.note.toggleDone.useMutation();
    const utils = trpc.useContext();

    return (
        <div className="bg-zinc-800 p-2 my-2 flex justify-between">
            <div className="font-bold text-xl">
                <h1>{note.title}</h1>
                <p>{note.description}</p>
            </div>
            <div className="flex gap-x-2">
                <button className="bg-red-500 px-3 py-2 rounded-md text-white ml-auto" onClick={() => {
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
                <button className={` px-3 py-2 rounded-md text-white ml-auto ${note.done ? "bg-zinc-500" : "bg-gray-500"}`} onClick={async () => {
                    await toggleDoneNote.mutate(note._id, {
                        onSuccess(data) {
                            if (data) {
                                utils.note.get.invalidate();
                            }
                        },
                    })
                }}>{note.done ? "Undone" : "Done"}</button>

            </div>
        </div>
    )
}

export default NoteCard