$(document).ready(init)

function init() {
    $("body").removeClass("hidden");
    
    setupRouter();
    setupSidebar();
}

const defaultOpacityTransitionLength = 1000;
const defaultRemoveFromDomDelay = 50;
const defaultFadeInDelay = 150;

var sidebarOpen = false;

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
        
        _routerInner(e, this);
    })
    
    $("a.routable").on('click', function(e) {
        
        _routerInner(e, this);
    })
}

const scrollToOptions = { 
    // behavior: "smooth", 
    block: "nearest" 
};

function _routerInner(e, self) {
    e.preventDefault();

    // this.hash is the `#value` portion of the `a` element
    // which conveniently is also a jquery selector
    const query = self.hash;
    const elem = $(query);
    if (!elem.length) {
        return
    }
    const elemHeader = elem.find("h1"); 

    const shownPage = $(".gallery-section:not(.hidden.removed)")
    if (shownPage.is(elem)) {
        scrollToIfNotVisible(elemHeader);
        closeSidebar();
        return;
    }

    closeSidebar();
    fadeOut(shownPage, 500, 10);
    fadeIn(elem, 510, 10);
    setTimeout(() => {scrollToIfNotVisible(elemHeader)}, 515);
}

function scrollToIfNotVisible(elem) {

    if (!externals.isElementInViewport(elem)) {
        const domElem = elem.get(0);
        const relativePosition = domElem.getBoundingClientRect();
        const headerHeight = document.querySelector(".overlay").getBoundingClientRect().height;
        document.documentElement.scrollBy(relativePosition.x, relativePosition.y - headerHeight - headerHeight / 10);
    }
}

function setupSidebar() {

    $("#sidebar-control").on("click", function (e) {

        if (!sidebarOpen) {
            openSidebar();
        } else {
            closeSidebar();
        }
    })

    $(".sidebar-overlay").on("click", function (e) {

        closeSidebar();
    })
}

function openSidebar() {

    var hidden = $("svg.hidden");
    var shown = $("svg:not(.hidden)")
    hidden.removeClass("hidden")
    shown.addClass("hidden");

    // Show the tray and show the 'fadeout' black overlay
    $(".sidebar-content").removeClass("tray-hidden");
    fadeIn($(".sidebar-overlay"), 0, 20);

    sidebarOpen = true;
}

function closeSidebar() {

    var hidden = $("svg.hidden");
    var shown = $("svg:not(.hidden)")
    hidden.removeClass("hidden")
    shown.addClass("hidden");

    // Hide the tray and the black overlay
    $(".sidebar-content").addClass("tray-hidden");
    fadeOut($(".sidebar-overlay"), 500, 20);

    sidebarOpen = false;
}

const externals = {

    isElementInViewport: (el) => {

        // Special bonus for those using jQuery
        if (el instanceof jQuery) {
            el = el[0];
        }
    
        var rect = el.getBoundingClientRect();
    
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
    }
}