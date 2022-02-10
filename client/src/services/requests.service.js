const API_URL = "http://localhost:5001"

class RequestsService {
    async getRequest(url, query) {
        const opts = `title=${query.title}&priority=${query.priority}&tags=${query.tags}&description=${query.description}`
        console.log(opts)
        fetch(`${API_URL}/${url}?`+opts)
            .then(res => {
                if (!res.ok)
                    return {success: false}
                res.json().then(data => console.log(data))
            })
            .catch(err => console.log(err))
    }
}

export default new RequestsService()