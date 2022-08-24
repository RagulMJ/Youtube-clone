import React, { useState } from 'react'
import './_categoriesBar.scss'
import { useDispatch } from 'react-redux'
import { getPopularVideos, getVideoByCategory } from '../../redux/actions/videos.action'


const keywords = [
  'All',
  'React js',
  'Angular js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  "Algorithm Art",
  'Guitar',
  'Tamil Songs',
  'Coding',
  'Cricket',
  'Footbal',
  'Real Madrid',
  'Gatsby',
  'Poor Coder',
  'Atomic Habits'
]

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState('All')

  const dispatch = useDispatch()
  const handleClick = (value) => {
    setActiveElement(value)
    if (value === 'All') {
      dispatch(getPopularVideos())
    } else {
      dispatch(getVideoByCategory(value))
    }
  }

  return (
    <div className='CategoriesBar'>
      {
        keywords.map((value, i) => (
          <span
            onClick={() => handleClick(value)}
            key={i}
            className={activeElement === value ? 'active' : ''}
          >{value}</span>
        ))}
    </div>
  )
}

export default CategoriesBar