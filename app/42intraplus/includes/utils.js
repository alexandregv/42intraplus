const color_sel = (theme, sel) =>
{
  switch (theme) {
    case "default" :
      switch (sel)
      {
        case 1 :
          return ("#bf2a04");
        case 2 :
          return ("#efc10b");
        case 3 :
          return ("#06bdf9");
        case 4 :
          return ("#f95806");
        case 5 :
          return ("#a3f906");
      }
    break;
    case "dark" :
      switch (sel)
      {
        case 1 :
          return ("#bf2a04");
        case 2 :
          return ("#efc10b");
        case 3 :
          return ("#06bdf9");
        case 4 :
          return ("#f95806");
        case 5 :
          return ("#a3f906");
      }
    break;
    case "red" :
      switch (sel)
      {
        case 1 :
          return ("#bf2a04");
        case 2 :
          return ("#efc10b");
        case 3 :
          return ("#06bdf9");
        case 4 :
          return ("#f95806");
        case 5 :
          return ("#a3f906");
      }
    break;
    case "green" :
      switch (sel)
      {
        case 1 :
          return ("#bf2a04");
        case 2 :
          return ("#efc10b");
        case 3 :
          return ("#06bdf9");
        case 4 :
          return ("#f95806");
        case 5 :
          return ("#a3f906");
      }
    break;
    default :
      //
    break;
  }
};
/**
 * @name getcolor
 * @description Return a color depending on the meme
 *
 * @param {int} hours
 */
const getcolor = (hours, theme) => {
    if (hours > 0 && hours <= 35){
        return (color_sel(theme, 1));
    }
    else if (hours >= 35 && hours <= 70){
        return (color_sel(theme, 2));
    }
    else if (hours >= 70 && hours <= 105){
        return (color_sel(theme, 3));
    }
    else if (hours >= 105 && hours <= 140){
        return (color_sel(theme, 4));
    }
    else if (hours > 140){
        return (color_sel(theme, 5));
    }
    else{
        return ("white");
    }
};

/**
 *
 * @name getmeme
 * @param {int} hours
 * @description Return a meme
 *
 */
const getmeme = (hours) => {

};
/**
 *
 * @name hours_id
 * @param {int} hours
 * @description Return a meme
 *
 */
const hours_id = (hours) => {
  let i = -1;
  for (count = 0; count <= 165;count += 10) {
    i++;
  }
  return (i);
};

const check_status = () => {
  let i = 0;
  let user_try = [];
  $("[data-login]").each((e,k) => {
      user_try.push($(k).text().replace(/\n/g, ''));
      i++;
  });
  if (i === 2){
      if (user_try[0].substring(user_try[0].indexOf(" ") + 1) == user_try[1].substring(user_try[1].indexOf(" ") + 1)){
        return ($("[data-login]").data('login'));
      }
      else{
        return (false);
      }
  }else{
    return (false);
  }
};
const check_overwrite = (cc, random_id) => {
  if (cc.overwrite_username !== "") {
    if ($('.name span').length === 0) {
      $('.name').html(`${cc.overwrite_username}`);
    }
    else {
      $('.name span').html(`${cc.overwrite_username}`);
    }
  }
  if (cc.overwrite_phrase !== ""){
    // $(random_id).append(cc);
  }
  if (cc.custom_img !== "0"){
    if (cc.custom_img_url !== null){
      $(`.user-image`).css(`background-image`, `url(${cc.custom_img_url}`);
    }
  }
  if (parseInt(cc.custom_audio) === 1) {
    if (cc.custom_audio_url !== ""){
      let audio = new Audio(cc.custom_audio_url);
      audio.volume = parseFloat(cc.custom_audio_vol);
      audio.loop = parseInt(cc.custom_audio_loop);
      audio.play();
    }
  }
};
/**
 * 
 * @param {*} cc 
 * @param {*} lvl 
 */
const update_lvl = (cc,lvl) => console.log(lvl);

/**
 * 
 * 
 */

