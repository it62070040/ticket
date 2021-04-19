<template>
  <div class="box pb-5">
    <!-- slide img -->
    <div
      class="container-fluid mx-auto"
      style="background-color: black; margin: 0px 0px 0px 0px"
    >
      <div
        class="box mx-auto"
        style="width: 60vw; height: auto; margin: 0px 0px 0px 0px"
      >
        <div
          id="carouselExample1"
          class="carousel slide z-depth-1-half"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                class="d-block w-100"
                src="../assets/bts1.jpg"
                alt="First slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="../assets/bts2.jpg"
                alt="Second slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="../assets/cats1.png"
                alt="Third slide"
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExample1"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExample1"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>

<div class="columns">
          <div class="column is-half">
            <input class="input" type="text" v-model="search" placeholder="Search blog(s)">
          </div>
          <div class="column is-half">
            <button @click="getConcert" class="button">Search</button>
          </div>
        </div>
    <!-- show concert -->
    <div class="container">
      <div class="row mx-auto">
        <h4 class="m-4">คอนเสิร์ต</h4>
        <!-- dropdown -->
        <div class="btn-group m-4 mr-0   ml-auto">
          <button
            type="button"
            class="btn btn-danger dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            เรียงลำดับ
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">วันแสดง</a>
            <a class="dropdown-item" href="#">ชื่อการแสดง</a>
            <a class="dropdown-item" href="#">การแสดงมาใหม่</a>
            <!-- <div class="dropdown-divider"></div> -->
          </div>
        </div>
      </div>
      <div class="row mx-auto">
        <div class="col-4 col-md-3 col-lg-2 pb-4" v-for="concert in concerts" :key="concert.id" >
          <div class="card" style="position:relative; border-style: hidden;">
            <div id="card-img-top"  style="height: 150px; width: auto; background-position: center;">
              <img  :src="imagePath(concert.file_path)" alt="image cap">
            </div>
            <div class="card-body" style="min-height:200px; padding: 0.5rem;">
                <p class="card-title pt-2" >{{ concert.concert_title }}</p>
                <p class="card-text" style="height:10px; font-weight: 500;" :value="date">{{ concert.concert_showtime}}</p>
                <!-- <p class="card-text" >{{findDate}}</p> -->
                <p class="card-text" style="height:20px; font-weight: 500;">
                  {{ concert.concert_address }}
                </p>
              <div class="text-center" >
                <a href="#" class="btn btn-outline-danger">ซื้อบัตร</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal login -->
        <div class="modal fade" tabindex="-1" role="dialog" id="modalLogin" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <!-- <div class="modal-header">
                  <h5 class="modal-title">Modal title</h5>
                </div> -->
                    <div class="modal-body ">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class="close-but" title="Close" aria-hidden="true">&times;</span>
                        </button>
                        <img class="mx-auto" src="../assets/logo.png" alt="logo" style="width: 10vw; display: block;">
                        <h3 class="text-center mt-3">เข้าสู่ระบบ</h3>
                        <form>
                            <div class="form-group">
                                <input type="email" class="form-control mt-5" id="" aria-describedby="emailHelp"
                                    placeholder="อีเมล">
                                <input type="password" class="form-control mt-3" id="" placeholder="รหัสผ่าน">
                            </div>
                            <button type="submit" class="btn btn-danger mx-auto"
                                style="display: block;">เข้าสู่ระบบ</button>
                            <a href="#" class="btn mx-auto text-muted" style=" display: block;">ลืมรหัสผ่าน</a>
                           
                            <hr class="my-0">
                        </form>
                        <div class="text-center mt-3">
                            <h6>หากท่านยังไม่ได้เป็นสมาชิก</h6>
                            <a href="#" class="text-danger" data-dismiss="modal"  data-toggle="modal" data-target="#modalRegister">กรุณาสมัครสมาชิก</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal register -->
        <div class="modal fade"  role="dialog" id="modalRegister" aria-hidden="true">
            <div class="modal-dialog" role="document" >
                <div class="modal-content">
                    <div class="modal-body" style="padding: 30px;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class="close-but" aria-hidden="true" >&times;</span>
                        </button>
                        <img class="mx-auto" src="../assets/logo.png" alt="logo" style="width: 10vw; display: block;">
                        <h3 class="text-center 
                        mt-3">สมัครสมาชิก</h3>
                        <small id="" class="form-text text-muted text-center">กรุณากรอกข้อมูลให้ครบถ้วน</small>
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control mt-5 " id="" placeholder="ชื่อ">
                                <input type="text" class="form-control mt-3" id="" placeholder="นามสกุล">
                                <input type="text" class="form-control mt-3" id="" placeholder="ชื่อบัญชีผู้ใช้">
                                <input type="email" class="form-control mt-3" id="" aria-describedby="emailHelp"
                                    placeholder="อีเมล">
                                <input type="password" class="form-control mt-3" id="" placeholder="รหัสผ่าน">
                                <input type="password" class="form-control mt-3" id="" placeholder="ยืนยันรหัสผ่าน">
                                <label for="" class="mt-3">ที่อยู่</label>
                                <textarea class="form-control " id="" rows="2"></textarea>
                                <input type="text" class="form-control mt-3" id="" placeholder="เบอร์โทรศัพท์">
                            </div>
                            
                            <button type="submit" class="btn btn-danger mx-auto"
                                style="display: block;">สมัครสมาชิก</button>
                           <hr class="my-0">     
                        </form>
                        <div class="text-center mt-3">
                            <h6>หากท่านเป็นสมาชิกอยู่แล้ว</h6>
                            <a href="#" class="text-danger" data-dismiss="modal"  data-toggle="modal" data-target="#modalLogin">กรุณาเข้าสู่ระบบ</a>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      concerts: [],
      search: '',
      images: [],
      date: null,
      error: null,

    };
  },
  mounted () {
    this.getConcert()
  },
  methods: {
    getConcert() {
      axios
        .get("http://localhost:3000", {
          params: {
            search: this.search
          }
        })
        .then((response) => {
          this.concerts = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path){
        return 'http://localhost:3000/' + file_path
      } 
      else {
        return 'https://bulma.io/images/placeholders/640x360.png'
      }
    },
    shortContent(content) {
      if (content.length > 200) {
        return content.substring(0, 197) + '...'
      }
      return content
    },
  }
};
</script>

<style scoped>
.card-text{
  font-size: 12px;
  line-height: 13pt;
}
.card-title{
  height:60px; 
  font-size:14px; 
  font-weight: 600; 
  line-height: 13pt;
  overflow: hidden;
}
#card-img-top img{
  max-width: 100%;
  max-height: 100%;
  margin: auto auto;
  display: block;
}
.modal-dialog{
    overflow-y: initial !important
}
.modal-body{
    height: 80vh;
    overflow-y: auto;
    padding: 30px;
}
.close-but{
  position: absolute;
  top: 4px; 
  right: 4px; 
  width: 32px;  
  height: 32px;
}
.card:hover,.card-title:hover{
    /* background-color: #ffd0d0; */
    transition: .5s;
    color: red;
    cursor: pointer;
}
</style>