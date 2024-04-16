import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetAllPlayers(roleId: string = '65efa8af843b913605b6230d') {
    const query = useQuery({
        queryKey: ['users', roleId],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/user/?role=${roleId}`);

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            return response.data;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    });

    const isLoading = query.status === 'pending';
    const isError = query.status === 'error';
    const error = query.error;

    return { ...query, isLoading, isError, error };
}