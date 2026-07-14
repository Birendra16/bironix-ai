import React, { useEffect } from 'react'
import Nav from './Nav'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import getMessages from '../features/getMessages'
import { setMessages } from '../redux/slices/messageSlice'

function ChatArea() {

    const { selectedConversation } = useSelector(state => state.conversation)
    const dispatch = useDispatch()

    useEffect(() => {
        const getMsg = async () => {
            if (selectedConversation) {
                dispatch(setMessages([]))
                const data = await getMessages(selectedConversation?._id)
                if (data && data.length > 0) {
                    dispatch(setMessages(data))
                }
            }
        }

        getMsg()

    }, [selectedConversation?._id])

    return (
        <div className='flex-1 flex flex-col min-w-0'>
            <Nav />
            <MessageList />
            <ChatInput />
        </div>
    )
}

export default ChatArea