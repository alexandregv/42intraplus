const LoadLastLocation = (login) => {
    let page = 0;
    let data;
    if (typeof(Storage) !== "undefined") {
        data = localStorage.getItem("location_history");
        if (data != false && data != null)
        {
            let parsed = JSON.parse(data);
            $(parsed).each(function(k,v){
                console.log(v);
            });
        }else{
            fetch(`https://42intraplus.fr/api/locations/get?username=${login}`)
            .then(response => response.text())
            .then(text => (text.length > 0 ? JSON.parse(text) : {}))
            .then(function(response) {
              console.log(response);
            })
            .catch(error => console.error(error));
        }

    } else {
        return ;
    }
};
$(document).ready(() =>{
    let i = 0;
    let user_try = [];
    $("[data-login]").each((e,k) => {
        user_try.push($(k).text().replace(/\n/g, ''));
        i++;
    });
    if (i === 2)
    {
        if (user_try[0].substring(user_try[0].indexOf(" ") + 1) == user_try[1].substring(user_try[1].indexOf(" ") + 1)){
            LoadLastLocation($("[data-login]").data('login'));
        }
        else{
            return (0);
        }
    }else{
        return (false);
    }
});