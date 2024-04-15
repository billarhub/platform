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
        lastName: z.string().min(3, t('lastNameMinLength')).optional(),
        phone: z
            .string({ required_error: t('requiredPhoneNumber') })
            .refine((value) => /^58(412|414|424|426|416|212)/.test(value), {
                message: t('phoneNumberPrefix'),
            })
            .refine((value) => value.length === 12, {
                message: t('phoneNumberLength'),
            }),
        email: z.string().email().optional(),
        documentId: z.string().min(3, t('documentIdMinLength')).optional(),
        role: z.string().optional(),
        dni: z
            .string({ required_error: t('requiredDocumentNumber') })
            .min(1, t('documentNumberLength'))
            .refine((value) => /^[0-9]+$/.test(value), {
                message: t('documentNumberDigits'),
            })
            .optional(),
    });
};

