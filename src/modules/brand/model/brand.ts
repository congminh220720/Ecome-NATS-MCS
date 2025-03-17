import { z } from 'zod'
import { ErrBrandNameTooShort } from "./errors";
import { ModelStatus } from '../../../share/models/base-model';


export const modelName = "brand"

export const BrandSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, ErrBrandNameTooShort.message),
    image: z.string().optional(),
    description: z.string().optional(),
    tagLine: z.string().optional(),
    status: z.nativeEnum(ModelStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Brand = z.infer<typeof BrandSchema>;
