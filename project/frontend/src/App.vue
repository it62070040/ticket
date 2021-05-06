
<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" >
        <img src="http://localhost:3000/uploads/logo.png" width="30" height="auto" alt="" />
      </a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/">
              <a class="nav-link" >หน้าแรก</a>
            </router-link>
          </li>
        </ul>
        <router-link to="/create">
          <button
            type="button"
            class="btn btn-danger"
            v-if="user && user.user == 'sell'"

          >
            New Concert
          </button>
        </router-link>
        <form class="form-inline my-lg-0">
          <ul class="navbar-nav mr-auto">
            <!-- <li class="nav-item">
              <a class="nav-link" >
                <span class="icon">
                  <i
                    ><img
                      src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
                      style="width: 25px"
                  /></i>
                </span>
              </a>
            </li> -->
            <!-- <li class="nav-item">
              <a class="nav-link" >
                <span class="icon">
                  <i
                    ><img
                      src="https://img.icons8.com/pastel-glyph/64/000000/fast-delivery--v1.png"
                      style="width: 25px"
                  /></i>
                </span>
              </a>
            </li> -->
            <!-- <li class="nav-item">
              <a class="nav-link" >
                <span class="icon">
                  <i
                    ><img
                      src="https://img.icons8.com/material-rounded/24/000000/appointment-reminders.png"
                      style="width: 25px"
                  /></i>
                </span>
              </a>
            </li> -->
            <li class="nav-item dropdown" v-if="user && user.user == 'cus'" style="cursor: pointer">
        <a class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{user.fname}} {{user.lname}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown" >
          <router-link  class="dropdown-item" :to="`/user/${user.user_id}`">ข้อมูลของฉัน</router-link>

          <!-- <a class="dropdown-item" @click="showMyOrder()">ประวัติการสั่งซื้อ</a> -->
          <div class="dropdown-divider"></div>
          <!-- <a class="dropdown-item" >แก้ไขข้อมูลส่วนตัว</a> -->
          <a class="dropdown-item"  @click="logout()">ออกจากระบบ</a>
        </div>
      </li>
      <li class="nav-item dropdown" v-if="user && user.user == 'sell'">
        <a class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{user.fname}} {{user.lname}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link  class="dropdown-item" :to="`/myconcert/${user.user_id}`">ข้อมูลคอนเสิร์ตของฉัน</router-link>
          <!-- <a class="dropdown-item" @click="showCheckOrder()">ตรวจสอบคำสั่งซื้อจากลูกค้า</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" @click="showEditProfile()">แก้ไขข้อมูลส่วนตัว</a> -->
          <div class="dropdown-divider"></div>
          <a class="dropdown-item"  @click="logout()">ออกจากระบบ</a>
        </div>
      </li>
            <button
              type="button"
              class="btn btn-danger"
              data-toggle="modal"
              data-target="#modalLogin"
              v-if="!user"
            >
              เข้าสู่ระบบ
            </button>
          </ul>
        </form>
      </div>
    </nav>
    <router-view
      :key="$route.fullPath"
      @auth-change="onAuthChange"
      :user="user"
    />
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import store from "./vuex/store"; // import the store we just created
export default {
  data() {
    return {
      store,
      user: null,
    };
  },
  mounted() {
    this.onAuthChange();
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      const token = localStorage.getItem("token");
      axios
        .get("/user/me", { headers: { Authorization: "Bearer " + token } })
        .then((res) => {
          this.user = res.data;
          console.log(res.data.user_id)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout(){
      localStorage.clear()
      location.reload();
    },
    

  },
};
</script>
<style>
a:hover, a:visited, a:link, a:active
{
    text-decoration: none;
}

</style>
