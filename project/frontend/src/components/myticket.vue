<template>
  <div class="col-7">
    <div class="pl-3 pt-2" v-show="store.state.col1">
      <h3 class="text-center pb-4">ตั๋วของฉัน</h3>
      <!-- <div class="row"  > -->
         <!-- ตาราง -->
          <table class="table mt-4" >
                    <thead class="thead-light">
                        <tr class="text-center">
                            <th scope="col">ลำดับ</th>
                            <th scope="col">E-TICKET</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="(order, index) in orders" :key="order.booking_id">
                          <td class="text-center">{{index+1}}</td>
                          <td class="text-center" v-if="order.status == 'pending'">รอตรวจสอบการโอนเงิน</td>
                          <td class="text-center" v-if="order.status == 'fail'">ไม่ผ่านการตรวจสอบ</td>
                           <td class="" style="width: 30vw;" v-if="order.status == 'success'"> 
                                <!-- modal   -->
         <div class="col-lg-8 col-md-4 col-sm-5 pb-4">
          <div v-if="order.status == 'success'" class="card" style="background-color: #f4f4f4; float: left">
            <img class="card-img-top" :src="'http://localhost:3000/' + order.file_path" alt="Card image cap"/>
            <div class="card-body">
              <p style="overflow: hidden; font-weight: 1000; height: 45px; font-size: 16px;" class="card-title">
                {{ order.concert_title }}
              </p>
              <p class="card-text">
                <strong>โซน : </strong>{{ zone }}<br />
                <strong>ที่นั่ง : </strong>{{ order.booking_seat }}<br />
                <strong>ราคา : </strong>{{ order.booking_price }}<br />
              </p>
              <center>
                <button class="btn btn-primary" data-toggle="modal" data-target="#e_ticket" @click="eTicket(index, order.booking_concert)">E-TICKET</button>
              </center>
            </div>
          </div>
        </div>
                            </td>
                        </tr>
                  </tbody>
                  
          </table> 
        
      <!-- </div> -->
    </div>

    <div class="pt-2" v-show="store.state.col2">
      <h3 class="text-center pb-3">ประวัติการสั่งซื้อ</h3>
      <table class="table table-hover">
        <thead>
          <tr class="text-center">
            <th>เลขคำสั่งซื้อ</th>
            <th>ชื่อคอนเสิร์ต</th>
            <th>วันที่แสดง</th>
            <th>รอบการแสดง</th>
            <th>โซน</th>
            <th>ที่นั่ง</th>
            <th>จำนวน</th>
            <th>ราคาตั๋ว (บาท)</th>
            <th>รวม (บาท)</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody v-for="order in orders" :key="order.booking_id">
          <tr class="text-center">
            <td>{{ order.booking_id }}</td>
            <td>{{ order.concert_title }}</td>
            <td>
              {{ new Date(order.concert_showtime).toLocaleDateString("th", { weekday: "short", year: "numeric", month: "short", day: "numeric",}) }}
            </td>
            <td>
              {{ new Date(order.concert_showtime) .toLocaleDateString("th", { hour: "numeric",  minute: "numeric", }).slice(-5) }} น.
            </td>
            <td>{{ order.booking_seat }}</td>
            <td>{{ order.booking_seat }}</td>
            <td>{{ order.booking_amount }}</td>
            <td>{{ order.booking_price }}</td>
            <td>{{ order.booking_price }}</td>
            <td style="color: lawngreen; font-weight: 1000" v-if="order.status == 'success'">
              {{order.status}}
            </td>
            <td style="color: gray; font-weight: 1000" v-if="order.status == 'pending'">
              {{order.status}}
            </td>
            <td style="color: red; font-weight: 1000" v-if="order.status == 'fail'">
              {{order.status}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pl-3 pt-2" v-show="store.state.col3">
      <h3 class="text-center pb-4">แก้ไขข้อมูลส่วนตัว</h3>
      <form>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">ชื่อ</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="$v.fname.$model" />
            <template v-if="$v.fname.$error">
              <div>
                <div class="error text-danger" v-if="!$v.fname.required">
                  กรุณากรอกข้อมูล
                </div>
                <div class="error text-danger" v-if="!$v.fname.maxLength">
                  ชื่อคุณยาวเกินไป
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">นามสกุล</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="$v.lname.$model" />
            <template v-if="$v.lname.$error">
              <div>
                <div class="error text-danger" v-if="!$v.lname.required">
                  กรุณากรอกข้อมูล
                </div>
                <div class="error text-danger" v-if="!$v.lname.maxLength">
                  ชื่อคุณยาวเกินไป
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">ที่อยู่</label>
          <div class="col-sm-10">
            <textarea
              type="textarea"
              class="form-control"
              v-model="$v.address.$model"
           :class="{'is-danger' : $v.address.$error}" />
            <template v-if="$v.address.$error">
              <div>
                <div class="error text-danger" v-if="!$v.address.required">
                  กรุณากรอกข้อมูล
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >หมายเลขโทรศัพท์</label
          >
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="$v.phone.$model" :class="{'is-danger' : $v.phone.$error}"/>
            <template v-if="$v.phone.$error">
              <div>
                <div class="error text-danger" v-if="!$v.phone.required">
                  กรุณากรอกข้อมูล
                </div>
                <div class="error text-danger" v-else-if="!$v.phone.mobile">
                  เบอร์โทรศัพท์ไม่ถูกต้อง
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">รหัสผ่านเก่า</label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              v-model="$v.oldpassword.$model"
            />
            <template v-if="$v.oldpassword.$error">
              <div class="error text-danger" v-if="!$v.oldpassword.required">
                กรุณากรอกข้อมูล
              </div>
              <div class="error text-danger" v-if="!$v.oldpassword.minLength">
                รหัสผ่านสั้นเกินไป
              </div>
            </template>
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >รหัสผ่านใหม่</label
          >
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              v-model="$v.password.$model"
            />
            <template v-if="$v.password.$error">
              <div class="error text-danger" v-if="!$v.password.required">
                กรุณากรอกข้อมูล
              </div>
              <div class="error text-danger" v-if="!$v.password.minLength">
                รหัสผ่านสั้นเกินไป
              </div>
              <div class="error text-danger" v-else-if="!$v.password.complex">
                รหัสผ่านของคุณอ่อนแอ (ควรมีอักษร A-Z , a-z , 0-9)
              </div>
            </template>
          </div>
        </div>
        <div class="form-group row pb-3">
          <label class="col-sm-2 col-form-label">ยืนยันรหัสผ่านใหม่</label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              v-model="$v.confirmpassword.$model"
            />
            <template v-if="$v.confirmpassword.$error">
              <div
                class="error text-danger"
                v-if="!$v.confirmpassword.required"
              >
                กรุณากรอกข้อมูล
              </div>
              <div class="error text-danger" v-if="!$v.confirmpassword.sameAs">
                รหัสผ่านยืนยันไม่ถูกต้อง
              </div>
            </template>
          </div>
        </div>
        <center>
          <button type="submit" class="btn btn-danger" @click="editUser(id)">
            บันทึก
          </button>
        </center>
      </form>
    </div>

    <!-- modal e-ticket -->
    <div class="modal fade" role="dialog" id="e_ticket" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">E-Tickets</h5>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div
            class="modal-body"
            style="padding: 30px; background-color: skyblue; height: 70vh"
          >
            <!-- <img class="mx-auto" src="../assets/logo.png" alt="logo" style="width: 10vw; "> -->
            <div class="card text-center" v-bind="ticket">
              <div class="card-body pt-4">
                <h3 class="card-title pb-2">{{ ticket.concert_title }}</h3>
                <h6 class="card-text">ของ</h6>
                <h4 class="card-text">{{ users.fname }} {{ users.lname }}</h4>
                <br />
                <div class="row pb-4">
                  <div class="col-6">
                    <h5>Zone</h5>
                    <h5>{{ zone }}</h5>
                  </div>
                  <div class="col-6">
                    <h5>Seat</h5>
                    <h5>{{ ticket.booking_seat }}</h5>
                  </div>
                </div>
                <h5 class="card-text pb-4">
                  สถานที่ : {{ ticket.concert_address }}
                </h5>
                <div class="row">
                  <div class="col-6">
                    <h5>Show date</h5>
                    <h5>
                      {{
                        new Date(ticket.concert_showtime).toLocaleDateString(
                          "th",
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      }}
                    </h5>
                  </div>
                  <div class="col-6">
                    <h5>Show time</h5>
                    <h5>
                      {{
                        new Date(ticket.concert_showtime)
                          .toLocaleDateString("th", {
                            hour: "numeric",
                            minute: "numeric",
                          })
                          .slice(-5)
                      }}
                      น.
                    </h5>
                  </div>
                </div>
                <img
                  class="card-img-bottom"
                  :src="qrcode"
                  style="max-height: 232px; width: auto"
                  alt="Card image cap"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/vuex/store.js";
import axios from '@/plugins/axios';
import {
  required,
  minLength,
  sameAs,
  maxLength,
} from "vuelidate/lib/validators";

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}
function phone(value) {
  return !!value.match(/0[0-9]{9}/);
}
export default {
  data() {
    return {
      store,
      users: {},
      orders: {},
      dateCon: "",
      ticket: {},
      fname: "",
      lname: "",
      address: "",
      phone: "",
      oldpassword: "",
      password: "",
      confirmpassword: "",
      id: "",
      zone: "A",
      qrcode: null,
     
    };
  },
  mounted() {
    this.getUser(this.$route.params.id);
    this.getUserOrder(this.$route.params.id);
  },
  methods: {
  
    editUser() {
      
      if (!this.$v.$invalid) {
      let data = {
        first_name: this.fname,
        last_name: this.lname,
        address: this.address,
        mobile: this.phone,
        password: this.password,
        confirmpassword: this.confirmpassword,
        oldpassword: this.oldpassword,
        id: this.id,
      };

      axios
        .put(`/edit`, data)
        .then((response) => {
          console.log(response);
          alert("แก้ไขข้อมูลสำเร็จ");
          location.reload();
        })
        .catch((error) => {
          alert("You have wrong password!");
          this.error = error.response.data;
          alert(error.response.data);
        });
      }
      else{
        alert('ข้อมูลผิดพลาด กรุณากรอกข้อมูลใหม่');

      }
    },
    getUser(userID) {
      axios
        .get(`/user/${userID}`)
        .then((res) => {
          this.users = res.data;
          // console.log(res.data)
          this.id = res.data.user_id
          this.fname = res.data.fname
          this.lname = res.data.lname
          this.phone = res.data.phone
          this.address = res.data.address

        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserOrder(id) {
      axios
        .get(`/UserBooked/${id}`)
        .then((res) => {
          this.orders = res.data;
          console.log(res.data);

        })
        .catch((err) => {
          console.log(err);
        });
    },
    eTicket(id, name) {
      this.ticket = this.orders[id];
      this.qrcode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${name}`
      console.log(this.orders[id]);
    },
  },
  validations: {
    oldpassword: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirmpassword: {
      required: required,
      sameAs: sameAs("password"),
    },
    phone: {
      required,
      phone: phone,
    },
    address: {
      required: required,
    },
    fname: {
      required: required,
      maxLength: maxLength(150),
    },
    lname: {
      required: required,
      maxLength: maxLength(150),
    },
  },

  name: "myticket",
};
</script>
<style>
p {
  font-size: 14px;
}
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body {
  height: 80vh;
  overflow-y: auto;
  padding: 30px;
}
th {
  font-size: 15px;
}
td {
  font-size: 14px;
}
</style>
