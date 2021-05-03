<template>
    <div>
        <div class="container w-100 d-flex" style="height: 30vh"> 
      <div class="col-12"> 
        <div class="row"> 
          <div class="col-2"> 
            <img  
                 :src="'http://localhost:3000/'+concerts.images[0].file_path"
              alt="" 
              height="170px"
              style="position: absolute; top: 30px; right: 0px;" 
            /> 
           
          </div> 
          <div class="col-7 mt-5 ml-5"> 
            <h3 style="font-weight: bolder">{{concerts.concert.concert_title}}</h3> 
            
             <a href="https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select">รายละเอียดคอนเสิร์ต</a> 
            <div class="row"> 
                <div class="col-3"> 
                    <h5 class="d-flex" style="font-weight: bolder; margin-top: 10px"> 
                        รอบการแสดง :
                    </h5> 
                </div> 
                <div class="form-group col-6 mt-2">     
                    <select class="form-control" aria-label="Default select example" v-model="valueshow"> 
                        <option selected disabled>เลือกรอบการแสดง</option> 
                        <option :value="showtime">{{new Date(concerts.concert.concert_showtime).toLocaleDateString("th", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) }}</option> 
                        <!-- <option :value="endtime">{{concerts.concert.concert_endtime}}</option>  -->
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
              <div class="map-zone"> 
                <img :src="location.image" usemap="#"  /> 
                <map name="" id=""> 
                  <area 
                    shape="poly" 
                    coords="57,138,447,136,447,618,55,620" 
                    style="position: absolute; left: 7em" 
                    onclick="selectzone(this.href, event)" 
                    :href ="'http://localhost:8080/step2/' + concerts.concert.concert_id"
                    
                    
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
                      <div class="col-6"> 
                        <img 
                          src="" 
                          alt="" 
                          width="90vw" 
                        /> 
                      </div> 
                      <div class="col-5 mt-1"> 
                        <h6>xxx บาท</h6> 
                        
                      
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
    </div>
</template>
<script>
import axios from '@/plugins/axios';
export default {
    data(){
        return{
           concerts: null,
           location: null,
           seatArray: null,
        };
    },
    mounted() {
    this.getConcert(this.$route.params.id);
  },
  methods:{
      getConcert(id) {
      axios
        .get(`/concerts/${id}`)
        .then((response) => {
          console.log(response.data)
          this.concerts = response.data
          this.getlocation(response.data.concert.address_id)
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    getlocation(id){
      axios
        .get(`/location/${id}`)
        .then((response) => {
          this.location = response.data
          this.seatArray = (response.data.seat).split(" ")
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    }
  }
    
}
</script>

