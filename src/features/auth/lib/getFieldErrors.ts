import { z } from "zod"

export const getFieldErrors = <T extends string>(error: z.ZodError) =>
  Object.fromEntries(
    Object.entries(z.flattenError(error).fieldErrors).map(
      ([field, messages]) => [field, (messages as string[])[0]],
    ),
  ) as Partial<Record<T, string>>
