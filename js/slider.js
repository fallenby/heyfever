(function(slideDuration) {
  var element;
  var currentImage = 0;
  var images;
  var opacity = {
    current: 0.4,
    min: 0.4,
    max: 1 
  };

  var slideTimeout;
  var slideSpeed = 40;

  window.addEventListener('load', function() {
    element = document.getElementsByClassName('wrap')[0];
    images = document.body.attributes['slides'].value.split(',');

    setBackground(images[0]);

    if (images.length > 1)
        setInterval(slideIn, 5000);
  });

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
    element.style.background = 'rgba(255, 255, 255, ' + opacity.current + ')';
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
    document.body.style.background = 'url(img/slides/' + filename + ') no-repeat 0 0';
    document.body.style.backgroundSize = 'cover';
  }
})(1000);
