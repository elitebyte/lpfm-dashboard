<template>
    <div>    
        <h2>Login</h2>    
        <card>
            <form v-on:submit="login">
              <base-input label="Email address"
                          type="email"
                          placeholder="Enter email"
                          name="email">
                  <small slot="helperText" class="form-text text-muted"> Probably in a sticky note somewhere...</small>
              </base-input>
              <base-input label="Password"
                          type="password"
                          placeholder="Password" 
                          name="password">
              </base-input>
              <base-checkbox>
                Remember Me (WIP)
             </base-checkbox>
             <base-button native-type="submit" type="primary">Submit</base-button>
            </form>
        </card>   
    </div>
</template>

<script>
    import router from "../router"    
    import axios from "axios"   
    import BaseButton from "../components/BaseButton"
    
    export default {    
        name: "Login",
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            login: (e) => {
                e.preventDefault()
                
                let data = {
                    email: e.target.elements.email.value,
                    password: e.target.elements.password.value
                }
                axios.post("/api/login", data)    
                    .then((response) => {    
                        console.log(data)    
                        router.push("/dashboard")    
                    })    
                    .catch((errors) => {    
                        console.log("Cannot log in error: " + errors)    
                    })    
            }    
        }
    }
</script>