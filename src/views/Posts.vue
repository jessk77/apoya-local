<template>
  <q-layout view="hHh LpR fFf">
    <Header />
    <q-drawer v-model="drawerMenu" show-if-above :width="300" :breakpoint="500" bordered>
      <q-scroll-area class="fit">
        <br />
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item style="font-size: 16px" clickable :active="menuItem.label === 'Outbox'" v-ripple>
            <q-item-section avatar>
              <q-icon class="text-light-green-14" :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
      <q-item class="absolute-bottom" clickable>
        <q-item-section avatar>
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </q-item-section>
      </q-item>
    </q-drawer>
    <q-page-container>
          <q-page padding>
      <div class="q-mr-lg q-ml-lg">

        <q-card v-for="(menuItem, index) in menuList" :key="index" style="width: 90%; margin-left:5%" class="my-card q-ma-lg">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label  class="text-weight-bold">Café Zacatlan</q-item-label>
            </q-item-section>
          </q-item>
          <q-card-section style="margin-top: -10px"> <q-icon name="new_releases" class="text-light-green-14" style="font-size: 32px;" >
                 <q-tooltip  content-class="bg-green-14" content-style="font-size: 16px">
          NOVEDAD
        </q-tooltip>
                </q-icon> Ya contamos con Café Organico a un super precio</q-card-section>
          <img src="https://revistaelconocedor.com/wp-content/uploads/2013/08/coffee-beans-1024x640.jpg" />
          <q-card-actions  style="margin-bottom: -20px" align="left">
            <q-btn  flat round icon="favorite_outline" />
            <q-btn flat round icon="chat_bubble_outline" />
          </q-card-actions>
          <q-card-section class="text-weight-bold">20 Me gusta</q-card-section>
          <q-card-section style="margin-top: -20px">
                <span><span class="text-weight-bold">Winfield Stapforth</span> Este café si es de calidad</span><br>
                <span><span class="text-weight-bold">Razvan Stoenescu</span> 😀</span>
          </q-card-section>
          <q-card-section class="q-mt-none">
                <q-input
                style="margin-top: -15px"
                  outlined
                  square
                  v-model="busqueda"
                  dense
                  placeholder="Agregar un comentario"
                />
          </q-card-section>
        </q-card>
        <br />
      </div>
          </q-page>
    </q-page-container>
    <q-drawer v-model="drawerRight" side="right" show-if-above :width="350" :breakpoint="500">
      <q-scroll-area class="fit">
        <br />
        <q-list class="q-mr-md" bordered>
          <q-item-label header>Sugerencias a seguir</q-item-label>

          <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm">
            <q-item-section avatar>
              <q-avatar>
                <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ contact.name }}</q-item-label>
              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn flat color="light-green-14">Seguir</q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </q-layout>
</template>

<script>
import Header from "@/components/MainMenu";

const offline = [
  {
    id: 5,
    name: "Café Zacatlan",
    email: "@cafezacatlan",
    avatar: "avatar2.jpg"
  },
  {
    id: 6,
    name: "Vegan Foods",
    email: "@veganfoods",
    avatar: "avatar6.jpg"
  }
];
const menuList = [
  {
    icon: "home",
    label: "Inicio",
    separator: false
  },
  {
    icon: "search",
    label: "Buscar",
    separator: false
  },
  {
    icon: "notifications",
    label: "Notificaciones",
    separator: false
  },
  {
    icon: "forum",
    label: "Mensajes",
    separator: false
  },
  {
    icon: "favorite",
    label: "Seguidos",
    separator: false
  }
];
export default {
  name: "Terms",
  components: {
    Header
  },
  data() {
    return {
      menuList,
      offline,
      drawerMenu: false,
      drawerRight: false
    };
  }
};
</script>



<style >
.main-shapes {
  position: absolute;
  top: 10%;
  right: 16%;
  max-width: 25%;
  height: auto;
  z-index: 2;
}

.my-card {
  /* height: "300px;"; */
}
</style>

