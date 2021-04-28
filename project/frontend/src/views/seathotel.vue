<template> 
  <div> 
    <div class="container w-100 d-flex" style="height: 30vh"> 
      <div class="col-12"> 
        <div class="row"> 
          <div class="col-2"> 
           <img  
                src="../assets/dept.jpg" 
              alt="" 
              height="170px"
              style="position: absolute; top: 30px; right: 0px;" 
            /> 
            <!-- <img  
                :src="imagePath(image)" 
              alt="" 
              class="h-100" 
              style="position: absolute; top: 30px" 
            />  -->
          </div> 
          <div class="col-7 mt-5  ml-5"> 
            <h3 style="font-weight: bolder">dept</h3> 
            <!-- <h3 style="font-weight: bolder">{{concertName}}</h3>  -->
            <a href="https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select">รายละเอียดคอนเสิร์ต</a> 
            <div class="row"> 
                <div class="col-3"> 
                    <h5 class="d-flex" style="font-weight: bolder; margin-top: 10px"> 
                        รอบการแสดง :
                    </h5> 
                </div> 
                <div class="col-8 mt-2">     
                    <h5>วันอังคารที่ 1 มิถุนายน 2021 21.10 น.</h5>
                 
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
 
    <div 
      class="blackBox w-100" 
      style="height: 150vh; background-color: black" 
    > 
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
 
              <!-- {{ seat_rows }} --> 
 
              <div class="row" style="margin-right: 12em; margin-top: 5em"> 
                <!-- zone A --> 
                <div v-for="(row, col) in seat_rows" :key="col"> 
                  <a href="#" class="btn"> 
                    <p class="mt-2 text-white" style="position: absolute; right: 50em;">{{ col }}</p> 
                    <!-- <p class="mt-2 colorAB" style="position: absolute; right: 50em;" v-show="col == 'A' || col == 'B'">{{ col }}</p> 
                    <p class="mt-2 colorCD" style="position: absolute; right: 50em;" v-show="col == 'C' || col == 'D'">{{ col }}</p> 
                    <p class="mt-2 colorEF" style="position: absolute; right: 50em;" v-show="col == 'E' || col == 'F'">{{ col }}</p> 
                    <p class="mt-2 colorGH" style="position: absolute; right: 50em;" v-show="col == 'G' || col == 'H'">{{ col }}</p> 
                    <p class="mt-2 colorIJKL" style="position: absolute; right: 50em;" v-show="col == 'I' || col == 'J' || col == 'K' || col == 'L'">{{ col }}</p> --> 
                  </a> 
                  <a href="#" class="btn" style="padding: 0; margin-top: 1.5em" v-for="(item) in row" :key="item.seat_id"> 
                  <!-- {{item}} --> 
                    <img src="../assets/seat.png" alt="" width="50vw" height="50vh" v-show="item.status == '0'" @click="chooseSeat(item.seat_id)"/> 
                    <img src="../assets/seat_bookings.png" alt="" width="50vw" height="50vh" v-show="item.status == '1'" @click="deleteSeat(item.seat_id)" /> 
                    <img  src="../assets/seat_full.png" alt="" width="50vw" height="50vh" v-show="item.status == '2'"  class="isDisabled"/> 
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
                          <p class="card-text">วันอังคารที่ 1 มิถุนายน 2021</p> 
                          <p class="card-text"> 21.10 น.</p> 
                          <p class="card-text">A</p> 
                          <p class="card-text text-success" >AVAILABLE</p> 
                          <p class="card-text">500</p> 
                          <p class="card-text">{{count_seat}}</p> 
                          <p class="card-text">{{all_seat.toString()}}</p> 
                        </div> 
                      </div> 
                      <!-- <div class="col"> 
                        <div class="text-right"> 
                          <p class="card-text">{{valueshow}}</p> 
                          <p class="card-text">{{time}}</p> 
                          <p class="card-text">{{zone}}</p> 
                          <p class="card-text text-success" >AVAILABLE</p> 
                          <p class="card-text">{{count_price}}</p> 
                          <p class="card-text">{{count_seat}}</p> 
                          <p class="card-text">{{all_seat.toString()}}</p> 
                        </div> 
                      </div>  -->
                    </div> 
                    <div class="text-center"> 
                      <a href="#" class="btn btn-danger">ยืนยันที่นั่ง</a> 
                    </div> 
                    <!-- <div class="text-center mt-2"> 
                      <a href="#" class="btn btn-light">เลือกโซนอื่น</a> 
                    </div> --> 
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
import axios from "axios"; 
import store from '../vuex/store'; 
export default { 
  store, 
  created() { 
    axios 
      .get("http://localhost:3000/seathotel") 
      .then((response) => { 
        this.x = response.data; 
          
        console.log(this.x); 
      }) 
      .catch((err) => { 
        console.log(err); 
      }); 
      this.local = JSON.parse(localStorage.getItem('concert')) 
      // console.log(this.local) 
      // this.concertName = store.state.concert 
      
      // this.showtime =  store.state.showtime.substring(0, 10) 
      // this.endtime =  store.state.endtime.substring(0, 10) 
      // this.time = store.state.endtime.substring(11, 16) 
      // this.valueshow = localStorage.getItem('valueshow') 
       
  }, 
  computed: { 
    seat_rows() { 
      var rows = {}; 
      this.alpha.forEach((a) => { 
        let row = []; 
        // console.log(a); 
        this.x.forEach((e) => { 
          if (e.seat_id.startsWith(a)) { 
            row.push(e); 
          }  
          // else { 
          //   // console.log(`${e.seat_id} is not start with ${a.toUpperCase()}`) 
          // } 
        }); 
        rows[a] = row; 
         
      }); 
      return rows; 
       
    }, 
  }, 
  methods:{ 
    chooseSeat(id){ 
      let change = this.x.filter((b)=>{ return b.seat_id == id }) 
      change[0].status = '1' 
      this.all_seat.push(change[0].seat_id) 
      this.count_seat = this.all_seat.length 
      this.count_price += change[0].pricing 
      
       
    }, 
    deleteSeat(id){ 
      let change = this.x.filter((b)=>{ return b.seat_id == id }) 
      change[0].status = '0' 
      this.all_seat.splice(this.all_seat.indexOf(id), 1) 
      this.count_seat = this.all_seat.length 
      this.count_price -= change[0].pricing 
    } 
  }, 
 
  data() { 
    return { 
      alpha: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], 
      x: [], 
      all_seat: [], 
      count_seat: 0, 
      count_price: 0, 
     concertName: '', 
      showtime: '', 
      endtime: '', 
      time: '', 
      zone: 'A', 
      valueshow: '', 
      local: [] 
    }; 
  }, 
}; 
</script> 
<style scoped> 
.isDisabled{ 
  color: currentColor; 
  cursor: not-allowed; 
  opacity: 0.5; 
} 
/* .colorAB{ 
  color: #94dbdc; 
} 
.colorCD{ 
  color: #ffee07; 
} 
.colorEF{ 
  color: #fd871b; 
} 
.colorGH{ 
  color: #ff9ad8; 
} 
.colorIJKL{ 
  color: #99b83c; 
} */ 
</style> 
 
