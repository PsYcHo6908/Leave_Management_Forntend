<template>
  <nav class="px-10 py-10 border-gray-200 bg-emerald-500 text-white top-0 z-10">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="menu-left">
          <a href="#" class="text-xl">ระบบลา มหาวิทยาลัยเกษตรศาสตร์</a>
        </div>

        <div class="menu-center flex space-x-12"></div>

        <div class="menu-right flex items-center space-x-4">
          <button class="bell">
            <img src="../assets/bell.png" width="20" height="20">
          </button>

          <div class="TopNavBarid">6310451286</div>

          <div class="TopNavBarname">พงศ์ศิริ เจริญกฤตยาวุฒิ</div>

          <button class="logout">
            <img src="../assets/power.png" width="20" height="20">
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'TopNavBar'

}
</script>

<style>
.text-xl {
  font-family: 'Prompt', sans-serif;
}

@media screen and (min-width: 1900px) {
  .menu-right {
    display: flex;
  }

  button.bell {
    width: 15%;
    margin-left: 25%;
  }

  .TopNavBarid {
    width: 100%;
    font-size: 20px;
    margin-right: -60%;
    font-family: 'Prompt', sans-serif;
  }

  .TopNavBarname {
    width: 95%;
    margin-right: -30%;
    font-size: 20px;
    font-family: 'Prompt', sans-serif;
  }

  button.logout {
    width: 100%;
    margin-right: -170%;
  }
}
</style>
