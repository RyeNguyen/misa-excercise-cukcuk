<template>
  <div class="misa-header">
    <div class="misa-header--left">
      <div class="header__toggle"></div>
      <div class="header__logo"></div>
    </div>
    <div class="misa-header--right">
      <div class="header__title">
        <div class="misa-dropdown" id="dropdown__restaurant">
          <button class="dropdown__button">
            <span class="dropdown__title">Nhà hàng Biển Đông</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="dropdown__content dropdown__content--hidden">
            <a href="#" class="dropdown__content-link--active"><i class="fas fa-check"></i>Nhà hàng Biển Đông</a>
            <a href="#"><i class="fas fa-check"></i>Nhà hàng Sen Việt</a>
            <a href="#"><i class="fas fa-check"></i>Nhà hàng Vua Chả Cá</a>
            <a href="#"><i class="fas fa-check"></i>Nhà hàng Don Chicken</a>
          </div>
        </div>
      </div>
      <div class="header__user">
        <div class="header__profile-picture"></div>
        <div class="header__username">Nguyễn Quang Minh</div>
        <div class="header__user header__icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style lang="scss">
.misa-header {
  width: 100%;
  height: 49px;
  display: flex;

  &--left {
    width: 226px;
    height: 49px;
    border-right: 1px solid var(--color-hightlight);
    display: flex;
    align-items: center;
    transition: 0.2s all ease-in-out;

    &-shrink {
      width: 64px !important;
      justify-content: space-evenly;
    }

    & .header {
      &__togle {
        width: 24px;
        height: 24px;
        margin: 12px 10px 12px 16px;
        background-image: url('../../assets/img/toggle.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
      }

      &__toggled {
        margin: 12px 16px 12px 16px !important;
      }

      &__logo {
        height: 24px;
        width: 100%;
        background-image: url('../../assets/img/cukcuk-logo.png');
        background-size: contain;
        background-position: 0 center;
        background-repeat: no-repeat;
      }
    }
  }

  &--right {
    width: calc(100% - 225px);
    padding: 0 16px;
    border-bottom: 1px solid var(--color-hightlight);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.2s all ease-in-out;

    &-extend {
      width: calc(100% - 64px) !important;
    }

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
        align-items: center;

        & .header {
          &__icon,
          &__profile-picture {
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }

          &__profile-picture {
            width: 32px;
            height: 32px;
            background-image: url('../../assets/icon/avatar-default.png');
            margin-right: 16px;
          }

          &__icon {
            background-image: url('../../assets/icon/option.png');
            margin-left: 16px;
          }
        }
      }
    }
  }
}
</style>