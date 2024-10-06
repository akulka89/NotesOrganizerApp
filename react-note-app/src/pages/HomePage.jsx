import React from 'react'
import Filter from '../components/Filter'
import NoteCardContainer from '../components/NoteCardContainer'
import { CiTextAlignCenter } from 'react-icons/ci'

const HomePage = ({notes, loading, handleFilterText}) => {
  return (
    <>
    {notes < 1 ? <h4 style={{textAlign: "center", marginTop: "10px"}}>No notes found for search result.</h4> : <Filter handleFilterText = {handleFilterText}/>}
    <NoteCardContainer notes = {notes} loading = {loading}/>
    </>
  )
}

export default HomePage