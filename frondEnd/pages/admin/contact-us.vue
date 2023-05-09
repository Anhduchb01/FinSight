<template>
  <div class="row layout-top-spacing">
    <div class="col-xl-12 col-lg-12 col-md-12">
      <div class="row">
        <div class="col-xl-12 col-md-12">
          <div class="mail-box-container">
            <div class="tab-title">
              <div class="row">
                <div class="col-md-12 col-sm-12 col-12 text-center mail-btn-container"></div>
                <div class="col-md-12 col-sm-12 col-12 mail-categories-container">
                  <div class="mail-sidebar-scroll">
                    <ul class="nav nav-pills d-block" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a v-on:click="statusContact = 'inbox'" class="nav-link list-actions" :class="{'active nav-link':statusContact == 'inbox'}" id="mailInbox">
                          <svg style="margin-right: 0px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-inbox">
                            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                          </svg>
                          <span class="nav-names">Inbox</span>
                          <span class="nav-names"></span>
                          <span id="load-count-inbox" class="badge badge-success">{{dataInbox.length}}</span>
                        </a>
                      </li>
                      <li class="nav-item" v-on:click="statusContact = 'spam'">
                        <a class="nav-link list-actions" :class="{'active nav-link':statusContact == 'spam'}" id="spam">
                          <svg style="margin-right: 0px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12" y2="16" />
                          </svg>
                          <span class="nav-names">Spam</span>
                          <span id="load-count-spam" class="badge badge-success">{{dataSpam.length}}</span>
                        </a>
                      </li>
                      <li class="nav-item" v-on:click="statusContact = 'trash'">
                        <a class="nav-link list-actions" :class="{'active nav-link':statusContact == 'trash'}" id="trashed">
                          <svg style="margin-right: 0px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          <span class="nav-names">Trash</span>
                          <span id="load-count-trash" class="badge badge-success">{{dataTrash.length}}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div id="mailbox-inbox" class="accordion mailbox-inbox" v-if="showDetail">
              <!-- <div id="overlay">
                <div id="text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin">
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                  </svg>Loading...
                </div>
              </div>-->
              <div class="content-box" style="width: 100%; left: 0px; right: 100%;">
                <div class="d-flex msg-close">
                  <svg v-on:click="backContact()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left close-message">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  <h2 id="title-detail" class="mail-title" data-selected-mail-title>{{resultsDetail.customerSub}}</h2>
                </div>

                <div id="mailCollapseEleven" class="ok ps collapse show" aria-labelledby="mailHeadingEleven" data-parent="#mailbox-inbox">
                  <div class="mail-content-container mailInbox" data-mailfrom="info@mail.com" data-mailto="kirsten.beck@mail.com" data-mailcc>
                    <div class="d-flex justify-content-between">
                      <div class="d-flex user-info">
                        <div class="f-head" style="    padding-left: 10px;">
                          <div class="avatar avatar-sm">
                            <span class="avatar-title rounded-circle">KB</span>
                          </div>
                        </div>
                        <div class="f-body">
                          <div class="meta-title-tag">
                            <h4 id="detail-name" class="mail-usr-name" data-mailtitle>{{resultsDetail.customerName}}</h4>
                          </div>
                          <div class="meta-mail-time">
                            <p id="detail-mail" class="user-email" data-mailto="kirsten.beck@mail.com">{{resultsDetail.customerEmail}}</p>
                            <p id="detail-date" class="mail-content-meta-date">{{CompareDate(resultsDetail.timeCreateContacts)}}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p id="detail-msg" class="mail-content">{{resultsDetail.customerMsg}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="mailbox-inbox" class="accordion mailbox-inbox" v-else>
              <LoadDataInbox @LoadDataInbox ="getDataInbox($event)" v-model="statusContact" v-show="statusContact =='inbox'"></LoadDataInbox>
              <LoadDataSpam @LoadDataSpam ="getDataSpam($event)" v-model="statusContact" v-show="statusContact =='spam'"></LoadDataSpam>
              <LoadDataTrash @LoadDataTrash="getDataTrash($event)" v-model="statusContact" v-show="statusContact =='trash'"></LoadDataTrash>
            </div>
          </div>      
          <!-- Modal -->
          <div class="modal fade" id="composeMailModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-dismiss="modal">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <div class="compose-box">
                    <div class="compose-content">
                      <form>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="d-flex mb-4 mail-form">
                              <p>From:</p>
                              <select class id="m-form">
                                <option value="info@mail.com">
                                  Info
                                  &lt;info@mail.com&gt;
                                </option>
                                <option value="shaun@mail.com">
                                  Shaun
                                  Park
                                  &lt;shaun@mail.com&gt;
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <div class="d-flex mb-4 mail-to">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                              <div class>
                                <input type="email" id="m-to" placeholder="To" class="form-control" />
                                <span class="validation-text"></span>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6">
                            <div class="d-flex mb-4 mail-cc">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list">
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3" y2="6" />
                                <line x1="3" y1="12" x2="3" y2="12" />
                                <line x1="3" y1="18" x2="3" y2="18" />
                              </svg>
                              <div>
                                <input type="text" id="m-cc" placeholder="Cc" class="form-control" />
                                <span class="validation-text"></span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="d-flex mb-4 mail-subject">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                          <div class="w-100">
                            <input type="text" id="m-subject" placeholder="Subject" class="form-control" />
                            <span class="validation-text"></span>
                          </div>
                        </div>

                        <div class="d-flex">
                          <input type="file" class="form-control-file" id="mail_File_attachment" multiple="multiple" />
                        </div>

                        <div id="editor-container"></div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button id="btn-save" class="btn float-left">Save</button>
                  <button id="btn-reply-save" class="btn float-left">
                    Save
                    Reply
                  </button>
                  <button id="btn-fwd-save" class="btn float-left">Save Fwd</button>

                  <button class="btn" data-dismiss="modal">
                    <i class="flaticon-delete-1"></i> Discard
                  </button>
                  <button id="btn-reply" class="btn">Reply</button>
                  <button id="btn-fwd" class="btn">Forward</button>
                  <button id="btn-send" class="btn">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoadDataInbox from "~/components/admin/contact-us/LoadDataInboxComponent.vue";
import LoadDataSpam from "~/components/admin/contact-us/LoadDataSpamComponent.vue";
import LoadDataTrash from "~/components/admin/contact-us/LoadDataTrashComponent.vue";
export default {
  layout: "admin",
  data() {
    return {
      statusContact: "inbox",
      resultsDetail: null,
      showDetail: false,
      showToolBarInbox: false,
      showToolBarSpam: false,
      showToolBarTrash: false,
      dataInbox: [],
      dataSpam:[],
      dataTrash: [],
    };
  },
  components: {
    LoadDataInbox,
    LoadDataSpam,
    LoadDataTrash,
  },
  methods: {    
    getDataInbox(event){
       this.dataInbox = event
      
    },
    getDataSpam(event){
      this.dataSpam = event
    },
    getDataTrash(event){
      this.dataTrash = event
    },
    backContact() {
      this.showDetail = false;
    },

   
  },
};
</script>
<style >
.f-head{
  padding-left:10px!important ;
}
input.form-control.input-search{
  height: calc(1.4em + 1.4rem + 2px);
}
</style>