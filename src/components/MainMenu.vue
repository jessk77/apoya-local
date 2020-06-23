<template>
  <div>
    <q-header elevated class="text-black" style="background: #fff;" height-hint="80">
      <q-toolbar style="height: 80px">
        <q-btn
          v-if="!$q.screen.gt.xs"
          flat
          round
          dense
          icon="menu"
          @click="drawer = !drawer"
          class="q-mr-sm"
        />

        <q-toolbar-title>
          <router-link to="/">
            <img src="/images/tipoApoya.png" style="width: 200px" />
          </router-link>
        </q-toolbar-title>

        <q-avatar>
          <img src="/images/logo_apoya.png" />
        </q-avatar>

        <q-btn v-if="$q.screen.gt.xs" flat style="height: 80px" to="/" label="INICIO" />
        <q-btn
          v-if="$q.screen.gt.xs && $route.name!=='User'"
          style="height: 80px"
          to="/register"
          color="light-green-14"
          label="REGISTRA TU NEGOCIO"
        />
        <q-btn
          v-if="$q.screen.gt.xs && $route.name==='User'"
          style="height: 80px"
          v-on:click="logout"
          color="light-green-14"
          label="CERRAR SESION"
        />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" :width="200" :breakpoint="500" bordered>
      <q-scroll-area class="fit">
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable :active="menuItem.label === 'Outbox'" :to="menuItem.link" v-ripple>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />
        </q-list>
        <q-item v-if="$route.name==='User'" v-on:click="logout" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="launch" />
          </q-item-section>
          <q-item-section>CERRAR SESIÓN</q-item-section>
        </q-item>
      </q-scroll-area>
    </q-drawer>

    <q-footer class="bg-black text-white" elevated>
      <q-toolbar class="q-pa-sm">
        Sitio desarrollado con
        <q-icon class="q-mr-xs q-ml-xs" name="fas fa-heart" />por:
        <q-btn
          color="white"
          label="Atomikod"
          flat
          type="a"
          href="https://atomikod.com"
          target="a_blank"
          no-caps
        />

        <div class="q-mr-lg q-ml-lg">|</div>
        <q-btn color="white" label="Aviso de Privacidad" flat to="/terms" no-caps />
        <div class="q-mr-lg q-ml-lg">|</div>
        <q-btn
          color="white"
          label="Contacto"
          flat
          type="a"
          href="https://atomikod.com/contact.php"
          target="a_blank"
          no-caps
        />
        <q-space />

        <q-btn
          color="indigo"
          round
          dense
          icon="fab fa-facebook"
          class="q-mr-sm"
          type="a"
          href="https://www.facebook.com/apoyalocalmx"
          target="a_blank"
        />
      </q-toolbar>

      <!-- <q-toolbar inset>
        
      </q-toolbar>-->
    </q-footer>
  </div>
</template><script>
const menuList = [
  {
    icon: "home",
    label: "INICIO",
    separator: false,
    link: "/"
  },
  {
    icon: "person_add",
    label: "REGISTRATE",
    separator: true,
    link: "/register"
  }
];
export default {
  name: "MainMenu",
  data() {
    return {
      drawer: false,
      menuList,
      year: this.get_year()
      //menuActive:false,
    };
  },
  mounted: function(){
      document.title = 'Apoya local | '+this.$route.name;
  },
  methods: {
    logout: function() {
      this.$session.destroy();
      this.$router.push("/");
    },
    get_year: function() {
      var today = new Date();
      return today.getFullYear();
    }
  }
};
</script>