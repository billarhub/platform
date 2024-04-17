import { ITournamentAddPlayer, ITournamentConfiguration } from '@/models';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetTournamentTypes(token: string) {
    const query = useQuery({
        queryKey: ['tournamentTypes', token],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/tournament/type`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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

export function useCreateTournament(token: string) {
    const mutation = useMutation<any, Error, ITournamentConfiguration>({
        mutationFn: async (tournament: ITournamentConfiguration) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/tournament`, {
                name: tournament.name,
                playersQuantity: tournament.playersQuantity,
                location: tournament.location,
                initDate: tournament.initDate,
                endDate: tournament.endDate,
                playerMode: tournament.playerMode,
                gameMode: tournament.gameMode,
                tournamentTypeId: tournament.tournamentTypeId,
                qtySetPerTable: tournament.qtySetPerTable,
                qtySetPerFinal: tournament.qtySetPerFinal,
                emailRemember: tournament.emailRemember,
                access: true,
                // access: tournament.access,
                moneyPrice: tournament.moneyPrice,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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

export function useGetTournamentById(token: string, id: string) {
    const query = useQuery({
        queryKey: ['tournament', token, id],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/tournament/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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

export function useAddPlayerToTournament(token: string, id: string) {
    const mutation = useMutation<any, Error, ITournamentAddPlayer>({
        mutationFn: async (player: ITournamentAddPlayer) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/tournament/${id}/add-player`, {
                firstname: player.firstname.toLowerCase(),
                lastname: player.lastname.toLowerCase(),
                documentId: player.documentId,
                email: player.email,
                phone: player.phone,
                role: player.role,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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

export function useStartTournament(tournamentId: string) {
    const mutation = useMutation<any, Error, void>({
        mutationFn: async () => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/tournament/${tournamentId}/start`);

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

export function useTournamentBracket(tournamentId: string) {
    const query = useQuery({
        queryKey: ['tournamentBracket', tournamentId],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/match/${tournamentId}/brackets`);

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

export function useTournamentsPagination(currentPage: number, perPage: number) {
    const query = useQuery({
        queryKey: ['tournamentsPagination', currentPage, perPage],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/tournament`, {
                params: {
                    currentPage,
                    perPage
                }
            });

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

export function useUpdateTournamentMatch() {
    const mutation = useMutation<any, Error, { id: string, playerOneScore: number, playerTwoScore: number }>({
        mutationFn: async (match) => {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_KEY}/match`, {
                id: match.id,
                playerOneScore: match.playerOneScore,
                playerTwoScore: match.playerTwoScore,
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
