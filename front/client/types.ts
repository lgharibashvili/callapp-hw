export type Customer = {
    id: number
    name: string
    email: string
    gender: "male" | "female" | "non-binary"
    address: {
        street: string
        city: string
    }
    phone: string
}
