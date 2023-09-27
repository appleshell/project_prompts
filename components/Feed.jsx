'use client';

import { useState, useEffect } from 'react'
import PromptCardList from './PromptCardList';

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])


  const handleSearchChange = e => {
    setSearchText(e.target.value)
  }

  const fetchPosts = async () => {
    console.log('init')
    try {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={posts} />
    </section>
  )
}

export default Feed