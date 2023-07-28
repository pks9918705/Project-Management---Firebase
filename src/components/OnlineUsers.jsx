import React from 'react'
import { useCollection } from '../hooks/useCollection'

export default function OnlineUsers() {

    const {error,documents}=useCollection("Users")

    console.log("Users Documents",documents)

  return (
    <>


      
    </>
  )
}
