/*!

    Copyright (c) 2013 Proactima
    
 */

(function ($, window, undefined) {
    /**
     * Default settings. Can be overridden per call or globally.
     * To override globally, do:
     *  $.uxbar.defaults.debug = true;
     *  $.uxbar.defaults.mainBarClass = "myClass";
     * or:
     *  $.uxbar.defaults = $.extend(
     *      {},
     *      $.uxbar.defaults,
     *      {
     *          debug: true,
     *          mainBarClass: "myClass"
     *      }
     *  );
     * You can also create your own settings object and pass in:
     *  var myCustomSettings = $.extend(
     *      {},
     *      $.uxbar.defaults,
     *      {
     *          debug: true,
     *          mainBarClass: "myClass"
     *      }
     *  );
     *  $('#my-target').uxbar(1, 3, "red", myCustomSettings);
     */
    $.uxbar = {
        version: '1.0.0',
        defaults: {
            debug: false,
            mainBarClass: 'uxbar',
            barBackgroundClass: 'background',
            barSpacerClass: 'spacer',
            barColorElementClass: 'color-element',
            floatRightClass: 'floatRight',
            barType: 'growing',
            alphaClass: 'alpha40',
            slotColors: undefined
        }
    };

    var debugLog = false;
    var elementWidth = 0;
    var settings = {};

    /**
     * Inserts a UXRisk Progressbar into the element it is called on
     *
     * @param {int} filledElement the current element of the progressbar. Starts at 1
     * @param {int} totalElements the total number of elements for the progressbar.
     * @param {string} color of the progressbar as class name. The string will be prepended with 'bg_'
     * @param {string} barType is the type of bar. growing is normal, filled is all slots have colors but one is highlighted.
     * @param {Object.<string, string>=} options optional options to override default settings.
     * @this {jQuery} the current jQuery object.
     */
    $.fn.uxbar = function (filledElement, totalElements, color, options) {
        var container, element, bar;

        // Verify input variables
        if (totalElements === 0) {
            return;
        }

        if (filledElement > totalElements) {
            return;
        }

        settings = $.extend({}, $.uxbar.defaults, options);
        if (settings.debug === true) {
            debugLog = true;
        }

        elementWidth = 100 / totalElements;

        container = $(this).empty();
        bar = generateBarContainer(container);

        if (settings.barType === 'growing') {
            if (filledElement === 0) {
                debug('Creating blank bar with ' + totalElements + ' slots');
                createEmptyBar(bar, totalElements);
            } else {
                debug('Creating filled bar with ' + filledElement + ' filled slots and ' + totalElements + ' total slots');
                createGrowingBar(bar, filledElement, totalElements, color);
            }
        } else if (settings.barType === 'filled') {
            createFilledBar(bar, filledElement, totalElements);
        }
    };

    function createEmptyBar(containerElement, elementCount) {
        var bar, element, width;

        bar = containerElement;
        width = 100 / elementCount;

        for (var i = 1; i <= elementCount; i++) {
            debug('Adding empty slot...');
            element = createSpanElement(bar, width);
            createSpacerElement(element);
        }
    }

    function createFilledBar(containerElement, filledSlot, slotCount) {
        var bar, element, width, i, colorElement;

        bar = containerElement;
        width = 100 / slotCount;

        for (i = 1; i <= slotCount; i++) {
            debug('Adding slot nr: ' + i);
            element = createSpanElement(bar, width);
            if (i === filledSlot) {
                debug('This is the non-alpha slot...');
                colorElement = createColorElement(element, settings.slotColors[i - 1], false);
                if (i !== slotCount) {
                    debug('This is not the last slot, so add a spacer...');
                    createSpacerElement(colorElement);
                }
            } else {
                debug('This is a alpha slot...');
                colorElement = createColorElement(element, settings.slotColors[i - 1], true);
                if (i !== slotCount) {
                    debug('This is not the last slot, so add a spacer...');
                    createSpacerElement(colorElement);
                }
            }
        }
    }

    function createGrowingBar(containerElement, filledCount, elementCount, barColor) {
        var bar, element, width, blankCount, filledElement, i;

        bar = containerElement;
        width = 100 / elementCount;
        blankCount = elementCount - filledCount;
        coloredCount = elementCount - blankCount;

        for (i = 1; i <= blankCount; i++) {
            debug('Adding empty slot...');
            element = createSpanElement(bar, width);
            createSpacerElement(element);
        }

        if (coloredCount === 1) {
            debug('Bar has only one colored slot. Creating it now...');
            element = createSpanElement(bar, width);
            filledElement = createColorElement(element, barColor);
            createSpacerElement(filledElement);
        } else {
            debug('Bar has several colored slots...');
            for (i = 1; i <= coloredCount; i++) {
                debug('Creating colored slot...');
                element = createSpanElement(bar, width);
                filledElement = createColorElement(element, barColor);
                if (i !== coloredCount) {
                    createSpacerElement(filledElement);
                }
            }
        }
    }

    function generateBarContainer(containerElement) {
        var barContainer;

        barContainer = $('<span></span>');
        barContainer.addClass(settings.mainBarClass);
        barContainer.addClass(settings.barBackgroundClass);

        containerElement.append(barContainer);

        return barContainer;
    }

    function createSpanElement(barElement, width) {
        var target, spanElement;

        target = $(barElement);
        spanElement = $('<span style="width: ' + width + '%;"></span>');
        spanElement.addClass(settings.floatRightClass);

        target.append(spanElement);

        return spanElement;
    }

    function createColorElement(barElement, color, alpha) {
        var target, colorElement;

        target = $(barElement);
        colorElement = $('<span></span>');
        colorElement.addClass(settings.mainBarClass);
        colorElement.addClass(settings.barColorElementClass);
        colorElement.addClass('bg_' + color);

        if (alpha === true) {
            colorElement.addClass(settings.alphaClass);
        }

        target.append(colorElement);

        return colorElement;
    }

    function createSpacerElement(barElement) {
        var target, spacerElement;

        target = $(barElement);
        spacerElement = $('<span class="uxbar spacer"></span>');
        spacerElement.addClass(settings.mainBarClass);
        spacerElement.addClass(settings.barSpacerClass);

        target.append(spacerElement);
    }

    function debug(logItem) {
        if (debugLog === true) {
            console.log(logItem);
        }
    }

})(jQuery, window);