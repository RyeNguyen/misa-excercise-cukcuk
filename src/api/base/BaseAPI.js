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
     * Hàm lấy dữ liệu bằng id
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     * Author: NQMinh(04/08/2021)
     */
    getById(id) {
        return BaseAPIConfig.get(`${this.controller}/${id}`);
    }

    /**
     * Hàm sinh mã mới
     * @returns {Promise<AxiosResponse<any>>}
     * Author: NQMinh (26/08/2021)
     */
    getNewCode() {
        return BaseAPIConfig.get(`${this.controller}/newCode`);
    }

    /**
     * Hàm thêm mới dữ liệu
     * @param body
     * @returns {Promise<AxiosResponse<any>>}
     * Author: NQMinh(04/08/2021)
     */
    add(body) {
        return BaseAPIConfig.post(`${this.controller}`, body);
    }

    /**
     * Hàm lấy dữ liệu phân trang
     * createdBy: NQMinh(02/08/2021)
     * @param filter
     * @param departmentId
     * @param positionId
     * @param pageIndex
     * @param pageSize
     */
    paging(filter, departmentId, positionId, pageIndex, pageSize) {
        return BaseAPIConfig.get(`${this.controller}/paging?employeeFilter=${filter}&departmentId=${departmentId}&positionId=${positionId}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
    }

    /**
     * Hàm cập nhật dữ liệu nv
     * @param {*} id
     * @param {*} body
     * createdBy: NQMinh(02/08/2021)
     */
    update(id, body) {
        return BaseAPIConfig.patch(`${this.controller}/${id}`, body);
    }

    /**
     * Hàm xóa thông tin nv
     * @returns {Promise<AxiosResponse<any>>}
     * createdBy: NQMinh(02/08/2021)
     * @param ids
     */
    delete(ids) {
        return BaseAPIConfig.post(`${this.controller}/delete`, ids);
    }
}