'use server';

import prisma from "../db/prisma";
import { z } from 'zod';
import { headers } from "next/headers";

const guestMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Message is required"),
  ip: z.string().min(1),
});

export default async function submitMessage(prevState: any, formData: FormData): Promise<any> {
  try {

    const data = {
      name: formData.get('name')?.toString() ?? '',
      message: formData.get('message')?.toString() ?? '',
      ip: headers().get("x-forwarded-for"),
    };

    // Zod로 검증
    const validatedData = guestMessageSchema.parse(data);

    const submission = await prisma.guestMessage.create({
      data: {
        name: validatedData.name,
        message: validatedData.message,
        ip: validatedData.ip,
      },
    });

    return { success: true, message: 'Form submitted successfully', submission };
  } catch (error) {
    console.error('Error saving form submission:', error);
    return { success: false, message: 'Error saving form submission' };
  }
}