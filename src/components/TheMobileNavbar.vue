<template>
  <nav class="nav md:hidden fixed bottom-4 z-[1000] flex justify-center items-center -translate-x-1/2 left-1/2">
    <div class="content" :class="{'flap': isNavbarRound}">
      <div class="front">
        <div class="absolute -right-4 -bottom-4 text-white">
          <button @click="toggleNavbar">
            <img src="@/assets/images/round-icon.png" alt="" class="w-[30px]">
          </button>
        </div>
        <ul class="nav-list flex justify-center gap-2 items-center text-white w-full min-w-[290px]">
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
      </div>
      <div class="back">
        <div class="absolute -right-4 -bottom-4 text-white">
          <button @click="toggleNavbar">
            <img src="@/assets/images/round-icon.png" alt="" class="w-[30px]">
          </button>
        </div>
        <button class="w-full py-1 flex flex-col items-center justify-center" @click="deleteAllData">
          <span>
            <img src="@/assets/images/delete-icon.svg" class="w-[30px] h-[30px]" alt="">
          </span>
          <span class="text-2xl">
            Delete all
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {watch, ref} from "vue"
import {useRoute} from 'vue-router'
import {useModalsStore} from "@/store/useModalsStore";
import {useUserStore} from "@/store/userStore";
import {useTagsStore} from "@/store/useTags";
import {useContactsStore} from "@/store/useContacts";

const modalsStore = useModalsStore()
const userStore = useUserStore()
const tagsStore = useTagsStore()
const contactsStore = useContactsStore()
const route = useRoute()
function modalOpener() {
  if(route.path === '/contacts') {
    modalsStore.openModal('addContactModal')
  } else if(route.path === '/tags') {
    modalsStore.openModal('addTagModal')
  }
}

const isNavbarRound = ref(false)
function toggleNavbar() {
  isNavbarRound.value = !isNavbarRound.value
}

function deleteAllData() {
  userStore.clearAllData()
  tagsStore.initialize()
  contactsStore.initialize()
  isNavbarRound.value = false
}

watch(() => route.path, ()=> {
  modalsStore.closeAllModals()
})
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;

  transition: transform 1s;
  transform-style: preserve-3d;
  background: rgba(0, 0, 0, .5);

}

.back, .front {
  @apply rounded-sm;
  height: 100%;
  width: 100%;
  color: white;
  text-align: center;
  backface-visibility: hidden;
}

.back {
  position: absolute;
  background: #fa3434;
  color: white;
  top: 0;
  transform: rotateY( 180deg );
}

.flap {
  transform: rotateY( 180deg ) ;
  transition: transform 0.5s;
}
.nav {
  @apply w-fit backdrop-blur-sm rounded-md;
  perspective: 500px;
}

.nav-list__item {
  @apply py-2 px-4;
}

.nav-list__link {
  @apply transition-all w-full block rounded-lg;
}
</style>
