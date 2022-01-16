<template>
  <div>
    <q-header elevated class="text-black" style="background: #fff;" height-hint="70">
      <q-toolbar style="height: 70px">
        <q-btn
          v-if="!$q.screen.gt.xs"
          flat
          round
          dense
          icon="menu"
          @click="drawer = !drawer"
          class="q-mr-sm"
        />
        <q-avatar v-if="$q.screen.gt.xs">
          <img src="/images/logo_apoya.png" />
        </q-avatar>
        <q-toolbar-title>
          <router-link to="/">
            <img src="/images/tipoApoya.png" style="width: 200px" />
          </router-link>
        </q-toolbar-title>

        <q-btn flat color="green-14" style="height: 70px" size="16px" icon="account_circle">
          <q-menu auto-close>
            <q-list>
              <q-item clickable v-close-popup v-if="uid!==''" @click="$router.push('/user')">
                <q-item-section>
                  <q-item-label>MI PERFIL</q-item-label>
                </q-item-section>
              </q-item>

              <!-- <q-item clickable v-close-popup >
                <q-item-section>
                  <q-item-label>MENSAJES</q-item-label>
                </q-item-section>
              </q-item> -->

              <q-separator />
              <q-item clickable v-close-popup v-if="uid===''" @click="loginActive=true">
                <q-item-section>
                  <q-item-label>INICIA SESIÓN</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup v-if="uid!==''">
                <q-item-section>
                  <q-item-label>CERRAR SESIÓN</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>


        <q-btn v-if="$q.screen.gt.xs" flat style="height: 70px" to="/" label="INICIO" />
        <q-btn
          v-if="$q.screen.gt.xs && $route.name!=='User'"
          style="height: 70px"
          to="/register"
          color="light-green-14"
          label="REGISTRA TU NEGOCIO"
        />
        <q-btn
          v-if="$q.screen.gt.xs && $route.name==='User'"
          style="height: 70px"
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
      <footer>
        <cookie-law theme="base" buttonText="Acepto el uso de 🍪">
          <div slot="message">Este sitio web utiliza cookies para una mejor experiencia de usuario</div>
        </cookie-law>
      </footer>
      <div class="q-pa-sm">
        <div class="row">
          <div class="col-5 col-sm-12 col-xs-12 col-md-5 q-pa-sm">
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
          </div>
          <div class="col-3 col-sm-6 col-xs-6 col-md-3 q-pa-sm">
            <q-btn color="white" label="Aviso de Privacidad" flat to="/terms" no-caps />
          </div>
          <div class="col-3 col-sm-6 col-xs-6 col-md-3 q-pa-sm">
            <q-btn
              color="white"
              label="Contacto"
              flat
              type="a"
              href="https://atomikod.com/contact.php"
              target="a_blank"
              no-caps
            />
          </div>
          <div class="col-1 col-sm-12 col-xs-12 col-md-1 q-pa-sm text-right">
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
          </div>
        </div>
      </div>

      <!-- <q-toolbar inset>
        
      </q-toolbar>-->
    </q-footer>

    <q-dialog
      v-model="loginActive"
    >
      <LoginForm  />
    </q-dialog>

   
    
  </div>
</template><script>
import CookieLaw from "vue-cookie-law";
import LoginForm from "@/components/LoginForm.vue";

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
  components: { CookieLaw,LoginForm },
  data() {
    return {
      drawer: false,
      menuList,
      year: this.get_year(),
      uid: "",
      loginActive:false,
    };
  },
  mounted: function() {
    document.title = "Apoya local | " + this.$route.name;
    if (this.$session.exists()) {
      this.uid = this.$session.get("jwt");
      
    }
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