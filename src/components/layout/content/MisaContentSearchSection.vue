<template>
  <div class="misa-content__search">
    <div class="misa-content__search--left">
      <div class="misa-text-box--default">
        <div id="search-icon"></div>
        <label>
          <input
              id="search-input"
              v-model="searchKeyword"
              placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại"
              type="text"
          >
        </label>
      </div>
      <!--      <MisaDropdown-->
      <!--          id="dropdown__department"-->
      <!--          title="Tất cả phòng ban"-->
      <!--          type="Department"-->
      <!--      />-->
      <!--      <MisaDropdown-->
      <!--          id="dropdown__position"-->
      <!--          title="Tất cả vị trí"-->
      <!--          type="Position"-->
      <!--      />-->

      <MisaCombobox
          comboboxDefaultOption="Tất cả phòng ban"
          comboboxId="combobox-department"
          comboboxPlaceholder="Chọn phòng ban"
          comboboxType="Department"
      />

      <MisaCombobox
          comboboxDefaultOption="Tất cả vị trí"
          comboboxId="combobox-position"
          comboboxPlaceholder="Chọn vị trí"
          comboboxType="Position"
      />

    </div>
    <div class="misa-content__search--right">
      <MisaButton
          buttonIcon="refresh.png"
          buttonId="button__refresh"
          buttonType="secondary"
          @click.native="reloadData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MisaContentSearch",

  data() {
    return {
      searchKeyword: ''
    }
  },

  props: {
    isLoading: {
      type: Boolean
    }
  },

  emits: ['search-input-changed'],

  watch: {
    searchKeyword: function () {
      this.$emit('search-input-changed', this.searchKeyword);
    },

    isLoading: function () {
      if (this.isLoading === true) {
        this.searchKeyword = '';
      }
    }
  },

  methods: {
    /**
     * Hàm gọi cha reload dữ liệu
     * Author: NQMinh(02/08/2021)
     */
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

        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
          font-size: 12px;
        }

        &::-moz-placeholder { /* Firefox 19+ */
          font-size: 12px;
        }

        &:-ms-input-placeholder { /* IE 10+ */
          font-size: 12px;
        }

        &:-moz-placeholder { /* Firefox 18- */
          font-size: 12px;
        }
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

    & .misa-combobox {
      margin-left: 12px;
    }
  }
}

#button__refresh {
  width: 50px;
}
</style>