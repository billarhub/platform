'use server'

import { IUser } from "@/models";
import { cookies } from "next/headers";

export const createSession = async (token: string, user: IUser) => {
    cookies().set('authToken', token)
    cookies().set('user', JSON.stringify(user));
    return true
};

export const getSession = async () => {
    return cookies().get('authToken')
}

export const getUser = async () => {
    const user = cookies().get('user')?.value
    if (!user) return null
    return JSON.parse(user)
}

export const destroySession = async () => {
    cookies().delete('authToken')
    cookies().delete('user')
    return true
}
