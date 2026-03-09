import React from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { isNumber } from '../utils';

const CreateChapter = () => {
  const { id } = useParams();

  if(!isNumber(id)) {
    const errorLocalStorage = localStorage.getItem('error');

    if(!errorLocalStorage) {
        localStorage.setItem("error", `["L'id du livre doit être un nombre."]`);
    }

    window.location.href = "/";
  }

  return (
    <>
        <Navbar />
    </>
  )
}

export default CreateChapter