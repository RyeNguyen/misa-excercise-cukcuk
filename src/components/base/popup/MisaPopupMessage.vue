<template>
  <div
      class="misa-popup-container"
      :class="{'misa-popup-container--open': openPopupClass}"
      @click="closePopup"
  >
    <div class="misa-popup" @click.stop.prevent>
      <div
          class="misa-popup__btn-close-container"
          @click="closePopup"
      >
        <img
            src="@/assets/icon/x.svg"
            alt="close button"
            class="misa-popup__button-close"
        >
      </div>

      <div class="header__title">{{ popupTitle }}</div>
      <div class="misa-popup__body">
        <div
            v-if="popupIcon"
            class="misa-popup__icon"
            :class=iconClass
        >
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="misa-popup__text">
          {{ popupDescription }}
        </div>
      </div>
      <div class="misa-popup__footer">
        <MisaButton
            buttonType="secondary"
            :buttonText=buttonSecondaryText
            @click.native="closePopup"
        />

        <MisaButton
            v-if="popupType === 'alert'"
            :buttonType="popupType"
            :buttonText=buttonPrimaryText
            @click.native="deleteEmployee"
        />

        <MisaButton
            v-if="popupType === 'primary'"
            :buttonType="popupType"
            :buttonText=buttonPrimaryText
            @click.native="deleteEmployee"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeesAPI from "@/api/components/EmployeesAPI";

import Toast from "@/utils/ToastsCreator";

import MisaButton from "@/components/base/MisaButton";

export default {
  name: "MisaPopupMessage",

  data() {
    return {}
  },

  //#region props
  props: {
    popupIcon: {
      type: Boolean
    },

    popupTitle: {
      type: String,
      required: true
    },

    popupDescription: {
      type: String,
      required: true
    },

    popupType: {
      type: String,
      require: true
    },

    openAlertPopup: {
      type: Boolean
    },

    openWarningPopup: {
      type: Boolean
    },

    employeesToDelete: Array
  },
  //#endregion

  components: {
    MisaButton
  },

  emits: ['open-popup'],

  computed: {
    iconClass: function() {
      return `misa-popup__icon--${this.popupType}`;
    },

    openPopupClass: function() {
      return this.openAlertPopup || this.openWarningPopup;
    },

    buttonSecondaryText: function() {
      return this.popupType === 'alert' ? 'Hủy' : 'Tiếp tục nhập';
    },

    buttonPrimaryText: function() {
      return this.popupType === 'alert' ? 'Xóa' : 'Đóng';
    }
  },

  methods: {
    /**
     * Hàm ẩn popup
     * Author: NQMinh(02/08/2021)
     */
    closePopup() {
      this.$emit('open-popup', false);
    },

    /**
     * Hàm xóa nhân viên
     Author: NQMinh(31/07/2021)
     */
    deleteEmployee() {
      let deleteCount = 0;
      const vm = this;
      vm.employeesToDelete.forEach(employee => {
        EmployeesAPI.delete(employee['EmployeeId']).then(() => {
          deleteCount += 1;
          if (deleteCount === vm.employeesToDelete.length) {
            new Toast(2);
            vm.$emit('delete-success');
          }
        }).catch(error => {
          new Toast(error.response.status);
        })
      })
    },

    /**
     * Hàm ẩn modal
     * Author: NQMinh (29/07/2021)
     */
    closeModal() {
      this.$emit('open-popup', false);
    }
  }
}
</script>

<style lang="scss" scoped>
.misa-popup-container {
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 21;

  &--open {
    display: flex;
  }
}

.misa-popup {
  width: 27%;
  height: 25%;
  background-color: var(--color-white);
  padding: 24px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.5);

  &__btn-close-container {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    cursor: pointer;
    transition: 0.2s all ease-in-out;

    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }

  & .header__title {
    color: var(--color-black);
    font-size: 15px;
    font-weight: bold;
  }

  &__body {
    margin: 24px 0;
    display: flex;
    gap: 10px;
    align-items: center;

    & .misa-popup__icon {
      background-color: var(--color-secondary);
      border-radius: 50%;
      padding: 8px;

      &--alert {
        color: var(--color-alert);
      }

      &--warning {
        color: var(--color-warning);
      }
    }
  }

  &__footer {
    width: 100%;
    padding: 10px 24px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--color-secondary);
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-end;

    & .misa-button--secondary {
      border: none;

      &:hover {
        background-color: var(--color-hightlight);
      }

      &:active {
        background-color: transparent;
      }
    }
  }
}

@media screen and (max-width: 1080px) {
  .misa-popup {
    width: 60%;
  }
}
</style>