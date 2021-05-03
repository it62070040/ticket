
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
      <div class="form-group col-md-12 p-0">
        <label class="label">ชื่อการแสดง</label>
        <div class="control">
          <input v-model="$v.titleCon.$model" class="form-control" :class="{ 'form-control is-invalid': $v.titleCon.$error }" type="text" placeholder="กรุณาใส่ชื่อการแสดงของคุณ" />
            <!-- show error -->
            <template v-if="$v.titleCon.$error">
              <div class="error text-danger" v-if="!$v.titleCon.required">
                กรุณากรอกข้อมูล
              </div>
              <div class="error text-danger" v-if="!$v.titleCon.minLength">
                ควรมีตัวอักษรอย่างน้อย 10 ตัว
              </div>
              <div class="error text-danger" v-if="!$v.titleCon.maxLength">
                ควรมีตัวอักษรไม่เกิน 50 ตัว
              </div>
            </template>
        </div>
        
      </div>

      <div class="form-group ">
        <label class="label">รายละเอียด</label>
        <div class="control">
          <!-- <textarea v-model="desConcert" id="editor"></textarea> -->
           <textarea v-model="$v.desConcert.$model" :class="{ 'form-control is-invalid': $v.desConcert.$error }" class="form-control" placeholder="รายละเอียดของการแสดง"></textarea>
        
            <template v-if="$v.desConcert.$error">
              <div class="error text-danger" v-if="!$v.desConcert.required">
                กรุณากรอกข้อมูล
              </div>
             <div class="error text-danger" v-if="!$v.desConcert.minLength">
                ควรมีตัวอักษรอย่างน้อย 50 ตัว
              </div>
            </template>
        </div>
            
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label class="label">วันเปิดจำหน่าย</label>
          <input v-model="$v.buyAvailable.$model" :class="{ 'form-control is-invalid': $v.buyAvailable.$error }" class="form-control" type="datetime-local" style="cursor: pointer;" />
          <!-- show error -->
          <template v-if="$v.buyAvailable.$error" >
            <div class="error text-danger" v-if="!$v.buyAvailable.required">กรุณากรอกวันที่</div>
            <div class="error text-danger" v-if="!$v.buyAvailable.buy_avail">กรุณาใส่วันที่ที่แสดง</div>
          </template>
        
        </div>
        

        <div class="form-group col-md-6">
          <label class="label">วันที่แสดง</label>
          <input v-model="$v.showtimeCon.$model" :class="{ 'form-control is-invalid': $v.showtimeCon.$error }" class="form-control" type="datetime-local" style="cursor: pointer;"/>
          
          <!-- show error -->
          <template v-if="$v.showtimeCon.$error">
            <div class="error text-danger" v-if="!$v.showtimeCon.required">กรุณากรอกวันที่</div>
            <p class="error text-danger" v-if="!$v.showtimeCon.con_showtime">กรุณาใส่วันที่ให้ถูกต้อง</p>
          </template>      
        </div>
        
      </div>

      <div class="form-group col-md-12 p-0 ">
        <label class="label">จำนวนที่นั่งทั้งหมด</label>
        <div class="control">
          <input v-model="$v.amountseat.$model" class="form-control" :class="{ 'form-control is-invalid': $v.amountseat.$error }" type="text" placeholder="กรุณาจำนวนที่นั่งทั้งหมดในงาน" />
          <!-- show error -->
           <template v-if="$v.amountseat.$error">
            <div class="error text-danger" v-if="!$v.amountseat.required">กรุณากรอกข้อมูล</div>
            <div class="error text-danger" v-else-if="!$v.amountseat.seat">กรุณาใส่ตัวเลข</div>
            <div class="error text-danger" v-else-if="!$v.amountseat.min_seat">จำนวนที่นั่งควรอยู่ระหว่าง 100-9999 ที่</div>
          </template>      
        </div>
      </div>

      <div class="form-group was-validated">
        <label >สถานที่จัด</label>
        <select id="location" class="form-control" style="cursor: pointer;" required >
          <option selected></option>
          <option value="1">โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท</option>
          <option value="2">ยูเนี่ยน ฮอลล์, ศูนย์การค้ายูเนี่ยน มอลล์</option>
          <option value="3">ศูนย์วัฒนธรรมแห่งประเทศไทย หอประชุมใหญ่</option>
        </select>
        <div class="invalid-feedback">กรุณาเลือกสถานที่</div>
      </div>

      <!-- insert picture -->
      <div class="form-group pb-5 was-validated" >
        <label for="inputState">รูปโปสเตอร์การแสดง</label>
        <div class="custom-file position-relative">
          <input class="custom-file-input" type="file" accept="image/png, image/jpeg, image/webp" @change="selectImages" style="cursor: pointer;" required/>  
          <label class="custom-file-label" for="customFile">กรุณาเลือกรูปภาพของคุณ</label>
          <!-- show error -->
          <div class="invalid-feedback">กรุณาอัพโหลดรูปภาพ</div>
          <div v-if="images" class="row mx-auto pt-3">
            <div v-for="(image, index) in images" :key="image.id" class="col-3">
              <div class="card" style="position:relative; border-style: hidden;">
                <div id="card-img-top" style="height: 150px; width: auto; background-position: center;">
                    <img :src="showSelectImage(image)" alt="Placeholder image" />
                </div>
                <footer class="card-footer">
                  <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger" style="cursor: pointer;">Delete</a>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
            <button type="submit" style="width: 300px" class="btn btn-warning btn-lg mr-4" @click="submitCon">Submit</button>
            <button type="submit" style="width: 300px" class="btn btn-dark btn-lg" @click="$router.go(-1)">Cancel</button>
      </div>
    </section>
  </div> 
</template>

<script>
import axios from "axios";
import {
  required,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

function seat (value){
  if (!value.match(/[0-9]/)) {
      return false;
    }
  return true
}
function min_seat (value){
  if (Number(value) < 100 || Number(value) > 9999) {
      return false;
    }
  return true
}

function con_showtime (value){
  if(this.buyAvailable == null && this.showtimeCon != null ){
     return false;
    
  }
  if(this.buyAvailable != null){
    if (value <= this.buyAvailable) {
      return false;
    }
  }
  return true;
}
function buy_avail (){
  if(this.buyAvailable != null && this.showtimeCon == null ){
     return false;
  }
  //   if (value >= this.end_dateBlog) {
  //     return false;
  // }
  return true;
}


export default {
  data() {
    return {
      concert: {},
      error: null,
      images: [], // array of image
      titleCon: "",
      desConcert: "",
      locationCon: "",
      amountseat: "",
      buyAvailable: null,
      showtimeCon: null,
      statusCon: "coming soon",
    };
  },
  validations: {
    titleCon:{
      required: required,
      maxLength: maxLength(50),
      minLength: minLength(10),
    },
    desConcert: {
      required: required,
      minLength: minLength(50)
    },
    showtimeCon: {
      required: required,
      con_showtime:  con_showtime
    },
    buyAvailable: {
      required: required,
      buy_avail: buy_avail
    },
    amountseat:{
      required: required,
      seat: seat,
      min_seat:  min_seat
    },

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
      this.locationCon = document.getElementById("location").value;
      console.log(this.locationCon)
      this.$v.$touch();
      if(!this.$v.$invalid){
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
      }
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