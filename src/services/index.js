import axios from "axios";

const http = axios.create();

const httpServices = {
  async delete(toDo) {
    return http.post("www.someUrl.com/delete", toDo);
  },
};

export { httpServices };
