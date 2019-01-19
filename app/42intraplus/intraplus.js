$(document).ready(() => {
  'use strict';
  let browser;
  browser = (typeof browser === 'undefined' ) ? chrome : browser;
  let version = browser.runtime.getManifest().version;
  let theme; 
  let current;
  let level;
  let status; 
  let user; 
  let arr = [];
  let faded = 0;
  let d = new Date(); 
  let month = d.getMonth() + 1; 
  let y = d.getFullYear(); 
  let startday = "00";
  let login = $(".main-navbar-user-nav .dropdown [data-toggle=dropdown] [data-login]").data('login'); 
  let url = `https://profile.intra.42.fr/users/${$('.login').data('login')}/locations_stats.json`; 
  let random_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  status = $(".user-poste-status").text();
  current = (status.search("Available") == 2 ? true:false);
  $("body").attr('style',' ');
  if (typeof $("#logtime_container")[0].classList[2] !== undefined) {
    $("#logtime_container").hide();
  }
  let URL_HASH = window.location.hash.replace('#', '');
  if (current){
      $(`.user-poste-infos`).html(_user_location_($(".user-poste-infos").text(), $('.login').data('login')));
  }
  $("#location-history-clock").click(() => window.location.replace("#last_locations"));
  if (_suburl(true, "profile")) {
    if (check_status() !== false) {
      $(`.page-content.page-content-fluid`).append(_location_history_(login, "private"));
    }
    else{
      $(`.page-content.page-content-fluid`).append(_location_history_(login, "public"));
    }
  }
    theme =  Cookies.get('theme');
    if (theme != null){
      LoadTheme(theme, current);
    }
    else{
      theme = "default";
      LoadTheme(theme, current);
    }
  if(URL_HASH == "last_locations"){
    $('body').css('overflow','hidden');
    window.scrollTo(0, 0);
    $('.last-locations').fadeIn(300);
    $(".page-content>.row").css('filter','blur(5px)');
  }
  $(document).keyup((e) => {
    if (e.keyCode == 27) {
      $(".last-locations").fadeOut(300);
      $('[data-tbaction="close"]').click();
      $(".page-content>.row").css('filter','');
      $('body').css('overflow','');
      window.location.replace("#");
    }
  });
  $("#close-lastlocation").click(() => {
    $(".last-locations").fadeOut(300);
    $(".page-content>.row").css('filter','');
    $('body').css('overflow','');
    window.location.replace("#"); 
  });

  /**
   *
   * Logtime counter and calculator
   *
   */
  if (status !== ""){
    if (check_status() !== false){
      $(".pull-right.button-actions").append(_toolbox_button_());
      $('.page').parent().prepend(_toolbox_(version, theme));
      toolbox_handler($(".pull-right.button-actions"));
      if(URL_HASH === "toolbox"){
        load_toolbox();
      }
    }
    $('body').find("#themechanger").on("change", (e) => {
      let old = theme;
      let _this = e.currentTarget;
      if (theme !== $(_this).val()){
          theme = $(_this).val();
          Cookies.set('theme', $(_this).val(), { expires: 90000,path: '',domain: 'intra.42.fr' });
          $(_this).parents().attr('id', $(_this).val());
          $("#opt_"+old).removeAttr("disabled");
          $("#opt_"+old).removeAttr("selected");
          $("#opt_"+$(_this).val()).attr("disabled","true");
          $("#opt_"+$(_this).val()).attr("selected","true");
          location.reload();
      }
    });
    $(".user-data").append(_logtime_content_(theme, random_id));
    
    /**
     * 
     * 
     * Fetch Request for PLUS api
     * 
     * 
     */
    fetch(`https://42intraplus.fr/api/plus?username=${$('.login').data('login')}`, { method: "GET"})
    .then((cc) => {;
      return cc.json();
    })
    .then((cc) => {
      if(cc.status){
        if (cc.lvl === null) {
          fetch(`https://profile.intra.42.fr/users/${$('.login').data('login')}.json`, { method: "GET", credentials: 'include'})
          .then((response) => {
              return response.json();
          })
          .then((r) => {
                  cc.lvl = r[1][42];
          });
          console.log(cc.lvl);
          // fetch(`https://profile.intra.42.fr/users/${$('.login').data('login')}/experiences`, { method: "GET", credentials: 'include'})
          // .then((response) => {
          //   return response.text();
          // })
          // .then((data) => {
          //   let parser = new DOMParser();
          //   let doc = parser.parseFromString(data, "text/html");
          //   cc.lvl = $(doc).find('.changelog-item code').data("count");
          // });
        }
        check_overwrite(cc, random_id);
        if (check_status() !== false){
          Cookies.set('intraplus', btoa(JSON.stringify(cc)), { expires: 90000,path: '',domain: 'intra.42.fr' });
          $("#last-location").fadeIn().append(_logtime_last_location_(cc));
        }
        else{
          $("#last-location").fadeIn().append(_logtime_last_host_(cc));
        }
        $("#last-connexion").fadeIn().append(_logtime_last_logintime_(cc));
      }else{
        $("#last-location").remove();
        $("#last-connexion").remove();
      }
      $("#locationhistoryclock").click(() => {
        window.scrollTo(0, 0);
        $(".page-content>.row").css('filter','blur(5px)');
        $('body').css('overflow','hidden');
        $(".last-location").fadeIn();
        window.location.replace("#last_locations");
      }); 
    });
    const get_logtime = () => {      
      const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
      let n = ((month < 10) ? "0" + month : month);
      let hours = 0;
      let mins = 0;
      let secs = 0;
      let time;
      fetch(url, { method: "GET", credentials: 'include'})
      .then((logtime) => {
        return logtime.json();
      })
      .then((logtime) => {
        logtime = fill_logtime(logtime);
        let saved_d = d;
        // console.log(set_logtime(logtime, {day: "01", month:"08", year: "18"},{day: daysInMonth(8, 2018), month:"08", year: "18"}));
        // console.log(set_logtime(logtime, {day: "01", month:"09", year: "18"},{day: daysInMonth(9, 2018), month:"09", year: "18"}));
        // console.log(set_logtime(logtime, {day: "01", month:"10", year: "18"},{day: daysInMonth(10, 2018), month:"10", year: "18"}));
        // console.log(l.reset);
        let week = get_weekday(saved_d).getDate();
        let month = n;
        month = (month < 10 ) ? "0" + month : month;
        for (let i = 1;i <= d.getDate();i++) {
          if (i >= week) {
            if (logtime[`${y}-${n}-${((i < 10) ? `0${i}` : i)}`] === undefined) {
              time = "00:00:00";
            }else{
              time = logtime[`${y}-${n}-${((i < 10) ? `0${i}` : i)}`];
            }
            l.week.logs.push(time);
          }
          if (logtime[`${y}-${n}-${((i < 10) ? `0${i}` : i)}`] === undefined) {
            time = "00:00:00";
          }else{
            time = logtime[`${y}-${n}-${((i < 10) ? `0${i}` : i)}`];
          }
          l.month.logs.push(time);
        }
        if (logtime[`${y}-${n}-${((d.getDate() < 10) ? `0${d.getDate()}` : d.getDate())}`] === undefined) {
          time = "00:00:00";
        }else{
          time = logtime[`${y}-${n}-${((d.getDate() < 10) ? `0${d.getDate()}` : d.getDate())}`];
        }
        l.today.logs.push(time);
        l.week.logs = l.week.swap.concat(l.week.logs);
        const _logtime_month_ = calcul_logtime(l.month);
        const _logtime_week_ = calcul_logtime(l.week);
        const _logtime_today_ = calcul_logtime(l.today);
        /**
         * 
         * Logime Variable Set
         * 
         */
        let month_Hourlabel = $("[data-logtime='month'] #hours-ctn");
        let month_Minslabel = $("[data-logtime='month'] #mins-ctn");
        let week_Hourlabel = $("[data-logtime='week'] #hours-ctn");
        let week_Minslabel = $("[data-logtime='week'] #mins-ctn");
        let today_Hourlabel = $("[data-logtime='today'] #hours-ctn");
        let today_Minslabel = $("[data-logtime='today'] #mins-ctn");
        month_Hourlabel.html(_logtime_month_.hours);
        month_Minslabel.html(_logtime_month_.mins);
        week_Hourlabel.html(_logtime_week_.hours);
        week_Minslabel.html(_logtime_week_.mins);
        today_Hourlabel.html(_logtime_today_.hours);
        today_Minslabel.html(_logtime_today_.mins);
        let month_rt = Date.now();
        let week_rt = month_rt;
        let today_rt = month_rt;
        month_rt -= _logtime_month_.hours * 60000 * 60;
        month_rt -= _logtime_month_.mins * 60000;
        month_rt -= _logtime_month_.secs * 1000;
        week_rt -= _logtime_week_.hours * 60000 * 60;
        week_rt -= _logtime_week_.mins * 60000;
        week_rt -= _logtime_week_.secs * 1000;
        today_rt -= _logtime_today_.hours * 60000 * 60;
        today_rt -= _logtime_today_.mins * 60000;
        today_rt -= _logtime_today_.secs * 1000;
        if (current) {
          setInterval(() => {
            const rt_month_hours = ~~((Date.now() - month_rt) / (60000 * 60));
            const rt_month_mins = ~~((Date.now() - month_rt - (rt_month_hours * 60000 * 60)) /  60000);
            const rt_week_hours = ~~((Date.now() - week_rt) / (60000 * 60));
            const rt_week_mins = ~~((Date.now() - week_rt - (rt_week_hours * 60000 * 60)) /  60000);
            const rt_today_hours = ~~((Date.now() - today_rt) / (60000 * 60));
            const rt_today_mins = ~~((Date.now() - today_rt - (rt_today_hours * 60000 * 60)) /  60000);
            month_Hourlabel.html(rt_month_hours);
            month_Minslabel.html(rt_month_mins);
            week_Hourlabel.html(rt_week_hours);
            week_Minslabel.html(rt_week_mins);
            today_Hourlabel.html(rt_today_hours);
            today_Minslabel.html(rt_today_mins);
          }, 60000);
        }
        if (faded === 0) {
            $('#logtime_con').attr('data-vis','show');
            faded = 1;
        }
      }).catch((error) => console.error(error));
    };
    get_logtime();
  }
});
