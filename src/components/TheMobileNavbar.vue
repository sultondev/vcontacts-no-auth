<template>
  <nav class="nav md:hidden fixed bottom-4 z-[1000] flex justify-center items-center -translate-x-1/2 left-1/2">
    <ul class="nav-list flex justify-center gap-2 items-center text-white w-full min-w-[260px]">
      <li class="nav-list__item">
        <router-link class="nav-list__link" to="/contacts">
          <img src="@/assets/images/contacts-list-icon.svg" class="w-[30px]" alt="">
        </router-link>
      </li>
      <li class="nav-list__item !py-0">
        <button class="nav-list__link " @click="modalOpener">
          <img src="@/assets/images/add-plus-icon.svg" class="w-[70px]" alt="">
        </button>
      </li>
      <li class="nav-list__item !pb-3">
        <router-link class="nav-list__link " to="/tags">
          <img src="@/assets/images/hashtag-icon.png" class="w-[36px]" alt="">
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {watch} from "vue"
import {useRoute} from 'vue-router'
import {useModalsStore} from "@/store/useModalsStore";

const modalsStore = useModalsStore()
const route = useRoute()
function modalOpener() {
  if(route.path === '/contacts') {
    modalsStore.openModal('addContactModal')
  } else if(route.path === '/tags') {
    modalsStore.openModal('addTagModal')
  }
}

watch(() => route.path, ()=> {
  modalsStore.closeAllModals()
})
</script>

<style scoped>
.nav {
  @apply w-fit backdrop-blur-sm rounded-md;
  background: rgba(0, 0, 0, .5);
}

.nav-list__item {
  @apply py-2 px-4;
}

.nav-list__link {
  @apply transition-all w-full block rounded-lg;
}
</style>
