'use server'

import { cookies } from "next/headers";

export const createSession = async () => {
    cookies().set('session', 'authenticated')
};