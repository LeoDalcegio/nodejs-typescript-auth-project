'use-strict';

import bcrypt from 'bcryptjs';

export default async function comparePasswords(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
}
