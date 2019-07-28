<template>
  <div>
    <nav aria-label="breadcrumb" role="navigation">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/shows" v-on:click="backToShows">KQBH Shows</a></li>
        <li class="breadcrumb-item active" aria-current="page" v-if="showDetailedView">{{detailedShow.name}}</li>
      </ol>
        
    </nav>
      
    <!-- SHOWS GRID -->
    <div id="all-shows" v-if="!showDetailedView">
        <h3 slot="header" class="title">Recently Added</h3>
        <div class="row">
            <div class="col-md-4" v-for="(show, index) in shows">
              <user-card :user="user" :showData="shows[index]"></user-card>
            </div>
        </div>
        <hr></hr>
        <h3 slot="header" class="title">All Shows (A-Z)</h3>
        <div class="row">
            <div class="col-md-3 " v-for="(show, index) in shows">
              <user-card :user="user" :showData="shows[index]"></user-card>
            </div>
        </div>
    </div>
    
    <!-- DETAILED SHOW -->
    <div id="detailed-show" v-if="showDetailedView">
        <div class="row"> 
            
            <div class="col-lg-3 col-md-12">
                <card type="tasks" :header-classes="{'text-right': true}">
                    <template slot="header">
                        <h5 class="title d-inline float-left">{{detailedShow.name}}</h5>
                        <p class="card-category d-inline">Number of Tracks</p>
                    </template>
                    <img :src="detailedShow.thumbnailURL" alt="...">
                    
                    <!-- Track Modal -->
                    <base-button block type="primary" @click="modals.modal1 = true">Add Track</base-button>
                    <template>
                        <modal :show.sync="modals.modal1"
                                               body-classes="p-0"
                                               modal-classes="modal-dialog-centered modal-lg">
                            <card type="secondary"
                                  header-classes="bg-white pb-5"
                                  body-classes="px-lg-5 py-lg-5"
                                  class="border-0 mb-0">
                                <div class="text-center mb-3">
                                    <small>
                                    <slot name="subheader">Adding to {user.title}</slot>
                                    </small>
                                    <h2>
                                    <slot name="header">Add New Track</slot>
                                    </h2>
                                </div>
                                <form v-on:submit="addTrack">
                                  <div class="form-row">
                                      <base-input class="col-md-4" type="text" label="Episode Name" placeholder="Windows or Macintosh?..." v-model="trackData.name"/>
                                      <base-input class="col-md-4" type="text" label="Features" placeholder="Drake, Kanye..." v-model="trackData.features"/>
                                      <base-input class="col-md-4" type="date" label="Date" v-model="trackData.date"></base-input>
                                  </div>
                                  <base-input type="url" label="Audio URL (.mp3)" placeholder="https://drive.google.com/drive/marios-track.mp3" v-model="trackData.audioURL"/>
                                  <base-input>
                                    <base-checkbox v-model="trackData.featureEpisode">Feature Episode (WIP)</base-checkbox>
                                  </base-input>
                                    <div class="form-row text-center mb-3">
                                        <base-button type="primary" native-type="Submit">
                                        <slot name="submit-button">Add Track</slot>
                                        </base-button>
                                        <base-button type="secondary" @click="modals.modal1 = false">Cancel</base-button>
                                    </div>                                
                                </form>
                            </card>
                        </modal>
                    </template>
                    
                    <!-- Show Modal -->
                    <base-button block simple type="default" @click="modals.modal2 = true">Edit Show</base-button>
                    <template>
                        <modal :show.sync="modals.modal2"
                                               body-classes="p-0"
                                               modal-classes="modal-dialog-centered modal-lg">
                            <card type="secondary"
                                  header-classes="bg-white pb-5"
                                  body-classes="px-lg-5 py-lg-5"
                                  class="border-0 mb-0">
                                <div class="text-center mb-3">
                                    <small>
                                    <slot name="subheader">Enter Data</slot>
                                    </small>
                                    <h2>
                                    <slot name="header">Settings</slot>
                                    </h2>
                                </div>
                                <form v-on:submit="updateShow">
                                  <div class="form-row">
                                      <base-input class="col-md-4" type="text" label="Show Name" placeholder="Tech Tuesdays..." v-model="detailedShow.name"></base-input>
                                      <base-input class="col-md-4" label="Show Category">
                                            <select id="inputState" class="form-control" v-model="detailedShow.category">
                                              <option selected>Choose...</option>
                                              <option>Tech</option>
                                              <option>Economics</option>
                                              <option>Sociology</option>
                                              <option>News</option>
                                              <option>Music</option>
                                              <option>Talk Show</option>
                                            </select>
                                      </base-input>
                                  </div>
                                  <base-input type="url" label="Square Thumbnail URL" placeholder="https://images.google.com/cute-dog.jpg" v-model="detailedShow.thumbnailURL"/>
                                  <base-input label="Show Description">
                                    <textarea class="form-control" id="showDescription" rows="3" v-model="detailedShow.desc"></textarea>
                                  </base-input>
                                  <base-input label="Author Description">
                                    <textarea class="form-control" id="authorDescription" rows="2" v-model="detailedShow.creatorDesc"></textarea>
                                  </base-input>
                                  <div class="form-row">
                                      <base-input class="col-md-4" label="Twitter (Opt)" placeholder="https://twitter.com/jack" v-model="detailedShow.twitterURL"/>
                                      <base-input class="col-md-4" label="Facebook (Opt)" placeholder="https://facebook.com/mark-zuckerburg" v-model="detailedShow.facebookURL"/>
                                      <base-input class="col-md-4" label="Instagram (Opt)" placeholder="https://instagram.com/elitebyte" v-model="detailedShow.instagramURL"/>
                                  </div>
                                  <base-input>
                                    <base-checkbox v-model="detailedShow.featureShow">Feature Show (WIP)</base-checkbox>
                                  </base-input>
                                    <div class="form-row text-center mb-3">
                                        <base-button type="primary" native-type="Submit">
                                        <slot name="submit-button">Save Changes</slot>
                                        </base-button>
                                        <base-button type="secondary" native-type="Cancel" @click="modals.modal2 = false">Cancel</base-button>
                                    </div>                                
                                </form>
                            </card>
                        </modal>
                    </template>
                    
                </card>
            </div>
            
            <div class="col-lg-9 col-md-12">
                <card class="card" :header-classes="{'text-right': true}">
                    <base-table :data="tracksArray"
                                :columns="columns">
                            <template slot="columns">
                              <th>Title</th>
                              <th>Features</th>
                              <th>Plays</th>
                              <th>Date</th>
                              <th>Length</th>
                              <th class="text-right">Actions</th>
                            </template>  
                            <template slot-scope="{row}">
                              <td>{{row.name}}</td>
                              <td>{{row.features}}</td>
                              <td>{{row.plays}}</td>    
                              <td>{{row.date}}</td>
                              <td>{{row.length }}</td>
                              <td class="td-actions text-right">
                                <base-button type="info" size="sm" icon>
                                  <i class="tim-icons icon-cloud-download-93"></i>
                                </base-button>
                                <base-button type="success" size="sm" icon v-on:click="playTrack(row.trackUID)">
                                  <i :class="isPlaying(row.trackUID)"></i>
                                </base-button>
                                <base-button type="danger" size="sm" icon v-on:click="removeTrack(row.trackUID)">
                                  <i class="tim-icons icon-simple-remove"></i>
                                </base-button>
                              </td>
                            </template>    
                    </base-table>
                </card>
            </div>                
        </div>
    </div>
  </div>
