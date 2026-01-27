import { z } from "zod";
// import { PORT } from "../../env.js";

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URI: z.string().min(1),
    MONGODB_DATABASE_NAME: z.string().min(1),
  })
  .parse(process.env);
