<template>
    <div>
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
        <h1 class="title pt-3">แก้ไขงานแสดงของคุณ</h1>
      </div>
      <div class="form-group col-md-12 p-0">
        <label class="label">ชื่อการแสดง</label>
        <div class="control">
          <input v-model="$v.titleCon.$model" class="form-control" :class="{ 'form-control is-invalid': $v.titleCon.$error }" type="text" />
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
          <input  v-model="$v.buyAvailable.$model" :class="{ 'form-control is-invalid': $v.buyAvailable.$error }" class="form-control" type="datetime-local" style="cursor: pointer;" />
        {{ new Date(concert.concert.buy_available).toLocaleDateString("th", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}) }} น.
          <!-- show error -->
          <template v-if="$v.buyAvailable.$error" >
            <div class="error text-danger" v-if="!$v.buyAvailable.required">กรุณากรอกวันที่</div>
            <div class="error text-danger" v-if="!$v.buyAvailable.buy_avail">กรุณาใส่วันที่ที่แสดง</div>
          </template>
        
        </div>
        

        <div class="form-group col-md-6">
          <label class="label">วันที่แสดง</label>
          <input v-model="$v.showtimeCon.$model" :class="{ 'form-control is-invalid': $v.showtimeCon.$error }" class="form-control" type="datetime-local" style="cursor: pointer;"/>
          {{ new Date(concert.concert.concert_showtime).toLocaleDateString("th", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}) }} น.

          <!-- show error -->
          <template v-if="$v.showtimeCon.$error">
            <div class="error text-danger" v-if="!$v.showtimeCon.required">กรุณากรอกวันที่</div>
            <p class="error text-danger" v-if="!$v.showtimeCon.con_showtime">กรุณาใส่วันที่ให้ถูกต้อง</p>
          </template>      
        </div>
        
      </div>

      <div class="form-group col-md-12 p-0 ">
        <label class="label">ราคา (ราคา / 1 ใบ)</label>
        <div class="control">
          <input v-model="seatPrice" class="form-control"  type="text" placeholder="กรุณากรอกราคาที่นั่งในคอนเสิร์ต" />
        </div>
      </div>

     <div class="form-row m-0 p-0">
       <div class="form-group col-md-6">
        <label class="label">เลขบัญชีธนาคาร</label>
        <div class="control">
          <input v-model="$v.bankAccount.$model" :class="{ 'form-control is-invalid': $v.bankAccount.$error }" type="text" class="form-control" placeholder="กรุณากรอกเลขบัญชีธนาคาร" />
          <!-- show error -->
           <template v-if="$v.bankAccount.$error">
            <div class="error text-danger" v-if="!$v.bankAccount.required">กรุณากรอกข้อมูล</div>
            <div class="error text-danger" v-else-if="!$v.bankAccount.bankAccount">กรุณาใส่ตัวเลข</div>
          </template>      
        </div>
      </div>

    <div class="form-group col-md-6 was-validated">
      <label >ธนาคาร</label>
      <select id="bankName" v-model="bankName" class="form-control" style="cursor: pointer;" required >
        <option selected></option>
        <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
        <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
        <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
        <option value="ธนาคารทหารไทย">ธนาคารทหารไทย</option>
        <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
        <option value="ธนาคารกรุงศรีอยุธยา">ธนาคารกรุงศรีอยุธยา</option>
        <option value="ธนาคารออมสิน">ธนาคารออมสิน</option>
        <option value="	ธนาคารธนชาต">	ธนาคารธนชาต</option>
      </select>
      <div class="invalid-feedback">กรุณาเลือกธนาคาร</div>
    </div>
     </div>

      <div class="form-group was-validated">
        <label >สถานที่จัด</label>
        <select id="location" v-model="location" class="form-control" style="cursor: pointer;" required @click="getlocationname()">
          <option selected></option>
          <option value="1" >โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท</option>
          <option value="2" >ยูเนี่ยน ฮอลล์, ศูนย์การค้ายูเนี่ยน มอลล์</option>
          <option value="3" >ศูนย์วัฒนธรรมแห่งประเทศไทย หอประชุมใหญ่</option>
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
    <!-- show image -->
      <div v-if="currentImage.length > 0" class="columns is-multiline">
        <div v-for="(image) in currentImage" :key="image.id" class="column is-one-quarter">
          <div class="card" style="border-style: hidden;">
            <div class="card-image">
              <div class="text-center" id="card-img-top">
                <img :src="'http://localhost:3000/'+image.file_path" alt="Placeholder image" class="w-25"/>
              </div>
            </div>       
           <button @click="deleteCurrentImage(image.id)" class="btn btn-secondary" style="cursor: pointer; ">ยกเลิกการเลือก</button>
          </div>
        </div>
      </div>
      <div class="text-center mt-2">
            <button type="submit" class="btn btn-warning btn-lg mr-4" @click="submitCon">Submit</button>
            <button type="submit" class="btn btn-dark btn-lg" @click="$router.go(-1)">Cancel</button>
      </div>
    </section>
  </div> 
    </div>
