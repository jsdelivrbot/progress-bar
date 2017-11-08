/*Js File*/
//window.onload = function() {
	
// Get API Data
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://pb-api.herokuapp.com/bars/");
	xhr.responseType = 'json';
	var dataApi;	
	xhr.onload = function(e) {
	  if (this.status == 200) {    
		dataApi = this.response;	
		if (dataApi){
			if (dataApi.limit){
				document.getElementById("container").style.width=dataApi.limit+'px';				
			}
			for (var i = 0; i < dataApi.bars.length; i++) {
				createBar(i+1,dataApi.bars[i]);							
			}
			createDD(dataApi.bars.length);
			
			for (var i = 0; i < dataApi.buttons.length; i++) {
				createButton(i+1,dataApi.buttons[i]);		
			}	
		}
	  }
	};
	xhr.send();
//}

// Create Bar

function createBar(ele,data){
	var spn = document.createElement("span");  
	spn.id = 'bar'+ele;
	spn.className = 'bar';
	document.getElementById("container").appendChild(spn);
	
	var spnInner = document.createElement("span");  
	spnInner.id = 'bar'+ele+'-inner';
	spnInner.className = 'inner-bar';
	spn.appendChild(spnInner);
	
	var spnPrgrs = document.createElement("span");  
	spnPrgrs.id = 'bar'+ele+'-progress';
	spnPrgrs.className = 'bar-progress';
	spnPrgrs.style.width=dataApi.limit+'px';	
	spnInner.appendChild(spnPrgrs);
	
	wd= data*1;	
	spnInner.style.width  = wd+'%';	
	spnPrgrs.innerHTML=wd+'%';	
	return true;
}

// Create Bar in Drop Down

function createDD(ttl){
	var li = document.createElement("li");  		
	document.getElementById("menu").appendChild(li);
	
	var sl = document.createElement("select");  
	sl.id = 'select-bar';
	sl.className = 'btn';
	li.appendChild(sl);
	
	for (var i = 1; i < ttl+1; i++) {
		var option = document.createElement("option");
		option.value = 'bar'+[i];
		option.text = 'Progress Bar '+[i];
		sl.appendChild(option);
	}
	return;
}

// Create Button

function createButton(ele,data){
	var li = document.createElement("li");  		
	document.getElementById("menu").appendChild(li);
	
	var spn = document.createElement("span");  
	spn.id = 'btn'+ele;
	spn.className = 'btn';
	li.appendChild(spn);
	spn.innerHTML=data;
	data=parseInt(data*1);
	
	spn.onclick = function (){
		if (data > 0){
			var curBar = getCurBar();
			var wd = document.getElementById(curBar+"-inner").style.width.replace('%','');	
			wd= (wd*1)+(data*1);	
			document.getElementById(curBar+"-inner").style.width  = wd+'%';	
			document.getElementById(curBar+"-progress").innerHTML=wd+'%';	
			if (wd >100){
				document.getElementById(curBar+"-inner").style.background ='red';
			}
		}else if (data < 0){
			var curBar = getCurBar();
			var wd = document.getElementById(curBar+"-inner").style.width.replace('%','');
			wd= (wd*1)-(data*-1);
			if (wd < 0){
				wd = 0;
			}
			document.getElementById(curBar+"-inner").style.width  = wd+'%';
			document.getElementById(curBar+"-progress").innerHTML=wd+'%';	
			if (wd < 101){
				document.getElementById(curBar+"-inner").style.background ='#FF3';
			}
		}
	}
	return;
}				

// Get Current Bar

function getCurBar() {
	return document.getElementById("select-bar").value;
}

