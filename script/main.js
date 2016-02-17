

var charClass=[];
var mdown = ('ontouchstart' in document.documentElement)  ? 'touchstart' : 'mousedown';
var mup =  ('ontouchend' in document.documentElement)  ? 'touchend' : 'mouseup';
var classDB
$(document).ready(function(){
    /*import class database*/
    Tabletop.init( { key: '1lK4auOQYRzUMnikY0zfraeYnoPGZZSPg6oOGPo5hqZE',
                   callback: function(data, tabletop) {
                       classDB = data;
                   charClass[0]=classDB[0]},
                   simpleSheet: true 
    });
    /*declare novice*/
    
    
    /*limit input to 99*/
    $("#baseInput").change( function(){
        if($(this).val()<1) $(this).val(1); 
        if($(this).val()>99) $(this).val(99); 
        updateStats();
    });
    $("#jobInput").change( function(){
        if($(this).val()<1) $(this).val(1); 
        if($(this).val()>70) $(this).val(70);
        updateStats();
    });
    
    
        
    function getClassByName(name) {
        return classDB.filter(
            function(data){
                return data.class_name == name; }
        );
    };
    
    
    $('[data-toggle="tooltip"]').tooltip(); 
    $('.classSelect').on(mdown, function(){
        
        $(".btn").button('reset');
        $(".btn").removeClass('active');
        var found = getClassByName($(this).text());
        console.log(found[0]);
        charClass[0]=found[0];
        $("#classLabel").text(charClass[0].class_name);
        $("#classL").text(charClass[0].class_name);
        
    });
    $('.classSelect').on(mup, function(){
        /*change button label*/
        if ($(this).hasClass("btn")){
            $(this).html($(this).text()+' <span class="label label-default">Selected</span>');
            $(this).val($(this).text());
            $(this).addClass('active');
        } else{
            $(this).parent().parent().siblings(".btn:first-child").html($(this).text()+' <span class="label label-default">Selected</span> <span class="caret"></span>');
            $(this).parent().parent().siblings(".btn:first-child").val($(this).text());
            $(this).parent().parent().siblings(".btn:first-child").addClass('active');
            
        }
        /*change background on release*/
        if ($(window).width() > 768) { 
            $('body').css({"background-image":"url(/img/class-e/"+charClass[0].bg_link_f+")"});
        };
        
        /*set panel heading by class*/
        $('#panel-class-heading').css({"color":"white"});
        $('#panel-class-heading').css({"background-color":charClass[0].color_hex_dark});
        /*set label color by class*/
        $('#classLabel').css({"background":charClass[0].color_hex_dark})
        $('#classL').css({"background":charClass[0].color_hex_dark})
        
        /*set image*/
        $('#classImg').attr('src',"img/class/"+charClass[0].image_link);
        $('#classImg').attr('alt',charClass[0].class_name);
        updateStats();
        
    });
    
    /* background when resize*/
     $(window).resize(function() {
        if ($(window).width() > 768) { 
            $('body').css({"background-image":"url(/img/class-e/"+charClass[0].bg_link_f+")"});} else{
            $('body').css({"background-image":"url()"});
            }
        });
     
    
    /*focus when hovered*/
    $(".input-sm").mouseenter(function(){
        $(this).focus();   
    });

    $(".input-sm").focus(function(){
       $(this).select(); 
    });
    /* Back to top*/
       	var offset = 250,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

    
    function updateStats (){
        var i=0;
        var baseHP=35;
        var baseLevel=$("#baseInput").val()
        var hpModB = charClass[0].hp_mod_b;
        var hpModA = charClass[0].hp_mod;
        baseHP += baseLevel*hpModB;
        for(i=2;i<=baseLevel;i++){
            baseHP += Math.round(hpModA*i);
        }
        $("#statsMHP").text(baseHP);
        console.log(baseHP);
    }

});


