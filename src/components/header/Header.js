import React, { useState } from 'react'
import './_header.scss'
import { FaBars } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps, MdOutlineVideoCall } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Photo = () => {
  const { photoURL } = useSelector(state => state.auth?.user)
  return (
    <img
      src={photoURL}
      alt='avatar'
    ></img>
  )
}

const Header = ({ handleToggleSidebar }) => {

  const [photo, setPhoto] = useState(null)
  const [input, setInput] = useState('')

  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/search/${input}`)
  }

  // const {photoURL} = useSelector(state=> state.auth?.user)
  const { login } = useSelector(state => state.auth)
  const home = () => {
    history.push('/')
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
        onClick={home}
        style={{cursor:'pointer'}}
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
        {
          login ?
            <Photo />
            :
            <img
              src={require('../../image/avatar.png')}
              alt='avatar'
            ></img>
        }
      </div>

    </div>
  )
}

export default Header