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
    var images = [];
    var active = false;
    var opacity = {
        current: 0.4,
        min: 0.4,
        max: 1 
    };

    var slideInterval;
    var slideTimeout;
    // Slide speed is determined by the slide duration divided by the number of slides.
    // This is to have a decent frame duration for the provided slide duration.
    var slideSpeed = slideDuration / (10 * (opacity.max - opacity.min));

    window.addEventListener('load', function() {
        element = document.getElementsByClassName('wrap')[0];

        var slides = document.getElementById('slides').getElementsByTagName('img');

        for (var i = 0; i < slides.length; ++i)
          images.push({uri: slides[i].attributes['src'].value, height: slides[i].height, width: slides[i].width});

        if (!images || images[0] == '')
            images = [];

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

    function setBackground(image)
    {
        if (!image)
        {
            document.body.style.background = '';
            return false;
        }

        if (document.body.style.background == 'url(' + image.uri + ') repeat 0 0')
            return false;
    
        document.body.style.background = 'url(' + image.uri + ') repeat 0 0';
        document.body.style.backgroundSize = (image.height > window.innerHeight || image.width > window.innerWidth) ? 'cover' : 'auto';
        document.body.style.backgroundAttachment = 'fixed';

        return true;
    }

    function addItem(uri, height, width)
    {
        for (var i = 0; i < images.length; ++i)
            if (images[i].uri == uri)
                return false;

        images.push({uri: uri, height: height, width: width});

        if (images.length == 1)
            setBackground(images[images.length - 1]);
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
})(200, 5000);
