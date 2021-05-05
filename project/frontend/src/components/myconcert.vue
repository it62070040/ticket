<template>
    <div>
        <div class="container-fluid py-3">
    <div class="row mt-3">
      <div
        class="col-4 justify-content-center d-flex"
        style="border-color: gray;"
      >
        <div class="profile">
          <div class="mb-3 pt-3 pb-2 text-center " style="background-color: #f4f4f4; width: 13em;">
            <b >ชื่อ นามสกุล</b> <br> อีเมล 
            <!-- <p > อีเมล</p> -->
          </div>
          
          <div class="mb-5">
            <span class="icon d-block pl-2" style="cursor: pointer;" @click="showMyConcert()">
              <i class="fa fa-ticket"></i>
                คอนเสิร์ตของฉัน
            </span>
            <span class="icon d-block pl-2" style="cursor: pointer;">
              <i class="fa fa-ticket"></i>
                ตรวจสอบคำสั่งซื้อจากลูกค้า
            </span>
            <hr style="background-color: #f4f4f4;" />
            
            <span class="icon d-block pl-2" style="cursor: pointer;" @click="showEditProfile()">
              <i class="fa fa-ticket"></i>
              แก้ไขข้อมูลส่วนตัว
            </span>

            <hr style="background-color: #f4f4f4;" />
              <span class="icon d-block pl-2" style="cursor: pointer;" @click="logout()">
              <i class="fa fa-ticket"></i>
              ออกจากระบบ
            </span>
          </div>
        </div>
      </div>
      <div class="col-7">

          <!-- คอนเสิร์ตของฉัน -->
            <div class="container" v-if="myConcert == true">
                <div class="d-flex">
                     <h5 class="mt-1">สินค้า xxx รายการ</h5>
                    <!-- <button class="btn btn-danger ml-4 btn-sm" style="border-radius: 2.5em;">เพิ่มสินค้าใหม่</button> -->
                    <router-link  class="btn btn-danger btn-sm ml-4 mt-1" style="border-radius: 2.5em;" :to="`/create/`">เพิ่มสินค้าใหม่</router-link>
                </div>
                <table class="table mt-4">
                    <thead class="thead-light">
                        <tr class="text-center">
                            <th scope="col">ชื่อการแสดง</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">ที่นั่งทั้งหมด</th>
                            <th scope="col">ยอดขาย (ที่นั้ง)</th>
                            <th scope="col">สถานะ</th>
                            <th scope="col">การดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center">
                             <td> <img src="../assets/boot.png"  alt="" height="40vh;" class="mr-2">
                                xxx</td>
                            <td>xxx</td>
                            <td>xxx</td>
                            <td>xxx</td>
                            <td>xxx</td>
                            <td><button class="btn btn-secondary btn-sm" style="border-radius: 2.5em;" >แก้ไข</button></td>
                        </tr>
                        
                    </tbody>
                </table>
               
            </div>


            <!-- ตรวจสอบคำสั่งซื้อของลูกค้า -->
            <div class="container">
                <div class="d-flex">
                     <h5 class="mt-1">คำสั่งซื้อ xxx รายการ</h5>
                 
                </div>
                <table class="table mt-4"  style="width:55  vw">
                    <thead class="thead-light">
                        <tr class="text-center">
                            <th scope="col">ชื่อการแสดง</th>
                            <th scope="col">ชื่อ-นามสกุล <br> (ลูกค้า)</th>
                            <th scope="col">จำนวนเงิน</th>
                            <th scope="col">วันเวลา <br> ที่ทำรายการ</th>
                            <th scope="col">ธนาคาร</th>
                            <th scope="col">หลักฐาน <br> การโอนเงิน</th>
                            <th scope="col">การดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center">
                            <td> <img src="../assets/boot.png"  alt="" height="40vh;" class="mr-2">
                                xxx</td>
                            <td>xxx</td>
                            <td>xxx</td>
                            <td>xxx</td>
                            <td>xxx</td>
                            <td><button class="btn btn-warning btn-sm" style="border-radius: 2.5em;" @click="showImage()">หลักฐาน</button></td>
                            <td><button class="btn btn-secondary btn-sm" style="border-radius: 2.5em;" >แก้ไข</button></td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>



      
      <!-- แก้ไขข้อมูลส่วนตัว -->
      <div class="container" v-show="EditProfile == true">
      <h3 class="text-center pb-4">แก้ไขข้อมูลส่วนตัว</h3>
      <form>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label">ชื่อ</label>
          <div class="col-sm-10">
            <input v-model="$v.firstName.$model" :class="{ 'border-danger': $v.firstName.$error }" type="text" class="form-control" />
                <template v-if="$v.firstName.$error" >
                    <p class="help text-danger m-0" v-if="!$v.firstName.required">
                        กรุณากรอกข้อมูล
                     </p>
                    <p class="help text-danger m-0" v-if="!$v.firstName.name">
                        ชื่อต้องเป็นตัวอักษรเท่านั้น
                    </p>
                    <p class="help text-danger m-0" v-if="!$v.firstName.maxLength">
                        ชื่อของคุนยาวเกินไป
                     </p>
                </template>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label">นามสกุล</label>
          <div class="col-sm-10">
            <input v-model="$v.lastName.$model" :class="{ 'border-danger': $v.lastName.$error }" type="text" class="form-control" />
            <template v-if="$v.lastName.$error" >
                <p class="help text-danger m-0" v-if="!$v.lastName.required">
                    กรุณากรอกข้อมูล
                </p>
                <p class="help text-danger m-0" v-if="!$v.lastName.name">
                    นามสกุลต้องเป็นตัวอักษรเท่านั้น
                </p>
                <p class="help text-danger m-0" v-if="!$v.lasttName.maxLength">
                    ชื่อของคุนยาวเกินไป
                </p>
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label">ที่อยู่</label>
          <div class="col-sm-10">
            <input v-model="$v.address.$model" :class="{ 'border-danger': $v.address.$error }" type="text" class="form-control" />
            <template v-if="$v.address.$error" >
                <p class="help text-danger m-0" v-if="!$v.address.required">
                    กรุณากรอกข้อมูล
                </p>
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >หมายเลขโทรศัพท์</label
          >
          <div class="col-sm-10">
            <input v-model="$v.mobile.$model" :class="{ 'border-danger': $v.mobile.$error }"  type="text" class="form-control" />
            <template v-if="$v.mobile.$error" >
                <p class="help text-danger m-0" v-if="!$v.mobile.required">
                    กรุณากรอกข้อมูล
                </p>
                <p class="help text-danger m-0" v-if="!$v.mobile.mobile">
                   หมายเลขโทรศัพท์ต้องเป็นตัวเลขเท่านั้น
                </p>
            </template>
          </div>
        </div>


        <div class="form-group row">
          <label class="col-sm-2 col-form-label">รหัสผ่านเก่า</label>
          <div class="col-sm-10">
            <input v-model="$v.password.$model" :class="{ 'border-danger': $v.password.$error }" type="password" class="form-control" />
            <template v-if="$v.password.$error" >
                <p class="help text-danger m-0" v-if="!$v.password.minLength">
                   รหัสผ่านสั้นเกินไป
                </p>
                <p class="help text-danger m-0" v-if="!$v.password.complex">
                   รหัสผ่านของคุณอ่อนแอ (ควรมีอักษร A-Z , a-z , 0-9)
                </p>
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >รหัสผ่านใหม่</label
          >
          <div class="col-sm-10">
            <input v-model="$v.newPassword.$model" :class="{ 'border-danger': $v.newPassword.$error }" type="password" class="form-control" />
            <template v-if="$v.newPassword.$error" >
                <p class="help text-danger m-0" v-if="!$v.newPassword.minLength">
                   รหัสผ่านสั้นเกินไป
                </p>
                <p class="help text-danger m-0" v-if="!$v.newPassword.complex">
                   รหัสผ่านของคุณอ่อนแอ (ควรมีอักษร A-Z , a-z , 0-9)
                </p>
            </template>
          </div>
        </div>

        <div class="form-group row pb-3">
          <label class="col-sm-2 col-form-label">ยืนยันรหัสผ่านใหม่</label>
          <div class="col-sm-10">
            <input v-model="$v.confirmNewpassword.$model" :class="{ 'border-danger': $v.confirmNewpassword.$error }" type="password" class="form-control" />
            <template v-if="$v.confirmNewpassword.$error" >
                <p class="help text-danger m-0" v-if="!$v.confirmNewpassword.sameAs">
                    รหัสผ่านยืนยันไม่ถูกต้อง
                </p>
            </template>
          </div>
        </div>
        <center><button type="submit" class="btn btn-danger" @click="submit()">บันทึก</button></center>
      </form>
    </div>

    <!-- คอนเสิร์ตของฉัน -->




      </div>

 
    </div>
  </div>
    </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  sameAs
