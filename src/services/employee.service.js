import http from "../http-common";

class EmployeeService {
    getAll() {
        return http.get("/users");
    }

    getById(id) {
        return http.get(`/users/${id}`);
    }

    getByPerPage(page) {
        return http.get(`/users?per_page=${page}`);
    }
}

export default new EmployeeService();