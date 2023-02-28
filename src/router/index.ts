import {
  createRouter,
  createWebHistory,
} from "vue-router";
import { useUserStore } from "@/store/userStore";
const Layout = () => import("@/layout/layout.vue");
const ContactsPage = () => import("@/pages/Contacts/index.vue");
const TagsPage = () => import("@/pages/Tags/index.vue");
const RegisterPage = () => import("@/pages/Auth/Register.vue");
const LoginPage = () => import("@/pages/Auth/Login.vue");
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/registration",
      name: "RegisterPage",
      component: RegisterPage,
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
    },
    {
      path: "/",
      name: "MainLayout",
      component: Layout,
      children: [
        {
          path: "",
          redirect: "/contacts"
        },
        {
          path: "/contacts",
          name: "ContactsPage",
          component: ContactsPage,
        },
        {
          path: "/tags",
          name: "TagsPage",
          component: TagsPage,
        },
      ]
    },
  ],
});
