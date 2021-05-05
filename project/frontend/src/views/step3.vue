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
              style="position: absolute; top: 30px; right: 0px;" 
            /> 
          </div> 
          <div class="col-7 mt-5  ml-5"> 
           <h3 style="font-weight: bolder">{{ concerts.concert.concert_title }}</h3>
            <a href="https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select">รายละเอียดคอนเสิร์ต</a> 
            <div class="row"> 
                <div class="col-3"> 
                    <h5 class="d-flex" style="font-weight: bolder; margin-top: 10px"> 
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
            <h1 style="font-weight: bolder">3/4</h1> 
            <h4>เลือกชนิดบัตร & ชำระเงิน</h4> 
          </div> 
        </div> 
      </div> 
    </div> 
 
    <div class="blackBox w-100" style="height: 100vh; background-color: black;"> 
            <div class="container"> 
                <div class="row"> 
                    <div class="col-8 pt-5" style=""> 
                        <div class="card" style="width: 30rem; border-radius: 5%;" > 
                            <h5 class="card-header text-center font-weight-bold">กรุณาเลือกชนิดบัตร</h5> 
                            <div class="card-body text-center" > 
                                <a class="btn p-0" @click="addETicket()"> 
                                    <div class="e-ticket px-5" style="border:0.3em solid #d9d9d9; border-radius: 0.5em;" :style="{'background-color' : statusOfbtn ? '#d9d9d9':'white'}" > 
                                        <img src="../assets/e-tic.png" alt="" width="60vw" height="70vh" class="rounded" > 
                                        <h5>E-TICKET</h5> 
                                    </div> 
                                </a> 
                                <a class="btn p-0 ml-3" @click="addCTicket()"> 
                                    <div class="e-ticket px-5" style="border:0.3em solid #d9d9d9; border-radius: 0.5em;" :style="{'background-color' : statusOfbtnC ? '#d9d9d9':'white'}"> 
                                        <img src="../assets/c-tic.png" alt="" width="60vw" height="70vh" class="rounded" > 
                                        <h5>C-TICKET</h5> 
                                    </div> 
                                </a> 
                            </div> 
                        </div> 
 
                        <div class="card mt-5" style="width: 40rem; border-radius: 5%; position: absolute; left: -3em;"> 
                            <h5 class="card-header text-center font-weight-bold">กรุณาเลือกวิธีชำระเงิน</h5> 
                            <div class="card-body text-center"> 
                                <a class="btn p-0" @click="addEPayment()"> 
                                    <div class="e-ticket px-5" style="border:0.3em solid #d9d9d9; border-radius: 0.5em;" :style="{'background-color' : statusOfbtn2 ? '#d9d9d9':'white'}" > 
                                        <img src="../assets/mobile-b.png" alt="" width="60vw" height="70vh" class="rounded mt-1" > 
                                        <h5>MOBILE BANKING</h5> 
                                    </div> 
                                </a> 
                                 <!-- <a class="btn p-0 ml-3"> 
                                    <div class="e-ticket px-5" style="border:0.3em solid #d9d9d9; border-radius: 0.5em;"> 
                                        <img src="../assets/credit card.png" alt="" width="60vw" height="70vh" class="rounded mt-1" > 
                                        <h5>CREDIT CARD</h5> 
                                    </div> 
                                </a>  -->
                            </div> 
                        </div> 
                  
                         
 
                    </div> 
                    <div class="col-4 pt-5"> 
                        <div class="deatil"> 
                            <div class="card" style="width: 30rem; border-radius: 5%;"> 
                                <h5 class="card-header text-center font-weight-bold">รายละเอียดการจอง</h5> 
                                <div class="card-body"> 
                                    <h3 class="card-title text-center font-weight-bold">{{ concerts.concert.concert_title }}</h3> 
                                    <!-- <h3 class="card-title text-center font-weight-bold">ชื่อคอนเสิร์ต</h3>  -->
                                    <h6 class="card-title text-center">{{concerts.concert.concert_address}}</h6> 
                                    <!-- <h6 class="card-title text-center">สถานที่แสดง</h6>  -->
                                    <h4 class="card-title text-center font-weight-bold">รอบการแสดง</h4> 
                                    <h5 class="card-title text-center font-weight-bold text-danger">{{ new Date(concerts.concert.concert_showtime).toLocaleDateString("th", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}) }} น.</h5> 
                                    <div class="row"> 
                                        <div class="col"> 
                                            <p class="card-text">โซนที่นั่ง</p> 
                                            <p class="card-text">เลขที่นั่ง</p> 
                                            <p class="card-text">จำนวนที่นั่ง</p> 
                                            <p class="card-text">ราคาบัตร</p> 
                                            <p class="card-text">ชนิดบัตร</p> 
                                            <p class="card-text">วิธีการชำระเงิน</p> 
                                            <p class="card-text">จำนวนเงินที่ต้องชำระ</p> 
                                        </div> 
                                        <div class="col"> 
                                            <div class="text-right"> 
                                                <p class="card-text">A</p> 
                                                <p class="card-text">{{detail[0].choose.toString()}}</p> 
                                                <p class="card-text">{{detail[0].countChoose}}</p> 
                                                <p class="card-text">{{concerts.concert.price}} บาท</p> 
                                                <p class="card-text">{{ typeTicket.toString()}}</p>
                                                <p class="card-text">{{typePayment}}</p> 
                                                <p class="card-text" v-if="!statusOfbtnC">{{detail[0].countPrice}} บาท</p> 
                                                <p class="card-text" v-if="statusOfbtnC">{{detail[0].countPrice}} (C-TICKET +เงิน 50 บาท)</p> 
                                            </div> 
                                        </div> 
                                    </div> 
                                    <div class="text-center"> 
                                        <a class="btn btn-danger" @click="confirm()">ยืนยันการสั่งซื้อ</a> 
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
      // seatArray: null,
      detail: null,
      statusOfbtn: false,
      statusOfbtn2: false, 
      typeTicket: [],
      statusOfbtnC: false, 
        typePayment: '-',
        seller: {}
    };
  },
  mounted() {
    this.detail = JSON.parse(localStorage.getItem('detail'))
    this.getConcert(this.$route.params.id);
  },
  methods: {
    getConcert(id) {
      axios
        .get(`/concerts/${id}`)
        .then((response) => {
          this.concerts = response.data
          this.getSeller(response.data.concert.user_user_id)

        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
     addETicket(){ 
        if(this.statusOfbtn){ 
            this.statusOfbtn = false
            this.typeTicket.splice(this.typeTicket.indexOf('E-TICKET'), 1)
        } 
        else{
            this.statusOfbtn = true 
            this.typeTicket.push('E-TICKET')
        } 
     },
     addCTicket(){ 
        if(this.statusOfbtnC){ 
            console.log(this.typeTicket.indexOf('C-TICKET'))
            this.statusOfbtnC = false 
            this.typeTicket.splice(this.typeTicket.indexOf('C-TICKET'), 1)
            this.detail[0].countPrice-=50

        } 
        else{
            this.statusOfbtnC = true 
            this.typeTicket.push('C-TICKET')
            this.detail[0].countPrice+=50
        } 
     },
     addEPayment(){ 
         if(this.statusOfbtn2){ 
            this.statusOfbtn2 = false 
            this.typePayment = '-' 
        } 
        else{ 
            this.statusOfbtn2 = true 
            this.typePayment = 'MOBILE BANKING' 
        } 
     },
     convert(array){
         let str = array.toString()
         for (let index = 0; index < str.length; index++) {
             str = str.replace(',', ' ')
         }
         return str
     },
     getSeller(id){
        axios
        .get(`/seller/${id}`)
        .then((response) => {
          this.seller = response.data
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
     confirm(){
         if(this.typePayment == '-' || this.typeTicket == '-'){
             alert('กรุณาเลือกชนิดบัตร และ วิธีชำระเงิน')
         }
         else if(this.typePayment == "MOBILE BANKING" ){
             let data = {
          booking_seat: this.convert(this.detail[0].choose),
          booking_concert: this.concerts.concert.concert_title,
          booking_amount: this.detail[0].countChoose,
          booking_price: this.detail[0].countPrice,
          user_user_id: this.user.user_id,
          banking_banking_id: this.seller.banking_id,
          concert_concert_id: this.concerts.concert.concert_id,
          address_id: this.concerts.concert.address_id,
          ticType: this.convert(this.typeTicket)
        };
             axios
        .post(`/addbooking`, data)
        .then((res) => {
            alert(res.data)
          location.href = `http://localhost:8080/step4/${this.concerts.concert.concert_id}`
        })
        .catch((error) => {
            console.log(error)
        });
         }
     },
  }
    
}
</script>