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
    var item_template = "{{#items}} <a href='{{uri}}' class='menu-item' target='_blank'> <div class='dot-wrap'> <div class='dot'> <span class='fa fa-{{icon}}'></span> </div> </div> <div class='menu-item-text'>{{text}}</div> </a> {{/items}}";

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

        renderMenu();

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
            addItem(item);
        }
    }

    function renderMenu()
    {
        menu_wrap.innerHTML = Mustache.render(item_template, {"items" : items});
        updateEventBindings();
        resetMenu();
    }

    function updateEventBindings()
    {
      var rendered_items = document.getElementsByClassName('menu-item');

      for (var i = 0; i < rendered_items.length; ++i)
      {
        rendered_items[i].addEventListener('transitionend', itemTransitioned);
      }
    }

    function itemTransitioned()
    {
      resetMenu();
    }

    function addItem(item)
    {
        if (!menu || !menu_wrap)
            return false;

        items.push(item);

        return true;
    }

    function removeItemByIndex(index)
    {
        if (index < 0 || index > (items.length - 1))
            return false;

        items.splice(index, 1);
        renderMenu();

        return true;
    }
})("menu");
