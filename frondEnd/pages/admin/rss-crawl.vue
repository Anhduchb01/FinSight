<template>
    <div class="row layout-spacing layout-top-spacing" id="cancel-row">
    <div class="col-lg-12">
        <div class="widget-content searchable-container list">
            <div class="row">
                <div class="col-xl-4 col-lg-5 col-md-5 col-sm-7 filtered-list-search layout-spacing align-self-center">
                    <form class="form-inline my-2 my-lg-0">
                        <div class="w-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="feather feather-search">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" class="form-control product-search" id="input-search"
                                placeholder="Search Contacts...">
                        </div>
                    </form>
                </div>
                <div class="col-xl-8 col-lg-7 col-md-7 col-sm-5 text-sm-right text-center layout-spacing align-self-center">
                    <div class="d-flex justify-content-sm-end justify-content-center">     
                        <svg id="btn-create-page-rss" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-plus">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>                   
                            <div style="width: auto;height: auto;" class="switch align-self-center">                                
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-list view-list active-view">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3" y2="6"></line>
                                    <line x1="3" y1="12" x2="3" y2="12"></line>
                                    <line x1="3" y1="18" x2="3" y2="18"></line>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-grid view-grid">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                            </div>                   
                    </div>
                    <div class="modal fade" id="modal-create-page-rss" tabindex="-1" role="dialog"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="feather feather-x close"
                                        data-dismiss="modal">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    <div class="compose-box">
                                        <div class="compose-content">
                                            <div class="row mb-4">
                                                <div class="col-md-12">
                                                    <h5 style="font-weight: bold;color: #4361ee !important;"
                                                        class="modal-title text-center">Create Page Crawl</h5>
                                                </div>
                                            </div>
                                            <form>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="d-flex mb-4 mail-to">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                width="24" height="24"
                                                                viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="feather feather-type">
                                                                <polyline
                                                                    points="4 7 4 4 20 4 20 7">
                                                                </polyline>
                                                                <line x1="9" y1="20" x2="15"
                                                                    y2="20"></line>
                                                                <line x1="12" y1="4" x2="12"
                                                                    y2="20"></line>
                                                            </svg>
                                                            <div class="w-100">
                                                                <input type="email"
                                                                    id="name-page-rss"
                                                                    placeholder="Name Page"
                                                                    class="form-control">
                                                                <span
                                                                    class="validation-text"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="d-flex mb-4 mail-subject">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="feather feather-home">
                                                        <path
                                                            d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                                                        </path>
                                                        <polyline points="9 22 9 12 15 12 15 22">
                                                        </polyline>
                                                    </svg>
                                                    <div class="w-100">
                                                        <input type="text" id="url-page-rss"
                                                            placeholder="https://"
                                                            class="form-control">
                                                        <span class="validation-text"></span>
                                                    </div>
                                                </div>

                                                <div style="text-align: left;"
                                                    class="d-flex mail-subject">
                                                    <div class="box-switch">
                                                        <label
                                                            class="switch s-icons s-outline  s-outline-primary">
                                                            <input onclick="checkStatusTimeCreate()"
                                                                class="input-address"
                                                                id="check-time"
                                                                type="checkbox"><span
                                                                class="slider round">
                                                                <p class="pl-3"
                                                                    style="margin-left: 40px;white-space: nowrap;font-weight: 600;">
                                                                    Schedule Crawl</p>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="d-flex mail-subject">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="feather feather-clock">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <polyline points="12 6 12 12 16 14">
                                                        </polyline>
                                                    </svg>
                                                    <div class="w-100">
                                                        <select disabled id="inputStateTime"
                                                            class="form-control">
                                                            <option value="1h">1 Hour</option>
                                                            <option value="12h">12 Hour</option>
                                                            <option value="24h">24 Hour</option>
                                                            <option value="3d">3 Day</option>
                                                            <option value="7d">7 Day</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <small style="text-align: left;margin-left: 36px;"
                                                    id="emailHelp1"
                                                    class="form-text text-muted mb-4">Select time
                                                    for schedule</small>


                                                <div style="text-align: left;">
                                                    <div class="box-switch">
                                                        <label
                                                            class="switch s-icons s-outline  s-outline-primary"><input
                                                                class="input-address"
                                                                id="check-display"
                                                                type="checkbox"><span
                                                                class="slider round">
                                                                <p class="pl-3"
                                                                    style="margin-left: 40px;white-space: nowrap;font-weight: 600;">
                                                                    Public Post</p>
                                                            </span></label>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button id="btn-save-modal-create"
                                        class="btn btn-primary float-left"><svg style="display:none"
                                            id="icon-loadding" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-loader spin mr-2">
                                            <line x1="12" y1="2" x2="12" y2="6"></line>
                                            <line x1="12" y1="18" x2="12" y2="22"></line>
                                            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07">
                                            </line>
                                            <line x1="2" y1="12" x2="6" y2="12"></line>
                                            <line x1="18" y1="12" x2="22" y2="12"></line>
                                            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                        </svg><svg id="icon-crawl"
                                            xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-edit-2">
                                            <path
                                                d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                            </path>
                                        </svg> Create</button>
                                    <button class="btn" data-dismiss="modal"> <i
                                            class="flaticon-delete-1"></i> Discard</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal fade" id="modal-edit-page-rss" tabindex="-1" role="dialog"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="feather feather-x close"
                                        data-dismiss="modal">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    <div class="compose-box">
                                        <div class="compose-content">
                                            <div class="row mb-4">
                                                <div class="col-md-12">
                                                    <h5 style="font-weight: bold;color: #4361ee !important;"
                                                        class="modal-title text-center">Edit Page
                                                        Crawl
                                                    </h5>
                                                </div>
                                            </div>
                                            <form>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="d-flex mb-4 mail-to">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                width="24" height="24"
                                                                viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="feather feather-type">
                                                                <polyline
                                                                    points="4 7 4 4 20 4 20 7">
                                                                </polyline>
                                                                <line x1="9" y1="20" x2="15"
                                                                    y2="20"></line>
                                                                <line x1="12" y1="4" x2="12"
                                                                    y2="20"></line>
                                                            </svg>
                                                            <div class="w-100">
                                                                <input type="email"
                                                                    id="edit-name-page-rss"
                                                                    placeholder="Name Page"
                                                                    class="form-control">
                                                                <span
                                                                    class="validation-text"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="d-flex mb-4 mail-subject">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="feather feather-home">
                                                        <path
                                                            d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                                                        </path>
                                                        <polyline points="9 22 9 12 15 12 15 22">
                                                        </polyline>
                                                    </svg>
                                                    <div class="w-100">
                                                        <input disabled type="text"
                                                            id="edit-url-page-rss"
                                                            placeholder="https://"
                                                            class="form-control">
                                                        <span class="validation-text"></span>
                                                    </div>
                                                </div>


                                                <div style="text-align: left;"
                                                    class="d-flex mail-subject">
                                                    <div class="box-switch">
                                                        <label
                                                            class="switch s-icons s-outline  s-outline-primary">
                                                            <input onclick="checkStatusTimeEdit()"
                                                                class="input-address"
                                                                id="edit-check-time"
                                                                type="checkbox"><span
                                                                class="slider round">
                                                                <p class="pl-3"
                                                                    style="margin-left: 40px;white-space: nowrap;font-weight: 600;">
                                                                    Schedule Crawl</p>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="d-flex  mail-subject">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="feather feather-clock">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <polyline points="12 6 12 12 16 14">
                                                        </polyline>
                                                    </svg>
                                                    <div class="w-100">
                                                        <select id="edit-inputStateTime"
                                                            class="form-control">
                                                            <option value="1h">1 Hour</option>
                                                            <option value="12h">12 Hour</option>
                                                            <option value="24h">24 Hour</option>
                                                            <option value="3d">3 Day</option>
                                                            <option value="7d">7 Day</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <small style="text-align: left;margin-left: 36px;"
                                                    id="emailHelp1"
                                                    class="form-text text-muted mb-4">Select time
                                                    for schedule</small>



                                                <!-- <div class="d-flex mb-4 mail-subject">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="feather feather-clock">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <polyline points="12 6 12 12 16 14">
                                                        </polyline>
                                                    </svg>
                                                    <div class="w-100">
                                                        <select id="edit-inputStateTime"
                                                            class="form-control">
                                                            <option value="1h">1 Hour</option>
                                                            <option value="12h">12 Hour</option>
                                                            <option value="24h">24 Hour</option>
                                                            <option value="3d">3 Day</option>
                                                            <option value="7d">7 Day</option>
                                                        </select>
                                                    </div>
                                                </div> -->

                                                <div style="text-align: left;">
                                                    <div class="box-switch">
                                                        <label
                                                            class="switch s-icons s-outline  s-outline-primary"><input
                                                                class="input-address"
                                                                id="edit-check-display"
                                                                type="checkbox"><span
                                                                class="slider round">
                                                                <p class="pl-3"
                                                                    style="margin-left: 40px;white-space: nowrap;font-weight: 600;">
                                                                    Public Post</p>
                                                            </span></label>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button id="btn-save-edit"
                                        class="btn btn-success float-left"><svg style="display:none"
                                            id="edit-icon-loadding"
                                            xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-loader spin mr-2">
                                            <line x1="12" y1="2" x2="12" y2="6"></line>
                                            <line x1="12" y1="18" x2="12" y2="22"></line>
                                            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07">
                                            </line>
                                            <line x1="2" y1="12" x2="6" y2="12"></line>
                                            <line x1="18" y1="12" x2="22" y2="12"></line>
                                            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                        </svg><svg id="edit-icon-crawl"
                                            xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-edit-2">
                                            <path
                                                d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                            </path>
                                        </svg> Save</button>
                                    <button class="btn" data-dismiss="modal"> <i
                                            class="flaticon-delete-1"></i> Discard</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="rss searchable-items list">
            </div>

        </div>
    </div>
</div>
</template>
<script>
export default {
    layout: 'admin',
 
  
 
}
</script>