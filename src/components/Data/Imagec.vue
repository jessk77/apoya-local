<template>
  <div>
    <div class="text-h6 q-mb-md">Imagen principal</div>
    <div class="row q-gutter-row">
      <div class="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="text-subtitle1 text-center q-mb-lg">Sube una imagen .png o .jpg no mayor a 3MB.</div>
        <div class="row justify-center items-center">
          <q-input
            filled
            ref="file"
            type="file"
            dense
            style="width: 350px;"
            class="q-mb-sm"
            @change="onFileChange"
          />
        </div>
      </div>
      <div class="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div id="preview">
          <img v-if="file_url" :src="file_url" />
        </div>
      </div>
    </div>
    <div class="text-center">
      <q-btn
        v-if="file!=null"
        @click="submit"
        label="GUARDAR"
        color="light-green-14"
        class="q-mb-lg"
        style="width: 200px;"
      />
    </div>
  </div>
</template>
<script>
import servidor from "@/server_conf.js";
import firebase from "firebase";
export default {
  name: "Imagec",
  props: ["data"],
  data() {
    return {
      file_url: "images/pic_box_2.jpg",
      file: null
    };
  },
  mounted: function() {
    if (this.data != null) {
      if (this.data.image != "") {
        this.file_url = this.data.image;
      }
    }
  },
  methods: {
    submit: async function() {
      let self = this;
      this.$q.loading.show({
        message: "<b>Guardando,</b> espere un momento...<br/>"
      });

      let url = await this.uploadFile()

      let formData = new FormData();
      formData.append("uid", this.$session.get("jwt"));
      formData.append("image", url);

      

      this.axios
        .post(servidor + "index.php/Inicio/save_data2", formData)
        .then(function(response) {
          self.$q.loading.hide();
          self.$q.notify({
            color: "light-green-14",
            message: "Datos guardados",
            icon: "tag_faces",
            position: "bottom"
          });
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    uploadFile: async function() {
      let self = this;
      return new Promise(function(resolve, reject) {
        var storageRef = firebase.storage().ref();
        var file = self.file;
        var uploadTask = storageRef
          .child("portadas/" + self.$session.get("jwt"))
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
    }
  }
};
</script>

<style >
#preview {
  display: flex;
  justify-content: center;
  align-items: left;
}

#preview img {
  max-width: 100%;
  max-height: 250px;
}
</style>