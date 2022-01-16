<template>
  <div class="form-client">
    <form action="#" @submit.prevent="submit" class="q-gutter-md">
      <q-input
        filled
        v-model="form.content"
        label="Escribe tu publicación"
        required
        autogrow
        :rules="[ val => val && val.length > 3 || 'Ingrese un valor válido']"
      />
      <q-select filled dense v-model="form.type" :options="options" label="Tipo" />

      <q-input
        v-if="form.type!=='Novedad'"
        filled
        dense
        v-model="form.fecha_inicio"
        type="date"
        label="Fecha de Inicio"
      />
      <q-input
        v-if="form.type!=='Novedad'"
        filled
        dense
        v-model="form.fecha_fin"
        type="date"
        label="Fecha de Fin"
      />
      <div id="preview">
        <img v-if="file_url" :src="file_url" />
      </div>

      <div class="text-center">
        <q-btn
          v-if="file_url!=''"
          outline
          icon="close"
          color="green-14"
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
        <q-btn color="green-14" icon="done" class="full-width" type="submit" label="publicar" />
      </div>
    </form>
  </div>
</template>

<style>
.form-client {
  width: 400px;
}
</style>

<script>
import firebase from "firebase";

export default {
  name: "FormPost",
  props: ["uid","user"],
  data() {
    return {
      id: 0,
      options: ["Oferta", "Cupón", "Novedad"],
      file_url: "",
      file: null,
      form: {
        content: "",
        type: "Novedad",
        image: "",
        fecha_inicio: new Date().toISOString().slice(0, 10),
        fecha_fin: new Date().toISOString().slice(0, 10)
      }
    };
  },
  methods: {
    submit: async function() {
      let self=this
      if (this.file_url != "") {
        this.form.image = await this.uploadFile();
      }
      var data = {
        uid: this.uid,
        user: this.user,
        content: this.form.content,
        type: this.form.type,
        image: this.form.image,
        start_date : this.form.fecha_inicio,
        end_date : this.form.fecha_fin,
        creation_date: -1 * new Date().getTime()
      };


      var databaseRef=firebase
        .database()
        .ref("posts/")

        databaseRef.push()
        .set(data)
        .then(function() {
           self.$emit('submited',1)
          //console.log("Insertado");
        })
        .catch(function(error) {
          console.error("Error adding: ", error);
        });
    },
    uploadFile: async function() {
      let self = this;
      return new Promise(function(resolve, reject) {
        var storageRef = firebase.storage().ref();
        var file = self.file;
        var uploadTask = storageRef
          .child("postImages/" + file.name + new Date().toISOString())
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
      console.log(file);
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
    }
  }
};
</script>
