<template>
  <div class="widget widget-three widget-table-one">
    <div style="padding: 20px 20px">
      <div class="widget-heading">
        <h4>Models</h4>
        <div style="cursor: pointer;">
          <!-- <svg v-on:click="openSettingPlayGroundModel()" class="icon-model" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg> -->
          <svg v-on:click="openModalModel()" class="icon-model" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>
      <div class="widget-content">
        <div class="order-summary" v-if="listModelBase&&listModelBase.length">
          <div v-for="(listModel,index) of listModelBase" :key="listModel.id" class="summary-list summary-profit">
            <div class="summery-info">
              <div class="w-icon">
                <img class="img--contain image-en" style="    width: 100%;height: 100%;" src="~/static/assetsAdmin/img/model1.png" alt="img" />
              </div>
              <div class="w-summary-details">
                <div class="w-summary-info">
                  <h6>
                    {{data[index].time}}
                    <span class="summary-count">{{data[index].name}}</span>
                  </h6>
                  <div class="summary-average">
                    <div class="w-summary-info">
                      <span  v-text="status[index]" :class="'badge color-badge-'+statusColor[index]+ ' inv-status'" :id="'status-bert-'+ data[index]._id + '-'+ data[index].language" style="margin-right: 30px;"></span>
                      <div>
                        <div style="display: block;">
                          <svg :class="{'locked':lock}" class="icon-model play" v-on:click="executeModelBert(data._id,data.time)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1abc9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Execute</title>
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>

                          <svg style="stroke: rgb(198, 198, 198);cursor: not-allowed;pointer-events: none;" class="icon-model edit" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Edit</title>
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>

                          <svg class="icon-model delete" style="pointer-events: none;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6C6C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Delete</title>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <div v-for="(listModelCreate,index) of listModelCreate" :key="listModelCreate.id" class="summary-list summary-profit" :id="'model-' +data1[index]">
            <div class="summery-info">
              <div class="w-icon">
                <img class="img--contain image-en"  style="    width: 100%;height: 100%;" src="~/static/assetsAdmin/img/model1.png" alt="img" />
              </div>
              <div class="w-summary-details">
                <div class="w-summary-info">
                  <h6>
                    {{data1[index].time}}
                    <span class="summary-count" :id="'model-name-'+data1[index]._id">{{data1[index].name}}</span>
                  </h6>
                  <div class="summary-average">
                    <div class="w-summary-info">
                      <span :class="'badge color-badge-'+ statusColor1[index] + ' inv-status'" :id="'status-bert-'+data1[index]._id +'-' +data1[index].language" :title="'Score before training : '+ data1[index].lastScore +'%'" style="margin-right: 30px;">{{status1[index]}}</span>
                      <div>
                        <div style="display: block;">
                          <svg class="icon-model play" onclick="executeModelBert('${data.language}','${data._id}','${data.time}')" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1abc9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Execute</title>
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <svg class="icon-model training" onclick="trainModel('${data.language}','${data._id}')" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                            <polygon points="12 15 17 21 7 21 12 15" />
                          </svg>

                          <svg onclick="openEditModel('${data._id}', '${data.name}')" class="icon-model edit-model-ai" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Edit</title>
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>

                          <svg onclick="openDeleteModel('${data._id}')" class="icon-model delete-model-ai" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e7515a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Delete</title>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <modal name="modal-setting-playground-model" height="271px" width="500px" styles="overflow: initial">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <svg v-on:click="closeSettingPlayGroundModel()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-dismiss="modal">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <div class="compose-box">
              <div class="compose-content">
                <div class="row mb-4">
                  <div class="col-md-12">
                    <h5 style="font-weight: bold;color: #4361ee !important;" class="modal-title text-center">Choose Model to PlayGround</h5>
                  </div>
                </div>
                <form>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="d-flex mb-4 mail-to">
                        <div style="margin-right: 10px; width: 100%;">
                          <h4>Model </h4>
                          <select v-model="modelPlaygroundEn" id="select-result-playground-en" class="placeholder js-states form-control">
                            <option value="0">--- Don't choose model ---</option>
                            <option v-for="model in listModelEN" :key="model._id" class style="display: ${data.language === 'en' ? 'block' : 'none'}" :value="model._id+'+'+model.time">{{model.name}} ({{model.time}})</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button v-on:click="saveModelPlayGround()" id="btn-save-model-playground" class="btn btn-primary float-left">
              <svg style="display:none" id="icon-loadding" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin mr-2">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg> Apply
            </button>
          </div>
        </div>
      </div>
    </modal>
    <modal name="modal-create-model" height="271px" width="500px" styles="overflow: initial">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <svg v-on:click="closeModalModel()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-dismiss="modal">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <div class="compose-box">
              <div class="compose-content">
                <div class="row mb-4">
                  <div class="col-md-12">
                    <h5 style="font-weight: bold;color: #4361ee !important;" class="modal-title text-center">Create model</h5>
                  </div>
                </div>
                <form>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="d-flex mb-4 mail-to">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type">
                          <polyline points="4 7 4 4 20 4 20 7" />
                          <line x1="9" y1="20" x2="15" y2="20" />
                          <line x1="12" y1="4" x2="12" y2="20" />
                        </svg>
                        <div class="w-100">
                          <input v-model="createModelName" id="model-name-create" placeholder="Model name" class="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="d-flex mb-4 mail-to">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <div>
                          <select v-model="modelParent" id="model-parent" class="placeholder js-states form-control">
                            <option v-for="model in listModelBase" :key="model._id" class style="display: ${data.language === 'en' ? 'block' : 'none'}" :value="'default'+'+'+model.time+'+'+model.name">{{model.name}} ({{model.time}})</option>
                            <!-- <option v-for="model in listModelJP" :key="model._id" class style="display: ${data.language === 'en' ? 'block' : 'none'}" :value="model._id+'+'+model.time">{{model.name}} ({{model.time}})</option> -->
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div>
                                    <div class="n-chk">
                                        <label class="new-control new-radio radio-primary">
                                            <input type="radio" value="multiple" class="new-control-input"
                                                name="language-radio-1" checked>
                                            <span class="new-control-indicator"></span>Multiple Language
                                        </label>
                                    </div>
                  </div>-->
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button v-on:click="createModel()" id="btn-save-modal-create" class="btn btn-primary float-left">
              <svg style="display:none" id="icon-loadding-create-model" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin mr-2">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg> Create
            </button>
            <button class="btn" data-dismiss="modal">
              <i class="flaticon-delete-1"></i> Discard
            </button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Snackbar from "awesome-snackbar";
