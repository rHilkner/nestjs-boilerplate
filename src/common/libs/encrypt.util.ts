import bcrypt from 'bcrypt';

export function encrypt(text: string): Promise<string> {
    return bcrypt.hash(text, 10);
}

export function compare(text: string, encryptedText: string): Promise<boolean> {
    return bcrypt.compare(text, encryptedText);
}
