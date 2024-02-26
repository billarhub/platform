import { z } from 'zod';

export const createTournamentSchema = (
    t: (id: string, args?: any) => string
) => {
    return z.object({
        name: z.string().min(3, t('nameMinLength')).optional(),
    });
};