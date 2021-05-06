<template>
  <div>
    <div class="container">
    <form>
                              <img class="mx-auto" src="../assets/logo.png" alt="logo" style="width: 10vw; display: block;">
                                <h4 class="mt-4 font-weight-bold text-center">แบบฟอร์มการแจ้งโอนเงิน</h4>
                            <fieldset disabled>
                                <div class="form-group mt-4">
                                    <label>หมายเลขคำสั่งซื้อ</label>
                                    <input type="text" id="disabledTextInput" class="form-control" v-model="this.mybook.booking_id">
                                </div>
                            </fieldset>
                            <label>ชื่อ - นามสกุล</label>
                            <div class="form-group row">
                                <div class="col">
                                    <input v-model="$v.fname.$model" :class="{ 'border-danger': $v.fname.$error }"  type="text" class="form-control" placeholder="ชื่อ">
                                    <template v-if="$v.fname.$error">
                                        <p class="help text-danger" v-if="!$v.fname.required">
                                            กรุณากรอกชื่อ
                                        </p>
                                        <p class="help text-danger" v-if="!$v.fname.name">
                                            ชื่อต้องเป็นตัวอักษรเท่านั้น
                                        </p>
                                    </template>
                                </div>
                                <div class="col">
                                    <input v-model="$v.lname.$model" :class="{ 'border-danger': $v.lname.$error }" type="text" class="form-control" placeholder="นามสกุล">
                                    <template v-if="$v.lname.$error">
                                        <p class="help text-danger" v-if="!$v.lname.required">
                                            กรุณากรอกนามสกุล
                                        </p>
                                        <p class="help text-danger" v-if="!$v.lname.name">
                                            นามสกุลต้องเป็นตัวอักษรเท่านั้น
                                        </p>
                                    </template>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col">
                                    <label>วันที่ทำรายการ</label>
                                  <input v-model="$v.date.$model" :class="{ 'border-danger': $v.date.$error }" class="form-control" type="date" value="" id="example-date-input">
                                    <template v-if="$v.date.$error">
                                        <p class="help text-danger" v-if="!$v.date.required">
                                            กรุณาเลือกวันที่ทำรายการ
                                        </p>
                                    </template>
                                </div>
                                <div class="col">
                                    <label>เวลาที่ทำรายการ</label>
                                    <input v-model="$v.time.$model" :class="{ 'border-danger': $v.time.$error }" class="form-control" type="time" value="" id="example-time-input">
                                    <template v-if="$v.time.$error">
                                        <p class="help text-danger" v-if="!$v.time.required">
                                            กรุณาเลือกเวลาที่ทำรายการ
                                        </p>
                                    </template>
                                </div>
                            </div>

                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="customFile"  @change="selectImage" accept="image/png, image/jpeg, image/webp" style="cursor: pointer;">
                                <label class="custom-file-label" for="customFile">แนบหลักฐานการโอนเงิน</label>
                            </div>
                            <div v-if="image" class="pt-3 mx-auto">
                                <div v-for="(img, index) in image" :key="img.id" class="">
                                    <div class="card" style="border-style: hidden;">
                                        <div class="text-center" id="card-img-top" >
                                            <img :src="showSelectImage(img)" alt="Placeholder image" class="w-25"/>
                                        </div>
                                    </div>
                                    <div class="text-center mt-2">
                                        <button @click="deleteSelectImage(index)" class="btn btn-secondary" style="cursor: pointer; ">ยกเลิกการเลือก</button>

                                    </div>

                                </div>
                            </div>

                        </form>
                         <div class="my-4 text-center"> 
                                <a href="#" class="btn btn-danger" @click="submitBlog()">ยืนยัน</a> 
                                <!-- <a  class="btn btn-secondary ml-3 text-white" @click="backPage()" >กลับไปหน้าที่แล้ว</a> -->
                            </div> 

 </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import {
  required,
} from "vuelidate/lib/validators";

function name (value){
  if (value.match(/[0-9]/)) {
      return false;
    }
  return true
} 
export default {
  props: ["user"],
  mounted(){
    this.getmyBooked(this.user.user_id)
  },
  data() {
    return {
      fname: '',
      lname: '',
      date: null,
      time: null,
      image: [],
      mybook: {}
    };
  },
  validations:{
    fname:{
        required: required,
        name: name,
    },
    lname:{
        required: required,
        name: name,
    },
    date:{
        required: required
    },
    time:{
        required: required
    },
    image:{
        required: required
    }
    
  },
  methods: {
    getmyBooked(id){
      axios
        .get(`/mybook/${id}`)
        .then((response) => {
          this.mybook = response.data
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    selectImage(event) {
      this.image = event.target.files;
      console.log(this.image[0].name)
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
    //   this.image = Array.from(this.image);
      this.image.splice(index, 1);
    },
    submitBlog() {
      console.log(this.date + ' ' + this.time)
      this.$v.$touch();
      if(!this.$v.$invalid){
        let formData = new FormData();
        formData.append("booking_id", this.mybook.booking_id);
      formData.append("fname", this.fname);
      formData.append("lname", this.lname);
      formData.append("pay_date", this.date + ' ' + this.time);
      this.image.forEach((image) => {
          formData.append("image", image);
        });

      axios
        .post("/payment", formData)
        .then((res) => {
          console.log(res)
          location.href = '/'
        })
        .catch((e) => console.log(e.response.data));
      }
    },
  },
};
</script>

<style>