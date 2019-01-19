const   search_user = (user) => {
    $("[cluster='"+$('[data-user_login="'+user+'"]').data('host')[1]+"']").click();
    $('[data-user_login="'+user+'"]').click();
    $('.table>table').attr('class','finder');
    $('[data-user_login="'+user+'"]').attr('class','finder');
    $("[data-dismiss='modal']").click(() => {
        window.location.replace("#");
        document.cookie = "last_search=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.stud42.fr;";
        $('[data-user_login="'+user+'"]').attr('class','');
        $('.table>table').attr('class','');
        if (typeof window.history.replaceState === 'function') {
            history.replaceState({}, '', window.location.href.slice(0, -1));
        }
    });
    $("#infoModal").click(() => {
        window.location.replace("#");
        document.cookie = "last_search=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.stud42.fr;";
        $('[data-user_login="'+user+'"]').attr('class','');
        $('.table>table').attr('class','');
        if (typeof window.history.replaceState === 'function') {
            history.replaceState({}, '', window.location.href.slice(0, -1));
        }
    });
    window.addEventListener("beforeunload",  (e) => {
        document.cookie = "last_search=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.stud42.fr;";
    });
    document.onkeydown = (e) =>
    {
        if(e.keyCode === 27) {
            $('[data-user_login="'+user+'"]').attr('class','');
            $('.table>table').attr('class','');
            window.location.replace("#");  
            document.cookie = "last_search=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=the-matrix.le-101.fr;";
        }
    }
}
$(document).ready(() => {
    'use strict';
    let exm = null;
    if (window.location.hash && location.pathname === "/login"){
        Cookies.set('last_search', window.location.hash.replace('#', ''), { expires: 3600,path: '',domain: 'stud42.fr' });
    }
    if (!window.location.hash && Cookies.get('last_search')) {
        exm = Cookies.get('last_search');
    }
    if(location.pathname !== "/login") {
        setTimeout(() => {
            $(window).on('hashchange', (e) => { 
                exm = window.location.hash.replace('#', '');
                if (exm) {
                    let user = exm;
                    if ($('[data-user_login="'+user+'"]').length !== 0) {
                        search_user(user);
                    }
                }
            });
            let hash_value = (exm === null ? window.location.hash.replace('#', '') : exm);
            let user = hash_value;
            if ($('[data-user_login="'+user+'"]').length !== 0) {
                search_user(user);
            }
        },305);
    }
});