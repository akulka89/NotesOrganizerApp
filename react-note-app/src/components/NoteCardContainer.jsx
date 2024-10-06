import React from 'react'
import NoteCard from './NoteCard'
import Loader from './Loader'

const NoteCardContainer = ({notes, loading}) => {
    return (
        <div className="container">
        <div className="note-has-grid row">

          {loading && <Loader loading = {loading}/>}
          {notes.map(note => <NoteCard key = {note.id} note = {note}/>)}
          
          {/* <NoteCard color="green"/>
          <NoteCard color="purple"/>
          <NoteCard color="blue"/>
    
          <NoteCard color="green"/>
          <NoteCard color="purple"/>
          <NoteCard color="blue"/>
    
          <NoteCard color="green"/>
          <NoteCard color="purple"/>
          <NoteCard color="blue"/> */}
          
        </div>
        </div>
      )
}

export default NoteCardContainer