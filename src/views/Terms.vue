<template>
  <q-layout>
    <Header />

    <q-page-container>
      <div class="q-mr-lg q-ml-lg">
        
        <br />
        <p class="text-h5 text-center q-mt-lg text-grey-7">Aviso de Privacidad</p>
        <br />
        <br />

        <p>DECLARACIÓN DE PRIVACIDAD ATOMIKOD está comprometida con el respeto y la protección de su privacidad y manejo de datos personales. ATOMIKOD incluye esta Declaración de Privacidad para que conozca nuestra política y prácticas relacionadas con la privacidad y el manejo de datos de carácter personal y/o confidencial, así como de las opciones que tiene sobre la forma en que sus datos personales se recogen vía electrónica y se utilizan. Para su disposición inmediata, hemos colocado este aviso en nuestra página principal y en la parte inferior de cada sección de nuestro sitio web. En caso de que usted contacte a ATOMIKOD mediante formularios o el área de «Contacto», los datos recabados serán utilizados con toda privacidad sin transferir o divulgar a terceros ajenos a ATOMIKOD algún tipo de información. ATOMIKOD y su personal se compromete a no divulgar sus datos personales con fines ajenos a las estrategias de mercadotecnia, contacto y seguimiento de clientes.</p>

        <p>SITIOS INCLUIDOS EN ESTA DECLARACIÓN DE PRIVACIDAD Esta Declaración de Privacidad se aplica a todos los dominios y subdominios propiedad de ATOMIKOD en (https://atomikod.com/) además de los correos electrónicos @atomikod.com, las bases de datos de ATOMIKOD y su información serán utilizados únicamente con fines internos y empresariales referentes a ATOMIKOD.</p>

        <p>VÍNCULOS A SITIOS WEB DE TERCEROS El sitio web de ATOMIKOD puede proporcionar vínculos a sitios Web de terceros para su comodidad e información. En caso de utilizar dichos vínculos se abandonará el sitio Web de ATOMIKOD. Estos sitios Web operan al margen de ATOMIKOD; ATOMIKOD no controla en modo alguno estos sitios Web ni es responsable del contenido y aplicación de sus prácticas de privacidad, que pueden diferir de las de ATOMIKOD. ATOMIKOD no asume ninguna responsabilidad en relación con los sitios Web de terceros, con su contenido, software u otros productos o materiales que pueda encontrar allí, ni con las consecuencias del uso de los mismos, ni con el tratamiento de datos que, en su caso, se realice en estos sitios Web, ni con cualquier resultado/consecuencia que pueda derivarse de su utilización. La Declaración de Privacidad de ATOMIKOD no cubre los datos personales que el usuario decida proporcionar a terceros no relacionados con ATOMIKOD. Antes de enviar información personal a una empresa, ATOMIKOD le recomienda que consulte la política de privacidad de la misma. Algunas empresas podrán decidir compartir sus datos personales con ATOMIKOD; este proceso se realizará de conformidad con la política de privacidad de dichas empresas.</p>

        <p class="text-h5 text-center q-mt-lg text-grey-7">Terminos y condiciones</p>
        <br />
        <br />

        <p>El sitio WEB "Apoya local" es operado por ATOMIKOD y se encuentra a su disposición para fines informativos. Al acceder o utilizar este Sitio Web, usted acepta estos Términos y Condiciones de Uso y Privacidad.</p>

        <p>ATOMIKOD es dueño único y exclusivo de todos los derechos del Sitio Web, así mismo de todo el contenido incluido en el mismo, en todo lo que respecta audio, fotografías, ilustraciones, gráficos, visuales, videos, copias, textos, software, títulos, datos y materiales del mismo, el diseño y la organización del Sitio Web y la compilación de los contenidos, códigos, datos y los materiales en el Sitio Web, derechos de autor, derechos de marca son exclusivos de la empresa, Su uso del Sitio Web no le otorga propiedad de ninguno de los contenidos, códigos, datos o materiales a los que pueda acceder en o a través del Sitio Web.</p>

        <p>ATOMIKOD no se hace responsable en ningun momento de operaciones de compra venta, ya que la plataforma tiene como unica finalidad la propagación de la información de negocios y empresas.</p>
          <br />
          <br />
          <br />
          <br>
        <q-parallax style="height: 400px;">
          <template v-slot:media>
            <img src="images/main_slider_2.jpg" />
          </template>

          <template v-slot:content="scope">
            <div
              class="absolute column items-center"
              :style="{
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
            >
              <img src="/images/tipoApoya.png" style="width: 250px" />

              <div class="text-subtitle1 text-grey-3 text-center q-ma-lg">
                Este sitio ha sido creado para apoyar a los comercios locales de la ciudad de Puebla,
                <br />debido a la contingencia de COVID-19.
                <br />La finalidad es encontrar los negocios más cercanos para solicitar productos a domicilio,
                <br />lamentablemente muchos negocios mexicanos no cuentan con los recursos suficientes
                <br />como para cerrar durante el aislamiento.
              </div>
              <q-btn
                type="a"
                href="https://atomikod.com/contact.php"
                target="a_blank"
                label="contacto"
                size="16px"
                color="light-green-14"
                class="q-mt-lg q-mb-lg"
                style="width: 200px;"
              />
              <div style="height: 30px"></div>
              <q-space />
            </div>

            <!-- <div  class="main-shapes">
              <img v-if="$q.screen.gt.xs" src="/images/main_slider_shapes.png" class="q-ml-lg" />
            </div>-->
          </template>
        </q-parallax>
      </div>

      <q-page-sticky position="top-right" :offset="[0, 18]">
        <q-btn
          type="a"
          href="https://www.facebook.com/apoyalocalmx"
          target="a_blank"
          size="lg"
          color="indigo"
          :icon="fabFacebook"
        />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from "@/components/MainMenu";
import { fabFacebook } from "@quasar/extras/fontawesome-v5";

export default {
  name: "Terms",
  components: {
    Header
  },
  data() {
    return {
    };
  },
  
  created() {
    this.fabFacebook = fabFacebook;
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

