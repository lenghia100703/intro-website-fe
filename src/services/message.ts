import { MessageAPI } from '@/constants/API'
import http from '@/services/http'

export const saveMessage = async (payload: any) => {
    return (await http.post(MessageAPI.SAVE_MESSAGE, payload)).data
}

export const sendMessage = async (payload: any) => {
    return (await http.post(MessageAPI.SEND_MESSAGE, payload)).data
}

export const getMessages = async (sender: any, receiver: any) => {
    return (await http.get(MessageAPI.GET_MESSAGE(sender, receiver))).data.data
}

export const getMessagesBySender = async (sender: any) => {
    return (await http.get(MessageAPI.GET_MESSAGE_BY_SENDER(sender))).data.data
}

