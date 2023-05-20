import axios from "axios"
import api, { ApiResponse } from "./api"
import { Customer } from "./types"

export default async function getCustomers(): Promise<Customer[]> {
    const response = await axios<ApiResponse<Customer[]>>(api('customers'))
    if (response.data.success) {
        return response.data.data
    }
    throw new Error(response.data.error)
}