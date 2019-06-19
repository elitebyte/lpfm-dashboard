<template>
  <div>
    <nav aria-label="breadcrumb" role="navigation">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#/shows" v-on:click="backToShows">KQBH Shows</a></li>
        <li class="breadcrumb-item active" aria-current="page" v-if="showDetailedView">Current Show</li>
      </ol>
        
    </nav>
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
    <div id="detailed-show" v-if="showDetailedView">
        <div class="row">
            
            <div class="col-lg-3 col-md-12">
                <card type="tasks" :header-classes="{'text-right': true}">
                    <template slot="header">
                        <h5 class="title d-inline float-left">{{user.fullName}}</h5>
                        <p class="card-category d-inline">Number of Tracks</p>
                    </template>
                    <img :src="user.imageSource" alt="...">
                    
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
                                <form>
                                  <div class="form-row">
                                      <base-input class="col-md-4" type="text" label="Episode Name" placeholder="Windows or Macintosh?..."/>
                                      <base-input class="col-md-4" type="text" label="Author" placeholder="Mario Figueroa..."/>
                                      <base-input class="col-md-4" type="date" label="Date"></base-input>
                                  </div>
                                  <base-input type="url" label="Audio URL (.mp3)" placeholder="https://drive.google.com/drive/marios-track.mp3"/>
                                  <base-input>
                                    <base-checkbox>Feature Episode (WIP)</base-checkbox>
                                  </base-input>
                                    <div class="form-row text-center mb-3">
                                        <base-button type="primary" native-type="Submit">
                                        <slot name="submit-button">Add Track</slot>
                                        </base-button>
                                        <base-button type="secondary" native-type="Submit" @click="modals.modal1 = false">Cancel</base-button>
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
                                <form>
                                  <div class="form-row">
                                      <base-input class="col-md-4" type="text" label="Show Name" placeholder="Tech Tuesdays..." :value="iShowName"></base-input>
                                      <base-input class="col-md-4" type="text" label="Creator" placeholder="Mario Figueroa..."></base-input>
                                      <base-input class="col-md-4" label="Show Category">
                                            <select id="inputState" class="form-control">
                                              <option selected>Choose...</option>
                                              <option>...</option>
                                            </select>
                                      </base-input>
                                  </div>
                                  <base-input type="url" label="Square Thumbnail URL" placeholder="https://images.google.com/cute-dog.jpg"/>
                                  <base-input label="Show Description">
                                    <textarea class="form-control" id="showDescription" rows="3"></textarea>
                                  </base-input>
                                  <base-input label="Author Description">
                                    <textarea class="form-control" id="authorDescription" rows="2"></textarea>
                                  </base-input>
                                  <div class="form-row">
                                      <base-input class="col-md-4" label="Twitter (Opt)" placeholder="https://twitter.com/elitebyte_"/>
                                      <base-input class="col-md-4" label="Facebook (Opt)" placeholder="https://facebook.com/mario-figueroa-9864129"/>
                                      <base-input class="col-md-4" label="Instagram (Opt)" placeholder="https://instagram.com/elitebyte"/>
                                  </div>
                                  <base-input>
                                    <base-checkbox>Feature Show (WIP)</base-checkbox>
                                  </base-input>
                                    <div class="form-row text-center mb-3">
                                        <base-button type="primary" native-type="Submit">
                                        <slot name="submit-button">Save Changes</slot>
                                        </base-button>
                                        <base-button type="secondary" native-type="Submit" @click="modals.modal2 = false">Cancel</base-button>
                                    </div>                                
                                </form>
                            </card>
                        </modal>
                    </template>
                    
                </card>
            </div>
            
            <div class="col-lg-9 col-md-12">
                <card class="card" :header-classes="{'text-right': true}">
                    <base-table :data="tableData"
                                :columns="columns">
                            <template slot="columns">
                              <th>Track</th>
                              <th>Title</th>
                              <th>Author</th>
                              <th>Plays</th>
                              <th>Date</th>
                              <th>Length</th>
                              <th class="text-right">Actions</th>
                            </template>  
                            <template slot-scope="{row}">
                              <td>{{row.track}}</td>
                              <td>{{row.title}}</td>
                              <td>{{row.author}}</td>
                              <td>{{row.plays}}</td>    
                              <td>{{row.date}}</td>
                              <td>{{row.length}}</td>
                              <td class="td-actions text-right">
                                <base-button type="info" size="sm" icon>
                                  <i class="tim-icons icon-cloud-download-93"></i>
                                </base-button>
                                <base-button type="success" size="sm" icon>
                                  <i class="tim-icons icon-triangle-right-17"></i>
                                </base-button>
                                <base-button type="danger" size="sm" icon>
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
      backToShows: function() {
            this.showDetailedView = false;  
      },
      getShows: function() {
          axios.get("/api/getshows")
            .then((response) => {
              console.log("Hey we got something back")
              console.log(response.data.shows)
              this.shows = response.data.shows
          }).catch((error) => {
              console.log("Yo we did an oopsie " + error)
          })
      }
    },
    data() {
      return {
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
        columns: ["track", "title", "author", "date", "length", "actions"],
        tableData: [
        {
          track: 1,
          title: "Andrew Mike",
          author: "€ 99,225	",
          plays: 10,
          date: "Develop",
          length: 2013,
        },
        {
          track: 2,
          title: "	John Doe",
          author: "€ 89,241",
          plays: 10,
          date: "Design",
          length: 2012,
        },
        {
          track: 3,
          title: "Alex Mike",
          author: "€ 92,144	",
          plays: 10,
          date: "Design",
          length: 2010
        }
        ]
      }
    },
    mounted() {
        this.getShows()
    }
  }
</script>
<style>
</style>
