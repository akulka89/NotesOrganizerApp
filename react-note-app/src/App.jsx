import React, { useEffect } from 'react'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import AddNotePage from './pages/AddNotePage'
import NoteDetailPage from './pages/NoteDetailPage'
import EditNotePage from './pages/EditNotePage'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

const App = () => {

  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if(searchText.length < 3) return;
    axios.get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
    .then(res => {
      console.log(res.data)
      setNotes(res.data)
    })
    .catch(err => console.log(err.message))
  }, [searchText])

  useEffect(() => {
    setIsLoading(true)
    axios.get("http://127.0.0.1:8000/notes/")
    .then(res => {
      console.log(res.data)
      setNotes(res.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])

  const handleSearchText = (val) => {
    setSearchText(val)
  }

  const handleFilterText = (val) => {
    setFilterText(val)
  }

  const filteredNotes =
    filterText === "BUSINESS"
      ? notes.filter(note => note.category == "BUSINESS")
      : filterText === "PERSONAL" ? notes.filter(note => note.category == "PERSONAL")
      : filterText === "IMPORTANT" ? notes.filter(note => note.category == "IMPORTANT")
      :notes;

  const addNote = (data) => {
    axios.post("http://127.0.0.1:8000/notes/", data)
    .then(res => {
      setNotes([...notes, data])
      toast.success("A new note has been added!!")
      console.data(res.data)
    })
    .catch(err => {
      console.log(console.log(err))
    })
  }

  const updateNote = (data, slug) => {
    axios.put(`http://127.0.0.1:8000/notes/${slug}/`, data)
    .then(res => {
      console.log(res.data)
      toast.success("Note updated Successfully")
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  const deleteNote = (slug) => {
    axios.delete(`http://127.0.0.1:8000/notes/${slug}/`)
    .then(res => {
      setNotes([...notes])
    })
    .catch(err => console.log(err.message))
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path = "/" element = {<MainLayout searchText = {searchText} handleSearchText = {handleSearchText}/>}>
      <Route index element = {<HomePage notes ={filteredNotes} loading = {isLoading} handleFilterText = {handleFilterText}/>} />
      <Route path = "/add-note" element = {<AddNotePage addNote = {addNote}/>} />
      <Route path = "/edit-note/:slug" element = {<EditNotePage updateNote={updateNote}/>} />
      <Route path = "/notes/:slug" element = {<NoteDetailPage deleteNote = {deleteNote}/>} />
    </Route>
    
  ))
  return (
    <RouterProvider router = {router} />
  )
}

export default App

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
