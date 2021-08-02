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
      <MisaButton
          buttonId="button__refresh"
          buttonIcon="refresh.png"
          buttonType="secondary"
          @click.native="reloadData"
      />
    </div>
  </div>
</template>

<script>
import MisaButton from "@/components/base/MisaButton";
import MisaDropdown from "@/components/base/dropdown/MisaDropdown";

export default {
  name: "MisaContentSearch",
  components: {
    MisaButton,
    MisaDropdown
  },

  methods: {
    reloadData: function () {
      this.$emit("reload");
    }
  }
}
</script>

<style lang="scss">
.misa-content__search {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &--left {
    display: flex;
    align-content: center;

    & .misa-text-box--default {
      display: flex;
      align-items: center;
      position: relative;
      padding: 0;
      border: none;

      & input {
        padding-left: 40px;
      }
    }

    & input {
      height: 40px;
      width: 100%;
      outline: none;
      border-radius: 4px;
      border: 1px solid var(--color-hightlight);

      &:focus {
        border-color: var(--color-primary);
      }
    }

    & .misa-dropdown {
      margin: 0 12px;
    }
  }
}
</style>