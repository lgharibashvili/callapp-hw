import axios from "axios"
import api, { ApiResponse } from "./api"
import { Customer } from "./types"

export default async function updateCustomer(customer: Customer): Promise<Customer> {
    const response = await axios.post<ApiResponse<Customer>>(api('customers'), customer)
    if (response.data.success) {
        return response.data.data
    }
    throw new Error(response.data.error)
}