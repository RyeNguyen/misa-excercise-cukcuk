<template>
  <div class="misa-content">
    <!-- header của content ở đây, bao gồm title và nút thêm nhân viên -->
    <MisaContentHeader
        :modalIsOpened="modalIsOpened"
        :buttonDeleteShown="buttonDeleteShown"
        :employeesToDelete="employeesToDelete"
        @btn-add-clicked="toggleModal"
        @delete-success="afterDelete"
    />

    <!-- mục tìm kiếm của content ở đây -->
    <MisaContentSearchSection
        @reload="loadData"
    />

    <!-- bảng chính của content ở đây -->
    <MisaTable
        :data="employees"
        @row-double-clicked="bindingDataFromTable"
        @show-btn-delete="showButtonDelete"
        @hide-btn-delete="hideButtonDelete"
    />

    <!-- footer của content ở đây -->
    <MisaContentFooter></MisaContentFooter>

    <MisaPopupModal
        :employeeData="individualData"
        :modalIsOpened="modalIsOpened"
        :newEmployeeCode="employeeCode"
        :wantToCreateNewEmployee="wantToCreateNewEmployee"
        @btn-close-clicked="toggleModal"
        @modal-submitted="loadData"
    />

    <!-- popup message ở đây, hiện ra cảnh báo người dùng trước khi xóa nhân viên -->
    <div class="misa-popup-container" style="display: none">
      <div class="misa-popup">
        <div class="misa-popup__btn-close-container">
          <img src="@/assets/icon/x.svg" alt="close button" class="misa-popup__button-close">
        </div>

        <div class="header__title">Xóa bản ghi</div>
        <div class="misa-popup__body">
          <div class="misa-popup__icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="misa-popup__text">
            Bạn có chắc muốn xóa thông tin của (các) nhân viên này hay không? Một khi xóa không thể lấy lại
            dữ liệu.
          </div>
        </div>
        <div class="misa-popup__footer">
          <div class="misa-button--secondary">Hủy</div>
          <div class="misa-button--primary">Xóa</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import MisaContentFooter from "@/components/base/content-section/MisaContentFooter";
import MisaContentHeader from "@/components/base/content-section/MisaContentHeader";
import MisaContentSearchSection from "@/components/base/content-section/MisaContentSearchSection";
import MisaPopupModal from "@/components/base/MisaPopupModal";
import MisaTable from "@/components/base/MisaTable";

export default {
  name: 'TheContent',

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

      //Biến check trạng thái đóng/mở của modal
      modalIsOpened: false,

      //Biến kiểm tra user muốn thêm hay sửa thông tin nv
      wantToCreateNewEmployee: true
    }
  },

  components: {
    MisaContentFooter,
    MisaContentHeader,
    MisaContentSearchSection,
    MisaPopupModal,
    MisaTable
  },

  methods: {
    /**
     * Hàm call API lấy dữ liệu toàn bộ nv
     * Author: NQMinh(31/07/2021)
     */
    loadData() {
      console.log('Load data :>')
      //Gọi API lấy dữ liệu
      axios.get('http://cukcuk.manhnv.net/v1/Employees').then(res => {
        this.employees = res.data;
      }).catch(res => {
        console.log(res);
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
      this.deleteSuccess = false;
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

    afterDelete() {
      this.hideButtonDelete();
      this.employeesToDelete = [];
      this.loadData();
    }
  }
}
</script>

<style lang="scss">
.misa-content {
  width: calc(100% - 226px);
  height: calc(100% - 49px);
  position: absolute;
  top: 49px;
  left: 226px;
  padding: 16px;
  background-color: var(--color-secondary-hover);
  transition: 0.2s all ease-in-out;

  &--extend {
    width: calc(100% - 64px);
    left: 64px;
  }
}

#search-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 12px;
  left: 16px;
  background-image: url('../../assets/icon/search.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover
}

.active {
  background-color: var(--color-primary) !important;
  color: var(--color-white) !important;
}

@media screen and (max-width: 1280px) {
  .misa-content__footer .misa__pagination {
    width: 40%;
  }
}
</style>