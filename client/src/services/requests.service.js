const API_URL = "http://localhost:5001"

class RequestsService {
    async getRequest(url, query) {
        const opts = `title=${query.title}&priority=${query.priority}&tags=${query.tags}&description=${query.description}`
        console.log(opts)
        fetch(`${API_URL}/${url}?`+opts)
            .then(res => {
                console.log(res)
                // if(!res?.success)
                //     return {success: false}
                // return {success: true, data: res.data}
            })
            .catch(err => console.log(err))
    }
}

export default new RequestsService()