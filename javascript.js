var editPage = "Belgyogy/belgyogyAV.html"
/* 
vagy 'editPage = false'
vagy beírom a címét pl. 'editPage = Gyerekgyogy/gyermek.html'
ha kiakarom venni ezt a funkciót, akkor editPage-re keressek rá a kódban, és azokat töröljem
*/

// Night mode
var bodyBGcolor, abbrBGcolor, QingTetelsBG, QingQuestsBG, QingBg, abbrBorderColor, midQColor, midQSrcColor, midQBGColor, searchBGColor, timerColor, pageLinksColor, selectJegyBGColor, summaryColor, selectJegyColor
if ( localStorage.getItem("nightMode") == "true" ) {
	bodyBGcolor = "rgb(24, 26, 27)"
	abbrBGcolor = "rgb(30, 30, 30)"
	abbrQBGcolor = "brown"
	QingTetelsBG = "rgb(24, 26, 27)"
	QingQuestsBG = "rgb(24, 26, 27)"
	QingBgBG = "grey"
	abbrBorderColor = "2px solid white"
	midQColor = "aqua"
	midQSrcColor = "plum"
	midQBGColor = "rgb(24, 26, 27)"
	searchBGColor = "rgb(24, 26, 27)"
	timerColor = "crimson"
	pageLinksColor = "cornflowerblue" // kis betűvel kell írni különben F_loadAllPages-nél amikor lecheckolja hiba lenne
	selectJegyBGColor = "black"
	topQColor = "gold"
	trueColor = "green"
	falseColor = "brown"
	answerColor = "darkgoldenrod"
	summaryColor = "mediumseagreen" // search resultoknál is kell!
	//summaryColor = "chartreuse" // search resultoknál is kell!
	selectJegyColor = "white"


	var style = document.createElement("style");
	document.head.appendChild(style);
	//style.innerHTML = ".bgYellow { color:black }"
	style.innerHTML = ".bgYellow { background-color:saddlebrown }"
	style.innerHTML = style.innerHTML + ".bgBlue { background-color:blue }"
	style.innerHTML = style.innerHTML + ".bgGreen { background-color:darkgreen }"
	style.innerHTML = style.innerHTML + ".bgPink { background-color:deeppink }"
	style.innerHTML = style.innerHTML + ".WHITE { border: white 1px solid; }"
	//style.innerHTML = style.innerHTML + ".WHITE { background-color:black; border: white 1px solid; }"
	style.innerHTML = style.innerHTML + "abbr { background-color:dimgray }"
	style.innerHTML = style.innerHTML + "th { background-color:darkslategray }"
	style.innerHTML = style.innerHTML + "th,td { border: 3px solid gray; }"
	style.innerHTML = style.innerHTML + "summary { color:"+summaryColor+"}"
	style.innerHTML = style.innerHTML + "details[open] { border-bottom: 3px solid gray; }"

	
	document.body.style.color = "ghostwhite"
	document.getElementById("btn_toggleNightMode").innerHTML = "☀️" // &#9728;
} else {
	bodyBGcolor = "azure"
	abbrBGcolor = "azure"
	abbrQBGcolor = "bisque"
	QingTetelsBG = "azure"
	QingQuestsBG = "azure"
	QingBgBG = "grey"
	abbrBorderColor = "2px solid black"
	midQColor = "blue"
	midQSrcColor = "purple"
	midQBGColor = "white"
	searchBGColor = "white"
	timerColor = "black"
	pageLinksColor = "blue"
	selectJegyBGColor = "#f1f1f1"
	topQColor = "yellow"
	trueColor = "springgreen"
	falseColor = "tomato"
	answerColor = "gold"
	summaryColor = "green" // search resultoknál kell!
	selectJegyColor = "black"
}
function F_toggleNightMode(){
	if ( localStorage.getItem("nightMode") == "true" ) {
		localStorage.removeItem("nightMode")
	} else {
		localStorage.setItem("nightMode",true)
	}
	location.reload();
}

document.body.style.backgroundColor = bodyBGcolor
document.body.style.margin = "2px" // ez valahol nagyobbra van állítva, visszakéne

var ua = navigator.userAgent.toLowerCase()
var isAndroid = ua.indexOf("android") > -1 

if ( isAndroid ) { // ezis egy variáció, font size hejett, de pl. middle img, title problem (bonyolultabb?)
	andrScale = 2.5
	//var divBody = document.body
	var divBody = document.getElementById("div_body")
	divBody.style.transform = 'scale('+andrScale+')'
	divBody.style.transformOrigin = '0 0'
	var width = 100 / andrScale
	var height = 100 / andrScale
	divBody.style.maxWidth = width+'%'
	divBody.style.maxHeight = height+'%'
	
	document.body.appendChild(document.getElementById("div_centVideoBg"))
}

