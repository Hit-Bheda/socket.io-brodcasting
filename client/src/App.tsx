import { io, Socket } from 'socket.io-client'
import './App.css'
import { useEffect, useRef } from 'react'

function App() {
  const message = useRef<HTMLInputElement>(null)
  const socket = useRef< Socket | null>(null);


  useEffect(() => {
    const socketInstance = io("ws://localhost:3000")
    socket.current = socketInstance
    
    socket.current.on("message", (message: string) => {
      const li = document.createElement('li')
      li.innerText = message
      document.getElementById('messages')?.appendChild(li)
      window.scrollTo(0, document.body.scrollHeight);
    })
    
    return () => {
      socket.current!.disconnect()
    }
  },[])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.current) {
      socket.current!.emit('message', message.current.value)
      message.current.value = ''
    }
  }
  return (
    <>
      <div className="main">
        <ul id="messages"></ul>
        <form id="form" onSubmit={handleSubmit}>
          <input ref={message} id="input" autoComplete="off" placeholder='Type a message.......' />
          <button>Send</button>
        </form>  
      </div>     
    </>
  )
}

export default App
