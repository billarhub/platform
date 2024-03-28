import { z } from 'zod';

export const createTournamentConfigSchema = (
    t: (id: string, args?: any) => string
) => {
    return z.object({
        name: z.string().min(3, t('minCharacters', { count: 3 })).optional(),
        playersQuantity: z.number().min(0, t('minValue', { count: 0 })).optional(),
        location: z.string().min(3, t('minCharacters', { count: 3 })).optional(),
        initDate: z.string().optional(),
        endDate: z.string().optional(),
        playerMode: z.string().min(3, t('minCharacters', { count: 3 })).optional(),
        gameMode: z.string().min(3, t('minCharacters', { count: 3 })).optional(),
        tournamentTypeId: z.string().min(3, t('minCharacters', { count: 3 })).optional(),
        qtySetPerTable: z.number().min(0, t('minValue', { count: 0 })).optional(),
        qtySetPerFinal: z.number().min(0, t('minValue', { count: 0 })).optional(),
        emailRemember: z.boolean(),
        access: z.enum(['private', 'public'], {
            errorMap: (issue, ctx) => ({ message: t('accessRequired') })
        }),
        moneyPrice: z.number().min(0, t('minValue', { count: 0 })).optional(),
    });
};

export const createTournamentPlayerSchema = (
    t: (id: string, args?: any) => string
) => {
    return z.object({
        firstName: z.string().min(3, t('nameMinLength')).optional(),
    });
};

