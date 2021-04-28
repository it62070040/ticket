<template> 
  <div> 
    <div class="container w-100 d-flex" style="height: 30vh"> 
      <div class="col-12"> 
        <div class="row"> 
          <div class="col-2"> 
            <img 
              src="/images/1.jpg" 
              alt="" 
              class="h-100" 
              style="position: absolute; top: 30px" 
            /> 
          </div> 
          <div class="col-8 mt-5"> 
            <!-- <h3 style="font-weight: bolder">{{concertName}}</h3> --> 
            <a href="https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select">รายละเอียดคอนเสิร์ต</a> 
            <div class="row"> 
                <div class="col-4"> 
                    <h5 class="d-flex" style="font-weight: bolder; margin-top: 10px"> 
                        รอบการแสดง : 
                    </h5> 
                </div> 
                <div class="col-6  mt-2">     
                    <!-- <h5>{{valueshow}}</h5> --> 
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
                      </div> 
                      <div class="col">  
                        <div class="text-right text-center"> 
                          <p class="card-text">xxx</p> 
                          <p class="card-text">xxx</p> 
                          <p class="card-text">xxx</p> 
                        </div> 
                      </div> 
                    </div> 
                    </div> 
                </div> 
            </div> 
            <div class="mt-4 text-center"> 
                <a href="#" class="btn btn-danger">กลับสู่หน้าหลัก</a> 
            </div> 
        </div> 
 
    
  </div> 
</template> 
 
<script> 
import axios from "axios"; 
export default { 
  data() { 
    return { 
         
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
      
  } 
     
}; 
</script> 
<style scoped> 
 
</style> 
 
 
