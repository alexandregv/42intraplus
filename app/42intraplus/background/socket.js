let status;
let instances = {};
let tabids = [];
let user_auth;
let filter = {url:[{hostContains: "intra.42.fr"}]};
let browser;
browser = (typeof browser === 'undefined' ) ? chrome : browser;

/**
 * 
 * @param {*} details 
 */
const   getCookies = (domain, name, callback) => {
  browser.cookies.get({"url": domain, "name": name}, (cookie) => {
      if (cookie != null) {
          if(callback) {
              callback(cookie.value);
          }
      }else {
          if (callback) {
              callback(null);
          }
      }
  });
}
/**
 * 
 * 
 */
const add_tab = (details) => {
  console.log(details);
  tabids.indexOf(details.tabId) === -1 ? tabids.push(details.tabId) : false;
};

/**
 * 
 */
browser.tabs.query({}, (tabs) =>  tabs.forEach((element,key) => {
  if (element.url.search("intra.42.fr") !== -1)
  {
    tabids.indexOf(tabs[key].id) === -1 ? tabids.push(tabs[key].id) : false;
    return false;
  }
}));
// let socket = io("https://42intraplus.fr:4313"); // 
// socket.on('connect', () => {
//   if (Object.keys(tabids).length === 0) {
//     socket.emit("no_auth");
//   }else{
//     //Old stuff useless removed
//   }
//   socket.on('validate', (data) => {
//     // console.log(data);
//   });
//   socket.on('auth_error', (data) => {
//     // console.log(data);
//   });
// });
//Serveur shut down

browser.tabs.onRemoved.addListener((tabid, removed) => {
  tabids.forEach((val, index) => {
    if (val === tabid){
      return (tabids.splice(index, 1));
    }
  });
});

browser.windows.onRemoved.addListener((windowid) => {
  // console.log(windowid);
  browser.windows.getAll((getInfo) => {
    // console.log(getInfo);
  })
});

browser.webNavigation.onBeforeNavigate.addListener(add_tab, filter);