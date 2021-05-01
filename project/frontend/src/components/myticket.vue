<template>
  <div class="col-9">
    <div class="pl-3 pt-2" v-show="store.state.col1">
      <h3 class="text-center pb-4">ตั๋วของฉัน</h3>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-5 pb-4"  v-for="user, index in users" :key="user.id">
          <div v-if="user.status" class="card" style=" background-color: #f4f4f4; float: left;">
            <img class="card-img-top" :src="'http://localhost:3000/'+user.file_path" alt="Card image cap" />
              <div class="card-body">
                <p style="overflow: hidden; font-weight: 1000; height: 45px; font-size: 16px" class="card-title">{{user.concert_title}}</p>
                <p class="card-text">
                  <strong>โซน : </strong>{{user.booking_seat.substring(0,1)}}<br>
                  <strong>ที่นั่ง : </strong>{{user.booking_seat}}<br>
                  <strong>สถานที่ : </strong>{{user.concert_address}}<br>
                  <strong>วันที่แสดง : </strong>{{user.concert_showtime.substring(0,10)}}<br>
                  <strong>เวลาที่แสดง : </strong>{{user.concert_showtime.substring(11,16)}}<br>
                  <strong>ราคา : </strong>{{user.booking_price}}<br>
                </p>
                <center>
                  <button class="btn btn-primary" data-toggle="modal" data-target="#e_ticket" @click="eTicket(index)">E-TICKET</button>
                </center>
              </div>
          </div>
        </div>
      </div>
    </div>

    <div class=" pt-2" v-show="store.state.col2">
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
    <tbody v-for="user in users" :key="user.id" >
      <tr class="text-center">
        <td>{{user.booking_id}}</td>
        <td>{{user.concert_title}}</td>
        <td>{{user.concert_showtime.substring(0,10)}}</td>
        <td>{{user.concert_showtime.substring(11,16)}}</td>
        <td>{{user.booking_seat.substring(0,1)}}</td>
        <td>{{user.booking_seat}}</td>
        <td>{{user.booking_amount}}</td>
        <td>{{user.booking_price}}</td>
        <td>{{user.booking_price}}</td>
        <td style="color: lawngreen; font-weight: 1000;" v-if="user.status">Confirm</td>
        <td v-if="!user.status">Pending</td>
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
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">นามสกุล</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">ที่อยู่</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >หมายเลขโทรศัพท์</label
          >
          <div class="col-sm-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">รหัสผ่านเก่า</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >รหัสผ่านใหม่</label
          >
          <div class="col-sm-10">
            <input type="password" class="form-control" />
          </div>
        </div>
        <div class="form-group row pb-3">
          <label class="col-sm-2 col-form-label">ยืนยันรหัสผ่านใหม่</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" />
          </div>
        </div>
        <center><button type="submit" class="btn btn-danger">บันทึก</button></center>
      </form>
    </div>

    <!-- modal e-ticket -->
        <div class="modal fade"  role="dialog" id="e_ticket" aria-hidden="true"  >
            <div class="modal-dialog" role="document">
                <div class="modal-content" >
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h5 class="modal-title">E-Tickets</h5>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body" style="padding: 30px; background-color: skyblue; height: 70vh" >
                        <!-- <img class="mx-auto" src="../assets/logo.png" alt="logo" style="width: 10vw; "> -->
                        <div class="card text-center" v-bind="ticket" >
                            <div class="card-body pt-4">
                                <h3 class="card-title pb-2">{{ticket.concert_title}}</h3>
                                <h6 class="card-text">ของ</h6>
                                <h4 class="card-text">{{ticket.fname + " " +ticket.lname}}</h4><br>
                                <div class="row pb-4">
                                    <div class="col-6">
                                        <h5>Zone</h5>
                                        <h5>{{ticketZone}}</h5>
                                    </div>
                                    <div class="col-6">
                                        <h5>Seat</h5>
                                        <h5>{{ticket.booking_seat}}</h5>
                                    </div>
                                </div>
                                <h5 class="card-text pb-4">สถานที่ : {{ticket.concert_address}}</h5>
                                <div class="row">
                                    <div class="col-6">
                                        <h5>Show date</h5>
                                        <h5>{{ticketDate}}</h5>
                                    </div>
                                    <div class="col-6">
                                        <h5>Show time</h5>
                                        <h5>{{ticketTime}}</h5>
                                    </div>
                                </div>
                                <img class="card-img-bottom" src="../assets/qr1.png" style="max-height: 232px;width: auto" alt="Card image cap">
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
import axios from "axios";
export default {
  data() {
    return {
      store,
      users: {},
      error: null,
      dateCon: "",
      ticket: {},
      ticketZone: "",
      ticketDate: "",
      ticketTime: "",
    };
  },
  mounted() {
    this.getUser(this.$route.params.id);
  },
  methods: {
    getUser(userID){
      axios
        .get(`http://localhost:3000/users/${userID}`)
        .then((response) => {
          this.users = response.data.user;
          console.log(response.data)
          this.dateCon = String(response.data.user.concert_showtime).substring(0,10);

        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    eTicket(id){
      this.ticket = this.users[id]
      this.ticketZone = this.ticket.booking_seat.substring(0,1)
      this.ticketDate = this.ticket.concert_showtime.substring(0,10)
      this.ticketTime = this.ticket.concert_showtime.substring(11,16)
      console.log(this.ticket)
      console.log(id)
    }
  },
  name: "myticket",
};
</script>
<style>
p{
  font-size: 14px;
}
.modal-dialog{
    overflow-y: initial !important
}
.modal-body{
    height: 80vh;
    overflow-y: auto;
    padding: 30px;
}
th{
  font-size: 15px;
}
td{
  font-size: 14px;
}
</style>