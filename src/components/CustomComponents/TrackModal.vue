<template>
    <modal :show.sync="internalModalBool"
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
                    <slot name="submit-button">Save Changes</slot>
                    </base-button>
                    <base-button type="secondary" native-type="Submit" @click="modalBool1 = false">Cancel</base-button>
                </div>                                
            </form>
        </card>
    </modal>
</template>


<script>
    import Modal from '../Modal'
    export default {
        components: {
            Modal
        },
        name: "track-modal",
        props: {
            modalBool: false
        },
        computed: {
          property  
        },
        methods: {
            toggleShow: function() {
                this.internalModalBool = !this.internalModalBool
                console.log("toggle show has been made")
            }
        }
    }
</script>
