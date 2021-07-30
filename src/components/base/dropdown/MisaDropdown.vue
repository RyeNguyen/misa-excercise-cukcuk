<template>
  <div class="misa-dropdown" :id="id" :value="value">
    <button
        class="dropdown__button"
        @click="showDropdownOptions"
    >
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
import MisaDropdownOptions from "@/components/base/dropdown/MisaDropdownOptions";

export default {
  name: "MisaDropdown",
  data() {
    return {
      contentHidden: true,
      dropdownTitle: this.title,
      dropdownType: this.type,
      iconRotate: false,
      value: ''
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    MisaDropdownOptions
  },
  methods: {
    //Hàm xổ dropdown content khi click (click lần 2 để đóng)
    //Author: NQMinh(29/07/2021)
    showDropdownOptions() {
      this.contentHidden = !this.contentHidden;
      this.iconRotate = !this.iconRotate;
    },

    hideDropdownOptions() {
      this.contentHidden = true;
    },

    //Hàm chuyển title của button dropdown
    //@params dropdown item
    //Author: NQMinh(29/07/2021)
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
      this.contentHidden = !this.contentHidden;
      this.iconRotate = false;
    }
  }
}
</script>