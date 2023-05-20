const serverUrl = "http://localhost:4000"

export default function api(path: string) {
    return `${serverUrl}/${path}`
}

export type ApiResponse<T> = {
    data: T
    success: true
} | {
    error: any
    success: false
}