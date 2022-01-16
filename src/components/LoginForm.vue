<template>
  
      <q-card style="width: 400px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Inicio de Sesión</div>
        </q-card-section>
        <q-card-section class="text-center">
           <form action="#" @submit.prevent="submit_login">
             
                <q-input
                  filled
                  v-model="form_login.email"
                  type="email"
                  dense
                  required
                  label="Correo Electrónico"
                  class="q-mb-lg"
                />
             
             
                <q-input
                  filled
                  v-model="form_login.password"
                  type="password"
                  dense
                  required
                  label="Contraseña"
                  class="q-mb-lg"
                />
             
              <div class="text-caption text-grey-7">
                <q-btn size="sm" flat v-on:click="resetPassword">¿Olvidaste tu contraseña?.</q-btn>
              </div>

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
              class="q-mt-md"
              style="width: 230px;"
            />
            <br>
            <q-btn
              v-on:click="google_register"
              icon="fab fa-google"
              type="submit"
              label="Inicia con Google"
              color="red"
              class="q-mt-md"
              style="width: 230px;"
            />
        </q-card-section>

        <q-card-section class="q-pt-md">
          ¿No tienes una cuenta? <router-link to="/register">Registrate</router-link>
        </q-card-section>


        <q-card-actions align="right" class="bg-white text-green-14">
          <q-btn flat label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
   
</template>

<style>
</style>

<script>

import firebase from "firebase";

export default {
  name: 'LoginForm',
   data() {
    return {
      tab: "register",
      form_login: {
        email: "",
        password: ""
      },
    };
  },
  methods: {
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
            color: "red",
            message: err.message,
            icon: "announcement",
            position: "bottom-left"
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
            color: "red",
            message: error,
            icon: "announcement",
            position: "bottom-left"
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
            color: "red",
            message: error,
            icon: "announcement",
            position: "bottom-left"
          });
        });
    },
    start_session(self) {
      console.log("entro");
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.$q.notify({
            color: "light-green-14",
            message: "Inicio correcto, bienvenido",
            icon: "tag_faces",
            position: "bottom-left"
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
      this.$q
        .dialog({
          title: "Restablecer contraseña",
          message: "Ingresa tu correo electrónico",
          prompt: {
            model: "",
            isValid: val => val.length > 2, // << here is the magic
            type: "email" // optional
          },
          cancel: true
        })
        .onOk(data => {
          firebase
            .auth()
            .sendPasswordResetEmail(data)
            .then(function() {
              self.$q.notify({
                color: "light-green-14",
                message:
                  "Se ha enviado un correo electrónico, revisa tu bandeja de entrada",
                icon: "email",
                position: "bottom-left"
              });
            });
        });
    }
  
  }
}
</script>
