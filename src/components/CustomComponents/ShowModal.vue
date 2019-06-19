<template>
    <modal :show.sync="modalBool"
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
                  <base-input class="col-md-4" type="text" label="Show Name" placeholder="Tech Tuesdays..."/>
                  <base-input class="col-md-4" type="text" label="Creator" placeholder="Mario Figueroa..."/>
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
                <textarea class="form-control" id="showDescription" rows="2"></textarea>
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
                    <base-button type="secondary" native-type="Submit" @click="modalBool = false">Cancel</base-button>
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
        name: "show-modal",
        props: {
            modalBool: false
        }
    }
</script>