</template>
<script>
  import UserCard from './Profile/UserCard'
  import BaseTable from '../components/BaseTable'
  import Modal from '../components/Modal'
    
  import axios from "axios"    
  
  export default {
    components: {
      UserCard,
      BaseTable, 
      Modal
    },
    methods: {
      updateShow: function() {
          
          console.log("UPDATE: pushing show data.")
          let data = this.detailedShow
          
          axios.post("/api/updateshow", data)
            .then((response) => {
              console.log(response)
              this.modals.modal2 = false
              router.push("/shows")
          })
          .catch((errors) => {
            console.log("Was not able to add show error: " + errors)
          })
      },
      backToShows: function() {
            this.showDetailedView = false;  
      },
      getShows: function() {
          console.log("Reloading the shows object.")
          
          axios.get("/api/getshows")
            .then((response) => {
              this.shows = response.data.shows
              if (this.showDetailedView) {
 
              }
          }).catch((error) => {
              console.log("Yo we did an oopsie " + error)
          })
      },
      addTrack: function() {
          this.trackData["showUID"] = this.detailedShow.showUID
          
          this.getDuration(this.trackData.audioURL)
            .then((duration) => {
              this.trackData["length"] = this.convertTimeHHSS(duration)
                axios.post("/api/addtrack", this.trackData)
                .then((response) => {
                  console.log("Got a response from server: ")
                  console.log(response)
                  this.modals.modal1 = false
                  this.getShows()
              })  
          })
      },
      removeTrack: function(trackUID) {
          console.log("removing this track: " + trackUID)
          
          let data = {
                trackUID: trackUID,
                showUID: this.detailedShow.showUID
          }
          
          axios.post("/api/removetrack", data)
            .then((response) => {
              console.log("Got a response from the server: ")
              console.log(response)
              
          })
      },
      playTrack: function(trackUID) {
          
          if(this.currentlyPlaying.isPaused) {
            
            let track = new Audio(this.detailedShow.tracks[trackUID].audioURL)
            this.currentlyPlaying.trackUID = trackUID
            this.currentlyPlaying.audioStrem = track
            this.currentlyPlaying.isPaused = false
            track.play()
 
            if (localStorage.getItem(trackUID)) {
                console.log("Not updating track play count.")
            } else {
                this.updateTrackCookies(trackUID)

                let trackData = {
                    trackUID: trackUID,
                    showUID: this.detailedShow.showUID
                }

                axios.post("/api/trackplay", trackData)
                    .then((response) => {
                    console.log("Successfully updated playcount, server responded: ")
                    console.log(response)
                })
            }
          } else {
            this.currentlyPlaying.audioStrem.pause()
            this.currentlyPlaying.isPaused = true
            if(this.currentlyPlaying.trackUID != trackUID) {
                this.playTrack(trackUID)
            }
          }
      },
      isPlaying: function(trackUID) {
          
          if (this.currentlyPlaying.isPaused) {
              return "tim-icons icon-triangle-right-17"
          } else if (trackUID == this.currentlyPlaying.trackUID) {
              return "tim-icons icon-button-pause"
          } else {
              return "tim-icons icon-triangle-right-17" 
          }
      },
      getDuration: function(src) {
          return new Promise(function(resolve) {
              var audio = new Audio()
              audio.addEventListener("loadedmetadata", function() {
                  resolve(audio.duration)
              })
              audio.src = src
          })
      },
      convertTimeHHSS:  function(val) {
	       let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);
	       return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
       },
       updateTrackCookies: function(trackUID) {  
           
           console.log("Adding " + trackUID + " to the localStorage")
           localStorage.setItem(trackUID, true)
           this.getShows()
       }
    },
    computed: {
      tracksArray: function() {
        if (this.detailedShow.tracks != null) {
            return Object.values(this.detailedShow.tracks)
        }
        return null
      }
    },
    data() {
      return {
        currentlyPlaying: {
            audioStrem: null,
            trackUID: "",
            isPaused: true
        },
        trackModal: '#trackModal',
        showDetailedView: false,
        user: {
          fullName: 'Show Name',
          title: 'Show Category',
          imageSource: 'img/emilyz.jpg',
          description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        },
        modals: {
          modal1: false,
          modal2: false
        },
        shows: [{
            
        }],
        detailedShow: {
            
        },
        trackData: {
            name: "",
            features: "",
            date: "",
            audioURL: "",
            plays: 0,
            featureEpisode: false,
            trackUID: "",
            length: ""
        },
        columns: ["name", "features", "plays", "date", "length", "actions"]
      }
    },
    mounted() {
        this.getShows()
    }
  }
</script>
<style>
</style>
