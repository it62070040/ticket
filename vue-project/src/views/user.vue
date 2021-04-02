<template>
  <div class="container-fluid p-3">
    <div class="row mt-3">
      <div
        class="col-3 justify-content-center d-flex"
        style="border-color: gray;"
      >
        <div class="profile">
          <div class="mb-3 " style="background-color: #f4f4f4;padding: 20px;">
            <b>ชื่อ นามสกุล</b>
            <span class="d-block">email</span>
          </div>
          <div class="mb-5 ">
            <span class="icon d-block" @click="showTicket()" style="padding-right: 35px">
                ตั๋วของฉัน
            </span>
            <span class="icon d-block " @click="showHistory()">
               ประวัติการสั่งซื้อ
            </span>
            <hr style="background-color: #f4f4f4;" />
            <span class="icon d-block" @click="showEditProfile()" style="padding-left: 20px">
              แก้ไขข้อมูลส่วนตัว
            </span>
            <hr style="background-color: #f4f4f4;" />
            <a class="dropdown-item" href="#">ออกจากระบบ</a>
          </div>
        </div>
      </div>
      <myticket />
    </div>
  </div>
</template>
<script>
import myticket from "../components/myticket";
import store from "@/vuex/store.js";
export default {
  data() {
    return {
      store,
    };
  },
  components: {
    myticket,
  },
  methods: {
    showTicket() {
      this.store.state.col1 = true;
      this.store.state.col2 = false;
      this.store.state.col3 = false;
      this.store.state.col4 = false;
    },
    showHistory() {
      this.store.state.col1 = false;
      this.store.state.col2 = true;
      this.store.state.col3 = false;
      this.store.state.col4 = false;
    },
    showEditProfile() {
      this.store.state.col2 = false;
      this.store.state.col1 = false;
      this.store.state.col3 = true;
      this.store.state.col4 = false;
    },
  },
};
</script>