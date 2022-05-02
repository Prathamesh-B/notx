import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { showNotification, updateNotification } from '@mantine/notifications';
import { Skeleton } from '@mantine/core';
import { Modal } from '@mantine/core';
import { Textarea, Input } from '@mantine/core';
import { MdOutlineReportGmailerrorred, MdFileDownloadDone, MdOutlineClose } from "react-icons/md";

const AllNotes = () => {
  const [rerender, setRerender] = useState(false)
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([{ "id": "", "title": "", "note": "" }])
  const [modal, setModal] = useState({ "id": "", "title": "", "note": "" })

  useEffect(() => {
    async function fetchUserNotes(token: any) {
      setLoading(true)
      const response = await fetch('/api/note/fetchNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authToken: token })
      });
      const json = await response.json()
      if (json.success) {
        if (json.notes.length == 0) {
          setLoading(false)
          setNotes([{ "id": "0", "title": "No note Found", "note": "Try adding some notes First" }])
        } else {
          setLoading(false)
          setNotes(json.notes)
        }
      }
      else {
        showNotification({
          color: 'red',
          autoClose: 5000,
          icon: <MdOutlineReportGmailerrorred />,
          title: "Error",
          message: 'Some error occurred',
        })
      }
    }
    const token: any = localStorage.getItem('token')
    if (token) {
      fetchUserNotes(token);
    }
    else {
      Router.push("/login")
    }
  }, [rerender])

  const haldleUpdate = async (NoteID: string, authToken: any, title: string, note: string) => {
    const response = await fetch('/api/note/updateNote', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ NoteID, authToken, title, note })
    });
    const json = await response.json()
    if (json.success) {
      updateNotification({
        id: 'update',
        color: 'green',
        autoClose: 5000,
        icon: <MdFileDownloadDone />,
        title: "Update",
        message: 'Note updated Successfully',
        loading: false,
      })
      setRerender(!rerender)
    } else {
      updateNotification({
        id: 'update',
        color: 'red',
        autoClose: 5000,
        icon: <MdOutlineClose />,
        title: "Error",
        message: 'Server error',
        loading: false,
      })
    }
  }
  const haldleDelete = async (NoteID: string, authToken: any) => {
    const response = await fetch('/api/note/deleteNote', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ NoteID, authToken })
    });
    const json = await response.json()
    if (json.success) {
      updateNotification({
        id: 'delete',
        color: 'green',
        autoClose: 5000,
        icon: <MdFileDownloadDone />,
        title: "Delete",
        message: 'Note deleted Successfully',
        loading: false,
      })
      setRerender(!rerender)
    } else {
      updateNotification({
        id: 'delete',
        color: 'red',
        autoClose: 5000,
        icon: <MdOutlineClose />,
        title: "Error",
        message: 'Server error',
        loading: false,
      })
    }
  }

  return (<>
    <div className="flex flex-wrap justify-center">

      <Modal
        centered
        opened={opened}
        onClose={() => { setOpened(false) }}
        title="Edit note"
      >
        <Input
          className='m-2 '
          value={modal.title}
          variant="default"
          name="title"
          onChange={(e: any) => setModal({ "id": modal.id, "title": e.target.value, "note": modal.note })}
          placeholder="Title"
          required
        />
        <Textarea
          className='m-2'
          value={modal.note}
          name="note"
          onChange={(e: any) => setModal({ "id": modal.id, "title": modal.title, "note": e.target.value })}
          placeholder="Your note"
          minRows={6}
        />
        <div className='flex justify-between'>
          <button onClick={() => {
            let token = localStorage.getItem('token')
            haldleDelete(modal.id, token)
            showNotification({
              id: 'delete',
              autoClose: false,
              disallowClose: true,
              color: 'cyan',
              title: "Deleting Note",
              message: 'Waiting for server',
              loading: true,
            })
          }} className="m-2 px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-400 rounded hover:bg-red-500 focus:outline-none" type="button">Delete</button>
          <button onClick={() => {
            let token = localStorage.getItem('token')
            haldleUpdate(modal.id, token, modal.title, modal.note)
            showNotification({
              id: 'update',
              autoClose: false,
              disallowClose: true,
              color: 'cyan',
              title: "Updating Note",
              message: 'Waiting for server',
              loading: true,
            })
          }} className="m-2 px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="button">Update</button>
        </div>
      </Modal>

      {
        !loading ? notes.map((item: any) => {
          return <div onClick={() => {
            setOpened(true);
            setModal({ "id": item.id, "note": item.note, "title": item.title })
          }} key={item.id} className="m-2 max-w-xs max-h-fit cursor-pointer p-6 rounded-md shadow-md hover:shadow-lg bg-gray-100 text-coolGray-50">
            <h2 className="text-lg md:text-xl font-semibold tracking-wide">{item.title}</h2>
            <p className="text-sm">{item.note}</p>
            <div>
            </div>
          </div>
        })
          :
          <>
            <Skeleton height={200} m={6} width={200} radius="md" />
            <Skeleton height={150} m={6} width={300} radius="md" />
            <Skeleton height={350} m={6} width={250} radius="md" />
          </>
      }
    </div>
  </>
  )
}

export default AllNotes   