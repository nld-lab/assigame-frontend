export function formatPhoneForWhatsApp(phone: string): string {
    return phone.replace(/\D/g, "");
}

export function buildWhatsAppLink(phone: string, message: string): string {
    return `https://wa.me/${formatPhoneForWhatsApp(phone)}?text=${encodeURIComponent(message)}`;
}

export function buildMailLink(
    email: string,
    subject: string,
    body: string
): string {
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildGmailComposeLink(
    email: string,
    subject: string,
    body: string
): string {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildProductContactMessage(
    productName: string,
    priceLabel: string
): string {
    return `Bonjour, je suis intéressé(e) par votre annonce « ${productName} » (${priceLabel}) sur Assigame. Est-elle toujours disponible ?`;
}
