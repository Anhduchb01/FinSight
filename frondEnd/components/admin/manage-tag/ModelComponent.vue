<template>
  <div class="widget widget-three widget-table-one">
    <div style="padding: 20px 20px">
      <div class="widget-heading">
        <h4>Models</h4>
        <div style="cursor: pointer;"></div>
        <div style="cursor: pointer;">
          <svg v-on:click="openSettingPlayGroundModel()" class="icon-model" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
      </div>
      <div v-if="Object.keys(result).length" class="widget-content">
        <div class="order-summary">
          <!-- List model Defaul -->
          <div class="summary-list summary-income">
            <div class="summery-info">
              <div class="w-icon">
                <img class="img--contain image-en" src="~/static/assetsAdmin/img/gbr.png" alt="img" />
              </div>
              <div class="w-summary-details">
                <div class="w-summary-info" v-if="result.en">
                  <h6>
                    {{this.result.en.time}}
                    <span class="summary-count">{{result.en.name}}</span>
                  </h6>
                  <div class="summary-average">
                    <div class="w-summary-info" style="width:180px">
                      <div class="w-summary-mark" style="display: grid">
                        <span style="width:75px" id="status-en" :class="'badge current color-badge-' + this.objStatusEN.statusColor + ' inv-status'">{{objStatusEN.status}}</span>
                        <span class="badge" id="total-en" style="color:#2196f3;text-align: left;">Tags: {{result.en.totalTag}}</span>
                      </div>
                      <div class="w-summary-button">
                        <div style="display: block;">
                          <svg v-on:click="executeModel('en', result.en.name)" class="icon-model play" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1abc9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                    <!-- <span class="badge" id="total-en" style="margin-right: 30px; color:#2196f3;">Tags: {{result.en.totalTag}}</span> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="summary-list summary-income">
            <div class="summery-info" v-if="result.jp">
              <div class="w-icon">
                <img class="img--contain image-jp" src="~/static/assetsAdmin/img/japan.png" alt="img" />
              </div>
              <div class="w-summary-details">
                <div class="w-summary-info">
                  <h6>
                    {{result.jp.time}}
                    <span class="summary-count">{{result.jp.name}}</span>
                  </h6>
                  <div class="summary-average">
                    <div class="w-summary-info" style="width:180px">
                      <div class="w-summary-mark" style="display: grid">
                        <span style="width:75px" id="status-jp" :class="'badge current color-badge-' + this.objStatusJP.statusColor + ' inv-status'">{{objStatusJP.status}}</span>
                        <span class="badge" id="total-jp" style="color:#2196f3;text-align: left">Tags: {{result.jp.totalTag}}</span>
                      </div>
                      <div style="w-summary-button">
                        <div style="display: block;">
                          <svg v-on:click="executeModel('jp', result.jp.name)" class="icon-model play" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1abc9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Execute</title>
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <svg style="stroke: rgb(198, 198, 198);cursor: not-allowed;pointer-events: none;" class="icon-model edit" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Edit</title>
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                          <svg class="icon-model delete" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6C6C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <div class="summary-list summary-profit">
            <div class="summery-info">
              <div class="w-icon">
                <img class="img--contain image-en" src="~/static/assetsAdmin/img/gbr.png" alt="img" />
              </div>
              <div class="w-summary-details">
                <div class="w-summary-info" v-if="result.bert_en">
                  <h6>
                    {{result.bert_en.time}}
                    <span class="summary-count">{{result.bert_en.name}}</span>
                  </h6>
                  <div class="summary-average">
                    <div class="w-summary-info" style="width:180px">
                      <div class="w-summary-mark" style="display: grid">
                        <span style="width:75px" id="status-bert-defaultEN" :class="'badge current color-badge-' + this.objStatusBERTEN.statusColor + ' inv-status'">{{objStatusBERTEN.status}}</span>
                        <span class="badge" title="Total Tag" id="total-bert-defaultEN" style="color:#2196f3;text-align: left">Tags: {{result.bert_en.totalTag}}</span>
                      </div>
                      <div class="w-summary-button">
                        <div style="display: block;">
                          <svg class="icon-model play" v-on:click="executeModelBert('nerbaseEN')" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1abc9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <div class="summary-list summary-profit">
            <div class="summery-info">
              <div class="w-icon">
                <img class="img--contain image-jp" src="~/static/assetsAdmin/img/japan.png" alt="img" />
              </div>
              <div class="w-summary-details">
                <div class="w-summary-info" v-if="result.bert_jp">
                  <h6>
                    {{result.bert_jp.time}}
                    <span class="summary-count">{{result.bert_jp.name}}</span>
                  </h6>
                  <div class="summary-average">
                    <div class="w-summary-info" style="width:180px">
                      <div class="w-summary-mark" style="display: grid">
                        <span style="width:75px" id="status-bert-defaultJP" :class="'badge current color-badge-' + this.objStatusBERTJP.statusColor + ' inv-status'">{{objStatusBERTJP.status}}</span>
                        <span class="badge" title="Total Tag" id="total-bert-defaultJP" style="color:#2196f3;text-align: left">Tags: {{result.bert_jp.totalTag}}</span>
                      </div>
                      <div class="w-summary-button">
                        <div style="display: block;">
                          <svg class="icon-model play" v-on:click="executeModelBert('nerbaseJP')" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1abc9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Execute</title>
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <svg style="stroke: rgb(198, 198, 198);cursor: not-allowed;pointer-events: none;" class="icon-model edit" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Edit</title>
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                          <svg style="pointer-events: none;" class="icon-model delete" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6C6C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <!-- List Model Bert -->
          <div v-for="result of result1" :key="result._id" class="summary-list summary-profit">
            <div v-if="result.language == 'en'" :id="'model-' + result._id">
              <div class="summery-info">
                <div class="w-icon">
                  <img class="img--contain image-en" src="~/static/assetsAdmin/img/gbr.png" alt="img" />
                </div>
                <div class="w-summary-details">
                  <div class="w-summary-info">
                    <h6>
                      {{result.time}}
                      <span class="summary-count" :id="'model-name-' + result._id">{{result.name}}</span>
                    </h6>
                    <div class="summary-average">
                      <div class="w-summary-info">
                        <div class="w-summary-mark">
                          <div>
                            <span class="badge color-badge-warning inv-status" id="status-before-bert-${result._id}" title="Last Score">{{result.lastScore.toFixed(1)}}%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                            <span :class="'badge current color-badge-' + objStatusEN.statusColor +' inv-status'" title="Current Score" :id="'status-bert-' + result._id" style="margin-right: 30px;">{{result.score.toFixed(1)}}%</span>
                          </div>
                          <div>
                            <span class="badge" title="Last Total Tag">{{result.lastTotalTag}}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                            <span class="badge" title="Current Total Tag" :id="'status-bert-' + result._id" style="margin-right: 25px;">{{result.totalTag}}</span>
                          </div>
                        </div>
                        <div class="w-summary-button">
                          <div style="display: block;">
                            <svg class="icon-model play" v-on:click="executeModelBert()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1abc9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="'feather feather-play'">
                              <title>Execute</title>
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            <svg class="icon-model evaluate" onclick="evaluateModelBert('en','${result._id}')" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #2196F3; padding: 1px;border-radius: 4px; color:#CC6600" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="'feather feather-trending-up'">
                              <title>Evaluate</title>
                              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                              <polyline points="17 6 23 6 23 12" />
                            </svg>
                            <svg class="icon-model training" onclick="trainModel('en','${result._id}')" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="'feather feather-airplay'">
                              <title>Training</title>
                              <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                              <polygon points="12 15 17 21 7 21 12 15" />
                            </svg>
                            <svg onclick="openEditModel('${result._id}', '${result.name}','${result.time}','${result.language}')" class="icon-model edit edit-model-ai" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="'feather feather-edit-3'">
                              <title>Edit</title>
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            <svg onclick="openDeleteModel('${result._id}')" class="icon-model remove-model-ai" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e7515a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="'feather feather-x-circle'">
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
            <div v-else :id="'model-' + result._id">
              <div class="summery-info">
                <div class="w-icon">
                  <img class="img--contain image-jp" src="~/static/assetsAdmin/img/japan.png" alt="img" />
                </div>
                <div class="w-summary-details">
                  <div class="w-summary-info">
                    <h6>
                      {{result.time}}
                      <span class="summary-count" :id="'model-name-' + result._id">{{result.name}}</span>
                    </h6>
                    <div class="summary-average">
                      <div class="w-summary-info">
                        <div class="w-summary-mark">
                          <div>
                            <span class="badge color-badge-warning inv-status" :id="'status-before-bert-' + result._id" title="Last Score">{{result.lastScore}}%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                            <span :class="'badge current color-badge-' + objStatusJP1.statusColor + ' inv-status'" title="Current Score" :id="'status-bert-' + result._id" style="margin-right: 30px;">{{result.score.toFixed(1)}}%</span>
                          </div>
                          <div>
                            <span class="badge" title="Last Score">{{result.lastTotalTag}}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                            <span class="badge" title="Current Score" :id="'status-bert-' + result._id" style="margin-right: 30px;">{{result.totalTag}}</span>
                          </div>
                        </div>
                        <div style="w-summary-button">
                          <div style="display: block;">
                            <svg class="icon-model play" v-on:click="executeModelBert()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1abc9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="'feather feather-play'">
                              <title>Execute</title>
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            <svg class="icon-model evaluate" onclick="evaluateModelBert('jp','${result._id}')" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #2196F3; padding: 1px;border-radius: 4px; color:#CC6600" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="'feather feather-trending-up'">
                              <title>Evaluate</title>
                              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                              <polyline points="17 6 23 6 23 12" />
                            </svg>
                            <svg class="icon-model training" onclick="trainModel('jp','${result._id}')" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="'feather feather-airplay'">
                              <title>Training</title>
                              <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                              <polygon points="12 15 17 21 7 21 12 15" />
                            </svg>
                            <svg onclick="openEditModel('${result._id}', '${result.name}'${result.time})" class="icon-model edit edit-model-ai" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="'feather feather-edit-3'">
                              <title>Edit</title>
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            <svg onclick="openDeleteModel('${result._id}')" class="icon-model remove-model-ai" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e7515a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="'feather feather-x-circle'">
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
      <div id="flow-chart" style="height: 400px;" v-else>
        <div style="height: 10px; text-align: center;">
          <div id="loading-chart-overview" style=" margin-top: 95px;" class="spinner-border text-success align-self-center"></div>
        </div>
      </div>
    </div>
    <!-- Model -->
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
                        <div style="margin-right: 10px;width: 100%;">
                          <h4>Model English</h4>
                          <select v-model="modelPlaygroundEn" id="select-result-playground-en" class="placeholder js-states form-control">
                            <option value="0">--- Don't choose model ---</option>
                            <option v-for="model in listModelTagEN" :key="model.model_id" :value="model.model_id+'+'+model.time">{{model.name}} {{model.time}}</option>
                          </select>
                        </div>
                        <div style="margin-right: 10px;width: 100%;">
                          <h4>Model Japanese</h4>
                          <select id="select-result-playground-jp" class="placeholder js-states form-control">
                            <option value="0">--- Don't choose model ---</option>
                            <option v-for="model in listModelTagJP" :key="model.model_id" :value="model.model_id+'+'+model.time">{{model.name}} {{model.time}}</option>
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
    <!-- Create new model -->
  </div>
