/// <reference path="../jquery-1.10.2.js" />
/// <reference path="../node_modules/qunit/support/qunit/qunit/qunit.js" />
/// <reference path="../src/jquery.uxbar.js" />

var targetId = "#qunit-fixture";

QUnit.module("UXBar", {
    setup: function () {
        $(targetId).empty();
        $.uxbar.defaults.barType = "growing";
        $.uxbar.defaults.slotColors = undefined;
    },
    teardown: function () {

    }
});

test("Default Options", function () {
    equal($.uxbar.defaults.debug, false);
    equal($.uxbar.defaults.mainBarClass, "uxbar");
    equal($.uxbar.defaults.barBackgroundClass, "background");
    equal($.uxbar.defaults.barSpacerClass, "spacer");
    equal($.uxbar.defaults.barColorElementClass, "color-element");
    equal($.uxbar.defaults.floatRightClass, "floatRight");
    equal($.uxbar.defaults.barType, "growing");
});

test("Bar with 0 total elements should break", function () {
    $(targetId).uxbar(0, 0, "red");
    equal($(targetId).find('.uxbar').length, 0, "UXBar was inserted!");
});

test("Bar with 1 total elements and 2 filled elements should break", function () {
    $(targetId).uxbar(2, 1, "red");
    equal($(targetId).find('.uxbar').length, 0, "UXBar was inserted!");
});

test("Bar with 1 total elements and 0 filled elements should be created", function () {
    $(targetId).uxbar(0, 1, "red");

    var backgroundSpan = $(targetId).find('.uxbar.background');
    equal(backgroundSpan.length, 1, "Only 1 background span should exist");

    equal($(backgroundSpan).find('.uxbar.spacer').length, 1, "Only 1 spacer span should exist inside the background span");
});

test("Bar with 1 total elements and 1 red filled elements should be created", function () {
    $(targetId).uxbar(1, 1, "red");

    var backgroundSpan = $(targetId).find('.uxbar.background');
    equal(backgroundSpan.length, 1, "Only 1 background span should exist");

    var colorSpan = $(backgroundSpan).find('.uxbar.color-element.bg_red');
    equal(colorSpan.length, 1, "Only 1 color span should exist inside the background span");

    equal($(colorSpan).find('.uxbar.spacer').length, 1, "Only 1 spacer span should exist inside the color span");
});

test("Bar with 3 total elements and 0 filled elements should be created", function () {
    $(targetId).uxbar(0, 3, "red");

    var backgroundSpan = $(targetId).find('.uxbar.background');
    equal(backgroundSpan.length, 1, "Only 1 background span should exist");

    var floatRightSpans = $(backgroundSpan).find('.floatRight');
    equal($(floatRightSpans).length, 3, "There should be 2 floatRights inside the background span");

    floatRightSpans.each(function (i, e) {
        equal($(e).find('.spacer').length, 1, "Each floatRight should have 1 spacer span");
    });
});

test("Bar with 3 total elements and 1 filled elements should be created", function () {
    $(targetId).uxbar(1, 3, "red");

    var backgroundSpan = $(targetId).find('.uxbar.background');
    equal(backgroundSpan.length, 1, "Only 1 background span should exist");

    var floatRightSpans = $(backgroundSpan).find('.floatRight');
    equal($(floatRightSpans).length, 3, "There should be 2 floatRights inside the background span");

    var allExceptLastFloatRight = floatRightSpans.splice(0, 2);
    $.each(allExceptLastFloatRight, function (i, e) {
        equal($(e).find('.spacer').length, 1, "Each floatRight should have 1 spacer span");
    });

    var lastFloatRight = floatRightSpans.last();
    equal($(lastFloatRight).find('.uxbar.color-element.bg_red').length, 1, "The last floatRight should have 1 color element");
});

