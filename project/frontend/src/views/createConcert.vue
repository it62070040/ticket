
<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          <!-- <%= error.code + ': ' + error.sqlMessage %> -->
          <!---->
          {{ error }}
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <center><h1 class="title pt-3">Create Your Concert</h1></center>
      </div>
    </section>
    <section class="px-6 mt-2">
      <div class="field mt-5">
        <label class="label">ชื่อการแสดง</label>
        <div class="control">
          <input v-model="titleCon" class="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div class="field mt-2">
        <label class="label">รายละเอียด</label>
        <div class="control">
          <!-- <textarea v-model="desConcert" id="editor"></textarea> -->
           <textarea v-model="desConcert" class="textarea" placeholder="Textarea"></textarea>
           
        </div>
      </div>

      <div class="field mt-2">
        <label class="label">วันที่แสดง</label>
        <div class="control">
          <input v-model="showtimeCon" class="input" type="datetime-local" placeholder="Text input" />
        </div>
      </div>

       <!-- insert picture -->
      <input class=" mt-5" multiple type="file" accept="image/png, image/jpeg, image/webp" @change="selectImages"/>
      <div v-if="images" class="row mx-auto">
        <div v-for="(image, index) in images" :key="image.id" class="col-3">
          <div class="card" style="position:relative; border-style: hidden;">
            <div id="card-img-top" style="height: 150px; width: auto; background-position: center;">
                <img :src="showSelectImage(image)" alt="Placeholder image" />
            </div>
            <footer class="card-footer">
              <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger">Delete</a>
            </footer>
          </div>
        </div>
      </div>

      <div class="field mt-2">
        <label class="label">สถานที่จัด</label>
        <div class="control">
          <input v-model="locationCon" class="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <!-- ราคา บัตร -->
      <!-- <div class="field mt-2">
        <label class="label">ราคา</label>
        <div class="control">
           <input v-model="priceCon" class="input" type="number" placeholder="Text input" />
        </div>
      </div> -->

      <div class="field mt-2">
        <label class="label">จำนวนที่นั่ง</label>
        <div class="control">
          <input v-model="amountseat" class="input" type="number" placeholder="Text input" />
        </div>
      </div>

      <div class="field mt-2">
        <label class="label">วันเปิดจำหน่าย</label>
        <div class="control">
          <input v-model="buyAvailable" class="input" type="datetime-local" placeholder="Text input" />
        </div>
      </div>

      <!-- สถานะคอนเสิร์ต -->
      <!-- <div class="control mt-3">
        <label class="label">สถานะคอนเสิร์ต</label>
        <div class="control">
          <label class="radio">
          <input v-model="statusCon" type="radio" name="answer" value="01" />
          Coming Soon
        </label>
        <label class="radio">
          <input v-model="statusCon" type="radio" name="answer" value="02" />
          On
        </label>
        </div>
      </div> -->

      <!-- <div class="field">
        <div class="control">
          <label class="checkbox">
            <input v-model="pinnedBlog" type="checkbox" />
            Pinned
          </label>
        </div>
      </div> -->

      <div class="field is-grouped">
        <div class="control">
          <button @click="submitCon" class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button @click="$router.go(-1)" class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      concert: {},
      error: null,
      images: [], // array of image
      titleCon: "",
      desConcert: "",
      locationCon: "",
      showtimeCon: "",
      // priceCon: 0,
      amountseat: 0,
      buyAvailable: "",
      statusCon: "coming soon",
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submitCon() {
      let formData = new FormData();
      formData.append("concert_title", this.titleCon);
      formData.append("concert_desc", this.desConcert);
      formData.append("concert_address", this.locationCon);
      formData.append("concert_showtime", this.showtimeCon);
      // formData.append("concert_address", this.priceCon);
      formData.append("concert_amountseat", this.amountseat);
      formData.append("buy_available", this.buyAvailable);
      // formData.append("pinned", this.pinnedBlog ? 1 : 0);
      formData.append("concert_status", "coming soon");
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });

      // Note ***************
      // ตอนเรายิง Postmant จะใช้ fromData
      // ตอนยิงหลาย ๆ รูปพร้อมกันใน Postman จะเป็นแบบนี้

      // title   | "This is a title of blog"
      // comment | "comment in blog"
      // ...
      // myImage | [select file 1]
      // myImage | [select file 2]
      // myImage | [select file 3]

      // จะสังเกตุว่าใช้ myImage เป็น key เดียวกัน เลยต้องเอามา loop forEach
      // พอไปฝั่ง backend มันจะจัด file ให้เป็น Array เพื่อเอาไปใช้งานต่อได้

    axios
        .post("http://localhost:3000/concerts", formData)
        .then(() => this.$router.push({name: 'home'}))
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
#card-img-top img{
  max-width: 100%;
  max-height: 100%;
  margin: auto auto auto auto;
  display: block;
}
</style>