<template>
  <card type="user">
    <p class="card-text">
    </p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <img class="avatar" :src="showData.thumbnailURL" alt="...">
        <h3 class="title">{{showData.name}}</h3>
      </a>
      <p class="description">
        {{showData.category}}
      </p>
    </div>
    <p></p>
    <p class="card-description">
      {{showData.desc}}
    </p>
    <div slot="footer" class="button-container">
        <div class="row-md-2">
              <base-button icon round class="btn-facebook" href="showData.facebookURL">
                <i class="fab fa-facebook"></i>
              </base-button>
              <base-button icon round class="btn-twitter" href="showData.twitterURL">
                <i class="fab fa-twitter"></i>
              </base-button>
              <base-button icon round class="btn-google" href="showData.instagramURL">
                <i class="fab fa-instagram"></i>
              </base-button>
        </div>
        <div class="row-md-2">
            <base-button v-on:click="playShow(showData.name)" slot="footer" type="primary" fill>Play</base-button>
            <base-button v-on:click="viewShow(showData.name)" slot="footer" type="secondary" fill>View</base-button>
        </div>
    </div>
  </card>
</template>
<script>
  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {};
        }
      },
      showData: {
          type: Object,
          default: () => {
              return {
                showUID: "",
                name: "",
                creator: "",
                category: "",
                thumbnailURL: "",
                desc: "",
                creatorDesc: "",
                twitterURL: "",
                facebookURL: "",
                instagramURL: "",
                featureShow: false
              }
          }
      }
    },
    methods: {
        viewShow: function(showName) {
            console.log("View Show: " + showName)
            this.$parent.showDetailedView = true
        },
        playShow: function(showName) {
            console.log("Play Show " + showName)
        }
    }
  }
</script>
<style>
</style>
