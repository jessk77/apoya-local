<template>
   <q-layout>
      <Header />
      <q-page-container class="bg-grey-3">
         <div class="text-center bg-white q-pb-md">
            <q-img
               style="height: 300px; width: 70%"
               :src="file_url"
               :ratio="16 / 9"
            />
            <p class="text-h4 q-mt-lg">{{ name | uppercase }}</p>
            <p class="q-mt-lg text-grey-7" style="fontSize:15px">
               {{ description }}
            </p>
         </div>

         <div class="row items-start">
            <div class="col-1 col-sm-12 col-md-1"></div>
            <div class="col-3 col-sm-12 col-xs-12 col-md-3 q-pa-sm">
               <q-card class="my-card">
                  <q-card-section>
                     <div class="text-h6">Detalles</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                     <div class="text-h6 q-ma-sm">
                        <q-icon
                           class="text-light-green-14"
                           name="phone_iphone"
                        />
                        {{ cellphone }}
                     </div>
                     <div
                        v-if="phone !== '-' && phone !== ''"
                        class="text-h6 q-ma-sm"
                     >
                        <q-icon class="text-light-green-14" name="phone" />
                        {{ phone }}
                     </div>
                     <div
                        v-if="conditions !== '-' && conditions !== ''"
                        class="text-h6 q-ma-sm"
                     >
                        <q-icon class="text-light-green-14" name="local_taxi" />
                        <span style="fontSize:13px; width: 50%">{{
                           conditions
                        }}</span>
                     </div>
                  </q-card-section>
                  <q-separator />

                  <q-card-actions vertical>
                     <q-btn
                        type="a"
                        :href="`tel:+${cellphone}`"
                        label="LLAMAR"
                        color="green-14"
                        icon="phone"
                     />
                     <q-btn
                        v-if="whatsapp === '1'"
                        type="a"
                        target="_blank"
                        :href="
                           `https://api.whatsapp.com/send?phone=521${cellphone}&text=Hola!%20Te%20encontre%20en%20apoya%20local%20y%20quiero%20informacion%20por%20favor`
                        "
                        label="enviar whatsapp"
                        color="light-green-14"
                        icon="fab fa-whatsapp"
                     />

                     <hr />

                     <q-btn color="indigo">
                        <ShareNetwork
                           network="facebook"
                           :url="'https://apoyalocal.mx/local/' + username"
                           :title="
                              'Mira todo lo que ' +
                                 name +
                                 ' tiene en apoya local!'
                           "
                           :quote="name + ' en apoya local MX'"
                           hashtags="apoyalocal,consumelocal"
                        >
                           <i class="fab fah fa-lg fa-facebook"></i>
                           <span class="q-ml-sm">compartir en facebook</span>
                        </ShareNetwork>
                     </q-btn>
                     <q-btn color="light-blue ">
                        <ShareNetwork
                           network="twitter"
                           :url="'https://apoyalocal.mx/local/' + username"
                           :title="
                              'Mira todo lo que ' +
                                 name +
                                 ' tiene en apoya local!'
                           "
                           :quote="name + ' en apoya local MX'"
                           hashtags="apoyalocal,consumelocal"
                        >
                           <i class="fab fah fa-lg fa-twitter"></i>
                           <span class="q-ml-sm">compartir en twitter</span>
                        </ShareNetwork>
                     </q-btn>
                     <q-btn color="green-13">
                        <ShareNetwork
                           network="whatsapp"
                           :url="'https://apoyalocal.mx/local/' + username"
                           :title="
                              'Mira todo lo que ' +
                                 name +
                                 ' tiene en apoya local!'
                           "
                           :quote="name + ' en apoya local MX'"
                        >
                           <i class="fab fah fa-lg fa-whatsapp"></i>
                           <span class="q-ml-sm">compartir en whatsapp</span>
                        </ShareNetwork>
                     </q-btn>
                  </q-card-actions>
               </q-card>
            </div>
            <div class="col-7 col-sm-12 col-xs-12 col-md-7 q-pa-sm">
               <q-card class="my-card">
                  <q-tabs
                     v-model="tab"
                     class="text-grey"
                     active-color="green-14"
                     indicator-color="green-14"
                     align="justify"
                     narrow-indicator
                  >
                     <q-tab name="productos" label="Productos" />
                     <q-tab name="ubicacion" label="Ubicación" />
                     <!-- <q-tab name="posts" label="Publicaciones" /> -->
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels v-model="tab" animated>
                     <q-tab-panel name="ubicacion">
                        <div class="text-h6">Ubicación</div>
                        <br />
                        <GmapMap
                           :center="{
                              lat: currentLocation.lat,
                              lng: currentLocation.lng,
                           }"
                           :zoom="14"
                           :options="{ streetViewControl: false }"
                           style="width: 100%; height: 450px"
                        >
                           <GmapMarker
                              :position="{
                                 lat: currentLocation.lat,
                                 lng: currentLocation.lng,
                              }"
                              :clickable="false"
                              :draggable="false"
                           />
                        </GmapMap>
                     </q-tab-panel>

                     <q-tab-panel name="productos">
                        <div class="text-h6">Productos</div>
                        <br />
                        <div class="row q-col-gutter-md">
                           <div
                              v-for="(item, index) in products"
                              :key="index"
                              class="col-lg-4 col-md-4 col-sm-6 col-xs-6 text-center"
                           >
                              <q-card flat bordered>
                                 <q-img
                                    :src="item.image | render"
                                    style="height: 230px;"
                                 >
                                    <div class="absolute-bottom text-h6">
                                       {{ item.name }}
                                       <br />
                                       {{ item.price }}
                                    </div>
                                 </q-img>
                              </q-card>
                           </div>
                        </div>
                     </q-tab-panel>
                  </q-tab-panels>
               </q-card>
            </div>
         </div>

         <q-dialog v-model="dialog">
            <q-card>
               <q-card-section class="row items-center q-pb-none">
                  <div class="text-h6">Crear publicación</div>
                  <q-space />
                  <q-btn
                     icon="close"
                     flat
                     round
                     dense
                     @click="dialog = false"
                  />
               </q-card-section>
               <br />

               <q-card-section class="q-pt-none">
                  <FormPost
                     :uid="sessUid"
                     :user="name"
                     @submited="onPostSubmit"
                  />
               </q-card-section>
            </q-card>
         </q-dialog>
      </q-page-container>
   </q-layout>
