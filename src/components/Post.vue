<template>
  <!-- Contact -->

  <div>
    <q-card class="my-card q-mt-lg" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <!-- <img src="/images/profile.jpg" /> -->
            <q-icon :name="iconType" class="text-light-green-14" style="font-size: 40px;">
              <q-tooltip content-class="bg-green-14" content-style="font-size: 16px">{{post.type}}</q-tooltip>
            </q-icon>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold">{{title}}</q-item-label>
        </q-item-section>

        <q-item-section side v-if="showDelete">
          <q-btn flat round color="grey-9" icon="more_vert">
            <q-menu auto-close>
              <q-list style="min-width: 100px">
                <q-item clickable @click="deletePost">
                  <q-item-section>Eliminar publicación</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>
      </q-item>
      <q-card-section style="margin-top: -10px">
        <span :class="{ 'text-h4' : post.image === ''}">{{post.content}}</span>
        <div class="q-mt-md" v-if="post.type!=='Novedad'">
          Valido
          <span v-if="post.start_date===post.end_date">hasta el</span>
          {{post.start_date}}
          <span
            v-if="post.start_date!==post.end_date"
          >Al {{post.end_date}}</span>
        </div>
      </q-card-section>
      <q-img :ratio="1" v-if="post.image!==''" :src="post.image" @click="showImage=true" />
      <q-card-actions style="margin-bottom: -20px" align="left">
        <!-- <q-btn flat round icon="favorite_outline" /> -->
        <!-- <q-btn flat round icon="chat_bubble_outline" @click="$refs.input.focus()" /> -->
      </q-card-actions>
      <!-- <q-card-section class="text-weight-bold">20 Me gusta</q-card-section> -->
      <!-- <q-card-section style="margin-top: -20px">
        <span>
          <span class="text-weight-bold">Winfield Stapforth</span> Este café si es de calidad
        </span>
        <br />
        <span>
          <span class="text-weight-bold">Razvan Stoenescu</span> 😀
        </span>
      </q-card-section> 
      <q-card-section class="q-mt-none">
        <q-input
          ref="input"
          style="margin-top: -15px"
          outlined
          square
          v-model="comentario"
          dense
          placeholder="Agregar un comentario"
          v-on:keyup.enter="agregarComentario"
        />
      </q-card-section>-->
    </q-card>
    <q-dialog v-model="showImage" full-width full-height>
      <q-card>
        <q-card-actions align="right">
          <q-btn flat label="CERRAR" color="green-14" v-close-popup />
        </q-card-actions>
        <q-card-section class="q-pa-none">
          <div class="text-center">
            <img style="height: 600px; width: auto" :src="post.image" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import firebase from "firebase";

export default {
  name: "Post",
  props: {
    title: String,
    post: Object,
  },
  data() {
    return {
      iconType: "person",
      showImage: false,
      showDelete: false,
      comentario: ""
    };
  },
  mounted: function() {
    switch (this.post.type) {
      case "Novedad":
        this.iconType = "new_releases";
        break;
      case "Oferta":
        this.iconType = "whatshot";
        break;
      case "Cupón":
        this.iconType = "loyalty";
        break;
    }
    if (this.$session.exists()) {
      if(this.$session.get("jwt")=== this.post.uid){
        this.showDelete=true;
      }
      
    }
  },
  methods: {
   agregarComentario(){
     console.log("entro")
     if (this.$session.exists()) {
      this.sessUid = this.$session.get("jwt");
      
    }
    else{
      this.$q.notify({
        color: "warning",
        message: "Inicia sesión para realizar comentarios",
        icon: "warning",
        position: "bottom"
      });
    } 
   },
   deletePost() {
     console.log(this.post)
     firebase.database().ref('posts/' + this.post.id).remove().then(function(){
       console.log("ok")
     });


   }
  }
};
</script>