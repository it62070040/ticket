<template>
  <div class="container-fluid p-3">
    <div class="row mt-3">
      <div
        class="col-4 justify-content-center d-flex"
        style="border-color: gray;"
      >
        <div class="profile">
          <div class="mb-3 pt-3 pb-2 text-center" style="background-color: #f4f4f4;width: 13em;">
            <b >{{user.fname}} {{user.lname}}</b>
            <p >{{user.email}}</p>
          </div>
          <div class="mb-5">
            <span class="icon d-block pl-2" style="cursor: pointer;" @click="showTicket()" >
              <i class="fa fa-ticket"></i>
                ตั๋วของฉัน
            </span>
            <span class="icon d-block pl-2" style="cursor: pointer;" @click="showHistory()">
              <i class="fa fa-ticket"></i> ประวัติการสั่งซื้อ
            </span>
            <hr style="background-color: #f4f4f4;" />
            
            <span class="icon d-block pl-2" style="cursor: pointer;" @click="showEditProfile()">
              <i class="fa fa-ticket"></i>
              แก้ไขข้อมูลส่วนตัว
            </span>

            <hr style="background-color: #f4f4f4;" />
              <span class="icon d-block pl-2" style="cursor: pointer;">
              <i class="fa fa-ticket"></i>
              ออกจากระบบ
            </span>
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
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      store,
      user: {},
      error: null,
    };
  },
  mounted() {
    this.getUser(this.user.user_id);
  },
  components: {
    myticket,
  },
  methods: {
    getUser(userID){
      axios
        .get(`/user/${userID}`)
        .then((response) => {
          this.user = response.data;

        })
        .catch((err) => {
            alert(err.response.data.details.message);
          });

    },
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
<style scoped>
span:hover{
  background-color: rgb(213, 213, 213);
}
</style>