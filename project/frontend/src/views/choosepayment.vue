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
 
    <div class="blackBox w-100" style="height: 100vh; background-color: black;"> 
            <div class="container"> 
                <div class="row"> 
                    <div class="col-8 pt-5"> 
                        <div class="card" style="width: 30rem; border-radius: 5%;"> 
                            <h5 class="card-header text-center font-weight-bold">กรุณาเลือกชนิดบัตร</h5> 
                            <div class="card-body text-center"> 
                                <a href="#" class="btn p-0" @click="addETicket()"> 
                                    <div class="e-ticket px-5" style="border:0.3em solid #d9d9d9; border-radius: 0.5em;" :style="{'background-color' : statusOfbtn ? '#d9d9d9':'white'}" > 
                                        <img src="../assets/e-tic.png" alt="" width="60vw" height="70vh" class="rounded" > 
                                        <h5>E-TICKET</h5> 
                                    </div> 
                                </a> 
                            </div> 
                        </div> 
 
                        <div class="card mt-5" style="width: 30rem; border-radius: 5%;"> 
                            <h5 class="card-header text-center font-weight-bold">กรุณาเลือกวิธีชำระเงิน</h5> 
                            <div class="card-body text-center"> 
                                <a href="#" class="btn p-0" @click="addEPayment()"> 
                                    <div class="e-ticket px-5" style="border:0.3em solid #d9d9d9; border-radius: 0.5em;" :style="{'background-color' : statusOfbtn2 ? '#d9d9d9':'white'}" > 
                                        <img src="../assets/mobile-b.png" alt="" width="60vw" height="70vh" class="rounded mt-1" > 
                                        <h5>MOBILE BANKING</h5> 
                                    </div> 
                                </a> 
                            </div> 
                        </div> 
 
                         
 
                    </div> 
                    <div class="col-4 pt-5"> 
                        <div class="deatil"> 
                            <div class="card" style="width: 30rem; border-radius: 5%;"> 
                                <h5 class="card-header text-center font-weight-bold">รายละเอียดการจอง</h5> 
                                <div class="card-body"> 
                                    <h3 class="card-title text-center font-weight-bold">dept</h3> 
                                    <!-- <h3 class="card-title text-center font-weight-bold">ชื่อคอนเสิร์ต</h3>  -->
                                    <h6 class="card-title text-center">ณ ลาน Atrium3 ศูนย์การค้าเซ็นทรัลเวิลด์</h6> 
                                    <!-- <h6 class="card-title text-center">สถานที่แสดง</h6>  -->
                                    <h4 class="card-title text-center font-weight-bold">รอบการแสดง</h4> 
                                    <h5 class="card-title text-center font-weight-bold text-danger">วันอังคารที่ 1 มิถุนายน 2021 21.10 น.</h5> 
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
                                                <p class="card-text">A1</p> 
                                                <p class="card-text">1</p> 
                                                <p class="card-text">500 บาท</p> 
                                                <p class="card-text">E-TICKET</p> 
                                                <p class="card-text">MOBILE BANKING</p> 
                                                <p class="card-text">500 บาท</p> 
                                            </div> 
                                        </div> 
                                        <!-- <div class="col"> 
                                            <div class="text-right"> 
                                                <p class="card-text">xxx</p> 
                                                <p class="card-text">xxx</p> 
                                                <p class="card-text">xxx</p> 
                                                <p class="card-text">xxx</p> 
                                                <p class="card-text">xxx</p> 
                                                <p class="card-text">{{typeTicket}}</p> 
                                                <p class="card-text">{{typePayment}}</p> 
                                                <p class="card-text">xxx</p> 
                                            </div> 
                                        </div>  -->
                                    </div> 
                                    <div class="text-center"> 
                                        <a href="#" class="btn btn-danger">ยืนยันการสั่งซื้อ</a> 
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
export default { 
  data() { 
    return { 
        statusOfbtn: false, 
        typeTicket: '', 
        statusOfbtn2: false, 
        typePayment: '' 
    }; 
  }, 
  created() { 
    axios 
    //   .get("http://localhost:3000/hotel_K") 
    //   .then((response) => { 
    //    store.state.info = response.data 
    //    console.log(store.state.info[0].file_path) 
    //    this.image = store.state.info[0].file_path 
    //   }) 
    //   .catch((err) => { 
    //     console.log(err); 
    //   });  
     
 
  }, 
  methods:{ 
     addETicket(){ 
        if(this.statusOfbtn){ 
            this.statusOfbtn = false 
            this.typeTicket = '' 
        } 
        else{ 
            this.statusOfbtn = true 
            this.typeTicket = 'E-TICKET' 
        } 
     }, 
     addEPayment(){ 
         if(this.statusOfbtn2){ 
            this.statusOfbtn2 = false 
            this.typePayment = '' 
        } 
        else{ 
            this.statusOfbtn2 = true 
            this.typePayment = 'MOBILE BANKING' 
        } 
     } 
  } 
     
}; 
</script> 
<style scoped> 
 
</style> 
 
 
