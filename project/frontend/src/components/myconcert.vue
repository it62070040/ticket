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
            <b >{{user.fname +' ' + user.lname}}</b> <br> {{user.email}}
            <!-- <p > อีเมล</p> -->
          </div>
          
          <div class="mb-5">
            <span class="icon d-block pl-2" style="cursor: pointer;" @click="showMyConcert()">
              <i class="fa fa-ticket"></i>
                คอนเสิร์ตของฉัน
            </span>
            <span class="icon d-block pl-2" style="cursor: pointer;" @click="showCheckOrder()">
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
            <div class="container" v-if="myConcert == 'true'">
                <div class="d-flex">
                     <h5 class="mt-1">สินค้า {{concerts.length}} รายการ</h5>
                    <!-- <button class="btn btn-danger ml-4 btn-sm" style="border-radius: 2.5em;">เพิ่มสินค้าใหม่</button> -->
                    <router-link  class="btn btn-danger btn-sm ml-4 mt-1" style="border-radius: 2.5em;" :to="`/create/`">เพิ่มสินค้าใหม่</router-link>
                </div>
                <table class="table mt-4">
                    <thead class="thead-light">
                        <tr class="text-center">
                            <th scope="col">ชื่อการแสดง</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">ที่นั่งทั้งหมด</th>
                            <th scope="col">ยอดขาย <br> (ที่นั้ง)</th>
                            <th scope="col">สถานะ</th>
                            <th scope="col">การดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="item in concerts" :key="item">
                             <td style="width: 30vw;"> 
                               <div class="row">
                                 <div class="col-2">
                                    <img :src="'http://localhost:3000/' + item.file_path"  alt="" class="mr-2 container-fluid">
                                 </div>
                                 <div class="col">
                                    {{item.concert_title}}
                                 </div>
                               </div>                                       
                            </td>
                            <td class="text-center">{{item.price}}</td>
                            <td class="text-center">{{item.amount}}</td>
                            <td class="text-center">{{item.sold}}</td>
                            <td class="text-center">{{item.concert_status}}</td>
                            <td class="text-center"><button class="btn btn-secondary btn-sm" style="border-radius: 2.5em;" @click="editCon(item.concert_id)">แก้ไข</button></td>
                        </tr>
                        
                    </tbody>
                </table>
               
            </div>


            <!-- ตรวจสอบคำสั่งซื้อของลูกค้า -->
            <div class="container" v-if="checkOrder == 'true'">
                <div class="d-flex">
                     <h5 class="mt-1">คำสั่งซื้อ {{myOrders.length}} รายการ</h5>
                 
                </div>
                <table class="table mt-4"  style="width:55  vw">
                    <thead class="thead-light">
                        <tr class="text-center">
                            <th scope="col">ชื่อการแสดง</th>
                            <th scope="col">ชื่อ-นามสกุล <br> (ลูกค้า)</th>
                            <th scope="col">จำนวนเงิน</th>
                            <th scope="col">วันเวลา <br> ที่ทำรายการ</th>
                            <th scope="col">หลักฐาน <br> การโอนเงิน</th>
                            <th scope="col">การดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in myOrders" :key="item">
                            <td class="text-center" > {{item.booking_concert}}</td>
                            <td class="text-center" >{{item.name}}</td>
                            <td class="text-center" >{{item.booking_price}} บาท </td>
                            <td class="text-center" >{{ new Date(item.pay_date).toLocaleDateString("th", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}) }} น.</td>
                            <td class="text-center" ><button class="btn btn-warning btn-sm" style="border-radius: 2.5em;" type="button" @click="getImg(item.file_path)" data-toggle="modal" data-target="#modalimg">หลักฐาน</button>
                            

                            <div class="modal fade" tabindex="-1" id="modalimg" aria-hidden="true">
            <div class="modal-dialog" >
                <div class="modal-content">
                    <div class="modal-body ">
                        <img class="mx-auto img-fluid" :src="'http://localhost:3000/' + payImg" alt="logo" style="display: block;">
                    </div>
                </div>
            </div>
        </div>


                            </td>
                          
                            <td class="text-center">
                              <button type="button" class="btn btn-success mr-2 " style="border-radius: 2.5em;" @click="changeStatusOrder('success', item.booking_id)">Success</button>
                              <button type="button" class="btn btn-danger" style="border-radius: 2.5em;" @click="changeStatusOrder('fail', item.booking_id)">Fail</button>
                            </td>

                            <td class="text-center" v-if="lastStatus.length > 0">
                              xxx
                            </td>
                        </tr>
                        
                    </tbody>
                </table>

               


            </div>

        

      



      <!--  -->
      <!-- แก้ไขข้อมูลส่วนตัว -->
      <div class="container" v-if="editProfile == 'true'">
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
        
      </form>
      
        <center><button class="btn btn-danger" @click="editUser()">บันทึก</button></center>

    </div>
      </div>

 
    </div>
  </div>

    </div>
    
