<template>
  <div class="event-billboard pb-5">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">{{ error }}</div>
      </div>
    </section>

      <!-- <div class="event-billboard" style="background-color: black;">
        <nav class="breadcrumb">
          <div class="container is-widescreen">
            <div class="row">
              <div class="col-12">
                <a href="/" class="item"><i>หน้าหลัก</i></a> ->
                <a href="/concert/" class="item"><i>คอนเสิร์ต</i></a> ->
                 <span class="title">{{ concert.concert_title }}</span>
              </div>
            </div>
          </div>
        </nav>
      </div> -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb  mb-0">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ concert.concert_title }}
          </li>
        </ol>
      </nav>
      <div class="event-billboard" style="background-color: black;">
        <div class="content container">
          <div class="row justify-content-center">
            <div class="col-12 col-sm col-img"  style="text-align: -webkit-center; margin-block: auto;">
              <div class="box-img" v-for="image in images" :key="image.id">
                <img
                  :src="'http://localhost:3000/' + image.file_path"
                  style="height: 300px; object-fit: cover"
                />
                <!-- countdown html -->
                <div class="box-ten-countdown" style="display:none;">
                  <div class="box-num">
                    <div class="num"></div>
                  </div>
                </div>
                <!-- / countdown html -->
              </div>
              <!-- รายละเอียด concert ข้างๆ -->
            </div>
            <div class="col-12 col-lg mt-4">
              <div class="box-txt" style="color: aliceblue;">
                <div class="row">
                  <div class="col-12">
                    <h3 class="title pt-2" style="color: aliceblue;">
                      {{ concert.concert_title }}
                    </h3>
                  </div>
                </div>
                <div class="row row-detail pt-2">
                  <div class="col-12 col-md">
                    <ul class="event-detail-list">
                      <li class="item">
                        <i class="fas fa-calendar-alt"></i
                        ><small> วันที่แสดง</small>
                        <p class="txt">
                          <span>{{date}}</span>
                        </p>
                      </li>
                      <li class="item">
                        <i class="fas fa-map-marker-alt"></i
                        ><small> สถานที่แสดง</small>
                        <p class="txt">
                          <span
                            ><p>{{locationName}}</p
                            ></span
                          >
                        </p>
                      </li>
                      <li class="item">
                        <i class="fas fa-clock"></i><small> ประตูเปิด</small>
                        <p class="txt">
                          <span>ก่อนการแสดงเริ่มประมาณ 30 นาที</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="col-12 col-md-6 col-overlay">
                    <ul class="event-detail-list">
                      <li class="item">
                        <i class="fas fa-calendar-check"></i
                        ><small> วันเปิดจำหน่าย</small>
                        <p class="txt">
                          <span>{{buy}}</span>
                        </p>
                      </li>
                      <li class="item">
                        <i class="fas fa-dollar-sign"></i
                        ><small> ราคาบัตร</small>
                        <div class="txt">
                          {{concert.price}} บาท
                        </div>
                      </li>
                      <li class="item">
                        <i class="fas fa-ticket-alt"></i>
                        <small> Ticket Status</small>
                        <p class="txt">
                          <span class="ticket-status inline available">
                            <span>{{ concert.concert_status}}</span>
                          </span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
                <div class="row">
                    <div class="col-12" >
                        <article class="event-detail">
                            <section class="section" id="section-event-round" >
                                <h2 class="head mt-4 mb-4" style="text-align: center;">ผังการแสดง &amp; รอบการแสดง </h2>
                                <div class="body" >
                                    <!-- EVENT ROUND -->
                                    <div class="event-detail-item" style="background-color: black; color:aliceblue; text-align: center;">
                                        <div class="box-img pt-2">
                                            <a href="/img_seat/prefix_1/2804/2804/2804-5fec7704d02ad-s.jpg" class="fancybox">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </a>
                                        </div>
                                        <div class="box-txt">
                                            <h2>{{locationName}} </h2><br>
                                            <div>
                                              <img :src="imagesLo" style="height: 100px; object-fit: cover" />
                                            </div><br>
                                            <p><small class="txt-gray">ราคาบัตร</small><br>{{concert.price}} บาท</p>

                                        </div>
                                        <div class="box-event-list" style="background-color: #222;">
                                            <div class="head">
                                                <div class="row" style="padding: 10px 0; border-bottom: 1px solid #000; margin: 0;">
                                                    <div class="col-label col-6"><small>วันที่แสดง</small></div>
                                                    <div class="col-btn col-6"><small>เวลา</small></div>
                                                </div>
                                            </div>
                                            <div class="body">
                                                <div class="row" style="padding: 10px 0; margin: 0;"> 
                                                    <div class="col-label col-6" style="align-self: center;">
                                                        <div class="date">{{date}}</div>
                                                    </div>
                                                    <div class="col-btn col-6" style="text-align: -webkit-center;">      
                                                        <span class="btn-item ">
                                                            <a id="but_buytic" class="btn btn-block ng-binding" >
                                                            <span class="item-show">{{time}} น.</span>
                                                            <!-- <span class="item-hide">ซื้อบัตร</span> -->
                                                            </a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- / EVENT ROUND  -->
                                    <h2 class="head mt-4 mb-4" style="text-align: center;">รายละเอียด</h2>
                                    <div>{{concert.concert_desc}}</div>
                                    
                                </div>
                            </section>
    
                        </article>
                    </div>
                </div>
            </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