import { HTTP } from "../../../static/baseAPI.js";

export default {
  props: ["listModelBaseOrigin", "listModelCreateOrigin"],
  computed: {
    listModelBase() {
      return this.listModelBaseOrigin;
    },
    listModelCreate() {
      return this.listModelCreateOrigin;
    },

    listModelEN() {
      let array = [];
      for (let index = 0; index < this.listModelBaseOrigin.length; index++) {
        if (this.listModelBaseOrigin[index].language === "en") {
          array.push(this.listModelBaseOrigin[index]);
        }
      }
      for (let index = 0; index < this.listModelCreateOrigin.length; index++) {
        if (this.listModelCreateOrigin[index].language === "en") {
          array.push(this.listModelCreateOrigin[index]);
        }
      }
      return array;
    },
    listModelJP() {
      let array = [];
      for (let index = 0; index < this.listModelBaseOrigin.length; index++) {
        if (this.listModelBaseOrigin[index].language === "jp") {
          array.push(this.listModelBaseOrigin[index]);
        }
      }
      for (let index = 0; index < this.listModelCreateOrigin.length; index++) {
        if (this.listModelCreateOrigin[index].language === "jp") {
          array.push(this.listModelCreateOrigin[index]);
        }
      }
      return array;
    },
    modelPlaygroundEnOrigin() {
      let model = 0;
      for (let index = 0; index < this.listModelBaseOrigin.length; index++) {
        if (
          this.listModelBaseOrigin[index].isPlayGround === 1 &&
          this.listModelBaseOrigin[index].language === "en"
        ) {
          model =
            this.listModelBaseOrigin[index]._id +
            "+" +
            this.listModelBaseOrigin[index].time;
        }
      }
      for (let index = 0; index < this.listModelCreateOrigin.length; index++) {
        if (
          this.listModelCreateOrigin[index].isPlayGround === 1 &&
          this.listModelBaseOrigin[index].language === "en"
        ) {
          model =
            this.listModelCreateOrigin[index]._id +
            "+" +
            this.listModelCreateOrigin[index].time;
        }
      }
      return model;
    },
    modelPlaygroundJpOrigin() {
      let model = 0;
      for (let index = 0; index < this.listModelBaseOrigin.length; index++) {
        if (
          this.listModelBaseOrigin[index].isPlayGround === 1 &&
          this.listModelBaseOrigin[index].language === "jp"
        ) {
          model = this.listModelBaseOrigin[index]._id + "+" + this.listModelBaseOrigin[index].time;
        }
      }
      for (let index = 0; index < this.listModelCreateOrigin.length; index++) {
        if (
          this.listModelCreateOrigin[index].isPlayGround === 1 &&
          this.listModelBaseOrigin[index].language === "jp"
        ) {
          model = this.listModelCreateOrigin[index]._id +  "+" + this.listModelCreateOrigin[index].time;
        }
      }
      return model;
    },
  },
  data() {
    return {
      createModelName: null,
      modelParent :'',
      modelPlaygroundEn: 0,
      modelPlaygroundJp: 0,
      data: [],
      data1: [],

      status: [],
      statusColor: [],

      status1: [],
      statusColor1: [], 
      lock: false,      
    };
  },
  methods: {
    openModalModel() {
      this.$modal.show("modal-create-model");
    },
    closeModalModel() {
      this.$modal.hide("modal-create-model");
      new Snackbar(`Save Model for Play Ground Success`, {
        position: "bottom-right",
        theme: "light",
        style: {
          container: [
            ["background-color", "#1abc9c"],
            ["border-radius", "5px"],
          ],
          message: [["color", "#fff"]],
        },
      });
      this.closeSettingPlayGroundModel();      
    },
    executeModelBert( id, time) {    
      this.lock = true  
      HTTP.get(
        "models/classification/execute-model?id=default&time=2023/04/11 18:00:55" 
      )
        .then((response) => {
          for (let index = 0; index < this.data.length; index++) {
            if (this.data[index].name === "AI Sentiment Analysis Base") {
              if (this.data[index].status == 1) {
                this.status[index] = "In Process";
                this.statusColor[index] = "warning";
              }
              if (this.data[index].status == 0) {
                this.status[index] = "Success";
                this.statusColor[index] = "success";
              }
              if (this.data[index].status == 2) {
                this.status = "Failed";
                this.statusColor = "danger";
              }
            }
            if (this.data[index].name === "AI Sentiment Analysis Base") {
              if (this.data[index].status == 1) {
                this.status[index] = "In Process";
                this.statusColor[index] = "warning";
              }
              if (this.data[index].status == 0) {
                this.status[index] = "Success";
                this.statusColor[index] = "success";
              }
              if (this.data[index].status == 2) {
                this.status = "Failed";
                this.statusColor = "danger";
              }
            }
          }
        })
        .catch(Error);
    },
    createModel(){
      let valueOption = this.modelParent;        
      let array = valueOption.split("+");
      let idModel = array[0];
      let time = array[1];
      let nameParent = array[2];
      let timeNow =this.$dayjs().format('YYYY/MM/DD HH:mm:ss')

      if (nameParent =='AI Sentiment Analysis Base'){
        idModel = 'default'
      }
      HTTP.post(`models/classification/create-model`, {
         time: timeNow,name: this.createModelName, idModelParent: idModel ,sourceModel:'classification'
      }).then((response) => {});

    },
    saveModelPlayGround() {
      if (this.modelPlaygroundEn != 0) {
        let valueOptionEn = this.modelPlaygroundEn;        
        let arrayEn = valueOptionEn.split("+");
        let idModelEn = arrayEn[0];
        let timeEn = arrayEn[1];
        let language = "en";

        HTTP.get(`save-model-play-ground`, {
          params: { idModel: idModelEn, language: language },
        }).then((response) => {});
      } else {
        let language = "en";
        let source = "classification";
        HTTP.get(`clear-model-play-ground`, {
          params: { language: language, source: source },
        }).then((response) => {});
      }
      if (this.modelPlaygroundJp != 0) {
        let valueOptionJp = this.modelPlaygroundJp;
        let arrayJp = valueOptionJp.split("+");
        let idModelJp = arrayJp[0];
        let timeJp = arrayJp[1];
        let language = "jp";
        HTTP.get(`save-model-play-ground`, {
          params: { idModel: idModelJp, language: language },
        }).then((response) => {});
      } else {
        let language = "jp";
        let source = "classification";
        HTTP.get(`clear-model-play-ground`, {
          params: { language: language, source: source },
        }).then((response) => {});
      }
      new Snackbar(`Save Model for Play Ground Success`, {
        position: "bottom-right",
        theme: "light",
        style: {
          container: [
            ["background-color", "#1abc9c"],
            ["border-radius", "5px"],
          ],
          message: [["color", "#fff"]],
        },
      });
      this.closeSettingPlayGroundModel();
    },
    openSettingPlayGroundModel(point) {
      this.$modal.show("modal-setting-playground-model");
    },
    closeSettingPlayGroundModel(point) {
      this.$modal.hide("modal-setting-playground-model");
    },
  },
  beforeUpdate() {
    for (let index = 0; index < this.listModelBase.length; index++) {
      this.data[index] = this.listModelBase[index];
      if (this.data[index].status == 1) {
        this.status[index] = "In Process";
        this.statusColor[index] = "warning";
      }
      if (this.data[index].status == 0) {
        this.status[index] = "Success";
        this.statusColor[index] = "success";
      }
      if (this.data[index].status == 2) {
        this.status = "Failed";
        this.statusColor = "danger";
      }
    }

    for (let index = 0; index < this.listModelCreate.length; index++) {
      this.data1[index] = this.listModelCreate[index];
      if (this.data1[index].status == 1) {
        this.status1[index] = "In Process";
        this.statusColor1[index] = "warning";
      }

      if (this.data1[index].status == 0) {
        this.status1[index] = this.data1[index].score.toFixed(1) + "%";
        this.statusColor1[index] = "success";
      }
      if (this.data1[index].status == 2) {
        this.status1[index] = "Failed";
        this.statusColor[index] = "danger";
      }
    }
  },
  mounted() {
    this.$watch("modelPlaygroundEnOrigin", (newKey) => {
      this.modelPlaygroundEn = this.modelPlaygroundEnOrigin;
    });
    this.$watch("modelPlaygroundJpOrigin", (newKey) => {
      this.modelPlaygroundJp = this.modelPlaygroundJpOrigin;
    });
  },
};
</script>
<style scoped>
.locked{
  stroke: rgb(198, 198, 198);
  cursor: not-allowed; 
  pointer-events: none;
}
</style>