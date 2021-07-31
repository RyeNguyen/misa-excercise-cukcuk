<template>
  <div class="misa-content__search">
    <div class="misa-content__search--left">
      <div class="misa-text-box--default">
        <div id="search-icon"></div>
        <label>
          <input type="text" placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại" id="search-input">
        </label>
      </div>
      <MisaDropdown
          id="dropdown__department"
          title="Tất cả phòng ban"
          type="Department"
      />
      <MisaDropdown
          id="dropdown__position"
          title="Tất cả vị trí"
          type="Position"
      />
    </div>
    <div class="misa-content__search--right">
      <MisaButtonSecondary
          id="button__refresh"
          img="refresh.png"
          @click.native="reloadData"
      />
<!--      <div class="misa-button&#45;&#45;secondary misa-button__icon" id="button__refresh">-->
<!--        <div class="button__icon"></div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import MisaButtonSecondary from "@/components/base/button/MisaButtonSecondary";
import MisaDropdown from "@/components/base/dropdown/MisaDropdown";

export default {
  name: "MisaContentSearch",
  components: {
    MisaButtonSecondary,
    MisaDropdown
  },

  methods: {
    reloadData: function () {
      this.$emit("reload");
    }
  }
}
</script>