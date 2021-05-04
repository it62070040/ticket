<template>
  <div>
    <div class="container">
    <form>
                              <img class="mx-auto" src="../assets/logo.png" alt="logo" style="width: 10vw; display: block;">
                                <h4 class="mt-4 font-weight-bold text-center">แบบฟอร์มการแจ้งโอนเงิน</h4>
                            <fieldset disabled>
                                <div class="form-group mt-4">
                                    <label>หมายเลขคำสั่งซื้อ</label>
                                    <input type="text" id="disabledTextInput" class="form-control" value="xxx">
                                </div>
                            </fieldset>
                            <label>ชื่อ - นามสกุลของบัญชีที่โอน</label>
                            <div class="form-group row">
                                <div class="col">
                                    <input v-model="$v.firstName.$model" :class="{ 'border-danger': $v.firstName.$error }"  type="text" class="form-control" placeholder="ชื่อ">
                                    <template v-if="$v.firstName.$error">
                                        <p class="help text-danger" v-if="!$v.firstName.required">
                                            กรุณากรอกชื่อ
                                        </p>
                                        <p class="help text-danger" v-if="!$v.firstName.name">
                                            ชื่อต้องเป็นตัวอักษรเท่านั้น
                                        </p>
                                    </template>
                                </div>
                                <div class="col">
                                    <input v-model="$v.lastName.$model" :class="{ 'border-danger': $v.lastName.$error }" type="text" class="form-control" placeholder="นามสกุล">
                                    <template v-if="$v.lastName.$error">
                                        <p class="help text-danger" v-if="!$v.lastName.required">
                                            กรุณากรอกนามสกุล
                                        </p>
                                        <p class="help text-danger" v-if="!$v.lastName.name">
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
                            <fieldset disabled>
                                <div class="form-group">
                                    <label>โอนเข้าธนาคาร</label>
                                    <input type="text" id="disabledTextInput" class="form-control" value="xxx">
                                </div>
                            </fieldset>

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
                                <a href="#" class="btn btn-secondary ml-3" >กลับไปหน้าที่แล้ว</a>
                            </div> 

 </div>
  </div>
</template>
<script>
// import axios from '@/plugins/axios';
import {
  required,
//   minLength,
//   maxLength,
//   url,
//   maxValue
} from "vuelidate/lib/validators";

function name (value){
  if (value.match(/[0-9]/)) {
      return false;
    }
  return true
} 
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      date: null,
      time: null,
      image: []
    };
  },
  validations:{
    firstName:{
        required: required,
        name: name,
    },
    lastName:{
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
      this.$v.$touch();
      if(!this.$v.$invalid){
        let formData = new FormData();
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("date", this.date);
      formData.append("time", this.time);
      

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

    //   axios
    //     .post("http://localhost:3000/blogs", formData)
    //     .then((res) => this.$router.push({name: 'home'}))
    //     .catch((e) => console.log(e.response.data));
      }
    },
  },
};
</script>

<style>