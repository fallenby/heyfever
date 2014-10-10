(function() {
    var menu;
    var menu_wrap;
    var items;

    window.addEventListener('load', function() {
        menu = document.getElementsByClassName('menu')[0];
        menu_wrap = document.getElementsByClassName('menu-wrap')[0];
        items = document.getElementsByClassName('menu-item');

        for (var i = 0; i < items.length; ++i)
        {
            items[i].addEventListener('mousemove', function() {
                resetMenu();
            });
        }

        resetMenu();
    });

    window.addEventListener('resize', function() {
        resetMenu();
    });

    function resetMenu() {
        if (!menu_wrap || !items)
            return;

        menu_wrap.style.left = ((((window.innerWidth / 2) - (menu_wrap.clientWidth / 2)) / window.innerWidth) * 100) + '%';
        menu.style.top = ((((window.innerHeight / 2) - 40) / window.innerHeight) * 100) + '%';
    }
})();
