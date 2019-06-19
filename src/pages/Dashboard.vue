<template>
  <div>
  </div>
</template>
<script>
  import axios from "axios"    
  import router from "../router" 

  export default {
    components: {
    },
    data() {
      return {
        user: {    
            name: 'Jesse'    
        }
      }
    },
    computed: {
    },
    methods: {
      getUserData: function() { 
          
        let self = this   
        let data = {    
            email: "email@email.com",    
            password: "test"    
        }
        
        axios.get("api/user")
            .then((response) => {    
                console.log(response)
                console.log()
                self.$set(this, "user", response.data.user)    
            })    
            .catch((errors) => {    
                console.log(errors)    
                router.push("/")    
            })    
        }    
    },    
    mounted() {
      this.getUserData()
    }
  };
</script>
<style>
</style>