</template>

<script>
import Header from "@/components/MainMenu";
import FormPost from "@/components/FormPost";

import firebase from "firebase";

export default {
   name: "Item",
   components: {
      Header,
      FormPost,
   },
   data() {
      return {
         dialog: false,
         tab: "productos",
         file_url: "",
         uid: "",
         name: "",
         username: "",
         description: "",
         cellphone: "",
         phone: "-",
         whatsapp: "0",
         conditions: "-",
         products: [],
         posts: [],
         currentLocation: { lat: 19.043522331313046, lng: -98.19798590761836 },
         sessUid: "",
      };
   },
   mounted: async function() {
      if (this.$session.exists()) {
         this.sessUid = this.$session.get("jwt");
         //console.log(this.sessUid)
      }

      const self = this;

      let snapshot = await firebase
         .firestore()
         .collection("users")
         .where("username", "==", this.$route.params.uid)
         .get();
      const localUser = snapshot.docs.map((doc) => doc.data())[0];

      if(!localUser) return;

      self.name = localUser.name;
      self.username = localUser.username;
      self.description = localUser.description;
      self.cellphone = localUser.cellphone;
      self.whatsapp = localUser.whatsapp;
      self.phone = localUser.phone;
      self.conditions = localUser.conditions;
      self.currentLocation = {
         lat: parseFloat(localUser.lat),
         lng: parseFloat(localUser.lng),
      };
      if (localUser.image != "" && localUser.image != null) {
         self.file_url = localUser.image;
      } else {
         self.file_url = "/images/pic_box_2.jpg";
      }
      self.uid = localUser.uid;
      document.title = localUser.name + " | Apoya local";

      snapshot = await firebase
         .firestore()
         .collection("products")
         .where("uid", "==", localUser.uid)
         .get();

      self.products = snapshot.docs.map((doc) => doc.data());

      
   },
   methods: {
      onPostSubmit(response) {
         console.log(response);
         this.dialog = false;
         this.$q.notify({
            color: "light-green-14",
            message: "Post creado",
            icon: "check",
            position: "bottom",
         });
         //this.loadPosts()
      },
      loadPosts: function() {
         let self = this;
         //console.log(this.uid)
         firebase
            .database()
            .ref("posts")
            .orderByChild("uid")
            .equalTo(self.uid)
            .limitToLast(50)
            .on("value", function(snapshot) {
               //on refresca en tiempo real, once solo una vez
               var posts = [];
               var i = 0;
               snapshot.forEach(function(child) {
                  var object = child.val();
                  object.id = Object.keys(snapshot.val())[i];
                  posts.push(object);
                  i++;
               });
               self.posts = posts.reverse();
            });
      },
   },

   filters: {
      uppercase: function(v) {
         return v.toUpperCase();
      },
      render: function(value) {
         if (value != "") {
            return value;
         } else {
            return "https://firebasestorage.googleapis.com/v0/b/apoya-local.appspot.com/o/romb.jpg?alt=media&token=5098fe05-409e-42c2-89d6-9fb2b324a001";
         }
      },
   },
};
</script>
