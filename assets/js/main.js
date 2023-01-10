$(document).ready(init)

function init() {
    // $("body").removeClass("hidden");
    setupRouter();
    setupSidebarButtons();
}

const defaultOpacityTransitionLength = 1000;
const defaultRemoveFromDomDelay = 50;
const defaultFadeInDelay = 150;

const fadeOut = (elem, opacityTransitionLength, removeFromDomDelay) => {

    var otl = opacityTransitionLength ?? defaultOpacityTransitionLength
    var rfdd = removeFromDomDelay ?? defaultRemoveFromDomDelay;

    elem.addClass("hidden");
    setTimeout(() => {
        elem.addClass("removed");
    }, otl + rfdd)
}

const fadeIn = (elem, fadeInDelay, removeFromDomDelay) => {

    var fid = fadeInDelay ?? defaultFadeInDelay;
    var rfdd = removeFromDomDelay ?? defaultRemoveFromDomDelay;

    setTimeout(() => {
        elem.removeClass("removed");
    }, fid)
    setTimeout(() => {
        elem.removeClass("hidden");
    }, fid + rfdd)
}

function setupRouter() {
    $(".routable li a").on('click', function(e) {
        e.preventDefault();

        // this.hash is the `#value` portion of the `a` element
        // which conveniently is also a jquery selector
        const query = this.hash;
        const elem = $(query);
        if (!elem.length) {
            return
        }

        const shownPage = $(".gallery-section:not(.hidden.removed)")
        if (shownPage.is(elem)) {
            return;
        }

        closeModal();
        fadeOut(shownPage, 500, 10);
        fadeIn(elem, 510, 10);
    })
}

function setupSidebarButtons() {

    var sidebarOpen = false;

    $("#sidebar-control").on("click", function (e) {


        if (!sidebarOpen) {
            openModal()
        } else {
            closeModal();
        }

        // $(".sidebar-overlay").removeClass("hidden");
    })
}

function openModal() {

    var hidden = $("svg.hidden");
    var shown = $("svg:not(.hidden)")
    hidden.removeClass("hidden")
    shown.addClass("hidden");
    $(".sidebar-content").removeClass("tray-hidden");
    fadeIn($(".sidebar-overlay"), 0, 20);
    sidebarOpen = true;
}

function closeModal() {

    var hidden = $("svg.hidden");
    var shown = $("svg:not(.hidden)")
    hidden.removeClass("hidden")
    shown.addClass("hidden");
    $(".sidebar-content").addClass("tray-hidden");
    fadeOut($(".sidebar-overlay"), 500, 20);
    sidebarOpen = false;
}