</template>
<script>
import { HTTP } from "../../../static/baseAPIAdmin.js";
import Snackbar from "awesome-snackbar";
export default {
  data() {
    return {
      resultExcuteNearbaseEN: [],
      resultExcuteNearbaseJP: [],
      modelPlaygroundEn: 0,
      modelPlaygroundJp: 0,
      result: [],
      results: [],
      result1: [],
      arrayIdModel: [],
      objStatusEN: [],
      objStatusJP: [],
      objStatusBERTEN: [],
      objStatusBERTJP: [],
      objStatusEN1: [],
      objStatusJP1: [],
      test: null,
      listModelTag1: [],
      listModelTagEN: [],
      listModelTagJP: [],
    };
  },
  methods: {
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
    executeModel(type, name) {},
    executeModelBert(name) {
      if (name === "nerbaseEN") {
        HTTP.get(
          "https://apicloud.waterportal.sinka.vn/models/ai/execute?id=defaultEN&time=2021/12/06 17:42:30&language=en"
        )
          .then((response) => {
            this.resultExcuteNearbaseEN = response.data;
          })
          .catch(Error);
      }
      if (name === "nerbaseJP") {
        HTTP.get(
          "https://apicloud.waterportal.sinka.vn/models/ai/execute?id=defaultJP&time=2021/12/06 17:42:30&language=jp"
        )
          .then((response) => {
            this.resultExcuteNearbaseJP = response.data;
          })
          .catch(Error);
      }
    },
    openSettingPlayGroundModel() {
      this.$modal.show("modal-setting-playground-model");
    },
    closeSettingPlayGroundModel() {
      this.$modal.hide("modal-setting-playground-model");
    },
    listModel() {
      HTTP.get("tags/get-list-model-generate-history").then((response) => {
        this.listModelTag1 = response.data;
        for (let i = 0; i < this.listModelTag1.length; i++) {
          if (
            this.listModelTag1[i].model_id != "Library (English)" &&
            this.listModelTag1[i].model_id != "Library (Japanese)"
          ) {
            if (this.listModelTag1[i].lang === "en") {
              this.listModelTagEN.push(this.listModelTag1[i]);
            } else {
              this.listModelTagJP.push(this.listModelTag1[i]);
            }
          }
        }
      });
    },
  },
  mounted() {
    this.listModel();
    HTTP.get(`models/lib?sourceModel=tag`).then((response) => {
      this.arrayIdModel = [];
      this.arrayIdModel.push({
        _id: "defaultEN",
        name: response.data.data.bert_en.name,
      });
      this.arrayIdModel.push({
        _id: "defaultEN",
        name: response.data.data.bert_jp.name,
      });
      this.result = response.data.data;
      if (this.result.en.status == 1) {
        this.objStatusEN.status = "In Process";
        this.objStatusEN.statusColor = "warning";
      }
      if (this.result.jp.status == 1) {
        this.objStatusJP.status = "In Process";
        this.objStatusJP.statusColor = "warning";
      }
      if (this.result.bert_en.status == 1) {
        this.objStatusBERTEN.status = "In Process";
        this.objStatusBERTEN.statusColor = "warning";
      }
      if (this.result.bert_jp.status == 1) {
        this.objStatusBERTJP.status = "In Process";
        this.objStatusBERTJP.statusColor = "warning";
      }
      if (this.result.en.status == 0) {
        this.objStatusEN.status = "Success";
        this.objStatusEN.statusColor = "success";
      }
      if (this.result.jp.status == 0) {
        this.objStatusJP.status = "Success";
        this.objStatusJP.statusColor = "success";
      }
      if (this.result.bert_en.status == 0) {
        this.objStatusBERTEN.status = "Success";
        this.objStatusBERTEN.statusColor = "success";
      }
      if (this.result.bert_jp.status == 0) {
        this.objStatusBERTJP.status = "Success";
        this.objStatusBERTJP.statusColor = "success";
      }
      if (this.result.en.status == 2) {
        this.objStatusEN.status = "Failed";
        this.objStatusEN.statusColor = "danger";
      }
      if (this.result.jp.status == 2) {
        this.objStatusJP.status = "Failed";
        this.objStatusJP.statusColor = "danger";
      }
      if (this.result.bert_en.status == 2) {
        this.objStatusBERTEN.status = "Failed";
        this.objStatusBERTEN.statusColor = "danger";
      }
      if (this.result.bert_jp.status == 2) {
        this.objStatusBERTJP.status = "Failed";
        this.objStatusBERTJP.statusColor = "danger";
      }
    }),
      HTTP.get(`models/bert?sourceModel=tag`).then((response) => {
        let i = 0;
        this.result1 = response.data;

        this.result1.forEach((value) => {
          this.test = Math.ceil(this.result1.lastScore);
          this.arrayIdModel.push({ _id: value._id, name: value.name });
          if (this.result1[i].status == 1) {
            this.objStatusEN1.status = "In Process";
            this.objStatusEN1.statusColor = "warning";
            this.objStatusJP1.status = "In Process";
            this.objStatusJP1.statusColor = "warning";
          }
          if (this.result1[i].status == 0) {
            this.objStatusEN1.status = "Success";
            this.objStatusEN1.statusColor = "success";
            this.objStatusJP1.status = "Success";
            this.objStatusJP1.statusColor = "success";
          }
          if (this.result1[i].status == 2) {
            this.objStatusEN1.status = "Failed";
            this.objStatusEN1.statusColor = "danger";
            this.objStatusJP1.status = "Failed";
            this.objStatusJP1.statusColor = "danger";
          }
          if (this.result1[i].language == "en") {
            if (this.result1.status == 1) {
              this.objStatusEN1.status = "In Process";
              this.objStatusEN1.statusColor = "warning";
            }
            if (this.result1[i].status == 0) {
              this.objStatusEN1.statustotalTag = this.result1[i].totalTag;
              this.objStatusEN1.statusColor = "success";
            }
          } else {
            if (this.result1[i].status == 1) {
              this.objStatusJP1.status = "In Process";
              this.objStatusJP1.statusColor = "warning";
            }
            if (this.result1[i].status == 0) {
              this.objStatusJP1.statustotalTag = this.result1[i].totalTag;
              this.objStatusJP1.statusColor = "success";
            }
          }
          i++;
        });
      });
  },
};
</script>