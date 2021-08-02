<template>
  <div class="misa-popup-container">
    <div class="misa-popup">
      <div class="misa-popup__btn-close-container">
        <img src="@/assets/icon/x.svg" alt="close button" class="misa-popup__button-close">
      </div>

      <div class="header__title">{{ popupTitle }}</div>
      <div class="misa-popup__body">
        <div class="misa-popup__icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="misa-popup__text">
          {{ popupDescription }}
        </div>
      </div>
      <div class="misa-popup__footer">
        <MisaButton
            buttonType="secondary"
            buttonText="Hủy"
        />

        <MisaButton
            buttonType="alert"
            buttonText="Xóa"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MisaButton from "@/components/base/MisaButton";

export default {
  name: "MisaPopupMessage",

  data() {
    return {}
  },

  props: {
    popupTitle: {
      type: String,
      required: true
    },

    popupDescription: {
      type: String,
      required: true
    }
  },

  components: {
    MisaButton
  }
}
</script>

<style lang="scss">
.misa-popup-container {
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  z-index: 10;
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
      color: var(--color-alert);
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
  }
}

.misa-popup__footer .misa-button--secondary {
  border: none;
}

.misa-popup__footer .misa-button--secondary:hover {
  background-color: var(--color-hightlight);
}

.misa-popup__footer .misa-button--secondary:active {
  background-color: transparent;
}

.misa-popup__footer .misa-button--primary {
  background-color: var(--color-alert);
}

@media screen and (max-width: 1080px) {
  .misa-popup {
    width: 80%;
  }
}
</style>