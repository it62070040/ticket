<template> 
  <div> 
    <div class="container w-100 d-flex" style="height: 30vh;"> 
        <div class="col-12"> 
            <div class="row"> 
                <div class="col-2"> 
                    <img src="/images/1.jpg" alt="" class="h-100" style="position: absolute; top: 30px;"> 
                </div> 
                <div class="col-5 mt-5"> 
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
                <div class="col-5 mt-5"> 
                    <h2>ขั้นตอนที่</h2> 
                    <h1 style="font-weight: bolder;">1/4</h1> 
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
 
    <div class="blackBox w-100" style="height: 100vh; background-color: black;"> 
        <!-- ยูเนียนฮอล์ --> 
        <div class="container"> 
            <div class="select-zone"> 
                <div class="row"> 
                    <div class="col-6 mt-5"> 
                        <div class="map-zone"><img src="../assets/zone(1).png" usemap="#uMap" href="#" 
                                style="position: absolute; left: 7em;"> 
                            <map name="uMap" id="uMap"> 
                                <area shape="poly" coords="75,88,73,149,11,149,12,110,33,87" href="/unionA1" 
                                    onclick="selectzone(this.href, event)"> 
                                <area shape="poly" coords="85,88,267,86,267,116,85,116" href="seatpage(U)A2.html" 
                                    onclick="selectzone(this.href, event)"> 
                                <area shape="poly" coords="84,116,266,116,266,148,84,150" href="seatpage(U)A3.html" 
                                    onclick="selectzone(this.href, event)"> 
                                <area shape="poly" coords="346,127,346,148,278,148,278,87,312,86" 
                                    href="seatpage(U)A4.html" onclick="selectzone(this.href, event)"> 
                                <area shape="poly" coords="13,165,74,166,74,335,12,334" href="seatpage(U)B1.html" 
                                    onclick="selectzone(this.href, event)"> 
                                <area shape="poly" coords="84,167,269,167,268,334,84,334" href="seatpage(U)B2.html" 
                                    onclick="selectzone(this.href, event)"> 
                                <area shape="poly" coords="276,165,346,166,346,335,278,334" href="seatpage(U)B3.html" 
                                    onclick="selectzone(this.href, event)"> 
 
                            </map> 
                        </div> 
                    </div> 
                    <div class="col-6 mt-5"> 
                        <div class="zone-remark"><img src="/images/price.JPG" width="230" height="391" 
                                style="position: absolute; left: 7em;"> 
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
import store from "@/vuex/store.js"; 
export default { 
  data() { 
    return { 
        isCheck: false, 
        store, 
    }; 
  }, 
  components: {}, 
  methods: { 
      check(){ 
          if(this.isCheck == true){ 
              this.isCheck = false 
          } 
          else{ 
              this.isCheck = true 
          } 
      } 
  }, 
}; 
</script>