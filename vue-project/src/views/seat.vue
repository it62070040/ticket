<template>
  <div>
    <table>
      <tr>
        <td><button @click="check()" :style="{'background-color' : isCheck ? 'green' : 'white'}">1</button></td>
        <td><button>2</button></td>
        <td><button>3</button></td>
        <td><button>4</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td><button>2</button></td>
        <td><button>3</button></td>
        <td><button>4</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td><button>2</button></td>
        <td><button>3</button></td>
        <td><button>4</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td><button>2</button></td>
        <td><button>3</button></td>
        <td><button>4</button></td>
      </tr>
    </table>
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