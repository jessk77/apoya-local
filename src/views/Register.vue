<template>
  <q-layout>
    <Header />

    <q-page-container>
      <div class="q-mr-lg q-ml-lg">
        <q-parallax style="height: 220px;">
          <template v-slot:media>
            <img src="images/main_slider_1.jpg" />
          </template>

          <template v-slot:content="scope">
            <div
              class="absolute column items-left"
              :style="{
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
            >
              <div class="text-h3 text-white text-left q-ml-lg">Registro</div>
              <div
                class="text-h6 text-grey-3 text-left q-ml-lg"
              >Registra tu negocio en la plataforma</div>
            </div>

            <div class="main-shapes">
              <img v-if="$q.screen.gt.xs" src="/images/main_slider_shapes.png" class="q-ml-lg" />
            </div>
          </template>
        </q-parallax>

        <q-tabs v-model="tab" class=" text-white" align="justify" narrow-indicator>
          <q-tab class="bg-light-green-14" name="register" label="REGISTRO" />
          <q-tab class="bg-green-14" name="login" label="INICIO DE SESIÓN" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="text-center">
          <q-tab-panel name="register">
            <div class="text-h6">REGISTRA TU NEGOCIO</div>
            <br />Aparece en el listado y la busqueda de negocios.
            <br />
            <br />

            <form action="#" @submit.prevent="submit_register">
              <div class="row justify-center items-center">
                <q-input
                  filled
                  v-model="form.email"
                  type="email"
                  dense
                  required
                  label="Correo Electrónico"
                  style="width: 300px;"
                  class="q-mb-lg"
                />
              </div>
              <div class="row justify-center items-center">
                <q-input
                  filled
                  v-model="form.password"
                  type="password"
                  dense
                  required
                  label="Contraseña"
                  style="width: 300px;"
                  class="q-mb-lg"
                />
              </div>
              <div
                class="text-caption text-grey-7"
              >Al registrarte aceptas nuestros terminos y condiciones.</div>

              <q-btn
                type="submit"
                label="REGISTRARSE"
                color="light-green-14"
                class="q-mb-lg q-mt-md"
                style="width: 200px;"
              />
            </form>
            <div class="text-subtitle2">O</div>
            <q-btn
              v-on:click="facebook_register"
              icon="fab fa-facebook"
              type="submit"
              label="Inicia con Facebook"
              color="indigo"
              class="q-mr-lg q-mt-md"
              style="width: 230px;"
            />
            <q-btn
              v-on:click="google_register"
              icon="fab fa-google"
              type="submit"
              label="Inicia con Google"
              color="red"
              class="q-mt-md"
              style="width: 230px;"
            />
          </q-tab-panel>

          <q-tab-panel name="login">
            <div class="text-h6">INICIA SESIÓN</div>
            <br />

            <form action="#" @submit.prevent="submit_login">
              <div class="row justify-center items-center">
                <q-input
                  filled
                  v-model="form_login.email"
                  type="email"
                  dense
                  required
                  label="Correo Electrónico"
                  style="width: 300px;"
                  class="q-mb-lg"
                />
              </div>
              <div class="row justify-center items-center">
                <q-input
                  filled
                  v-model="form_login.password"
                  type="password"
                  dense
                  required
                  label="Contraseña"
                  style="width: 300px;"
                  class="q-mb-lg"
                />
              </div>
              <div class="text-caption text-grey-7"><q-btn size="sm" flat v-on:click="resetPassword">¿Olvidaste tu contraseña?.</q-btn></div>

              <q-btn
                type="submit"
                label="INICIAR"
                color="green-14"
                class="q-mb-lg q-mt-md"
                style="width: 200px;"
              />
            </form>
            <div class="text-subtitle2">O</div>
            <q-btn
              v-on:click="facebook_register"
              icon="fab fa-facebook"
              type="submit"
              label="Inicia con Facebook"
              color="indigo"
              class="q-mr-lg q-mt-md"
              style="width: 230px;"
            />
            <q-btn
              v-on:click="google_register"
              icon="fab fa-google"
              type="submit"
              label="Inicia con Google"
              color="red"
              class="q-mt-md"
              style="width: 230px;"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <q-page-sticky position="top-right" :offset="[18, 18]">
        <q-btn size="lg" color="indigo" icon="fab fa-facebook" />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
// import servidor from '@/server_conf.js'
import Header from "@/components/MainMenu";

import firebase from "firebase";

export default {
  name: "Register",
  components: {
    Header
  },
  data() {
    return {
      tab: "register",
      form: {
        email: "",
        password: ""
      },
      form_login: {
        email: "",
        password: ""
      },
      error: null,
      showModal: false
    };
  },
  mounted: function() {
    // this.$gtag.screenview({
    //   app_name: "ApoyaLocal",
    //   screen_name: "Register page"
    // });
  },
  methods: {
    submit_register() {
      var self = this;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(function() {
          self.start_session(self);
        })
        .catch(err => {
          self.$q.notify({
            color:"red",
            message: err.message,
            icon: 'announcement',
            position: 'bottom-left'
            });
        });
    },
    show() {
      if (this.$session.exists()) {
        this.$router.push("/user");
      } else {
        this.$modal.show("hello-world");
      }
    },
    submit_login() {
      
      this.error = null;
      var self = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.form_login.email,
          this.form_login.password
        )
        .then(function() {
          self.start_session(self);
        })
        .catch(err => {
          self.$q.notify({
            color:"red",
            message: err.message,
            icon: 'announcement',
            position: 'bottom-left'
            });
        });
    },
    facebook_register() {
      var self = this;
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function() {
          self.start_session(self);
        })
        .catch(function(error) {
          self.$q.notify({
            color:"red",
            message: error,
            icon: 'announcement',
            position: 'bottom-left'
            });
        });
    },
    google_register() {
      var self = this;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          console.log(result);
          self.start_session(self);
        })
        .catch(function(error) {
          self.$q.notify({
            color:"red",
            message: error,
            icon: 'announcement',
            position: 'bottom-left'
            });
        });
    },
    start_session(self) {
      console.log("entro");
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.$q.notify({
            color:"light-green-14",
            message: "Inicio correcto, bienvenido",
            icon: 'tag_faces',
            position: 'bottom-left'
            });
          self.$session.start();
          self.$session.set("jwt", user.uid);
          //Vue.http.headers.common["Authorization"] = "Bearer " + user.uid;
          self.$router.push("/user");
        }
      });
    },
    resetPassword() {
      var self = this;
      this.$q.dialog({
        title: 'Restablecer contraseña',
        message: 'Ingresa tu correo electrónico',
        prompt: {
          model: '',
          isValid: val => val.length > 2, // << here is the magic
          type: 'email' // optional
        },
        cancel: true
      }).onOk(data => {
        firebase.auth().sendPasswordResetEmail(data).then(function() {
          self.$q.notify({
            color:"light-green-14",
            message: "Se ha enviado un correo electrónico, revisa tu bandeja de entrada",
            icon: 'email',
            position: 'bottom-left'
            });
        });
      });

      
    }
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

