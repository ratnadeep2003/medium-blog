import React from 'react'
import { Avatar } from './BlogCard'

function Appbar() {
  return (
    <div>
        <div className='pt-2 border-b flex justify-between px-10'>
            Medium
            <Avatar name="Ratnadeep"/>
        </div>
    </div>
  )
}

export default Appbar