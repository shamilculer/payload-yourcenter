'use server'

import nodemailer from 'nodemailer'
import { contactTemplate } from '@/components/email-template/contactTemplate'
import { callbackTemplate } from '@/components/email-template/callbackTemplate'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export async function sendContactEmailAction(data: {
    name: string
    email: string
    phone: string
    location: string
    message: string
}) {
    try {
        const info = await transporter.sendMail({
            from: `Yourcenter Contact <${process.env.SMTP_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `New Contact Form Submission From ${data.name}`,
            html: contactTemplate(data),
        })

        console.log('Message sent: %s', info.messageId)
        return { success: true }
    } catch (err) {
        console.error('Email error:', err)
        return { success: false, error: err }
    }
}

export async function sendCallbackEmailAction(data: {
    name: string
    email: string
    phone: string
    location: string
    source: string
    message: string
}) {
    try {
        const info = await transporter.sendMail({
            from: `"Yourcenter Callback Request" <${process.env.SMTP_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `Callback Requested by ${data.name}`,
            html: callbackTemplate(data),
        })

        console.log('Message sent: %s', info.messageId)
        return { success: true }
    } catch (error) {
        console.error('Email error:', error)
        return { success: false, error: error }
    }
}
