<template>
  <div
      class="misa-content"
      :class="{'misa-content--extend': menuToggled}"
  >
    <!-- header của content ở đây, bao gồm title và nút thêm nhân viên -->
    <MisaContentHeader
        :modalIsOpened="modalIsOpened"
        :buttonDeleteShown="buttonDeleteShown"
        :employeesToDelete="employeesToDelete"
        @btn-add-clicked="toggleModal"
        @open-popup="toggleAlertMessage"
    />

    <!-- mục tìm kiếm của content ở đây -->
    <MisaContentSearchSection
        :isLoading="isLoading"
        @search-input-changed="searchEmployee"
        @reload="loadData"
    />

    <!-- bảng chính của content ở đây -->
    <MisaTable
        :data="employees"
        :isLoading="isLoading"
        :searchKeyword="searchKeyword"
        @row-double-clicked="bindingDataFromTable"
        @show-btn-delete="showButtonDelete"
        @hide-btn-delete="hideButtonDelete"
    />

    <!-- footer của content ở đây -->
    <MisaContentFooter></MisaContentFooter>

    <EmployeeDetail
        :employeeData="individualData"
        :modalIsOpened="modalIsOpened"
        :newEmployeeCode="employeeCode"
        :wantToCreateNewEmployee="wantToCreateNewEmployee"
        @close-modal="toggleModal"
        @modal-submitted="loadData"
    />

    <!-- popup message ở đây, hiện ra cảnh báo người dùng -->
    <MisaPopupMessage
        popupTitle='Xóa bản ghi'
        popupDescription='Bạn có chắc muốn xóa thông tin của (các) nhân viên này hay không? Một khi xóa không thể lấy lại dữ liệu.'
        popupType="alert"
        :popupIcon="true"
        :openAlertPopup="openAlertPopupMessage"
        :employeesToDelete="employeesToDelete"
        @open-popup="toggleAlertMessage"
        @delete-success="afterDelete"
    />
  </div>
</template>

<script>
import EmployeesAPI from "@/api/components/EmployeesAPI";

import Toast from "@/utils/ToastsCreator";

import EmployeeDetail from "@/view/employee/EmployeeDetail";
import MisaContentFooter from "@/components/layout/content/MisaContentFooter";
import MisaContentHeader from "@/components/layout/content/MisaContentHeader";
import MisaContentSearchSection from "@/components/layout/content/MisaContentSearchSection";

export default {
  name: 'EmployeeList',

  mounted() {
    this.loadData();
  },

  data() {
    return {
      //Biến kiểm tra nút xóa có hiện ra không
      buttonDeleteShown: false,

      //Mảng chứa danh sách nv
      employees: [],

      //Mã nv mới call từ API
      employeeCode: '',

      //Mảng chứa id các nv muốn xóa
      employeesToDelete: [],

      //Thông tin 1 nv được chọn
      individualData: null,

      //Biến check trạng thái load dữ liệu
      isLoading: true,

      //Biến check trạng thái đóng/mở của modal
      modalIsOpened: false,

      //Biến check trạng thái đóng/mở của popup cảnh báo (đỏ)
      openAlertPopupMessage: false,

      //Biến check trạng thái đóng/mở của popup cảnh báo (vàng)
      openWarningPopupMessage: false,

      //Biến kiểm tra user muốn thêm hay sửa thông tin nv
      wantToCreateNewEmployee: true,

      //Từ khóa tìm kiếm nv của người dùng
      searchKeyword: ''
    }
  },

  props: {
    menuToggled: {
      type: Boolean
    }
  },

  components: {
    EmployeeDetail,
    MisaContentFooter,
    MisaContentHeader,
    MisaContentSearchSection
  },

  methods: {
    /**
     * Hàm call API lấy dữ liệu toàn bộ nv
     * Author: NQMinh(31/07/2021)
     */
    loadData() {
      this.searchKeyword = '';
      this.isLoading = true;
      EmployeesAPI.getAll().then(res => {
        this.isLoading = false;
        new Toast('okay');
        this.employees = res.data;
      }).catch(error => {
        new Toast(error.response.status);
      })
    },

    /**
     * Hàm binding dữ liệu từ bảng vào modal
     * @param {Boolean} state
     * @param {Object} employee
     * @param {Boolean} createNew
     * Author: NQMinh(31/07/2021)
     */
    bindingDataFromTable(state, employee, createNew) {
      this.modalIsOpened = state;
      this.individualData = employee;
      this.wantToCreateNewEmployee = createNew;
    },

    /**
     * Hàm ẩn hiện và truyền mã nv mới vào modal
     * @param {Boolean} state
     * @param {String} newEmployeeCode
     * @param {Boolean} createNew
     * Author: NQMinh(29/07/2021)
     */
    toggleModal(state, newEmployeeCode, createNew) {
      this.employeeCode = newEmployeeCode;
      this.modalIsOpened = state;
      this.wantToCreateNewEmployee = createNew;
    },

    /**
     * Hàm hiện nút xóa
     * @param {Array} employeesToDelete
     * Author: NQMinh(31/07/2021)
     */
    showButtonDelete(employeesToDelete) {
      this.buttonDeleteShown = true;
      this.employeesToDelete = employeesToDelete;
    },

    /**
     * Hàm ẩn nút xóa khi không có checkbox nào được chọn
     Author: NQMinh(31/07/2021)
     */
    hideButtonDelete() {
      this.buttonDeleteShown = false;
    },

    /**
     * Hàm xử lý các sự kiện sau khi xóa nhân viên, bao gồm ẩn popup và nút xóa, clear mảng nv cần xóa, load lại dữ liệu
     * Author: NQMinh(01/08/2021)
     */
    afterDelete() {
      this.toggleAlertMessage(false);
      this.hideButtonDelete();
      this.employeesToDelete = [];
      this.loadData();
    },

    /**
     * Hảm kích hoạt ẩn hiện popup cảnh báo trước khi xóa
     * @param state
     * Author: NQMinh(01/08/2021)
     */
    toggleAlertMessage(state) {
      this.openAlertPopupMessage = state;
    },

    /**
     * Hàm tìm kiếm nv, pass keyword người dùng gõ vào component MisaTable
     * @param keyword
     * Author: NQMinh(01/08/2021)
     */
    searchEmployee(keyword) {
      this.searchKeyword = keyword;
    }
  }
}
</script>