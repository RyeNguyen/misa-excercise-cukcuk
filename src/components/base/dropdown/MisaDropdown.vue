<template>
  <div
      class="misa-dropdown"
      :id="id"
      :value="value"
      v-click-outside="hideDropdownOptions"
  >
    <button
        class="dropdown__button"
        @click="showDropdownOptions"
    >
      <span
          class="misa-dropdown__logo"
          v-if="dropdownType === 'Restaurant' && dropdownLogo[value - 1]"
          :style="{
            color: dropdownLogo[value - 1]['RestaurantColor'],
            backgroundColor: dropdownLogo[value - 1]['RestaurantBackgroundColor']
          }"
      >
        {{ dropdownLogo[value - 1]['RestaurantIcon'] }}
      </span>
      <span class="dropdown__title">{{ dropdownTitle }}</span>
      <i class="fas fa-chevron-down" :class="{'misa-rotate180': iconRotate}"></i>
    </button>
    <MisaDropdownOptions
        :contentHidden="contentHidden"
        :dropdownTitle="title"
        :dropdownType="dropdownType"
        @dropdown-item-active="assignDropdown"
    />
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

import RestaurantModel from "@/models/RestaurantModel";

import MisaDropdownOptions from "@/components/base/dropdown/MisaDropdownOptions";

export default {
  name: "MisaDropdown",

  data() {
    return {
      contentHidden: true,
      dropdownTitle: this.title,
      dropdownType: this.type,
      iconRotate: false,
      value: '',
      dropdownLogo: RestaurantModel.initData(),
    }
  },

  //#region props
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    type: {
      type: String,
      required: true
    }
  },
  //#endregion

  components: {
    MisaDropdownOptions
  },

  directives: {
    ClickOutside
  },

  methods: {
    //Hàm xổ dropdown content khi click (click lần 2 để đóng)
    //Author: NQMinh(29/07/2021)
    showDropdownOptions() {
      this.contentHidden = !this.contentHidden;
      this.iconRotate = !this.iconRotate;
    },

    //Hàm ẩn dropdown content khi click ra ngoài
    //Author: NQMinh(09/08/2021)
    hideDropdownOptions() {
      this.contentHidden = true;
      this.iconRotate = false;
    },

    //Hàm chuyển title của button dropdown
    //@params dropdown item
    //Author: NQMinh(29/07/2021)
    //Modified: NQMinh (08/08/2021)
    assignDropdown(item) {
      //nếu có chọn item thì chuyển title thành tên item
      if (item) {
        this.dropdownTitle = item[`${this.type}Name`];
        this.value = item[`${this.type}Id`];
      } else {
        this.dropdownTitle = this.title;
        this.value = '';
      }
      //ẩn dropdown content vaf xoay mũi tên
      this.hideDropdownOptions();
    }
  }
}
</script>

<style lang="scss">
.misa-dropdown {
  width: 200px;
  height: 40px;
  position: relative;
  background-color: var(--color-white);
  border-radius: 4px;

  &__logo {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    margin-right: 8px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  & .dropdown__button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-black);
    background-color: transparent;
    padding: 0 12px 0 16px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid var(--color-hightlight);
    cursor: pointer;

    & i {
      margin-left: 12px;
      transition: 0.2s all ease-in-out;
    }

    &:focus {
      border-color: var(--color-primary);
    }
  }
}
</style>