import { readFile } from 'fs/promises'

export type Customer = {
    id: number
    name: string
    email: string
    gender: "male" | "female"
    address: {
        street: string
        city: string
    }
    phone: string
}


async function readData(dataPath: string) {
    const data: Customer[] = JSON.parse(await readFile(dataPath, 'utf-8'))
    data.sort((a, b) => a.id - b.id)
    return new Map(data.map(customer => [customer.id, customer]))
}


export function createStore(dataPath: string) {
    const data = readData(dataPath)
    return {
        async getCustomers() {
            return Array.from(await (await data).values())
        },
        async updateCustomer(customer: Customer) {
            return (await data).set(customer.id, customer).get(customer.id)
        },
        async removeCustomer(id: number) {
            return (await data).delete(id)
        }
    }
}