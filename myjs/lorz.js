function ColorListCtrl($scope, $http) {
			$http.get('data/colors_values.json').success(function(data) {
				$scope.colors = data;
				$scope.colors=data.splice(0,8);
				/*JSON type
				 {
				 	"name"
				 	"hex_val"
				 }
				 */
			});
			//$scope.orderOpt = 'name';
}

function PaletteListCtrl($scope, $http) {
			$http.get('data/palettes_values.json').success(function(data) {
				$scope.palettes = data;
				
				/*JSON type
				 {
				 	"name"
				 	"hex_val1"
				 	"hex_val2"
				 	"hex_val3"
				 	"hex_val4"
				 	"hex_val5"
				 }
				 */
			});
			//$scope.orderOpt = 'name';
}

var col_value;
var pal_name;

function getColor(color){
	col_value=$(color).attr("value");
	$('.color_row').css("background-color","white");
	$('.color_row').css("color","black");
	$('.color_row').css("font-weight","normal");
	
	$(color).css("background-color","darkOrange");
	$(color).css("color","white");
	$(color).css("font-weight","bold");
	
	checkforboth();
}


function getPalette(palette){
	pal_name=$(palette).attr("name");
	$('.palette_row').css("background-color","white");
	$('.palette_row').css("color","black");
	$('.palette_row').css("font-weight","normal");
	
	$(palette).css("background-color","darkOrange");
	$(palette).css("color","white");
	$(palette).css("font-weight","bold");
	
	//console.log(col_value);
	//console.log(pal_name);
	
	checkforboth();
}

function pickColor(pick){
	//console.log("pick! ["+pick+"]");
	
	//Reset css color table
	$('.color_row').css("background-color","white");
	$('.color_row').css("color","black");
	$('.color_row').css("font-weight","normal");
	
	col_value=pick;
	checkforboth();
}


function checkforboth(){
	if ( (col_value!=null) && (pal_name!=null))
		findColor(col_value,pal_name);
}

function findColor(color,palette_name){
	var hex_val=[];
	var palette=$("td[name*='"+palette_name+"']");	//td con nome palette
	//console.log(palette);
	var td=palette.next();	
		
	for(var i=0;i<5;i++){
		hex_val.push(td.attr("value"));
		td=td.next();
	}
	
	$('#ans').remove();
	$('#answer').append('<p name="result"> I need to calculate the nearest color to <strong style="color:'+col_value+'">['+col_value+']</strong> among [' +hex_val+']</p>');
	$("p[name='result']").attr("id","ans");
}
