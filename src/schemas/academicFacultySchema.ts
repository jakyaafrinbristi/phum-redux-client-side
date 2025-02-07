import { z } from "zod";

export const acadmeicFacultySchema = z.object({
name:z.string({required_error:'Please Choose youe Faculty'})
})