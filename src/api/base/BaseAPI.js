import BaseAPIConfig from "../base/BaseAPIConfig.js";

export default class BaseAPI {
    constructor() {
        this.controller = null;
    }

    /**
     * Hàm lấy tất cả dữ liệu nv
     * createdBy: NQMinh(02/08/2021)
     */
    getAll() {
        return BaseAPIConfig.get(`${this.controller}`);
    }

    /**
     * Hàm lấy dữ liệu phân trang
     * @param {*} payload
     * createdBy: NQMinh(02/08/2021)
     */
    paging(payload) {
        return BaseAPIConfig.post(`${this.controller}/paging`, payload);
    }

    /**
     * Hàm cập nhật dữ liệu nv
     * @param {*} id
     * @param {*} body
     * createdBy: NQMinh(02/08/2021)
     */
    update(id, body) {
        return BaseAPIConfig.update(`${this.controller}/update/${id}`, body);
    }

    /**
     * Hàm xóa thông tin nv
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     * createdBy: NQMinh(02/08/2021)
     */
    delete(id) {
        return BaseAPIConfig.delete(`${this.controller}/delete/${id}`);
    }
}