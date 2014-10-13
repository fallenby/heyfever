var dotSlider;

(dotSlider = function(slideDuration, slideInterval) {
    /*
     * Public interface
     */

    dotSlider.add = addItem;
    dotSlider.remove = removeItem;


    /*
     * Private interface
     */

    var element;
    var currentImage = 0;
    var images;
    var active = false;
    var opacity = {
        current: 0.4,
        min: 0.4,
        max: 1 
    };

    var slideInterval;
    var slideTimeout;
    var slideSpeed = 40;

    window.addEventListener('load', function() {
        element = document.getElementsByClassName('wrap')[0];
        images = document.body.attributes['slides'].value.split(',');

        if (!images ||a images[0] == '')
            images = [];

        document.body.style.backgroundSize = 'cover';

        setBackground(images[0]);

        if (images.length > 1)
            startSlide();
    });

    function startSlide()
    {
        if (active)
            return;

        slideInterval = setInterval(slideIn, slideInterval);
        active = true;
    }

    function stopSlide()
    {
        if (!active)
            return;

        if (slideInterval)
            clearInterval(slideInterval);

        if (slideTimeout)
            clearTimeout(slideTimeout);

        active = false;
    }

    function slideIn()
    {
        opacity.current += 0.1;

        updateBackground();

        if (opacity.current < opacity.max)
            slideTimeout = setTimeout(slideIn, slideSpeed);
        else
        {
            updateImage();
            slideOut();
        }
    }

    function slideOut()
    {
        opacity.current -= 0.1;

        updateBackground();

        if (opacity.current > opacity.min)
            slideTimeout = setTimeout(slideOut, slideSpeed);
    }

    function updateBackground()
    {
        element.style.background = "rgba(255, 255, 255, " + opacity.current + ")";
    }

    function updateImage()
    {
        if (currentImage == (images.length - 1))
            currentImage = 0;
        else
            currentImage += 1;

        setBackground(images[currentImage]);
    }

    function setBackground(filename)
    {
        if (document.body.style.background == 'url(img/slides/' + filename + ') no-repeat 0 0')
            return false;
       
        if (!filename)
            document.body.style.background = '';
        else 
            document.body.style.background = 'url(img/slides/' + filename + ') no-repeat 0 0';

        return true;
    }

    function addItem(uri)
    {
        for (var i = 0; i < images.length; ++i)
            if (images[i] == uri)
                return false;

        images.push(uri);

        if (images.length == 1)
            setBackground(uri);
        else
            startSlide();

        return true;
    }

    function removeItem(uri)
    {
        for (var i = 0; i < images.length; ++i)
        {
            if (images[i] == uri)
            {
                images.splice(i, 1);
                
                if (images.length == 0)
                {
                    setBackground(null);
                    stopSlide();
                }

                return true;
            }
        }

        return false;
    }
})(1000, 5000);
