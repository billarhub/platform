'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ILoginInterfaceResponse } from '@/models';

export function useSignIn() {
    const mutation = useMutation<ILoginInterfaceResponse, Error, { email: string; password: string }>({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/auth/login`, {
                email,
                password,
            });

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            return response.data;
        }
    });

    const isLoading = mutation.status === 'pending';
    const isError = mutation.status === 'error';
    const error = mutation.error;

    return { ...mutation, isLoading, isError, error };
}

export function useFetchUser(userId: string) {
    const query = useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/user/${userId}`);

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            return response.data;
        }
    });

    const isLoading = query.status === 'pending';
    const isError = query.status === 'error';
    const error = query.error;

    return { ...query, isLoading, isError, error };
}