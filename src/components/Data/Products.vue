<template>
  <div>
    <div v-if="data==null" class="text-subtitle1">
      Para agregar productos primero debes guardar tu información general
    </div>
  <div v-if="data!=null">
    <div class="text-h6 q-mb-md">Productos</div>
    <div class="text-center q-ma-lg">
      <q-btn color="light-green-14" icon="add" label="agregar nuevo" @click="dialog=true" />
    </div>

    <div class="row q-col-gutter-md">
      <div
        v-for="(item,index) in products"
        :key="index"
        class="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center"
      >
        <q-card flat bordered>
          <q-img :src="item.image | render" style="height: 230px;">
            <div class="absolute-bottom text-h6">
              {{item.name}}
              <br />
              {{item.price}}
            </div>
          </q-img>

          <q-separator />

          <q-card-actions>
            <q-btn flat color="red" label="eliminar" icon="delete" @click="detele_product(index,item)"></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog">
      <q-card style="width: 400px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Agregar Producto</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-form @submit="submit" class="q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Nombre de producto"
              required
              dense
              :rules="[ val => val && val.length > 3 || 'Ingrese un valor válido']"
            />

            <q-input
              filled
              v-model="price"
              label="Precio"
              type="number"
              required
              dense
              :rules="[ val => val && val > 0 || 'Ingrese un valor válido']"
            />

            <div id="preview" class="text-center">
              <img style="max-height: 300px" v-if="file_url" :src="file_url" />
            </div>

            <div class="text-center">
              <q-btn
                v-if="file_url!=''"
                outline
                icon="close"
                color="indigo-14"
                size="sm"
                label="Eliminar imagen"
                @click="detachImage"
              />
            </div>

            <q-input
              filled
              dense
              v-model="file"
              type="file"
              @change="onFileChange"
              hint="Agregar imagen"
            />
            <div class="text-center q-mt-md">
              <q-btn color="green-14" icon="save" class="full-width" type="submit" label="guardar" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="cerrar" color="grey" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  </div>
</template>
<script>
import firebase from "firebase";
import servidor from "@/server_conf.js";
export default {
  name: "Products",
  props: ["data"],
  data() {
    return {
      dialog: false,
      name: "",
      price: 0,
      file_url: "",
      file: null,
      products: []
    };
  },
  mounted: function() {
    if (this.data != null) {
      this.products = this.data.products;
    }
  },
  methods: {
    submit: async function() {
      if (this.products.length <= 50) {
        
          let self = this;
          this.$q.loading.show({
            message: "<b>Guardando,</b> espere un momento...<br/>"
          });
          let url = ""
          if(this.file!=null){
            url = await this.uploadFile()
          }
          this.axios
            .post(
              servidor + "index.php/Inicio/save_product",
              JSON.stringify({
                name: this.name,
                price: this.price,
                image: url,
                uid: this.$session.get("jwt")
              })
            )
            .then(function(response) {
              self.dialog=false
              self.products.push({
                id: response,
                name: self.name,
                price: self.price,
                image: url
              });
              self.$q.loading.hide();
            });
        
      } else {
        this.$q.notify({
          color: "warning",
          message: "Limite de Productos: 50",
          icon: "warning",
          position: "top-right"
        });
      }
    },
    detele_product(index,item) {
      let self = this;
       this.$q.loading.show({
            message: "<b>Eliminando,</b> espere un momento...<br/>"
          });
      this.axios
        .post(servidor + "index.php/Inicio/delete_product/" + item.id)
        .then(function() {
          self.products.splice(index, 1);
          self.$q.loading.hide();
          if (item.image !== "") {
            var storageRef = firebase.storage().refFromURL(item.image);
            storageRef.delete();
          }
        });
    },
    uploadFile: async function() {
      let self = this;
      return new Promise(function(resolve, reject) {
        var storageRef = firebase.storage().ref();
        var file = self.file;
        var uploadTask = storageRef
          .child("products_" + self.$session.get("jwt") + "/" + self.name)
          .put(file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          function(error) {
            console.log(error);
            reject();
          },
          function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                resolve(downloadURL);
              });
          }
        );
      });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      //console.log(file);
      if (file.size > 2048 * 2048) {
        this.$q.notify({
          color: "warning",
          message: "La imagen es muy grande",
          icon: "warning",
          position: "center"
        });
        return;
      } else if (file.type != "image/jpeg" && file.type != "image/png") {
        this.$q.notify({
          color: "warning",
          message: "La imagen no tiene un formato valido",
          icon: "warning",
          position: "center"
        });
      } else {
        this.file = e.target.files[0];
        this.file_url = URL.createObjectURL(file);
      }
    },
    detachImage() {
      this.file = null;
      this.file_url = "";
      this.form.image = "";
    }
  },
  filters: {
    render: function(value) {
      if (value != "") {
        return value;
      } else {
        return "https://firebasestorage.googleapis.com/v0/b/apoya-local.appspot.com/o/romb.jpg?alt=media&token=5098fe05-409e-42c2-89d6-9fb2b324a001";
      }
    }
  }
};
</script>