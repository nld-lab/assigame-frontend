/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const formSchema = z.object({
  name: z.string({ error: "This field is required" }),
  surname: z.string({ error: "This field is required" }),
  username: z.string({ error: "This field is required" }),
  email: z.email({ error: "Please enter a valid email" }),
  telephone: z.coerce.number({ error: "Please enter a valid phone number" }),
  password: z.string({ error: "This field is required" }),
  confirm_password: z.string({ error: "This field is required" }),
  gender: z.string().min(1, "Please select an item"),
  residence: z.string({ error: "This field is required" }),
});
