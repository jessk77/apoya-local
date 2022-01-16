<template>
  <div>
    <div class="text-h6 q-mb-md">Descarga tu código QR</div>
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
export default {
  name: "CodigoQr",
  props: ["data"],
  data() {
    return {
      file_url: "images/pic_box_2.jpg",
      file: null
    };
  },
  mounted: function() {
  },
  methods: {
    submit: async function() {
      
    },
    
  }
};
</script>

<style >

</style>