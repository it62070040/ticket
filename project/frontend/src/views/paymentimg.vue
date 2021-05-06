<template>
    <div>
        <img :src="'http://localhost:3000/' + img" alt="">
        <button @click="back()">test</button>
    </div>
</template>
<script>
import axios from "@/plugins/axios";
export default {
    props: ["user"],
    data(){
        return{
            img: null,
        }
    },
    mounted() {
         axios
        .get(`/checkImg/${this.$route.params.id}`)
        .then((res) => {
          this.img = (res.data[0].file_path)
        })
        .catch((e) => {
          console.log(e)
        });
    },
    methods:{
        back(){
            location.href = `http://localhost:8080/myconcert/${this.user.user_id}`
        }
    },
}
</script>