<template>
  <div class="misa-modal-container">
    <div class="misa-modal">
      <img src="../../assets/icon/x.svg" alt="close button" class="misa-modal__button-close" @click="closeModal">

      <h1 class="misa-modal__header">Thông tin nhân viên</h1>

      <div class="misa-modal__content">
        <div class="misa-modal__img-picker">
          <div style="display: flex; flex-direction: column; align-items: center; width: 80%">
            <div class="img-picker__placeholder"></div>
            <div class="img-picker__text">(Vui lòng chọn ảnh có định dạng .jpg, .jpeg, .png, .gif.)</div>
          </div>
        </div>

        <div class="misa-modal__form">
          <!-- Thông tin nhân viên -->
          <div class="misa-modal__info">
            <h2 class="info__title">a. thông tin chung:</h2>
            <div class="misa__divider"></div>

            <div class="misa-modal__fields">
              <!-- Nhập mã nhân viên ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-code" class="misa-label-text">
                  Mã nhân viên (<span class="misa__asterisk">*</span>)
                </label>
                <input class="misa-text-box--default" type="text" id="input-employee-code" required />
              </div>

              <!-- Nhập tên ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-name" class="misa-label-text">
                  Họ và tên (<span class="misa__asterisk">*</span>)
                </label>
                <input class="misa-text-box--default" type="text" id="input-employee-name" required />
              </div>

              <!-- Nhập ngày sinh ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-date-born" class="misa-label-text">
                  Ngày sinh
                </label>
                <input class="misa-text-box--default" type="date" id="input-employee-date-born" />
              </div>

              <!-- Nhaaph giới tính ở đây -->
              <div class="misa-modal__field">
                <label class="misa-label-text">
                  Giới tính
                </label>
                <MisaDropdown id="dropdown__gender" title="Chọn giới tính"></MisaDropdown>
              </div>

              <!-- Nhập CMT ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-id" class="misa-label-text">
                  Số CMTND/Căn cước (<span class="misa__asterisk">*</span>)
                </label>
                <input class="misa-text-box--default" id="input-employee-id" required />
              </div>

              <!-- Nhập ngày cấp CMT ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-id-date" class="misa-label-text">
                  Ngày cấp
                </label>
                <input class="misa-text-box--default" type="date" id="input-employee-id-date" />
              </div>

              <!-- Nhập nơi cấp CMT ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-id-place" class="misa-label-text">
                  Nơi cấp
                </label>
                <input class="misa-text-box--default" type="text" id="input-employee-id-place" />
              </div>
            </div>

            <div class="misa-modal__fields">
              <!-- Nhập email ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-email" class="misa-label-text">
                  Email (<span class="misa__asterisk">*</span>)
                </label>
                <input class="misa-text-box--default" type="email" id="input-employee-email" required/>
              </div>

              <!-- Nhập SĐT ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-phone" class="misa-label-text">
                  Số điện thoại (<span class="misa__asterisk">*</span>)
                </label>
                <input class="misa-text-box--default" type="tel" id="input-employee-phone" required />
              </div>
            </div>
          </div>

          <!-- Thông tin công việc -->
          <div class="misa-modal__info">
            <h2 class="info__title">b. thông tin công việc:</h2>
            <div class="misa__divider"></div>

            <div class="misa-modal__fields">
              <!-- Nhập vị trí ở đây -->
              <div class="misa-modal__field">
                <label class="misa-label-text">
                  Vị trí
                </label>
                <MisaDropdown id="dropdown__position-modal" title="Chọn vị trí"></MisaDropdown>
              </div>

              <!-- Nhập phòng ban ở đây -->
              <div class="misa-modal__field">
                <label class="misa-label-text">
                  Phòng ban
                </label>
                <MisaDropdown id="dropdown__department-modal" title="Chọn phòng ban"></MisaDropdown>
              </div>

              <!-- Nhập mã số thuế ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-wage" class="misa-label-text">
                  Mã số thuế cá nhân
                </label>
                <input class="misa-text-box--default" type="text" id="input-employee-wage" />
              </div>

              <!-- Nhập lương ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-income" class="misa-label-text">
                  Mức lương cơ bản
                </label>
                <div id="income-container">
                  <input class="misa-text-box--default" type="text"
                         id="input-employee-income"/>
                  <div id="income-container__label">VNĐ</div>
                </div>
              </div>

              <!-- Nhập ngày vào công ty ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-date-company" class="misa-label-text">
                  Ngày gia nhập công ty
                </label>
                <input class="misa-text-box--default" type="date" id="input-employee-date-company" />
              </div>

              <!-- Nhập tình trạng làm việc ở đây -->
              <div class="misa-modal__field">
                <label class="misa-label-text">
                  Tình trạng làm việc
                </label>
                <MisaDropdown id="dropdown__work-status" title="Tình trạng làm việc"></MisaDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="misa-modal__footer">
        <div class="misa-button--secondary" id="button__cancel">Hủy</div>
        <div class="misa-button--primary misa-button__icon" id="button__submit">
          <div class="button__icon"><i class="far fa-save"></i></div>
          <div class="button__text">Lưu</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MisaDropdown from "@/components/base/MisaDropdown";

export default {
  name: "MisaPopupModal",
  components: {
    MisaDropdown
  },
  methods: {
    closeModal() {
      document.querySelector('.misa-modal-container').style.display = 'none';
    }
  }
}
</script>

<style>
@import url('../../css/base/Modal.css');
</style>