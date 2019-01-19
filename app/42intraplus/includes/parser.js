/**
 * 
 * Parser - Contains all DOM html constant
 * 
 * 
 */

const intra = `https://intra.42.fr/`;
const intra_profile = `https://profile.intra.42.fr/`;
const intra_project = `https://projects.intra.42.fr/`;
const stud42 = `https://stud42.fr/`;
const matrix = `https://the-matrix.le-101.fr/`;

/**
 * @name  Toolbox
 * @param {string} version 
 * @param {string} theme 
 * @description return the DOM content for the toolbox
 * @function _toolbox_
 * @return toolbox html
 */
 const  _toolbox_ = (version, theme) => `
 <div class="tb42-modal">
   <h2>42 Intraplus Toolbox<span class="tb42-version">Version ${version}   Made by Nzenzela </span></h2>
   <div class="tb42-header"><span class="tb42-close" data-tbaction="close" >Close</span></div>
   <div class="tb42-content">
     <div class="tb42-main">
         <div class="tb42-theme">
             <label>Select a theme : </label>
             <select name="changetheme" id="themechanger">
                 <option id="opt_default" ${((theme == "default")? "disabled selected" : "")} value="default">Default</option>
                 <option id="opt_dark" ${((theme == "dark")? "disabled selected" : "")} value="dark">Material Dark (Indev)</option>
                 <!-- <option id="opt_pioneer" ${((theme == "pioneer")? "disabled selected" : "")} value="pioneer">Pioneer</option>
                 <option id="opt_explorer" ${((theme == "explorer")? "disabled selected" : "")} value="explorer">Explorer</option>
                 <option id="opt_ranger" ${((theme == "ranger")? "disabled selected" : "")} value="ranger">Ranger</option> -->
             </select>
         </div>
         <div class="tb42-privacy">
             <label class="tb42-label-privacy">Options : </label>
             <div class="tb42-privacy-opt" >
              <label class="tb42-privacy-option" for="custom_name">Show Custom Names</label>
              <input class="tb42-privacy-input" id="custom_name" type="checkbox" value="custom_name"/>
             </div>
             <div class="tb42-privacy-opt" >
                <label class="tb42-privacy-option" for="custom_phrase">Show Custom phrases</label>
                <input class="tb42-privacy-input" id="custom_phrase" type="checkbox" value="custom_phrase"/>
             </div>
             <div class="tb42-privacy-opt" >
                <label class="tb42-privacy-option" for="custom_audio">Play custom audio</label>
                <input class="tb42-privacy-input" id="custom_audio" type="checkbox" value="custom_audio"/>
             </div>
             <div class="tb42-privacy-opt" >
                <label class="tb42-privacy-option" for="custom_picture">Show custom pictures</label>
                <input class="tb42-privacy-input" id="custom_picture" type="checkbox" value="custom_picture"/>
             </div>
         </div>
     </div>
   </div>
 </div><div class="tb42-backdrop"><div>`;

/**
 * 
 * @name _toolbox_button_
 * @description Return the Toolbox button
 */
const   _toolbox_button_ = () => `<a href="#toolbox" id="toolbox"><span class="icon iconf-box-1 padding-5 padding-left-10 padding-right-10" data-placement="bottom" data-toggle="tooltip" title="" data-original-title="42Intraplus Toolbox"></span></a>`;

/**
 *
 * @name _logtime_content_
 * @param {string} theme
 * @param {string} random_id
 * @description Return the DOM content for Last locations with Location history
 *
 */
