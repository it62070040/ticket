
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
        <label class="label">ราคา (ราคา / 1 ใบ)</label>
        <div class="control">
          <input v-model="$v.seatPrice.$model" class="form-control" :class="{ 'form-control is-invalid': $v.seatPrice.$error }" type="text" placeholder="กรุณากรอกราคาที่นั่งในคอนเสิร์ต" />
          <!-- show error -->
           <template v-if="$v.seatPrice.$error">
            <div class="error text-danger" v-if="!$v.seatPrice.required">กรุณากรอกข้อมูล</div>
            <div class="error text-danger" v-else-if="!$v.seatPrice.seat">กรุณาใส่ตัวเลข</div>
            <div class="error text-danger" v-else-if="!$v.seatPrice.min_seat">จำนวนที่นั่งควรอยู่ระหว่าง 100-9999 ที่</div>
          </template>      
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
      <select id="bankName" v-model="bankName" class="form-control" style="cursor: pointer;" required>
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
        <select id="location" class="form-control" style="cursor: pointer;" required v-model="location" @click="getlocationname()">
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

          
          <div class="invalid-feedback">กรุณาอัพโหลดรูปภาพ</div>
          <div v-if="images" class="columns is-multiline">
        <div v-for="(image, index) in images" :key="image.id" class="column is-one-quarter">
          <div class="card" style="border-style: hidden;">
            <div class="card-image">
              <div class="text-center" id="card-img-top">
                <img :src="showSelectImage(image)" alt="Placeholder image" class="w-25"/>
              </div>
            </div>       
           <button @click="deleteSelectImage(index)" class="btn btn-secondary" style="cursor: pointer; ">ยกเลิกการเลือก</button>
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
  props: ["user"],
  data() {
    return {
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
      location_name: '',
      location: null,
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
    seatPrice:{
      required: required,
      seat: isNum,
      min_seat:  min_seat
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
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submitCon() {
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
        formData.append("fname", this.user.fname);
        formData.append("lname", this.user.lname);

        this.images.forEach((image) => {
          formData.append("myImage", image);
        });

    axios
        .post("/concerts", formData)
        .then(() => location.href = '/')
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