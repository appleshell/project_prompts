import React from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data = [], handleTagClick }) => {
    return (
        <section className='mt-16 prompt_layout'>
            {
                data.map(post => <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />)
            }
        </section>
    )
}

export default PromptCardList