//   url,
//   maxValue
} from "vuelidate/lib/validators";

function name (value){
  if (value.match(/[0-9]/)) {
      return false;
    }
  return true
} 

function mobile(value) {
  return !!value.match(/0[0-9]{9}/);
}


function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
    props: ['user'],
    data() {
        return {
            firstName: '',
            lastName: '',
            address: '',
            mobile: '',
            password: '',
            newPassword: '',
            confirmNewpassword: '',

            imageOfCus: '',
        

            EditProfile: false,
            myConcert: false,
        };
    },
    validations:{
    firstName:{
        required: required,
        name: name,
        maxLength: maxLength(150)
    },
    lastName:{
        required: required,
        name: name,
        maxLength: maxLength(150)
    },
    address:{
        required: required
    },
    mobile: {
      required: required,
      mobile: mobile,
    },

    password:{
        minLength: minLength(8),
        complex: complexPassword,
    },
    newPassword: {
        minLength: minLength(8),
        complex: complexPassword,
    },
    confirmNewpassword:{
        sameAs: sameAs("password"),
    }
    
  },
  methods:{
      showEditProfile(){
          if(this.EditProfile){
              this.EditProfile = false
          }
          else{
              this.EditProfile = true
              this.myConcert = false
          }
      },
      showMyConcert(){
          if(this.myConcert){
              this.myConcert = false
          }
          else{
              this.myConcert = true
              this.EditProfile =false
          }
      },
    //   showImage(){
    //       this.imageOfCus = 
    //   },
      logout(){
            localStorage.clear()
            location.reload();
        },
      submitBlog() {
      this.$v.$touch();
      if(!this.$v.$invalid){
        let formData = new FormData();
      formData.append("", this.firstName);
      formData.append("", this.lastName);
      formData.append("", this.address);
      formData.append("", this.mobile);
      
      if(this.password){
        formData.append("", this.password);
      }
      if(this.newPassword){
        formData.append("", this.newPassword);
      }
      if(this.confirmNewpassword){
        formData.append("", this.confirmNewpassword);
      }
     
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
    //     .post("/", formData)
    //     .then((res) => this.$router.push({name: 'home'}))
    //     .catch((e) => console.log(e.response.data));
      }
    },
    // isConcertOwner(concert){
    //     if (!this.user) return false
    //    return concert.user_user_id === this.user.id
    // }

  }
}
</script>