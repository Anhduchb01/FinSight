<template>
  <div class="message-box">
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document" style="margin-top: 15%;">
        <div class="modal-content" style="padding: 0px;">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Are You Sure ?</h5>
          </div>
          <div class="modal-body">
            <p class="modal-text">This message will be permanently deleted and you will not be able to recover it. Are you sure you want to do it?.</p>
          </div>
          <div class="modal-footer">
            <button class="btn" data-dismiss="modal">
              <i class="flaticon-cancel-12"></i> No
            </button>
            <button type="button" data-dismiss="modal" onclick="DeleteTrash()" class="btn btn-primary feather feather-trash permanent-delete">Yes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="message-box-scroll" id="ct">
      <div class="mail-item mailInbox" style="text-align: center;
                                    display: flex;
                                    height: 87%;
                                    justify-content: center;flex-flow: wrap-reverse;
                                    background: #bff5f89e;
                                    border-radius: 50%;
                                    width: 350px;
                                    height: 350px;
                                    margin: 80px auto;opacity: 60%;">
        <svg style="enable-background:new 0 0 512.021 512.021;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.021 512.021" xml:space="preserve">
          <path style="fill:#64B5F6;" d="M338.214,344.556l-64-64.107c-4.16-4.171-10.914-4.179-15.085-0.019  c-2.006,2.001-3.133,4.717-3.134,7.55v149.44c0.003,4.589,2.942,8.662,7.296,10.112c1.086,0.367,2.224,0.555,3.371,0.555  c3.357,0,6.519-1.581,8.533-4.267l64-85.333C342.376,354.244,341.958,348.31,338.214,344.556z" />
          <path style="fill:#1976D2;" d="M291.366,320.641l-64-21.333c-5.587-1.868-11.631,1.147-13.499,6.734  c-0.732,2.19-0.734,4.558-0.005,6.749l42.667,128c1.453,4.362,5.536,7.302,10.133,7.296h0.661c4.819-0.3,8.836-3.8,9.792-8.533  l21.333-106.667C299.523,327.601,296.483,322.345,291.366,320.641z" />
          <path style="fill:#2196F3;" d="M507.43,23.446c-3.399-2.377-7.867-2.568-11.456-0.491L90.641,257.622  c-5.096,2.955-6.832,9.482-3.877,14.578c1.306,2.253,3.391,3.95,5.861,4.771l191.573,63.872l148.907,63.829  c5.417,2.316,11.685-0.197,14.001-5.614c0.321-0.752,0.555-1.538,0.697-2.343l64-362.667  C512.531,29.965,510.825,25.829,507.43,23.446z" />
          <g>
            <path style="fill:#1976D2;" d="M510.011,38.38c3.441-4.781,2.355-11.447-2.426-14.889c-4.259-3.065-10.115-2.578-13.808,1.15   L215.611,318.017l80.277,27.733L510.011,38.38z" />
            <path style="fill:#1976D2;" d="M26.065,420.246c-2.679,0.003-5.26-1.003-7.232-2.816c-5.319-4.892-10.553-9.92-15.701-15.083   c-4.171-4.165-4.176-10.922-0.011-15.093c4.165-4.171,10.922-4.176,15.093-0.011c4.949,4.949,9.984,9.792,15.083,14.485   c4.336,3.988,4.618,10.736,0.63,15.072C31.904,418.999,29.052,420.249,26.065,420.246z" />
            <path style="fill:#1976D2;" d="M171.387,490.54c-10.278-0.033-20.527-1.098-30.592-3.179c-5.814-0.95-9.757-6.434-8.806-12.248   c0.95-5.814,6.434-9.757,12.248-8.806c0.277,0.045,0.553,0.102,0.825,0.169c8.683,1.792,17.524,2.707,26.389,2.731h0.064h4.8   c5.559-0.531,10.497,3.545,11.028,9.104c0.037,0.385,0.051,0.771,0.044,1.157c0.216,5.884-4.377,10.831-10.261,11.051h-5.568   L171.387,490.54z M94.95,470.124c-1.708,0-3.39-0.409-4.907-1.195c-10.486-5.487-20.611-11.636-30.315-18.411   c-4.727-3.515-5.709-10.197-2.194-14.925c3.355-4.511,9.634-5.644,14.354-2.59c8.937,6.286,18.272,11.987,27.947,17.067   c5.231,2.709,7.276,9.146,4.567,14.377c-1.833,3.54-5.487,5.762-9.474,5.762L94.95,470.124z" />
            <path style="fill:#1976D2;" d="M226.235,479.105c-5.891,0.048-10.705-4.688-10.753-10.579c-0.035-4.307,2.524-8.213,6.487-9.901   c6.141-2.627,12.105-5.648,17.856-9.045c5.146-2.867,11.642-1.019,14.509,4.127c2.767,4.967,1.152,11.231-3.672,14.241   c-6.542,3.867-13.325,7.309-20.309,10.304C229.05,478.806,227.651,479.097,226.235,479.105z" />
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
        <h1 style="position: absolute; font-size: 22px;
font-weight: normal;
margin-top: 24px;
font-size: 23px;margin-bottom: -43px;color:black">Maibox is empty</h1>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "../../../static/baseAPI.js";
export default {
  data() {
    return {
      result: [],
    };
  },
  mounted() {
    // HTTP.get(`contact-spam`).then((response) => {
    //   this.result = response.data;
    //   console.log(this.result);
    // });
  },
};
</script>
