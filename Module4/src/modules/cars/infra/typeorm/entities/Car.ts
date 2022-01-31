import { v4 as uuid } from "uuid";

class Car {
    id: string;

    name: string;

    description: string;

    daily_rate: number;

    license_plate: string;

    fine_amount: number;

    brand: string;

    category_id: string;

    available: boolean;

    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.available = true;
            this.created_at = new Date();
        }
    }
}

export { Car };
