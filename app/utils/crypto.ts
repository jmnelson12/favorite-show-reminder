import crypto, { randomBytes } from 'crypto';
import uuidv4 from 'uuid/v4';

// from https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/

interface Sha_Def {
    salt: string;
    passwordHash: string;
}

export function genRandomString(len: number = 16): string {
    return crypto.randomBytes(Math.ceil(len / 2))
        .toString('hex')
        .slice(0, len);
}

function sha512Hash({ password, salt }: { password: string, salt: string }): Sha_Def {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt,
        passwordHash: value
    };
}

export function saltHashPassword(password: string): Sha_Def {
    const salt = genRandomString(16);
    const passwordData = sha512Hash({ password, salt });
    return passwordData;
}

export function isValidPassword({ password, passwordHash, salt }: { password: string, passwordHash: string, salt: string }): boolean {
    const { passwordHash: hashedPword } = sha512Hash({ password, salt });
    return hashedPword === passwordHash;
}

export function genToken(email: string): string {
    const base = Buffer.from(email).toString('base64'); // not a good way to do this...
    const randomId = genRandomId();

    return `${base}-${randomId}`;
}

export function genRandomId(): string {
    return uuidv4();
}
