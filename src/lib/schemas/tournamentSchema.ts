import { z } from 'zod';

export const createTournamentConfigSchema = (
    t: (id: string, args?: any) => string
) => {
    return z.object({
        name: z.string().min(3, t('nameMinLength')).optional(),
    });
};

export const createTournamentPlayerSchema = (
    t: (id: string, args?: any) => string
) => {
    return z.object({
        firstName: z.string().min(3, t('nameMinLength')).optional(),
    });
};

