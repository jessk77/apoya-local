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
                        top: scope.percentScrolled * 60 + '%',
                        left: 0,
                        right: 0,
                     }"
                  >
                     <div class="text-h3 text-white text-left q-ml-lg">
                        Panel de usuario
                     </div>
                     <div class="text-h6 text-grey-3 text-left q-ml-lg">
                        Configura como se ve tu negocio
                     </div>
                     <q-btn
                        dense
                        :to="{ name: 'Item', params: { uid: username } }"
                        v-if="username != null"
                        label="ir a mi perfil"
                        size="15px"
                        color="light-green-14"
                        class="q-mt-sm q-ml-md"
                        style="width: 200px;"
                     />
                  </div>

                  <div class="main-shapes">
                     <img
                        v-if="$q.screen.gt.xs"
                        src="/images/main_slider_shapes.png"
                        class="q-ml-lg"
                     />
                  </div>
               </template>
            </q-parallax>

            <!-- v-if="!userDb" $session.get("jwt") -->

            <q-tabs
               dense
               v-model="tab"
               class="text-white"
               align="justify"
               narrow-indicator
            >
               <q-tab
                  class="bg-light-green-14 text-green-10"
                  name="general"
                  icon="edit"
                  label="GENERAL"
               />
               <q-tab
                  class="bg-light-green-14 text-green-10"
                  name="map"
                  icon="place"
                  label="MAPA"
               />
               <q-tab
                  class="bg-light-green-14 text-green-10"
                  name="image"
                  icon="image"
                  label="IMAGEN"
               />
               <q-tab
                  class="bg-light-green-14 text-green-10"
                  name="products"
                  icon="dns"
                  label="PRODUCTOS"
               />
               <!-- <q-tab class="bg-green-14" name="login" label="INICIO DE SESIÓN" /> -->
            </q-tabs>

            <q-separator />

            <q-tab-panels
               v-if="loaded"
               v-model="tab"
               animated
               class="text-center"
            >
               <q-tab-panel name="general">
                  <General :data="data" />
                  <!-- <CodigoQr :data="data" /> -->
               </q-tab-panel>
               <q-tab-panel name="map">
                  <Map :data="data" />
               </q-tab-panel>
               <q-tab-panel name="image">
                  <Imagec :data="data" />
               </q-tab-panel>
               <q-tab-panel name="products">
                  <Products :data="data" />
               </q-tab-panel>
            </q-tab-panels>
         </div>
      </q-page-container>
   </q-layout>
</template>

<script>
import Header from "@/components/MainMenu";
import General from "@/components/Data/General";
import Map from "@/components/Data/Map";
import Imagec from "@/components/Data/Imagec";
import Products from "@/components/Data/Products";
// import CodigoQr from "@/components/Data/CodigoQr";

import firebase from "firebase";

export default {
   name: "User",
   components: {
      Header,
      General,
      Map,
      Imagec,
      Products,
      // CodigoQr
   },
   data() {
      return {
         tab: "general",
         uid: "",
         username: "",
         data: null,
         loaded: false,
      };
   },

   beforeCreate: function() {
      if (!this.$session.exists()) {
         this.$router.push("/");
      } else {
         this.uid = this.$session.get("jwt");
      }
   },
   beforeMount: async function() {
      let self = this;
      try {
         let snapshot = await firebase
            .firestore()
            .collection("users")
            .where("uid", "==", this.$session.get("jwt"))
            .get();
         let userData = snapshot.docs.map((doc) => doc.data())[0];

         if (!userData) { //if user do not exist create it
            const initUser = {
               fecha_registro: new Date(),
            };

            snapshot = await firebase.firestore()
               .collection("users")
               .doc(this.$session.get("jwt"))
               .set(initUser);

            userData = {
               uid: this.$session.get("jwt"),
               ...initUser,
            };
         }

         self.data = userData;
         self.username = self.data.username;
         self.loaded = true;
      } catch (e) {
         console.log("Ocurrio un error", e);
      }
   },
};
</script>
