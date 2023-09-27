'use client';

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const UpdatePrompt = () => {
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(() => {
        getPrompt()
    }, [])

    const getPrompt = async () => {
        const postId = searchParams.get('id')
        try {
            const response = await fetch(`/api/prompt/${postId}`, {
                method: 'GET',
            })
            const data = await response.json()
            console.log('ddd', data)
            setPost(data)
        } catch (error) {

        }
    }

    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        const postId = searchParams.get('id')
        try {
            const response = await fetch(`/api/prompt/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt