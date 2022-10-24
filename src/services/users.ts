import axios from "axios"

export interface IUser {
    id: number;
    name: string;
    username: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    }
    phone: string;
    website: string;
    company: {
        name: string;
    }
}

export const getUserCollaborator = async () => {
    return axios.get<IUser[]>(`https://jsonplaceholder.typicode.com/users`);
}