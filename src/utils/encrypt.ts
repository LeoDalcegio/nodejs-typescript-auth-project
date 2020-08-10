'use-strict';

import bcrypt from 'bcryptjs';

export default async function encrypt(password: string) {
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
}
