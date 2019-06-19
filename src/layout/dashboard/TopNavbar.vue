<template>
  <nav class="navbar navbar-expand-lg navbar-absolute"
       :class="{'bg-white': showMenu, 'navbar-transparent': !showMenu}">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline" :class="{toggled: $sidebar.showSidebar}">
          <button type="button"
                  class="navbar-toggler"
                  aria-label="Navbar toggle button"
                  @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="#pablo">{{routeName}}</a>
      </div>
      <button class="navbar-toggler" type="button"
              @click="toggleMenu"
              data-toggle="collapse"
              data-target="#navigation"
              aria-controls="navigation-index"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <collapse-transition>
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
            <div class="search-bar input-group" @click="searchModalVisible = true">
              <!-- <input type="text" class="form-control" placeholder="Search...">
              <div class="input-group-addon"><i class="tim-icons icon-zoom-split"></i></div> -->
              <button class="btn btn-link" id="search-button" data-toggle="modal" data-target="#searchModal">
                <i class="tim-icons icon-zoom-split"></i>
              </button>
              <!-- You can choose types of search input -->
            </div>
            <modal :show.sync="searchModalVisible"
                   class="modal-search"
                   id="searchModal"
                   :centered="false"
                   :show-close="true">
              <input slot="header" v-model="searchQuery" type="text" class="form-control" id="inlineFormInputGroup" placeholder="SEARCH">
            </modal>
              
             <base-button round icon simple type="primary" class="nav-item" tag="li" @click="modals.modal1 = true">
              <i class="tim-icons icon-simple-add"></i></base-button>
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
                                    <slot name="subheader">Enter Data</slot>
                                    </small>
                                    <h2>
                                    <slot name="header">Add Show</slot>
                                    </h2>
                                </div>
                                <form v-on:submit="addShow">
                                  <div class="form-row">
                                      <base-input class="col-md-4" type="text" label="Show Name" placeholder="Tech Tuesdays..." v-model="showModalData.name"></base-input>
                                      <base-input class="col-md-4" type="text" label="Creator" placeholder="Mario Figueroa..." v-model="showModalData.creator"></base-input>
                                      <base-input class="col-md-4" label="Show Category" >
                                            <select id="inputState" class="form-control" v-model="showModalData.category">
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
                                  <base-input type="url" label="Square Thumbnail URL" placeholder="https://images.google.com/cute-dog.jpg" v-model="showModalData.thumbnailURL"/>
                                  <base-input label="Show Description" >
                                    <textarea class="form-control" id="showDescription" rows="3" v-model="showModalData.desc"></textarea>
                                  </base-input>
                                  <base-input label="Author Description" >
                                    <textarea class="form-control" id="authorDescription" rows="2" v-model="showModalData.creatorDesc"></textarea>
                                  </base-input>
                                  <div class="form-row">
                                      <base-input class="col-md-4" label="Twitter (Opt)" placeholder="https://twitter.com/elitebyte_" v-model="showModalData.twitterURL"/>
                                      <base-input class="col-md-4" label="Facebook (Opt)" placeholder="https://facebook.com/mario-figueroa-9864129" v-model="showModalData.facebookURL"/>
                                      <base-input class="col-md-4" label="Instagram (Opt)" placeholder="https://instagram.com/elitebyte" v-model="showModalData.instagramURL"/>
                                  </div>
                                  <base-input>
                                    <base-checkbox v-model="showModalData.featureShow">Feature Show (WIP)</base-checkbox>
                                  </base-input>
                                    <div class="form-row text-center mb-3">
                                        <base-button v-if="!isLoading" type="primary" native-type="Submit">
                                            <slot name="submit-button">Add Show</slot>
                                        </base-button>
                                        <base-button loading v-if="isLoading" type="primary">Adding...</base-button>
                                        <base-button type="secondary"  @click="modals.modal1 = false">Cancel</base-button>
                                    </div>                                
                                </form>
                            </card>
                        </modal>
                    </template>
            <base-dropdown tag="li"
                           :menu-on-right="!$rtl.isRTL"
                           title-tag="a"
                           class="nav-item"
                           menu-classes="dropdown-navbar">
              <a slot="title" href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="true">
                <div class="photo">
                  <img src="img/anime3.png">
                </div>
                <b class="caret d-none d-lg-block d-xl-block"></b>
                <p class="d-lg-none">
                  Log out
                </p>
              </a>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Profile</a>
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Settings</a>
              </li>
              <div class="dropdown-divider"></div>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Log out</a>
              </li>
            </base-dropdown>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </nav>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions';
  import Modal from '@/components/Modal';
    
  import axios from "axios"    
  import router from "../../router"
    

  export default {
    components: {
      CollapseTransition,
      Modal
    },
    computed: {
      routeName() {
        const { name } = this.$route;
        return this.capitalizeFirstLetter(name);
      },
      isRTL() {
        return this.$rtl.isRTL;
      }
    },
    data() {
      return {
        modals: {
            modal1: false
        },
        isLoading: false,
        showModalData: {
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
        },
        activeNotifications: false,
        showMenu: false,
        searchModalVisible: false,
        searchQuery: ''
      };
    },
    methods: {
      addShow() {
          
          let data = this.showModalData
          console.log(data)
          this.isLoading = true
          axios.post("/api/addshow", data)
            .then((response) => {
              this.isLoading = false
              console.log(response)
              this.modals.modal1 = false
              router.push("/shows")
          })
          .catch((errors) => {
            console.log("Was not able to add show error: " + errors)
          })
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications;
      },
      closeDropDown() {
        this.activeNotifications = false;
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    }
  };
</script>
<style>
</style>
