<template> 
  <div> 
    <div class="container w-100 d-flex" style="height: 30vh"> 
      <div class="col-12"> 
        <div class="row"> 
          <div class="col-2"> 
            <img  
                :src="imagePath(image)" 
              alt="" 
              class="h-100" 
              style="position: absolute; top: 30px" 
            /> 
          </div> 
          <div class="col-8 mt-5"> 
            <h3 style="font-weight: bolder">{{concertName}}</h3> 
             <a href="https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select">รายละเอียดคอนเสิร์ต</a> 
            <div class="row"> 
                <div class="col-4"> 
                    <h5 class="d-flex" style="font-weight: bolder; margin-top: 10px"> 
                        รอบการแสดง 
                    </h5> 
                </div> 
                <div class="col-6 mt-2">     
                    <select class="form-select" aria-label="Default select example" v-model="valueshow"> 
                        <option selected disabled>เลือกรอบการแสดง</option> 
                        <option :value="showtime">{{showtime}}</option> 
                        <option :value="endtime">{{endtime}}</option> 
                    </select> 
                </div> 
            </div>                
          </div> 
          <div class="col-2 mt-5 text-center"> 
            <h2>ขั้นตอนที่</h2> 
            <h1 style="font-weight: bolder">1/4</h1> 
            <h4>เลือกรอบ & โซนการแสดง</h4> 
          </div> 
        </div> 
      </div> 
      <!-- <div class="message" style="position: absolute; left: 700px; top: 160px;"> 
            <h3 style="font-weight: bolder;">ชื่อคอนเสิร์ต</h3> 
            <a href="#" class="stretched-link" 
                style=" margin-top: 10px; font-size: 20px; color: black;">รายละเอียดคอนเสิร์ต</a> 
            <h5 class="d-flex" style="font-weight: bolder; margin-top: 10px;">รอบการแสดง 
                <div class="dropdown" style="left: 30px;"> 
                    <button class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" 
                        aria-haspopup="true" aria-expanded="false"> 
                        กรุณาเลือกรอบการแสดง 
                    </button> 
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2"> 
                        <button class="dropdown-item" type="button">วันจันทร์ที่ 1 มกราคม 2020 18.30</button> 
                        <button class="dropdown-item" type="button">วันอังคารที่ 2 มกราคม 2020 19.30</button> 
                    </div> 
                </div> 
            </h5> 
        </div> 
        <div class="stepNumber text-center" style="position: absolute; left: 1150px; top: 150px;"> 
            <h2>ขั้นตอนที่</h2> 
            <h1 style="font-weight: bolder;">1/4</h1> 
            <h4>เลือกรอบ & โซนการแสดง</h4> 
        </div> --> 
    </div> 
 
    <div class="blackBox w-100" style="height: 100vh; background-color: black"> 
      <!-- ชั้น 8 โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท --> 
      <div class="container"> 
        <div class="select-zone"> 
          <div class="row"> 
            <div class="col-8" style="padding-left: 6em"> 
              > 
              <div class="map-zone"> 
                <img src="../assets/zone(2).png" usemap="#"  /> 
                <map name="" id=""> 
                  <area 
                    shape="poly" 
                    coords="57,138,447,136,447,618,55,620" 
                    style="position: absolute; left: 7em" 
                    onclick="selectzone(this.href, event)" 
                    href="/seathotel" 
                    @click="next()" 
                    
                  /> 
                </map> 
              </div> 
            </div> 
            <div class="col-3" style="padding-top: 10em"> 
              <div class="card"> 
                <div class="card-header text-center font-weight-bold h5"> 
                  PRICING 
                </div> 
                <div class="card-body"> 
                  <div class="cyan"> 
                    <div class="row"> 
                      <div class="col-7"> 
                        <img 
                          src="../assets/cyan_hotelK.png" 
                          alt="" 
                          width="90vw" 
                        /> 
                      </div> 
                      <div class="col-5 mt-1"> 
                        <h5>xxx</h5> 
                      </div> 
                    </div> 
                  </div> 
                   
                   
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
        <!-- <p class="text-suggestion"><i>กรุณาคลิกที่ภาพเพื่อเลือกโซนที่นั่ง</i></p> --> 
        <!-- <a href="javascript:void(0);" class="box-suggestion" id="popup-suggestion" style="display: none;" 
                onclick="fn_hidePopupSuggestion(this);"> 
                <span class="box"> 
                    <span class="img"><img src="/assets/img/icon/booking-zone-suggestion.svg"></span> 
                    <span class="txt">ถ่างนิ้วเพื่อขยายแผนผังที่นั่ง และแตะเพื่อเลือกโซนที่ต้องการ</span> 
                </span> 
            </a> --> 
      </div> 
      <!-- <div class="pricing text-center" 
            style="width: 20vw; height: 40vh; background-color: white; border-radius: 8%; float: right; position: absolute; right: 400px; top: 430px;"> 
            <h4 class="mt-3" style="font-weight: bolder;">Pricing</h4> 
 
        </div> --> 
    </div> 
  </div> 
</template> 
<script> 
import axios from "axios"; 
import store from '../vuex/store'; 
export default { 
    store, 
  data() { 
    return { 
     concertName: '', 
      showtime: '', 
      endtime: '', 
      time: '', 
      valueshow: '', 
      image: '' 
    }; 
  }, 
  created() { 
    axios 
      .get("http://localhost:3000/hotel_K") 
      .then((response) => { 
       store.state.info = response.data 
       console.log(store.state.info[0].file_path) 
       this.image = store.state.info[0].file_path 
      }) 
      .catch((err) => { 
        console.log(err); 
      }); 
    this.concertName = store.state.concertName 
    this.showtime =  store.state.showtime.substring(0, 10) 
    this.endtime =  store.state.endtime.substring(0, 10) 
    this.time = store.state.endtime.substring(11, 16) 
     
     
 
  }, 
  methods:{ 
      next(){ 
        localStorage.setItem('valueshow', this.valueshow); 
      }, 
      imagePath(file_path) { 
      if (file_path){ 
        return 'http://localhost:3000/' + file_path 
      }  
      else { 
        return 'https://bulma.io/images/placeholders/640x360.png' 
      } 
    }, 
  } 
     
}; 
</script> 
 