let l = {
  month:{
    hours:0,
    mins:0,
    secs:0,
    logs: []
  },
  week:{
    hours:0,
    mins:0,
    secs:0,
    logs: [],
    swap:[]
  },
  today:{
    hours:0,
    mins:0,
    secs:0,
    logs: []
  },
  choose:{
    hours:0,
    mins:0,
    secs:0,
    logs: []
  },
  reset:{
    hours:0,
    mins:0,
    secs:0,
    logs: []
  }
}

/**
 * 
 * @param {*} spe 
 */
const   calcul_logtime = (spe) => {
  spe.logs.forEach((v, k) => {
    spe.hours += parseInt(spe.logs[k][0]);
    spe.mins += parseInt(spe.logs[k][1]);
    spe.secs += parseInt(spe.logs[k][2]);
  });
  spe.mins += parseInt(spe.secs / 60);
  spe.hours += parseInt(spe.mins / 60);
  spe.mins %= 60;
  spe.secs %= 60;
  return (spe);
};
/**
 * 
 * @param {*} month 
 * @param {*} year 
 */
// const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
/**
 * 
 * 
 */
const   get_weekday = (d) => {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

const   fill_logtime = (logtime) => {
    let d = new Date();
    let today = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let total_logtime = {};
    for (var day = 1,n = 1; day <= daysInMonth(n, year) && n <= month; day++)
    {
      if (logtime[`${year}-${(n < 10) ? `0${n}`: n}-${(day < 10) ? `0${day}`: day}`] === undefined) {
        time = "00:00:00";
      }
      else{
        time = logtime[`${year}-${(n < 10) ? `0${n}`: n}-${(day < 10) ? `0${day}`: day}`];
      }
      total_logtime[`${year}-${(n < 10) ? `0${n}`: n}-${(day < 10) ? `0${day}`: day}`] = time.split(':');
      if (day == daysInMonth(n, year)){
        day = 0;
        n++;
      }
    }
    return (total_logtime);
}
const  reset_time = (time) => {
  
}
/**
 * 
 * @name set_logtime
 * @description Get the logtime bewteen the two date set of in parameters
 * 
 * @param {object} logtime 
 * @param {object} start
 * @param {object} end 
 * 
 */
let   set_logtime = (logtime, start, end) => {
  let logs = logtime;
  if (typeof start !== undefined && typeof end !== undefined && typeof logtime !== undefined)
  {
      if ((start.month != "00" && start.day != "00" && start.year != "00") && 
          (end.month != "00" && end.day != "00" && end.year != "00")) {
        if ((parseInt(start.month) === parseInt(end.month) && parseInt(start.day) >= parseInt(end.day))){
          console.error("Start date is superior of end date.");
          return (false);
        }
        if (logs[`20${start.year}-${start.month}-${start.day}`] === undefined || logs[`20${end.year}-${end.month}-${end.day}`] === undefined){
          console.error("The date set are not valid or does not exist in the array");
          return (false);
        }
        let start_day = parseInt(start.day);
        let start_month = parseInt(start.month);
        let start_year = 2000 + parseInt(start.year);
        let end_day = parseInt(end.day);
        let end_month = parseInt(end.month);
        let end_year = 2000 + parseInt(end.year);
        let finish = 0;
        let n = start_month;
        let day = start_day;
        let year = start_year;
        let days = 0;
        let result = [];
        for (let i = 0; finish != 1; i++){
          if (n === end_month && day === end_day){
            days = i;
            finish = 1;
          }
          if (day === daysInMonth(n, year) && n < end_month && year <= end_year){
            day = 1;
            n++;
          }
          if(n == 12 && day === daysInMonth(n, year)){
            day = 1;
            year++;
            n = 1;
          }
          time = logs[`${year}-${(n < 10) ? `0${n}`: n}-${(day < 10) ? `0${day}`: day}`];
          l.choose.logs.push(time);
          if (day <= end_day || day <= daysInMonth(n, year)){
            day++;
          }
        }
        result = calcul_logtime(l.choose);
        reset_time(l);
        // console.log(l.choose);
        return (result);
      }
      else return false;
  }
  else return false;
}