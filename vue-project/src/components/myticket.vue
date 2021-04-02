<template>
  <div class="col-9">
    <div class="p-5" v-show="store.state.col1">

      <h3>ตั๋วของฉัน</h3>
      <div class="card" style="width: 18rem; background-color: #f4f4f4;">
        <img class="card-img-top" src="xxx.png" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">ขื่อคอนเสิร์ต</h5>
          <p class="card-text">
            โซน a1 <br>
            ที่นั่ง e-09 <br>
            สถานที่แสดง อิมแพ็ค <br>
            วันที่แสดง 18.30 <br>
            เวลาที่แสดง 18.30 <br>
            ราคา 3000 บาท

          </p>
          <a href="#" class="btn btn-primary">E-TICKET</a>
        </div>
      </div>

    </div>

    <div class="p-5" v-show="store.state.col2">
      <h3>ประวัติการสั่งซื้อ</h3>
      <span style="font-weith: bold">งานแสดง</span>
    </div>

    <div class="p-5" v-show="store.state.col3">
      <h3>แก้ไขข้อมูลส่วนตัว</h3>
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
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >ชื่อผู้ใช้</label
          >
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
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">ยืนยันรหัสผ่านใหม่</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" />
          </div>
        </div>
        <button type="submit" class="btn btn-danger">บันทึก</button>
      </form>
    </div>
  </div>
</template>
<script>
import store from "@/vuex/store.js";
export default {
  data() {
    return {
      store,
    };
  },
  methods: {},
  name: "myticket",
};
</script>