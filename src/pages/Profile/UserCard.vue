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
              <base-button v-if="loadSocial(showData.facebookURL)" icon round class="btn-facebook" @click="loadURL(showData.facebookURL)">
                <i class="fab fa-facebook"></i>
              </base-button>
              <base-button v-if="loadSocial(showData.twitterURL)" icon round class="btn-twitter" @click="loadURL(showData.twitterURL)">
                <i class="fab fa-twitter"></i>
              </base-button>
              <base-button v-if="loadSocial(showData.instagramURL)" icon round class="btn-google" @click="loadURL(showData.instagramURL)">
                <i class="fab fa-instagram"></i>
              </base-button>
        </div>
        <div class="row-md-1">
            <base-button v-on:click="viewShow(showData.name)" slot="footer" type="primary" fill>View</base-button>
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
            this.$parent.detailedShow = this.showData
            this.$parent.showDetailedView = true
        
        },
        playShow: function(showName) {
            console.log("Play Show " + showName)
        },
        loadURL: function(url) {
            var win = window.open(url, '_blank')
            win.focus() 
            
        },
        loadSocial: function(url) {
            if (url == "") {
                return false
            }
            return true
        },
        setURLParam: function(url, key, value) {
            var key = encodeURIComponent(key),
                value = encodeURIComponent(value);

            var baseUrl = url.split('?')[0],
                newParam = key + '=' + value,
                params = '?' + newParam;

            if (url.split('?')[1] == undefined){ // if there are no query strings, make urlQueryString empty
                urlQueryString = '';
            } else {
                urlQueryString = '?' + url.split('?')[1];
            }

            // If the "search" string exists, then build params from it
            if (urlQueryString) {
                var updateRegex = new RegExp('([\?&])' + key + '[^&]*');
                var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');

                if (typeof value === 'undefined' || value === null || value === "") { 
                    params = urlQueryString.replace(removeRegex, "$1");
                    params = params.replace(/[&;]$/, "");

                } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
                    params = urlQueryString.replace(updateRegex, "$1" + newParam);

                } else if (urlQueryString=="") {
                    params = '?' + newParam;
                } else { // Otherwise, add it to end of query string
                    params = urlQueryString + '&' + newParam;
                }
            }

            // no parameter was set so we don't need the question mark
            params = params === '?' ? '' : params;

            return baseUrl + params;
        }
    }
  }
</script>
