$(document).ready(init)

function init() {
    // $("body").removeClass("hidden");
    setupRouter();
}

function setupRouter() {

    const opacityTransitionLength = 1000;
    const removeFromDomDelay = 50;
    const fadeInDelay = 150;

    const fadeOut = (elem) => {
        elem.addClass("hidden");
        setTimeout(() => {
            elem.addClass("removed");
        }, opacityTransitionLength + removeFromDomDelay)
    }

    const fadeIn = (elem) => {

        setTimeout(() => {
            elem.removeClass("removed");
        }, fadeInDelay)
        setTimeout(() => {
            elem.removeClass("hidden");
        }, fadeInDelay + removeFromDomDelay)
    }

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

        fadeOut(shownPage);
        fadeIn(elem);
    })
}