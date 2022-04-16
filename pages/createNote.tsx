import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { Textarea, Input } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { MdFileDownloadDone, MdOutlineClose } from "react-icons/md";

const CreateNote = () => {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Router.push("/login");
    }
  }, [])
  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const handleSubmit = async (e: any, token: any) => {
    e.preventDefault();
    let Title = title;
    let Note = note;
    setTitle("");
    setNote("");
    const response = await fetch('/api/note/addNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: Title, note: Note, authToken: token })
    });
    const json = await response.json()
    if (json.success) {
      updateNotification({
        id: 'signin',
        color: 'green',
        autoClose: 5000,
        icon: <MdFileDownloadDone />,
        title: "Added",
        message: 'Note added Successfully',
        loading: false,
      })
    }
    else {
      updateNotification({
        id: 'signin',
        color: 'red',
        autoClose: 5000,
        icon: <MdOutlineClose />,
        title: "Error",
        message: 'Invalid credentials',
        loading: false,
      })
    }
  }

  return (
    <div className="mt-14 w-auto max-w-sm mx-auto overflow-hidden bg-white rounded-lg">
      <div className="px-6 py-4">
        <h2 className="text-3xl font-bold text-center text-gray-700">Create Note</h2>
        <form onSubmit={(e) => {
          const token = localStorage.getItem('token')
          handleSubmit(e, token);
          showNotification({
            id: 'signin',
            autoClose: false,
            disallowClose: true,
            color: 'cyan',
            title: "Adding Note",
            message: 'Waiting for server',
            loading: true,
          })
        }} >
          <div className="w-full mt-4">
            <Input
              value={title}
              variant="default"
              name="title"
              onChange={(e:any) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </div>

          <div className="w-full mt-4">
            <Textarea
              value={note}
              name="note"
              onChange={(e) => setNote(e.target.value)}
              placeholder="Your note"
              minRows={6}
            />
          </div>
          <button className="mt-4 w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateNote