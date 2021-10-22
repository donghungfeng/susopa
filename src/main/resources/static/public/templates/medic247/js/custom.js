var expandMenu;
(function($) {
    "use strict";
    if ($('.scroll-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('.scroll-top').addClass('show');

                } else {
                    $('.scroll-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
            
        });
        $('.scroll-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
    
    

   
})(jQuery);
$(document).ready(function(){
    if($('[data-tooltip="true"]').length){
        $('[data-tooltip="true"]').tooltip();       
    }
    $('.upload input[type=file]').change(function() {
        var pathArray = $(this).val().split('\\');
        if(pathArray.length>0){
            $(this).parent().find(">.txt").text(pathArray[pathArray.length - 1]);
            $(this).parent().find(">.btn .fa").removeClass("fa-cloud-upload").addClass("fa-refresh");
            $(this).parent().find(">.btn .txt").text("Tải lại tệp"); 
        }
    });
    $(".menus a").click(function(e){
        var parent = $(this).parent();
        if(parent.find("ul").length){
            e.preventDefault();
            parent.siblings().removeClass("open");
            if(parent.hasClass("open")){
                parent.removeClass("open");
                
            }else{
                parent.addClass("open");
            }
            


        }
        
    });
  
    $(".header .nav-icon").unbind().click(function(){
        var width=$(window).width();
        if(width<=768){
            $(".overlay-common").addClass("show");
        }
        $("body").toggleClass("minimize-menu");
        
    });
    $(".overlay-common").click(function(){
        $("body").removeClass("minimize-menu");
    });
    $(".overlay-common").click(function(){
        $(".header .menus").removeClass("open");
        $(".nav-toggle").removeClass("active");
        $(this).removeClass("show");
    });
});


        
