import React, { useState } from 'react'
import './_header.scss'
import { FaBars } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps } from 'react-icons/md'
import { useHistory } from 'react-router-dom'

const Header = ({handleToggleSidebar}) => {

  const[input,setInput] = useState('')

  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/search/${input}`)
  }
  
  return (
    <div className=' header'>
      <FaBars className='header__menu' 
      size={26} 
      onClick={() => handleToggleSidebar()}
      />

      <img
        src='https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg'
        alt=''
        className='header__logo'
      />
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search' value={input} onChange={e => setInput(e.target.value)} />
        <button type='submit'>
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <div className='header__icons'>
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img 
          src='https://www.pngitem.com/pimgs/m/560-5603874_product-image-logo-avatar-minimalist-flat-line-hd.png'
          alt=''
        />
      </div>

    </div>
  )
}

export default Header