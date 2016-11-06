//Responsive nav
var table;
var navigation = responsiveNav(".nav-collapse", {
    animate: true, // Boolean: Use CSS3 transitions, true or false
    transition: 315, // Integer: Speed of the transition, in milliseconds
    label: "Menu", // String: Label for the navigation toggle
    insert: "after", // String: Insert the toggle before or after the navigation
    customToggle: "", // Selector: Specify the ID of a custom toggle
    closeOnNavClick: true, // Boolean: Close the navigation when one of the links are clicked
    openPos: "relative", // String: Position of the opened nav, relative or static
    navClass: "nav-collapse", // String: Default CSS class. If changed, you need to edit the CSS too!
    navActiveClass: "js-nav-active", // String: Class that is added to <html> element when nav is active
    jsClass: "js", // String: 'JS enabled' class which is added to <html> element
    init: function () {}, // Function: Init callback
    open: function () {}, // Function: Open callback
    close: function () {} // Function: Close callback
});
//FullPage
$(document).ready(function () {
    $("#myModal7").on("hidden.bs.modal", function (e) {
        location.reload();
    });
    $('#fullpage').fullpage({
        scrollOverflow: true
        , paddingTop: 75
        , verticalCentered: true
        , anchors: ['home', 'wez_udzial', 'nagrody', 'zasady', 'zwycięzcy', 'produkty', 'kontakt']
        , afterLoad: function (anchorLink, index) {
            $('li.nav-button').removeClass('active');
            if (anchorLink == 'home') {
                $('#menu1').addClass('active');
                $('#section0').find('img, a').delay(200).animate({
                    right: '0%'
                }, 1700, 'easeOutExpo');
            }
            else {
                if (anchorLink == 'wez_udzial') {
                    $('#menu2').addClass('active');
                    $('#section1').find('img, .inputs').delay(200).animate({
                        right: '0%'
                    }, 1700, 'easeOutExpo');
                }
                else if (anchorLink == 'nagrody') {
                    $('#menu3').addClass('active');
                    $('#section2').find('.inputs').delay(200).animate({
                        right: '0%'
                    }, 1700, 'easeOutExpo');
                }
                else if (anchorLink == 'zasady') {
                    $('#menu4').addClass('active');
                    $('#section3').find('.inputs').delay(200).animate({
                        right: '0%'
                    }, 1700, 'easeOutExpo');
                    $('#menu4').addClass('active');
                }
                else if (anchorLink == 'zwycięzcy') {
                    $('#section4').find('.inputs').delay(200).animate({
                        right: '0%'
                    }, 1700, 'easeOutExpo');
                    $('#menu5').addClass('active');
                }
                else if (anchorLink == 'produkty') {
                    $('#section5').find('.inputs').delay(200).animate({
                        right: '0%'
                    }, 1700, 'easeOutExpo');
                    $('#menu6').addClass('active');
                }
                else if (anchorLink == 'kontakt') {
                    $('#section6').find('.inputs').delay(200).animate({
                        right: '0%'
                    }, 1700, 'easeOutExpo');
                    $('#menu7').addClass('active');
                }
                else {
                    $('li[href=#' + anchorLink + ']').parent().addClass('active');
                }
            }
        }
    });
    //DataTables
    table = $('#tabelaWyniki').DataTable({
        paging: true
        , bSort: false
        , lengthChange: false
        , searching: true
        , info: false
    });
    $("#cookies").click(function () {
        $('.cookies').hide("slow");
    });
});

function SearchTable() {
    var nrParagonu = $('#inputNrParagonu').val();
    var data = $('#inputData').val();
    table.columns(0).search(nrParagonu).columns(1).search(data).draw();
};
//Checkboxes
$('.chck2').on('click', function () {
    var checked = $(this).is(':checked');
    if (checked) {
        $('.chck1').attr('checked', true);
    }
});
$('.chck1').on('click', function (e) {
    var checked2 = $('.chck2').is(':checked');
    if (checked2) e.preventDefault();
});