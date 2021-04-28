<template> 
    <div> 
        <div class="container w-100 d-flex" style="height: 30vh;"> 
        <div class="col-12"> 
            <div class="row"> 
                <div class="col-2"> 
                    <img src="/images/1.jpg" alt="" class="h-100" style="position: absolute; top: 30px;"> 
                </div> 
                <div class="col-8 mt-5"> 
                    <h3 style="font-weight: bolder;">ชื่อคอนเสิร์ต</h3> 
                    <a href="#" class="stretched-link" 
                        style=" margin-top: 10px; font-size: 20px; color: black;">รายละเอียดคอนเสิร์ต</a> 
                    <h5 class="d-flex" style="font-weight: bolder; margin-top: 10px;">รอบการแสดง : 
                        <p>วันจันทร์ที่ 1 มกราคม 2020 18.30</p> 
                    </h5> 
 
                </div> 
                <div class="col-2 mt-5"> 
                    <h2>ขั้นตอนที่</h2> 
                    <h1 style="font-weight: bolder;">2/4</h1> 
                    <h4>เลือกที่นั่ง</h4> 
                </div> 
 
            </div> 
        </div> 
 
    </div> 
 
    
 
 
        <div class="blackBox w-100 mt-5" style="height: 100vh; background-color: black;"> 
            <!-- ที่นั่งยูเนียนฮอล์ --> 
            <div class="container"> 
                <div class="seat-body"> 
                    <div class="row"> 
                        <div class="col-8 pt-5"> 
                            <div class="info d-flex"> 
                                <div class="icon correct d-flex" style="position: absolute; left: 8em;"> 
                                    <span class="icon"> 
                                        <i><img src="https://img.icons8.com/emoji/96/000000/check-mark-emoji.png" 
                                                style="width:25px;" /></i> 
                                    </span> 
                                    <h3 style="color: white; font-size: 1.3em;">ที่นั่งที่เลือก</h3> 
                                </div> 
                                <div class="icon incorrect d-flex ml-3" style="position: absolute; left: 17em;"> 
                                    <span class="icon"> 
                                        <i><img src="https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png" 
                                                style="width:25px;" /></i> 
                                    </span> 
                                    <h3 style="color: white; font-size: 1.3em;">ที่นั่งไม่ว่าง</h3> 
                                </div> 
                                <div class="mt-5 mb-3   "> 
                                    <img src="/images/stageline.png" alt="" width="600vw;" 
                                        style="position: absolute; right: 12em;"> 
                                    <h5 class="text-white font-weight-bold mt-3" 
                                        style="position: absolute; left: 11em;"> 
                                        STAGE</h5> 
                                </div> 
 
 
                            </div> 
 
                            <!-- zone A1 --> 
                             
                            <div class="mt-5 row mx-auto">                                 
                                <div class="allSeat"> 
                                     
                                    <a href="#" class="btn " style="padding: 0;" v-for="item in x" :key="item"> 
                                        <p class="text-white font-weight-bold" style="position: absolute; right: 50em;">A</p> 
                                        <img src="../assets/seatUBlue4.png" alt="" width="40vw" height="40vh"> 
                                    </a> 
                                         
                                </div> 
                                 
 
                            </div> 
                            <!-- <div class="row mx-auto"> 
                                <div class="" v-for="letter in letters" :key="letter"> 
                                    <p>{{letter}}</p> 
                                 
                                    <div class="allSeat"> 
                                        <a href="#" class="btn " style="padding: 0;" v-for="item in x" :key="item"> 
                                            <img src="../assets/seatUBlue4.png" alt="" width="40vw" height="40vh"> 
                                        </a> 
                                         
                                    </div> 
                                </div> 
 
                            </div> --> 
 
                             
 
 
 
                        </div> 
                        <div class="col-4 pt-5"> 
                            <div class="deatil"> 
                                <div class="card" style="width: 30rem; border-radius: 5%;"> 
                                    <h5 class="card-header text-center font-weight-bold">รายละเอียดการจอง</h5> 
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
                                                <div class="float-right"> 
                                                    <p class="card-text">xxx</p> 
                                                    <p class="card-text">xxx</p> 
                                                    <p class="card-text">xxx</p> 
                                                    <p class="card-text">xxx</p> 
                                                    <p class="card-text">xxx</p> 
                                                    <p class="card-text">xxx</p> 
                                                    <p class="card-text">xxx</p> 
                                                </div> 
                                            </div> 
                                        </div> 
                                        <div class="text-center"> 
                                            <a href="#" class="btn btn-danger">ยืนยันที่นั่ง</a> 
                                        </div> 
                                        <div class="text-center mt-2"> 
                                            <a href="#" class="btn btn-light">เลือกโซนอื่น</a> 
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
import axios from "axios"; 
export default { 
    created() { 
    axios.get("http://localhost:3000/unionA1") 
        .then((response) => { 
          this.x = response.data[0]; 
          console.log(this.x) 
        }) 
        .catch((err) => { 
          console.log(err); 
        }); 
    }, 
     
    data() { 
      return { 
          
          x: null 
      } 
    }, 
    computed: { 
    // there have to be a way to get this array without doing it like this but I don't know it ^^ 
    letters() { 
      let letters = [] 
      for(let i = "A".charCodeAt(0); i <= "D".charCodeAt(0); i++) {letters.push(String.fromCharCode([i]))} 
      return letters 
    } 
  }, 
  } 
</script>