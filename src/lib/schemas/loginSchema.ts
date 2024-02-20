import { z } from 'zod';

export const createLoginFormSchema = (
    t: (id: string, args?: any) => string
) => {
    return z.object({
        name: z.string().min(3, t('nameMinLength')).optional(),
        password: z.string().min(8, t('passwordMinLength')).optional(),
    });
};