function F_getTime() {
	var myDate = new Date()
	//var time = myDate.getTime() /1000
	//return time
	return myDate.getTime() /1000
}
var lastClickTime = F_getTime()
function F_getImpID(detElem){
	var impID = undefined
	var begin = detElem.className.indexOf("[")
	var end = detElem.className.indexOf("]")
	impID = detElem.className.slice(begin+1,end)
	if ( impID == undefined ) { console.log("# nincs impID-je: "+detElem.className) }
	return impID
}
function F_offsetXY(detElem,num) { // absolute x & y position-t lekéri!
	// azért kell, mert az offsetLeft nem elég, ha table-ban van egy element (akkor nem a body-hoz viszonyatva adja meg, hanem a table-hoz)
	/* alap pozíció lekérés kommandok:
		// var x = event.clientX
			// klikkelés/mouseover-kor az egér fixed x-pozíciója (tehát a képernyőn hol,scrollbartól független)
			// fixed position-re jó
		// var posX = this.offsetLeft 
			// ez a scrollt is beleszámítja --> absolute position-re jó
			// és element pozícióját kéri, de ez részlet kérdés szinte
			// table-ban magában nem jó, azért kell az F_offsetXY funkció
	*/
	
	if ( num == "1" ) {
		var rect = detElem.getBoundingClientRect(),
		scrollLeft = detElem.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	if ( num == "2" ) {
		var _x = 0;
		var _y = 0;
		while( detElem && !isNaN( detElem.offsetLeft ) && !isNaN( detElem.offsetTop ) ) {
			_x += detElem.offsetLeft - detElem.scrollLeft;
			_y += detElem.offsetTop - detElem.scrollTop;
			detElem = detElem.offsetParent;
		 }
		 return { top: _y, left: _x };
	}
	
	/*if(!detElem) detElem = this; // másik módszer, ha a fennti nem lesz jó valamiért  --> ez nem jó scroll-nál

	var x = detElem.offsetLeft;
	var y = detElem.offsetTop;

	while (detElem = detElem.offsetParent) {
		x += detElem.offsetLeft;
		y += detElem.offsetTop;
	}

	return { left: x, top: y };
	*/
}
function F_fixedXY(detElem) { // fixed x & y position-t lekéri!
	var rect = detElem.getBoundingClientRect()
	return { top: rect.top, left: rect.left, bottom: rect.bottom }
}


// –––––––––––––––  impQs BEGIN   –––––––––––––––
var pageImpQs = [] // path to impQs --> tárgyak {expQ}-jait lementi ide is
var pageTexts = [] // path to txt --> tárgyak textjét lementi ide is
var pageLinks = document.getElementsByClassName("page")
var currPath = null // betöltött tárgyé (ami látható is)
var prevDivShown = "" // midQ betöltése előtt mi volt (alap,search,Qing)
var prevScrollTop = 0 // midQ betöltése előtt, hogy állt a scrollbar
var vToggleSearch = false

function isElementVisible(detElem) {
	detElem = detElem.parentElement
	return !detElem.closest('details:not([open])')
}

/*function F_saveImpQs(path) {
	pageImpQs[path] = {}
	if ( document.getElementById("span_ExpQs") == null ) {
		var span = document.createElement("span")
		document.body.appendChild(span)
		span.style.display = "none"
		span.id = "span_ExpQs"
	}
	var span = document.getElementById("span_ExpQs")
	var pageText = pageTexts[path]
	span.innerHTML = pageText
	
	//var childs = span.getElementsByTagName("*");
	var childs = span.querySelectorAll('details[class*="["]');
	for ( var i = 0; i < childs.length; i++ ) {
		var impQ = childs[i]
		//if ( impQ.className.indexOf("[") == -1 ) { continue }
		//if ( impQ.tagName != "DETAILS" ) { continue }
		//if ( impQ.className.indexOf("imp") != -1 ) { continue } // ez már fölös igazából, de nem baj biztos ami biztos
		//if ( impQ.className.indexOf("midQ") != -1 ) { continue } // ez már fölös igazából, de nem baj biztos ami biztos
		var impID = F_getImpID(impQ)
		pageImpQs[path][impID] = '<details class="'+impQ.className+'">'+impQ.innerHTML+'</details>'
	}
}*/
function F_saveImpQs(path) {
	pageImpQs[path] = {};
	var pageText = pageTexts[path];

	// Hozzunk létre egy ideiglenes divet és töltsük be a HTML-t
	var tempDiv = document.createElement("div");
	tempDiv.innerHTML = pageText;

	// Lekérjük a szükséges elemeket
	var childs = tempDiv.querySelectorAll('details[class*="["]');
	for (var i = 0; i < childs.length; i++) {
		var impQ = childs[i];
		var impID = F_getImpID(impQ);
		// Kimentjük az impQ adatait az objektumba
		//pageImpQs[path][impID] = impQ.outerHTML
		pageImpQs[path][impID] = '<details class="'+impQ.className+'">'+impQ.innerHTML+'</details>'
	}
}
function F_getQPath(detElem,impID) {
	var path = currPath
	if ( detElem.dataset.src ) { 
		path = detElem.dataset.src
	} else {
		var parent = detElem
		do {
			parent = parent.parentElement
		} while ( parent.tagName != "BODY" && parent.dataset.src == undefined )
		if ( parent.dataset.src ) { path = parent.dataset.src }
	}
	//console.log(impID+": "+path)
	if ( path != currPath ) {
		var count = 0
		if ( path.indexOf(".html") == -1 ) {
			for ( var i=0; i<pageLinks.length; i++ ) { 
				if ( path == pageLinks[i].dataset.path ) {
					count = count +1
					path = pageLinks[i].dataset.src
				}
			}
			if ( count != 1 ) { console.log("ERROR: ["+impID+"] dataset-path("+count+"): nem található(0) / több page-re utal(1+)") }
		} else {
			for ( var pagePath in pageTexts ) { if ( pagePath.indexOf(path) != -1 ) { 
				count = count +1
				path = pagePath
			} }
			if ( count != 1 ) { console.log("ERROR: ["+impID+"] dataset-src("+count+"): nem található(0) / több page-re utal(1+)") }
		}
	}
	//alert(impID+" "+path)
	return path
}
function F_getQText(path,impID) {
	if ( pageImpQs[path] == undefined ) { F_saveImpQs(path) }
	var qText = pageImpQs[path][impID]
	return qText
}
function F_loadImpQs(detElem,full) {
/* Hogyan?
  'gyakori hibák:' 
		adott tárgy impQ-it nézzem meg, nincsenek-e véletlen az alján üres 1,2,3 impQ-k, mert akkor azok felülírják a fenntieket!
		impQs-nál még {}-van, pedig már [] kell!!
	✔ megnézi a detElem összes imp child-ját
	✔ feltételek: visible, van benne [], még nem volt betöltve
		detElem = amit megnyitottam (details / page)
		visible feltétel nem mindig! -> pl. Qing esetén, az első kiválasztásnál betölti összeset
	✔ ha talált köztük egyet, ami a feltételnek megfelel, akkor újra visszaugrik az elejére és végigmegy rajtuk, de ezt nem fogja már még1x (return) -> azért kell, hogy mindegyiket betöltse, tehát pl. ha van a betöltöttben is egy, azt is (biztos van ennél jobb módszer is, de én ezt választottam)
	✔ path beállítása: ha nincs 'data-source', akkor az aktuális megnyitott tárgy lesz
	✔ parentek között(detElem-ig) nem-e volt már? végtelen loop elkerülése
	✔ más Page-ről származás
		tárgyválasztásnál a tárgy teljes linkjét kell másolnom "data-src"-ba
		ha azon belül is van impQ, akkor azt is abból a tárgyból fogja értelemszerűen (kivéve, ha meg van adva más)
*/
	var repeat = true
	//var startTime = F_getTime()
	//console.log("F_loadImpQs START")
	function F_loadNextImpQ(detElem) {
		var error = ""
		var repeat = false
		var impQs = detElem.getElementsByClassName("imp")
		//console.log("full: "+full)
		//console.clear()
		for ( var i=0; i<impQs.length; i++ ) { 
			//console.log(i)
			var isVisible = isElementVisible(impQs[i])
			//console.log(F_getImpID(impQs[i])+" - "+isVisible)
			if ( isVisible == false && full != "full" ) { continue }
			if ( impQs[i].className.indexOf("[") == -1 ) { continue }
			if ( impQs[i].dataset.loaded == "true" ) { continue } else { impQs[i].dataset.loaded = "true" }
			repeat = true
			
			var impID = F_getImpID(impQs[i])
			//console.log(impID)
			
			// path beállítása
			var path = F_getQPath(impQs[i],impID)
			
			// parentek között volt-e már (loop elkerülése)
			var contains = false
			function F_checkParents() {
				var parent = impQs[i]
				/*do {
					console.log("parentCheck")
					parent = parent.parentElement
					// checkolja, hogy az [impID]-jük megyegyezik-e --> ha nem, akkor nézi a kövi parentet
					if ( parent.className.indexOf("["+impID+"]") == -1 ) { continue } 
					// checkolja hogy a path-jük megegyezik-e --> ha nem, akkor nézi a kövi parentet
					if ( parent.dataset.src == undefined && path == currPath ) { contains = true }
					
					//if ( path.indexOf(parent.dataset.src) != -1 ) { contains = true }
					if ( path == F_getQPath(parent,F_getImpID(parent)) ) { contains = true }
					// ha átakarom írni, változtatás után teszteljem: ..
					//	span/div/midQ + datasrc(akár ugyanez az oldalé) + full load(tehát kiveszem feltételből, hogy csak akkor ha visible)
				} while ( parent != detElem && contains == false ) */
				for (parent = parent.parentElement; parent !== detElem && contains === false; parent = parent.parentElement) {
					//console.log("parentCheck");

					 // Ellenőrzi, hogy az impID megfelelő-e, ha nem, folytatja a következő parenttel
					if (parent.className.indexOf("[" + impID + "]") === -1) { continue }

					 // Ellenőrzi, hogy a path megegyezik-e
					if (parent.dataset.src === undefined && path === currPath) { contains = true }

					if (path === F_getQPath(parent,F_getImpID(parent))) { contains = true }
					/* ha átakarom írni, változtatás után teszteljem: ..
						span/div/midQ + datasrc(akár ugyanez az oldalé) + full load(tehát kiveszem feltételből, hogy csak akkor ha visible)
					*/
				}
			}
			F_checkParents()
			if ( contains == true ) { continue }
			
			// betöltés
			var qText = F_getQText(path,impID)
			if ( qText == undefined ) { // ha hiányozna az [impQ]
				//var string = i+" ["+impID+"] - "+path +" - "+detElem.innerHTML.slice(0,100) +"\n"
				var string = i+" ["+impID+"] - "+path +"\n"
				if ( error.indexOf(string) == -1 ) { error = error + string }
				continue
			}
			if ( impQs[i].tagName == "div" || impQs[i].tagName == "DIV" ) {
				qText = qText.slice(qText.indexOf('</summary>')+10)
				qText = qText.slice(0,qText.lastIndexOf('</details>'))
			}
			impQs[i].innerHTML = qText
		}
		// ha hiányzott valamelyik [impQ]
		if ( error != "" ) { 
			console.log(error)
			alert("hiányzik impQ (lásd console.log)")
		}
		return repeat
	}
	while (repeat === true) { repeat = F_loadNextImpQ(detElem) }
	//var currTime = F_getTime() - startTime
	//console.log("F_loadImpQs END - "+ currTime)
}


function F_removeUlNormal() { // ezzel vettem ki az <ul class="normal"> tagokat
	var pageDiv = document.getElementById("div_pageQTargy")
	
	/*console.clear()
	console.log(pageDiv.innerHTML)
	alert("prevHtml in console")*/
	
	// Find all <ul class="normal"> elements
	var ulElements = pageDiv.querySelectorAll('ul.normal');
	// Iterate through each <ul class="normal"> element
	ulElements.forEach(function(ulElement) {
	  // Get the parent element of the <ul class="normal"> element
	  var parentElement = ulElement.parentElement;

	  // Create a document fragment to hold the child elements
	  var fragment = document.createDocumentFragment();
	  // Move all child elements of <ul class="normal"> to the document fragment
	  while (ulElement.firstChild) {
		 fragment.appendChild(ulElement.firstChild);
	  }
	  // Replace the <ul class="normal"> element with its child elements
	  parentElement.replaceChild(fragment, ulElement);
	});
	
	console.clear()
	console.log(pageDiv.innerHTML)
	alert("postHtml in console")
}


function F_clickAutoLoadPagesBtn(btn) {
	if ( localStorage.getItem("autoLoadPages") == "true" ) {
		localStorage.setItem("autoLoadPages", "false")
		btn.style.backgroundColor = ""
	} else {
		localStorage.setItem("autoLoadPages", "true")
		btn.style.backgroundColor = "green"
	}
	console.log("– F_clickAutoLoadPagesBtn – "+localStorage.getItem("autoLoadPages"))
}
function F_loadAutoLoadPagesBtn() {
	var btn = document.getElementById("btn_toggleLoad")
	if ( localStorage.getItem("autoLoadPages") == "true" ) {
		btn.style.backgroundColor = "green"
	} else {
		btn.style.backgroundColor = ""
	}
}
F_loadAutoLoadPagesBtn()
function F_loadAndSavePageText(path,click,toggle) {
	/* */var startTime = F_getTime()
	/* lefutási variációk:
		a) ha ráklikkeltem -> betölti és vége (click = true, toggle = false)
		b) ha betölti az oldalt és questeltem legutóbb -> betölti és utána toggleQing (click = true, toggle = true)
		c) 3sec-enként csak betölt egyet -> betölti (click = false, toggle = false)
		d) search-reklikk és gyors töltse be mind -> betölti és utána a következőt is amint lehet (click = false, toggle = "all")
	*/
	if ( document.getElementById("iframe_targyak") == null ) {
		var iframe = document.createElement("iframe") // ebbe tölti be a webpage-ket, majd innen másolja ki innerhtml-üket
		document.body.appendChild(iframe)
		iframe.style.display = "none"
		iframe.id = "iframe_targyak"
	}
	function F_loadPage(pageText,id) { // #2 kiírja az aktuális tárgyat -> (a) vagy (b)
		pageLinks[id].style.backgroundColor = "yellow"
		var pageDiv = document.getElementById("div_pageQTargy")
		pageDiv.innerHTML = pageText
		/* */var currTime = F_getTime() - startTime
		/* */console.log("startLoad - "+ currTime)
		F_loadElem(pageDiv)
	  //F_removeUlNormal()          //      ---- EZZEL VETTEM KI: <ul class="normal"> tagokat
		/* */currTime = F_getTime() - startTime
		/* */console.log("endLoad - "+ currTime)
		document.getElementById("div_QingBg").style.display = "none"
		if ( toggle == true ) { document.getElementById("btn_toggleQing").click() }
	}
	
	console.log(path)
	document.getElementById("iframe_targyak").src = path
	//var currTime = F_getTime() - startTime
	//console.log("clickLoad1 - "+ currTime)
	var handler = function(e) { // #1 amikor betölti az oldalt, akkor indul meg ez
		//currTime = F_getTime() - startTime
		//console.log("clickLoad2 - "+ currTime)
		removeEventListener('message', handler, false)
		
		pageImpQs[path] = undefined // azért, hogy újratöltse majd az impQ-kat is
		
		var pageText = e.data[1]
		pageTexts[path] = pageText
		
		var id
		for ( var i=0; i<pageLinks.length; i++ ) { if ( pageLinks[i].dataset.src == path ) { id = i } }
		F_saveIDB(path,pageText,id)
		
		if ( click == true ) {
			document.getElementById("div_QingBg").style.display = "block"
			pageLinks[id].style.backgroundColor = "yellow"
			setTimeout(function() { F_loadPage(pageText,id) }, 100);
		} else if ( toggle == "all" ) { 
			F_loadAllPages()
		}
	}
	window.addEventListener('message', handler, false) /* ez azért indul el, mert a .html fájl végén ott van, hogy:
		<script> window.parent.postMessage(['varA', document.body.innerHTML], '*') </script>
	*/
}
function F_loadPageLinks() { // IDB, setClick
	function F_setPageClick() {
		for ( var i=0; i<pageLinks.length; i++ ) { 
			pageLinks[i].onclick = function() {
				threeSec = 0 // ez azért kéne, hogy auto betöltésnél ne essen szét, hogy egyszerre kettőt akar
				for ( var x=0; x<pageLinks.length; x++ ) { pageLinks[x].style.backgroundColor = "" }
				this.style.backgroundColor = "orange"
				currPath = this.dataset.src
				
				// androidon hátha kell, hogy farmak/anat-ra klikkelésnél a rózsaszín megjelenjen:
				// var srcTest = this.dataset.src // currPath is jó lenne tutti, csak nem emlékszem melyik mi
				// setTimeout(function() { 
					F_loadAndSavePageText(this.dataset.src,true)
				// }, 100);
			}
		}
	}
	F_setPageClick()
	
	function F_checkFinish(count) {
		if ( count == pageLinks.length ) {
			console.log("All pages Loaded!!")
			if ( localStorage.getItem("hk.ToggleAll") != null ) { 
				F_starToggleAll() // átvált toggleQ nézetbe
			} else {
				document.getElementById("div_QingBg").style.display = "none"
			}
		}
	}
	
	var count = 0
	function F_loadIDB(page) {
		var path = page.dataset.src
		var request = indexedDB.open(path, 1);
		request.onerror = function(event) { console.log("database ERROR: " + event.target.errorCode) }
		request.onsuccess = function(event) {
			var db = event.target.result;
			//console.log(path+" – "+db.objectStoreNames.contains('webpage'))
			//console.log(db.objectStoreNames)
			if ( db.objectStoreNames.contains('webpage') != true ) { 
				count = count +1 // ha fekete marad
				F_checkFinish(count)
				//console.log(count+" - black")
				return
			}
			var transaction = db.transaction("webpage","readwrite")
			var store = transaction.objectStore("webpage");  
			store.get(1).onsuccess = function(event) { 
				var text = this.result[0]["pageHTML"]
				//console.log(path+" : "+text)
				if ( this.result.length == 1 ) { // ez azért kell...
					// a time-ot idb-be régen nem mentette el, így amikor leakarom hívni hibát ír ki. ezért akik abban az 1hónapban felmentek weboldalra, azoknál hiba lenne, így kell egy 'frissítés' (későbbiekben is, ha hozzáakarok majd adni egy új változót idb-be a path-hez lehet ez ilyen fog kelleni)
					clearIDB(path,page)
					return
				}
				
				pageTexts[path] = text
				var time = F_getTime() - this.result[1]["pageTIME"]
				//console.log(path+" : "+this.result[1]["pageTIME"])
				if ( time < 604800 ) { // 1 hét
					page.style.color = pageLinksColor
					page.dataset.loaded = true
				} else {
					page.style.color = "red"
				}
				
				count = count +1
				//console.log(count+" + blue/red")
				// console.log(count+" vs "+pageLinks.length)
				F_checkFinish(count)
			}
			transaction.oncomplete = function() { db.close() }
		}
	}
	for ( var i=0; i<pageLinks.length; i++ ) { F_loadIDB(pageLinks[i]) }
}
F_loadPageLinks()

function F_saveIDB(path,pageText,id) {
	//console.log("F_saveIDB - START")
	var currTime = F_getTime()
	var objectData = [ { pageHTML: pageText }, { pageTIME: currTime } ]
	clearIDB(path,pageLinks[id])
	
	var request = indexedDB.open(path, 1);
	request.onupgradeneeded = function (event) {
		var db = event.target.result;
		var store = db.createObjectStore("webpage", { keyPath: "id", autoIncrement: true });
		store.put(objectData)
	}
	request.onerror = function(event) { console.log("database ERROR: " + event.target.errorCode) }
	request.onsuccess = function(event) {
		var db = event.target.result;
		var transaction = db.transaction("webpage","readwrite")
		var store = transaction.objectStore("webpage");  
		//store.get(1).onsuccess = function(event) { console.log("database SAVED – "+path /* this.result */) }
		transaction.oncomplete = function() { db.close() }
		
		pageLinks[id].style.color = pageLinksColor
		//console.log("F_saveIDB - END")
	}
}
function clearIDB(path,page) {
	var request = indexedDB.deleteDatabase(path);
	//request.onsuccess = function(event) { console.log("database DELETE – "+path) }
	if ( pageTexts[path] == undefined ) { 
		page.style.color = ""
	} else {
		page.style.color = "darkviolet"
	}
}
function clearFullIDB() { for ( var i=0; i<pageLinks.length; i++ ) { clearIDB(pageLinks[i].dataset.src,pageLinks[i]) } }
function F_loadAllPages() { 
	loadAllPages = true
	// statusbar beállítása (hogy állunk)
	if ( document.getElementById("span_searchStatusText").dataset.loaded == "nothing" ) {
		var missing = 0
		for ( var i=0; i<pageLinks.length; i++ ) { 
			if ( pageLinks[i].style.color != pageLinksColor && pageLinks[i].style.color != "darkviolet" ) {
				missing = missing +1
			}
		}
		document.getElementById("span_searchStatusText").dataset.missing = missing
		document.getElementById("span_searchStatusText").dataset.loaded = "-1"
	}
	var missing = document.getElementById("span_searchStatusText").dataset.missing
	var loaded = Number(document.getElementById("span_searchStatusText").dataset.loaded) +1
	document.getElementById("span_searchStatusText").dataset.loaded = loaded
	document.getElementById("span_searchStatusText").innerHTML = loaded +" / "+ missing
	var spanStatus = document.getElementById("span_searchStatus")
	spanStatus.parentElement.style.display = "block" 
	var statusWidth = spanStatus.parentElement.offsetWidth * loaded / missing
	spanStatus.style.width = statusWidth+"px"
	
	// maga az oldal betöltése
	for ( var i=0; i<pageLinks.length; i++ ) { 
		if ( pageLinks[i].style.color != pageLinksColor && pageLinks[i].style.color != "darkviolet" ) {
			//console.log(i+" vs "+pageLinks.length)
			//console.log(pageLinks[i].dataset.src)
			document.getElementById("div_searchingBg").style.display = "block"
			
			F_loadAndSavePageText(pageLinks[i].dataset.src,false,"all")
			break
		}
		var last = pageLinks.length -1
		if ( i == last ) {
			// console.log("load finished")
			var spanStatus = document.getElementById("span_searchStatus")
			spanStatus.parentElement.style.display = "none" 
			document.getElementById("div_searchingBg").style.display = "none"
			document.getElementById("span_searchStatusText").dataset.loaded = "nothing"
			F_toggleSearch()
		}
	}
}

var threeSec = 0
var loadAllPages = false
var F_seekBar = window.setInterval(function() {
	threeSec = threeSec +1
	if ( loadAllPages == true ) {
		clearInterval(F_seekBar)
	} else if ( localStorage.getItem("autoLoadPages") == "true" ) {
		//console.log('update - '+threeSec)
		var loadTime = 3
		if ( threeSec > loadTime ) {
			for ( var i=0; i<pageLinks.length; i++ ) { 
				if ( pageLinks[i].style.color != pageLinksColor ) {
					F_loadAndSavePageText(pageLinks[i].dataset.src,false,false)
					break
				}
			}
			threeSec = 0
		}
	}
}, 1000);
// –––––––––––––––  impQs END   –––––––––––––––

// –––––––––––––––  midQs BEGIN   –––––––––––––––
var prevMidQs = []
function F_createMidQElems() { // lekreálja középre a divet, ahova kidobja majd a midQ/searchQ-kat
	function F_divMidQ() { // mainDiv: ebbe lesz minden, sárga bordere van ...
		var div = document.createElement("div")
		div.id = "div_MidQ"
		document.getElementById("div_body").appendChild(div)
		div.dataset.origin = "pageQs"
		div.style.backgroundColor = midQBGColor
		div.style.overflow = "auto"
		div.style.border = "8px solid black"
		div.style.outline = "5px solid yellow"
		div.style.display = "none"
		div.style.position = "absolute"
		div.style.left = "5px"
		div.style.right = "5px"
		div.style.top = "4px"
		div.style.bottom = "4px"
		div.style.opacity = "1"
		div.style.zIndex = "3"
		div.style.flexDirection = "column"
	}
	F_divMidQ()
	function F_divUpperPart() { // ez a felső fele, tehát ez van benne: 'vissza' ... 'close (Q title)'
		var div = document.createElement("div")
		div.id = "div_midQUpperPart"
		document.getElementById("div_MidQ").appendChild(div)
		
		div.style.display = "flex"
		div.style.justifyContent = "space-between"
		div.style.textAlign = "center"
		div.style.alignItems = "flex-start"
	}
	F_divUpperPart()
	function F_divLowerPart() { // ez az alsó fele, itt a szöveg
		var div = document.createElement("div")
		div.id = "div_midQLowerPart"
		document.getElementById("div_MidQ").appendChild(div)
		div.style.height = "100%"
	}
	F_divLowerPart()
	function F_btnBack() { // bal felső sarokban a 'vissza'
		var span = document.createElement("span")
		span.id = "btn_MidQback"
		document.getElementById("div_midQUpperPart").appendChild(span)
		
		span.style.backgroundColor = "Gainsboro"
		span.style.fontWeight = "bold"
		span.style.border = "3px solid black"
		span.style.cursor = "pointer";
		//span.innerHTML = "🡨" // androidon nem jó még :(
		span.innerHTML = "➜"
		span.style.transform = "scale(-1,1)"
		span.style.fontSize = "large"
		span.style.width = "30px"
		
		span.onclick = function(){ 
			prevMidQs.pop() // uccsót (ami a jelenlegi letörli)
			var text = prevMidQs[prevMidQs.length-1] // uccsót (ami így már az előző lett) betölti
			var impID,path,qText
			if ( text.indexOf("search: ") == false ) {
				impID = text.slice(text.indexOf("search: ")+8,text.indexOf("-")-1)
				path = text.slice(text.indexOf("-")+2)
				qText = objSearchTexts[impID]
			} else {
				impID = text.slice(0,text.indexOf("-")-1)
				path = text.slice(text.indexOf("-")+2)
				qText = F_getQText(path,impID)
			}
			F_setMidQ(qText,path)
			//F_midQload(prevMidQs[prevMidQs.length-1]) 
		}
	}
	F_btnBack()
	function F_btnTitle() { // középen fenn a 'close (Q title)'
		var span = document.createElement("span")
		span.id = "btn_MidQ"
		document.getElementById("div_midQUpperPart").appendChild(span)
		
		span.style.display = "inline-block" // border egy nagy téglalap ha többsoros, nem külön soronként 1-1
		
		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingBottom = "3px"
		span.style.paddingTop = "3px"
		
		span.style.border = "3px solid black"
		span.style.fontSize  = "large"
		span.style.backgroundColor = "red"
		span.style.color = "white"
		span.style.cursor = "pointer"
		
		span.onclick = function(){ 
			prevMidQs = []
			document.getElementById("div_MidQ").style.display = "none" 
			if ( prevDivShown == "div_pageQTargy" ) {
				document.getElementById("div_pageQTargy").style.display = "block"
				document.getElementById("table_weboldalak").parentElement.parentElement.style.display = "block"
				document.getElementById("btn_toggleQing").style.display = "block"
				document.body.parentElement.scrollTop = prevScrollTop
			} else if ( prevDivShown == "div_searchBg" ) {
				document.getElementById("div_searchBg").style.display = "block"
			} else if ( prevDivShown == "div_QingMain" ) {
				document.getElementById("div_QingMain").style.display = "block"
				document.getElementById("btn_toggleQing").style.display = "block"
				document.body.parentElement.scrollTop = prevScrollTop
			}
		}
		
		var span = document.createElement("span") // üres elem jobb oldalt, csakhogy középen legyen a title!
		document.getElementById("div_midQUpperPart").appendChild(span)
	}
	F_btnTitle()
	function F_btnPath() { // jobb felső sarokban a 'tárgy'
		var span = document.createElement("span")
		span.id = "btn_MidQPath"
		document.getElementById("div_midQUpperPart").appendChild(span)
		//span.style.fontWeight = "bold"
		if ( localStorage.getItem("nightMode") == "true" ) {
			span.style.backgroundColor = "black"
			span.style.border = "3px solid Gainsboro"
		} else {
			span.style.backgroundColor = "Gainsboro"
			span.style.border = "3px solid black"
		}
		span.style.cursor = "pointer";
		span.style.position = "absolute"
		span.style.right = "0px"
		span.style.top = "2px"

		var input = document.createElement("input")
		input.id = "input_MidQPath"
		document.getElementById("div_midQUpperPart").appendChild(input)
		input.style.display = "none"
		
		span.onclick = function(){ 
			// Get the text field
			var copyText = document.getElementById("input_MidQPath")

			// Select the text field
			copyText.select();
			copyText.setSelectionRange(0, 99999); // For mobile devices

			// Copy the text inside the text field
			navigator.clipboard.writeText(copyText.value)
			
			alert("path on clipboard: " + copyText.value)
		}
	}
	F_btnPath()
	function F_divText() { // Q szövege ide jön
		var divText = document.createElement("div")
		document.getElementById("div_midQLowerPart").appendChild(divText)
		divText.id = "div_MidQText"
		divText.style.paddingBottom = "10px"
	}
	F_divText()
}
F_createMidQElems()
function F_setMidQ(qText,path) { // középen megjeleníti a div-et, benne a szöveggel
	if ( document.getElementById("div_MidQ").style.display == "none" ) {
		// ez előbb kell legyen, minthogy megjelenne a div_MidQ --> 
			// egyrészt megnézze mi volt előtte (search, tárgy, Qing)
			// elmentse, hogy hol voltam az oldalon(mondjuk a közepe tájékán), hogy miután bezárom oda scrolloljon vissza(ne a tetejére ugorjon!)
		if ( document.getElementById("div_pageQTargy").style.display == "block" ) { 
			prevDivShown = "div_pageQTargy"
			prevScrollTop = document.body.parentElement.scrollTop
		} else if ( document.getElementById("div_searchBg").style.display == "block" ) { 
			prevDivShown = "div_searchBg"
		} else if ( document.getElementById("div_QingMain").style.display == "block" ) {
			prevDivShown = "div_QingMain" 
			prevScrollTop = document.body.parentElement.scrollTop
		}
	}
	
	document.getElementById("div_MidQ").style.display = "block" // ez előbb kell legyen, mint az F_loadElem --> hogy láthatók legyenek az impQ-k, amiket be kell töltenie
	document.getElementById("div_pageQTargy").style.display = "none"
	document.getElementById("div_searchBg").style.display = "none"
	document.getElementById("table_weboldalak").parentElement.parentElement.style.display = "none"
	document.getElementById("btn_toggleQing").style.display = "none"
	document.getElementById("div_QingMain").style.display = "none"
	
	//console.log(prevMidQs)
	qText = qText.slice(qText.indexOf("<summary"),qText.lastIndexOf("</details"))
	var qTitle = qText.slice(qText.indexOf(">")+1,qText.indexOf("</summary"))
	document.getElementById("btn_MidQ").innerHTML = qTitle
	
	qText = qText.slice(qText.indexOf("</summary"))
	qText = qText.slice(qText.indexOf(">")+1)
	document.getElementById("div_MidQText").innerHTML = qText
	
	document.getElementById("div_MidQText").dataset.src = path // kell, h a benne lévő impQ-k path-jét lekérhesse: F_getQPath()
	F_loadElem(document.getElementById("div_MidQText"))
	
	document.getElementById("btn_MidQPath").innerHTML = path.slice(path.lastIndexOf("/")+1)
	document.getElementById("input_MidQPath").value = path
	
	if ( prevMidQs.length > 1 ) {
		document.getElementById("btn_MidQback").style.visibility = "visible" 
	} else {
		document.getElementById("btn_MidQback").style.visibility = "hidden"
	}
}
function F_loadMidQs(detElem) { // midQ[x] elemeket beállítja: kék fontColor, rájuk click-elve mi történjen
	var midQs = detElem.getElementsByClassName("midQ")
	for ( var x=0; x<midQs.length; x++ ) {
		var midQ = midQs[x]
		//console.log(midQ.innerHTML)
		if ( midQ.dataset.src ) { 
			midQ.style.color = midQSrcColor
		} else {
			midQ.style.color = midQColor
		}
		midQ.style.textShadow = "0 0 1px yellow, 0 0 1px black"
		midQ.style.cursor = "pointer"
		midQ.onmouseover = function() { this.style.color = "green" }
		midQ.onmouseout = function() {
			if ( this.dataset.src ) { 
				this.style.color = midQSrcColor
			} else {
				this.style.color = midQColor
			}
		}
		midQ.onclick = function() { F_clickWord(this) }
	}
}
// –––––––––––––––  midQs END   –––––––––––––––

// –––––––––––––––  title(abbr) BEGIN   –––––––––––––––
function F_tooltipFuncs(){
	var span = document.createElement("span")
	span.id = "span_abbrTitle"
	document.getElementById("div_body").appendChild(span)
	//document.body.appendChild(span)
	span.style.display = "none"
	span.style.border = abbrBorderColor
	span.style.backgroundColor = abbrBGcolor
	span.style.position = "absolute"
	span.style.maxWidth = "300px"
	span.style.padding = "2px 2px 2px 5px"
	span.style.zIndex = "4"
	span.onclick = function() { event.stopPropagation() /* ne tűnjön el, mert a document.body-ra is klikkelek közben! */ }
}
F_tooltipFuncs()
function F_titleVerChange(velement){
	function F_posTitle(detElem,mouseX) {
		var span = document.getElementById("span_abbrTitle")
		// title
		span.style.display = "block"
		if ( detElem.title != '' ) {
			detElem.dataset.title = detElem.title
			detElem.title = '' // ezzel akadályozom meg, hogy az eredeti ne jelenjen meg
		}
		span.innerHTML = detElem.dataset.title
		
		// Y pozíció
		var posY = F_offsetXY(detElem,"1").top
		posY = posY + detElem.offsetHeight +2
		if ( isAndroid ) { posY = posY / andrScale }
		span.style.top = posY +"px"
		  // ide kéne valami, hogy ha uccsó sorban van (midQ) a title, akkor ha nem fér ki, akkor felfele tolja.. (mint X-nél)
		
		// X pozíció
		var posX = F_offsetXY(detElem,"1").left
		if ( span.offsetWidth > document.body.offsetWidth - posX -10 ) {
			posX = document.body.offsetWidth - span.offsetWidth - 10
		} else {
			posX = mouseX
		}
		if ( isAndroid ) { posX = posX / andrScale }
		span.style.left = posX +"px"
	}
	var span = document.getElementById("span_abbrTitle")
	velement.onclick = function(event) {
		F_posTitle(this,event.clientX)
		span.dataset.status = 1 // ne tűnjön el, ha egeret lehúzom
		event.stopPropagation() // ne tűnjön el, mert a document.body-ra is klikkelek közben (azonban így csak az első klikk számít: lásd w3school)
	}
	velement.onmouseover = function(event) { F_posTitle(this,event.clientX) }
	velement.onmouseout = function() { if ( span.dataset.status != 1 ) { span.style.display = "none" } }
}
function F_titleChange(detElem){
	var abbrok = detElem.querySelectorAll("*[title]");
	for ( var i = 0; i < abbrok.length; i++ ) { F_titleVerChange(abbrok[i]) }
}
// –––––––––––––––  title(abbr) END   –––––––––––––––

// –––––––––––––––  videos BEGIN  –––––––––––––––
/* how to - tutorial
	mute: <video muted data-src...
	max-width: alapból 60%; <video data-width="30%" data-src
*/
function F_clickSeekBar(seekBarDiv,e){
	var parentDiv = seekBarDiv.parentElement
	var videoElems = parentDiv.getElementsByTagName("video")
	var thisVideo = videoElems[0]
	x = e.pageX - thisVideo.offsetLeft
	clickedValue = x * thisVideo.max / thisVideo.offsetWidth
	var percent = x / thisVideo.offsetWidth
	var currTime = percent * thisVideo.duration
	currTime = Math.floor(currTime)
	thisVideo.currentTime = currTime
	F_stopVideo(thisVideo)
}
function F_setSeekBarWidth(thisVideo){
	var parentDiv = thisVideo.parentElement
	var seekBars = parentDiv.getElementsByTagName("span")
	var seekBarSpan = seekBars[0]
	//var seekBarSpan = document.getElementById("centVideoBar")
	seekBarSpan.style.width = thisVideo.offsetWidth *thisVideo.currentTime /thisVideo.duration +"px"
	seekBarSpan.style.left = thisVideo.offsetLeft
}
function F_stopVideo(thisVideo){
	if ( thisVideo.id != "video_cent" ) { thisVideo.id = "" }
	thisVideo.parentElement.style.borderColor = "black"
	//thisVideo.style.borderColor = "black"
	//thisVideo.parentElement.style.backgroundColor = "black"
	thisVideo.pause()
	F_setSeekBarWidth(thisVideo)
}
function F_playVideo(thisVideo){
	if ( document.getElementById("playedVideo") ) { F_stopVideo(document.getElementById("playedVideo")) }
	if ( thisVideo.id != "video_cent" ) { thisVideo.id = "playedVideo" }
	thisVideo.parentElement.style.borderColor = "springgreen"
	//thisVideo.style.borderColor = "springgreen"
	//thisVideo.parentElement.style.backgroundColor = "springgreen"
	thisVideo.play()
	var F_seekBar = window.setInterval(function(){
		F_setSeekBarWidth(thisVideo)
		if ( thisVideo.id != "playedVideo" && thisVideo.id != "video_cent" ) { clearInterval(F_seekBar) }
	}, 1000)
}
function F_setVideoSource(videoElem,srcTxt){
	srcTxt = srcTxt.slice(srcTxt.lastIndexOf("/")+1) // a régi jegyzetekben még benne van, hogy 'videos/', ezért kell
	videoElem.setAttribute('src', "videos/"+srcTxt)
	videoElem.onerror = function(){
		console.log("'"+srcTxt+"' video is missing!") 
		alert("'"+srcTxt+"' video is missing! --> console.log: line number") 
	}
}

function F_loadVideos(detElem){
	var allVideo = detElem.getElementsByTagName("video")
	for ( var i=0; i<allVideo.length; i++ ) {
		var videoElem = allVideo[i]
		if ( isElementVisible(videoElem) == false ) { continue }
		if ( videoElem.dataset.src == undefined ) { continue } 
		
		function F_setSource(videoElem){
			//var source = document.createElement('source')
			F_setVideoSource(videoElem,videoElem.dataset.src)
			videoElem.removeAttribute("data-src")
			//videoElem.appendChild(source)
		}
		F_setSource(videoElem)
		
		videoElem.style.borderColor = "black"
		videoElem.style.cursor = "pointer"
		videoElem.style.maxWidth = "100%"
		//videoElem.style.maxWidth = "calc(100% - 10px)" // bordert kivonja belőle
		
		videoElem.onloadeddata = function() { // meg kell várja, különben seekBar mérete nem jó
			var videoElem = this
			function F_createSeekBar(){ 
				var parentDiv = document.createElement("div") // border, ebbe van a video + szürke + sárga
				var parent = videoElem.parentNode
				parent.insertBefore(parentDiv,videoElem)
				parentDiv.appendChild(videoElem)
				parentDiv.style.maxWidth = "60%"
				parentDiv.style.float = "right"
				parentDiv.style.backgroundColor = "black"
				parentDiv.style.padding = "6px"; 
				parentDiv.style.border = "6px solid black"
				
				var seekBarDiv = document.createElement("div") // szürke háttér
				seekBarDiv.className = "seekBar"
				parentDiv.appendChild(seekBarDiv)
				seekBarDiv.style.width = videoElem.offsetWidth
				seekBarDiv.style.opacity = "1"; 
				seekBarDiv.style.backgroundColor = "grey"; 
				seekBarDiv.style.height = "21px"; 
				seekBarDiv.onclick = function(e){ F_clickSeekBar(this,e) }
				
				var seekBarSpan = document.createElement("span") // sárga, hogy hol tart
				seekBarSpan.className = "seekBar"
				seekBarDiv.appendChild(seekBarSpan)
				seekBarSpan.style.backgroundColor = "gold"; 
				seekBarSpan.style.height = "21px"; 
				seekBarSpan.style.position = "absolute"; 
			}
			F_createSeekBar()
		}
		videoElem.onclick = function(){
			var videoElem = this
			if ( videoElem.paused == false ) {
				F_stopVideo(videoElem)
			} else {
				F_playVideo(videoElem)
			}
		}
	}

	var allVideoCent = detElem.getElementsByClassName("video")
	for ( var i=0; i<allVideoCent.length; i++ ) {
		allVideoCent[i].onclick = function() {
			document.getElementById("div_centVideoBg").style.visibility = 'visible'
			var centVideo = document.getElementById("video_cent")
			F_setVideoSource(centVideo,this.dataset.src)
			F_playVideo(centVideo)
		}
	}
}
function F_loadCentVideo(){
	var keepVideo
	var centVideo = document.getElementById("video_cent")
	centVideo.onclick = function(){
		var thisVideo = this
		if ( thisVideo.paused == false ) {
			F_stopVideo(thisVideo)
		} else {
			F_playVideo(thisVideo)
		}
		keepVideo = true
	}

	var centVideoSeek = document.getElementById("div_centVideoSeek")
	centVideoSeek.onclick = function(e){
		var rect = e.target.getBoundingClientRect()
		//var testX = e.clientX - centVideoSeek.left
		//var testX = rect.left
		var x = e.pageX - rect.left
		var percent = x / this.offsetWidth
		//alert(e.pageX+" - "+rect.left+" = "+x)
		//alert(x+" "+this.offsetWidth+" "+percent)
		var currTime = percent * centVideo.duration
		currTime = Math.floor(currTime);
		centVideo.currentTime = currTime
		F_stopVideo(centVideo)
		
		keepVideo = true
	}
	
	var centVideoBG = document.getElementById("div_centVideoBg")
	centVideoBG.onclick = function(){
		if ( keepVideo != true ) { 
			this.style.visibility = 'hidden'
			F_stopVideo(centVideo)
		}
		keepVideo = false
	}
}
F_loadCentVideo()
// –––––––––––––––  videos END  –––––––––––––––

// –––––––––––––––  search BEGIN  –––––––––––––––
var breakSearch = false
var objSearchTexts = {} // Qname to Qtxt (ráklikk a resultra, dobja ki a szöveget)
function F_toggleSearch() {
	if ( vToggleSearch == true ) {
		document.getElementById("div_pageQTargy").style.display = "none"
		document.getElementById("table_weboldalak").parentElement.parentElement.style.display = "none"
		document.getElementById("btn_toggleQing").style.display = "none"
		document.getElementById("btn_toggleSearch").style.display = 'none'
		// első kettő azért kell, hogy a fölös scrollbar eltűnjön bal oldalt (pl. megvan nyitva farmakológia, majd ráklikkelnék nagyítóra...)
		document.getElementById("div_searchBg").style.display = "block"
		document.getElementById("btn_toggleSearch").style.color = ""
		document.getElementById("btn_toggleSearch").style.backgroundColor = ""
		vToggleSearch = false
	}
}
function F_searchStart() { // search-re klikkelésnél vagy enter lenyomásnál ez történik először
	document.getElementById("btn_searchBreak").style.display = "block"
	document.getElementById("div_searchingBg").style.display = "block"
	if ( document.getElementById("btn_SearchW") ) {
		document.getElementById("btn_SearchW").style.backgroundColor = "black"
		document.getElementById("btn_SearchW").style.color = "white"
	}
	setTimeout(function() { F_searchResult() }, 100)
}
function F_searchResult() { // találati eredmények betöltése...
	/* method
		+ adott oldal szövegét stringbe teszi -> targyText
		+ ebbe megnézi, hol van először a keresett szó -> utána megkeresi az előtte lévő details-t, ami parentje + a végét -> azt elmenti egy array/object-be
		+ utána következőt találatnál ugyanez
		+ de! ha annál is ugyanaz a details lenne a parent, akkor azt nem menti el fölösen még1x
	*/
	var paths = Object.keys(pageTexts)
	var searchText = document.getElementById("input_SearchW").value
	searchText = searchText.toLowerCase() // kis és nagybetű ellen gondolom
	document.getElementById("div_searchResults").innerHTML = ""
	var fullText = ""
	var hianyzik = ""
	
	var spanStatus = document.getElementById("span_searchStatus")
	spanStatus.parentElement.style.display = "block" 
	//spanStatus.parentElement.style.top = "60px"
	
	var x = 0
	var summaryID = 0
	var progress = false
	var int_Click = window.setInterval(function(){
		if (progress == true) { return } 
		progress = true
		var statusWidth = spanStatus.parentElement.offsetWidth * x / paths.length
		spanStatus.style.width = statusWidth+"px"
		//console.log(spanStatus.parentElement.offsetWidth)
		//console.log(x / paths.length)
		//console.log(spanStatus.parentElement.offsetWidth * x / paths.length)
		
		var path = paths[x]
		x = x +1
		if ( Number(x) == Number(paths.length) || breakSearch == true ) { // ha a végére ért / megszakítom
			clearInterval(int_Click)
			breakSearch = false
			spanStatus.parentElement.style.display = "none" 
			spanStatus.style.width = 0
			document.getElementById("btn_searchBreak").style.display = "none"
			document.getElementById("div_searchingBg").style.display = "none"
			if ( document.getElementById("btn_SearchW") ) {
				document.getElementById("btn_SearchW").style.color = ""
				document.getElementById("btn_SearchW").style.backgroundColor = ""
			}
		}
		var targyText = pageTexts[path]
		if ( targyText == null ) { 
			hianyzik = hianyzik +path.slice(path.lastIndexOf("/"))+" "
			progress = false
			return
		}
		if ( targyText.toLowerCase().indexOf(searchText) == -1 ) {
			progress = false
			return
		}
		fullText = fullText+ "<strong>"+path+"</strong>"

		var locST = 0 // keresett szó heje a targytext-ben; végén mindig növelem +1el, hogy a következőre keressen utána
		var detaLocs = "" // amikor ráklikkelek a kidobott találatra akkor betölt egy detailst; ebben a string-ben azoknak a location-je van felsorolva a targytext-ben; azért kell, hogy 2x ugyanazt ne tegye ki (hiába van 1detan belül 2x a keresett szó) -> ezzel tudom ellenőrizni, hogy volt-e már
		do {
			locST = targyText.toLowerCase().indexOf(searchText,locST+1)
			var prevText, postText, positive, index
			function F_searchPrevText(){
				positive = false
				prevText = targyText.slice(0 , locST)
				var string
				do {
					// megkeresi a parent details-ét (lehet közben 'testvér' is, amit kiszűr!)
					index = prevText.lastIndexOf("<details")
					string = prevText.slice(prevText.lastIndexOf("<details"))
					prevText = prevText.slice(0 , prevText.lastIndexOf("<details"))
					if ( string.indexOf("</details") == -1 ) { positive = true }
				} while ( prevText.indexOf("<details") != -1 && positive != true )
				// előbbi feltétel csak azért kell, különben végtelen loop lenne
				if ( positive == true ) { prevText = targyText.slice(index , locST) }
			}
			F_searchPrevText()
			if ( detaLocs.indexOf(index+", ") != -1 ) { continue } // ha már volt az a details, akkor ne dobja ki még1x (hiába van 2x benne a keresett szó)
			detaLocs = detaLocs + index + ", "
			function F_searchPostText(){
				positive = false
				postText = targyText.slice(locST)
				var string
				index = 0
				do {
					index = index + postText.indexOf("</details") +10
					string = postText.slice(0 , postText.indexOf("</details"))
					postText = postText.slice(postText.indexOf("</details")+10)
					if ( string.indexOf("<details") == -1 ) { positive = true }
				} while ( postText.indexOf("</details") != -1 && positive != true )
				if ( positive = true ) { postText = targyText.slice(locST , locST +index) }
			}
			if ( positive == true ) { F_searchPostText() }
			
			if ( positive == false ) { continue }
			var resultText = prevText + postText
			/*console.clear()
			console.log(detaLocs)
			console.log(prevText)
			console.log(postText)
			alert(searchText)*/
			
			var summaryText = resultText.slice(resultText.indexOf("summary")+2)
			summaryText = summaryText.slice(summaryText.indexOf(">")+1)
			summaryText = summaryText.slice(0,summaryText.indexOf("</summary"))
			summaryID = summaryID +1
			objSearchTexts[summaryID] = resultText
			
			fullText = fullText+ "<li><span data-id='"+summaryID+"' data-path='"+path+"' style='color:"+summaryColor+"; cursor:pointer' onclick='F_clickSearchResult(this)'>"+summaryText+"</span></li>"
			//targyText = targyText.slice(targyText.indexOf(resultText)+resultText.length)
		} while ( targyText.toLowerCase().indexOf(searchText,locST+1) != -1 )
		document.getElementById("div_searchResults").innerHTML = fullText
		
		//console.log(x+" "+progress+" "+path)
		progress = false
	}, 10);
	if ( hianyzik != "" ) { console.log("HIÁNYZIK:"+hianyzik) }
}
function F_clickSearchResult(detElem) { // egy találati eredményre klikk
	detElem.style.backgroundColor  = "yellow"
	setTimeout(function() { 
		var qTxt = objSearchTexts[detElem.dataset.id]
		var path = detElem.dataset.path
		prevMidQs.push("search: "+detElem.dataset.id+" - "+path)
		F_setMidQ(qTxt,path)
		
		detElem.style.backgroundColor = ""
	}, 100)
}
function F_createSearchElems() {
	function F_btnNagyito() { // 🔍
		var button = document.createElement("input")
		button.type = "button"
		button.id = "btn_toggleSearch"
		document.getElementById("table_weboldalak").parentElement.parentElement.appendChild(button)
		document.getElementById("table_weboldalak").parentElement.parentElement.style.position = "relative"
		button.style.position = "absolute"
		button.style.right = "2px"
		button.style.bottom = "2px" // parent position-jént relative-ra kellett állítani, illetve ezt absolute-ra, hogy működjön!!
		button.style.maxWidth = "90px"
		button.style.maxHeight = "90px"
		button.value = "🔍"
		button.style.cursor = "pointer"

		button.onclick = function() { 
			this.style.backgroundColor  = "black"
			this.style.color  = "white"
			setTimeout(function() { 
				vToggleSearch = true
				if ( loadAllPages == false ) { 
					F_loadAllPages() 
				} else {
					F_toggleSearch()
				}
			}, 100)
		}
	}
	F_btnNagyito()
	function F_divBg() { // ezt nyitom meg, ez a mainDiv --> ebbe az összes többi
		var div = document.createElement("div")
		document.getElementById("div_body").appendChild(div)
		//document.body.appendChild(div)
		div.id = "div_searchBg"
		div.style.backgroundColor = searchBGColor
		div.style.overflow = "auto"
		div.style.border = "8px solid black"
		div.style.outline = "5px solid aqua"
		div.style.display = "none"
		div.style.position = "absolute"
		div.style.left = "5px"
		div.style.right = "5px"
		div.style.top = "4px"
		div.style.bottom = "4px"
		//div.style.zIndex = "3"
		div.style.flexDirection = "column"
	}
	F_divBg()
	function F_divUpperPart() { // ez a felső fele, tehát ezek vannak benne: search .... 'keresendő szöveg' ... X
		var div = document.createElement("div")
		div.id = "div_searchUpperPart"
		document.getElementById("div_searchBg").appendChild(div)
		div.style.display = "flex"
		//div.style.backgroundColor = "yellow"
	}
	F_divUpperPart()
	function F_divLowerPart() { // ez az alsó fele, itt a találati eredmények stb
		var div = document.createElement("div")
		div.id = "div_searchLowerPart"
		document.getElementById("div_searchBg").appendChild(div)
		//div.style.backgroundColor = "grey"
		div.style.height = "100%"
		//div.style.border = "2px solid black"
	}
	F_divLowerPart()
	function F_btnSearch() { // bal felső sarokban SEARCH -> erre klikkelve megkezdi a keresést
		var button = document.createElement("button")
		button.id = "btn_SearchW"
		//divBg.appendChild(button)
		document.getElementById("div_searchUpperPart").appendChild(button)
		button.style.fontSize = "xx-large"
		button.innerHTML = "search"
		//button.style.position = "relative"
		//button.style.top = "1%"
		button.style.cursor = "pointer"
		button.onclick = function(){ F_searchStart() }
	}
	if ( isAndroid == false ) { F_btnSearch() }
	function F_inpText() { // ebbe írom a keresett szót -> entert lenyomva megkezdi a keresést
		var input = document.createElement("input")
		document.getElementById("div_searchUpperPart").appendChild(input)
		input.type = "text"
		input.id = "input_SearchW"
		input.style.fontSize = "xx-large"
		//input.style.position = "absolute"
		//input.style.top = "1%"
		if ( isAndroid ) {
			input.style.width = "100%"
		} else {
			input.style.position = "absolute"
			//input.style.width = "50%"
			//input.style.align = "center"
			input.style.left = "50%"
			input.style.paddingLeft = "3px"
			input.style.paddingRight = "3px"
			input.style.transform = "translate(-50%)"
		}
		input.addEventListener("keyup", function(event) { if (event.keyCode === 13) { 
			// entert ha lenyomom search!
			F_searchStart()
		} })
	}
	F_inpText()
	function F_btnClose() { // ✖
		var button = document.createElement("input")
		button.type = "button"
		document.getElementById("div_searchUpperPart").appendChild(button)
		button.style.position = "absolute"
		button.style.right = "0px"
		//button.style.top = "2px"
		button.value = "✖"
		button.style.fontSize = 'xx-large'
		button.style.cursor = "pointer"
		button.style.color = "white"
		button.style.backgroundColor = "red"
		button.style.border = "3px solid black"
		if ( isAndroid ) { button.style.width = "50px" }
		button.onclick = function(){
			document.getElementById("div_pageQTargy").style.display = "block"
			document.getElementById("table_weboldalak").parentElement.parentElement.style.display = "block"
			document.getElementById("btn_toggleQing").style.display = "block"
			document.getElementById("btn_toggleSearch").style.display = 'block'
			document.getElementById("div_searchBg").style.display = "none"
		}
	}
	F_btnClose()
	function F_divResults() { // ebbe írja a találati eredmény(eke)t
		var divText = document.createElement("div") 
		document.getElementById("div_searchLowerPart").appendChild(divText)
		divText.id = "div_searchResults"
		divText.style.marginLeft = "3px"
		divText.style.paddingBottom = "10px"
		if ( isAndroid ) { divText.style.paddingTop = "15px" } else { divText.style.paddingTop = "10px" }
		divText.style.fontSize = "x-large"
	}
	F_divResults()
	function F_divSearchingBg() { // search alatt elszürkül (+a cancel btn ezen lesz)
		var div = document.createElement("div")
		div.id = "div_searchingBg"
		document.body.appendChild(div)
		div.style.backgroundColor = "black"
		div.style.opacity = "0.35"
		div.style.overflow = "auto"
		div.style.display = "none"
		div.style.position = "fixed"
		div.style.left = "5px"
		div.style.right = "5px"
		div.style.top = "4px"
		div.style.bottom = "4px"
		div.style.zIndex = "1"
	}
	F_divSearchingBg()
	function F_btnBreak() { // ha ojan szóra keresnék, ami túl sok találat 
		var button = document.createElement("button")
		button.id = "btn_searchBreak"
		document.body.appendChild(button)
		button.innerHTML = "cancel"
		
		button.style.fontSize = "xx-large"
		button.style.color = "white"
		button.style.backgroundColor = "red"
		button.style.border = "3px solid black"
		button.style.cursor = "pointer"
		
		button.style.zIndex = "2"
		button.style.display = "none"
		button.style.position = "fixed"
		button.style.top = "30%"
		button.style.left = "50%"
		button.style.transform = "translate(-50%)"
		button.onclick = function() { breakSearch = true }
	}
	F_btnBreak()
	function F_spanStatus() { // statusbar, hogy a search hol tart
		// szürke háttér & fehér border fojton látszik
		var spanStatus = document.createElement("div")
		document.body.appendChild(spanStatus)
		spanStatus.id = "div_searchStatus"
		spanStatus.style.display = "none"
		spanStatus.style.position = "absolute"
		spanStatus.style.backgroundColor = "grey"
		spanStatus.style.border = "2px solid white"
		spanStatus.style.width = "30%"
		spanStatus.style.height = "21px"
		spanStatus.style.top = "20%"
		spanStatus.style.left = "50%"
		spanStatus.style.transform = "translate(-50%)"
		spanStatus.style.zIndex = "2"
		
		// gold színű, ami 0-ról indul és 100-ig jut el
		var spanStatusChild = document.createElement("span")
		spanStatus.appendChild(spanStatusChild)
		spanStatusChild.id = "span_searchStatus"
		spanStatusChild.style.backgroundColor = "gold"
		spanStatusChild.style.position = "absolute"
		spanStatusChild.style.height = "21px"
		
		// text
		var spanStatusText = document.createElement("span")
		spanStatus.appendChild(spanStatusText)
		spanStatusText.id = "span_searchStatusText"
		spanStatusText.style.position = "absolute"
		spanStatusText.style.width = "100%"
		spanStatusText.style.textAlign = "center"
		spanStatusText.dataset.loaded = "nothing"
		spanStatusText.dataset.missing = "nothing"
	}
	F_spanStatus()
}
F_createSearchElems()
// –––––––––––––––  search END  –––––––––––––––

//const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// –––––––––––––––  Qing BEGIN  –––––––––––––––
var arrTetelQs = {} // mainTitle-k, azon belül phase/status-ok, azok pedig egy stringet tartalmaznak, hogy mely Q-k
var arrActTetels = [] // active tételek
var arrQnev = [] // (i) -> qNev + tartalom
var arrOldQs = [] // (i) -> LS-ben mentett Q-k
var arrNewQs = [] // (i) -> LS-ben még nem mentett Q-k (nem osztályzott)
var minTime = 259200 // (i) -> Q-nál mennyi idő, mire újra kidobhatja (secundum)
function F_getQinf(qNev) { // LS-ben mentett jegy,repeat,date
	var date = localStorage.getItem(currPath+" | "+qNev)
	var jegy = date.slice(0,date.indexOf(" , "))
	date = date.slice(date.indexOf(" , ")+3)
	var repeat = date.slice(0,date.indexOf(" , "))
	date = date.slice(date.indexOf(" , ")+3)
	return [jegy, repeat, date];
}
function F_saveLS() {
	// osztályzott Q-k: jegy, név --> LSid rendel hozzá
	var maxNum = document.getElementById("div_QingLowerPart").dataset.numQ // hány db Q látszik összesen
	if ( maxNum == undefined || maxNum == 0 ) { return }
	
	var currTime = F_getTime()
	currTime = Math.round(currTime)
	for ( var num=1;  num<Number(maxNum)+1;  num++ ) { // (hagyomános számozás itt 1el el van tolva pozitív irányba)
		var jegy = document.getElementById("span.1."+num).innerHTML
		var i = document.getElementById('parSpan.'+num).dataset.elemi
		
		document.getElementById("span.1."+num).innerHTML = "&nbsp;"
		document.getElementById('parSpan.'+num).style.display = "none"
		document.getElementById('parSpan.'+num).dataset.elemi = ""
		
		var skip = "false"
		if ( document.getElementById("span.2."+num).style.backgroundColor == topQColor ) {
			skip = "top"
		} else if ( document.getElementById("span.2."+num).style.backgroundColor == QingBgBG ) {
			skip = "skip"
		}
		document.getElementById("span.2."+num).style.backgroundColor = ""
		
		/* mechanizmus: van-e a jegy?
			(1) ha igen, új dátum és elmenti LS-be
			(2) ha nem -> változott-e skip -> akkor változott...
				(2.a) amennyiben nem volt LS-ben és fekete (fehér értelmetlen, sárga szintén mert nincs jegy) --> új dátummal elmenti LS-be
				(2.b) amennyiben volt LS-ben és
					sárga volt, de most fehér lett
					fehér volt, de most sárga lett
					--> régi dátummal elmenti LS-be
		*/
		var date = "false"
		var qNev = arrQnev[i].qNev
		/*(1)*/if ( jegy != "&nbsp;" ) { 
			date = currTime
		} else {
			/*(2.b)*/ if ( localStorage.getItem(currPath+" | "+qNev) ) {
				date = localStorage.getItem(currPath+" | "+qNev)
				jegy = date.slice(0,date.indexOf(" , "))
				date = date.slice(date.indexOf(" , ")+3)
				var oldSkip = date.slice(0,date.indexOf(" , "))
				date = date.slice(date.indexOf(" , ")+3)
				if ( oldSkip == skip ) { date = "false" } // ha megegyeznek, akkor continue lesz
				if ( oldSkip == "skip" ) { date = "false" } // ha fekete volt, akkor continue lesz
			/*(2.a)*/ } else if ( skip == "skip" ) {
				date = currTime
			}
		}
		if ( date == "false" ) { continue }
		newCount = Number(localStorage.getItem("newCount")) +1
		localStorage.setItem("newCount",newCount)
		localStorage.setItem(currPath+" | "+qNev,jegy+" , "+skip+" , "+date)
	}
	if ( document.getElementById("btn_QingNextQ").style.backgroundColor == "aqua" ) { 
		F_downloadLS()
		document.getElementById("btn_QingNextQ").style.backgroundColor = "white"
	}
}
function F_loadLS() {
	function F_checkTetels() {
		arrActTetels = JSON.parse(localStorage.getItem(currPath+" | activeTetels"))
		//console.log(arrActTetels)
		if ( arrActTetels == null ) { 
			arrActTetels = []
			return 
		}
		var newTetels = [] // kell, mert ha egy tétel nevét megváltoztatom, akkor a régit vegye ki LS-ből
		var allTetels = document.getElementById("div_QingTetels").getElementsByClassName("tetel")
		for ( var i=0; i<allTetels.length; i++ ) {
			var tetel = allTetels[i].innerHTML
			if ( arrActTetels.includes(tetel) == true ) { 
				allTetels[i].style.backgroundColor = "lightgreen"
				newTetels.push(tetel)
				//console.log(tetel)
			}
			//console.log(tetel)
		}
		
		localStorage.setItem(currPath+" | activeTetels",JSON.stringify(newTetels))
		//document.getElementById("span_tetelCount").innerHTML = arrActTetels.length
		document.getElementById("span_tetelCount").innerHTML = newTetels.length
	}
	F_checkTetels()
	
	function F_checkQs() {
		// phase 1 --> megnézi, melyek az aktuális questek
		var actQs = "" // (i)-ket tartalmaz, amik a kijelölt tételekben vannak
		var allTetels = document.getElementById("div_QingTetels").getElementsByClassName("tetel")
		for ( var x=0; x<allTetels.length; x++ ) {
			if ( allTetels[x].style.backgroundColor == "lightgreen" ) { 
				var tetelName = allTetels[x].innerHTML
				//console.log(tetelName)
				//console.log(arrTetelQs[tetelName])
				actQs = actQs + arrTetelQs[tetelName] +","
			}
		}
		actQs = actQs.substring(0, actQs.length - 1) // végén lévő vesszőt kiveszi, hogy ne legyen empty Q benne
		actQs = actQs.split(",")
		
		// phase 2 --> egyesével lehívja qNev, és megnézi, hogy benne van-e LS-ben
			// ha nincs --> arrNewQs-ba adja a nevét (ha még nincs benne)
			// ha igen --> arrOldQs-ba adja a nevét (ha még nincs benne)
		arrOldQs = []
		arrNewQs = []
		var newQcount = [] // szükséges, mert az (i)-knél többször ugyanazon qNev is szerepelne
		for ( var x=0; x<actQs.length; x++ ) {
			if ( actQs[x] == "" ) { continue }
			var qNev = arrQnev[actQs[x]].qNev
			//console.log(actQs[x]+": "+qNev)
			
			if ( localStorage.getItem(currPath+" | "+qNev) != null ) { 
				if ( arrOldQs.includes(actQs[x]) != true ) { arrOldQs.push(actQs[x]) }
			} else {
				if ( arrNewQs.includes(actQs[x]) != true ) { arrNewQs.push(actQs[x]) }
				if ( newQcount.indexOf(qNev) == -1 ) { newQcount.push(qNev) }
			}
		}
		document.getElementById("btn_newQuest").innerHTML = newQcount.length
		//console.log("newQs: "+arrNewQs)
		//console.log("oldQs: "+arrOldQs)
	}
	F_checkQs()
}
function F_clickTetel(detElem) {
	//console.log(detElem.innerHTML)
	//console.log(arrTetelQs[detElem.innerHTML])
	if ( detElem.style.backgroundColor == "lightgreen" ) {
		detElem.style.backgroundColor = ""
		arrActTetels.splice(arrActTetels.indexOf(detElem.innerHTML),1)
		//console.log(arrActTetels)
		localStorage.setItem(currPath+" | activeTetels", JSON.stringify(arrActTetels))
	} else {
		detElem.style.backgroundColor = "lightgreen"
		arrActTetels.push(detElem.innerHTML)
		//console.log(arrActTetels)
		localStorage.setItem(currPath+" | activeTetels", JSON.stringify(arrActTetels))
	}
	F_loadLS()
	F_calcOldQs()
}
function F_loadTetels() {
	var elems = document.getElementById("div_QingTargyText").getElementsByTagName("*")
	var string = ""
	var fontSize = 140
	var titleStyle = ' style="background-color:gainsboro; font-size:'+fontSize+'%; font-weight:bold; color:black;"'
	fontSize = 120
	var tetelStyle = ' style="font-size:'+fontSize+'%; color:green; cursor:pointer" onclick="F_clickTetel(this)"'
	for ( var x = 0;   x < elems.length;   x++ ) {
		if ( elems[x].className.indexOf("mainTitle") != -1 ) {
			string = string+ "<details><summary" +titleStyle+ ">" +elems[x].innerHTML+ "</summary>"
			var childs = elems[x].parentElement.getElementsByTagName("*")
			for ( var y = 0;   y < childs.length;   y++ ) {
				if ( childs[y].className.indexOf("phase") != -1 || childs[y].className.indexOf("status") != -1 ) {
					string = string+ '<div><span class="tetel"' +tetelStyle+ ">" +childs[y].innerHTML+ " <!--" +elems[x].innerHTML+ "--></span></div>"
				}
			}
			string = string+ "</details>"
			x = x + childs.length
		} else if ( elems[x].className.indexOf("phase") != -1 || elems[x].className.indexOf("status") != -1 ) {
			string = string + '<div><span class="tetel"' +tetelStyle+ ">" +elems[x].innerHTML+ "</span></div>"
		}
	}
	document.getElementById("div_QingTetels").innerHTML = string
}
function F_createQingElems() {
	function F_btnToggleQing() { // jobb felső sarokban a Toggle ... mindig látható
		var button = document.createElement("input")
		button.id = "btn_toggleQing"
		button.type = "button"
		document.getElementById("div_body").appendChild(button)
		//document.body.appendChild(button)
		button.style.width = "90px"
		button.style.height = "90px"
		button.style.position = "absolute"
		button.style.right = "2px"
		button.style.top = "2px"
		button.style.cursor = "pointer"
		button.style.zIndex = "2"

		button.onclick = function(){ 
			var currTime = F_getTime()
			var diffTime = currTime - lastClickTime
			//console.log(myTime+" vs "+lastClickTime)
			if ( diffTime < 1 ) { return }
			lastClickTime = currTime
			document.getElementById("div_QingBg").style.display = "block"
			//this.disabled = true;

			// 2024.09.24 - SZOMI HIBA!!
			// TUDOM (BÁR NEM ÉRTEM) MIÉRT LASSÚ TOGGLE-OFF IS!! F_saveImpQs(path) --> ITT AMIKOR LEMENTI AZ OBJECTBE A QTEXTEKET AZ A SOR A HIBÁS, DE NEM TUDOK EGYENLŐRE JOBBAT --> HA KIVESZEM AZ F_toggleQing() A SETTIMEOUT FUNKCIÓBÓL, ÉS MÖGÉ TESZEM, AKKOR GYORS A TOGGLEOFF, DE A BUZZON A SZÍNÉT AKKOR IS LASSAN NYERI VISSZA.. ÉS A WEBOLDAL FRISSÍTÉSRE NEM REAGÁL UGYANÚGY ADDIG TOVÁBBRA SE, SZÓVAL MARADJON ÍGY INKÁBB
			// A LEGÉRDEKESEBB, HOGY A MÁSODIK TOGGLE-ON/OFF UTÁN IS MÉG UGYANÚGY SZAR, PEDIG MÁR NEM CSINÁL F_saveImpQs(path)... SŐT TOVÁBB SZAR TOGGLE OFFNÁL (TOGGLE ON RÖVIDEBB)
			// kiderült a hiba oka !!!! DeepL - translate addon
			
			this.style.backgroundColor = "black"
			setTimeout(function() { 
				F_toggleQing()
				document.getElementById("btn_toggleQing").style.backgroundColor = ""
			}, 100)
		}
	}
	F_btnToggleQing()
	function F_divQingBg() { // töltés(toggle,) alatt elszürkül
		var div = document.createElement("div")
		document.body.appendChild(div)
		div.id = "div_QingBg"
		div.style.backgroundColor = QingBgBG
		div.style.opacity = "0.35"
		div.style.overflow = "auto"
		div.style.display = "block"
		div.style.position = "fixed"
		div.style.left = "5px"
		div.style.right = "5px"
		div.style.top = "4px"
		div.style.bottom = "4px"
		div.style.zIndex = "1"
		div.onclick = function() { if (confirm("Fast click! Hide bg?") == true) { div.style.display = "none" } } 
	}
	F_divQingBg()
	function F_divMain() { // ebbe az összes Qing element --> elhide-lásuk easy legyen, azért kell
		var div = document.createElement("div")
		div.id = "div_QingMain"
		div.style.display = "none"
		div.style.position = "relative"
		document.getElementById("div_body").insertBefore(div,document.getElementById("div_consoleLog"))
		/*var parent = document.body
		parent.insertBefore(div,parent.firstChild)*/
	}
	F_divMain()
	function F_divUpperPart() { // felső kis rész: kiírások (tételszám, Q szám) + Q-ek osztájzása
		var div = document.createElement("div")
		document.getElementById("div_QingMain").appendChild(div)
		div.id = "div_QingUpperPart"
		//div.className = "normal"
		div.style.borderBottom = "4px solid black"
		//div.style.marginBottom = "2px"
		div.style.paddingBottom = "5px"
		div.style.height = "95px" // 17vh
	}
	F_divUpperPart()
	function F_divBottomPart() { // felső kis rész v2 Androidra: kiírások (tételszám, Q szám)
		var div = document.createElement("div")
		document.getElementById("div_QingMain").appendChild(div)
		div.id = "div_QingBottomPart"
		div.style.borderBottom = "4px solid black"
		div.style.paddingTop = "2px"
		div.style.paddingBottom = "2px"
		div.style.height = "25px"
		div.style.display = "none"
	}
	F_divBottomPart()
	function F_divLowerPart() { // alsó nagy rész: Q amit kidob
		var div = document.createElement("div")
		div.id = "div_QingLowerPart"
		//div.className = "normal"
		//div.style.backgroundColor = "yellow"
		//document.getElementById("div_body").appendChild(div)
		document.getElementById("div_QingMain").appendChild(div)
	}
	F_divLowerPart()
	function F_divMarkPart() { // jobb felső rész: Q-ek osztájzása
		var span = document.createElement("span")
		document.getElementById("div_QingUpperPart").appendChild(span)
		span.id = "span_QingMarkPart"
		
		span.style.position = "absolute"
		span.style.left = "253px"
		span.style.right = "95px"
		span.style.top = "0px"
		span.style.height = "105px"
		span.style.maxHeight = "300px"
		
		span.style.overflowX = "auto"
	}
	F_divMarkPart()
	function F_spanSettings() { // bal felső sarok kiírások: tételszám, Q szám, ...
		var span = document.createElement("span")
		document.getElementById("div_QingUpperPart").appendChild(span)
		span.id = "span_QingSettings"
		span.style.height = "80px"
	}
	F_spanSettings()
	function F_btnNextQ() { // ►
		var button = document.createElement("button")
		button.id = "btn_QingNextQ"
		document.getElementById("div_QingUpperPart").appendChild(button)
		button.innerHTML = " ► "
		
		button.style.border = "3px solid black"
		button.style.backgroundColor = "white"
		button.style.cursor = "pointer"
		
		button.style.position = "absolute"
		button.style.left = "200px"
		button.style.height = "50px"
		button.style.width = "50px"
		button.style.top = "18px"
		button.style.right = "93px"
		button.style.overflow = "auto"
		
		button.onclick = function() { 
			var thisTime = F_getTime()
			var diffTime = thisTime - lastClickTime
			//console.log(myTime+" vs "+lastClickTime)
			if ( diffTime < 1 ) { return }
			if ( this.style.backgroundColor == "aqua" ) { 
				document.body.style.backgroundColor = "Gainsboro"
			} else {
				this.style.backgroundColor  = "black"
				this.style.color  = "white"
			}
			setTimeout(function() { 
				lastClickTime = F_getTime()
				F_nextQ()
				document.body.style.backgroundColor = bodyBGcolor
			}, 100)
		}
	}
	F_btnNextQ()
	// 1st line
	function F_btnTetels() {
		var button = document.createElement("button")
		document.getElementById("span_QingSettings").appendChild(button)
		button.id = "btn_QingTetels"
		button.style.border = "3px solid black"
		button.style.backgroundColor = "Bisque"
		button.style.cursor = "pointer"
		button.innerHTML = "tétel"
		button.onclick = function(){ 
			if ( this.style.borderColor == "limegreen" ) {
				document.getElementById("div_QingLowerPart").style.display = "block"
				this.style.borderColor = "black"
				document.getElementById("div_QingTetels").style.display = "none"
			} else {
				F_hideAllower()
				this.style.borderColor = "limegreen"
				document.getElementById("div_QingTetels").style.display = "block"
			}
		}
	}
	F_btnTetels()
	function F_spanTime() { // mennyi ideje oldottam meg átlagosan őket
		var span = document.createElement("span")
		document.getElementById("span_QingSettings").appendChild(span)
		span.id = "span_tetelCount"
		span.style.border = "1px solid black"
		span.style.backgroundColor = "White"
		span.style.color = "black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
		
		span.innerHTML = "?"
	}
	F_spanTime()
	function F_btnQingMenu() { // nagy menü lehívása részletekért (saveLS, loadLS...)
		var button = document.createElement("button")
		document.getElementById("span_QingSettings").appendChild(button)
		button.id = "btn_QingMenu"
		button.style.border = "3px solid black"
		button.style.backgroundColor = "Bisque"
		button.style.cursor = "pointer"
		button.innerHTML = "&#9881;"
		button.onclick = function(){ 
			if ( this.style.borderColor == "limegreen" ) {
				document.getElementById("div_QingLowerPart").style.display = "block"
				this.style.borderColor = "black"
				document.getElementById("div_QingMenu").style.display = "none"
			} else {
				F_hideAllower()
				this.style.borderColor = "limegreen"
				document.getElementById("div_QingMenu").style.display = "block"
				F_calcOldQs()
			}
		}
	}
	F_btnQingMenu()
	function F_btnQrandom() { // random
		var button = document.createElement("button")
		document.getElementById("span_QingSettings").appendChild(button)
		button.id = "btn_randomQ"
		button.style.border = "3px solid black"
		button.style.backgroundColor = "white"
		button.style.cursor = "pointer"
		button.innerHTML = "&#10536;"
		button.onclick = function(){ 
			if ( this.style.borderColor == "limegreen" ) {
				this.style.borderColor = "black"
			} else {
				this.style.borderColor = "limegreen"
			}
		}
	}
	F_btnQrandom()
	// 2nd line
	function F_spanSecondLine() {
		var span = document.createElement("span")
		document.getElementById("span_QingSettings").appendChild(span)
		span.id = "span_secondLine"
		span.style.position = "absolute"
		span.style.top = "30px"
		span.style.left = "0px"
	}
	F_spanSecondLine()
	function F_btnNewQ() {
		var button = document.createElement("button")
		button.id = "btn_newQuest"
		document.getElementById("span_secondLine").appendChild(button)
		button.style.border = "3px solid black"
		if ( localStorage.getItem("newQ") == "true" ) { button.style.borderColor = "limegreen" }
		button.style.backgroundColor = "White"
		button.style.cursor = "pointer"

		button.onclick = function(){ 
			if ( this.style.borderColor == "limegreen" ) {
				this.style.borderColor = "black"
				localStorage.removeItem("newQ")
			} else {
				this.style.borderColor = "limegreen"
				localStorage.setItem("newQ",true)
			}
		}
		
		button.innerHTML = "?"
	}
	F_btnNewQ()
	function F_spanRepSlow() {
		var span = document.createElement("span")
		span.id = "span_oldQs"
		document.getElementById("span_secondLine").appendChild(span)
		span.style.border = "1px solid black"
		span.style.backgroundColor = "Gainsboro"
		span.style.color = "Black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
		
		span.innerHTML = "?"
	}
	F_spanRepSlow()
	function F_btnRepFast() {
		var button = document.createElement("button")
		button.id = "span_youngQs"
		document.getElementById("span_secondLine").appendChild(button)
		button.style.border = "3px solid black"
		button.style.backgroundColor = "pink"
		button.style.cursor = "pointer"
		
		button.onclick = function(){ 
			if ( this.style.borderColor == "limegreen" ) {
				this.style.borderColor = "black"
			} else {
				this.style.borderColor = "limegreen"
			}
		}
		
		button.innerHTML = "?"
	}
	F_btnRepFast()
	// 3rd line
	function F_spanThirdLine() {
		var span = document.createElement("span")
		document.getElementById("span_QingSettings").appendChild(span)
		span.id = "span_thirdLine"
		span.style.position = "absolute"
		span.style.top = "60px"
		span.style.left = "0px"
	}
	F_spanThirdLine()
	function F_spanNewOldBorder() {
		var span = document.createElement("span")
		span.id = "span_QingNewOldBorder"
		document.getElementById("span_thirdLine").appendChild(span)
		span.style.border = "3px solid limegreen"
		span.style.cursor = "ponter"

		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
		span.style.cursor = "pointer"
		span.onclick = function(){ 
			if ( this.style.borderColor == "limegreen" ) {
				this.style.borderColor = "black"
			} else {
				this.style.borderColor = "limegreen"
			}
		}
	}
	F_spanNewOldBorder()
	function F_spanTopNew() {
		var span = document.createElement("span")
		span.id = "span_QingTopNew"
		document.getElementById("span_QingNewOldBorder").appendChild(span)
		span.style.backgroundColor = "White"
		span.style.color = "Black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
		
		span.innerHTML = "?"
	}
	F_spanTopNew()
	function F_spanTopOld() {
		var span = document.createElement("span")
		span.id = "span_QingTopOld"
		document.getElementById("span_QingNewOldBorder").appendChild(span)
		span.style.backgroundColor = "Gainsboro"
		span.style.color = "Black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
		
		span.innerHTML = "?"
	}
	F_spanTopOld()
	function F_spanJegy() { // mennyi az átlag jegy
		var span = document.createElement("span")
		document.getElementById("span_thirdLine").appendChild(span)
		span.id = "span_QingJegy"
		span.style.border = "1px solid black"
		span.style.backgroundColor = "White"
		span.style.color = "Black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
		
		span.innerHTML = "?"
	}
	F_spanJegy()
	function F_btnQuests() {
		var button = document.createElement("button")
		document.getElementById("span_thirdLine").appendChild(button)
		button.id = "btn_QingQuests"
		button.style.border = "3px solid black"
		button.style.backgroundColor = "Bisque"
		button.style.cursor = "pointer"
		button.onclick = function(){ 
			if ( this.style.borderColor == "limegreen" ) {
				document.getElementById("div_QingLowerPart").style.display = "block"
				this.style.borderColor = "black"
				document.getElementById("div_QingQuests").style.display = "none"
				F_resetQtab()
			} else {
				F_hideAllower()
				this.style.borderColor = "limegreen"
				document.getElementById("div_QingQuests").style.display = "block"
				F_createQtab()
			}
		}
		
		button.innerHTML = "?"
	}
	F_btnQuests()
	
	function F_divMenu() { // specific: save/clear/load LS, stb. ennél
		var div = document.createElement("div")
		div.id = "div_QingMenu"
		document.getElementById("div_QingMain").appendChild(div)
		div.style.backgroundColor = "white"
		div.style.border = "10px solid black"
		div.style.display = "none"
		div.style.height =  document.body.clientHeight - 80 - 20/*border*/ - 25/*passz, de még vannak margin & padding-ek*/
		div.style.overflow = "auto"
	}
	F_divMenu()
	function F_btnSaveLS() {
		var button = document.createElement("button")
		document.getElementById("div_QingMenu").appendChild(button)
		button.id = "btn_saveLS"
		button.innerHTML = "LS"
		button.style.cursor = "pointer"
		
		button.style.fontWeight = "bold"
		button.style.backgroundColor = "Chartreuse"
		button.style.border = "3px solid black"
		
		button.style.width = "90px"
		button.style.height = "90px"
		var lastClickTime = 0
		button.onclick = function() {
			var currTime = F_getTime()
			var diffTime = currTime - lastClickTime
			if ( diffTime < 1 ) { return }
			lastClickTime = currTime
			
			this.style.backgroundColor = "aqua"
			setTimeout(function() { 
				F_downloadLS()
				document.getElementById('btn_saveLS').style.backgroundColor = "Chartreuse"
			}, 500)
		}
	}
	F_btnSaveLS()
	function F_btnLoadLS() {
		var button = document.createElement("button")
		document.getElementById("div_QingMenu").appendChild(button)
		button.id = "btn_loadLS"
		button.innerHTML = "LS"
		button.style.cursor = "pointer"
		
		button.style.fontWeight = "bold"
		button.style.border = "3px solid black"
		
		button.style.width = "90px"
		button.style.height = "90px"
		var lastClickTime = 0
		button.onclick = function() {
			var currTime = F_getTime()
			var diffTime = currTime - lastClickTime
			if ( diffTime < 1 ) { return }
			lastClickTime = currTime
			
			this.style.backgroundColor = "aqua"
			setTimeout(function() { 
				document.getElementById('fileinput').click()
				document.getElementById('btn_loadLS').style.backgroundColor = ""
			}, 500)
		}
	}
	F_btnLoadLS()
	function F_btnClearLS() {
		var button = document.createElement("button")
		document.getElementById("div_QingMenu").appendChild(button)
		button.id = "btn_clearLS"
		button.innerHTML = "LS"
		button.style.cursor = "pointer"
		
		button.style.color = "white"
		button.style.backgroundColor = "red"
		button.style.fontWeight = "bold"
		button.style.border = "3px solid black"
		
		button.style.width = "90px"
		button.style.height = "90px"
		var lastClickTime = 0
		button.onclick = function() {
			var currTime = F_getTime()
			var diffTime = currTime - lastClickTime
			if ( diffTime < 1 ) { return }
			lastClickTime = currTime
			
			this.style.backgroundColor = "aqua"
			setTimeout(function() { 
				localStorage.clear()
				document.getElementById('btn_clearLS').style.backgroundColor = "red"
			}, 500)
		}
	}
	F_btnClearLS()
	function F_tableQJegy() {
		var table = document.createElement("table")
		document.getElementById("div_QingMenu").appendChild(table)
		var tr = document.createElement("TR")
		table.appendChild(tr)
		var th = document.createElement("TH")
		tr.appendChild(th)
		th.innerHTML = "jegy"
		var th = document.createElement("TH")
		tr.appendChild(th)
		th.innerHTML = "db"
		
		for ( var i=1; i<4; i++ ) { 
			var tr = document.createElement("TR")
			table.appendChild(tr)
			var td = document.createElement("TD")
			td.innerHTML = i
			tr.appendChild(td)
			td.style.cursor = "pointer"
			td.style.color = timerColor
			if ( localStorage.getItem("hk.qJegyDisable"+i) ) { 
				td.style.backgroundColor = "coral"
			} else {
				td.style.backgroundColor = "lightgreen"
			}
			td.onclick = function() {
				if ( localStorage.getItem("hk.qJegyDisable"+this.innerHTML) ) { 
					localStorage.removeItem("hk.qJegyDisable"+this.innerHTML)
					this.style.backgroundColor = "lightgreen"
				} else {
					localStorage.setItem("hk.qJegyDisable"+this.innerHTML,true)
					this.style.backgroundColor = "coral"
				}
			}
			
			var td = document.createElement("TD")
			td.id = "td_jegy"+i
			td.style.color = timerColor
			tr.appendChild(td)
		}
	}
	F_tableQJegy()
	
	function F_divTargyText() { // láthatatlan -> tárgy full textje ebben
		var div = document.createElement("div")
		div.id = "div_QingTargyText"
		div.className = "normal"
		div.style.display = "none"
		document.body.appendChild(div)
	}
	F_divTargyText()
	function F_divTetels() { // tételválasztás
		var div = document.createElement("div")
		div.id = "div_QingTetels"
		document.getElementById("div_QingMain").appendChild(div)
		//document.getElementById("div_QingLowerPart").appendChild(div)
		div.style.backgroundColor = QingTetelsBG
		div.style.border = "10px solid black"
		div.style.display = "none"
		div.style.position = "fixed"
		div.style.top = "110px"
		div.style.left = "3px"
		div.style.right = "3px"
		div.style.bottom = "3px"
		//div.style.height = document.body.clientHeight - 80 - 20/*border*/ - 25/*passz, de még vannak margin & padding-ek*/
		div.style.overflow = "auto"
	}
	F_divTetels()
	function F_divQuests() { // questek státusza
		var div = document.createElement("div")
		div.id = "div_QingQuests"
		document.getElementById("div_QingMain").appendChild(div)
		div.style.backgroundColor = QingQuestsBG
		//div.style.color = "green"
		div.style.border = "10px solid black"
		div.style.display = "none"
		div.style.position = "fixed"
		div.style.top = "110px"
		div.style.left = "3px"
		div.style.right = "3px"
		div.style.bottom = "3px"
		//div.style.height =  document.body.clientHeight - 80 - 20/*border*/ - 25/*passz, de még vannak margin & padding-ek*/
		div.style.overflow = "auto"
		
		var table = document.createElement("TABLE")
		table.id = "table_oldQs"
		div.appendChild(table)
		
		var table = document.createElement("TABLE")
		table.id = "table_oldQsTop"
		div.appendChild(table)
		
		var table = document.createElement("TABLE")
		table.id = "table_oldQsNorm"
		div.appendChild(table)
		
		var table = document.createElement("TABLE")
		table.id = "table_oldQsSkip"
		div.appendChild(table)
	}
	F_divQuests()
	
	function F_divSelectJegy() {
		var div = document.createElement("div")
		div.id = "div_selectJegy"
		document.getElementById("div_QingUpperPart").appendChild(div)
		div.style.position = "absolute"
		div.style.top = "60px"
		div.style.width = "45px"
		div.style.display = "none"
		div.style.backgroundColor = selectJegyBGColor // fehér kb.
		div.style.boxShadow = "0px 8px 16px 0px rgba(0,0,0,0.4)"
		div.style.border = "1px solid grey"
		div.style.zIndex = "2"
		div.style.textAlign = "center"
		var array = ["&nbsp","1","2","3"]
		for ( var x=0;  x<array.length;  x++ ) {
			var a = document.createElement("a")
			div.appendChild(a)
			a.innerHTML = array[x]
			a.style.padding = "5px 10px"
			a.style.display = "block"
			a.style.cursor = "pointer"
			a.onclick = function() { 
				var i = this.parentElement.dataset.numQ
				document.getElementById("span.1."+i).innerHTML = this.innerHTML
			}
			a.onmouseover = function() { this.style.backgroundColor = "grey" }
			a.onmouseout = function() { this.style.backgroundColor = "" }
		}
	}
	F_divSelectJegy()
	
	function F_hideAllower() {
		document.getElementById("div_QingLowerPart").style.display = "none"
		document.getElementById("div_QingMenu").style.display = "none"
		document.getElementById("div_QingTetels").style.display = "none"
		document.getElementById("div_QingQuests").style.display = "none"
		
		document.getElementById("btn_QingMenu").style.borderColor = "black"
		document.getElementById("btn_QingTetels").style.borderColor = "black"
		document.getElementById("btn_QingQuests").style.borderColor = "black"
	}
		
	
	if ( isAndroid ) {
		document.getElementById("div_QingBottomPart").appendChild(document.getElementById("span_QingSettings"))
		document.getElementById("div_QingBottomPart").style.display = "block"
		document.getElementById("span_QingSettings").appendChild(document.getElementById("btn_newQuest"))
		document.getElementById("span_QingSettings").appendChild(document.getElementById("span_oldQs"))
		document.getElementById("span_QingSettings").appendChild(document.getElementById("span_youngQs"))
		document.getElementById("span_QingSettings").appendChild(document.getElementById("span_thirdLine"))
		document.getElementById("span_QingSettings").appendChild(document.getElementById("span_QingNewOldBorder"))
		document.getElementById("span_QingSettings").appendChild(document.getElementById("span_QingJegy"))
		document.getElementById("span_QingSettings").appendChild(document.getElementById("btn_QingQuests"))
		document.getElementById("btn_QingNextQ").style.left = "0px"
		document.getElementById("div_QingUpperPart").style.height = "88px"
		document.getElementById("span_QingMarkPart").style.height = "95px"
		document.getElementById("span_QingMarkPart").style.left = "55px"
		document.getElementById("span_QingMarkPart").style.right = "65px"
		document.getElementById("div_QingTetels").style.top = "125px"
		document.getElementById("div_QingQuests").style.top = "125px"
		document.getElementById("btn_toggleQing").style.width = "60px"
		document.getElementById("btn_toggleQing").style.height = "60px"
	}
}
F_createQingElems()
function F_getQnev(detElem){
	var qNev = undefined
	if ( detElem.tagName == "DETAILS" ) { qNev = detElem.firstChild.innerHTML }
	if ( detElem.tagName == "TH" ) { qNev = detElem.innerHTML }
	if ( detElem.tagName == "TD" ) { qNev = detElem.innerHTML }
	if ( detElem.tagName == "LI" ) { qNev = detElem.innerHTML }
	if ( detElem.classList.contains("abbr") ) { qNev = detElem.innerHTML }
	if ( detElem.classList.contains("midQ") ) { qNev = detElem.innerHTML }
	if ( qNev == undefined ) { // div, span
		qNev = detElem.firstChild.innerHTML
		console.log('A <'+detElem.tagName+' class="'+detElem.className+'">-nek a qNeve: '+qNev)
	}
	
	if ( detElem.className.indexOf("[") != -1 ) { 
		var impID = F_getImpID(detElem)
		// de! csak akkor teszi mögé, ha ezen oldalról származik
		var path = F_getQPath(detElem,impID)
		if ( path == currPath ) { qNev = qNev + " <!--["+impID+"]-->" }
	}
	// var impID = F_getImpID(detElem)
	return qNev
}
function F_arrQs(){
	var allQs = document.getElementById("div_QingTargyText").getElementsByClassName("kerdes")
	var arrQnevMulti = [] // csak, amelyik ismétlődik
	for ( var i=0; i<allQs.length; i++ ) { 
		var qNev = F_getQnev(allQs[i])
		//console.log(qNev)
		// if ( typeof arrQnev[qNev] === 'undefined' ) { // does not exist
		if ( arrQnev.includes(qNev) == false ) { // does not exist
			arrQnev.push(qNev)
		} else if ( arrQnevMulti.includes(qNev) == false && qNev.indexOf("[") == -1 ) {  // does not exist
			arrQnevMulti.push(qNev)
			//var impID = F_getImpID(allQs[i])
			//console.log("# "+i+": "+allQs[i].className+": "+qNev)
		}
	}
	arrQnev = []
	for ( var i=0; i<allQs.length; i++ ) { 
		var qNev = F_getQnev(allQs[i])
		var qText = allQs[i].innerHTML
		//console.log(i+": "+qNev)
		
		// ha többször van a qNev, akkor hozzáadja note-ba a shortent: (text length / ha rövid a text, akkor azt)
		var noteText = ""
		if ( arrQnevMulti.includes(qNev) == true ) {
			if ( qText.length > 100 ) {
				noteText = "<!-- "+qText.length+" -->"
			} else {
				var string = qText
				string = string.replaceAll("<!--","")
				string = string.replaceAll("-->","")
				noteText = "<!-- "+string+" -->"
			}
		}
		
		arrQnev[i] = {}
		arrQnev[i].qNev = qNev +noteText
		arrQnev[i].content = qText
		
		var inTetel = false
		var inTitle = false
		var parent = allQs[i]
		do {
			if ( parent.firstChild.className == "phase" ) { inTetel = parent.firstChild.innerHTML }
			if ( parent.firstChild.className == "status" ) { inTetel = parent.firstChild.innerHTML }
			parent = parent.parentElement
		} while ( inTetel == false && parent != document.body )
		if ( inTetel != false ) {
			do {
				if ( parent.firstChild.className == "mainTitle" ) { 
					inTitle = parent.firstChild.innerHTML
					inTetel = inTetel+" <!--"+inTitle+"-->"
				}
				parent = parent.parentElement
			} while ( inTitle == false && parent != document.body )
			if ( arrTetelQs[inTetel] ) {
				arrTetelQs[inTetel] = arrTetelQs[inTetel] +","+ i
			} else {
				arrTetelQs[inTetel] = i
			}
			//console.log(i+": "+inTetel+": "+arrTetelQs[inTetel])
		}
		
		/*if ( typeof arrQnevMulti[qNev] != 'undefined' ) { // többször van
			//console.log(i+": "+qNev)
			if ( arrQnevMulti.includes(qNev) == true ) { 
				arrQnevMulti[qNev] = i+""
				//console.log("new: "+i)
			} else {
				var skip = false
				var string = arrQnevMulti[qNev]
				//console.log(string)
				var arrPrev = string.split(" ")
				for ( var x in arrPrev ) {
					var num = arrPrev[x]
					var numText = arrQnev[num].content
					//console.log(num)
					//console.log(numText)
					//console.log(qText)
					if ( qText == numText ) { 
						skip = true
						break
					}
				}
				if ( skip == true ) { continue }
				arrQnevMulti[qNev] = arrQnevMulti[qNev] +" "+ i 
				//console.log(arrQnevMulti[qNev])
				//alert("stop")
			}
		}*/
	}
}
function F_toggleQing() {
	console.log("F_toggleQing START")
	if ( document.getElementById("div_pageQTargy").style.display == 'none' ) {
		localStorage.removeItem("hk.ToggleAll")
		document.getElementById("table_weboldalak").parentElement.parentElement.style.display = 'block';
		document.getElementById("div_pageQTargy").style.display = 'block';
		document.getElementById("div_QingMain").style.display = 'none';
		document.getElementById("div_QingBg").style.display = "none"
		
		var diffTime = F_getTime() - lastClickTime
		console.log("toggleOFF - "+ diffTime)
	} else {
		localStorage.setItem("hk.ToggleAll",currPath)
		document.getElementById("table_weboldalak").parentElement.parentElement.style.display = 'none';
		document.getElementById("div_pageQTargy").style.display = 'none';
		document.getElementById("div_QingMain").style.display = 'block';
		
		document.getElementById("div_QingTargyText").innerHTML = pageTexts[currPath]
		//var allQs = document.getElementById("div_QingTargyText").getElementsByClassName("kerdes")
		//console.log(allQs.length)
		F_loadImpQs(document.getElementById("div_QingTargyText"),"full")
		//console.log(allQs.length)
		//console.log(document.getElementById("div_QingTargyText").innerHTML)
		
		F_arrQs()
		F_loadTetels()
		F_loadLS()
		F_calcOldQs()
		document.getElementById("div_QingBg").style.display = "none"
		
		var diffTime = F_getTime() - lastClickTime
		console.log("toggleON - "+ diffTime)
	}
}
function F_calcOldQs(){
	var currTime = F_getTime()
	currTime = Math.round(currTime)
	
	var oldQs = 0
	var youngQs = 0
	var skipQs = 0
	var topNew = 0
	var topOld = 0
	var arrJegy = []
	var atlJegy = 0
	var arrQsDone = [] // annyi, hogy ne számolja többször azon Q-kat, amik ugyanazok, csak többhelyen is szerepelnek
	for ( var x=0; x<arrOldQs.length; x++ ) {
		var i = arrOldQs[x]
		var qNev = arrQnev[i].qNev  // jegy , repeat , date
		if ( arrQsDone.indexOf(qNev) == -1 ) {
			arrQsDone.push(qNev)
		} else {
			continue
		}
		var arrQinf = F_getQinf(qNev)
		var repeat = arrQinf[1]
		var date = arrQinf[2]
		
		if ( repeat == "skip" ) { 
			skipQs = skipQs +1
			continue
		}
		var diffTime = Number(currTime) - Number(date)
		if ( diffTime > minTime ) {
			oldQs = oldQs +1
			if ( repeat == "top" ) { topNew = topNew +1 }
		} else {
			youngQs = youngQs +1
			if ( repeat == "top" ) { topOld = topOld +1 }
		}
		
		var jegy = arrQinf[0]
		if (arrJegy[jegy]) { arrJegy[jegy] = Number(arrJegy[jegy]) +1 } else { arrJegy[jegy] = 1 }
		if ( jegy == 3 ) { jegy = 2 }
		atlJegy = Number(atlJegy) +Number(jegy)
		//console.log(i+" "+jegy+" "+diffTime)
	}
	document.getElementById("span_oldQs").innerHTML = oldQs
	document.getElementById("span_youngQs").innerHTML = youngQs
	document.getElementById("btn_QingQuests").innerHTML = arrQsDone.length
	document.getElementById("span_QingTopNew").innerHTML = topNew
	document.getElementById("span_QingTopOld").innerHTML = topOld
	document.getElementById("span_QingJegy").innerHTML = (atlJegy / (oldQs+youngQs)).toFixed(2)
	for ( var x=1; x<4; x++ ) { document.getElementById("td_jegy"+x).innerHTML = arrJegy[x] }
}
function F_calcNextQ(){
	var priorID = "none"
	var normPrior = "none"
	var repPrior = "none"
	var currTime = F_getTime()
	currTime = Math.round(currTime)
	
	/* prior
		+ randomQ, ha engedélyezve van
		+ newQ, ha engedélyezve(btn_newQuest) és van is még olyan
		+ egyébként:
			1) ha 'skip', akkor következő
			2) kiszámolja number-t összesnél -> bejelöli a priort
			3) kiszámolja number-t csak 'repeatesnél' -> bejelöli a priort
			4) ha fastrep engedélyezve, akkor 
				a) utóbbi prior lesz a prior 
				b) ha nincs, akkor előbbi
	*/
	if ( document.getElementById("btn_randomQ").style.borderColor == "limegreen" ) {
		/* 3 array van:
			arrNewQs ➜ nincs LS-ben még mentve
			arrOldQs ➜ LS-ben mentve ➜ ezt itt először ketté kell választani:
				arrSkipQs ➜ skippelt ➜ ezt ugyanis ne dobja ki, ha randomot kell dobjon!
				arrNoSkipQs ➜ nem skippelt ➜ valójában csak erre van tehát szükség
		*/
		var arrNoSkipQs = []
		for ( var x=0; x<arrOldQs.length; x++ ) {
			var i = arrOldQs[x]
			var qNev = arrQnev[i].qNev  // jegy , repeat , date
			var arrQinf = F_getQinf(qNev)
			
			var jegy = arrQinf[0]
			if ( localStorage.getItem("hk.qJegyDisable"+jegy) ) { continue }
			
			var repeat = arrQinf[1]
			if ( repeat == "skip" || arrNoSkipQs.indexOf(i) != -1 ) { continue }
			
			var date = arrQinf[2]
			var diffTime = Number(currTime) - Number(date)
			if ( diffTime > minTime ) { arrNoSkipQs.push(i) }
		}
		
		var maxNum = arrNoSkipQs.length + arrNewQs.length
		var randomNum = Math.floor(Math.random() * maxNum) +1
		if ( randomNum > arrNoSkipQs.length ) {
			var i = randomNum - arrNoSkipQs.length -1
			normPrior = arrNewQs[i]
		} else {
			var i = randomNum -1
			normPrior = arrNoSkipQs[i]
		}
	} else if ( document.getElementById("btn_newQuest").style.borderColor == "limegreen" ) {
		if ( arrNewQs.length > 0 ) { normPrior = arrNewQs[0] }
	} 
	if ( normPrior == "none" ) {
		var normQPoint = 0
		var repQPoint = 0
		for ( var x=0; x<arrOldQs.length; x++ ) {
			var i = arrOldQs[x]
			var qNev = arrQnev[i].qNev // jegy , repeat , date
			var arrQinf = F_getQinf(qNev)
			var jegy = arrQinf[0]
			var repeat = arrQinf[1]
			var date = arrQinf[2]
			
			if ( localStorage.getItem("hk.qJegyDisable"+jegy) ) { continue }
			if ( repeat == "skip" ) { continue }
			var diffTime = Number(currTime) - Number(date)
			var currPoint = Number(diffTime) / Number(jegy)
			if ( Number(currPoint) > Number(normQPoint) ) {
				normQPoint = currPoint
				normPrior = i
			}
			if ( repeat == "top" && document.getElementById("span_QingNewOldBorder").style.borderColor == "limegreen" ) { 
				if ( Number(currPoint) > Number(repQPoint) ) {
					repQPoint = currPoint
					repPrior = i
				}
			}
			//console.log(i+" "+jegy+" "+diffTime)
		}
	}
	if ( repPrior != "none" ) { priorID = repPrior } else { priorID = normPrior }
	return priorID
}
function F_nextQ() {
	var currTime = F_getTime()
	currTime = Math.round(currTime)
	F_saveLS()
	F_loadLS()
	F_calcOldQs()
	var priorID = F_calcNextQ()  // megnézi melyik Q lesz a kövi
	
	function F_setBtnColor() {
		document.getElementById("btn_QingNextQ").style.color = ""
		if ( localStorage.getItem("newCount") > 4 ) { 
			document.getElementById("btn_QingNextQ").style.backgroundColor = "aqua" 
		} else {
			document.getElementById("btn_QingNextQ").style.backgroundColor = "white"
		}
	}
	
	if ( priorID == "none" || priorID == undefined ) { 
		alert("elfogytak a kérdések")
		document.getElementById("div_QingLowerPart").dataset.numQ = 0
		F_setBtnColor()
		return
	}
	
	var allQs = document.getElementById("div_QingTargyText").getElementsByClassName("kerdes")
	var qElem = allQs[priorID]
	
	// felmegy document.body -> ha status van, az lesz amit bemásol; (de! a Q ami ugye ki lesz jelölve változatlan)
	function F_getParentQ(qElem) {
		var parent = qElem
		var parQ = false
		/* régi: ezt azért vettem ki, mert ha (div imp) van egy phase-ben, akkor abban az összes kérdést kidobná egyben
		do {
			if ( parent.firstChild.className == "status" ) { parQ = parent }
			if ( parent.parentElement.firstChild.className == "phase" ) { parQ = parent }
			parent = parent.parentElement
		} while ( parQ == false && parent != document.body )*/
		
		//console.log(parent)
		do {
			if ( parent.firstChild.className == "status" ) { parQ = parent }
			if ( parent.parentElement.firstChild.className == "phase" ) { parQ = "phase" }
			parent = parent.parentElement
		} while ( parQ == false && parent != document.body )
		if ( parQ == "phase" ) { 
			parent = qElem
			do {
				if ( parent.classList.contains("kerdes") ) { parQ = parent }
					// ez a feltétel nem tudom miért kell.. ugyanis, ha csak egy open-es az egész, akkor is kéne.. mindenesetre nyílván nem ok nélkül kellett, így inkább beraktam kövei sorba az opent is, hogy akkor is jó legyen
				if ( parent.classList.contains("open") ) { parQ = parent }
				parent = parent.parentElement
			} while ( parent.firstChild.className != "phase" )
		}
		if ( parQ == false ) { parQ = qElem }
		
		return parQ
	}
	var parQ = F_getParentQ(qElem)
	
	var xTOi = [] // x = amit kidob kérdések, ott hányadik fenntről lefele; i = tárgy összes kérdése közül hányadik
	var nevTOnum = [] // num = amit kidob kérdések, ott hányadik fenntről lefele DE! ami többször van, az ugyanazt kapja!
	var QsNum = 0 // számozásnál kell
	
	// megnézi mindegyik Q-t, hogy az allQs-ban hányadik --> ugyanis úgy tudom lekérni a nevét majd
	function F_checkNum() { 
		var x = 0
		if ( parQ.classList.contains("kerdes") ) { 
			for ( var i=0; i<allQs.length; i++ ) { 
				if ( parQ == allQs[i] ) {
					xTOi[x] = i
					// ellenőrzésnek: 
					// parQ.firstChild.innerHTML = "["+x+","+i+"] "+parQ.firstChild.innerHTML
					x = x +1
					continue
				}
			}
		}
		var parQs = parQ.getElementsByClassName("kerdes")
		for ( var count=0; count<parQs.length; count++ ) { 
			for ( var i=0; i<allQs.length; i++ ) { 
				if ( parQs[count] == allQs[i] ) {
					xTOi[x] = i
					// ellenőrzésnek: 
					// parQs[count].firstChild.innerHTML = "["+x+","+i+"] "+parQs[count].firstChild.innerHTML
					continue
				}
			}
			x = x +1
		}
	}
	F_checkNum()
	
	// kérdéseket kiírja
	document.getElementById("div_QingLowerPart").innerHTML = parQ.outerHTML + "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"
	
	var childs = document.getElementById("div_QingLowerPart").childNodes;
	for ( var i=0; i<childs.length; i++ ) { if ( childs[i].className.indexOf("open") != -1 ) { childs[i].open = true } }
	
	// detailsra klikk
	function F_onToggle(detElem) {
		F_loadElem(detElem)
		F_createMarks() 
		F_titleChange(detElem) /* F_createMarks() után kell még1x
			különben ha details-ban van az abbr, akkor nem működik (ugyanis, amikor a kérdés számát beleírja a summary elejére(F_createMarks), akkor letörli az F_titleChange scriptet)
		*/
		F_highlightQ()
		
		var arrayDetails = detElem.getElementsByTagName("details")
		for ( var i=0; i<arrayDetails.length; i++ ) { arrayDetails[i].ontoggle = function() { F_onToggle(this) } }
	}
	F_onToggle(document.getElementById("div_QingLowerPart"))
	
	// lehívja(/craftolja) az osztályzás opciókat mellé!
	function F_createMarks() {
		function F_getNum(qNev) { // lekéri a kidobott Q számozását (ami többször szerepel, az ugyanazt kapja)
			if ( nevTOnum[qNev] ) {
				num = nevTOnum[qNev]
			} else {
				QsNum = QsNum +1
				nevTOnum[qNev] = QsNum
				num = QsNum
			}
			return num
		}
		function F_createSelect(num) {
			var parSpan = document.createElement("span")
			parSpan.id = "parSpan."+num
			parSpan.style.position = "absolute"
			var leftPos = num*48 -48
			parSpan.style.left = leftPos +"px"
			document.getElementById("span_QingMarkPart").appendChild(parSpan)
			for ( var x=0;  x<3;  x++ ) {
				var span = document.createElement("span")
				span.id = "span."+x+"."+num
				parSpan.appendChild(span)
				span.style.textAlign = "center"
				
				span.style.position = "absolute"
				span.style.width = "45px"
				span.style.height = "27px"
				span.style.lineHeight = "27px" // hogy középen legyen vertically(y-tengely) is a text
				span.style.border = "2px solid black"
				
				if ( x == 0 ) {
					span.style.top = "0px"
					span.innerHTML = num
					span.style.fontWeight = "bold"
					span.onclick = function(){ 
						if ( this.style.backgroundColor == "black" ) {
							if ( confirm('mégse skip? ('+this.innerHTML+")") ) {
								var num = this.id
								num = num.slice(num.lastIndexOf(".")+1)
								var i = document.getElementById('parSpan.'+num).dataset.elemi
								var qNev = arrQnev[i].qNev
								var jegyName = localStorage.getItem(currPath+" | "+qNev)
								jegyName = jegyName.replace("skip","false")
								var jegy = jegyName.slice(0,jegyName.indexOf(" , "))
								if ( jegy == "&nbsp;" ) {
									localStorage.removeItem(currPath+" | "+qNev)
								} else {
									localStorage.setItem(currPath+" | "+qNev,jegyName)
								}
								
								this.style.backgroundColor = "white"
								this.style.color = "black"
							}
						}
					}
				} else if ( x == 1 ) {
					var div = document.createElement("DIV")
					span.appendChild(div)
					span.style.top = "30px"
					span.innerHTML = "&nbsp"
					var jegyStatus = "hide"
					span.onclick = function(){ 
						var dropdown = document.getElementById("div_selectJegy")
						var num = this.id
						num = num.slice(num.lastIndexOf(".")+1)
						dropdown.dataset.numQ = num
						
						dropdown.style.left = F_offsetXY(this,"2").left -1 +"px"
						
						// this.parentElement.appendChild(dropdown)
						
						dropdown.style.display = "block"
						jegyStatus = "show"
						window.onclick = function(event) { 
							if ( jegyStatus == "hide" ) { document.getElementById("div_selectJegy").style.display = "none" }
							jegyStatus = "hide"
						}
						
						// repeatest beállítja vastagbetusre
						var i = document.getElementById('parSpan.'+num).dataset.elemi
						var qNev = arrQnev[i].qNev
						var child = dropdown.childNodes
						for ( var y=0; y < child.length; y++ ) { 
							child[y].style.fontWeight = "normal"
							child[y].style.color = selectJegyColor
							if ( localStorage.getItem(currPath+" | "+qNev) ) {
								var jegyName = localStorage.getItem(currPath+" | "+qNev)
								var jegy = jegyName.slice(0,jegyName.indexOf(" , "))
								if ( child[y].innerHTML == jegy ) { 
									child[y].style.fontWeight = "bolder"
									child[y].style.color = midQColor
								}
							}
						}
					}
				} else if ( x == 2 ) {
					span.style.top = "60px"
					span.style.fontSize = "x-small"
					span.style.color = timerColor
					span.onclick = function(){  // left click
						if ( this.style.backgroundColor == QingBgBG ) {
							this.style.backgroundColor = ""
						} else if ( this.style.backgroundColor == topQColor ) {
							this.style.backgroundColor = QingBgBG
						} else {
							this.style.backgroundColor = topQColor
						}
					}
					span.addEventListener('contextmenu', function(ev) { // right click
						ev.preventDefault();
						if ( this.style.backgroundColor == QingBgBG ) {
							this.style.backgroundColor = topQColor
						} else if ( this.style.backgroundColor == topQColor ) {
							this.style.backgroundColor = ""
						} else {
							this.style.backgroundColor = QingBgBG
						}
						return false
					}, false)
				}
			}
		}
		var Qs = document.getElementById("div_QingLowerPart").getElementsByClassName("kerdes")
		var arrNumQs = [] // hány db Q látszik összesen
		//console.log(document.getElementById("div_QingLowerPart").innerHTML)
		for ( var x=0; x<Qs.length; x++ ) { 
			if ( isElementVisible(Qs[x],true) == false ) { continue }
			if ( Qs[x].dataset.num ) { continue }
			var i = xTOi[x]
			var qNev = arrQnev[i].qNev
			var num = F_getNum(qNev)
			
			// Q elé beírja a számát
			if ( Qs[x].firstChild.tagName == "SUMMARY" ) { 
				Qs[x].firstChild.innerHTML = "["+num+"] "+Qs[x].firstChild.innerHTML
			} else { // midQ, stb.
				Qs[x].innerHTML = "["+num+"] "+Qs[x].innerHTML
			}
			Qs[x].dataset.num = num
			
			if ( !document.getElementById('parSpan.'+num) ) { F_createSelect(num) }
			document.getElementById('parSpan.'+num).style.display = "block"
			document.getElementById('parSpan.'+num).dataset.elemi = i
			
			document.getElementById("span.0."+num).style.backgroundColor = "white" 
			document.getElementById("span.0."+num).style.color = "black" 
			document.getElementById('span.1.'+num).innerHTML = "&nbsp"
			document.getElementById('span.2.'+num).innerHTML = "&nbsp"
			
			// beírja a dátumot, ha van
			// console.log(i)
			var qNev = arrQnev[i].qNev
			if ( localStorage.getItem(currPath+" | "+qNev) ) {
					var arrQinf = F_getQinf(qNev)
					var jegy = arrQinf[0]
					var repeat = arrQinf[1]
					var date = arrQinf[2]
				if ( repeat == "skip" ) { 
					document.getElementById("span.0."+num).style.backgroundColor = "black" 
					document.getElementById("span.0."+num).style.color = "white" 
				} 
				if ( repeat == "top" ) {
					document.getElementById("span.2."+num).style.backgroundColor = topQColor 
				} else {
					document.getElementById("span.2."+num).style.backgroundColor = "" 
				}
				if ( jegy != "&nbsp;" ) { 
					var diffTime = Number(currTime) - Number(date)
					diffTime = Number(diffTime)
					diffTime = diffTime/60
					diffTime = Math.floor(diffTime)
					if ( diffTime > 99 ) {
						document.getElementById("span.2."+num).innerHTML = Math.floor(diffTime/60)
					} else {
						document.getElementById("span.2."+num).innerHTML = "<strong>"+diffTime+"</strong>"
					}
				}
			}
		}
		document.getElementById("div_QingLowerPart").dataset.numQ = QsNum
	}
	F_createMarks();
	
	// bejelöli melyik a mainQ!
	function F_highlightQ() {
		// először összeset feketére festi (ha toggleztam, akkor ami sárga volt, most már fekete legyen)
		var numQ = document.getElementById("div_QingLowerPart").dataset.numQ // hány db Q látszik összesen
		for ( var y=1; y<=numQ; y++ ) { document.getElementById('span.0.'+y).style.border = "2px solid black" }

		// priorQ elemet megkeresi először
		var priorX
		for ( var x in xTOi ) { if ( xTOi[x] == priorID ) { priorX = x } }
		var Qs = document.getElementById("div_QingLowerPart").getElementsByClassName("kerdes")
	//	console.log(Qs.length)
		var priorQ = Qs[priorX]
	//	console.log(priorQ)
	//	console.log(Qs[priorX].innerHTML)
		// megnézi látható-e, ha ha nem, felmegy egyesével parQ-ig, amíg valamelyik nem látható
		var num = false
		do {
			if ( priorQ.dataset.num ) { 
				num = priorQ.dataset.num
				document.getElementById('span.0.'+num).style.border = "2px solid GoldenRod" 
			}
			priorQ = priorQ.parentElement
		}
		while ( num == false )
	}
	F_highlightQ();
	
	// ► (color:download)
	F_setBtnColor()
}
// –––––––––––––––  Qing END  –––––––––––––––

// refresh editPage
if ( editPage != false ) { 
	var button = document.createElement("button")
	document.body.appendChild(button)
	button.innerHTML = " &#8635; "
	
	button.style.border = "2px solid black"
	button.style.backgroundColor = "white"
	button.style.cursor = "pointer"
	
	button.style.position = "fixed"
	button.style.right = "20px"
	button.style.bottom = "20px"
	
	button.onclick = function() { 
		// elmenti a detailst + scrollbart
		var scrollPos = document.body.parentElement.scrollTop // nem pontos valamiért
			//var scrollPos = window.pageYOffset // ez se
		
		// betölti újra
		currPath = editPage
		F_loadAndSavePageText(editPage,true,false)
		
		// beállítja a detailst + scrollbart
		document.body.parentElement.scrollTop = scrollPos  // nem pontos valamiért
			//window.scrollTo(0, scrollPos) // ez se
	}
		//document.getElementById("div_searchBg").dataset.scrollY = document.getElementById("div_searchBg").scrollTop
}


// oldQ TAB
var arrTabQs = []
function F_resetQtab() {
	var table = document.getElementById("table_oldQs")
	table.innerHTML = ""
	
	// ha valamelyik skip Q-t átállítottam normalQ-ra és nem volt osztályozva akkor remove-olja
	for ( var x=0; x<arrOldQs.length; x++ ) {
		var i = arrOldQs[x]
		var qNev = arrQnev[i].qNev
		var jegyRepDate = localStorage.getItem(currPath+" | "+qNev)
		var jegy = jegyRepDate.slice(0,jegyRepDate.indexOf(" , "))
		var repDate = jegyRepDate.slice(jegyRepDate.indexOf(" , ")+3)
		var repeat = repDate.slice(0,repDate.indexOf(" , "))
		if ( jegy == "&nbsp;" && repeat == "false" ) { 
			localStorage.removeItem(currPath+" | "+qNev)
			arrOldQs.splice(x,1)
		} else if ( jegy == "&nbsp;" && repeat == "top" ) { 
			jegyRepDate = jegyRepDate.replace("&nbsp;","1")
			localStorage.setItem(currPath+" | "+qNev,jegyRepDate)
		}
		F_calcOldQs()
	}
}
function F_createQtab() {
	var currTime = F_getTime()
	currTime = Math.round(currTime)
	var table = document.getElementById("table_oldQs")
	
	function F_addElem(trElem,repeat,val) {
		var table
		if ( repeat == "skip" ) { table = document.getElementById("table_oldQsSkip") }
		if ( repeat == "false" ) { table = document.getElementById("table_oldQsNorm") }
		if ( repeat == "top" ) { table = document.getElementById("table_oldQsTop") }
		var TRs = table.childNodes
		for ( var i=0; i<TRs.length; i++ ) {
			var TDs = TRs[i].childNodes
			var qNev = TDs[0].innerHTML
			var jegy = TDs[1].innerHTML
			var date = TDs[2].innerHTML
			var valOther = Number(date) / Number(jegy)
			if ( val > valOther ) { 
				table.insertBefore(trElem,TRs[i])
				return
			}
		}
		table.appendChild(trElem)
	}
	function F_createElem(qNev) {
		var tr = document.createElement("TR")
		
		var td = document.createElement("TD")
		tr.appendChild(td)
		td.innerHTML = qNev
		td.style.color = "green"
		td.style.cursor = "pointer"
		td.onclick = function() {
			var jegySkipDate = localStorage.getItem(currPath+" | "+qNev)  // jegy , skip , date
			
			if ( this.style.backgroundColor == "yellow" ) { 
			//if ( this.style.backgroundColor == "goldenrod" ) { 
				this.style.backgroundColor = "darkgrey"
				jegySkipDate = jegySkipDate.replace(" , top , "," , skip , ")
			} else if ( this.style.backgroundColor == "darkgrey" ) { 
				this.style.backgroundColor = ""
				jegySkipDate = jegySkipDate.replace(" , skip , "," , false , ")
			} else {
				this.style.backgroundColor = "yellow"
				//this.style.backgroundColor = "goldenrod"
				jegySkipDate = jegySkipDate.replace(" , false , "," , top , ")
			}
			if ( jegySkipDate.indexOf(this.dataset.repeat) == -1 ) { 
				this.parentElement.childNodes[0].style.backgroundColor = "red"
				this.parentElement.childNodes[0].style.color = "white"
			} else {
				this.parentElement.childNodes[0].style.backgroundColor = ""
				this.parentElement.childNodes[0].style.color = ""
			}
			
			//var jegyName = localStorage.getItem(currPath+" | "+qNev)
			//var jegy = jegyName.slice(0,jegyName.indexOf(" , "))
			//console.log(jegyName)
			//console.log(jegy+" "+qNev)
			localStorage.setItem(currPath+" | "+qNev,jegySkipDate)
			F_calcOldQs()
		}
		
		var arrQinf = F_getQinf(qNev)
		var jegy = arrQinf[0]
		var repeat = arrQinf[1]
		var date = arrQinf[2]
		
		if ( repeat == "skip" ) { 
			td.style.backgroundColor = "darkgrey"
		} else if ( repeat == "top" ) { 
			td.style.backgroundColor = "yellow"
			//td.style.backgroundColor = "goldenrod"
		} else { 
			td.style.backgroundColor = ""
		}
		td.dataset.repeat = repeat
		
		var td = document.createElement("TD")
		tr.appendChild(td)
		td.innerHTML = jegy
		
		// percben, kerekítve
		var diffTime = Number(currTime) - Number(date)
		diffTime = diffTime /60
		diffTime = Math.round(diffTime)
		var td = document.createElement("TD")
		tr.appendChild(td)
		td.innerHTML = diffTime
		
		var val = Number(diffTime) / Number(jegy)
		F_addElem(tr,repeat,val)
	}
	
	arrTabQs = []
	for ( var x=0; x<arrOldQs.length; x++ ) {
		var i = arrOldQs[x]
		var qNev = arrQnev[i].qNev
		if ( arrTabQs.indexOf(qNev) == -1 ) {
			arrTabQs.push(qNev)
			F_createElem(qNev)
		}
	}
	
	var TRs = document.getElementById("table_oldQsTop").childNodes
	while ( TRs.length > 0 ) { table.appendChild(TRs[0]) }
	var TRs = document.getElementById("table_oldQsNorm").childNodes
	while ( TRs.length > 0 ) { table.appendChild(TRs[0]) }
	var TRs = document.getElementById("table_oldQsSkip").childNodes
	while ( TRs.length > 0 ) { table.appendChild(TRs[0]) }
	
	for ( var i=0; i<table.childNodes.length; i++ ) {
		var td = document.createElement("TD")
		td.innerHTML = Number(i) +1
		table.childNodes[i].insertBefore(td, table.childNodes[i].childNodes[0])
	}
}


// open LS
function F_openLS(content) {
	do {
		content = content.slice(content.indexOf("NEXTONE: ") +9)
		var phaseText = content.slice(0,content.indexOf("\n"));
		var variable = phaseText.slice(0,phaseText.indexOf(" == "));
		var price = phaseText.slice(phaseText.indexOf(" == ") +4);
		localStorage.setItem(variable, price)
	}
	while (phaseText.length > 1);
}
var fileInput = document.getElementById('fileinput');
fileInput.addEventListener('change', function(e){
	var file = fileInput.files[0];
	var textType = /text.*/;
	var content

	if (file.type.match(textType)) {
		var reader = new FileReader();

		reader.onload = function(e) {
			content = reader.result
			F_openLS(content)
		}

		reader.readAsText(file);    
	} else {
		alert("File not supported!")
	}
})
// download LS
var downA = document.createElement('a');
function F_downloadLS() {
	localStorage.setItem("newCount",0)
	
	var count = localStorage.getItem("lsCount")
	count = Number(count) +1
	localStorage.setItem("lsCount",count)
	var fileName = "localStorage" +count+ '.txt'
	
	var text = ""
	var lsLength = localStorage.length
	for ( var i=0; i<lsLength; i++ ) {
		text = text+ "NEXTONE: " +localStorage.key(i)+ " == " +localStorage.getItem(localStorage.key(i))+ "\n"
	}
	
	function F_downloadTXT(text,fileName){
		downA.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		downA.setAttribute('download', fileName);
		if (document.createEvent) {
			var event = document.createEvent('MouseEvents');
			event.initEvent('click', true, true);
			downA.dispatchEvent(event);
		} else {
			downA.click();
		}
	}
	F_downloadTXT(text,fileName)
}


function F_andrSize() { if ( isAndroid ) { 
	//document.body.style.fontSize = "300%" // android font size
	document.getElementById('link_style').href = 'styleAndroid.css'; // android li,table position
	
	//imgMiniHeight = "54px"
	document.getElementById('btn_toggleSearch').style.fontSize = '300%'
	document.getElementById('btn_toggleLoad').style.width = "60px"
	document.getElementById('btn_toggleLoad').style.height = "60px"
	document.getElementById('btn_clearIDB').style.width = "60px"
	document.getElementById('btn_clearIDB').style.height = "60px"
  } else {
	//imgMiniHeight = "18px"
	document.getElementById('btn_toggleSearch').style.fontSize = '300%'
	document.getElementById('btn_toggleLoad').style.width = "40px"
	document.getElementById('btn_toggleLoad').style.height = "40px"
	document.getElementById('btn_clearIDB').style.width = "40px"
	document.getElementById('btn_clearIDB').style.height = "40px"
} }
F_andrSize()
function F_tableScrollable(detElem) { // table ha nem fér ki, akkor vízszintesen scrollable (ANDROID)
/* Hogyan?
	✔ megnézi a detElem összes table child-ját
		detElem = amit megnyitottam (details / page)
	✔ feltételek: (1) visible (2) parentje még nem lett le kreálva
	✔ kreál egy parent div-et, ami overflow-X:auto
*/
	var allTable = detElem.getElementsByTagName("TABLE")
	for ( var i=0; i<allTable.length; i++ ) { 
		var tableElem = allTable[i]
		
		if ( isElementVisible(tableElem) == false ) { continue }
		if ( tableElem.parentElement.style.overflowX == "auto" ) { continue }
		
		// `element` is the element you want to wrap
		var parent = tableElem.parentNode;
		var wrapper = document.createElement('div');

		// set the wrapper as child (instead of the element)
		parent.replaceChild(wrapper, tableElem);
		// set element as child of wrapper
		wrapper.appendChild(tableElem);
		wrapper.style.overflowX = "auto"
	}
}

function F_clickWord(thatWord) { // midQ, syno
	// syno ➜ sorban következőt kiválasztja
	if ( thatWord.classList.contains("syno") ) {
		var synos = thatWord.dataset.syno
		synos = synos.split(" | ")
		if ( thatWord.innerHTML == synos[0] ) { 
			synos.push(synos[0])
			synos.shift()
			thatWord.dataset.syno = synos.join(" | ")
		}
		thatWord.innerHTML = synos[0]
	}
	
	// midQ
	if ( thatWord.classList.contains("midQ") ) {
		var impID = F_getImpID(thatWord)
		var path = F_getQPath(thatWord,impID) 
		prevMidQs.push(impID+" - "+path)
		var qText = F_getQText(path,impID)
		F_setMidQ(qText,path) 
	}
}

function F_synonyms(detElem) {
	function getRandomInt(max) { return Math.floor(Math.random() * Math.floor(max)) }
	var synonyms = detElem.getElementsByClassName("syno")
	for ( var x=0; x<synonyms.length; x++ ) {
		if ( isElementVisible(synonyms[x]) == false ) { continue }
		//if ( synonyms[x].dataset.syno == null ) { continue }
		
		//synonyms[x].style.fontStyle = "italic"
		//synonyms[x].style.textDecoration = "underline"
		synonyms[x].style.fontFamily = "Georgia"
		//synonyms[x].style.fontFamily = "Courier New"
		//synonyms[x].style.backgroundColor = "#FFFFB0"
		synonyms[x].style.cursor = "pointer"

		// egy randomot kiválaszt
		if ( synonyms[x].dataset.syno == null ) { 
			synonyms[x].dataset.syno = synonyms[x].innerHTML 
			var synos = synonyms[x].dataset.syno
			synos = synos.split(" | ")
			var num = getRandomInt(synos.length)
			synonyms[x].innerHTML = synos[num]
		}

		synonyms[x].onclick = function() { F_clickWord(this) }
	}
}

function F_answerQ(detElem) { 
	var trueA = detElem.getElementsByClassName("trueA")
	var tippA = detElem.getElementsByClassName("tippA")
	var falseA = detElem.getElementsByClassName("falseA")
	var answers = detElem.getElementsByClassName("answer")
	var hiddens = detElem.getElementsByClassName("hidden")
	//if ( trueA.length == 0 ) { return }
	
	if ( detElem.open != true ) {
		for ( var i=0; i<trueA.length; i++ ) { trueA[i].style.backgroundColor = "" }
		for ( var i=0; i<tippA.length; i++ ) { tippA[i].style.backgroundColor = "" }
		for ( var i=0; i<falseA.length; i++ ) { falseA[i].style.backgroundColor = "" }
		for ( var i=0; i<answers.length; i++ ) { answers[i].style.backgroundColor = answerColor }
		for ( var i=0; i<hiddens.length; i++ ) { hiddens[i].style.display = "none" }
		//return // ez nem tudom miért kellett anno, de kivettem így a search esetén is működik már
	}
	
	var div = detElem.getElementsByClassName("random")
	if ( div.length == 0 ) { return }
	if ( isElementVisible(div[0]) == false ) { return }
	var liA = div[0].getElementsByTagName("li")
	for (var i=0; i<liA.length; i++) { div[0].appendChild(liA[Math.random() * i | 0]) }
	
	//trueA = detElem.getElementsByClassName("trueA")
	//falseA = detElem.getElementsByClassName("falseA")
	for ( var x=0; x<answers.length; x++ ) { 
		answers[x].style.cursor = "pointer"
		answers[x].onclick = function(){
			for ( var i=0; i<trueA.length; i++ ) { trueA[i].style.backgroundColor = trueColor }
			for ( var i=0; i<tippA.length; i++ ) { tippA[i].style.backgroundColor = "yellow" }
			for ( var i=0; i<falseA.length; i++ ) {  falseA[i].style.backgroundColor = falseColor }
			for ( var i=0; i<hiddens.length; i++ ) { hiddens[i].style.display = "inline" }
			this.style.cursor = ""
			this.style.backgroundColor = ""
			this.style.color = QingBgBG
		}
	}
}

function F_abbrQ(detElem) { 
	var abbrQs = detElem.getElementsByClassName("abbr")
	for ( var i=0; i<abbrQs.length; i++ ) { 
		if (abbrQs[i].dataset.done == undefined) {
			var text = abbrQs[i].parentElement.innerHTML
			text = text.replace(abbrQs[i].innerHTML,"")
			text = text.slice(text.indexOf("</"))
			text = text.slice(text.indexOf(">")+1)
			abbrQs[i].parentElement.innerHTML = '<'+abbrQs[i].tagName+' class="'+abbrQs[i].className+'">'+abbrQs[i].innerHTML+'</'+abbrQs[i].tagName+'>' + '<span class="abbrAnswer" style="display:none">'+text+'</span>'
			
			abbrQs[i].dataset.done = "true"
			abbrQs[i].style.backgroundColor = abbrQBGcolor
			abbrQs[i].style.cursor = "pointer"
			
			abbrQs[i].onclick = function() {
				var spans = this.parentElement.getElementsByClassName("abbrAnswer");
				spans[0].style.display = "inline"
				this.style.backgroundColor = ""
				this.style.cursor = ""
				event.target.onclick = null;
			}
		}
		

	}
}

function F_starToggleAll() { // oldal betöltésénél váltson-e át Questelős nézetbe
	currPath = localStorage.getItem("hk.ToggleAll")
	F_loadAndSavePageText(localStorage.getItem("hk.ToggleAll"),true,true)
}

// –––––––––––––––  img BEGIN  –––––––––––––––
function F_imgClick(img) { // kinagyítás
	var centImg = document.getElementById("img_cent")
	var overlay = centImg.parentElement.parentElement
	var overlayBG = centImg.parentElement.parentElement.parentElement
	overlay.style.display = 'flex';
	centImg.src = img.src;
	overlay.scrollTo(0, 0); // Alaphelyzetbe állítjuk a scrollt
	overlayBG.style.visibility = "visible"
}
function F_loadIMGs(detElem) {
	var imgs = detElem.getElementsByTagName("IMG")
	for ( var i=0; i<imgs.length; i++ ) { 
		if ( isElementVisible(imgs[i]) == false ) { continue }
		if ( imgs[i].dataset.src == undefined ) { continue } // ha előtte a főoldalon megnyitottam már a Q-t, akkor nem kell újra betöltenie
		
		/*imgs[i].onerror = function(){
			var textVar = this.src.slice(this.src.lastIndexOf("/")+1)
			missImgs = missImgs + textVar + "\n"
		}*/
		
		imgs[i].src = "images/" + imgs[i].dataset.src
		imgs[i].removeAttribute("data-src")
		
		imgs[i].style.border = "3px solid black"
		if ( imgs[i].style.maxWidth == "" ) { imgs[i].style.maxWidth = "40%" }
		if ( imgs[i].style.float == "" ) { imgs[i].style.float = "right" }
	
		imgs[i].onclick = function() { F_imgClick(this) }
		if ( imgs[i].classList.contains("mini") == true ) {
			imgs[i].style.border = "2px solid DeepSkyBlue"
			imgs[i].style.maxHeight = "16px"
			//imgs[i].style.maxHeight = imgMiniHeight
			imgs[i].style.marginBottom = "-2px"
			imgs[i].style.float = "none"
			if ( isAndroid == false ) {
				imgs[i].onmouseover = function() { 
					var minImg = document.getElementById("img_mini")
					minImg.style.display = "inline-block" //block esetén új sor lenne; inline esetén nem lehetne width állítani
					minImg.src = this.src
					
					minImg.width = this.width*8
					//minImg.style.transform = "scale(8,8)"

					var posX = F_offsetXY(this,"2").left -minImg.width/2 +this.width/2
					var posXright = posX + minImg.width
					if ( posX < 0 ) {
						minImg.style.left = "0px"
					} else if ( document.body.clientWidth < posXright ) {
						posX = document.body.clientWidth - minImg.width -10/*border*/
						minImg.style.left = posX +"px"
					} else {
						minImg.style.left = posX +"px"
					}
					var posY = F_offsetXY(this,"2").top -minImg.height/2 +this.height/2
					minImg.style.top = posY +"px"
				}
			}
		}
	}
}
function F_loadCentImg() {
	var centImg = document.getElementById("img_cent")
	var overlayContent = centImg.parentElement
	var overlay = centImg.parentElement.parentElement
	var overlayBG = centImg.parentElement.parentElement.parentElement
	
	function F_setOverlayStyle() {
		centImg.style.maxWidth = "none"
		centImg.style.maxHeight = "none"
		centImg.style.cursor = "grab"
		centImg.style.display = "block"
		
		overlayContent.style.position = "relative"
		overlayContent.style.width = "max-content" /* A kép teljes szélességét kezeli */
		overlayContent.style.height = "max-content" /* A kép teljes magasságát kezeli */
		overlayContent.style.margin = "auto"
		
		overlay.style.position = "fixed"
		overlay.style.top = "50%"
		overlay.style.left = "50%"
		overlay.style.transform = "translate(-50%,-50%)" /* Középre helyezi a tartalmat */
		overlay.style.width = "90vw"
		overlay.style.height = "90vh"
		//overlay.style.backgroundColor = "rgba(0,0,0,0.8)"
		overlay.style.display = "none"
		overlay.style.zIndex = "1000"
		overlay.style.overflow = "scroll" /* Görgetés engedélyezése */
		
		overlayBG.style.position = "fixed"
		overlayBG.style.top = "5px"
		overlayBG.style.left = "5px"
		overlayBG.style.right = "5px"
		overlayBG.style.bottom = "5px"
		overlayBG.style.visibility = "hidden"
		overlayBG.style.zIndex = "4"
		overlayBG.style.backgroundColor = "rgba(0,0,0,0.7)"
	}
	F_setOverlayStyle()
	
	let isDragging = false;
	let startX, startY;
	var keepImg = false

	overlay.addEventListener('click', (e) => {
		if (e.target !== centImg) {
			overlay.style.display = 'none';
		}
	});
	centImg.addEventListener('mousedown', (e) => {
		keepImg = true
		isDragging = true;
		overlay.style.cursor = 'grabbing';
		startX = e.clientX + overlay.scrollLeft;
		startY = e.clientY + overlay.scrollTop;
		e.preventDefault();
	});
	overlay.addEventListener('mousemove', (e) => {
		if (!isDragging) return;

		const dx = startX - e.clientX;
		const dy = startY - e.clientY;

		overlay.scrollLeft = dx;
		overlay.scrollTop = dy;
	});
	overlayBG.addEventListener('mousedown', (e) => {
		if ( keepImg != true ) { overlayBG.style.visibility = "hidden" }
		keepImg = false
	});
	document.addEventListener('mouseup', () => {
		isDragging = false;
		overlay.style.cursor = 'grab';
	});
	
	if ( isAndroid == false ) {
		document.getElementById("img_mini").onmouseout = function() { this.style.display = "none" }
		document.getElementById("img_mini").onclick = function() {  F_imgClick(this) }
	}
}
F_loadCentImg()
function F_loadMiniImg() {
	if ( isAndroid == false ) {
		document.getElementById("img_mini").onmouseout = function() { this.style.display = "none" }
		document.getElementById("img_mini").onclick = function() {  F_imgClick(this) }
	}
}
F_loadMiniImg()
// –––––––––––––––  img END  –––––––––––––––

function F_loadElem(detElem) { // detailsok megnyitásánál is ezt a funkciót használjam!
	//console.log(detElem.innerHTML)
	//console.log("F_loadElem - start")
	F_loadImpQs(detElem)
	F_loadMidQs(detElem)
	F_loadIMGs(detElem)
	F_loadVideos(detElem)
	F_tableScrollable(detElem)
	F_synonyms(detElem)
	F_titleChange(detElem)
	F_answerQ(detElem)
	F_abbrQ(detElem)
	//console.log("F_loadElem - end")
	
	var allDetails = detElem.getElementsByTagName("details")
	for ( var i=0; i<allDetails.length; i++ ) { allDetails[i].ontoggle = function() { F_loadElem(this) } }
	
	// img-ek is!
	// stb.
}

document.body.onclick = function(){
	var span = document.getElementById("span_abbrTitle")
	span.dataset.status = span.dataset.status -1
	if ( span.dataset.status != 1 ) { span.style.display = "none" }
}














