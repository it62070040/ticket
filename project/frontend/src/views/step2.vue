<template>
  <div>
    <div class="container w-100 d-flex" style="height: 30vh">
      <div class="col-12">
        <div class="row">
          <div class="col-2">
            <img
              :src="'http://localhost:3000/' + concerts.images[0].file_path"
              alt=""
              height="170px"
              style="position: absolute; top: 30px; right: 0px"
            />
          </div>
          <div class="col-7 mt-5 ml-5">
            <h3 style="font-weight: bolder">
              {{ concerts.concert.concert_title }}
            </h3>
            <a
              href="https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select"
              >รายละเอียดคอนเสิร์ต</a
            >
            <div class="row">
              <div class="col-3">
                <h5
                  class="d-flex"
                  style="font-weight: bolder; margin-top: 10px"
                >
                  รอบการแสดง :
                </h5>
              </div>
              <div class="col-8 mt-2">
                <h5>{{ new Date(concerts.concert.concert_showtime).toLocaleDateString("th", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}) }} น.</h5>
              </div>
            </div>
          </div>
          <div class="col-2 mt-5 text-center">
            <h2>ขั้นตอนที่</h2>
            <h1 style="font-weight: bolder">2/4</h1>
            <h4>เลือกที่นั่ง</h4>
          </div>
        </div>
      </div>
    </div>

    <div class="blackBox w-100" style="height: 150vh; background-color: black">
      <!-- ชั้น 8 โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท -->
      <div class="container">
        <div class="seat-body">
          <div class="row">
            <div class="col-8 pt-5">
              <div class="info d-flex">
                <div
                  class="icon correct d-flex"
                  style="position: absolute; left: 5em"
                >
                  <span class="icon">
                    <i
                      ><img
                        src="https://img.icons8.com/emoji/96/000000/check-mark-emoji.png"
                        style="width: 25px"
                    /></i>
                  </span>
                  <h3 style="color: white; font-size: 1.3em">
                    ที่นั่งที่เลือก
                  </h3>
                </div>
                <div
                  class="icon incorrect d-flex ml-3"
                  style="position: absolute; left: 15em"
                >
                  <span class="icon">
                    <i
                      ><img
                        src="https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png"
                        style="width: 25px"
                    /></i>
                  </span>
                  <h3 style="color: white; font-size: 1.3em">ที่นั่งไม่ว่าง</h3>
                </div>
                <div class="mt-5 mb-3">
                  <img
                    src="../assets/stageline.png"
                    alt=""
                    width="800vw;"
                    style="position: absolute; right: 8em"
                  />
                  <h5
                    class="text-white font-weight-bold mt-5"
                    style="position: absolute; left: 10em"
                  >
                    STAGE
                  </h5>
                </div>
              </div>


              <!-- hotel -->
              <div class="row" style="position: absolute; left: -5em; margin-right: 12em; margin-top: 5em" v-if="location.address_id == 1">
                <!-- zone A -->
                <div class="d-flex" v-for="(row, col) in seat_rows()" :key="col">
                  <p class="text-white" style="padding-right: 3em; margin-top: 3em;"  v-if="row.length > 0">{{col}}</p>
                  <a class="btn" style="padding: 0.12em; margin-top: 1.5em" v-for="seat in row" :key="seat">
                    <img src="../assets/seat.png" alt="" width="51vw" height="50vh" v-if="seat.status == 0" @click="click(seat.id)"/>
                    <img src="../assets/seat_bookings.png" alt="" width="51vw" height="52vh" v-if="seat.status == 2" @click="click(seat.id)"/> 
                    <img src="../assets/seat_full.png" class="isDisabled" alt="" width="51vw" height="53vh" v-if="seat.status == 1"/>
                  </a>
                 </div> 
              </div>

              <!-- union -->
              <div class="row" style="position: absolute; left: -5em; margin-right: 12em; margin-top: 5em" v-if="location.address_id == 2">
                <!-- zone A -->
                <div class="d-flex" v-for="(row, col) in seat_rows()" :key="col">
                  <p class="text-white" style="padding-right: 3em; margin-top: 3em;" v-if="row.length > 0">{{col}}</p>
                  <a class="btn" style="padding: 0.12em; margin-top: 1.5em" v-for="seat in row" :key="seat">
                    <img src="../assets/seat.png" alt="" width="39vw" height="48vh" v-if="seat.status == 0" @click="click(seat.id)"/>
                    <img src="../assets/seat_bookings.png" alt="" width="39vw" height="50vh" v-if="seat.status == 2" @click="click(seat.id)"/> 
                    <img src="../assets/seat_full.png" class="isDisabled" alt="" width="39vw" height="50vh" v-if="seat.status == 1"/> 
                  </a>
                </div>
              </div>

              <!-- centre -->
              <div class="row" style="position: absolute; left: -5em; margin-right: 12em; margin-top: 5em" v-if="location.address_id == 3">
                <!-- zone A -->
                <div class="d-flex" v-for="(row, col) in seat_rows()" :key="col">
                  <p class="text-white" style="padding-right: 3em; margin-top: 3em;" v-if="row.length > 0">{{col}}</p>         
                  <a class="btn" style="padding: 0.12em; margin-top: 1.5em" v-for="seat in row" :key="seat">
                    <img src="../assets/seat.png" alt="" width="34vw" height="45vh" v-if="seat.status == 0" @click="click(seat.id)"/>
                    <img src="../assets/seat_bookings.png" alt="" width="34vw" height="48vh" v-if="seat.status == 2" @click="click(seat.id)"/> 
                    <img src="../assets/seat_full.png" class="isDisabled" alt="" width="34vw" height="48vh" v-if="seat.status == 1"/> 
                </a>
                </div>
              </div>

            </div>

            <div class="col-4" style="padding-top: 10em">
              <div class="deatil">
                <div class="card" style="width: 30rem; border-radius: 5%">
                  <h5 class="card-header text-center font-weight-bold">
                    รายละเอียดการจอง
                  </h5>
                  <div class="card-body">
                    <!-- <h5 class="card-title">Special title treatment</h5> -->
                    <div class="row">
                      <div class="col font-weight-bold">
                        <p class="card-text">รอบการแสดง</p>
                        <p class="card-text">เวลาที่แสดง</p>
                        <p class="card-text">โซนที่นั่ง</p>
                        <p class="card-text">สถานะ</p>
                        <p class="card-text">ราคาบัตร</p>
                        <p class="card-text">จำนวนที่นั่ง</p>
                        <p class="card-text">เลขที่นั่ง</p>
                      </div>
                      <div class="col">
                        <div class="text-right">
                          <p class="card-text">{{new Date(concerts.concert.concert_showtime).toLocaleDateString("th", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) }}</p>
                          <p class="card-text">{{new Date(concerts.concert.concert_showtime).toLocaleDateString("th", { hour: 'numeric', minute: 'numeric'}).slice(-5)}} น.</p>
                          <p class="card-text">A</p>
                          <p class="card-text text-success">AVAILABLE</p>
                          <p class="card-text">{{countPrice}} บาท</p>
                          <p class="card-text">{{countChoose}}</p>
                          <p class="card-text">{{choose.toString()}}</p>
                        </div>
                      </div>
   
                    </div>
                    <div class="text-center">
                      <a class="btn btn-danger" @click="next()">ยืนยันที่นั่ง</a>
                    </div>
               
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/plugins/axios";
export default {
  props: ["user"],
  data() {
    return {
      concerts: null,
      location: null,
      // seatArray: null,
      alpha: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
      booked: null,
      allBooked: '',
      allBookedArray: [],
      seatStatus: [],
      choose: [],
      countChoose: 0,
      countPrice: 0,
      detail: []
      
    };
  },
  mounted() {
    this.getConcert(this.$route.params.id);
  },
  methods: {
    getConcert(id) {
      axios
        .get(`/concerts/${id}`)
        .then((response) => {
          // console.log(response.data)
          this.concerts = response.data;
          this.getLocaton(response.data.concert.address_id)
          this.getBooked(response.data.concert.concert_id)
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    getLocaton(id) {
      axios
        .get(`/location/${id}`)
        .then((response) => {
          this.location = response.data;
          let count = 0
          response.data.seat.split(" ").forEach((a) => {
              this.seatStatus.push({id: count,seat: a, status: 0})
              count++
          })
          this.seat_rows();
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    getBooked(id) {
      axios
        .get(`/booked/${id}`)
        .then((response) => {
          this.booked = response.data
          this.booked.forEach((a) => {
            this.allBooked += (a.booking_seat + ' ')
          })
          this.allBookedArray = this.allBooked.split(' ')
          this.allBookedArray.pop()
          this.seatStatus.forEach((e) => {
            this.allBookedArray.filter((a) => {
                if(a == e.seat){
                    e.status = 1
                }
            })

          })
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    click(id){
        if(this.seatStatus[id].status == 0){
            this.seatStatus.filter((a) => {
            if(a.id == id){
                this.seatStatus[id].status = 2
            }
            })
            this.choose.push(this.seatStatus[id].seat)
            this.countChoose = this.choose.length
            this.countPrice += this.concerts.concert.price
        }
        else{
            this.seatStatus.filter((a) => {
            if(a.id == id){
                this.seatStatus[id].status = 0
            }
            })
            this.choose.splice(this.choose.indexOf(id), 1)
            this.countChoose = this.choose.length
            this.countPrice -= this.concerts.concert.price
        }
        
    },
    seat_rows() {
      var rows = {};
      this.alpha.forEach((a) => {
        let row = [];



        this.seatStatus.forEach((e) => {
          if (e.seat.startsWith(a)) {
            row.push(e);
          }
        });



        rows[a] = row;
      });
      return rows;
    },
    next(){
      
      if(this.choose.length > 4){
        alert("เลือกได้สูงสุด 4 ที่")
      }
      else if(this.choose.length > 0 && this.choose.length < 5){
        this.detail.push({choose: this.choose, countChoose: this.countChoose, countPrice: this.countPrice})
        location.href =`http://localhost:8080/step3/${this.concerts.concert.concert_id}`
        localStorage.setItem('detail', JSON.stringify(this.detail))
      }
      else{
        alert("กรุณาเลือกที่นั่ง")
      }
    }
  },
};
</script>
<style scoped> 
.isDisabled{ 
  color: currentColor; 
  cursor: not-allowed; 
  opacity: 0.5; 
} 
</style> 
 