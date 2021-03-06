


	/*	Initialize layout
	---------------------------------------------------------------------- */
	var container = document.getElementById("container");
	var content = document.getElementById("stage");
	var paper = document.getElementById("paper");
	var grid = document.getElementById("grid");
	var datebar = document.getElementById("date-bar");
	var datebarColor = document.getElementById("date-bar-color");
	var yearbubble = document.getElementById("year-bubble");
	var sidebar = document.getElementById("sidebars");
	var clientWidth = 0;
	var clientHeight = container.clientHeight;
	var currentTop;
	var currentLeft;
	var animateSidebar = true;
	var changedPeriod = null;

	var contentWidth = content.clientWidth;
	var contentHeight = 1440;
	//var contentHeight = 1340;
	var footerYearWidth = document.getElementById("period-bar").clientWidth;

	content.style.height = contentHeight + "px";
	paper.style.width = contentWidth + "px";
	grid.style.width = contentWidth + "px";
	datebar.style.width = contentWidth + "px";
	//datebarColor.style.width = contentWidth + "px";




	/*	Define Browser Vendor Prefix
	---------------------------------------------------------------------- */
	var docStyle = document.documentElement.style;
	var engine;
	if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') { engine = 'presto'; }
	else if ('MozAppearance' in docStyle) { engine = 'gecko'; }
	else if ('WebkitAppearance' in docStyle) { engine = 'webkit'; }
	else if (typeof navigator.cpuClass === 'string') { engine = 'trident'; }
	var vendorPrefix = { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O'}[engine];
	if(vendorPrefix == 'ms'){
		var transformProperty = "transform";
	} else {
		var transformProperty = vendorPrefix + "Transform";
	}
	//alert(transformProperty);



	/*	Function to run while scrolling and on init
	---------------------------------------------------------------------- */
	var render = (function() {
		return function(left, top){

			// Move elements while scrolling
			content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(1)'; // Move events
			paper.style[transformProperty] = 'translate3d(' + (-(left/3)) + 'px, 0, 0) scale(1)'; // Move events
			grid.style[transformProperty] = 'translate3d(' + (-(left/3)) + 'px, 0, 0) scale(1)'; // Move Grid
			datebar.style[transformProperty] = 'translate3d(' + (-left) + 'px, 0, 0) scale(1)'; // Move datebar
			datebarColor.style[transformProperty] = 'translate3d(' + (-left) + 'px, 0, 0) scale(1)'; // Move datebar (color)

			// Update variables to use elsewhere
			currentTop = top;
			currentLeft = left;

			// Set current period by stage offset
			var adjustedLeft = left + (clientWidth/2) + 93 - 110;

			if( adjustedLeft < period_offsets[1][0] && adjustedLeft >= period_offsets[0][0] ) { setActivePeriod(1, left); }
			if( adjustedLeft < period_offsets[2][0] && adjustedLeft >= period_offsets[1][0] ) { setActivePeriod(2, left); }
			if( adjustedLeft < period_offsets[3][0] && adjustedLeft >= period_offsets[2][0] ) { setActivePeriod(3, left); }
			if( adjustedLeft < period_offsets[4][0] && adjustedLeft >= period_offsets[3][0] ) { setActivePeriod(4, left); }
			if( adjustedLeft < period_offsets[5][0] && adjustedLeft >= period_offsets[4][0] ) { setActivePeriod(5, left); }
			if( adjustedLeft < period_offsets[6][0] && adjustedLeft >= period_offsets[5][0] ) { setActivePeriod(6, left); }
			if( adjustedLeft < period_offsets[7][0] && adjustedLeft >= period_offsets[6][0] ) { setActivePeriod(7, left); }
			if( adjustedLeft < period_offsets[8][0] && adjustedLeft >= period_offsets[7][0] ) { setActivePeriod(8, left); }
			if( adjustedLeft < period_offsets[9][0] && adjustedLeft >= period_offsets[8][0] ) { setActivePeriod(9, left); }
			if( adjustedLeft < period_offsets[10][0] && adjustedLeft >= period_offsets[9][0] ) { setActivePeriod(10, left); }
			if( adjustedLeft < period_offsets[11][0] && adjustedLeft >= period_offsets[10][0] ) { setActivePeriod(11, left); }
			if( adjustedLeft < period_offsets[12][0] && adjustedLeft >= period_offsets[11][0] ) { setActivePeriod(12, left); }
			if( adjustedLeft >= period_offsets[12][0] ) { setActivePeriod(13, left); }



			// Move full-width event titles while scrolling
			$.each($('div.info.full'), function(i,v){
				var fullParentEvent = $(this).parent(),
					fullOffsetLeft = fullParentEvent.css('left').replace(/[^-\d\.]/g, ''),
					fullEventWidth = fullParentEvent.css('width').replace(/[^-\d\.]/g, ''),
					menuWidthCompensate = 220,
					$this = $(this)[0];
				if( (left + menuWidthCompensate) >= fullOffsetLeft ){
					var newFullLeft = (left + menuWidthCompensate) - fullOffsetLeft;
					if( newFullLeft < (fullEventWidth - 263) ){
						this.style[transformProperty] = 'translate3d('+newFullLeft+'px, 0px,0)';
					}
				} else {
					this.style[transformProperty] = 'translate3d(0px, 0px,0)';
				}
			});

		}
	})(this);



	/*	When the Period Changes
	---------------------------------------------------------------------- */
	function periodChanged(period){

		// Update Current Period
		currentPeriod = period;


		// Hide/ Show Events on Timeline for Performance
		$('div.events').html('');
		if( period > 1 ){ $.each(events[period-1], function(i,v){ $('div.events').append(v); }); }
		if( period > 2 ){ $.each(events[period-2], function(i,v){ $('div.events').append(v); }); }
		$.each(events[period], function(i,v){ $('div.events').append(v); });
		if( period < 13 ){ $.each(events[period+1], function(i,v){ $('div.events').append(v); }); }


		// Add hoverability to new event elements in DOM (appended above)
		$('.hover').addClass(hover);


		// Update Footer
		$('div.period').removeClass('active');
		$('div.period-'+period+'-wrap').addClass('active');


		// Update Sidebar
		//if(animateSidebar){
			updateSidebar(period);
		//}


		// Update Color Datebar (*updated - done on hover event in app.js)
		//$('div.date-bar-color').attr('class', 'date-bar-color date-bar-color-'+period);
		//$('div.date-bar-color ul').attr('class', 'period-text-'+period);

		// Update all colors
		//$('p.breadcrumbs span').attr('class', 'period-text-'+period);
		$('a.close').attr('class', 'close period-'+period);
		$('a.related').attr('class', 'related period-'+period);
		$('li.favorites a').attr('class', 'period-'+period);



		// Update URL & footer text
		if(routerFlag == true){
			var seoDescription = $('.landing-period-'+period+' h4').html();
			switch(period){
				case 1:
					router.navigate('../period/first-generation');
					$('.period-bar h5').html('Primera Generación');
					$('.link.period-name').attr('data-period', period).html('Primera Generación');
					$('.link.age-name').html('Edad de los Patriarcas');
					setSEO('Primera Generación | Biblia Historia', seoDescription);
					break;
				case 2:
					router.navigate('period/noah-and-the-flood');
					$('.period-bar h5').html('Noé y el diluvio');
					$('.link.period-name').attr('data-period', period).html('Noé y el diluvio');
					$('.link.age-name').html('Edad de los Patriarcas');
					setSEO('Noé y el diluvio | Biblia Historia', seoDescription);
					break;
				case 3:
					router.navigate('period/the-patriarchs');
					$('.period-bar h5').html('Los Patriarcas');
					$('.link.period-name').attr('data-period', period).html('Los Patriarcas');
					$('.link.age-name').html('Edad de los Patriarcas');
					setSEO('Los Patriarcas | Biblia Historia', seoDescription);
					break;
				case 4:
					router.navigate('period/egypt-to-canaan');
					$('.period-bar h5').html('Egipto a Canaan');
					$('.link.period-name').attr('data-period', period).html('Egipto a Canaan');
					$('.link.age-name').html('Tiempos de Israel');
					setSEO('Egipto a Canaan | Biblia Historia', seoDescription);
					break;
				case 5:
					router.navigate('period/the-judges');
					$('.period-bar h5').html('Los Jueces');
					$('.link.period-name').attr('data-period', period).html('Los Jueces');
					$('.link.age-name').html('Tiempos de Israel');
					setSEO('Los Jueces | Biblia Historia', seoDescription);
					break;
				case 6:
					router.navigate('period/united-kingdom');
					$('.period-bar h5').html('Reino Unido');
					$('.link.period-name').attr('data-period', period).html('Reino Unido');
					$('.link.age-name').html('Tiempos de Israel');
					setSEO('Reino Unido | Biblia Historia', seoDescription);
					break;
				case 7:
					router.navigate('period/divided-kingdom');
					$('.period-bar h5').html('Reino Divido');
					$('.link.period-name').attr('data-period', period).html('Reino Divido');
					$('.link.age-name').html('Tiempos de Israel');
					setSEO('Reino Divido | Biblia Historia', seoDescription);
					break;
				case 8:
					router.navigate('period/the-exile');
					$('.period-bar h5').html('El Exilio');
					$('.link.period-name').attr('data-period', period).html('El Exilio');
					$('.link.age-name').html('Tiempos de Israel');
					setSEO('El Exilio | Biblia Historia', seoDescription);
					break;
				case 9:
					router.navigate('period/life-of-christ');
					$('.period-bar h5').html('Tiempos de Jesucristo');
					$('.link.period-name').attr('data-period', period).html('Tiempos de Jesucristo');
					$('.link.age-name').html('Tiempos de Jesucristo');
					setSEO('Tiempos de Jesucristo | Biblia Historia', seoDescription);
					break;
				case 10:
					router.navigate('period/early-church');
					$('.period-bar h5').html('Inicios de la Iglesia');
					$('.link.period-name').attr('data-period', period).html('Inicios de la Iglesia');
					$('.link.age-name').html('Tiempos de Jesucristo');
					setSEO('Inicios de la Iglesia | Biblia Historia', seoDescription);
					break;
				case 11:
					router.navigate('period/middle-ages');
					$('.period-bar h5').html('Edad Media');
					$('.link.period-name').attr('data-period', period).html('Edad Media');
					$('.link.age-name').html('Tiempos de Jesucristo');
					setSEO('Edad Media | Biblia Historia', seoDescription);
					break;
				case 12:
					router.navigate('period/reformation');
					$('.period-bar h5').html('Tiempos de la Reforma');
					$('.link.period-name').attr('data-period', period).html('Tiempos de la Reforma');
					$('.link.age-name').html('Tiempos de Jesucristo');
					setSEO('Tiempos de la Reforma | Biblia Historia', seoDescription);
					break;
				case 13:
					router.navigate('period/revelation-prophecies');
					$('.period-bar h5').html('El Apocalipsis');
					$('.link.period-name').attr('data-period', period).html('El Apocalipsis');
					$('.link.age-name').html('Tiempos de Jesucristo');
					setSEO('El Apocalipsis | Biblia Historia', seoDescription);
					break;
			}
		}
	}


	/*	Runs while scrolling
	---------------------------------------------------------------------- */
	function setActivePeriod(period, left){


		// Determine when the period actually changes
		if( period != changedPeriod || detailCloseFlag){
			changedPeriod = period;
			periodChanged(period);
			detailCloseFlag = false;
		}


		// Update current year bubble (Sloppy, fix later)
		var half_view = clientWidth/2,
			adjust_left = left + half_view - 24,
			current_year = period_offsets[period-1][2] + (adjust_left - period_offsets[period-1][0]) / period_offsets[period-1][3];
			current_year = current_year;

/*
		if( period_offsets[period-1][2] < 0 ){
			current_year = period_offsets[period-1][2] + (adjust_left - period_offsets[period-1][0]) / period_offsets[period-1][3];
		} else {
			current_year = period_offsets[period-1][2] + (adjust_left - period_offsets[period-1][0]) / period_offsets[period-1][3];
		}
*/



		if( current_year < -100){
			$('.current-year').html(Math.abs(Math.round(current_year)) + '<span>AC</span>' );
		}
		if( current_year > -100 && current_year < 0 ){
			current_year = period_offsets[period-1][2] + (adjust_left - period_offsets[period-1][0] - 60 ) / period_offsets[period-1][3];
			$('.current-year').html( Math.abs(Math.round(current_year)) + '<span>AC</span>' );
		}
		if( current_year > 0 && current_year < 34 ){
			current_year = period_offsets[period-1][2] + (adjust_left - period_offsets[period-1][0] + 60 ) / period_offsets[period-1][3];
			$('.current-year').html( Math.abs(Math.round(current_year)) + '<span>DC</span>' );
		}
		if( current_year >= 34 && current_year < 2014 ){
			$('.current-year').html( Math.abs(Math.round(current_year)) + '<span>DC</span>' );
		}
		if( current_year >= 2014 ){
			$('.current-year').html( 'Futuro' );
		}

	}





	function updateSidebar(period){
		var sidebarWidth = 220,
			sidebarOffset = sidebarWidth * (period - 1);
		sidebar.style[transformProperty] = 'translate3d(' + (-sidebarOffset) + 'px, 0, 0) scale(1)'; // Move datebar
	}

	// Run when scrolling slowing down
	function slowing(speed){
		if( speed < 1 && speed > -1 || !speed){
			//$('.date-bar').css('opacity', 0.2);
		} else {
			//$('.date-bar').css('opacity', 1);
		}
	}



	/*	Initialize Scroller
	---------------------------------------------------------------------- */
	this.scroller = new Scroller(render, { zooming: false });







	/*	Set Default Offset
	---------------------------------------------------------------------- */
	var offsetTop = (contentHeight - clientHeight) / 2,
		offsetLeft = (offsetLeft) ? offsetLeft : 0;
	scroller.setOffset(offsetLeft, offsetTop);






	function scrollTo(top, left){
		scroller.scrollTo(top, left, true);
	}






	/*	Reflow handling
	---------------------------------------------------------------------- */
	var reflow = function() {
		clientWidth = container.clientWidth;
		clientHeight = container.clientHeight;
		footerYearWidth = document.getElementById("period-bar").clientWidth;
		scroller.setDimensions(clientWidth, clientHeight, contentWidth, contentHeight);

		// Set dynamic article box height (Wish there were a simple CSS solution...)
		var boxHeight = clientHeight - 330;
			boxHeight = (boxHeight < 400) ? 400 : boxHeight;
		$('div.box').css('height', boxHeight);


		// Set responsive home page height
		if( clientHeight < 700 ){
			$('div.arches').hide();
		} else {
			$('div.arches').show();
		}


	};
	window.addEventListener("resize", reflow, false);
	reflow();







	/*	Bind Events
	---------------------------------------------------------------------- */


	// Bind the arrow buttons
	$('div.timeline-arrow.top').on('click', function(){ scroller.scrollBy(0, -150, true); });
	$('div.timeline-arrow.bottom').on('click', function(){ scroller.scrollBy(0, 150, true); });
	$('div.timeline-arrow.left').on('click', function(){ scroller.scrollBy(-250, 0, true); });
	$('div.timeline-arrow.right').on('click', function(){ scroller.scrollBy(250, 0, true); });



	// Bind keyboard arrows
	$(document).keydown(function(e){
	    if (e.keyCode == 38) {
	    	scroller.scrollBy(0, -150, true);
	    	return false;
	    }
	    if (e.keyCode == 40) {
	    	scroller.scrollBy(0, 150, true);
	    	return false;
	    }
	    if (e.keyCode == 37) {
	    	scroller.scrollBy(-250, 0, true);
	    	return false;
	    }
	    if (e.keyCode == 39) {
	    	scroller.scrollBy(250, 0, true);
	    	return false;
	    }
	});


	// Listen for Touch and Mouse Events on Timeline
	if ('ontouchstart' in window) {

		container.addEventListener("touchstart", function(e) {
			if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
				return;
			}
			scroller.doTouchStart(e.touches, e.timeStamp);
			e.preventDefault();
		}, false);
		container.addEventListener("touchmove", function(e) {
			scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
		}, false);
		container.addEventListener("touchend", function(e) {
			scroller.doTouchEnd(e.timeStamp);
		}, false);
		container.addEventListener("touchcancel", function(e) {
			scroller.doTouchEnd(e.timeStamp);
		}, false);

	}
	else if('onmsgesturechange' in window){
		//var mousedown = false;
		container.addEventListener("MSPointerDown", function(e) {
			//if (e.target.tagName.match(/input|textarea|select/i)) { return; }
			scroller.doTouchStart([{
				//pageX: e.pageX,
				//pageY: e.pageY
				pageX: e.clientX,
				pageY: e.clientY
			}], e.timeStamp);
			//mousedown = true;
		}, false);
		container.addEventListener("MSPointerMove", function(e) {
			//if (!mousedown) { return; }
			scroller.doTouchMove([{
				//pageX: e.pageX,
				//pageY: e.pageY
				pageX: e.clientX,
				pageY: e.clientY
			}], e.timeStamp);
			//mousedown = true;
		}, false);
		container.addEventListener("MSPointerUp", function(e) {
			//if (!mousedown) { return; }
			scroller.doTouchEnd(e.timeStamp);
			//mousedown = false;
		}, false);
		container.addEventListener("MSPointerCancel", function(e) {
			scroller.doTouchEnd(e.timeStamp);
		}, false);
	}

	else {
		var mousedown = false;
		container.addEventListener("mousedown", function(e) {
			if (e.target.tagName.match(/input|textarea|select/i)) { return; }
			scroller.doTouchStart([{
				pageX: e.pageX,
				pageY: e.pageY
			}], e.timeStamp);
			mousedown = true;
		}, false);
		document.addEventListener("mousemove", function(e) {
			if (!mousedown) { return; }
			scroller.doTouchMove([{
				pageX: e.pageX,
				pageY: e.pageY
			}], e.timeStamp);
			mousedown = true;
		}, false);
		document.addEventListener("mouseup", function(e) {
			if (!mousedown) { return; }
			scroller.doTouchEnd(e.timeStamp);
			mousedown = false;
		}, false);
	}
