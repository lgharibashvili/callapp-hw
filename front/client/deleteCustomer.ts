import axios from "axios"
import api, { ApiResponse } from "./api"
import { Customer } from "./types"

export default async function deleteCustomer(id: number): Promise<void> {
    const response = await axios.delete<ApiResponse<{}>>(api(`customers/${encodeURIComponent(id)}`))
    if (response.data.success) {
        return
    }
    throw new Error(response.data.error)
}