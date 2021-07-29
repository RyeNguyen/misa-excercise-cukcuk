<template>
  <div class="misa-content__search">
    <div class="misa-content__search--left">
      <div class="misa-text-box--default">
        <div id="search-icon"></div>
        <label>
          <input type="text" placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại" id="search-input">
        </label>
      </div>
      <MisaDropdown id="dropdown__department" title="Tất cả phòng ban"></MisaDropdown>
      <MisaDropdown id="dropdown__position" title="Tất cả vị trí"></MisaDropdown>
    </div>
    <div class="misa-content__search--right">
      <div class="misa-button--secondary misa-button__icon" id="button__refresh">
        <div class="button__icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MisaDropdown from "@/components/base/MisaDropdown";

export default {
  name: "MisaContentSearch",
  components: {
    MisaDropdown
  }
}
</script>