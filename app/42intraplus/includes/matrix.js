const   update_user = (val) => {
    $(".seat.taken>.seatHover>img").each((key, val) => $(val).css('opacity', "0.2"));
    val.attr('style', "opacity:1;");
    val.parent().click();
    $(".seat.taken>.seatHover>img").click(() => $(".seat.taken>.seatHover>img").each((key, val) => $(val).css('opacity', "1")));
    $('i.fas.fa-times.closeHostInfo').click((e) =>{
        document.cookie = "last_search=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=the-matrix.le-101.fr;";
        window.location.replace("#");  
        if (typeof window.history.replaceState === 'function') {
            history.replaceState({}, '', window.location.href.slice(0, -1));
        }
        $(".seat.taken>.seatHover>img").each((key, val) => $(val).css('opacity', "1"));
    });
    $('.seat.taken').click(() => {
       document.cookie = "last_search=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=the-matrix.le-101.fr;";
    });
    window.addEventListener("beforeunload", function (e) {
        document.cookie = "last_search=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=the-matrix.le-101.fr;";
    });
    document.onkeydown = (e) =>
    {
        if(e.keyCode === 27) {
            $(".seat.taken>.seatHover>img").each((key, val) => $(val).css('opacity', "1"));
            window.location.replace("#");  
            document.cookie = "last_search=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=the-matrix.le-101.fr;";
        }
    }
}
$(document).ready(() => {
    'use strict';
    let exm = null;
    setTimeout(() => {
        $(window).on('hashchange', (e) => { 
            exm = window.location.hash.replace('#', '');
            if (exm) {
                let user = exm;
                let val = ($(`[src="https://cdn.intra.42.fr/users/small_${user}.JPG"]`).length !== 0 || $(`[src="https://cdn.intra.42.fr/users/small_${user}.jpg"]`).length !== 0 ? $(`[src="https://cdn.intra.42.fr/users/small_${user}.JPG"]`) : $(`[src="https://cdn.intra.42.fr/users/small_${user}.jpg"]`));
                if (val){
                    update_user(val);
                }
            }
        });
        if (window.location.hash){
            Cookies.set('last_search', window.location.hash.replace('#', ''), { expires: 3600,path: '',domain: 'the-matrix.le-101.fr' });
        }
        if (!window.location.hash && Cookies.get('last_search')) {
            exm = Cookies.get('last_search');
        }
  
        setTimeout(() => {
            let hash_value = (exm === null ? window.location.hash.replace('#', '') : exm);
            if (hash_value) {
                let user = hash_value;
                let val = ($(`[src="https://cdn.intra.42.fr/users/small_${user}.JPG"]`).length !== 0 || $(`[src="https://cdn.intra.42.fr/users/small_${user}.jpg"]`).length !== 0 ? $(`[src="https://cdn.intra.42.fr/users/small_${user}.JPG"]`) : $(`[src="https://cdn.intra.42.fr/users/small_${user}.jpg"]`));
                if (val){
                    update_user(val);
                }
            }
        },50);
    },250);
});