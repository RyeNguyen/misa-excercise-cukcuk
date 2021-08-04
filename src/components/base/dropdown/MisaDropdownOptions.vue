<template>
  <div
      class="dropdown__content"
      :class="{'dropdown__content--hidden': contentHidden}"
  >
    <a
        href="#"
        :class="{'dropdown__content-link--active': currentIndex === -1}"
        @click="resetDropdown"
    ><i class="fas fa-check"></i>
      {{ dropdownTitle }}
    </a>
    <a
        v-for="(option, index) in dropdownOptions"
        :key="option[`${dropdownType}Id`]"
        href="#"
        :class="{'dropdown__content-link--active': currentIndex === index}"
        :value="option[`${dropdownType}Id`]"
        @click="optionActive(index)"
    ><i class="fas fa-check"></i>
      {{ option[`${dropdownType}Name`] }}
    </a>
  </div>
</template>

<script>
import Toast from "@/utils/ToastsCreator";

import axios from "axios";

export default {
  name: "MisaDropdownOptions",
  created() {
    let apiUrl = '';

    //TODO: Hiện tại đang fix cứng call API của phòng ban và vị trí ở đây
    switch (this.dropdownType) {
      case 'Department':
        apiUrl = 'http://cukcuk.manhnv.net/api/Department';
        break;
      case 'Position':
        apiUrl = 'http://cukcuk.manhnv.net/v1/Positions';
        break;
    }
    axios.get(apiUrl).then(res => {
      this.dropdownOptions = res.data;
    }).catch(res => {
      new Toast(res);
    })
  },

  data() {
    return {
      currentIndex: -1,
      dropdownOptions: [],
      isActive: false,
    }
  },
  props: {
    contentHidden: {
      type: Boolean
    },
    dropdownTitle: {
      type: String,
      required: true
    },
    dropdownType: {
      type: String,
      required: true
    }
  },

  emits: ['dropdown-item-active'],

  methods: {
    //Hàm chọn một option trong số các options được xổ ra bởi dropdown
    //Author: NQMinh(29/07/2021)
    optionActive(index) {
      this.currentIndex = index;
      this.$emit('dropdown-item-active', this.dropdownOptions[this.currentIndex]);
    },

    //Hàm chuyển dropdown về trạng thái ban đầu (không chọn gì cả)
    //Author: NQMinh(29/07/2021)
    resetDropdown() {
      this.currentIndex = -1;
      this.$emit('dropdown-item-active');
    }
  }
}
</script>

<style lang="scss">
.dropdown__content {
  width: 100%;
  position: absolute;
  display: block;
  z-index: 8;
  padding: 4px 0;
  background-color: var(--color-white);
  border-radius: 4px;
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.25);

  &.out-of-space {
    bottom: 40px;
  }

  &--hidden {
    display: none;
  }

  &--show {
    display: block;
  }

  & a {
    height: 40px;
    padding: 0 10px 0 33px;
    color: var(--color-content-text);
    text-decoration: none;
    display: flex;
    align-items: center;
    position: relative;
    transition: 0.2s all ease-in-out;

    &:hover {
      background-color: var(--color-secondary-hover);
      color: var(--color-content-text);
    }
  }

  &-link--active {
    background-color: var(--color-primary);
    color: var(--color-white) !important;

    &:hover {
      background-color: var(--color-primary-hover) !important;
      color: var(--color-white) !important;
    }

    & i {
      display: block !important;
    }
  }

  & a i {
    position: absolute;
    left: 10px;
    top: 13px;
    font-size: 13px;
    display: none;
    color: var(--color-white);
  }
}
</style>