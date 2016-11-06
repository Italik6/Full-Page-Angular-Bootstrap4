$(document).ready(function (){
var productsCarousel = $("#products-carousel");
            productsCarousel.owlCarousel({
                jsonPath: "json/kat3.json",
                items: 3,
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [992, 2],
                itemsTablet: [768, 1],
                itemsMobile: [544,1]
            });
            
            $(".products-wrapper .carousel-nav-left").click(function () {
                productsCarousel.trigger("owl.prev");
            });
            $(".products-wrapper .carousel-nav-right").click(function () {
                productsCarousel.trigger("owl.next");
            });
            
            var brandsCarousel = $("#brands-carousel");

            brandsCarousel.owlCarousel({
                itemsScaleUp: true,
                items: 3,
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [992, 2],
                itemsTablet: [768, 1],
                itemsMobile: [544,1]
            });

            $(".brands-wrapper .carousel-nav-left").click(function () {
                brandsCarousel.trigger("owl.prev");
            });
            $(".brands-wrapper .carousel-nav-right").click(function () {
                brandsCarousel.trigger("owl.next");
            });

            $("#brands-carousel img").click(function () {
                var jsonPath = $(this).data("products-json");
                productsCarouselInstance = productsCarousel.data('owlCarousel')
                //productsCarouselInstance.destroy();

                productsCarouselInstance.reinit({
                    jsonPath: jsonPath,
                    items: 3,
                    itemsDesktop: [1199, 3],
                    itemsDesktopSmall: [979, 2],
                    itemsTablet:[782,2]
                });
            });

});