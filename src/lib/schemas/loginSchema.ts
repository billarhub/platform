import { z } from 'zod';

export const createLoginFormSchema = (
    t: (id: string, args?: any) => string
) => {
    return z.object({
        email: z.string().email('Introduce un correo válido'),
        password: z.string().min(8, t('passwordMinLength')).optional(),
    });
};