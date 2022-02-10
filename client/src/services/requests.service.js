const API_URL = "http://localhost:5001"

class RequestsService {
    async getRequest(url, query) {
        const opts = `title=${query.title}&priority=${query.priority}&tags=${query.tags}&description=${query.description}`

        try {
            let res = await fetch(`${API_URL}/${url}?`+opts)
            return await res.json()

        } catch {
            return {success: false}
        }
    }
}

export default new RequestsService()