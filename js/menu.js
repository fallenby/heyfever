var dotMenu;

(dotMenu = function(element_id) {
    /*
     * Public interface
     */

    dotMenu.add = addItem;
    dotMenu.removeIndex = removeItemByIndex;


    /*
     * Private interface
     */

    var menu;
    var menu_wrap;
    var items;

    var windowEvents = [
        {name: 'focus', callback: resetMenu},
        {name: 'mouseover', callback: resetMenu},
        {name: 'mouseout', callback: resetMenu},
        {name: 'scroll', callback: resetMenuScroll}
    ];

    window.addEventListener('load', function() {
        bootstrap();
        constructItems();

        var menu_elem = document.getElementById(element_id);
        menu_elem.parentNode.insertBefore(menu, menu_elem);

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

    function bootstrap()
    {
        menu = document.createElement('div');
        menu.className = 'menu';
        menu_wrap = document.createElement('div');
        menu_wrap.className = 'menu-wrap';
        menu.appendChild(menu_wrap);
    }

    function constructItems()
    {
        var item_elems = document.getElementById(element_id).getElementsByTagName('li');

        items = [];

        for (var i = 0; i < item_elems.length; ++i)
        {
            var item_elem = item_elems[i].getElementsByTagName('a')[0];
            var item = {};
            item.text = item_elem.innerHTML;
            item.uri = item_elem.href;
            item.icon = item_elem.attributes['icon'].value;
            item.element = addItem(item);
            items.push(item);
        }
    }

    function addItem(item)
    {
        if (!menu || !menu_wrap)
            return false;

        var menu_item = buildMenuItem(item);
        menu_wrap.appendChild(menu_item);

        resetMenu();

        return menu_item;
    }

    function buildMenuItem(item)
    {
        var menu_item = document.createElement('a');
        menu_item.href = item.uri;
        menu_item.target = '_blank';
        menu_item.className = 'menu-item';
        menu_item.innerHTML = '<div class="dot-wrap"><div class="dot"><span class="fa fa-' + item.icon + '"></span></div></div><div class="menu-item-text">' + item.text + '</div>';

        menu_item.addEventListener('transitionend', resetMenu);
        
        return menu_item;
    }

    function removeItemByIndex(index)
    {
        if (index < 0 || index > (items.length - 1))
            return false;

        menu_wrap.removeChild(items[index].element);
        items.splice(index, 1);
        resetMenu();

        return true;
    }
})("menu");
