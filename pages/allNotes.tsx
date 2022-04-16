import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { showNotification } from '@mantine/notifications';
import { Skeleton } from '@mantine/core';
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const AllNotes = () => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([{ "id": " ", "title": " ", "note": " " }])

  useEffect(() => {
    async function fetchUserNotes(token: any) {
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
  }, [])
  return (<>
    <div className="flex flex-wrap justify-center">
      {/* <div className="m-2 max-w-xs p-6 rounded-md shadow-md bg-gray-100 text-coolGray-50">
        <h2 className="text-lg md:text-xl font-semibold tracking-wide">Nam maximus purus</h2>
        <p className="text-sm"><Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
          Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.
        </Spoiler></p></div> */}
      {!loading ? notes.map((item: any) => {
        return <div key={item.id} className="m-2 max-w-xs h-auto p-6 rounded-md shadow-md bg-gray-100 text-coolGray-50"><h2 className="text-lg md:text-xl font-semibold tracking-wide">{item.title}</h2>
          <p className="text-sm z-0">{item.note}</p></div>
      })
        : <><Skeleton height={200} m={6} width={200} radius="md" /><Skeleton height={150} m={6} width={300} radius="md" /><Skeleton height={350} m={6} width={250} radius="md" /></>}
    </div>
  </>
  )
}

export default AllNotes   