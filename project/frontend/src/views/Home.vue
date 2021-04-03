<template>
  <div class="container">
    <section id="app">
            <!-- slide img -->
            <div class="box mx-auto" style="width: 700px; height: 400px; margin: 0px 0px 0px 0px;">
                <div id="carouselExample1" class="carousel slide z-depth-1-half" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src="" alt="First slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="" alt="Second slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="" alt="Third slide">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExample1" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExample1" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>

            <!-- show concert -->
            <!-- <div class="mt-5 text-center" >
                
                <button type="button" class="btn p-3" style="font-size: 20px; background-color: #f15e60; color:white;">
                    <span>รายการคอนเสิร์ต</span>
                </button>
            </div> -->
            <div class="header-section header-event-cate">
      <div class="row align-items-center">
        <h1 class="head col mt-3" style="background-color: #f15e60;">รายการคอนเสิร์ต</h1>
        <div class="box-right col-auto txtR">
          <div class="row no-gutters">
            <div class="box-sort col">
              <div class="row no-gutters align-items-center">
                
                <div class="col">
                  <div class="dropdown">
                    <button
                      class="btn  dropdown-toggle"
                       style="background-color: #d9d9d9; color:white;"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      เรียงตาม
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item" href="#">วันที่แสดง</a>
                      <a class="dropdown-item" href="#">ชื่อการแสดง</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            <div class="concert">
                <div class="row">
                    <div class="col-3 pt-2" v-for="item in concerts" v-bind:key="item.concert_id">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top" :src="'http://localhost:3000/' + item.concert_image">
                            <div class="card-body">
                                <h5 class="card-title">{{item.concert_title}}</h5>
                                <p class="card-text">{{item.concert_showtime}}</p>
                                <p class="card-text">{{item.concert_address}}</p>
                                <div class="text-center"><a href="" class="btn btn-outline-danger">ซื้อตั๋ว</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
       </div>
</template>

<script>
import axios from "axios";
export default {
    created() {
    axios.get("http://localhost:3000/")
        .then((response) => {
          this.concerts = response.data;
          this.conimg = response.data;
          console.log(this.concerts)
        })
        .catch((err) => {
          console.log(err);
        });
},
    data() {
      return {
          conimg: null,
          concerts: null
      }
    }
  }
</script>

<style scoped>
</style>