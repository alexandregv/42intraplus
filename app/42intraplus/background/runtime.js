let url;
let state = {};
const storage = window.localStorage;

const   webNavigationListener = (method, data) => {
	if (data.frameId != 0) {
		return;
	}
}

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch (request.method) {
		case "getStyles":
            let styles = getStyles(request, sendResponse);
            return true;
        case "updateStyles" :
            getStyles({matchUrl: sender.url, enabled: true, asHash: true}, function(styleHash) {
                    browser.tabs.sendMessage(sender.tab.id, {method: request.method, styles: styleHash}, {frameId: sender.frameId});
            });
            return true;
	}
});

const   getStyles = (options, callback) => {
    getCookies("https://intra.42.fr", "theme", (id) => {
        if (id === null){
            browser.cookies.set({url:"https://intra.42.fr","name": "theme",value:"default"});
            id = 'default';
        }
        url = "/styles/"+id+".42theme.min.css";
        storage.setItem('cssfile', browser.runtime.getURL(url));
        fetch(browser.runtime.getURL(url))
        .then((response) => {
            promises = response.text();
            promises.then((content) => {
                callback(filterStyles(content));
            });
        });
    });
}

const   filterStyles = (styles) => styles;

const error = (msg) => {
    window.alert('ERROR: ' + msg);
};
browser.webNavigation.onCommitted.addListener(webNavigationListener.bind(this, "styleApply"));
browser.webNavigation.onBeforeNavigate.addListener(webNavigationListener.bind(this, null));