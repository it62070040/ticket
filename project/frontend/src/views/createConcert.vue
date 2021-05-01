
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
    <section class="pb-5">
      <div class="text-center p-4">
        <h1 class="title pt-3">สร้างงานแสดงของคุณ</h1>
      </div>
      <div class="form-group col-md-12 p-0 pb-2">
        <label class="label">ชื่อการแสดง</label>
        <div class="control">
          <input v-model="titleCon" class="form-control" type="text" placeholder="กรุณาใส่ชื่อการแสดงของคุณ" />
        </div>
      </div>

      <div class="form-group pb-2">
        <label class="label">รายละเอียด</label>
        <div class="control">
          <!-- <textarea v-model="desConcert" id="editor"></textarea> -->
           <textarea v-model="desConcert" class="form-control" placeholder="รายละเอียดของการแสดง"></textarea>
           
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6 pb-2">
          <label class="label">วันที่แสดง</label>
          <input v-model="showtimeCon" class="form-control" type="datetime-local" style="cursor: pointer;"/>
        </div>
        <div class="form-group col-md-6 pb-2">
          <label class="label">วันเปิดจำหน่าย</label>
          <input v-model="buyAvailable" class="form-control" type="datetime-local" style="cursor: pointer;" />
        </div>
      </div>
      <div class="form-group pb-2">
        <label for="inputState">สถานที่จัด</label>
        <select id="inputState" class="form-control"  style="cursor: pointer;">
          <option selected>กรุณาเลือกสถานที่จัด</option>
          <option>...</option>
        </select>
      </div>

      <div class="form-group col-md-12 p-0 pb-2">
        <label class="label">จำนวนที่นั่งทั้งหมด</label>
        <div class="control">
          <input v-model="amountseat" class="form-control" type="number" placeholder="กรุณาจำนวนที่นั่งทั้งหมดในงาน" />
        </div>
      </div>

      <!-- insert picture -->
      <div class="form-group pb-5">
        <label for="inputState">รูปโปสเตอร์การแสดง</label>
        <div class="custom-file">
          <input class="custom-file-input" type="file" accept="image/png, image/jpeg, image/webp" @change="selectImages" style="cursor: pointer;"/>
          <label class="custom-file-label" for="customFile">กรุณาเลือกรูปภาพของคุณ</label>
          <div v-if="images" class="row mx-auto pt-3">
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
        </div>
      </div>


      <!-- ราคา บัตร -->
      <!-- <div class="field mt-2">
        <label class="label">ราคา</label>
        <div class="control">
           <input v-model="priceCon" class="input" type="number" placeholder="Text input" />
        </div>
      </div> -->



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

      <div class="text-center">
            <button type="submit" style="width: 300px" class="btn btn-warning btn-lg mr-4" @click="submitCon">Submit</button>
            <button type="submit" style="width: 300px" class="btn btn-dark btn-lg" @click="$router.go(-1)">Cancel</button>
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