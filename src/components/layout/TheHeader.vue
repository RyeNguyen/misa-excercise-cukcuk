<template>
  <div class="misa-header">
    <div
        class="misa-header--left"
        :class="{'misa-header--left-shrink': menuToggled}"
    >
      <div
          class="header__toggle"
          :class="{'header__toggled': menuToggled}"
          @click="toggleMenu"
      />
      <div
          class="header__logo"
      />
    </div>
    <div
        class="misa-header--right"
        :class="{'misa-header--right-extend': menuToggled}"
    >
      <div class="header__title">
        <MisaDropdown
            id="dropdown__restaurant"
            type="Restaurant"
        />
      </div>
      <div class="header__user">
        <div>
          <i
              class="far fa-bell"
              style="font-size: 20px"
          ></i>
        </div>
        <div class="header__profile-picture"></div>
        <div class="header__username">Nguyễn Quang Minh</div>
        <div class="header__user header__icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
console.log(localStorage.getItem('menuToggled'))

export default {
  name: 'TheHeader',

  created() {
    console.log('Right now is' + this.menuToggled);
    const isAlreadyToggled = localStorage.getItem('menuToggled');
    if (isAlreadyToggled === 'toggled') {
      this.$emit('toggle-menu');
    }
  },

  data() {
    return {
      menuToggled: localStorage.getItem('menuToggled') === 'toggled'
    }
  },

  emits: ['toggle-menu'],

  methods: {
    toggleMenu: function() {
      this.menuToggled = !this.menuToggled;
      if (this.menuToggled === true) {
        localStorage.setItem('menuToggled', 'toggled');
      } else {
        localStorage.setItem('menuToggled', 'untouched');
      }
      this.$emit('toggle-menu');
    }
  }
}
</script>

<style lang="scss">
.misa-header {
  width: 100%;
  height: 49px;
  display: flex;

  &--left {
    width: 227px;
    height: 49px;
    border-right: 1px solid var(--color-hightlight);
    display: flex;
    align-items: center;
    transition: 0.2s all ease-in-out;

    &-shrink {
      //width: 64px !important;
      //justify-content: space-evenly;
      border-bottom: 1px solid var(--color-hightlight);
    }

    & .header {
      &__toggle {
        width: 24px;
        height: 24px;
        margin: 12px 10px 12px 16px;
        background-image: url('../../assets/img/toggle.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
      }

      &__logo {
        height: 24px;
        width: 100%;
        background-image: url('../../assets/img/cukcuk-logo.png');
        background-size: contain;
        background-position: 0 center;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
  }

  &--right {
    width: calc(100% - 225px);
    padding: 0 16px 0 8px;
    border-bottom: 1px solid var(--color-hightlight);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.2s all ease-in-out;
    z-index: 16;
    box-shadow: 12px 8px 24px -4px rgba(0, 0, 0, 0.25);

    & .header {
      &__title {
        & .misa-dropdown {
          width: auto;

          & .dropdown__button {
            border-color: transparent;
          }

          &:focus {
            border-color: var(--color-primary);
          }
        }

        & .dropdown__title {
          font-weight: bold;
          font-size: 15px;
        }
      }

      &__user {
        display: flex;
        gap: 16px;
        align-items: center;

        & .header {
          &__icon,
          &__profile-picture {
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            cursor: pointer;
          }

          &__profile-picture {
            width: 32px;
            height: 32px;
            background-image: url('../../assets/icon/avatar-default.png');
          }

          &__icon {
            background-image: url('../../assets/icon/option.png');
          }
        }
      }
    }
  }
}
</style>