export default {
  data() {
    return {
      concert: {},
      location: [],
      error: null,
      date: "",
      buy: "",
      time: "",
      locactionId: [],
      images: [],
      imagesLo: "",
      locationName:  "",
    };
  },
  mounted() {
    this.getConcertDetail(this.$route.params.id);
    
    
  },
  methods: {
    getConcertDetail(concertID) {
      axios
        .get(`http://localhost:3000/concerts/${concertID}`)
        .then((response) => {
          this.concert = response.data.concert
          this.images = response.data.images;
          this.locationId = this.concert.address_id;
          // console.log(this.concert)
          this.date = new Date(this.concert.concert_showtime).toLocaleDateString("th", { weekday: "short", year: "numeric", month: "short", day: "numeric",}) 
          this.time = new Date(this.concert.concert_showtime) .toLocaleDateString("th", { hour: "numeric",  minute: "numeric", }).slice(-5)
          this.buy = new Date(this.concert.buy_available).toLocaleDateString("th", { weekday: "short", year: "numeric", month: "short", day: "numeric",})   
          this.getLocation(this.locationId);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    getLocation(id){
      axios
        .get(`/location/${id}`)
        .then((response) => {
          this.location = response.data;

          this.imagesLo = response.data.image
          if(response.data.address_id == 1){
            this.locationName = "โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท"
          }
          if(response.data.address_id == 2){
            this.locationName = "ยูเนี่ยน ฮอลล์, ศูนย์การค้ายูเนี่ยน มอลล์"
          }
          if(response.data.address_id == 3){
            this.locationName = "ศูนย์วัฒนธรรมแห่งประเทศไทย หอประชุมใหญ่"
          }
          console.log(this.locationName)
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    }
  },
};
</script>
<style scoped>

p {
    font-family: 'Prompt', sans-serif;
    font-size: 14px;
    font-weight: bolder;
}

.bg {
    position:relative;
    background-position: 50% 0%;
    z-index: 6;
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    left: 0;
    /* filter: brightness(70%) blur(10px); */
}
.event-billboard .box-img {
    border-radius: 5px;
    margin-bottom: 15px;
    margin-top: 15px;
    overflow: hidden;
    box-shadow: 0 0 5px rgb(0 0 0 / 30%);
    position: relative;
}
.event-billboard .bg .img {
    background-position: 50% 0%;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}
#but_buytic{
    background-color: red;
    color: white;
    letter-spacing: 1.1px;
    width: 100px;
    border-radius: 20px;
}
a:hover, a:visited, a:link, a:active
{
    text-decoration: none;
}

</style>