</template>

<script>

import axios from "@/plugins/axios";
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
            xxx: {},
            firstName: '',
            lastName: '',
            address: '',
            mobile: '',
            password: '',
            newPassword: '',
            confirmNewpassword: '',
            imageOfCus: '',
            myConcert: 'true',
            checkOrder: 'false',
            editProfile: 'false',
            concerts: {}, 
            myOrders:{},
            payImg: null,
            lastStatus: '',
            
        };
    },
    mounted () {
      this.getMycon(this.user.user_id)
      this.firstName = this.user.fname
      this.lastName = this.user.lname
      this.address = this.user.address
      this.mobile = this.user.phone
      
     
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
        sameAs: sameAs("newPassword"),
    }
    
  },
  methods:{
    editUser() {
      
      if (!this.$v.$invalid) {
      let data = {
        first_name: this.firstName,
        last_name: this.lastName,
        address: this.address,
        mobile: this.mobile,
        password: this.newPassword,
        confirmpassword: this.confirmNewpassword,
        oldpassword: this.password,
        id: this.user.user_id,
      };
      console.log(data)
      axios
        .put(`/edit`, data)
        .then((response) => {
          console.log(response);
          alert("แก้ไขข้อมูลสำเร็จ");
        })
        .catch((error) => {
          alert("You have wrong password!");
          console.log(error.response.data);
        });
      }
      else{
        alert('ข้อมูลผิดพลาด กรุณากรอกข้อมูลใหม่');
      }
    },
      getMycon(id){
          axios
        .get(`/mycon/${id}`)
        .then((res) => {
          this.concerts = res.data
          this.getMyorder(this.user.user_id)

        })
        .catch((e) => {
          console.log(e)
        });
      },
      getMyorder(id){
         axios
        .get(`/checkOrder/${id}`)
        .then((res) => {
          this.myOrders = res.data
        })
        .catch((e) => {
          console.log(e)
        });
      },
      showEditProfile(){
          if(this.editProfile == 'true'){
              this.editProfile = 'false'
          }
          else{
              this.editProfile = 'true'
              this.myConcert = 'false'
              this.checkOrder = 'false'
          }
      },
      showMyConcert(){
          if(this.myConcert == 'true'){
              this.myConcert = 'false'
          }
          else{
              this.myConcert = 'true'
              this.editProfile ='false'
              this.checkOrder = 'false'
          }
      },
      showCheckOrder(){
         if(this.checkOrder == 'true'){
              this.checkOrder = 'false'
          }
          else{
              this.checkOrder = 'true'
              this.editProfile ='false'
              this.myConcert = 'false'
          }
      },
      logout(){
            localStorage.clear()
            location.reload();
        },
    getImg(file_path){
      this.payImg = file_path
    },
    changeStatusOrder(status, id){
      let data = {
        status
      }
      var r = confirm("Are you sure for " + status);
      if (r == true) {
        axios
        .put(`/changestatus/${id}`, data)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        });
      } else {
        console.log('cancel')
      }
    },
    // isConcertOwner(concert){
    //     if (!this.user) return false
    //    return concert.user_user_id === this.user.id
    // }
    editCon(id){
      location.href = `http://localhost:8080/update/${id}`
    },
  },
  
}
</script>