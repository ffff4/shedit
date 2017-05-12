  var consoleSVGValue = (
    '<?xml version="1.0" standalone="no"?>' +
      '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
    '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>' +
    '</svg>'
  );
    

     /*$( function() {
          var availableTags = [


      "ActionScript",


      "AppleScript",


      "Ruby",


      "Scala",


      "Scheme"


    ];
     $( "#tags" ).autocomplete({
       source: availableTags
       });
       } );*/

 /*
     $( function() {

    $.widget( "custom.combobox", {

      _create: function() {

        this.wrapper = $( "<span>" )

          .addClass( "custom-combobox" )

          .insertAfter( this.element );

 

        this.element.hide();

        this._createAutocomplete();

        this._createShowAllButton();

      },

 

      _createAutocomplete: function() {

        var selected = this.element.children( ":selected" ),

          value = selected.val() ? selected.text() : "";

 

        this.input = $( "<input>" )

          .appendTo( this.wrapper )

          .val( value )

          .attr( "title", "" )

          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )

          .autocomplete({

            delay: 0,

            minLength: 0,

            source: $.proxy( this, "_source" )

          })

          .tooltip({

            classes: {

              "ui-tooltip": "ui-state-highlight"

            }

          });

 

        this._on( this.input, {

          autocompleteselect: function( event, ui ) {

            ui.item.option.selected = true;

            this._trigger( "select", event, {

              item: ui.item.option

            });

          },

 

          autocompletechange: "_removeIfInvalid"

        });

      },

 

      _createShowAllButton: function() {

        var input = this.input,

          wasOpen = false;

 

        $( "<a>" )

          .attr( "tabIndex", -1 )

          .attr( "title", "Show All Items" )

          .tooltip()

          .appendTo( this.wrapper )

          .button({

            icons: {

              primary: "ui-icon-triangle-1-s"

            },

            text: false

          })

          .removeClass( "ui-corner-all" )

          .addClass( "custom-combobox-toggle ui-corner-right" )

          .on( "mousedown", function() {

            wasOpen = input.autocomplete( "widget" ).is( ":visible" );

          })

          .on( "click", function() {

            input.trigger( "focus" );

 

            // Close if already visible

            if ( wasOpen ) {

              return;

            }

 

            // Pass empty string as value to search for, displaying all results

            input.autocomplete( "search", "" );

          });

      },

 

      _source: function( request, response ) {

        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );

        response( this.element.children( "option" ).map(function() {

          var text = $( this ).text();

          if ( this.value && ( !request.term || matcher.test(text) ) )

            return {

              label: text,

              value: text,

              option: this

            };

        }) );

      },

 

      _removeIfInvalid: function( event, ui ) {

 

        // Selected an item, nothing to do

        if ( ui.item ) {

          return;

        }

 

        // Search for a match (case-insensitive)

        var value = this.input.val(),

          valueLowerCase = value.toLowerCase(),

          valid = false;

        this.element.children( "option" ).each(function() {

          if ( $( this ).text().toLowerCase() === valueLowerCase ) {

            this.selected = valid = true;

            return false;

          }

        });

 

        // Found a match, nothing to do

        if ( valid ) {

          return;

        }

 

        // Remove invalid value

        this.input

          .val( "" )

          .attr( "title", value + " didn't match any item" )

          .tooltip( "open" );

        this.element.val( "" );

        this._delay(function() {

          this.input.tooltip( "close" ).attr( "title", "" );

        }, 2500 );

        this.input.autocomplete( "instance" ).term = "";

      },

 

      _destroy: function() {

        this.wrapper.remove();

        this.element.show();

      }

    });



    $( "#combobox" ).combobox();

    $( "#toggle" ).on( "click", function() {

      $( "#combobox" ).toggle();

    });

  } );*/


     $( function() {
    var dialog, form,
 
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add( name ).add( email ).add( password ),
      tips = $( ".validateTips" );
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    function addUser() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( name, "username", 3, 16 );
      valid = valid && checkLength( email, "email", 6, 80 );
      valid = valid && checkLength( password, "password", 5, 16 );
 
      valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
      valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
 
      if ( valid ) {
        $( "#users tbody" ).append( "<tr>" +
          "<td>" + name.val() + "</td>" +
          "<td>" + email.val() + "</td>" +
          "<td>" + password.val() + "</td>" +
        "</tr>" );
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 600,
      width: 650,
      modal: true,
      buttons: {
        //"Create an account": addUser,Cancel:
        "–ó–∞–∫—Ä—ã—Ç—å":  function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      addUser();
    });
 
    $( "#create-user" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });

  } );

  function  getText() {
    return getActiveProp('text');
  };
 function addTextbox() {
    //var text = '–¢–µ–∫—Å—Ç';
    var text = $("input[name=nametxt]").val();
    var textSample = new fabric.Text(text.slice(0, text.length), {
      fontSize: 20,
      left: canvas.getWidth()/2,
      top: canvas.getHeight()/2,
      fontFamily: 'helvetica',
     // angle: getRandomInt(-10, 10),
      fill: tek_Stroke_color,
      fontWeight: '',
      originX: 'left',
      lockScalingY : 'false',
      lockScalingX : 'false',
      transparentCorners:'true',
     // originY: 'bottom',
      //width: 300,
     // hasRotatingPoint: true,
     // centerTransform: true,
      opacity: 1
    });

    canvas.add(textSample);
  };

   function addTextbox2() {
    //var text = '–¢–µ–∫—Å—Ç';
    var text = $("input[name=nametxt]").val();
    var textSample = new fabric.Textbox(text.slice(0, text.length), {
      fontSize: 20,
      left: canvas.getWidth()/2,
      top: canvas.getHeight()/2,
      fontFamily: 'helvetica',
     // angle: getRandomInt(-10, 10),
      fill: tek_Stroke_color,
      fontWeight: '',
      originX: 'left',
      width: 300,
      hasRotatingPoint: true,
      centerTransform: true,
      transparentCorners:'true',
      opacity: 1
    });

    canvas.add(textSample);
  };
  function addLine() {
    //var coord = getRandomLeftTop();
        var wid2;
    wid2 =   $("#spinner[name=Line_widht_value]").spinner("value");
    if (tek_color[0] != "#")
      { tek_color = "#"+tek_color};//50, 100, 200, 200
    canvas.add(new fabric.Line([ 0, 0, 200, 200],{
      left: canvas.getWidth()/2,//left: 5,
      top: canvas.getHeight()/2,//5,
      stroke: tek_color,
      strokeWidth: wid2,
      transparentCorners:'true',
      angle: 0,
     // padding: 10
    }));
  }; 
    function addLine45flip() {
    //var coord = getRandomLeftTop();
        var wid2;
    wid2 =   $("#spinner[name=Line_widht_value]").spinner("value");
    if (tek_color[0] != "#")
      { tek_color = "#"+tek_color};//50, 100, 200, 200
    canvas.add(new fabric.Line([ 0, 200, 200, 0],{
      left: canvas.getWidth()/2,//left: 5,
      top: canvas.getHeight()/2,//5,
      stroke: tek_color,
      strokeWidth: wid2,
      transparentCorners:'true',
      angle: 0,
     // padding: 10
    }));
  }; 
  function addCircle() {
    //var coord = getRandomLeftTop();
    if (tek_color[0] != "#")
      { tek_color = "#"+tek_color};
    canvas.add(new fabric.Circle({
      left: canvas.getWidth()/2,//left: 5,
      top: canvas.getHeight()/2,//5,
      fill: tek_color,
    radius: 50,
    transparentCorners:'true',
      opacity: 1
    }));
  }; 
    function addCircletransparent() {
    //var coord = getRandomLeftTop();
    if (tek_color[0] != "#")
      { tek_color = "#"+tek_color};
    canvas.add(new fabric.Circle({
      left: canvas.getWidth()/2,//left: 5,
      top: canvas.getHeight()/2,//5,
      fill: "transparent",
      //stroke-width: 2,
      stroke: tek_Stroke_color,
      radius: 50,
      transparentCorners:'true',
      opacity: 1
    }));
       console.log('object_ Color ',tek_Stroke_color);    
  }; 
  function addRecttransparent() {
    //var coord = getRandomLeftTop();
    if (tek_color[0] != "#")
      { tek_color = "#"+tek_color};
   console.log('object_selected Color ',tek_color);    

    canvas.add(new fabric.Rect({
      left: canvas.getWidth()/2,//left: 5,
      top: canvas.getHeight()/2,//5,
      fill: "transparent",
      //stroke-width: 2,
      stroke: tek_Stroke_color,
      width: 50,
      height: 50,
      transparentCorners:'true',
      opacity: 1
    }));
  };
  function addTriangle() {
    //var coord = getRandomLeftTop();
    if (tek_color[0] != "#")
      { tek_color = "#"+tek_color};
    canvas.add(new fabric.Triangle({
      left: canvas.getWidth()/2,//left: 5,
      top: canvas.getHeight()/2,//5,
      fill: tek_color,
      width: 50,
      height: 50,
      transparentCorners:'true',
      opacity: 1
    }));
  }; 
  function addRect3() {
    //var coord = getRandomLeftTop();
    if (tek_color[0] != "#")
      { tek_color = "#"+tek_color};
   console.log('object_selected Color ',tek_color);    

    canvas.add(new fabric.Rect({
      left: canvas.getWidth()/2,//left: 5,
      top: canvas.getHeight()/2,//5,
      fill: tek_color,
      width: 50,
      height: 50,
      transparentCorners:'true',
      opacity: 1
    }));
  }; 
    /*function strokeColor_input() {    
     var color = document.getElementsByName("stroke_Color")[0].value;
     tek_Stroke_color = color;
      if (tek_Stroke_color[0] != "#")
      { tek_Stroke_color = "#"+tek_Stroke_color};
     var activeObject = canvas.getActiveObject();
      if (activeObject) {
       activeObject.set({
        stroke: tek_Stroke_color
    //    fill: tek_Stroke_color,
     }); 
      console.log('set new color ', tek_Stroke_color);
       canvas.renderAll(); 
    }
    }; 
*/
    function addLine3(wid) {
     
    var wid2;
    wid2 =   $("#spinner[name=Line_widht_value]").spinner("value");
     console.log('Line_widht_value ', wid2);
    var SVGValue_txt;
          if (tek_Stroke_color[0] != "#")
      { tek_Stroke_color = "#"+tek_Stroke_color};
    SVGValue_txt = "<Line x1=\"370\" y1=\"90\" x2=\"370\" y2=\"240\" style=\"stroke: "+tek_Stroke_color+"; stroke-width:"+wid2 +"px;\" />";
    SVGValue_txt = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">'
   +SVGValue_txt+ '</svg>';  
/* loadSVGWithoutGrouping();
 loadSVGWithoutGrouping = function() {
    _loadSVGWithoutGrouping(SVGValue_txt);
  };*/

      var _loadSVGWithoutGrouping = function(svg) {
      fabric.loadSVGFromString(svg, function(objects) {
      canvas.add.apply(canvas, objects);
      canvas.renderAll();
    });
  };
   _loadSVGWithoutGrouping(SVGValue_txt); 
  }; 

      function addLineGoriz(wid) {
     
    var wid2;
    wid2 =   $("#spinner[name=Line_widht_value]").spinner("value");
     console.log('Line_widht_value ', wid2);
    var SVGValue_txt;
    
      if (tek_Stroke_color[0] != "#")
      { tek_Stroke_color = "#"+tek_Stroke_color};
    var Stroke_col = tek_Stroke_color;
    SVGValue_txt = "<Line x1=\"370\" y1=\"90\" x2=\"570\" y2=\"90\" style=\"stroke: "+Stroke_col+"; stroke-width:"+wid2 +"px;\" />";
    SVGValue_txt = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">'
   +SVGValue_txt+ '</svg>';  
/* loadSVGWithoutGrouping();
 loadSVGWithoutGrouping = function() {
    _loadSVGWithoutGrouping(SVGValue_txt);
  };*/

      var _loadSVGWithoutGrouping = function(svg) {
      fabric.loadSVGFromString(svg, function(objects) {
      canvas.add.apply(canvas, objects);
      canvas.renderAll();
    });
  };
   _loadSVGWithoutGrouping(SVGValue_txt); 
  }; 



      function FlipX1() {    
    var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveGroup();
        if (activeGroup) {
      activeGroup.setFlipX(!activeGroup.getFlipX());        
        }
        else
    if (activeObject) {
      activeObject.setFlipX(!activeObject.getFlipX());
      canvas.renderAll();

    } 
    }; 

          function FlipY1() {    
    var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveGroup();
                if (activeGroup) {
      activeGroup.setFlipY(!activeGroup.getFlipY());        
        }
        else
    if (activeObject) {
      activeObject.setFlipY(!activeObject.getFlipY());
      canvas.renderAll();

    } 
    }; 


      function sendBackwards() {    
 var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendBackwards(activeObject);
      canvas.renderAll();
       console.log('sendBackwards ', sendBackwards);
    } 
    }; 

          function sendToBack() {    
 var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendToBack(activeObject);
      canvas.renderAll();
    } 
    }; 

              function bringForward() {    
 var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringForward(activeObject);
      canvas.renderAll();
    } 
    }; 

                  function bringToFront() {    
 var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringToFront(activeObject);
      canvas.renderAll();
    } 
    }; 

  function SetTransparentFill() {    
 var activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set({
        fill : "transparent"
      });
      canvas.renderAll();
    } 
    }; 

 function loadSVGtext() {  
             var _loadSVG = function(svg) {
       fabric.loadSVGFromString(svg, function(objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).centerObject(obj).renderAll();
        obj.setCoords();
        });
        }  
  //$("input[name=nametxt]").val();
 var txt =   $("textarea#svg-console").val();

    if (txt.length>2) {
 _loadSVG(txt);
    } 
    }; 

     function loadSVGtext_unGroup() {  
        var _loadSVGWithoutGrouping = function(svg) {
        fabric.loadSVGFromString(svg, function(objects) {
        canvas.add.apply(canvas, objects);
        canvas.renderAll();
        });
       }; 
  //$("input[name=nametxt]").val();
 var txt =   $("textarea#svg-console").val();

    if (txt.length>2) {
 _loadSVGWithoutGrouping(txt);
    } 
    }; 


    function combo(thelist, theinput)
{
  theinput = document.getElementById(theinput);  
  var idx = thelist.selectedIndex;
  var content = thelist.options[idx].innerHTML;
  theinput.value = content; 
  setIDObj();
}

    function combo_font(thelist, theinput)
{
  theinput = document.getElementById(theinput);  
  var idx = thelist.selectedIndex;
  var content = thelist.options[idx].innerHTML;
 // theinput.value = content; 
    console.log('combo_font ', content);
    set_font(content);
 // setIDObj();
}




