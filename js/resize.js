
(function (window, setTimeout, Date) {

    var cache = [];
    var last = 0;
    var timer = 0;
    var threshold = 500;

    window.addEventListener('resize', function () {
        last = Date.now();
        timer = timer || setTimeout(checkTime, 10);
    }, false);

    window.resizeStop = {

        /**
            Changes the threshold at which {@link checkTime} determines that a resize has stopped.
            
            @param {Number} ms
                A new threshold in milliseconds. Must be finite, greater than
                zero, and not NaN.
            @returns {Number|Boolean}
                Returns the new threshold or false if it failed.
        */
        setThreshold: function (ms) {
            if (typeof ms === 'number' && ms > -1 && !isNaN(ms) && isFinite(ms)) {
                threshold = ms;
                return ms;
            }
            return false;
        },

        /**
            Fires one or more callbacks when it looks like the user has stopped resizing the window.

            @param {Function} callback
                A function to fire when the user stops resizing the window.
            @returns {Number|Boolean}
                Either the index of the callback in the cache or Boolean false (if the callback was not a function).
        */
        bind: function (callback) {
            if (typeof callback === 'function') {
                cache.push(callback);
                return cache.length - 1;
            }
            return false;
        },

        /**
            Removes a callback from the cache. Can either be a pointer to a function or a cache index from {@see window.bindResizeStop}.

            @param {Number|Function} what
                If a number, assumed to be an index in the cache. Otherwise, the cache is searched for the presence of the passed-in value.
            @returns {Boolean}
                Whether or not {@see what} was found in the cache.
        */
        unbind: function (what) {
            // Assumes support for Array.prototype.indexOf.
            var i = (typeof what === 'number') ? what : cache.indexOf(what);
            if (i > -1) {
                cache.splice(what, 1);
            }
            return i > -1;
        }
    };

    /**
        Checks if the last window resize was over 500ms ago. If so, executes all the functions in the cache.
         
        @private
    */
    function checkTime() {
        var now = Date.now();
        if (now - last < threshold) {
            timer = setTimeout(checkTime, 10);
        } else {
            clearTimeout(timer);
            timer = last = 0;
            for (var i = 0, max = cache.length; i < max; i++) {
                cache[i]();
            }
        }
    }

})(window, setTimeout, Date);
