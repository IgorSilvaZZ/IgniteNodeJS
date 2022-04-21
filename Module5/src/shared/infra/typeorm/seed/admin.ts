import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

const create = async () => {
    const connection = await createConnection("localhost");

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(`
        insert into users(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `);

    await connection.close();
};

create().then(() => console.log("User Admin created"));