/**
*
*  UTF-8 data encode / decode
*  http://www.webtoolkit.info/
*
**/

var Utf8 = {

    // public method for url encoding
    encode : function (string) {
        string = string.replace(/rn/g,"n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // public method for url decoding
    decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
function utf8_encode(string) {
        string = string.replace(/rn/g,"n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;
    }
 
function utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        var cod1 = 0;
        var Alfavit = '¿¡¬√ƒ≈®∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ';
        while ( i < utftext.length ) {
 
            c = utftext.charCodeAt(i);
            //  console.log(' c '+c,' '+utftext[i]);  
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                cod1 = (((c & 31) << 6) | (c2));
               // console.log(' cod1 '+cod1,' '+String.fromCharCode(((c & 31) << 6) | (c2 & 63)));  
                if  (cod1 === 1168){
                  string += String.fromCharCode(1040);//¿
                }
                else
                if  (cod1 === 9240   ){
                  string += String.fromCharCode(1041);//¡
                   console.log('¡---');
                }
                else
                if  (cod1 === 9241   ){
                  string += String.fromCharCode(1042);//¬
                }
                else
                if  (cod1 === 9244   ){
                  string += String.fromCharCode(1043);//√
                }
                else
              if  (cod1 === 9245   ){
                  string += String.fromCharCode(1044);//ƒ
                }
                else
                if  (cod1 === 9250        ){
                  string += String.fromCharCode(1045);//≈
                }
                else
                  if  (cod1 === 1153     ){
                  string += String.fromCharCode(1025);//®
                }
                else
                  if  (cod1 === 9235         ){
                  string += String.fromCharCode(1046);
                }
                else
                  if  (cod1 === 9236         ){
                  string += String.fromCharCode(1047);
                }
                else
                  if  (cod1 === 1756 ){
                  string += String.fromCharCode(1048);
                }
                else
                                    if  (cod1 === 9506   ){
                  string += String.fromCharCode(1049);
                }
                else
                                    if  (cod1 === 1377   ){
                  string += String.fromCharCode(1050);
                }
                else
                                    if  (cod1 === 9274   ){
                  string += String.fromCharCode(1051);
                }
                else
                                    if  (cod1 === 1363   ){
                  string += String.fromCharCode(1052);
                }
                else
                                    if  (cod1 === 1181   ){
                  string += String.fromCharCode(1053);
                }
                else
                                    if  (cod1 === 1406   ){
                  string += String.fromCharCode(1054);
                }
                else
                                    if  (cod1 === 1400   ){
                  string += String.fromCharCode(1055);
                }
                else
                                    if  (cod1 === 1056   ){
                  string += String.fromCharCode(1056);
                }
                else
                                    if  (cod1 === 1185   ){
                  string += String.fromCharCode(1057);
                }
                else
                if  (cod1 === 9304     ){
                  string += String.fromCharCode(1105);
                }
                else
                                  if  (cod1 === 9452       ){
                  string += String.fromCharCode(1088);
                }
                else
                                  if  (cod1 === 1217       ){
                  string += String.fromCharCode(1089);
                }
                else
                                  if  (cod1 === 9306       ){
                  string += String.fromCharCode(1090);
                }
                else
                                  if  (cod1 === 1490       ){
                  string += String.fromCharCode(1091);
                }
                else
                                  if  (cod1 === 9310       ){
                  string += String.fromCharCode(1092);
                }
                else
                                  if  (cod1 === 9318       ){
                  string += String.fromCharCode(1093);
                }
                else
                                  if  (cod1 === 9312       ){
                  string += String.fromCharCode(1094);
                }
                else
                                  if  (cod1 === 9313       ){
                  string += String.fromCharCode(1095);
                }
                else
                                  if  (cod1 === 1734     ){
                  string += String.fromCharCode(1096);
                }
                else
                                  if  (cod1 === 9328       ){
                  string += String.fromCharCode(1097);
                }
                else
                                  if  (cod1 === 1376       ){
                  string += String.fromCharCode(1098);
                }
                else
                                  if  (cod1 === 9337       ){
                  string += String.fromCharCode(1099);
                }
                else
                                                    if  (cod1 === 1362       ){
                  string += String.fromCharCode(1100);
                }
                else
                                                    if  (cod1 === 1229       ){
                  string += String.fromCharCode(1101);
                }
                else
                                                    if  (cod1 === 1405         ){
                  string += String.fromCharCode(1102);
                }
                  else


                  {
                  string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                }
                



                //string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));//;
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
 
        }
 
        return string;
    }
 function Post_sheme() {    

$.post("save.php", canvas.toSVG());

    }; 
   function After_load() {   
      var kol = 0;   
canvas.forEachObject(function(obj){ 
  console.log('obj - ',kol);
 var transformMatrix1 = [1,0,0,1,0,0];
    var str_x; 
    var str_y; 
    var tr_y; 
        var tx_sg = obj.toSVG();
            if ((tx_sg.indexOf('transform="translate')>=0) && (tx_sg.indexOf('<g ')>=0))
  {
     obj.setOriginX('left');
      obj.set('lockScalingX','false');
     obj.set('lockScalingY','false');
     //obj.setOriginY('bottom');  
  }
   console.log('__________________________ '); 
        var transformMatrix2 = obj.get('transformMatrix');
        var strokeWidth1 = obj.getStrokeWidth();  
        console.log('strokeWidth1 ',strokeWidth1); 
         console.log('transformMatrix2[4] x - ',transformMatrix2[4]); 
          console.log('transformMatrix2[5] y - ',transformMatrix2[5]); 
          console.log('transformMatrix2[0]  - ',transformMatrix2[0]); 
          console.log('transformMatrix2[3]  - ',transformMatrix2[3]); 
         var m_x = obj.getLeft();
 var m_y = obj.getTop();

 var calcTransformMatrix2 = obj.calcTransformMatrix();  
        transformMatrix1[1] = transformMatrix2[1];
        transformMatrix1[2] = transformMatrix2[2];
  if (!((tx_sg.indexOf('transform="translate')>=0) && (tx_sg.indexOf('<g ')>=0)))
  {
    obj.setTransformMatrix(transformMatrix1);
  }
         
      /* obj.setLeft(transformMatrix2[4]+m_x*transformMatrix2[0]);
       obj.setTop(transformMatrix2[5]+m_y*transformMatrix2[3]);*/
if (tx_sg.indexOf('<line x1="0"')>=0){
       // obj.setLeft(transformMatrix2[4]+(m_x-1)*transformMatrix2[0]);
       //obj.setTop(transformMatrix2[5]+(m_y-1)*transformMatrix2[3]); 
      obj.setLeft(transformMatrix2[4]+(m_x)*transformMatrix2[0]-(strokeWidth1/2)*transformMatrix2[0]);//(m_x-0.5)*transformMatrix2[0]
       obj.setTop(transformMatrix2[5]+(m_y)*transformMatrix2[3]-(strokeWidth1/2)*transformMatrix2[3]); //(m_y-0.5)*transformMatrix2[3]     
}
else  
  if ((tx_sg.indexOf('<rect ')>=0) || (tx_sg.indexOf('<polygon ')>=0) || (tx_sg.indexOf('<line x1="-')>=0)|| (tx_sg.indexOf('<circle cx=')>=0))
  {
        obj.setLeft(transformMatrix2[4]+(m_x)*transformMatrix2[0]-(strokeWidth1/2)*transformMatrix2[0]);//(m_x-0.5)*transformMatrix2[0]
       obj.setTop(transformMatrix2[5]+(m_y)*transformMatrix2[3]-(strokeWidth1/2)*transformMatrix2[3]); //(m_y-0.5)*transformMatrix2[3]
}
else
  if (tx_sg.indexOf('<path ')>=0)
  {
        obj.setLeft(transformMatrix2[4]+(m_x-strokeWidth1/2)*transformMatrix2[0]);
       obj.setTop(transformMatrix2[5]+(m_y-strokeWidth1/2)*transformMatrix2[3]); 
}
else
    if ((tx_sg.indexOf('transform="translate')>=0) && (tx_sg.indexOf('<g ')>=0))//if (tx_sg.indexOf('<g transform="translate')>=0)
  {
      
         var  poz2 = tx_sg.indexOf("</tspan>");
   var  poz1 = tx_sg.indexOf("<tspan ");
   console.log('poz1 - ',poz1);
   if ((poz2>0) && (poz1>0))
   {
    var  poz3 = tx_sg.indexOf(">",poz1+1);
    if (poz3>0){
      var str = tx_sg.substring(poz3+1,poz2);
      
//console.log(' str ',utf8_decode(str));  
     /* obj.set({
        text : utf8_decode(str)//Utf8.decode
        });*/
      console.log(' poz2 ',poz2);  
    }


   }//  if ((poz2>0) && (poz1>0)) 


tx_sg = obj.toSVG();

poz2 = tx_sg.indexOf("</tspan>");
poz1 = tx_sg.indexOf("<tspan ");
   if ((poz2>0) && (poz1>0))
   {

    var  poz3 = tx_sg.indexOf('x="',poz1+1);
    if (poz3>0){
      var  poz4 = tx_sg.indexOf('"',poz3+4);
      console.log(' poz4 ',poz4);  
       console.log(' poz3 ',poz3);  
       str_x = tx_sg.substring(poz3+3,poz4);      
      console.log(' str_x ',str_x);  
    }
      poz3 = tx_sg.indexOf('y="',poz1+1);
    if (poz3>0){
      var  poz4 = tx_sg.indexOf('"',poz3+4);
      console.log(' poz4 ',poz4);  
       console.log(' poz3 ',poz3);  
       str_y = tx_sg.substring(poz3+3,poz4);      
      console.log(' str_y ',str_y);  
    }


   }//  if ((poz2>0) && (poz1>0)) 

 poz1 = tx_sg.indexOf('transform="translate(');
 if (poz1>0)
    {
      console.log('poz1 y - ',poz1);
         poz2 = tx_sg.indexOf(" ",poz1+21);
         var  poz3 = tx_sg.indexOf(')',poz2+1);
          tr_y = tx_sg.substring(poz2,poz3);   
             console.log('tr_y - ',tr_y);   
    }

   console.log('tx_sg - ',tx_sg);
             m_x = obj.getLeft();
             m_y = obj.getTop();
              transformMatrix2 = obj.get('transformMatrix');
          console.log('transformMatrix2[4] text x - ',transformMatrix2[4]); 
          console.log('transformMatrix2[5] text y - ',transformMatrix2[5]); 
          console.log('m_x text x - ',m_x); 
          console.log('m_y text y - ',m_y); 

    obj.setTransformMatrix(transformMatrix1);
        // obj.setTransformMatrix(transformMatrix2);
       //obj.setLeft(transformMatrix2[4]/2);//-(m_x - transformMatrix2[4])/2
       //obj.setTop(transformMatrix2[5]-12.36*(obj.getFontSize()/20));//+m_y*2 
       //obj.setTop(transformMatrix2[5]); 
       //obj.setLeft(transformMatrix2[4]/2);//m_x/2 ÓÍ‡Á˚‚‡ÂÚÒˇ Ó‰ÌÓÏ Ë ÚÓÏ ÊÂ ÏÂÒÚÂ
              obj.setTop(transformMatrix2[5]-parseFloat(tr_y)-parseFloat(str_y)-strokeWidth1*0.58);
              console.log('setLeft - ',transformMatrix2[4] + parseFloat(str_x) - (strokeWidth1/2));  //
       obj.setLeft(transformMatrix2[4] + parseFloat(str_x) - (strokeWidth1/2) );

}
else
  {
      /*  obj.setLeft(transformMatrix2[4]+(m_x)*transformMatrix2[0]);
       obj.setTop(transformMatrix2[5]+(m_y)*transformMatrix2[3]); */
             obj.setLeft(transformMatrix2[4]+(m_x)*transformMatrix2[0]-(strokeWidth1/2)*transformMatrix2[0]);//(m_x-0.5)*transformMatrix2[0]
       obj.setTop(transformMatrix2[5]+(m_y)*transformMatrix2[3]-(strokeWidth1/2)*transformMatrix2[3]); //(m_y-0.5)*transformMatrix2[3]    
}

         
       obj.setScaleX(transformMatrix2[0]);
       obj.setScaleY(transformMatrix2[3]);         
        obj.set('transparentCorners','true');



     //  obj.setLeft(transformMatrix2[4]*transformMatrix2[0]+m_x*transformMatrix2[0]);//+calcTransformMatrix2[4]
     //  obj.setTop(transformMatrix2[5]*transformMatrix2[3]+m_y*transformMatrix2[3]);//calcTransformMatrix2[5]



       obj.setCoords();
       kol = kol + 1;
       console.log('m_x - ',m_x);
       console.log('m_y - ',m_y);
      console.log('transformMatrix2[0] - ',transformMatrix2[0]); 
      console.log('getLeft - ',obj.getLeft()); 
      console.log('getTop - ',obj.getTop()); 
});
console.log('After_load - ',kol);
if (kol === 0)
{
 $.post("After_load", kol); 
}
else
  {
    Is_After_load = true;
//$.post("After_load"+kol, kol); 
}
    }; 

function setBold()
{
   var result1=$('input[name="checkbox_bold"]').prop('checked');
   console.log('result1 - ',result1);
var activeObject = canvas.getActiveObject();
         if (activeObject) {
          if (result1){
       activeObject.set({
        fontWeight  : 'bold'
     });
      }
      else
      {
            activeObject.set({
        fontWeight  : ''
     }); 
      }
}
}; 
function setItalic()
{
   var result1=$('input[name="checkbox_Italic"]').prop('checked');
   console.log('result1 - ',result1);
var activeObject = canvas.getActiveObject();
         if (activeObject) {
          if (result1){
       activeObject.set({
        fontStyle  : 'italic'
     });
      }
      else
      {
            activeObject.set({
        fontStyle  : ''
     }); 
      }
}
}; 

setTimeout(function() {
  console.log('timer - ',Is_After_load);
  if (!Is_After_load){
   After_load(); 

  }
}, 5000);

function delete_obj2()
{
    var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveGroup();
        if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
            canvas.remove(object);
        });
        }
        else if (activeObject)
        {
          canvas.remove(activeObject);
        }
}; 

function New_SVG()
{
CopyClip();
$.post("new.php?"+$("input[name=namenewsvg]").val(), Buff_clipb); 
alert('ÕÓ‚ÓÂ SVG-ËÁÓ·‡ÊÂÌËÂ ·Û‰ÂÚ ‚ ·Ë·ÎËÓÚÂÍÂ ÔÓÒÎÂ Á‡Í˚ÚËˇ/ÓÚÍ˚ÚËˇ ÓÍÌ‡')

}; 