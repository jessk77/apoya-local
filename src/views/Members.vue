<template>
  <q-layout>
    <Header />
    <q-page-container>
      <div class="text-center q-mt-lg text-grey-9">
        <h5 class="text-h5 q-ma-none">Encuentra todos los comercios afiliados</h5>
      </div>
     
      <div class="q-pa-md row items-start">
        <div class="col-2 col-sm-12 col-xs-12 col-md-2"></div>
        <div class="col-8 col-sm-12 col-xs-12 col-md-8">
          <br />
          <q-list padding>
            <q-separator spaced />
            <div v-for="item in negocios " v-bind:key="item.uid" >
              <q-item class="q-mt-md q-mb-md">
                <q-item-section top thumbnail class="q-ml-none">
                  <q-img
                    v-on:click="redirect(item.username)"
                    style="width:60px"
                    v-if="item.image!=='' && item.image!=null"
                    :src="item.image"
                  ></q-img>
                </q-item-section>

                <q-item-section v-on:click="redirect(item.username)">
                  <q-item-label class="text-h6">{{item.name | uppercase}}</q-item-label>
                  <q-item-label caption>{{item.description | cutcad}}.</q-item-label>
                </q-item-section>

                <q-item-section bottom side>
                  <div class="q-gutter-xs">
                    <q-btn
                      v-if="item.whatsapp==='1'"
                      type="a"
                      target="_blank"
                      :href="`https://api.whatsapp.com/send?phone=521${ item.cellphone }&text=Hola!%20Te%20encontre%20en%20apoya%20local%20y%20quiero%20informacion%20por%20favor`"
                      size="12px"
                      color="light-green-14"
                      flat
                      dense
                      round
                      icon="fab fa-whatsapp"
                    />
                    <q-btn
                      type="a"
                      :href="`tel:+${ item.cellphone }`"
                      size="12px"
                      color="green-14"
                      flat
                      dense
                      round
                      icon="phone"
                    />
                  </div>
                </q-item-section>
              </q-item>
              <q-separator spaced />
            </div>
          </q-list>
        </div>
      </div>
       <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="currentPage" :max="totalPages" :max-pages="6" :direction-links="true" :boundary-numbers="true" color="green-14" ></q-pagination>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/MainMenu.vue";
import servidor from "@/server_conf.js";

export default {
  name: "Item",
  components: {
    Header
  },
  data() {
    return {
      searchKey: "",
      currentPage: 1,
      itemsPerPage: 10,
      resultCount: 0,
      negociosAll: [],
      negocios: []
    };
  },
  mounted: function() {
    let self = this;
    this.axios
      .post(servidor + "index.php/Listado/get_all_negocios")
      .then(function(response) {
        self.negociosAll = response.data;
        self.negocios=self.paginate(response.data)
      });
  },
  computed: {
    totalPages: function() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    }
  },
  watch: {
        currentPage(){
              this.negocios=this.paginate(this.negociosAll)
        }
  },
  methods: {
    redirect: function(username) {
      this.$router.push("/local/" + username);
    },
    paginate: function(list) {
      this.resultCount = list.length;
      var page= this.currentPage-1
      var index = page * this.itemsPerPage;
      return list.slice(index, index + this.itemsPerPage);
    },
  },
  filters: {
    
    uppercase: function(v) {
      return v.toUpperCase();
    },
    cutcad: function(v) {
      return v.substring(0, 200);
    }
  }
};
</script>

<style>
.item-title {
  top: 0;
  bottom: 0;
  left: 0;
  width: 70px;
  height: 2px;
  background: #33eb39;
  content: "";
}
</style>