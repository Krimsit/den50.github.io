var active, dropclick, dropmenu, main_header;

dropclick = document.getElementById("dropclick");

dropmenu = document.getElementById("showLogin");

active = false;

dropclick.onclick = function() {
  if (active) {
    dropmenu.classList.remove("drop-active");
    dropmenu.classList.add("drop-noactive");
    return active = false;
  } else {
    dropmenu.classList.remove("drop-noactive");
    dropmenu.classList.add("drop-active");
    return active = true;
  }
};

main_header = document.getElementsByClassName('main_header')[0];

main_header.onclick = function(e) {
  if (e.target !== dropclick && active && e.target !== document.getElementsByClassName('defInput')[0] && e.target !== document.getElementsByClassName('defInput')[1] && e.target !== document.getElementsByClassName("button_login")[0] && e.target !== dropmenu && e.target !== document.getElementById("form_dropmenu")) {
    dropmenu.classList.remove("drop-active");
    dropmenu.classList.add("drop-noactive");
    active = false;
    return console.dir(e.target);
  }
};
//Gallary
jQuery(document).ready(function($) {
        // We only want these styles applied when javascript is enabled
        $('div.navigation').css({'width' : '550px', 'float' : 'left'});
        $('div.content').css('display', 'block');

        // Initially set opacity on thumbs and add
        // additional styling for hover effect on thumbs
        var onMouseOutOpacity = 0.9;
        $('#thumbs ul.thumbs li').opacityrollover({
          mouseOutOpacity:   onMouseOutOpacity,
          mouseOverOpacity:  1.0,
          fadeSpeed:         'fast',
          exemptionSelector: '.selected'
        });

        // Enable toggling of the caption
        var captionOpacity = 0.0;
        $('#captionToggle a').click(function(e) {
          var link = $(this);
          
          var isOff = link.hasClass('off');
          var removeClass = isOff ? 'off' : 'on';
          var addClass = isOff ? 'on' : 'off';
          var linkText = isOff ? 'Hide Caption' : 'Show Caption';
          captionOpacity = isOff ? 0.7 : 0.0;

          link.removeClass(removeClass).addClass(addClass).text(linkText).attr('title', linkText);
          $('#caption span.image-caption').fadeTo(1000, captionOpacity);
          
          e.preventDefault();
        });
        
        // Initialize Advanced Galleriffic Gallery
        var gallery = $('#thumbs').galleriffic({
          delay:                     2000,
          numThumbs:                 30,
          preloadAhead:              10,
          enableTopPager:            true,
          enableBottomPager:         true,
          maxPagesToShow:            7,
          imageContainerSel:         '#slideshow',
          controlsContainerSel:      '#controls',
          captionContainerSel:       '#caption',
          loadingContainerSel:       '#loading',
          renderSSControls:          true,
          renderNavControls:         true,
          playLinkText:              '<i class="fa fa-play controll-g" aria-hidden="true"></i>',
          pauseLinkText:             '<i class="fa fa-pause controll-g" aria-hidden="true"></i>',
          prevLinkText:              '&lsaquo; Предыдущее фото',
          nextLinkText:              'Следующее фото &rsaquo;',
          nextPageLinkText:          'Next &rsaquo;',
          prevPageLinkText:          '&lsaquo; Prev',
          enableHistory:             true,
          autoStart:                 false,
          syncTransitions:           true,
          defaultTransitionDuration: 900,
          onSlideChange:             function(prevIndex, nextIndex) {
            // 'this' refers to the gallery, which is an extension of $('#thumbs')
            this.find('ul.thumbs').children()
              .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
              .eq(nextIndex).fadeTo('fast', 1.0);
          },
          onTransitionOut:           function(slide, caption, isSync, callback) {
            slide.fadeTo(this.getDefaultTransitionDuration(isSync), 0.0, callback);
            caption.fadeTo(this.getDefaultTransitionDuration(isSync), 0.0);
          },
          onTransitionIn:            function(slide, caption, isSync) {
            var duration = this.getDefaultTransitionDuration(isSync);
            slide.fadeTo(duration, 1.0);
            
            // Position the caption at the bottom of the image and set its opacity
            var slideImage = slide.find('img');
            caption.width(slideImage.width())
              .css({
                'bottom' : Math.floor((slide.height() - slideImage.outerHeight()) / 2),
                'left' : Math.floor((slide.width() - slideImage.width()) / 2) + slideImage.outerWidth() - slideImage.width()
              })
              .fadeTo(duration, captionOpacity);
          },
          onPageTransitionOut:       function(callback) {
            this.fadeTo('fast', 0.0, callback);
          },
          onPageTransitionIn:        function() {
            this.fadeTo('fast', 1.0);
          },
          onImageAdded:              function(imageData, $li) {
            $li.opacityrollover({
              mouseOutOpacity:   onMouseOutOpacity,
              mouseOverOpacity:  1.0,
              fadeSpeed:         'fast',
              exemptionSelector: '.selected'
            });
          }
        });

        /**** Functions to support integration of galleriffic with the jquery.history plugin ****/

        // PageLoad function
        // This function is called when:
        // 1. after calling $.historyInit();
        // 2. after calling $.historyLoad();
        // 3. after pushing "Go Back" button of a browser
        function pageload(hash) {
          // alert("pageload: " + hash);
          // hash doesn't contain the first # character.
          if(hash) {
            $.galleriffic.gotoImage(hash);
          } else {
            gallery.gotoIndex(0);
          }
        }

        // Initialize history plugin.
        // The callback is called at once by present location.hash. 
        $.historyInit(pageload, "advanced.html");

        // set onlick event for buttons using the jQuery 1.3 live method
        $("a[rel='history']").live('click', function() {
          if (e.button != 0) return true;

          var hash = this.href;
          hash = hash.replace(/^.*#/, '');

          // moves to a new page. 
          // pageload is called at once. 
          // hash don't contain "#", "?"
          $.historyLoad(hash);

          return false;
        });

        /****************************************************************************************/

        /********************** Attach click event to the Add Image Link ************************/
        
        /****************************************************************************************/
        
        /***************** Attach click event to the Remove Image By Index Link *****************/
        
        $('#removeImageByIndexLink').click(function(e) {
          if (!gallery.removeImageByIndex(5))
            alert('There is no longer an image at position 5 to remove!');

          e.preventDefault();
        });
        
        /****************************************************************************************/

        /***************** Attach click event to the Remove Image By Hash Link ******************/
        
        $('#removeImageByHashLink').click(function(e) {
          if (!gallery.removeImageByHash('lizard'))
            alert('The lizard image has already been removed!');

          e.preventDefault();
        });
        
        /****************************************************************************************/
      });