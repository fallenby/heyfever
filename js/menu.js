(function() {
    var menu;
    var menu_wrap;
    var items;
    var deviceXDPI;

    var windowEvents = [
        {name: 'focus', callback: resetMenu},
        {name: 'mouseover', callback: resetMenu},
        {name: 'mouseout', callback: resetMenu},
        {name: 'scroll', callback: resetMenuScroll}
    ];

    window.addEventListener('load', function() {
        menu = document.getElementsByClassName('menu')[0];
        menu_wrap = document.getElementsByClassName('menu-wrap')[0];
        items = document.getElementsByClassName('menu-item');

        for (var i = 0; i < items.length; ++i)
            items[i].addEventListener('transitionend', resetMenu);

        windowEvents.forEach(function(windowEvent){
            window.addEventListener(windowEvent.name, windowEvent.callback);
        });

        resetMenu();
        
        window.resizeStop.setThreshold(70);
        window.resizeStop.bind(resetMenu);
    });

    function resetMenu() {
        setMenuCenter(0, 0);
    }

    function resetMenuScroll() {
        setMenuCenter(getScrollLeft(), getScrollTop());
    }

    function setMenuCenter(leftOffset, topOffset)
    {
        if (!menu_wrap)
            return;

        menu_wrap.style.left = (((window.innerWidth / 2) - (menu_wrap.clientWidth / 2)) + leftOffset) + 'px';
        menu.style.top = (((window.innerHeight / 2) - 40) + topOffset) + 'px';
    }

    function getScrollLeft()
    {
        return (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
    }

    function getScrollTop()
    {
        return (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
    }
})();
