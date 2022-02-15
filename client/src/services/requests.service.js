const API_URL = "http://localhost:5001";

class RequestsService {
  async getRequest(url, query = "") {
    const opts = `title=${query.title}&priority=${query.priority}&tags=${query.tags}&description=${query.description}`;

    try {
      let res = await fetch(`${API_URL}/${url}?` + opts);
      return await res.json();
    } catch {
      return { success: false };
    }
  }

  async updateTask(query) {
    try {
      const response = await fetch(`${API_URL}/update_task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: query,
        }),
      });
      return await response.json();
    } catch (error) {
      return { success: false };
    }
  }

  async deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/delete_task/${id}`, {
        method: "DELETE",
      });
      return { success: true, response };
    } catch (error) {
      return { success: false };
    }
  }

  async getTasks(start, range) {
    try {
      const res = await fetch(`${API_URL}/get_cards/${start}/${range}`);
      return await res.json();
    } catch (error) {
      return { success: false };
    }
  }

  async getTaskById(id) {
    try {
      const res = await fetch(`${API_URL}/get_task?id=${id}`);
      return await res.json();
    } catch (error) {
      return { success: false };
    }
  }
}

export default new RequestsService();
