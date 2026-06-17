import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (typeof data === "string" && data.trim()) {
            return data;
        }
        if (data && typeof data === "object" && "message" in data) {
            return String((data as { message: string }).message);
        }
    }
    return fallback;
}