test("Bar with 3 total elements and 2 filled elements should be created", function () {
    $(targetId).uxbar(2, 3, "red");

    var backgroundSpan = $(targetId).find('.uxbar.background');
    equal(backgroundSpan.length, 1, "Only 1 background span should exist");

    var floatRightSpans = $(backgroundSpan).find('.floatRight');
    equal($(floatRightSpans).length, 3, "There should be 3 floatRights inside the background span");

    var firstFloatRight = floatRightSpans.first();
    equal($(firstFloatRight).find('.uxbar.spacer').length, 1, "The first floatRight should have 1 spacer");

    var centerElements = floatRightSpans.splice(1, 1);
    $.each(centerElements, function (i, e) {
        var cElement = $(e).find('.uxbar.color-element.bg_red');
        equal(cElement.length, 1, "Each middle floatRight should have 1 spacer span");
        equal($(cElement).find('.spacer').length, 1, "Each color element should have a spacer");
    });

    var lastFloatRight = floatRightSpans.last();
    equal($(lastFloatRight).find('.uxbar.color-element.bg_red').length, 1, "The last floatRight should have 1 color element");
});

test("Bar with 3 total elements and 3 filled elements should be created", function () {
    $(targetId).uxbar(3, 3, "red");

    var backgroundSpan = $(targetId).find('.uxbar.background');
    equal(backgroundSpan.length, 1, "Only 1 background span should exist");

    var floatRightSpans = $(backgroundSpan).find('.floatRight');
    equal($(floatRightSpans).length, 3, "There should be 3 floatRights inside the background span");

    var centerElements = floatRightSpans.splice(0, 2);
    $.each(centerElements, function (i, e) {
        var cElement = $(e).find('.uxbar.color-element.bg_red');
        equal(cElement.length, 1, "Each middle floatRight should have 1 spacer span");
        equal($(cElement).find('.spacer').length, 1, "Each color element should have a spacer");
    });

    var lastFloatRight = floatRightSpans.last();
    equal($(lastFloatRight).find('.uxbar.color-element.bg_red').length, 1, "The last floatRight should have 1 color element");
});

test("Filled bar with 2 elements and first element filled should be created", function () {
    $.uxbar.defaults.barType = "filled";
    $.uxbar.defaults.slotColors = ['red', 'green'];
    $(targetId).uxbar(1, 2, null);

    var backgroundSpan = $(targetId).find('.uxbar.background');
    equal(backgroundSpan.length, 1, "Only 1 background span should exist");

    var floatRightSpans = $(backgroundSpan).find('.floatRight');
    equal($(floatRightSpans).length, 2, "There should be 2 floatRights inside the background span");

    var firstFloatRight = floatRightSpans.first();
    var firstElement = $(firstFloatRight).find('.uxbar.color-element.bg_red');
    equal(firstElement.length, 1, "The first floatRight should have 1 spacer");
    equal($(firstElement).find('.spacer').length, 1, "Each color element should have a spacer");

    var lastFloatRight = floatRightSpans.last();
    equal($(lastFloatRight).find('.uxbar.color-element.bg_green.alpha20').length, 1, "The last floatRight should have 1 color element");
});

test("Filled bar with 2 elements and second element filled should be created", function () {
    $.uxbar.defaults.barType = "filled";
    $.uxbar.defaults.slotColors = ['red', 'green'];
    $(targetId).uxbar(2, 2, null);

    var backgroundSpan = $(targetId).find('.uxbar.background');
    equal(backgroundSpan.length, 1, "Only 1 background span should exist");

    var floatRightSpans = $(backgroundSpan).find('.floatRight');
    equal($(floatRightSpans).length, 2, "There should be 2 floatRights inside the background span");

    var firstFloatRight = floatRightSpans.first();
    var firstElement = $(firstFloatRight).find('.uxbar.color-element.bg_red.alpha20');
    equal(firstElement.length, 1, "The first floatRight should have 1 spacer");
    equal($(firstElement).find('.spacer').length, 1, "Each color element should have a spacer");

    var lastFloatRight = floatRightSpans.last();
    equal($(lastFloatRight).find('.uxbar.color-element.bg_green').length, 1, "The last floatRight should have 1 color element");
});