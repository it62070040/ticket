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
            <h3 style="font-weight: bolder">{{concerts.concert.concert_title}}</h3> 
            <!-- <h3 style="font-weight: bolder">{{concertName}}</h3>  -->
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
            <h1 style="font-weight: bolder">4/4</h1> 
            <h4>ชำระเงิน</h4> 
          </div> 
        </div> 
      </div> 
    </div> 
 
    <div class="blackBox w-100" style="height: 100vh; background-color: black;"> 
            <div class="d-flex justify-content-center" style="padding-top: 6em"> 
               <div class="card" style="width: 30rem; border-radius: 5%;"> 
                    <h5 class="card-header text-center font-weight-bold">ธนาคาร</h5> 
                    <div class="card-body"> 
                       <div class="row"> 
                      <div class="col font-weight-bold text-center"> 
                        <p class="card-text">ชื่อบัญชี</p> 
                        <p class="card-text">ธนาคาร</p> 
                        <p class="card-text">หมายเลขบัญชี</p> 
                        <p class="card-text">จำนวนเงินที่ต้องชำระ</p> 
                      </div> 
                      <div class="col">  
                        <div class="text-right text-center"> 
                          <p class="card-text">{{seller.fname}} {{seller.lname}}</p> 
                          <p class="card-text">{{seller.account_name}}</p> 
                          <p class="card-text">{{seller.bank_account}}</p> 
                          <p class="card-text">{{detail[0].countPrice}}</p> 
                        </div> 
                      </div> 
                    </div> 
                    </div> 
                </div> 
            </div> 
            <div class="mt-4 text-center"> 
                <a  class="btn btn-danger text-white" @click="home()">กลับสู่หน้าหลัก</a> 
                 <a  class="btn btn-danger text-white" @click="pay()">แจ้งโอนเงิน</a> 
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
        concerts: {},
        seller: {},
        detail: null
    };
  },
    mounted() {
    this.getConcert(this.$route.params.id);
    this.detail = JSON.parse(localStorage.getItem('detail'))
  },
  methods:{
      pay(){
        location.href = `http://localhost:8080/paymentform/${this.concerts.concert.concert_id}`

      },
      getConcert(id) {
      axios
        .get(`/concerts/${id}`)
        .then((response) => {
          this.concerts = response.data
          console.log(response.data.concert.user_user_id)
          this.getSeller(response.data.concert.user_user_id)
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
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
    home(){
        var r = confirm("กลับสู่หน้าหลัก ข้อมูลที่นั่งหายทั้งหมด")
        if (r == true) {
            localStorage.removeItem('detail')
            location.href = '/'
        }
        else{
            console.log('cancel')
        }
    }
  }
}
</script>