</template>
<script>
import axios from "@/plugins/axios";
import {
  required,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

function isNum (value){
  if (!value.match(/[0-9]/)) {
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
  props: ["user"],
  data() {
    
    return {
      location_name: '',
      concert: {},
      error: null,
      images: [], // array of image
      titleCon: "",
      desConcert: "",
      seatPrice: "",
      bankAccount: "",
      bankName: "",
      buyAvailable: null,
      showtimeCon: null,
      statusCon: "coming soon",
      location: null,
      currentImage: []
    };
  },
  mounted(){
        axios
        .get(`/concerts/${this.$route.params.id}`)
        .then((res) => {
            axios
                .get(`/banking/${res.data.concert.concert_id}`)
                .then((res) => {
                 
                 this.bankName = res.data[0].account_name
                 this.bankAccount = res.data[0].bank_account
                })
                .catch((e) => {
                console.log(e)
                });
          this.concert = res.data
          this.currentImage = res.data.images
          this.location = res.data.concert.address_id
          this.titleCon = res.data.concert.concert_title
          this.desConcert = res.data.concert.concert_desc
          this.seatPrice = res.data.concert.price
          if(this.location == 1){
            this.location_name = 'โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท'
          }
          if(this.location == 2){
            this.location_name = 'ยูเนี่ยน ฮอลล์, ศูนย์การค้ายูเนี่ยน มอลล์'
          }
          if(this.location == 3){
            this.location_name = 'ศูนย์วัฒนธรรมแห่งประเทศไทย หอประชุมใหญ่'
          }
        })
        .catch((e) => {
          console.log(e)
        });
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
    bankAccount:{
      required: required,
      bankAccount: isNum,
    }

  },

  methods: {
    getlocationname(){
        if(this.location == 1){
            this.location_name = 'โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท'
          }
          if(this.location == 2){
            this.location_name = 'ยูเนี่ยน ฮอลล์, ศูนย์การค้ายูเนี่ยน มอลล์'
          }
          if(this.location == 3){
            this.location_name = 'ศูนย์วัฒนธรรมแห่งประเทศไทย หอประชุมใหญ่'
          }
      },
   selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    updateMainImage() {
      console.log("ccc");
      axios
        .put(
          `/image/setmain/${this.$route.params.id}/${this.selectMainId}`
        )
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteCurrentImage(imageId) {
      let comfirmDeleteImage = confirm("Are you sure to delete this image");
      if (comfirmDeleteImage == true) {
        axios
          .delete("/image/" + imageId)
          .then((response) => {
            console.log("delete image ", response);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    submitCon() {
      // this.locationCon = document.getElementById("location").value;
      // console.log(this.locationCon)
      this.$v.$touch();
      if(!this.$v.$invalid){
        let formData = new FormData();
        formData.append("concert_title", this.titleCon);
        formData.append("concert_desc", this.desConcert);
        formData.append("address_id", this.location);
        formData.append("concert_address", this.location_name);
        formData.append("price", this.seatPrice);
        formData.append("concert_showtime", this.showtimeCon);
        formData.append("buy_available", this.buyAvailable);
        formData.append("user_user_id", this.user.user_id);

        formData.append("bank_account", this.bankAccount);
        formData.append("account_name", this.bankName);
        formData.append("concert_id", this.concert.concert.concert_id);
        formData.append("fname", this.user.fname);
        formData.append("lname", this.user.lname);

       
        this.images.forEach((image) => {
          formData.append("myImage", image);
        });

    axios
        .put(`/concerts/${this.concert.concert.concert_id}`, formData)
        .then((res) => {
          console.log(res)
          location.href = `http://localhost:8080/myconcert/${this.user.user_id}`
        })
        .catch((e) => console.log(e.response.data));
      }
    }
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