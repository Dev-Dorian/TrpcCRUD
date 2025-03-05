
import { trpc } from './trpc'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'

function App() {

  trpc.createClient({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/trpc'
      })
    ]
  })
  return (
    <trpc.Provider client>
      <div>App</div>
    </trpc.Provider>
  )
}

export default App