const   _logtime_content_ = (theme, random_id) => `
<div class="user-header-box logtime" id="logtime_con">
  <div color="${theme}" id="logtime_goal" data-highcharts-chart="1">
    <div class="logtime-counter">
      <span id="total-logtime">
        <div id="logtime-data" class="logtime-count" style="justify-self: self-start;" data-logtime="month">
          <small class='title-ctn'>Current Month</small>
          <span id='hours-ctn'>0</span><small class='small-counter hours'>h</small> 
          <span id='mins-ctn'>0</span><small class='small-counter mins'>m</small>
        </div>
        <div id="logtime-data" class="logtime-count" style="justify-self: center;" data-logtime="week">
          <small class='title-ctn'>Weelky logtime</small>
          <span id='hours-ctn'>0</span><small class='small-counter hours'>h</small> 
          <span id='mins-ctn'>0</span><small class='small-counter mins'>m</small>
        </div>
        <div id="logtime-data" class="logtime-count" style="justify-self: self-end;" data-logtime="today">
          <small class='title-ctn'>Today</small>
          <span id='hours-ctn'>0</span><small class='small-counter hours'>h</small> 
          <span id='mins-ctn'>0</span><small class='small-counter mins'>m</small>
        </div>
      </span>
      <br/>
      <span class="logtime-messages" id="secret-data">
        <div class="user-infos" style="display:none!important;"id="last-location">Last location  </div>
        <div class="user-infos" style="display:none!important;"id="last-connexion">Last connection at  </div>
      </span>
      <br/>
    </div>
  </div>
</div>`;

/**
 *
 * @name _logtime_last_location_
 * @param {object} cc
 * @description Return the DOM content for Last locations with Location history
 *
 */
const   _logtime_last_location_ =  (cc) => `<span class='last-host'>${cc.last_host}<div class='icon-clock pull-right text-success' id='locationhistoryclock' onclick='$(".last-locations").fadeIn(300);window.location.replace("#last_locations");'></div></span>`;

/**
 *
 * @name _logtime_last_host_
 * @param {object} cc
 * @description Return the DOM content for Last Host
 *
 */
const   _logtime_last_host_ =  (cc) => `<span class='last-host'>${cc.last_host}</span>`;


/**
 *
 * @name _logtime_last_logintime_
 * @param {object} cc
 * @description Return the DOM content for Last login time
 *
 */
const   _logtime_last_logintime_ = (cc) => `<span class='last-time'>${cc.last_logintime}</span>`;

/**
 *
 * @name _user_location_
 * @param {string} poste
 * @param {string} login
 * @description Return the DOM content for Location URL to Matrix or Stud42
 *
 */
const   _user_location_ = (poste,login) => `<a target="blank" style="text-decoration:none;" href="${(poste[1] === 'e' ? stud42 : (poste[1] === 'z' ? matrix : null)) + '#' + login}">${poste}</a>`;

/**
 *
 * @name _location_history_
 * @param {string} login
 * @param {string} scope
 * @description Return the DOM content for the location history
 *
 */
const   _location_history_ = (login, scope) => (scope === "public" ? `
<div class="last-locations" >
    <div id="close-lastlocation">x</div>
    <h1>Your last locations :<h1>
    <div class="historic-loc"></div>
    <div class="map-loc"></div>
</div>` : `
<div class="last-locations" >
    <div id="close-lastlocation">x</div>
    <h1>Last Locations of ${login}:<h1>
    <div class="historic-loc"></div>
    <div class="map-loc"></div>
</div>`);


/**
 * @name  _custom_phrase_
 * @param {object} cc 
 * @param {string} random_id 
 * @description Return the Custom Phrase for user in DB
 */
const   _custom_phrase_ = (cc, random_id) => `<${random_id} id="${random_id}" style="display: block;margin: 0 auto;left: 0;line-break: auto;text-overflow: ellipsis;overflow-wrap: break-word!important;" class="${random_id}">${cc.overwrite_phrase}</${random_id}>`;


/**
 * 
 * @name _months_logtimes_
 * @param {object} 
 * 
 */
const   _months_logtimes_ = () => `<div class="monthly-logtime"><span class="montly-logtime-title">Montly Logtime</span><div class="m-logtime-content" id="monthly-logtimes"></div></div>`;