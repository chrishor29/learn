// ●○■●○■●○■●○■

/*window.onerror = function(msg, url, linenumber) {
	alert('Error message: '+msg+'\nLine Number: '+linenumber);
}*/

/* PROJECT - PROGRESS
 ✖ prior alapból 3 legyen, csak akkor kelljen leírni, ha más
 ✖ Qtxt-t ne mentse el, csak expQ.html-nél. Csak a QuestCímet mentse el + mögé commentbe, hogy hány betűből áll a Qtxt. Azonban ha van még egy azonos nevű quest, akkor mentse el mindegyik Qtxt-ét --> hogy tudjam upgradelni. (ezekből nincs sok, így nem lesz gond)
 ✖ nextQ-ra kattintva gyorsan dobja a következőt (nézzem meg, miért szaggat - anat LS!!)
 ✖ imgLoad: expQ.html esetében a data-source-okat írja át HTMLimgLoc+datasrc -re, és így mentse el őket. utána az img beöltés: amelyik img láthatóvá válik, és datasrc-a van, azt töltse be a következőképp: (1) ha "images/"-el kezdődik, akkor bemásolja elé a LearnLoc-ot is (2) ha nem, akkor nem
 ✖ olyan opció kéne, hogy van egy tétel, akkor külön osztályozza azt, hogy eszembe jut-e miről kell beszélni, illetve magát azt amiről kell. Pl biológiai jelátvitel kérdésnél ha nemtudom miről kell, de amiről kéne azt tudom, akkor ne kelljen átismételnem az egészet, hanem tudjam, hogy csak az volt a hiba, hogy nemtudtam miről kell bezsélni! --> úgy kéne hogy elsőnek mindenkép megkérdezi, hogy adott tételnél mi kell tudni, majd ha azt megválaszoltam utána az alkérdések közt csak azt kell kifejtenem, ami miatt kidobta a kérdést. Annyi még, hogy az elején az altkérdéseket ne mutassa(osztályzásukat)!
 ✖ androidon mindig a kezdőoldalt töltse be (tehát hiába a questes aloldalon zártam be, ne azt töltse be
 ✖ zöldnél azt tudjam beállítani, hogy mennyi idő múlva dobja ki legközelebb (tehát ne csak 60/600/stb., hanem kérdésenként változó lehessen --> de ha nem állítok be semmit, akkor ahogy eddig is, a repeat-nél beállított lesz)
 ✖ impQ-t csak akkor töltse be innerHTML, ha megnyitom (+amikor kidobja questbe)
	[F_impQs newMethod] 9x gyorsabb mint az [F_impQs oldMethod] --> newMethod-dal töltsem be az összeset az elején: jelenleg azok hiányoznak, melyeket egy impQ-n belül kéne importálni. Azonban csak akkor importálja őket, ha szükség van rá (tehát a felette lévő details-ba még nincs benne) -->próbáltam már, ott is hagytam commentbe(#123#), de nem jön össze, mert baromi lassú
	az elején olvassa ki az altkérdéseket az imp-ből és table-ba(impID = prior,length,Qtxt) tenni. Ebból nézi a chance-t az előhívásra, ebből számolja tétel hány %, továbbá oldQcheck & upgradeQ esetében innen veszi ki a szöveget(ugyanis egy impQ-n belül lehet altkérdés, amit hiányolna különben). Tehát beírni innerHTML-be nem szükséges ilyenkor még --> ez kicsit komplikált, mert ha van még1 alt imp, akkor annak altkérdéseit is ki kell olvassa, és így tovább.. de megoldható --> ez szvsz gyorsabb
	azt is kéne majd, hogy a kérdéseket a (neve + hány betűből áll) alapján mentse el, és az alapján diagnosztizáljon ID-t --> többi table (Qid,txtLS,arrQtxt stb. fölös) --> elég arrQnames + impQTable + localstorage.getItem(qName) = LSid
	cutImpQ funkcióra nem lesz szükség --> ugyanis az elején regisztrálja be a questeket, szóval utána hiába kattolok rá majd valamire és tölti be őket, az nem zavar bele utána. Továbbá a feladatmegoldás során is amikor kidobja az uj questet, akkor mielőtt beimportálja az innerhtml-üket az impQ-knak, azzal dolgozzak
	((erre a lépésre lehet nincs szükség --> ugyanis lehet, hogyha megcisnálom azt, hogy az adott oldalon lévő impQ-kat ne LocalStorage-ből töltse már be, akkor megszűnik a probléma --> előbb csináljam azt meg)) <-- ezt próbáltam, de fail. Maga az innerHTML bemásolása tart sokáig, nem az LS betöltése
 ✖: F_impQbegin előtt létrehozott buttonok nem működnek

 ✖: autoUpgrade-lje a questet(ha változtattam a szövegét), de legyen lehetőségem megnézni melyeket upgradelte, és azoka közül törtölhessem, ha mégse kellett volna
 ✖ rep	min	hossz	left	still	average --> impQ-kat nemszámolja bele (1x belekéne)

 ✖: JS - download LS crash - FIX -> először találjam meg a hibát, mert nem mindig van: ezt út csináljam, hogy csinálok egy localstorage mappát, amibe lesznek v1 v2 v3 stb almappák.
 
 ✖: vizsgaskip &#10140; ne JS-be, hanem LS-be mentse el
 ✖: betöltésben mi tart soká, teszteljem (kiíratom console-ba mennyi idő telt el egyes funkciók közt)

 ✖: expQ-k --> csak a az expQs html-be lévőket mentse el LS-be (új számozás legyen és külön szvsz: tehát a többi localisan a fájlba)
 ✖: LS-méret a vizsgaskippedeknél ha van 500, akkor szinte lefagy (azt fixáljam)
 ✖: F_SpanRepNew + F_SpanRepOld --> rákattolva jelenjenek meg a questek, hogy mennyi idő van belőlük vissza
 ✖: ha zöldra van állítva a dobhat új kérdéseket, akkor még1et rákattolva először legyen kék ami azt jelenti random újat dob következőnek (nem az épp soron következőt)
 ✖: skipek típusa: (KÉK) vizsgáig már nem (FEKETE) Nem volt rá időm (SZÜRKE) vizsga előtt dobja ki őket újra 
 
 ✖: importált Q esetében a mini IMG-re klikkelve nem működik a script, amennyiben visszamegyek a főoldalra, majd újra a Q-hoz
 
 ✖: upgradeQ -->  ha nincs olyan című quest, akkor kiírja az összeset, és kikereshetem. (legyen valami search funkció)
 
 ✖: legyen egy funkció, amivel összes img-et betölti, és amelyiknél hiba van, azt jelezze valahol (de ne alertbe) --> anno ezt írtam <img onerror="alert(this.src)" data-src="gltkklkkjmnm.png">
 ✖: Qid-t vegyem ki!!!

 ✖: legyen egy funkció az elején, ami lecsekolja, van-e azonos id-n különböző Qtext
 ✖: notepad: macro for impQ
 ✖: autoSave LS --> jó lenne, ha az utolsó 3 maradna csak meg mindig (tehát felülírná őket valahogy)
 
 ✖: nextQ-nál egyből töltse be az img-eket
 ✖: 'F_calculateThis()' --> ezt használom: 'F_kerdesStatus' & 'F_temakorStatus' --> valahogy egyszerűsítsem majd le
––––––––––––––––––––––––––––––––––––––––––––––––
 ✖: F_ButtonRepFast
 ✖: DATA-SRC IMG: ha egy kérdést megnyitok, akkor betölti a képeit -> ezzel azonban átíródik ugye a Qtext -> ha ezután kattolok rá jobbfelső toggleAll buttonra, akkor az F_checkQs-ban nem találja meg a Qtext-et mert azoknak megváltozott
––––––––––––––––––––––––––––––––––––––––––––––––
 ✖: note & fix-re elég egy button (egyoldalon legyen a kettő)
 ✖: EXP.html &#10140; load it first, then jump to the page
––––––––––––––––––––––––––––––––––––––––––––––––
 ✖: skip-nél a perma skippesek máshol legyenek
 ✖ /keressek rá erre a kommentre, és megértem:/ erre akkor van szükség, ha legfelül nem kérdés van (tehát a legfelül lévő details nem kérdés, csak egy összegző details, pl. élettan ozmózis), ugyanis annak nincs LSid elmentve, így nemtudok note-t menteni neki (persze optimálisabb lenne, ha itt is a legfelsőhöz lenne csatolva, de egyenlőre kihagyom mert nem bonyolítom, és LowPrior)
*/

/* PROJECT - DONE
 ✔ élettan 8.1 -> gliasejtek img-eit nem tölti be (expQ imgLoad még hibás)
 ✔: js: skipDate / adott tárgy
 ✔: QuantumFirefox Tablet: video click nél csak a control-bar jelenik meg. Szvsz csináljak egy láthatatlan buttont a videóra, amire írok scriptet.
 ✔: importQ-t változtatva, ne kelljen upgradelni azt a Q-t, melyben az importQ mint alkérdés szerepelt
 ✔: upgradeQ -->  ha van olyan című és 1db, akkor 0-ra tegye!!
 ✔: div_Skip.innerHTML beállítása nemjó. Ugyanis ha már van kb.50db amit skippelek és megnyitom, akkor szétfagy az egész.
 ✔: tableten az expQ megnyitása után nem tud visszamenni az oldalra (ugyanis a 'window.location.pathname' = null androidon szvsz)
 ✔: skippedek megnyitása nem működik
 ✔: importált Q-t ha megváltoztatom, akkor ne kelljen upgradelnem a questet (mert ha van egy importált quest, amit 6 helyen használok, akkor egy betűt abban átírva, mind a 6questet fel kell upgradelnem és fárasztó --> helyette automatikusan upgradelje, ha más nem változott)
 ✔: mutassa hány %-on tartok a kijelölt tételek megtanulásával --> valamiért a 10es terjedelműt 1-nek veszi
 ✔: tételek buttonja (miniTétel button legyen)
 ✔: upgrade Q-nál alapból az 1-es legyen kijelölve, ne a skip
 ✔: noteQ --> tehát ha írok megjegyzést, LS-be mentse el, és töltse be
 ✔: saveLS (stb.) button klikknél színes legyen
 ✔: autoSave LS --> általam kiválasztott db osztályzásonként (pl. 3,10)
 ✔: csekkolja, hogy az LSid biztos ne legyen foglalt már valahogy, hogy nehogy az Expid és pure_LSid-s azonosat kapjon, ha igen akkor mégis javítsa!
 ✔: localStorage(ExpID,LSid) formátumban legyen elmentve, mert a Qtext az ott lesz csak simán LSid-hez csatoltan!!
 ✔: summary-nél valami jelezze, ha meg van nyitva
 ✔: import Q image -> minden html tetején lesz egy variable, amiben benne van az IMAGES\'adott tárgy mappa' címe. ezt az expid mellé csatolja a Qtextbe. A képek betöltésénél (data-src helyett src) ezt írja hozzá.
*/

/* localStorage-be lehet objectset (arrayt is, az egyszerűbb, és ugyanennyit ér mint az objects, tehát nemjutok vele előrébb) menteni (de ezzel se jutok többre, csak 'nehezebb kezelni'(egyébként csak kicsivel, de sajna fölös, szóval minek), de azért megőrzöm)
isayyes = true
for ( var i=0; i<kerdesek.length; i++ ) {
	if (isayyes == true) {
		var person = {
			 firstName : "John",
			 lastName  : "Doe",
			 age       : 50,
			 eyeColor  : "blue"
		};

				var Qtext = '<details class="' + kerdesek[i].className + '">' + kerdesek[i].innerHTML + "</details>"
				person.Qtext = "id.107"
		localStorage.setItem("savedData", JSON.stringify(person));
		var objects = JSON.parse(localStorage.getItem("savedData"));
		alert(objects.Qtext)
		isayyes = false
	}
}
*/


/*function F_hash(str){
	var hash = 0;
	if (str.length == 0) return hash;
	for (var i = 0; i < str.length; i++) {
		 char = str.charCodeAt(i);
		 hash = ((hash<<5)-hash)+char;
	}
	return hash;
}*/


/* compress & decompress
	var string = document.body.innerHTML
	var compressed = LZString.compress(string);
	var compressed = LZString.compressToUTF16(string);
	var compressed = LZString.decompress(string);
	var compressed = LZString.decompressFromUTF16(string);
*/

//document.getElementById("testimage").src = document.getElementById("testimage").title


var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");


var myTime
var oldTime = false
function F_getTime(){
	var myDate = new Date()
	myTime = myDate.getTime() /1000
	if ( oldTime == false ) { oldTime = myTime }
}
F_getTime()

var fileName
function checkExpQHtml(){ // oldal betöltésénél ugorjon el expQkat importolni, ha régen volt!
	F_getTime()
	var diffTime = myTime-oldTime
	console.log("– checkExpQHtml – " + diffTime)
	
	var path = window.location.pathname;
	fileName = path.split("/").pop();
	fileName = htmlIMGloc.slice(0,htmlIMGloc.indexOf("images/")) + fileName
	var lastPage = localStorage.getItem("loadQs.lastPage")
	var datum = new Date();

	if ( fileName == "expqs.html" ) {
		var lastTime = datum.getTime();
		localStorage.setItem("loadQs.lastTime",lastTime)
		if ( lastPage != null ) {
			window.location.href = lastPage
		}
	}

	var thisTime = datum.getTime();
	var lastTime = localStorage.getItem("loadQs.lastTime")
	var diffTime = thisTime - lastTime
	diffTime = diffTime /60000 /60 // óra

	if ( diffTime > 24 ) {
		if ( isAndroid ) { 
			alert("látogasd meg a tárgyválasztás weboldalon az 'expqs.html' oldalt (több tárgynál használt kérdéseket onnan tölti be)")
		} else {
			var expLoc = htmlLEARNloc + "expqs.html"
			localStorage.setItem("loadQs.lastPage",fileName)
			window.location.href = expLoc
		}
	} else {
		localStorage.removeItem("loadQs.lastPage")
	}
}
checkExpQHtml()

var kerdesek = document.getElementsByClassName("kerdes")
if ( localStorage.getItem("hkQ.max") === null ) { localStorage.setItem("hkQ.max",0) } 

function func_abbrSet(elem){ 
// azt csináljam, hogy a li textet írja át alapból: <span style="visibility:hidden"> ..text.. <span>, majd amikor ráklikkelek removeolja a spant --> megmaradnak a pontok
// func_saveQuest előtt kell legyen, de a F_impQs után
	var abbrSpan = elem.getElementsByTagName("*");
	for ( var j = 0; j < abbrSpan.length; j++ ) {
		if ( abbrSpan[j].className == "abbr" ) {
			if ( elem.open != false ) {
				abbrSpan[j].style.cursor = "pointer"
				if ( !abbrSpan[j].Text ) {
					abbrSpan[j].parentElement.style.visibility = "hidden"
					abbrSpan[j].style.visibility = "visible"
					abbrSpan[j].style.backgroundColor = "Bisque";
				}
			} 
			abbrSpan[j].onclick = function(){
				if ( this.parentElement.style.visibility != "visible" ) { 
					this.style.cursor = ""
					this.style.backgroundColor = "";
					this.parentElement.style.visibility = "visible"
				}
			}
		}
		if ( abbrSpan[j].className == "abbrX" ) {
			abbrSpan[j].style.cursor = "pointer"
			if ( !abbrSpan[j].Text ) {
				abbrSpan[j].style.opacity = "0"
				abbrSpan[j].style.backgroundColor = "Bisque";
			}
			abbrSpan[j].onclick = function(){
				if ( this.style.opacity != "1" ) { 
					this.style.cursor = ""
					this.style.backgroundColor = "";
					this.style.opacity = "1"
				}
			}
		}
	}
}

var arrOLDtxt = [] // Qtxt to LSid
var arrNEWid = [] // LSid to Qtxt

var txtLS = [] // Qtxt to LSid --> cseréljem le erre: localStorage.getItem(Qname)

var arrQid = [] // Qid to Qtxt
var arrQtxts = []  // arra kell, hogy upgradeQ-nál ezekből nézi meg mikre lehet
var arrQtxtsImp = []  // ugyanaz, mint előbbi: csak itt már impet kivágva

var arrQnames = []  // Qname + characterCount (csak ez legyen majd a végén, többi szvsz fölös)

var missQs = []

var Qcount = 0



function F_checkMissImgs(){
	var MissIMGS = []
	var testImg = document.getElementById("testMiss")
	testImg.onerror = function(){ console.log("error: "+this.src) }; 
	var Allimgs = document.getElementsByTagName("img")
	for ( var i=0; i<Allimgs.length; i++ ) {
		testImg.src = "images/" + Allimgs[i].dataset.src
		alert("stop")
	}
}
//F_checkMissImgs()
function F_checkDelImgs(){
	var deleteIMGs = []
	var allIMGs = document.getElementById("allimagesTXT").innerHTML
	allIMGs = allIMGs.slice(allIMGs.indexOf("\n")+1);
	var count = (allIMGs.match(/\n/g) || []).length
	var innHTML = document.documentElement.innerHTML
	innHTML = innHTML.slice(innHTML.indexOf("</div>")+5)
	alert(count)
	for ( var i=0; i<count; i++ ) {
		var fileName = allIMGs.slice(0,allIMGs.indexOf("\n"));
		allIMGs = allIMGs.slice(allIMGs.indexOf("\n")+1);
		fileName = fileName.slice(fileName.indexOf("images")+7,-1)
		if ( innHTML.indexOf(fileName) == -1 ) {
			var testName = fileName.slice(0,fileName.indexOf("."))
			if ( testName.endsWith("m") != true ) {
				deleteIMGs.push(fileName) 
			}
		}
	}
	for ( var i=0; i<deleteIMGs.length; i++ ) {
		console.log(deleteIMGs[i])
	}
	alert("stop")
}
//F_checkDelImgs()


function F_getTexts(){
	//alert(document.title+"_Qtext")

	var fullString = localStorage.getItem(document.title+"_LSids")
	if ( fullString ) {
		//alert(fullString)
		fullString = fullString.split(" ") // első alkalommal különben error lesz
		for ( var i=0; i<fullString.length; i++ ) {
			if ( fullString[i] != "" ) {  // utolsó mindig ez, és azt ne tegye array-ba
				var LSid = fullString[i]
				var Qtext = localStorage.getItem(LSid)
				//Qtext = LZString.decompressFromUTF16(Qtext)
				arrOLDtxt[Qtext] = LSid
				//console.log("LSid: "+LSid)
				//console.log("Qtext: "+Qtext)
			}
		}
	}
}

function F_newLSid(){
	var LSid
	//F_fixMissQs()
	/*if ( missQs[0] ) {
		LSid = missQs[0]
		missQs.splice(0,1)
	} else {*/
		LSid = parseInt(localStorage.getItem("hkQ.max"))+1
		localStorage.setItem("hkQ.max",LSid)
		LSid = "hkQ."+LSid
		
		// erre szükség van még
		localStorage.removeItem(LSid+"_skip")
		localStorage.removeItem(LSid+"_note")
		localStorage.removeItem(LSid+"_jegy")
		localStorage.removeItem(LSid+"_repeat")
		localStorage.removeItem(LSid+"_idopont")
	// }
	if ( LSid == "undefined" ) { alert("UNDEFINED") }
	return LSid
}

var elems = document.body.getElementsByTagName("*");
var wrongEXPid = "foglalt vagy upgradelve lett:<br>"

var newText
function F_cutImpQs(text){
	// kivágom a <span class="imp [x]"> itt lévő szöveget vágom ki </span> (div-nél is)
	
	do {
		var begin = text.indexOf('class="imp [')
		var end
		var cuttenText
		var otherText = ""
		
		cuttenText = text.slice(begin)
		begin = begin + cuttenText.indexOf(">") +1
		cuttenText = text.slice(begin)
		
		if ( cuttenText.indexOf('class="imp [') != -1 ) {
			var num = 0
			otherText = cuttenText
			do {
				if ( otherText.indexOf('class="imp [') != -1 && otherText.indexOf('class="imp [') < otherText.indexOf("> <!---") ) {
					num = num +1
					otherText = otherText.slice(otherText.indexOf('class="imp [')+1)
				} else if ( num > 0 ) {
					num = num -1
					otherText = otherText.slice(otherText.indexOf('> <!---')+1)
				}
			}
			while ( num > 0 )
		}
		
		if ( otherText.indexOf('> <!---') != -1 ) {
			end = cuttenText.indexOf(otherText) + otherText.indexOf('> <!---') + begin
			//alert("van" + end)
		} else {
			end = cuttenText.indexOf('> <!---') + begin
		}
		cuttenText = text.slice(begin,end)
		cuttenText = cuttenText.slice(0,cuttenText.lastIndexOf("<"))
		
		text = text.replace(cuttenText,"")
		findNext = text.slice(text.indexOf('class="imp ['))
	}
	while (findNext.indexOf('class="imp ['))
	newText = text
}

var qName
function F_QtxtQname(Qtxt){
	qName = Qtxt.slice(Qtxt.indexOf("<summary"),Qtxt.indexOf("</summary>"))
	qName = qName.slice(qName.indexOf(">")+1)
}

function F_checkEXPs(){ /* ez egyenlőre előbb kell legyen, mint a CheckQs különben id-t kapnak az import Q-ek, amiből baj lesz.. Vegyem ki az id-t, mert az fölös amúgy is */
	for ( var i = 0; i < elems.length; i++ ) {
		var elem = elems[i]
		if ( elem.className.indexOf("{") > -1 ) {
			var begin = elem.className.indexOf("{")
			var end = elem.className.indexOf("}")
			var EXPid = elem.className.slice(begin+1,end)
			if ( Number(EXPid) > localStorage.getItem("hkExp.max") && fileName == "expqs.html" ) {
				localStorage.setItem("hkExp.max",EXPid) 
			}
			var Qtext = '<details class="' +elem.className+ '">' +elem.innerHTML+ "</details>"
			var LSid = false
			if ( localStorage.getItem("hkExpQ."+EXPid) ) {
				var string = localStorage.getItem("hkExpQ."+EXPid)
				LSid = string.slice(0,string.indexOf(" "))
				if ( LSid.slice(0,8) == "hkQ.hkQ." || LSid == "hkQ.null" ) {
					alert("hiba a kódban: "+LSid)
					LSid = F_newLSid()
				}
			} else {
				LSid = F_newLSid()
			}
			localStorage.setItem(LSid,Qtext)
			txtLS[Qtext] = LSid
			localStorage.setItem("hkExpQ."+EXPid,LSid+" "+htmlIMGloc)
		}
	}
}
F_checkEXPs()

function F_checkQs(){
	F_getTime()
	var diffTime = myTime-oldTime
	console.log("– F_checkQs BEGIN – " + diffTime)
	
//console.clear()
	for ( var i=0; i<kerdesek.length; i++ ) { 
		var Qelem = kerdesek[i]
		var Qtxt = '<details class="' +Qelem.className+ '">' +Qelem.innerHTML+ "</details>"
		F_QtxtQname(Qtxt)
		var Qname = qName
		count = Qname+ "<!--" +Qtxt.length+ "-->"
		Qelem.innerHTML = Qelem.innerHTML.replace(Qname,count)
		arrQnames[count] = true
//console.log(count)
		Qtxt = '<details class="' +Qelem.className+ '">' +Qelem.innerHTML+ "</details>"
		Qcount = Qcount+1
		Qelem.id = "Q."+Qcount
		arrQid["Q."+Qcount] = Qtxt
		arrQtxts.push(Qtxt)
	}
//alert("stop")
	
	F_getTime()
	var diffTime = myTime-oldTime
	console.log("– F_checkQs END – " + diffTime)
}
if ( fileName != "expqs.html" ) {
	F_checkQs()
}

function F_checkImpQs(){
//console.clear()
	for ( var i=0; i<kerdesek.length; i++ ) { 
		if ( kerdesek[i].id == false ) {
			var Qelem = kerdesek[i]
			var Qtxt = '<details class="' +Qelem.className+ '">' +Qelem.innerHTML+ "</details>"
			F_QtxtQname(Qtxt)
			var Qname = qName
			var count = Qname
//console.log(Qname)
			
			if ( Qname.slice(-3) != "-->" ) {
				count = Qname+ "<!--" +Qtxt.length+ "-->"
				Qelem.innerHTML = Qelem.innerHTML.replace(Qname,count)
			}
			arrQnames[count] = true

			Qtxt = '<details class="' +Qelem.className+ '">' +Qelem.innerHTML+ "</details>"
			Qcount = Qcount+1
			Qelem.id = "Q."+Qcount
			arrQid["Q."+Qcount] = Qtxt
			arrQtxts.push(Qtxt)
			
		}
	}
//alert("stop")
}

var changeStatus = false
function F_oldQchange(oldLSid){
	//console.clear()
	var oldQtxt = localStorage.getItem(oldLSid)
	console.log("– – – – F_oldQchange – – – –")
	console.log("oldLSid: "+oldLSid)
	//console.log("oldQtxt: "+oldQtxt)
	changeStatus = true
	document.getElementById("div_upgQ").style.display = 'block';
	
	var jegy = localStorage.getItem(oldLSid+"_jegy")
	var repeat = localStorage.getItem(oldLSid+"_repeat")
	var date = new Date();
	var idopont = Math.floor(date.getTime()/60000) - localStorage.getItem(oldLSid+'_idopont')
	if ( jegy != null ) {
		document.getElementById("div_oldJEGY").innerHTML = repeat+" – "+idopont
	} else {
		document.getElementById("div_oldJEGY").innerHTML = "– – –"
	}
	
	var newQtxt
		
	
	var arrNEWtxt = []
	F_QtxtQname(oldQtxt)
	var summaryQ = qName.slice(0,qName.lastIndexOf("<!--"))
	console.clear()
	console.log(oldQtxt)
	
	for ( var i=0; i<kerdesek.length; i++ ) { 
		var Qelem = kerdesek[i]
		var Qtext = '<details class="' +Qelem.className+ '">' +Qelem.innerHTML+ "</details>"
		F_QtxtQname(Qtext)
		var Qname = qName
		Qname = Qname.slice(0,Qname.lastIndexOf("<!--"))
		if ( Qname == summaryQ && arrNEWtxt.indexOf(Qtext) == -1 ) {
			console.log(Qtext)
			arrNEWtxt.push(Qtext)
		}
	}
	document.getElementById("div_upgQ").innerHTML = defaultText + oldQtxt + "<hr>" // utána kell legyen, különben ezt is beleveszi a kerdesek[i]-be
	//alert("stop")
	
	
	//impQ-kat is át kell nézze, ha nem lesznek importálva kapásból --> azok egy tömbbe legyenek (impId = Qtxt), és a Qtxt-eket átnézi
	
	/*for ( var i=0; i<arrQtxts.length; i++ ) { 
		var Qtext = arrQtxts[i]
		var summaryQnew = Qtext.slice(Qtext.indexOf("<summary")+9,Qtext.indexOf("</summary>"))
		if ( summaryQ == summaryQnew ) {
			//alert(Qtext)
			arrNEWtxt.push(Qtext)
		}
	}*/

	// skip BEGIN
		var option = document.createElement("option")
		option.id = "option_ReplaceQ_skip"
		document.getElementById("select_replaceQ").appendChild(option)
		var text = document.createTextNode(" ––– ")
		option.appendChild(text)
	// skip END
	for ( var i=0; i<arrNEWtxt.length; i++ ) {
	//for ( newLSid in arrNEWid ) {
		var newQtxt = arrNEWtxt[i]
		var text = document.getElementById("div_upgQ").innerHTML // (kell hogy megőrizze a buttont + selectet)
		document.getElementById("div_upgQ").innerHTML = text + newQtxt
		var x = i +1
		if ( !document.getElementById("option_ReplaceQ_"+x) ) {
			var option = document.createElement("option")
			option.id = "option_ReplaceQ_"+x
			document.getElementById("select_replaceQ").appendChild(option)
			var text = document.createTextNode(x)
			option.appendChild(text)
		}
		//document.getElementById("option_ReplaceQ_"+i).value = newLSid
	}
	if ( arrNEWtxt.length == 1 ) { 
		document.getElementById("select_replaceQ").value = 1 
		// itt valami autoupgrage kéne, ha megegyezik nagyjából, így gyorsabb (ha feltétel azért szükséges, mert sajna azis lehet, hogy két ugyanolyan nevű kveszt volt, és egyiknek megváltoztattam a nevét, erre a másikra akarja felupgradelni) --> ha két azonos nevű Q van, jelezze őket oldal betöltésnél már, és tána írok commentbe mögé egy v1/2/3 stb.-t
	} else {
		// alert("stop")
	}
	
	document.getElementById("select_replaceQ").onchange = function() {
		var value = document.getElementById("select_replaceQ").value
		var Qtxt = arrNEWtxt[value]
		var LSid = arrOLDtxt[Qtxt]
		if ( typeof LSid !== "undefined" ) {
			var jegy = localStorage.getItem(LSid+"_jegy")
			var date = new Date();
			var idopont = Math.floor(date.getTime()/60000) - localStorage.getItem(LSid+'_idopont')
			document.getElementById("div_newJEGY").innerHTML = jegy+" – "+idopont
		} else {
			document.getElementById("div_newJEGY").innerHTML = "– – –"
		}
	}
	
	document.getElementById("button_replaceQ").onclick = function() {
		console.log("– button_replaceQ CLICK")
		
		var value = document.getElementById("select_replaceQ").value

		if ( value != "–––" ) {
			var Qtxt = arrNEWtxt[value-1]
			localStorage.setItem(oldLSid,Qtxt)
			arrQtxts.push(Qtxt)
		} else {
			localStorage.removeItem(oldLSid)
			// note idő stb. is remove-olni kéne !!!
			
			var fullString = localStorage.getItem(document.title+"_LSids")
			fullString = fullString.replace(" "+oldLSid,'')
			localStorage.setItem(document.title+"_LSids",fullString)
		}
		F_oldQcheck()
		func_calcOldNew()
	}
	var allDetails = document.getElementById("div_upgQ").getElementsByTagName("details")
	for ( var i=0; i<allDetails.length; i++ ) {
		allDetails[i].ontoggle = function(e){
			F_loadImgVideo(this,e)
			if ( isAndroid ) { F_setAbbrAndroid(this) }
		}
	}

}

function F_setAbbrAndroid(detElem) {
	var allAbbr = detElem.getElementsByTagName("abbr")
	for ( var i=0; i<allAbbr.length; i++ ) {
		allAbbr[i].style.lineHeight = "30"; 
	}
}


function F_oldQcheck(){
	console.log("– F_oldQcheck")
	var oldString = []
	//localStorage.setItem(document.title+"_LSids","")
	var fullString = localStorage.getItem(document.title+"_LSids")
	// azon LSid-ket kiveszi, amik már ExpQ-k lettek, és más LSid-t kaptak
	//console.log(fullString)
	if ( fullString ) {
		//console.log(fullString)
		fullArray = fullString.split(" ") // első alkalommal különben error lesz
		for ( var i=0; i<fullArray.length; i++ ) {
			if ( fullArray[i] != "" && fullArray[i] != "null" ) {  // ilyenek belekerülnek valamiért (replace-nél)
				var LSid = fullArray[i]
			//localStorage.removeItem(LSid+'_idopont')
			//localStorage.removeItem(LSid+'_jegy')
				var Qtext = localStorage.getItem(LSid)
				if ( Qtext == null ) {
					alert(LSid+" Qtxt is null. so its removed")
					var defString = localStorage.getItem(document.title+"_LSids")
					defString = defString.replace(LSid,'')
					localStorage.setItem(document.title+"_LSids",defString)
				} else {
					var EXPid = Qtext.indexOf("summary")
					EXPid = Qtext.slice(0,EXPid) 
					if ( EXPid.indexOf("{") != -1 ) { 
						var begin = EXPid.indexOf("{")
						var end = EXPid.indexOf("}")
						EXPid = EXPid.slice(begin+1,end)
						var string = localStorage.getItem("hkExpQ."+EXPid)
						expLSid = string.slice(0,string.indexOf(" "))
						if ( expLSid != LSid ) {
							console.log("LSid delete, mert EXPid-s lett a quest. LSid: " +LSid+ " & EXPid: " +EXPid) 
							//alert("LSid: " +LSid+ " & EXPid: " +EXPid) 
							var defString = localStorage.getItem(document.title+"_LSids")
							defString = defString.replace(LSid,'')
							localStorage.setItem(document.title+"_LSids",defString)
						}
					}
				}
			}
		}
	}
	
	function doStuffs(LSid){
		var Qtext = localStorage.getItem(LSid)
		var jobDone = "false"
		F_QtxtQname(Qtext)
		Qname = qName
		if ( arrQnames[Qname] == true ) { jobDone = true }
		localStorage.setItem(Qname,LSid)
		txtLS[Qtext] = LSid // ettől majd szabaduljak meg (az egész tömbtől)
	
		if ( jobDone == "false" ) {
			var jegy = localStorage.getItem(LSid+"_jegy")
			var skip = localStorage.getItem(LSid+"_skip")
			if ( jegy != null || skip != null ) {
				oldString.push(LSid)
			} else {
				console.log("remove Old: "+LSid)
				localStorage.removeItem(LSid)
				// note idő stb. is remove-olni kéne !!!
				fullString = fullString.replace(LSid,'')
				localStorage.setItem(document.title+"_LSids",fullString)
			}
		}
	}
	
	// upgradelt Q-ket csekkolja
	var fullString = localStorage.getItem(document.title+"_LSids")
	if ( fullString ) {
		//console.log(fullString)
		fullArray = fullString.split(" ") // első alkalommal különben error lesz
		for ( var i=0; i<fullArray.length; i++ ) {
			if ( fullArray[i] != "" && fullArray[i] != "null" ) {  // ilyenek belekerülnek valamiért (replace-nél)
				var LSid = fullArray[i]
				if ( LSid != "null" ) {
					doStuffs(LSid)
				}
			}
		}
	}

	var oldQtxt
	var oldLSid = false

	var size = oldString.length;
	if ( size > 0 ) {
		document.getElementById("btn_upgQ").value = size
	} else {
		document.getElementById("btn_upgQ").style.display = 'none'
	}
	

	if ( size > 0 ) { // itt nem kell for ciklus, elég csak megnézni, hogy van-e egy, hiszen amikor rákattolok az upgrade-re, akkor kidobja kövit
		for ( var i=0; i<oldString.length; i++ ) {
			var LSid = oldString[i]
			if ( LSid != 0 ) { //valamiért van ilyen is benne
				F_oldQchange(LSid) 
				//delete arrOLDtxt[oldQtxt]
				break;
			}
		}
	} else { // ez 1x mindenképp lefut (max a legvégén, amikor már az összes upgradeQ megvolt)
		document.getElementById("div_upgQ").innerHTML = ""
		document.getElementById("div_upgQ").style.display = 'none'
	}
	
}

var myTestTable = []

function escapeRegExp(oldTxt) {
	return oldTxt.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(string,oldTxt,newTxt) {
	return string.replace(new RegExp(escapeRegExp(oldTxt), 'g'), newTxt);
}		
//INNERhtml = replaceAll(INNERhtml, oldTxt, newTxt)

// pl. ez a button nem fog működni, mert az impQbegin előtt van!
/*var buttonX = document.createElement("BUTTON")
buttonX.innerHTML = "anyad"
document.body.appendChild(buttonX)
buttonX.style.position = "absolute"
buttonX.style.right = "100px"
buttonX.style.top = "20px"
buttonX.onclick = function(){ 
	alert("sajt")
}*/
function F_impQbegin(){ // 1ms/Q a betöltési ideje (POWER SAFER-re az aksi, így lassabb, de pontosabban mérhetők az eltérések)
	F_getTime()
	var diffTime = myTime-oldTime
	//console.log("– F_impQs newMethod BEGIN – " + diffTime)
	
	var MISSid = ""
	
	var oldHTML = document.documentElement.innerHTML
	var newHTML = ""
	
	var Qtxt = ""
	function F_getImpQtxt(impBlock){
		var begin = impBlock.indexOf("[") +1
		var end = impBlock.indexOf("]")
		var EXPid = impBlock.slice(begin,end)

		if ( EXPid.indexOf("-") != -1 ) { EXPid = EXPid.slice(0,EXPid.indexOf("-")) } 
		var string = localStorage.getItem("hkExpQ."+EXPid)
		//console.log(EXPid)


		if ( string != null ) {
			var LSid = string.slice(0,string.indexOf(" "))
			Qtxt = localStorage.getItem(LSid)
		} else {
			MISSid = MISSid + EXPid + ","
		}
		if ( impBlock.indexOf("hide") != -1 ) {
			var title = Qtxt
			title = title.slice(0,title.indexOf('</summary>'))
			title = title.slice(title.indexOf('<summary'))
			title = title.slice(title.indexOf('>')+1)
			title = "<strong>"+title+"</strong>"
			Qtxt = Qtxt.replace('<ul class="normal">', '<ul class="normal">'+title);

			Qtxt = Qtxt.replace(/kerdes/g, "");
		}
		//console.log(EXPid)
	}
	
	var count = 0
	if ( oldHTML.indexOf(' class="imp [') != -1 ) { 
		do {
			count = count +1
			Qtxt = ""
			var divSpan = ""
			if ( oldHTML.indexOf('<div class="imp [') == -1 ) {
				divSpan = "span"
			} else if ( oldHTML.indexOf('<span class="imp [') == -1 ) {
				divSpan = "div"
			} else if ( oldHTML.indexOf('<div class="imp [') > oldHTML.indexOf('<span class="imp [') ) {
				divSpan = "span" // span volt valamiért és átírtam div-re, de lehet rossz (mert error-ozott, és így jó lett)
			} else {
				divSpan = "div"
				//if ( oldHTML.indexOf('<div class="imp [') == -1 ) { alert(oldHTML.indexOf('<span class="imp [')) }
			}
			/*console.clear()
			console.log("div: "+oldHTML.indexOf('<div class="imp ['))
			console.log("span: "+oldHTML.indexOf('<span class="imp ['))
			console.log(oldHTML)
			console.log('<'+divSpan+' class="imp [')*/
			
			var impBlock = oldHTML.slice(oldHTML.indexOf('<'+divSpan+' class="imp ['))
			newHTML = newHTML + oldHTML.slice(0,oldHTML.indexOf('<'+divSpan+' class="imp ['))
			oldHTML = oldHTML.slice(oldHTML.indexOf('<'+divSpan+' class="imp ['))
			
			impBlock = impBlock.slice(0,impBlock.indexOf('">')+2)
			newHTML = newHTML + impBlock
			oldHTML = oldHTML.slice(oldHTML.indexOf('">')+2)
			
			F_getImpQtxt(impBlock)
			
			//(#123#) --> itt csak addig jutottam, hogy megkeresse a parent detailst, amiben meg kell nézze, nincs-e már importálva a quest... de már ez se jó, mert túl lassú
			if ( Qtxt.indexOf(' class="imp [') != -1 ) {
				var impedQk = ""
				var parentTXT = newHTML
				
				
				if ( parentTXT.lastIndexOf("<details") < parentTXT.lastIndexOf("</details") ) {
					var bad = 0
					var startP = parentTXT.length
					var endP = parentTXT.length
					do {
						//console.clear()
						if ( parentTXT.lastIndexOf("<details",startP) < parentTXT.lastIndexOf("</details",endP) ) {
							bad = bad +1
							//console.log(parentTXT.slice(parentTXT.lastIndexOf("</details",endP)))
							endP = parentTXT.lastIndexOf("</details",endP) -1
							//alert(bad)
						} else {
							bad = bad -1
							//console.log(parentTXT.slice(parentTXT.lastIndexOf("<details",startP)))
							startP = parentTXT.lastIndexOf("<details",startP) -1
							//alert(bad)
						}
					}
					while ( bad != -1 )
					parentTXT = parentTXT.slice(parentTXT.lastIndexOf("<details",startP+1))
				} else {
					parentTXT = parentTXT.slice(parentTXT.lastIndexOf("<details"))
				}
//	*/			console.log("– – – – parentTXT – – – – – ")
//	*/			console.log(parentTXT)
				if ( parentTXT.indexOf(' class="imp [') != -1 ) {
					//alert(parentTXT.indexOf(' class="imp ['))
					var bad = 0
					var endP = 0
					var startP = 0
					do {
						//console.clear()
						//console.log(startP)
						startP = parentTXT.indexOf(' class="imp [',startP) +1
						if ( parentTXT.lastIndexOf("<details",startP) == parentTXT.indexOf("<details") ) {
							expID = parentTXT.slice(startP+12,parentTXT.indexOf(']',startP+12))
							impedQk = impedQk + expID + " "
							//alert("expID:" +expID)
						}
						//alert("startP:" +startP)
					}
					while ( parentTXT.indexOf(' class="imp [',startP) != -1 )
				}
//	*/			console.log(impedQk)
				var startP = 0
				do {
					startP = Qtxt.indexOf(' class="imp [',startP) +1
					var EXPid = Qtxt.slice(startP+12,Qtxt.indexOf(']',startP+12))
//	*/				console.log("EXPid: "+EXPid)
					if ( impedQk.indexOf(EXPid) == -1 ) {
						// importQ
						count = count +1
						//console.log(EXPid)
						var newTXT = localStorage.getItem("hkExpQ."+EXPid)
//	*/					console.log("impQ: "+EXPid)
						if ( newTXT != null ) {
							var LSid = newTXT.slice(0,newTXT.indexOf(" "))
							newTXT = localStorage.getItem(LSid)
							var oldTXT = Qtxt.slice(Qtxt.indexOf('<',startP-6),Qtxt.indexOf('>',startP)+1)
							//var oldTXT = Qtxt.slice(Qtxt.indexOf('<',startP-5),Qtxt.indexOf('>',startP)+1)
//	*/						console.clear()
//	*/						console.log(startP)
//	*/						console.log(Qtxt.indexOf('<',startP-6))
//	*/						console.log(Qtxt.indexOf('>',startP)+1)
//	*/						console.log(Qtxt)
//	*/						console.log(Qtxt.slice(startP))
//	*/						alert("start")
//	*/						console.log(Qtxt.slice(Qtxt.indexOf('<',startP-5),Qtxt.indexOf('>',startP)+1))
//	*/						console.log(oldTXT.slice(1,4))
							if ( oldTXT.indexOf("hide") != -1 ) {
								var title = newTXT
								title = title.slice(0,title.indexOf('</summary>'))
								title = title.slice(title.indexOf('<summary'))
								title = title.slice(title.indexOf('>')+1)
								title = "<strong>"+title+"</strong>"
								newTXT = newTXT.replace('<ul class="normal">', '<ul class="normal">'+title);

								newTXT = newTXT.replace(/kerdes/g, "");
							}
							if ( oldTXT.slice(1,4) == "div" ) {
								newTXT = newTXT.slice(newTXT.indexOf('<ul class="normal">')+19)
								newTXT = newTXT.slice(0,-15)
							}
//	*/						console.log("– – – – – – – – – – – – – – – – Qtxt before – – – – – – – – – – – – – – – – ")
//	*/						console.log(Qtxt)
//	*/						console.log("– – – – – – – – – – – – – – – – oldTXT – – – – – – – – – – – – – – – – ")
//	*/						console.log(oldTXT)
//	*/						console.log("– – – – – – – – – – – – – – – – newTXT – – – – – – – – – – – – – – – – ")
//	*/						console.log(newTXT)
							newTXT = oldTXT + newTXT
							Qtxt = Qtxt.replace(oldTXT,newTXT)
//	*/						console.log("– – – – – – – – – – – – – – – – Qtxt after – – – – – – – – – – – – – – – – ")
//	*/						console.log(Qtxt)
//	*/						alert("start")
//	*/						console.log(Qtxt.slice(Qtxt.indexOf('>',startP)+1))
//	*/						alert("stop")
							
							impedQk = impedQk + EXPid + " "
						} else {
							MISSid = MISSid + EXPid + ","
						}
					}
				} while ( Qtxt.indexOf(' class="imp [',startP) != -1 )
				//console.log(impedQk)
			}
			
			if ( divSpan == "div" ) {
				Qtxt = Qtxt.slice(Qtxt.indexOf('<ul class="normal">')+19)
				Qtxt = Qtxt.slice(0,Qtxt.lastIndexOf('</ul></details>'))
			}
			newHTML = newHTML + Qtxt
		}
		while ( oldHTML.indexOf(' class="imp [') != -1 )
	}
	document.documentElement.innerHTML = newHTML + oldHTML
	
	
	if ( MISSid != "" ) { alert("Az alábbi EXPid-k még nincsenek LS-be reigsztrálva: "+MISSid + "\nNyisd meg a tárgyválasztás ablaknál az adott tárgyhoz kapcsolódó egyéb tárgy(ak)at egyszer --> pl. Biokémia II esetén nyisd meg Biokémia I, Élettan, Molekuláris Sejtbiológia") }
	
	F_getTime()
	var endTime = myTime-oldTime-diffTime
	var unitTime = (endTime*1000/count).toFixed(2);
	console.log("– F_impQs newMethod – "+endTime.toFixed(2)+"sec ("+unitTime+"ms/Q, "+count+"db Q)")
}
F_impQbegin()
function F_impQs(impek){ // 11ms/Q a betöltési ideje
	F_getTime()
	var diffTime = myTime-oldTime
	//console.log("– F_impQs oldMethod BEGIN – " + diffTime)
	
	var MISSid = ""
	
	var count = 0
	for ( var i=0; i<impek.length; i++ ) {
		function F_impQ(EXPid){
			if ( localStorage.getItem("hkExpQ."+EXPid) ) { // kell, különben, ha egy hiányzik, akkor nem tölti be az egészet
				count = count +1
				var string = localStorage.getItem("hkExpQ."+EXPid)
				var LSid = string.slice(0,string.indexOf(" "))
				var IMGloc = string.slice(string.indexOf(" ")+1)
				var Qtext = localStorage.getItem(LSid)
				//Qtext = LZString.decompressFromUTF16(Qtext)
				
				txtLS[Qtext] = LSid
				
				if ( Qtext == "undefined" ) { 
					MISSid = MISSid + EXPid + ","
				} else {
					// megnézi, hogy nincs-e már importálva
					var Qelem = impek[i] //var Qelem = impek[i].parentElement.parentElement
					var parent = impek[i] //var parent = impek[i].parentElement.parentElement
					do { // megkeresi a 'családfában' legfelül lévő kérdést!
						Qelem = parent
		//console.clear()
		//console.log(Qelem.innerHTML)
						parent = parent.parentElement
					} while ( parent.innerHTML.indexOf('<div class="title"') == -1 && parent.innerHTML.indexOf('<summary class="phase"') == -1 && parent.innerHTML.indexOf('<summary class="status"') == -1 )
					var checkID = Qtext.slice(Qtext.indexOf("{")+1,Qtext.indexOf("}"))
					if ( Qelem.innerHTML.indexOf("{"+checkID+"}") == -1 && Qelem.className.indexOf("{"+checkID+"}") == -1 ) { 
						if ( impek[i].nodeName == "DIV" ) {
							Qtext = Qtext.slice(Qtext.indexOf('<ul class="normal">')+19)
							Qtext = Qtext.slice(0,-15)
						}
						impek[i].innerHTML = Qtext // emiatt lassú
						/*var imgs = impek[i].getElementsByTagName("img")
						for ( var x=0; x<imgs.length; x++ ) {
							if ( imgs[x].dataset.src ) {
								imgs[x].src =  htmlLEARNloc + IMGloc + imgs[x].dataset.src
								imgs[x].removeAttribute("data-src")
							}
						}*/
					}
				}
			} else if ( EXPid != "" ) {
				MISSid = MISSid + EXPid + ","
			}
		}
		
		// ezt NE töröljem le!!!
		if ( impek[i].innerHTML == "" ) {
			var begin = impek[i].className.indexOf("[") +1
			var end = impek[i].className.indexOf("]")
			var full = impek[i].className.slice(begin,end) // lenntebb majd külön választja őket
			var cont = false
			var num = ""
			var high = ""
			for (var x=0; x<=full.length; x++) {
				var kar = full[x] 
				if ( isNaN(kar) == false ) {
					if ( cont == false ) {
						num = num + kar
					} else {
						high = high + kar
					}
				} else {
					if (kar === "-") { 
						cont = true
					} else {
						if ( cont == true ) {
							for ( var z=0; z<=high-num; z++ ) {
								F_impQ(Number(num)+Number(z))
							}
							cont = false
						} else {
							F_impQ(num)
						}
						num = ""
						high = ""
					}
				}
			}
		} 
	}
	if (MISSid!="") { alert("alábbi EXPid-k még nincsenek LS-be reigsztrálva: "+MISSid + "\nNyisd meg a tárgyválasztás ablaknál az adott tárgyhoz kapcsolódó egyéb tárgy(ak)at egyszer --> pl. Biokémia II esetén nyisd meg Biokémia I, Élettan, Molekuláris Sejtbiológia") }
	
	F_getTime()
	var endTime = myTime-oldTime-diffTime
	var unitTime = (endTime*1000/count).toFixed(2);
	console.log("– F_impQs oldMethod – "+ unitTime +"ms ("+count+" quest in "+endTime.toFixed(2)+"sec)")
	/*F_getTime()
	var diffTime = myTime-oldTime
	console.log("– F_impQs END – " + diffTime)*/
}
//F_impQs(document.getElementsByClassName("imp")) //erre elvileg nincs mát szükség


function F_DivSkip() {
	var div = document.createElement("div")
	document.body.appendChild(div)
	div.id = "div_Skip"
	div.style.backgroundColor = "white"
	div.style.overflow = "auto"
	div.style.width = "80vw"
	div.style.height = "60vh"
	div.style.position = "fixed"
	div.style.top = "50%"
	div.style.left = "50%"
	div.style.marginTop = "-30vh"
	div.style.marginLeft = "-40vw"
	div.style.border = "10px solid black"
	div.style.display = "none"
}
F_DivSkip()
function F_DivFix() {
	var div = document.createElement("div")
	document.body.appendChild(div)
	div.id = "div_Fix"
	div.style.backgroundColor = "white"
	div.style.overflow = "auto"
	div.style.width = "80vw"
	div.style.height = "60vh"
	div.style.position = "fixed"
	div.style.top = "50%"
	div.style.left = "50%"
	div.style.marginTop = "-30vh"
	div.style.marginLeft = "-40vw"
	div.style.border = "10px solid red"
	div.style.display = "none"
}
F_DivFix()
function F_DivSkipText() {
	var div = document.createElement("div")
	document.body.appendChild(div)
	div.id = "div_SkipText"
	div.style.backgroundColor = "white"
	div.style.overflow = "auto"
	div.style.width = "95vw"
	div.style.height = "95vh"
	div.style.position = "fixed"
	div.style.top = "10px"
	div.style.right = "10px"
	div.style.border = "10px solid black"
	div.style.display = "none"
		
	var textdiv = document.createElement("div")
	textdiv.id = "div_SkipTexttxt"
	div.appendChild(textdiv)
	
	var button = document.createElement("input")
	button.type = "button"
	div.appendChild(button)
	button.style.backgroundColor = "lightgrey"
	button.style.border = "3px solid black"
	button.onclick = function(){ 
		document.getElementById("div_SkipText").style.display = "none"
	}
	button.value = "<-"
	
	button.style.position = "absolute"
	button.style.right = "5px"
	button.style.bottom = "2px"
}
F_DivSkipText()
function F_DivUpgQ() {
	var div = document.createElement("div")
	document.body.appendChild(div)
	div.id = "div_upgQ"
	div.style.backgroundColor = "white"
	div.style.overflow = "auto"
	div.style.width = "80vw"
	div.style.height = "60vh"
	div.style.position = "fixed"
	div.style.top = "50%"
	div.style.left = "50%"
	div.style.marginTop = "-30vh"
	div.style.marginLeft = "-40vw"
	div.style.border = "10px solid red"
	div.style.display = "none"
	
	var oldJEGY = document.createElement('div');
	oldJEGY.id = "div_oldJEGY"
	document.getElementById("div_upgQ").appendChild(oldJEGY)
	oldJEGY.style.border = "1px solid black"
	oldJEGY.style.position = "absolute"
	oldJEGY.style.bottom ='2px'
	oldJEGY.style.left = '35%'
	
	var newJEGY = document.createElement('div');
	newJEGY.id = "div_newJEGY"
	document.getElementById("div_upgQ").appendChild(newJEGY)
	newJEGY.style.border = "1px solid black"
	newJEGY.style.position = "absolute"
	newJEGY.style.bottom ='2px'
	newJEGY.style.left = '65%'
}
F_DivUpgQ()


function func_divButtonETC() {
	var button = document.createElement("input")
	button.id = "button_replaceQ"
	button.type = "button";
	document.getElementById("div_upgQ").appendChild(button)
	button.style.position = "absolute"
	button.style.bottom = "10px"
	button.style.right = "10px"
	button.value = "upgrade"
	
	var select = document.createElement("SELECT")
	select.id = "select_replaceQ"
	document.getElementById("div_upgQ").appendChild(select)
	select.style.position = "absolute"
	select.style.bottom = "10px"
	select.style.left = "10px"
}
func_divButtonETC()

var replaceQs = []
var defaultText = document.getElementById("div_upgQ").innerHTML


var varNextQ = false
var F_seekBar = window.setInterval(function(){
	if ( document.getElementById("playedVideo") ) {
		var playedVideo = document.getElementById("playedVideo")
		var parentDiv = playedVideo.parentElement
		var seekBars = parentDiv.getElementsByTagName("span")
		//console.log(widthPx)
		var widthPx = playedVideo.offsetWidth *playedVideo.currentTime /playedVideo.duration
		seekBars[0].style.width = widthPx
		seekBars[0].style.left = playedVideo.offsetLeft
	}
}, 1000);





// sajna komplikált ez a fhos, mert ha van egy impQ, amin belül van egy simaQ, akkor a simaQ img-ét is az impQ-s webről kell betöltse, tehát nem elég azokat amelyek látszanak
// ha ráklikkelek egy details-ra, akkor nézze meg a child elementeket, amelyek [impQ]-k (div vagy span), azoknál töltse be az image-ket
function F_loadExpImg(detElem,EXPid,imgX){
	//if ( imgX.dataset.src && imgX.offsetParent != null ) {
	if ( imgX.dataset.src ) {
		var IMGelem = imgX
		var parent = imgX
		do { // ha impQ van, akkor be kell töltse mindenképp őket, kivéve ha másik impQ
			IMGelem = parent
			parent = parent.parentElement
		} while ( parent.className.indexOf("[") == -1 && parent.className.indexOf("{") == -1 && parent != detElem )
		if ( parent == detElem ) {
			var string = localStorage.getItem("hkExpQ."+EXPid)
			var LSid = string.slice(0,string.indexOf(" "))
			var IMGloc = string.slice(string.indexOf(" ")+1)
			imgX.src = htmlLEARNloc + IMGloc + imgX.dataset.src
			imgX.removeAttribute("data-src")
			//console.log(imgX.offsetParent+" -EXPid:"+EXPid+"- "+imgX.dataset.src+" - "+imgX.src)
		}
	}
}
/*function F_loadImgX(detElem,imgX){
	var IMGelem = imgX
	var parent = imgX
	
	if ( detElem.className.indexOf("{") > -1 ) { 
		do { // ha impQ van, akkor be kell töltse mindenképp őket, kivéve ha másik impQ
			IMGelem = parent
			parent = parent.parentElement
		} while ( parent.className.indexOf("[") == -1 && parent != detElem )
	} else {
		do { // megkeresi az első details-t, így nem tölti be az összeset, ha ráklikkelnél az egyik tételre (lassú lenne)
			IMGelem = parent
			parent = parent.parentElement
		} while ( parent.className.indexOf("[") == -1 && parent.tagName != "DETAILS" )
	}

	if ( parent.className.indexOf("[") > -1 ) {
		var begin = parent.className.indexOf("[")
		var end = parent.className.indexOf("]")
		var EXPid = parent.className.slice(begin+1,end)
		//alert(EXPid)
		F_loadExpImg(EXPid,imgX)
	} else if ( parent == detElem ) {
		if ( parent.className.indexOf("{") > -1 ) {
			var begin = parent.className.indexOf("{")
			var end = parent.className.indexOf("}")
			var EXPid = parent.className.slice(begin+1,end)
			F_loadExpImg(EXPid,imgX)
		} else {
			//imgX.src = imgX.dataset.src
			imgX.src = "images/" + imgX.dataset.src
			imgX.removeAttribute("data-src")
		}
	}
}*/
function F_loadImgX(imgX){
	if ( imgX.dataset.src && imgX.offsetParent != null ) {
		imgX.src = "images/" + imgX.dataset.src
		imgX.removeAttribute("data-src")
		//console.log(imgX.offsetParent+" - "+imgX.dataset.src+" - "+imgX.src)
	}
}
function F_loadImgVideo(detElem,e){
	//console.clear()
	//console.log(detElem.innerHTML.slice(0,50))
	
	if ( detElem.className.indexOf("{") != -1 ) {
		var begin = detElem.className.indexOf("{")
		var end = detElem.className.indexOf("}")
		var EXPid = detElem.className.slice(begin+1,end)
		var imgs = detElem.getElementsByTagName("img")
		for ( var i=0; i<imgs.length; i++ ) {
			F_loadExpImg(detElem,EXPid,imgs[i])
		}
	}
	
	// impQ img-ek
	var imps = detElem.getElementsByClassName("imp")
	for ( var x=0; x<imps.length; x++ ) {
		var elem = imps[x]
		var begin = elem.className.indexOf("[")
		var end = elem.className.indexOf("]")
		var EXPid = elem.className.slice(begin+1,end)
		var imgs = elem.getElementsByTagName("img")
		for ( var i=0; i<imgs.length; i++ ) {
			F_loadExpImg(elem,EXPid,imgs[i])
		}
	}
	
	// img-ek
	var imgs = detElem.getElementsByTagName("IMG")
	for ( var x=0; x<imgs.length; x++ ) {
		F_loadImgX(imgs[x])
	}
	func_abbrSet(detElem)
	
	// metszet img-ek
	var imgs = detElem.getElementsByTagName("img")
	for ( var x=0; x<imgs.length; x++ ) {
		if ( imgs[x].classList.contains("metszet") == true ) {
			if ( imgs[x].src ) {
				if ( imgs[x].style.borderColor == "limegreen" ) {
					var source = imgs[x].src
					source = source.slice(0,source.indexOf("."))
					source = source.slice(0,-1)
					source = source + imgs[x].src.slice(imgs[x].src.indexOf("."))
					imgs[x].src = source
					imgs[x].style.borderColor = "red"
				}
			}
		}
		F_loadImgX(imgs[x])
	}
	
	// Youtube Video Load
	var allYoutube = detElem.getElementsByTagName("iframe")
	for ( var i=0; i<allYoutube.length; i++ ) {
		if ( allYoutube[i].dataset.src && allYoutube[i].offsetParent != null ) {
			allYoutube[i].src = allYoutube[i].dataset.src
			allYoutube[i].removeAttribute("data-src")
		}
	}
	
	// PDF Load
	var allPDF = detElem.getElementsByTagName("embed")
	for ( var i=0; i<allPDF.length; i++ ) {
		if ( allPDF[i].dataset.src && allPDF[i].offsetParent != null ) {
			allPDF[i].src = allPDF[i].dataset.src
			allPDF[i].removeAttribute("data-src")
		}
	}
		
	
	// Video Load
	var allVideo = detElem.getElementsByTagName("video")
	for ( var i=0; i<allVideo.length; i++ ) {
		if ( allVideo[i].dataset.src && allVideo[i].offsetParent != null ) {
			var source = document.createElement('source')
			source.setAttribute('src', allVideo[i].dataset.src)
			allVideo[i].removeAttribute("data-src")
			allVideo[i].appendChild(source)
			allVideo[i].style.maxWidth = "98%"
			allVideo[i].style.borderColor = "red"
			//allVideo[i].muted = true;
			
		// controlBar fix!
			allVideo[i].onclick = function(){
				if ( this.parentElement.className != "videoParentDiv" ) {
					var div = document.createElement("div");
					var parent = this.parentNode;
					parent.insertBefore(div, this);
					div.appendChild(this);
					div.className = "videoParentDiv"
					
					var seekBar = document.createElement("div");
					seekBar.className = "seekBar"
					div.appendChild(seekBar)
					var span = document.createElement("span");
					span.className = "seekBar"
					span.innerHTML = "&nbsp;"
					seekBar.appendChild(span)
				}
				
				if ( this.paused == false ) {
					this.style.borderColor = "red"
					
					var widthPx = this.offsetWidth *this.currentTime /this.duration
					var parentDiv = this.parentElement
					var seekBars = parentDiv.getElementsByTagName("span")
					seekBars[0].style.width = widthPx
					seekBars[0].style.left = this.offsetLeft
					
					this.pause(); 
				} else {
					if ( document.getElementById("playedVideo") ) {
						if ( document.getElementById("playedVideo") != this ) {
							document.getElementById("playedVideo").pause();
							document.getElementById("playedVideo").id = "";
						}
					}
					this.id = "playedVideo";
					this.style.borderColor = "springgreen"
					this.play();
					
					//ezt elég 1x megcsinálni, amikor elindítom (fix majd, mert lehet egyszerűsíteni)
					var parentDiv = this.parentElement
					var seekBars = parentDiv.getElementsByTagName("span")
					theSeekBar = seekBars[0].parentElement
					theSeekBar.style.width = this.offsetWidth
					theSeekBar.style.opacity = "1"; 
					theSeekBar.onclick = function(e){
						x = e.pageX - this.offsetLeft
						clickedValue = x * this.max / this.offsetWidth;
						var percent = x / this.offsetWidth
						var playedVideo = document.getElementById("playedVideo")
						playedVideo.style.borderColor = "black"
						playedVideo.pause();
						var currTime = percent * playedVideo.duration
						currTime = Math.floor(currTime);
						//console.log(currTime);
						playedVideo.currentTime = currTime
						
						var seekBars = parentDiv.getElementsByTagName("span")
						var widthPx = playedVideo.offsetWidth *playedVideo.currentTime /playedVideo.duration
						seekBars[0].style.width = widthPx
						seekBars[0].style.left = playedVideo.offsetLeft
					}
				}
			};
		}
	}
	
	//alert(detElem.innerHTML)
	if ( e ) { e.stopPropagation() }
}
function F_detailsToggle(detElem,e){ 
	//if ( detElem.classList.contains("imgLoaded") != true ) {
		/*F_getTime()
		oldTime = myTime*/
		F_loadImgVideo(detElem,e)
		detElem.classList.add("imgLoaded");
		/*F_getTime()
		myTime = myTime-oldTime
		console.log("– imagek betöltve – "+myTime)*/
	// }
}
function F_imgLoad(){ // VIDEOt is itt tölti be!
	var allDetails = document.getElementsByTagName("details")
	for ( var i=0; i<allDetails.length; i++ ) {
		allDetails[i].ontoggle = function(e){
			F_detailsToggle(this,e)
		}
	}
}
F_imgLoad()

function F_imgActLoad(IMGelem){ 
	var parent = IMGelem
	do { // megkeresi az első details-t
		parent = parent.parentElement
	} while ( parent.className.indexOf("[") == -1 && parent.tagName != "DETAILS" && parent.tagName != "BODY" )
	if ( IMGelem.dataset.src ) {
		if ( IMGelem.dataset.src.indexOf("images") == -1 /*&& IMGelem.dataset.src.indexOf("100") == -1*/ ) {
			IMGelem.src = "images/" + IMGelem.dataset.src
		} else {
			IMGelem.src = IMGelem.dataset.src
		}
		IMGelem.removeAttribute("data-src")
	}
}

function F_imgPreLoad(){ // ha már alapból nyitott a details, akkor betölti a képet
	var imgArr = []
	var allIMG = document.getElementsByTagName("img")
	for ( var i=0; i<allIMG.length; i++ ) {
		F_loadImgX(allIMG[i])
	}
}
F_imgPreLoad()


var imagesAll = document.images
var tooltipStatus
function func_enLargeImages(){ // képnagyítás balKlikkel középre
	var imgStatus
	document.body.onclick=function(){
		if ( imgStatus == "hide" ) {
			centerDiv.style.visibility = "hidden"
		}
		imgStatus = "hide"

		tooltipSpan.style.visibility = "hidden";
		tooltipStatus = "hide"
	};
	for ( var i = 0;   i < imagesAll.length;   i++ ) {
		imagesAll[i].onclick=function(){
			imgStatus = "show"
			centerDiv.style.visibility = "visible";
			centerImage.src = this.src
			centerDiv.style.maxHeight = "95%";
			centerDiv.style.maxWidth = "95%";
			centerDiv.style.overflow = "auto";

			centerDiv.style.position = "fixed";
			centerDiv.style.left = "50%";
			centerDiv.style.top = "50%";
			centerDiv.style.transform = "translate(-50%, -50%)";
		};
		if ( imagesAll[i].classList.contains("metszet") == true ) {
			imagesAll[i].onclick=function(){
				var source = this.src
				if ( this.style.borderColor != "limegreen" ) {
					source = source.replace(".","m.")
					this.src = source
					this.style.borderColor = "limegreen"
				} else {
					imgStatus = "show"
					centerDiv.style.visibility = "visible";
					centerImage.src = this.src
					centerDiv.style.maxHeight = "95%";
					centerDiv.style.maxWidth = "95%";
					centerDiv.style.overflow = "auto";

					centerDiv.style.position = "fixed";
					centerDiv.style.left = "50%";
					centerDiv.style.top = "50%";
					centerDiv.style.transform = "translate(-50%, -50%)";
				}
			};
		}
	}
	centerDiv = document.createElement("div")
	document.body.appendChild(centerDiv)
	centerImage = document.createElement("img")
	centerImage.style.maxWidth = "none";
	centerImage.style.float = "none";
	centerDiv.appendChild(centerImage)
	centerDiv.style.visibility = "hidden";
	centerDiv.style.border = "5px ridge LightGray";
}
func_enLargeImages()

var refreshAll = false
function F_toggleAll() {
	console.log("– F_toggleAll –")
	if ( refreshAll != true ) {
		refreshAll = true
		F_getTexts()
		F_checkImpQs()
		F_oldQcheck()
		F_tetelChoose()
		F_sortQuests()
		func_tableSkipFix()
		F_valFix()
		F_valSkip()
		func_enLargeImages()
		func_calcJegy()
		func_calcWork()
		func_calcDate()
		func_calcOldNew()
		func_calcRepeat()
		func_tableSkipFix()
		//alert(localStorage.getItem("hkQ.max"))
	}
	var childs = document.body.children; 
	if ( document.getElementById("div_MainFrame").style.display != 'none' ) {
		localStorage.removeItem("hk.ToggleAll")
		for ( var i=0; i<childs.length; i++ ) { childs[i].style.display = "block" }
		document.getElementById("div_MainFrame").style.display = 'none';

		document.getElementById("div_SkipText").style.display = 'none';
		document.getElementById("div_Fix").style.display = 'none';
		document.getElementById("div_Skip").style.display = 'none';
		document.getElementById("div_upgQ").style.display = 'none';
	} else {
		localStorage.setItem("hk.ToggleAll","true")
		for ( var i=0; i<childs.length; i++ ) { childs[i].style.display = "none" }
		document.getElementById("div_MainFrame").style.display = 'block';
		tooltipSpan.style.display = 'block';

		document.getElementById("input_toggleAll").style.display = 'block';
	}
	document.getElementById("spanLoading").style.display = "block";
	document.getElementById("input_toggleAll").style.backgroundColor  = ""
	document.getElementById("input_toggleAll").style.color  = ""
	
	F_getTime()
	lastClickTime = myTime
}

var var_note = false
function toggleNote() {
	if ( var_note == false ) {
		document.getElementById("note").style.display = 'block';
		var_note = true
	} else {
		document.getElementById("note").style.display = 'none';
		var_note = false
	}
}

var timeDiff
var lastClickTime = 0
function F_CreateQDiv() {
	
	function F_ButtonToggleAll() {
		var button = document.createElement("input")
		button.id = "input_toggleAll"
		button.type = "button"
		document.body.appendChild(button)

		button.onmousedown = function(){ 
			this.style.backgroundColor  = "black"
			this.style.color  = "white"
		}
		button.onclick = function(){ 
			F_getTime()
			var diffTime = myTime - lastClickTime
			console.log(myTime+" vs "+lastClickTime)
			if ( diffTime > 1 ) {
				this.style.backgroundColor  = "black"
				this.style.color  = "white"
				var int_Click = window.setInterval(function(){
					F_toggleAll()
					clearInterval(int_Click) 
				}, 100);
			}
		}
		button.value = "0"

		button.style.position = "fixed"
		button.style.right = "5px"
		button.style.top = "5px"
	}
	F_ButtonToggleAll()

	function F_DivMainFrame() {
		var div = document.createElement("div")
		div.id = "div_MainFrame"
		div.style.display = "none"
		div.style.maxHeight = "50%"
		var parent = document.body
		parent.insertBefore(div,parent.firstChild)
	}
	F_DivMainFrame()
	var MainFrame = document.getElementById("div_MainFrame");
	
	function F_divLoading(){
		var div = document.createElement("span")
		MainFrame.appendChild(div)
		div.id = "divLoading"
		div.style.backgroundColor = "black"
		div.style.position = "fixed"
		div.style.top = "1%"
		div.style.right = "0.5%"
		div.style.width = "99%"
		div.style.height = "98%"
		div.style.opacity = "0.3"
		//div.style.display = 'block'
		div.style.visibility = 'hidden'
	}
	F_divLoading()

	function F_DivQSettings() {
		var div = document.createElement("div")
		div.id = "div_QSettings"
		div.className = "normal"
		MainFrame.appendChild(div)
	}
	F_DivQSettings()
	var divSettings = document.getElementById("div_QSettings");

	function F_ButtonTetelek() {
		var button = document.createElement("button")
		button.style.border = "3px solid black"
		button.style.backgroundColor = "Bisque"
		button.textContent = "TÉTEL"
		divSettings.appendChild(button)
		button.onclick = function(){
			if ( document.getElementById("Div_Tetelek").style.display == "none" ) {
				document.getElementById("Div_Tetelek").style.display = "block"
			} else {
				document.getElementById("Div_Tetelek").style.display = "none"
			}
			F_temakorStatus()
		}
	}
	F_ButtonTetelek()
	function F_SpanDate() {
		var span = document.createElement("span")
		span.id = "span_Date"
		divSettings.appendChild(span)
		span.className = "white"
		span.style.border = "1px solid black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
	}
	F_SpanDate()
	function F_BtnAtlag() {
		var button = document.createElement("input")
		button.type = "button"
		button.id = "btn_Jegy"
		divSettings.appendChild(button)
		button.style.border = "3px solid black"
		button.style.backgroundColor = "Bisque"
		button.onclick = function(){
			if ( document.getElementById("div_nextQMark").style.display == 'none' ) {
				document.getElementById("div_nextQMark").style.display = 'block';
			} 
			if ( document.getElementById("repTable").style.display == 'block' ) {
				document.getElementById("repTable").style.display = 'none';
			} else {
				func_calcRepTable()
				document.getElementById("repTable").style.display = 'block';
			} 
		}
	}
	F_BtnAtlag()
	function F_SpanRepAll() {
		var span = document.createElement("span")
		span.id = "span_Repeat"
		divSettings.appendChild(span)
		span.className = "WHITE"
		span.style.border = "1px solid black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
	}
	F_SpanRepAll()
	function F_SpanQid() {
		var span = document.createElement("span")
		span.id = "span_actualLSid"
		divSettings.appendChild(span)
		span.style.border = "1px solid black"
		span.style.fontSize = "small"
		span.textContent = "none"

		/*span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "3px"
		span.style.paddingBottom = "4px"*/
		
		//span.style.textAlign = "center"
		span.style.position = "absolute"
		span.style.left = "235px"
		span.style.top = "75px"
		//span.style.right = "90px"
		span.style.overflow = "auto"
	}
	F_SpanQid()
	function F_ButtonMarks() {
		var button = document.createElement("button")
		button.style.border = "3px solid black"
		button.style.backgroundColor = "Bisque"
		button.textContent = "0"
		button.id = "button_Marks"
		divSettings.appendChild(button)
		
		var div = document.createElement("div")
		var questDiv = document.getElementById("div_MainFrame");
		questDiv.appendChild(div)
		div.style.backgroundColor = "white"
		div.style.overflow = "auto"
		div.style.width = "80vw"
		div.style.height = "80vh"
		div.style.position = "fixed"
		div.style.top = "50%"
		div.style.left = "50%"
		div.style.marginTop = "-40vh"
		div.style.marginLeft = "-40vw"
		div.style.border = "10px solid black"
		div.style.display = "none"
		
		var allStatusQs = document.getElementsByClassName("status")
		
		button.onclick = function(){
			if ( div.style.display == "none" ) {
				div.style.display = "block"
				
				div.innerHTML = ""
				for ( var i = 0;   i < allStatusQs.length;   i++ ) {
					var thisQ = allStatusQs[i].parentElement
					if ( thisQ.parentElement.id != "kerdeslocation" ) {
						Qtext = '<details class="' +thisQ.className+ '">' +thisQ.innerHTML+ "</details>"
						var find = ' id="(.*?)"'
						Qtext = Qtext.replace(new RegExp(find, 'g'), "")
						var LSid = txtLS[Qtext]
					
						var szoveg = allStatusQs[i].innerHTML
						szoveg = szoveg + "<br>"
						szoveg = '<span style="border:1px solid black; width:25px; display:inline-block; text-align:center" id="'+i+'_markja"></span>' + szoveg
						szoveg = div.innerHTML + szoveg

						div.innerHTML = szoveg
					}
				}
				F_kerdesStatus()
			} else {
				div.style.display = "none"
			}
		}
	}
	F_ButtonMarks()
	function F_ButtonNextQdiff() {
		var button = document.createElement("input")
		button.id = "btn_nextQdiff"
		button.type = "button"
		divSettings.appendChild(button)
		button.style.backgroundColor = "coral"

		button.onclick = function(){ 
			if ( this.style.backgroundColor != "limegreen" ) {
				this.style.backgroundColor = "limegreen"
			} else {
				this.style.backgroundColor = "coral"
			}
		}
		button.value = " "

		/*button.style.position = "fixed"
		button.style.right = "5px"
		button.style.top = "50px"*/
	}
	F_ButtonNextQdiff()

	function F_DivAlertEXPQrosszNum() {
		var div = document.createElement("div")
		var doc = document.getElementById("div_MainFrame")
		doc.appendChild(div)
		div.style.backgroundColor = "white"
		div.style.overflow = "auto"
		div.style.width = "200px"
		div.style.height = "70px"
		div.style.position = "fixed"
		div.style.top = "1%"
		div.style.left = "100%"
		div.style.marginLeft = "-300px"
		div.style.border = "10px solid red"
		div.innerHTML = wrongEXPid
		if ( wrongEXPid != "foglalt vagy upgradelve lett:<br>" ) { 
			div.style.display = 'block';
		} else {
			div.style.display = 'none';
		}
	}
	F_DivAlertEXPQrosszNum()
	
	function F_ButtonUpgQ() {
		var button = document.createElement("input")
		button.id = "btn_upgQ"
		button.type = "button"
		divSettings.appendChild(button)
		button.style.color = "white"
		button.style.fontWeight = "bold"
		button.style.backgroundColor = "red"
		button.style.border = "3px solid black"
		/*button.style.position = "fixed"
		button.style.right = "50%"
		button.style.top = "5px"*/
		button.onclick = function() {
			if ( document.getElementById("div_upgQ").style.display == 'block' ) {
				document.getElementById("div_upgQ").style.display = 'none';
			} else {
				document.getElementById("div_upgQ").style.display = 'block';
			}
		}
	}
	F_ButtonUpgQ()

	var br = document.createElement("br")
	divSettings.appendChild(br)
	

	function F_ButtonNewQ() {
		var button = document.createElement("input")
		button.id = "btn_newQuest"
		button.type = "button"
		divSettings.appendChild(button)
		button.style.backgroundColor = "white"
		button.style.border = "3px solid black"
		button.onclick = function(){ func_spanClick(this) }
		button.value = "0"
	}
	F_ButtonNewQ()
	function F_SpanRepSlow() {
		var span = document.createElement("span")
		span.id = "span_RepSlow"
		divSettings.appendChild(span)
		span.className = "vocab"
		span.style.border = "1px solid black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
	}
	F_SpanRepSlow()
	function F_ButtonRepFast() {
		var button = document.createElement("input")
		button.id = "btn_RepFast"
		button.type = "button"
		divSettings.appendChild(button)
		button.className = "MISS"
		button.style.border = "3px solid black"
		button.onclick = function(){ func_spanClick(this) }
		button.value = "0"
	}
	F_ButtonRepFast()
	divSettings.appendChild( document.createTextNode( '\u00A0' ) );
	function F_SpanWork() {
		var span = document.createElement("span")
		span.id = "span_Work"
		divSettings.appendChild(span)
		span.className = "white"
		span.style.border = "1px solid black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
	}
	F_SpanWork()
	divSettings.appendChild( document.createTextNode( '\u00A0' ) );
	function F_ButtonTABS() {
		var button = document.createElement("input")
		button.type = "button"
		button.id = "btn_note"
		divSettings.appendChild(button)
		button.style.border = "3px solid black"
		button.style.backgroundColor = "Bisque"
		button.onclick = function(){ func_spanClick(this) }
		button.value = "✍"
		
		var div = document.createElement("div")
		div.id = "div_nextQMark"
		div.style.display = "none"
		div.style.position = "fixed"
		div.style.right = "2px"
		div.style.top = "30px"
		div.style.backgroundColor = "white"
		div.style.border = "2px solid black"
		div.onclick = function(){ document.getElementById("div_nextQMark").style.display = 'none' }
		//document.body.appendChild(div)
		MainFrame.appendChild(div)
	}
	F_ButtonTABS()

	var br = document.createElement("br")
	divSettings.appendChild(br)

	function F_ButtonVizsgaSkip() {
		var button = document.createElement("input")
		button.id = "btn_vizsgaskip"
		button.type = "button"
		divSettings.appendChild(button)
		button.style.backgroundColor = "blue"
		button.style.color = "white"
		button.style.fontWeight = "bold"
		button.style.border = "3px solid black"
		button.onclick = function(){ func_spanClick(this) }
		button.value = "0"
	}
	F_ButtonVizsgaSkip()
	function F_ButtonFix() {
		var button = document.createElement("input")
		button.id = "btn_fix"
		button.type = "button"
		divSettings.appendChild(button)
		button.className = "fix"
		button.style.border = "3px solid black"
		button.onclick = function(){ func_spanClick(this) }
		button.value = "0"
	}
	F_ButtonFix()
	function F_ButtonSkip() {
		var button = document.createElement("input")
		button.id = "btn_skip"
		button.type = "button"
		divSettings.appendChild(button)
		button.className = "dark"
		button.style.border = "3px solid black"
		button.onclick = function(){ func_spanClick(this) }
		button.value = "0"
	}
	F_ButtonSkip()
	function F_SpanRepNew() {
		var span = document.createElement("span")
		span.id = "span_RepNew"
		divSettings.appendChild(span)
		span.className = "WHITE"
		span.style.border = "1px solid black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
	}
	F_SpanRepNew()
	function F_SpanRepOld() {
		var span = document.createElement("span")
		span.id = "span_RepOld"
		divSettings.appendChild(span)
		span.className = "vocab"
		span.style.border = "1px solid black"

		span.style.paddingLeft = "5px"
		span.style.paddingRight = "5px"
		span.style.paddingTop = "1px"
		span.style.paddingBottom = "2px"
	}
	F_SpanRepOld()
	function F_inputTetel() {
		var input = document.createElement("input")
		input.id = "input_Tetel"
		divSettings.appendChild(input)
		input.type = "number"
		input.style.width = "40px"
		
		input.value = localStorage.getItem("input_Tetel")
		input.oninput = function(){
			localStorage.setItem("input_Tetel",this.value)
		}
	}
	F_inputTetel()



	function F_DivQLoc() {
		var divQloc = document.createElement("div")
		divQloc.id = "divQloc"
		MainFrame.appendChild(divQloc)
		//divQloc.style.overflow = "auto"
		//divQloc.style.height = "87vh"
	}
	F_DivQLoc()
	var divQloc = document.getElementById("divQloc");
	function F_DivQTitle() {
		var div = document.createElement("div")
		div.id = "questTitle"
		div.style.fontWeight = "bold"
		div.style.fontSize = "large"
		divQloc.appendChild(div)
	}
	F_DivQTitle()
	function F_DivQuest() {
		var div = document.createElement("div")
		div.id = "kerdeslocation"
		divQloc.appendChild(div)
	}
	F_DivQuest()


	function F_TextAreaNote() {
		var textArea = document.createElement("textarea")
		divSettings.appendChild(textArea)
		textArea.style.display = "none"
		textArea.id = "note"
		textArea.style.zIndex = "1"; 
		textArea.rows = "5"
		//textArea.cols = "60"

		textArea.style.position = "fixed"
		textArea.style.width = "40vw"
		textArea.style.left = "30%"
		textArea.style.top = "25px"
		textArea.style.border = "thick solid black"
	}
	F_TextAreaNote()

/*

	<select id="skip"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="5">5</option><option value="10">10</option><option value="20">20</option></select> 
*/

	function F_ButtonNextQ() {
		var button = document.createElement("input")
		button.type = "button"
		button.id = "button_NextQ"
		divSettings.appendChild(button)
		button.onclick = function(){ 
			F_getTime()
			var diffTime = myTime - lastClickTime
			console.log(myTime+" vs "+lastClickTime)
			if ( diffTime > 1 ) {
				if ( this.style.backgroundColor == "aqua" ) { 
					document.getElementById("divLoading").style.visibility = 'visible'
				} else {
					this.style.backgroundColor  = "black"
					this.style.color  = "white"
				}
				var int_Click = window.setInterval(function(){
					F_nextQ()
					clearInterval(int_Click) 
					document.getElementById("divLoading").style.visibility = 'hidden'
				}, 100);
			}
		}
		button.value = " ► "
		
		button.style.height = "40px"
		button.style.width = "40px"
		
		button.style.position = "absolute"
		button.style.left = "235px"
		button.style.top = "36px"
		button.style.right = "90px"
		button.style.overflow = "auto"
		button.style.border = "3px solid black"
		button.style.backgroundColor = "white"
	}
	F_ButtonNextQ()
	function F_DivMark() {
		var div = document.createElement("DIV")
		div.id = "Div_QsMark"
		MainFrame.appendChild(div)

		div.style.position = "absolute"
		div.style.left = "275px"
		div.style.top = "5px"
		div.style.right = "90px"
		div.style.overflow = "auto"
	}
	F_DivMark()

	function F_TableTetelek() {
		var table = document.createElement("TABLE")
		table.id = "Table_QsMark"
		document.getElementById("Div_QsMark").appendChild(table)

		for ( var i=0; i<3; i++ ) {
			var tr = document.createElement("TR")
			tr.id  = "Tr_QsMark."+i
			table.appendChild(tr)
		}
	}
	F_TableTetelek()

	function F_TableRepeat() {
		var table = document.createElement("TABLE")
		table.id = "repTable"
		MainFrame.appendChild(table)

		table.style.display = "none"
		table.style.position = "fixed"
		table.style.left = "40%"
		table.style.top = "30%"
		table.style.backgroundColor = "white"

		var tr = document.createElement("TR")
		table.appendChild(tr)
		var th = document.createElement("TH")
		th.innerHTML = "rep"
		tr.appendChild(th)
		var th = document.createElement("TH")
		th.innerHTML = "min"
		tr.appendChild(th)
		var th = document.createElement("TH")
		th.innerHTML = "hossz"
		tr.appendChild(th)
		var th = document.createElement("TH")
		th.innerHTML = "left"
		tr.appendChild(th)
		var th = document.createElement("TH")
		th.innerHTML = "still"
		tr.appendChild(th)
		var th = document.createElement("TH")
		th.innerHTML = "average"
		tr.appendChild(th)
		
		for ( var i=0; i<6; i++ ) {
			var tr = document.createElement("TR")
			table.appendChild(tr)

			var th = document.createElement("TH")
			th.innerHTML = i
			th.id = "hkQ.nextRep"+i
			tr.appendChild(th)
			if ( localStorage.getItem("hkQ.nextRep"+i) ) {
				th.style.backgroundColor = localStorage.getItem("hkQ.nextRep"+i)
			} else {
				th.style.backgroundColor = "limegreen"
			}
			th.onclick = function(){
				if ( this.style.backgroundColor == "limegreen" ) {
					this.style.backgroundColor = "coral"
				} else {
					this.style.backgroundColor = "limegreen"
				}
				var nextRepID = this.id
				localStorage.setItem(nextRepID,this.style.backgroundColor)
			}

			var td = document.createElement("TD")
			td.id = i+"min"
			func_calcTimeDiff(i)
			td.innerHTML = timeDiff
			tr.appendChild(td)

			var td = document.createElement("TD")
			td.id = i+"hossz"
			tr.appendChild(td)

			var td = document.createElement("TD")
			td.id = i+"left"
			tr.appendChild(td)

			var td = document.createElement("TD")
			td.id = i+"still"
			tr.appendChild(td)

			var td = document.createElement("TD")
			td.id = i+"average"
			tr.appendChild(td)
		}
	}
	F_TableRepeat()
}
F_CreateQDiv()


// –––– –––– –––– –––– –––– –––– –––– –––– –––– ––––
function func_calcTimeDiff(repCount){
	if ( repCount == 0 ) {
		timeDiff = 45
	} else if ( repCount == 1 ) {
		timeDiff = 200
	} else if ( repCount == 2 ) {
		timeDiff = 800
	} else if ( repCount == 3 ) {
		timeDiff = 3500
	} else if ( repCount == 4 ) {
		timeDiff = 5000
	} else if ( repCount == 5 ) {
		timeDiff = 7000
	}
}
var vizsgaTime = Number(localStorage.getItem("vizsgaSkip"))*60
// –––– –––– –––– –––– –––– –––– –––– –––– –––– ––––*/


var nextMark = 0
var nextRep = "zerus"
function F_nextMark(jegy){ // következő kérdés nehézségét beállítja, 
	// repeat alapján
	//console.clear()
	//console.log("– – – – – – – F_nextMark – – – – – – – –")
	var zeroVal = 0
	var arany = []
	document.getElementById("div_nextQMark").innerHTML = ""
	for ( var i=0;  i<6;  i++ ) {
		var averageTime = Number(document.getElementById(i+"average").title)
		var defTime
		func_calcTimeDiff(i)
		defTime = timeDiff
		
		if ( isNaN(averageTime) == false ) {
			zeroVal = zeroVal + averageTime/defTime
			arany[i] = zeroVal
		} else {
			arany[i] = 0
		}
		//console.log(i+"i: "+arany[i])
	}
	
	var diff = 0
	for ( var i=0;  i<6;  i++ ) {
		var num = arany[i] - diff
		num = 100*num/zeroVal
		num = num.toFixed(0);
		if ( arany[i] == 0 ) { num = 0 }
		document.getElementById("div_nextQMark").innerHTML = document.getElementById("div_nextQMark").innerHTML + i + ": " + num + "%<br>"
		if ( arany[i] != 0 ) { diff = arany[i] }
	}
	//console.log("- - - - - - - - -")
	var randNum  = Math.random() * zeroVal
	//console.log(randNum)
	nextRep = "zerus"
	if 			 ( randNum < arany[0] ) { nextRep = 0 
		} else if ( randNum < arany[1] ) { nextRep = 1 
		} else if ( randNum < arany[2] ) { nextRep = 2 
		} else if ( randNum < arany[3] ) { nextRep = 3 
		} else if ( randNum < arany[4] ) { nextRep = 4 
		} else if ( randNum < arany[5] ) { nextRep = 5 
	}
	//console.log(nextRep)
	//alert("STOP")
	

	// az előző sikere alapján
	/*jegy = parseInt(jegy,10)
	if ( Math.random() > 0.5 ) {
		if ( jegy == 1 ) {
			nextMark = 3
		} else if ( jegy == 3 || jegy == 4 ) {
			nextMark = 1
		}
	} else {
		nextMark = 0
	}*/
}

localStorage.setItem("msb.I.",0)
localStorage.setItem("msb.II.",0)
localStorage.setItem("msb.III.",0)
localStorage.setItem("msb.IV.",0)

var tetelek = []
function F_tetelChoose(){ // createli a választható tételek listáját
	function F_MainDiv() {
		var div = document.createElement("div")
		div.id = "Div_Tetelek"

		var questDiv = document.getElementById("div_MainFrame");
		questDiv.appendChild(div)

		div.style.backgroundColor = "white"
		div.style.overflow = "auto"
		div.style.width = "80vw"
		div.style.height = "80vh"
		div.style.position = "fixed"
		div.style.top = "50%"
		div.style.left = "50%"
		div.style.marginTop = "-40vh"
		div.style.marginLeft = "-40vw"
		div.style.border = "10px solid black"
		div.style.display = "none"
	}
	F_MainDiv()

	function createTemakor(szoveg) {
		var details = document.createElement("DETAILS")
		var summary = document.createElement("SUMMARY")
		details.id = szoveg+"_details"
		details.appendChild(summary)
		document.getElementById("Div_Tetelek").appendChild(details)
		summary.innerHTML = szoveg.bold()
		summary.style.backgroundColor = "gainsboro";
		summary.style.color = "black";
		summary.style.fontSize = "120%"
		
		var div = document.createElement("div") // firefoxba kellett
		details.appendChild(div)
		
		var pageName = document.title
		if ( localStorage.getItem(pageName+" "+szoveg) ) {
			details.open = true
		}
		summary.onclick = function(){
			if ( details.open != true ) {
				localStorage.setItem(pageName+" "+szoveg,true)
			} else {
				localStorage.removeItem(pageName+" "+szoveg)
			}
		}
	}

	var Table = document.getElementsByClassName("mainTitle")
	for ( var i = 0;   i < Table.length;   i++ ) { // temakorok
		szoveg = Table[i].innerHTML
		Table[i].parentElement.className = "temakor"
		Table[i].parentElement.id = szoveg
		createTemakor(szoveg)
	}
	createTemakor("uncategorized")

	var Table = document.getElementsByClassName("phase")
	for ( var i = 0;   i < Table.length;   i++ ) { // tetelek
		Table[i].parentElement.className = "tetel"
		var tetelID = i + "," + Table[i].innerHTML
		Table[i].parentElement.id = tetelID
		tetelek[tetelID] = []

		var szoveg = Table[i].innerHTML
		
		var div = document.createElement("div");
		
		var button = document.createElement("input");
		button.type = "button";
		button.style.border = "2px solid black";
		button.style.height = "23px";
		button.style.width = "30px";
		button.style.fontSize = "small"
		button.id = tetelID+"_button";
		div.appendChild(button)

		var label = document.createElement("label")
		label.id = tetelID +"_button_label"
		label.innerHTML = '<b>'+ szoveg +'</b>'
		div.appendChild(label)

		var ul = document.createElement("div")
		ul.style.display = "none"
		div.appendChild(ul)

		if ( Table[i].parentElement.parentElement.className == "temakor" ) {
			var elem = document.getElementById(Table[i].parentElement.parentElement.id + "_details")
			elem.appendChild(div)
		} else {
			var elem = document.getElementById("uncategorized_details")
			elem.appendChild(div)
		}

		if ( localStorage.getItem(button.id) == "true" ) {
			label.style.backgroundColor = "paleGreen";
			F_changeTetelCount("1",button)
		} else {
			label.style.backgroundColor = "";
		}
	
	
		var phaseDiv = Table[i].parentElement
		var title = phaseDiv.getElementsByClassName("title")
		for ( var y = 0;   y < title.length;   y++ ) { // title
			var li = document.createElement("li")
			li.innerHTML = title[y].innerHTML
			li.onclick = function(){
				if ( this.style.color != "red" ) {
					this.style.color = "red"
				} else {
					this.style.color = "black"
				}
			}
			ul.appendChild(li)
		}
		
		var button = document.getElementById(tetelID+"_button")
		button.onclick = function(){
			F_clickTemaButton(this)
		}
		var label = document.getElementById(tetelID+"_button_label")
		label.onclick = function(){
			var parent = this.parentElement
			var div = parent.getElementsByTagName("DIV")[0];
			if ( div.style.display == "none" ) {
				div.style.display = "block"
			} else {
				div.style.display = "none"
			}
		}
	}
	//console.log(document.getElementById("Div_Tetelek").innerHTML)
	
	function F_altetelID(){ // ezt is tegyem majd be 'func_tetelChooseba'
		var Table = document.getElementsByClassName("title")
		for ( var i = 0;   i < Table.length;   i++ ) {
			Table[i].parentElement.className = "altetel"
			var altetelID = i + "," + Table[i].innerHTML
			Table[i].parentElement.id = altetelID
			var tetelID = Table[i].parentElement.parentElement.id
			//console.log(Table[i].innerHTML)
			tetelek[tetelID][altetelID] = []
		}
	}
	F_altetelID()
}


function F_sortQuests(){ // felmegy tételig, ha volt közben altétel is, akkor abba teszi
	//console.clear()
	console.log("– – – – – – – func_sortQuests – – – – – – – –")
	//console.log(": "+Qcount)
	//alert("stop")
	for ( i=0;  i<Qcount;  i++ ) {
		var Qid = i +1
		Qid = "Q."+Qid
		var parent = document.getElementById(Qid)

		/*console.clear()
		var Qtxt = arrQid[Qid]
		console.log("Qid: "+Qid)
		console.log("Qtxt: "+kerdesek[i].innerHTML)*/

		do {
			parent = parent.parentElement
		} while ( parent.className != "altetel" && parent.className != "tetel" );

		if ( parent.className  == "altetel" ) {
			tetelek[parent.parentElement.id][parent.id][Qid] = true
			//console.log("altetel: " +Qid)
		} else if ( parent.className  == "tetel" ) {
			tetelek[parent.id][Qid] = true
			//console.log("tetel: " +Qid)
		}
	}
	//document.getElementById("input_toggleAll").title = Qcount
}

// TITLE (abbr tooltip)
var tooltipSpan = document.createElement("span");
function func_tooltipFuncs(){
	document.body.appendChild(tooltipSpan)
	tooltipSpan.style.visibility = "hidden";
	tooltipSpan.style.border = "2px solid black";
	tooltipSpan.style.backgroundColor = "azure";
	tooltipSpan.style.position = "absolute";
	tooltipSpan.style.left = "50%";
	tooltipSpan.style.top = "50%";
	tooltipSpan.style.fontSize = "smaller";
	tooltipSpan.style.padding = "2px 2px 2px 5px";
}
func_tooltipFuncs()
function func_showTooltip(element){

	defText = element.title
	tooltipSpan.style.visibility = "visible";
	tooltipSpan.innerHTML = element.title
		
	var posX = element.offsetLeft
	var posY = element.offsetTop 
	var par = element.offsetParent

	tooltipSpan.style.minWidth = null;
	tooltipSpan.style.maxWidth = 300;
	if ( tooltipSpan.offsetWidth > 100 ) {
		tooltipSpan.style.minWidth = 100;
	} else {
		tooltipSpan.style.minWidth = tooltipSpan.offsetWidth
	}
	if ( tooltipSpan.offsetWidth > par.offsetWidth - posX -10 ) {
		tooltipSpan.style.left = posX - tooltipSpan.offsetWidth + par.offsetWidth - posX - 10
	} else {
		tooltipSpan.style.left = posX;
	}
	tooltipSpan.style.top = posY +20;
	element.title = '';
}
var table_defText = []
function func_titleVerChange(velement){
	table_defText[velement] = velement.title
	tooltipSpan.style.position = "fixed";
	velement.onclick = function(event){
		tooltipSpan.style.visibility = "visible";
		tooltipSpan.innerHTML = table_defText[this]
		tooltipStatus = "show"
		event.stopPropagation();
			
		var posX = this.offsetLeft
		var posY = this.offsetTop 

		tooltipSpan.style.minWidth = null;
		tooltipSpan.style.maxWidth = 300;
		
		var x = event.clientX;
		var y = event.clientY;
		if ( tooltipSpan.offsetWidth > document.body.offsetWidth - posX -10 ) {
			tooltipSpan.style.left = posX - tooltipSpan.offsetWidth + document.body.offsetWidth - posX - 10
		} else {
			tooltipSpan.style.left = x
		}
		tooltipSpan.style.top = y+10
	};
	velement.onmouseover = function(event){
		tooltipSpan.style.visibility = "visible";
		tooltipSpan.innerHTML = this.title
			
		var posX = this.offsetLeft
		var posY = this.offsetTop

		tooltipSpan.style.minWidth = null;
		tooltipSpan.style.maxWidth = 300;
		
		var x = event.clientX;
		var y = event.clientY;
		if ( tooltipSpan.offsetWidth > document.body.offsetWidth - posX -10 ) {
			tooltipSpan.style.left = posX - tooltipSpan.offsetWidth + document.body.offsetWidth - posX - 10
		} else {
			tooltipSpan.style.left = x
		}
		tooltipSpan.style.top = y+10

		table_defText[this] = this.title;
		this.title = '';
	};
	velement.onmouseout = function(){
		this.title = table_defText[this];
		if ( tooltipStatus != "show" ) {
			tooltipSpan.style.visibility = "hidden";
		}
	};
}
function func_TitleChange(){
	//var abbrok = document.getElementsByTagName("ABBR");
	var abbrok = document.querySelectorAll("*[title]");
	for ( var i = 0; i < abbrok.length; i++ ) {
		func_titleVerChange(abbrok[i])
	}
}
func_TitleChange()

var prior,hossz,jegy
function func_calcPriorHosszJegy(elem){
	var num = elem.className.search("/");
	hossz = elem.className.substring(num+1);
	prior = elem.className.substring(num-1,num);
	if ( hossz == "j" ) { hossz = 0 }
	if ( isNaN(hossz) == true ) { hossz = 0 }
	if ( prior == 1 ) {
		prior = 0.33
	} else if ( prior == 2 ) {
		prior = 0.66 
	} else if ( prior == 3 ) {
		prior = 1
	} else if ( prior == 4 ) {
		prior = 1.25
	} else if ( prior == 5 ) {
		prior = 1.5
	} else {
		prior = 0
	}
	if ( prior == "J" || prior == "j" ) { alert("error: J a prior még") } // ha már nem jön elő, törölhetem ezt a sort
	F_calculateLSid(elem)
	var LSid = actLSid
	jegy = localStorage.getItem(LSid+'_jegy')
	if ( jegy == "1" && localStorage.getItem(LSid+'_repeat') > 0 ) { // repeat is kell, mert ha 0ra osztályzom a jegyet akkoris 1nek menti el
		jegy = 4
	} else if ( jegy == 2 ) {
		jegy = 7
	} else if ( jegy == 3 ) {
		jegy = 8
	} else if ( jegy == 4 ) {
		jegy = 10
	} else {
		jegy = 0
	}
}


function F_kerdesStatus(){ // kérdés hány %-on áll?
	var allStatusQs = document.getElementsByClassName("status")
	function F_calculateThis(thisQ){
		F_calculateLSid(thisQ)
		var LSid = actLSid
		
		func_calcPriorHosszJegy(thisQ)
		
		var date = new Date();
		var idopont = Math.floor(date.getTime()/60000) - localStorage.getItem(LSid+'_idopont')

		if ( localStorage.getItem(LSid+'_repeat') == null) {
			localStorage.setItem(LSid+'_repeat', 0);
		}
		var repCount = Number(localStorage.getItem(LSid+'_repeat'))
		func_calcTimeDiff(repCount)
		//console.log(LSid+ " " +hossz)

		// if ( localStorage.getItem(LSid+"_skip") != "perma" ){
			trueJegy = trueJegy + Math.pow(0.8, idopont / timeDiff) * prior * hossz * jegy
			maxJegy = maxJegy + prior * hossz * 10
		// }
	}
	
	for ( var i = 0;   i < allStatusQs.length;   i++ ) {
		var maxJegy = 0
		var trueJegy = 0
		var statusQ = allStatusQs[i].parentElement
		if ( statusQ.parentElement.id != "kerdeslocation" ) {
			if ( statusQ.className.indexOf("kerdes") != -1 ) {
				/*var Qtext = '<details class="' +statusQ.className+ '">' +statusQ.innerHTML+ "</details>"
				var find = ' id="(.*?)"'
				Qtext = Qtext.replace(new RegExp(find, 'g'), "")
				var LSid = txtLS[Qtext]*/
				F_calculateThis(statusQ)
			}
			var altQs = statusQ.getElementsByTagName("*")
			for ( var y = 0;   y < altQs.length;   y++ ) {
				if ( altQs[y].className.indexOf("kerdes") != -1 ) {
					F_calculateThis(altQs[y])
				}
			}
			var red, green
			if ( 2*trueJegy/maxJegy > 1 ) {
				var more = 2*trueJegy/maxJegy -1
				red = Math.round(255*(1-more))
				green = 255
			} else {
				var less = 2*trueJegy/maxJegy
				green = Math.round(255*less)
				red = 255
			}
			document.getElementById(i+"_markja").innerHTML = Math.round(100 * trueJegy/maxJegy)
			document.getElementById(i+"_markja").style.backgroundColor = "rgb("+red+", "+green+", 0)";
		}
	}
}
function F_temakorStatus(){ // Tétel hány %-on áll? --> beállítja a buttonColort ez alapján
	for ( var tetel in tetelek ) {
		var maxJegy = 0
		var trueJegy = 0
		var childs = document.getElementById(tetel).getElementsByTagName("*")
		for ( var i = 0;   i < childs.length;   i++ ) {
			if ( childs[i].classList.contains("kerdes") == true ) {
				var Qid = childs[i].id
				var Qtxt = arrQid[Qid]
				var LSid = txtLS[Qtxt]
				func_calcPriorHosszJegy(childs[i])

				var date = new Date();
				var idopont = Math.floor(date.getTime()/60000) - localStorage.getItem(LSid+'_idopont')

				if ( localStorage.getItem(LSid+'_repeat') == null) {
					localStorage.setItem(LSid+'_repeat', 0);
				}
				var repCount = Number(localStorage.getItem(LSid+'_repeat'))
				func_calcTimeDiff(repCount)
				
				if ( localStorage.getItem(LSid+'_skip') == "vizsgaSkip") { idopont = 0 }
				if ( localStorage.getItem(LSid+'_skip') == "perma") { prior = 0 }

				trueJegy = trueJegy + Math.pow(0.8, idopont / timeDiff) * prior * hossz * jegy
				maxJegy = maxJegy + prior * hossz * 10
			} 
		}
		var red, green
		if ( 2*trueJegy/maxJegy > 1 ) {
			var more = 2*trueJegy/maxJegy -1
			red = Math.round(255*(1-more))
			green = 255
		} else {
			var less = 2*trueJegy/maxJegy
			green = Math.round(255*less)
			red = 255
		}
		var button = document.getElementById(tetel+"_button")
		button.style.backgroundColor = "rgb("+red+", "+green+", 0)";
		button.value = Math.round(100 * trueJegy/maxJegy)
		if ( isNaN(button.value) == true ) { button.value = "" }
	}
}

var obj_fixNote = [] // object (nem table és nem array!)
var obj_skip = [] // object (nem table és nem array!)

function F_calculateLSid(actQ){
	actLSid = undefined
	if ( actQ.className.indexOf("{") > -1 ) {
		var begin = actQ.className.indexOf("{")
		var end = actQ.className.indexOf("}")
		var EXPid = actQ.className.slice(begin+1,end)
		
		var string = localStorage.getItem("hkExpQ."+EXPid)
		actLSid = string.slice(0,string.indexOf(" "))
		actQtext = localStorage.getItem(actLSid)
	} 
	if ( actLSid == undefined )  {
		var Qtxt = '<details class="' +actQ.className+ '">' +actQ.innerHTML+ "</details>"
		F_QtxtQname(Qtxt)
		if ( localStorage.getItem(qName) ) { 
			actLSid = localStorage.getItem(qName) 
			actQtext = localStorage.getItem(actLSid)
		}
		/*if ( qName.indexOf("glikogén lebontás/szintézis<!--3971-->") != -1 ) { 
			console.clear() 
			console.log(actLSid+ ": " +qName) 
			console.log(Qtxt) 
			alert("van bizonyQ")
		}*/
	}
	if ( actLSid == undefined && actQ.id )  {
		var Qid = actQ.id
		actQtext = arrQid[Qid]
		if ( txtLS[actQtext] ) {
			actLSid = txtLS[actQtext]
		}
	} 
	if ( actLSid == undefined ) {
		actQtext = '<details class="' +actQ.className+ '">' +actQ.innerHTML+ "</details>"
		if ( actQ.className.indexOf("if") > -1 ) {
			var begin = actQtext.indexOf('>ismerd fel</summary><ul class="normal"><div><font class="abbr">metszet ►</font>')
			var str = actQtext.slice(begin+80)
			var end = str.indexOf("</div>")
			str = str.slice(0,end)
			var oldStr = '>ismerd fel</summary><ul class="normal"><div><font class="abbr">metszet ►</font>' + str + '</div>'
			actQtext = actQtext.replace(oldStr,'>'+str+'</summary><ul class="normal">')
		}
		if ( txtLS[actQtext] ) {
			actLSid = txtLS[actQtext]
		}
//		if ( actQtext.indexOf("hormonok közül vazokonstrikciót vált ki") != -1 ) { console.log(actLSid+ ": " +actQtext) }
	}
}


function func_tableSkipFix(){
	for ( var i=0;  i<kerdesek.length;  i++ ) {
		F_calculateLSid(kerdesek[i])
		var Qtext = actQtext
		var LSid = actLSid

		if ( typeof LSid == "undefined" ) {
			// alert(kerdesek[i].id+" + LSid=undefined + "+Qtext)
			// azoknak undefinied egyenlőre, melyek épp az aktuálisak
		} else if ( localStorage.getItem(LSid+"_note") ) {
			//if ( LSid == "undefined" ) { alert("a: " + kerdesek[i].innerHTML) }
			//if ( LSid == "undefined" ) { alert("a: " + kerdesek[i].innerHTML) }
			/*if ( LSid ) { 
			} else {
				alert(kerdesek[i].innerHTML) 
			}*/
			//if ( Qtext.indexOf("vese - anterior") !== -1 ) { alert(LSid + ": " + Qtext) }
			obj_fixNote[LSid] = localStorage.getItem(LSid+"_note")
		} else {
			if ( obj_fixNote[LSid] ) { delete obj_fixNote[LSid] }
		}
		if ( localStorage.getItem(LSid+"_skip") ) {
			if ( localStorage.getItem(LSid+"_skip") == "perma" ){
				obj_skip[LSid] = localStorage.getItem(LSid+"_skip")
			} else if ( localStorage.getItem(LSid+"_skip") == "important" ){
				obj_skip[LSid] = localStorage.getItem(LSid+"_skip")
			} else if ( localStorage.getItem(LSid+"_skip") == "vizsgaSkip" ){
				var date = new Date();
				date = Math.floor(date.getTime()/60000)
				if ( date > vizsgaTime ) {
					localStorage.removeItem(LSid+'_skip')
				} else {
					obj_skip[LSid] = localStorage.getItem(LSid+"_skip")
				}
				//if ( obj_skip[LSid] ) { delete obj_skip[LSid] }
			} else {
				var date = new Date();
				date = Math.floor(date.getTime()/60000)
				var difference = date - localStorage.getItem(LSid+"_idopont")
				difference = difference /60 // átállítja órára
				if ( difference < localStorage.getItem(LSid+"_skip") ) {
					obj_skip[LSid] = localStorage.getItem(LSid+"_skip")
				} else {
					if ( obj_skip[LSid] ) { delete obj_skip[LSid] }
					localStorage.removeItem(LSid+'_skip')
				}
			}
		} else {
			if ( obj_skip[LSid] ) { delete obj_skip[LSid] }
		}
	}
	
	/*console.clear()
	for ( var LSid in obj_skip ) {
		console.log(LSid)
	}
	alert("stop SOROS")*/
}
function F_valFix(){
	var x = 0
	for ( var id in obj_fixNote ) {
		if ( obj_fixNote[id] ) {
			x = x+1
		}
	}
	document.getElementById("btn_fix").value = x;
}
F_valFix()
function F_valSkip(){
	var x = 0
	var y = 0
	for ( var id in obj_skip ) {
		if ( obj_skip[id] == "perma" ) {
			x = x+1
		}
		if ( obj_skip[id] == "vizsgaSkip" ) {
			y = y+1
			//console.log(id+"_skip = vizsgaSkip")
		}
	}
	document.getElementById("btn_skip").value = x;
	document.getElementById("btn_vizsgaskip").value = y;
}
F_valSkip()


function func_showQtext(LSid){
	var Qtext = localStorage.getItem(LSid.slice(0,LSid.indexOf("_")))
	Qtext = Qtext.replace('<details','<details open')
	document.getElementById("div_SkipTexttxt").innerHTML = Qtext
	var qElem = document.getElementById("div_SkipText")
	qElem.style.display = 'block';
	
	func_abbrSet(qElem)
	var allDetails = qElem.getElementsByTagName("details")
	for ( var i=0; i<allDetails.length; i++ ) {
		allDetails[i].ontoggle = function(e){
			F_loadImgVideo(this,e)
		}
	}
}

function func_DeleteSkipFix(kerdes){
	if (confirm('biztos törlöd? '+kerdes)) {
		skipfix = kerdes.slice(kerdes.indexOf("_"))
		skipfix = skipfix.slice(1,skipfix.length-5)
		kerdes = kerdes.slice(0,kerdes.indexOf("_"));  // remove "_skipClear" vagy "_fixClear" a nevéből és csak az id marad
		if ( localStorage.getItem(kerdes+'_skip') == "vizsgaSkip" ) { skipfix = "vizsgaskip" }
		if ( skipfix == "fix" ) {
			localStorage.removeItem(kerdes+'_note')
		} else if ( skipfix == "skip" || skipfix == "vizsgaskip" ) {
			localStorage.removeItem(kerdes+'_skip')
		}
		func_tableSkipFix()
		func_SetTextOfSkipFixDiv("btn_"+skipfix)
		F_valFix()
		F_valSkip()
	}
}
var lastQSkip
function func_SetTextOfSkipFixDiv(SkipFix){
	var fullText = ""
	var qCount = 0
	if ( SkipFix == "btn_fix" ) {
		document.getElementById("div_Fix").innerHTML = ""
		for ( var LSid in obj_fixNote ) {
			if ( obj_fixNote[LSid] ) {
				/*var text = document.getElementById("div_Fix").innerHTML
				//alert(LSid)
				var Qtext = localStorage.getItem(LSid)
				//alert(kerdes + ": " + obj_fixNote[kerdes] + Qtext)
				var newText = " <button id='testID' class='fix' style='border: 3px solid black;' type='button' onclick='func_DeleteSkipFix(this.id)'>✖</button> " + obj_fixNote[LSid] +"</summary>"
				Qtext = Qtext.replace("</summary>",newText)
				
				document.getElementById("div_Fix").innerHTML = text + Qtext
				document.getElementById("testID").id = LSid + "_fixClear"
				*/
				
				var text = document.getElementById("div_Fix").innerHTML
				var Qtext = localStorage.getItem(LSid)
				if ( Qtext != null ) {
					var Qtext = localStorage.getItem(LSid)
					Qtext = Qtext.slice(Qtext.indexOf("<summary")+8,Qtext.indexOf("</summary"))
					Qtext = Qtext.slice(Qtext.indexOf(">")+1)
					Qtext = '<font color="green" id="'+LSid+'_fullText" onclick="func_showQtext(this.id)">' + Qtext + " –|– " + obj_fixNote[LSid] + '</font><br>'
					Qtext = "<button id='"+LSid+"_fixClear' class='fix' style='border: 3px solid black;' type='button' onclick='func_DeleteSkipFix(this.id)'>✖</button>" + Qtext
					fullText = fullText + Qtext
					qCount = qCount +1
				}
			}
		}
		fullText = "qCount:" +qCount+ "<br>" +fullText
		document.getElementById("div_Fix").innerHTML = fullText
	}
	if ( SkipFix == "btn_skip" ) {
		document.getElementById("div_Skip").innerHTML = ""
		for ( var LSid in obj_skip ) {
			if ( obj_skip[LSid] != "important" && obj_skip[LSid] != "vizsgaSkip" ) {
				var text = document.getElementById("div_Skip").innerHTML
				var Qtext = localStorage.getItem(LSid)
				if ( Qtext != null ) {
					var Qtext = localStorage.getItem(LSid)
					Qtext = Qtext.slice(Qtext.indexOf("<summary")+8,Qtext.indexOf("</summary"))
					Qtext = Qtext.slice(Qtext.indexOf(">")+1)
					Qtext = '<font color="green" id="'+LSid+'_fullText" onclick="func_showQtext(this.id)">' + Qtext + '</font><br>'
					Qtext = "<button id='"+LSid+"_skipClear' class='fix' style='border: 3px solid black;' type='button' onclick='func_DeleteSkipFix(this.id)'>✖</button>" + Qtext
					fullText = fullText + Qtext
					qCount = qCount +1
				}
			}
		}
		fullText = "qCount:" +qCount+ "<br>" +fullText
		document.getElementById("div_Skip").innerHTML = fullText
	}
	if ( SkipFix == "btn_vizsgaskip" ) {
		document.getElementById("div_Skip").innerHTML = ""
		var fullText = ""
		var qCount = 0
		for ( var LSid in obj_skip ) {
			if ( obj_skip[LSid] == "vizsgaSkip" ) {
				var text = document.getElementById("div_Skip").innerHTML
				var Qtext = localStorage.getItem(LSid)
				if ( Qtext != null ) {
					var Qtext = localStorage.getItem(LSid)
					Qtext = Qtext.slice(Qtext.indexOf("<summary")+8,Qtext.indexOf("</summary"))
					Qtext = Qtext.slice(Qtext.indexOf(">")+1)
					Qtext = '<font color="green" id="'+LSid+'_fullText" onclick="func_showQtext(this.id)">' + Qtext + '</font><br>'
					Qtext = "<button id='"+LSid+"_skipClear' class='fix' style='border: 3px solid black;' type='button' onclick='func_DeleteSkipFix(this.id)'>✖</button>" + Qtext
					fullText = fullText + Qtext
					qCount = qCount +1
				}
			}
		}
		var date = new Date();
		var timeText = Math.floor(date.getTime()/60000)
		timeText = vizsgaTime - timeText
		timeText = timeText + "perc van még vissza viszga-resethez. <br>"
		fullText = timeText + fullText
		document.getElementById("div_Skip").innerHTML = fullText
	}
}
function func_spanClick(button){  // btn_fix, btn_skip, btn_vizsgaskip, btn_repFast, btn_newQuest
	if ( button.id == 'btn_skip' || button.id == 'btn_note' || button.id == 'btn_fix' || button.id == 'btn_vizsgaskip' ) {
		func_SetTextOfSkipFixDiv(button.id)
		document.getElementById("div_Fix").style.display = 'none';
		document.getElementById("div_Skip").style.display = 'none';
		document.getElementById("note").style.display = 'none';
	}
	if ( button.style.borderColor == "limegreen" ) {
		button.style.borderColor = "black"
		if ( button.id == 'btn_newQuest' ) { localStorage.removeItem("hk.newQ") }
	} else {
		if ( button.id == 'btn_skip' || button.id == 'btn_note' || button.id == 'btn_fix' || button.id == 'btn_vizsgaskip' ) {
			document.getElementById("btn_note").style.borderColor = "black"
			document.getElementById("btn_fix").style.borderColor = "black"
			document.getElementById("btn_skip").style.borderColor = "black"
			document.getElementById("btn_vizsgaskip").style.borderColor = "black"
		}
		if ( button.id == 'btn_skip'||  button.id == 'btn_vizsgaskip' ) {
			document.getElementById("div_Skip").style.display = 'block';
		}
		if ( button.id == 'btn_note' ) {
			document.getElementById("note").style.display = 'block';
		}
		if ( button.id == 'btn_fix' ) {
			document.getElementById("div_Fix").style.display = 'block';
		}
		button.style.borderColor = "limegreen"
		if ( button.id == 'btn_newQuest' ) { localStorage.setItem("hk.newQ",true) }
	}
}


function F_changeTetelCount(plus,button){
	var num = document.getElementById("button_Marks").innerHTML
	num = Number(num) + Number(plus)
	document.getElementById("button_Marks").innerHTML = num
	
	var parentText = button.parentElement.parentElement
	parentText = parentText.innerHTML
	parentText = parentText.slice(parentText.indexOf("<b>")+3,parentText.indexOf("</b>"))
	num = localStorage.getItem("msb."+parentText)
	num = Number(num) + Number(plus)
	localStorage.setItem("msb."+parentText,num)
}
	

function F_clickTemaButton(button){
	if ( localStorage.getItem(button.id) == "true" ) {
		localStorage.setItem(button.id,false)
		document.getElementById(button.id+"_label").style.backgroundColor = "";
		F_changeTetelCount("-1",button)
	} else {
		localStorage.setItem(button.id,true)
		document.getElementById(button.id+"_label").style.backgroundColor= "paleGreen";
		F_changeTetelCount("1",button)
	}
	
	func_calcOldNew();
	func_calcJegy()
	func_calcWork()
	func_calcDate()
	func_calcRepeat()
}

function func_putZeroQBack() { // 0-repeaten állót új kérdésbe visszateszi, ha több mint 1 napja nem ismételtem
	F_getTime()
	var startTime = myTime
	
	for ( var tetel in tetelek ) {
		if ( localStorage.getItem(tetel+"_button") == "true" ) {
			var childs = document.getElementById(tetel).getElementsByTagName("*")
			for ( var i = 0;   i < childs.length;   i++ ) {
				if ( childs[i].classList.contains("kerdes") == true ) {
					// itt elvileg még kell egy feltétel, hogy beleszámolja (talán a skippel kapcsolatos lehet, de csak tipp)
					// if ( kerdesID[fotema][temaKerdes][kerdes] == true ) { // ez volt a régiben
					var kerdes = localStorage.getItem(childs[i].innerHTML)
					var repeat = localStorage.getItem(kerdes+'_repeat')
					var date = new Date();
					var idopont = Math.floor(date.getTime()/60000) - localStorage.getItem(kerdes+'_idopont')
					if ( repeat == 0 && idopont > 1440 ) {
						localStorage.removeItem(kerdes+'_repeat')
						localStorage.removeItem(kerdes+'_jegy')
					}
				}
			}
		}
	}
	
	F_getTime()
	var diffTime = (myTime-startTime).toFixed(2)
	console.log("– func_putZeroQBack – " + diffTime+"s")
}
function func_calcJegy() { // átlagJegyet kiszámolja
	F_getTime()
	var startTime = myTime

	var maxJegy = 0
	var trueJegy = 0
	for ( var tetel in tetelek ) {
		if ( localStorage.getItem(tetel+"_button") == "true" ) {
			var childs = document.getElementById(tetel).getElementsByTagName("*")
			for ( var i = 0;   i < childs.length;   i++ ) {
				if ( childs[i].classList.contains("kerdes") == true ) {
					func_calcPriorHosszJegy(childs[i])
					//alert(maxJegy+" : "+prior+" : "+hossz)
					maxJegy = maxJegy + prior * hossz * 10
					//if ( isNaN(maxJegy) ==  true ) { alert(jegy) }
					trueJegy = trueJegy + prior * hossz * jegy
				}
			}
		}
	}
	//document.getElementById("btn_Jegy").value = Math.floor(100*trueJegy/maxJegy) + "%" 
	
	// ezt alattit húzzam ki, ha a % érdekel ismét
	func_calcRepTable() 
	var skipNum = 0
	for ( var id in obj_skip ) {
		if ( obj_skip[id] == "vizsgaSkip" ) {
			var Qtxt = localStorage.getItem(id)
			if ( Qtxt != null ) {
				var num = Qtxt.search("/")
				Qtxt = Qtxt.slice(num+1)
				num = Qtxt.search('"')
				num = Qtxt.slice(0,num)
				num = Number(num)
				if ( isNaN(num) == true ) { num = 0 }
				skipNum = skipNum +Number(num)
			}
		}
	}
	document.getElementById("btn_Jegy").value = parseInt(document.getElementById(1+"hossz").innerHTML) + parseInt(document.getElementById(0+"hossz").innerHTML) //+skipNum
	
	F_getTime()
	var diffTime = (myTime-startTime).toFixed(2)
	console.log("– func_calcJegy – " + diffTime+"s")
}
function func_calcWork() { // hány százaléka új kérdés még
	F_getTime()
	var startTime = myTime
	
	var maxHossz = 0
	var trueHossz = 0
	var doneLSid = ","
	for ( var tetel in tetelek ) {
		if ( localStorage.getItem(tetel+"_button") == "true" ) {
			var childs = document.getElementById(tetel).getElementsByTagName("*")
			for ( var i = 0;   i < childs.length;   i++ ) {
				if ( childs[i].classList.contains("kerdes") == true ) {
					var elem = childs[i]
					
					var num = elem.className.search("/");
					var hossz = elem.className.substring(num+1);
					if ( hossz == "j" ) { hossz = 0 }
					if ( hossz == "?" ) { hossz = 0 }
					if ( hossz == "." ) { hossz = 0 }
					if ( hossz == "x" ) { hossz = 0 }
					
					
					F_calculateLSid(elem)
					var LSid = actLSid
					
					if ( doneLSid.indexOf(LSid) != -1 && LSid != undefined ) { hossz = 0 }
					doneLSid = doneLSid +LSid+ ","
					
					maxHossz = maxHossz + Number(hossz)
					if ( localStorage.getItem(LSid+'_jegy') || localStorage.getItem(LSid+'_skip') ) {
						trueHossz = trueHossz + Number(hossz)
					}
				}
			}
		}
	}
	document.getElementById("span_Work").innerHTML = maxHossz-trueHossz
	
	F_getTime()
	var diffTime = (myTime-startTime).toFixed(2)
	console.log("– func_calcWork – " + diffTime+"s")
}
function func_calcDate() { // átlagIdőt kiszámolja
	F_getTime()
	var startTime = myTime
	
	var allDate = 0
	var countDate = 0
	for ( var tetel in tetelek ) {
		if ( localStorage.getItem(tetel+"_button") == "true" ) {
			var childs = document.getElementById(tetel).getElementsByTagName("*")
			for ( var i = 0;   i < childs.length;   i++ ) {
				if ( childs[i].classList.contains("kerdes") == true ) {
					// itt elvileg még kell egy feltétel, hogy beleszámolja (talán a skippel kapcsolatos lehet, de csak tipp)
					// if ( kerdesID[fotema][temaKerdes][kerdes] == true ) { // ez volt a régiben
					var Qid = childs[i].id
					var Qtxt = arrQid[Qid]
					var LSid = txtLS[Qtxt]
					if ( LSid+'_jegy' in localStorage ) {
						var date = new Date();
						var idopont = Math.floor(date.getTime()/60000) - localStorage.getItem(LSid+'_idopont')
						allDate = allDate + idopont
						countDate = countDate + 1
					}
				}
			}
		}
	}
	var date = allDate / countDate
	date = date / 60 / 24
	date = parseFloat(Math.round(date * 100) / 100).toFixed(1);
	document.getElementById("span_Date").innerHTML = date
	
	F_getTime()
	var diffTime = (myTime-startTime).toFixed(2)
	console.log("– func_calcDate – " + diffTime+"s")
}
function func_calcRepeat() { // átlagIsmétlések számát kiszámolja
	F_getTime()
	var startTime = myTime
	
	var questCount = 0
	var allRepVal = 0
	for ( var tetel in tetelek ) {
		if ( localStorage.getItem(tetel+"_button") == "true" ) {
			var childs = document.getElementById(tetel).getElementsByTagName("*")
			for ( var i = 0;   i < childs.length;   i++ ) {
				if ( childs[i].classList.contains("kerdes") == true ) {
					// itt elvileg még kell egy feltétel, hogy beleszámolja (talán a skippel kapcsolatos lehet, de csak tipp)
					// if ( kerdesID[fotema][temaKerdes][kerdes] == true ) { // ez volt a régiben
					F_calculateLSid(childs[i])
					var Qtext = actQtext
					var LSid = actLSid
					
					var num = childs[i].className.search("/");
					var prior = childs[i].className.substring(num-1,num);
					var hossz = childs[i].className.substring(num+1);

					var repeat
					if ( LSid == undefined ) { 
						//alert(func_calcRepeat +" "+ LSid +" "+ hossz +" "+ prior +" "+ Number(localStorage.getItem(LSid+'_repeat')))
						repeat = 0
					} else {
						repeat = Number(localStorage.getItem(LSid+'_repeat'))
					}
					
					
					if ( isNaN(hossz) ==  false ) {
						questCount = questCount + prior*hossz
						allRepVal = allRepVal + prior*hossz *repeat
					}
					/*if ( isNaN(allRepVal) == true || isNaN(questCount) == true ) {
						alert("allRepVal: " +allRepVal+ " & " +questCount+ " :questCount")
						alert(LSid+ " " +hossz+ " " +prior+ " " +Number(localStorage.getItem(LSid+'_repeat')))
					}*/
				}
			}
		}
	}
	var atlag = allRepVal / questCount
	atlag = +atlag.toFixed(1);
	document.getElementById("span_Repeat").innerHTML = atlag
	
	F_getTime()
	var diffTime = (myTime-startTime).toFixed(2)
	console.log("– func_calcRepeat – " + diffTime+"s")
}
function func_calcRepTable() { // adott repeatesek hogyan állnak kiszámolja
	F_getTime()
	var startTime = myTime
	
	var doneLSid = ","
	for ( var i = 0;   i < 6;   i++ ) { // resetelje a Tablekat 0-ra
		document.getElementById(i+"left").innerHTML = 0
		document.getElementById(i+"still").innerHTML = 0
		document.getElementById(i+"average").innerHTML = 0
		document.getElementById(i+"average").title = 0
		document.getElementById(i+"hossz").innerHTML = 0
	}
	//console.clear()
	for ( var tetel in tetelek ) {
		if ( localStorage.getItem(tetel+"_button") == "true" ) {
			var childs = document.getElementById(tetel).getElementsByTagName("*")
			for ( var i = 0;   i < childs.length;   i++ ) {
				if ( childs[i].classList.contains("kerdes") == true ) {
					// itt elvileg még kell egy feltétel, hogy beleszámolja (talán a skippel kapcsolatos lehet, de csak tipp)
					// if ( kerdesID[fotema][temaKerdes][kerdes] == true ) { // ez volt a régiben
					func_calcPriorHosszJegy(childs[i])
					var actQhossz = Number(hossz)
					
					//var Qid = childs[i].id
					//var Qtxt = arrQid[Qid]
					var Qtxt = childs[i].innerHTML
					/*console.clear()
					console.log(Qid)
					console.log(Qtxt)
					alert("stop")*/
					F_QtxtQname(Qtxt)
					var LSid = localStorage.getItem(qName)
					if ( LSid == null || LSid == undefined ) { LSid = txtLS[Qtxt] }
					
					if ( doneLSid.indexOf(LSid) == -1 || LSid == undefined ) { 
						doneLSid = doneLSid +LSid+ ","
						
						var kerdes = localStorage.getItem(childs[i].innerHTML)
						if ( localStorage.getItem(LSid+'_idopont') != null && localStorage.getItem(LSid+'_repeat') != "" ) {
							if ( localStorage.getItem(LSid+'_skip') === null || localStorage.getItem(LSid+'_skip') === "important" ) {
								var repCount = localStorage.getItem(LSid+'_repeat')
								var min = document.getElementById(repCount+"min").innerHTML
								var date = new Date();
								var idopont = localStorage.getItem(LSid+'_idopont')
								idopont = Math.floor(date.getTime()/60000) - idopont
								if ( repCount == 0 && idopont > 100 ) {
									if ( localStorage.getItem(LSid+"_skip") == null ) {
										//alert(repCount+ " " +idopont+ " " +LSid+ " " +Qtxt)
									}
								}

								if ( idopont > min ) { // Tableba hozzáad 1et left-hez
									document.getElementById(repCount+"left").innerHTML = parseInt(document.getElementById(repCount+"left").innerHTML) +1
									document.getElementById(repCount+"average").title = parseInt(document.getElementById(repCount+"average").title) +idopont
								} else { // Tableba hozzáad 1et still-hez
									document.getElementById(repCount+"still").innerHTML = parseInt(document.getElementById(repCount+"still").innerHTML) +1
								}
								document.getElementById(repCount+"average").innerHTML = parseInt(document.getElementById(repCount+"average").innerHTML) +idopont
								document.getElementById(repCount+"hossz").innerHTML = parseInt(document.getElementById(repCount+"hossz").innerHTML) +actQhossz
							}
						}
					}
				}
			}
		}
	}
	for ( var i = 0;   i < 6;   i++ ) { // resetelje a Tablekat 0-ra
		var average = parseInt(document.getElementById(i+"average").innerHTML)
		var count = parseInt(document.getElementById(i+"still").innerHTML) + parseInt(document.getElementById(i+"left").innerHTML)
		average = average / count
		average = +average.toFixed(0);
		document.getElementById(i+"average").innerHTML = average
		
		average = parseInt(document.getElementById(i+"average").title)
		count = parseInt(document.getElementById(i+"left").innerHTML)
		average = average / count
		average = +average.toFixed(0);
		document.getElementById(i+"average").title = average
	}
	
	F_getTime()
	var diffTime = (myTime-startTime).toFixed(2)
	console.log("– func_calcRepTable – " + diffTime+"s")
}
function func_calcOldNew(){
	F_getTime()
	var startTime = myTime
	
	var doneLSid = ","
	//console.clear()
	//console.log("– func_calcOldNew –")
	var kerdesNew = 0
	var repNew = 0
	var repOld = 0
	var repFast = 0
	var repSlow = 0
	function calculate(Qid){
		var actQ = document.getElementById(Qid)
		F_calculateLSid(actQ)
		var LSid = actLSid
		//console.log("func_calcOldNew: " +Qtxt)
		
		if ( LSid != undefined ) {
			if ( doneLSid.indexOf(LSid) == -1 ) { 
				doneLSid = doneLSid +LSid+ ","
				//console.log(Qid+ " :Qid-LSid: "+LSid)
				if ( localStorage.getItem(LSid+"_skip") != "perma" && localStorage.getItem(LSid+"_skip") != "vizsgaSkip" ) {
					if ( localStorage.getItem(LSid+'_jegy') != null && localStorage.getItem(LSid+'_jegy') != "" ) {
						var repCount = Number(localStorage.getItem(LSid+'_repeat'))
						var date = new Date();
						var idopont = Math.floor(date.getTime()/60000) - localStorage.getItem(LSid+'_idopont')
						func_calcTimeDiff(repCount)
						
						//ez az, hogy csak azt dobhatja ki, melynél a vizsga már közelebb van, mint a repTime
						var remain = Math.floor(date.getTime()/3600000)
						remain = localStorage.getItem("vizsgaSkip") - remain
						remain = remain*60
						
						if ( localStorage.getItem(LSid+"_jegy") >= 1 ) {
							//if ( timeDiff >= idopont ) {
							if ( remain > idopont ) {
								repFast = repFast +1
							} else {
								repSlow = repSlow +1
							}
						}
					} else {
						kerdesNew = kerdesNew +1
					}
				
					if ( localStorage.getItem(LSid+"_skip") == "important" ) {
						if ( timeDiff >= idopont ) {
							repOld = repOld +1
						} else {
							repNew = repNew +1
						}
					}
				}
			}
		} else {
			kerdesNew = kerdesNew +1
			//alert(Qtxt)
		}
	}
	for ( var tetel in tetelek ) { // végignézi az összes kérdést
		if ( localStorage.getItem(tetel+"_button") == "true" ) {
			for ( var qat in tetelek[tetel] ) {
				if ( tetelek[tetel][qat] == true ) {
					calculate(qat)
				} else {
					for ( var q in tetelek[tetel][qat] ) {
						calculate(q)
					}
				}
			}
		}
	}
	document.getElementById("btn_newQuest").value = kerdesNew
	//document.getElementById("span_RepNew").innerHTML = repNew;
	document.getElementById("span_RepNew").innerHTML = repNew;
	document.getElementById("span_RepOld").innerHTML = repOld;
	document.getElementById("btn_RepFast").value = repFast;
	document.getElementById("span_RepSlow").innerHTML = repSlow
	
	F_getTime()
	var diffTime = (myTime-startTime).toFixed(2)
	console.log("– func_calcOldNew – " + diffTime+"s")
}


// SAVE LS (begin)
function download(filename, text) { // (netről copyztam) --> (azért kellett, mert androidon máshogy nemtudom lementeni)
	 var pom = document.createElement('a');
	 pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	 pom.setAttribute('download', filename);

	 if (document.createEvent) {
		  var event = document.createEvent('MouseEvents');
		  event.initEvent('click', true, true);
		  pom.dispatchEvent(event);
	 }
	 else {
		  pom.click();
	 }
}
/*function setItem(key, value){
	if (typeof value === 'object') {
		value = JSON.stringify(value);
	}
	localStorage.setItem(key, value);
}*/
/*function getItem(key){
	if (key){
		try{
			return JSON.parse(localStorage.getItem(key));
		}
		catch(e){
			return localStorage.getItem(key);
		}
	}
}*/
function func_saveLS() {
	var text = ""
	
	F_getTime()
	var diffTime = myTime-oldTime
	console.log("– download BEGIN – " + diffTime)
	var lsLength = localStorage.length
	lsLength = lsLength*3/4
	lsLength = Math.floor(lsLength)
	var i = 0
	for ( i=0; i<lsLength; i++ ) { text = text + localStorage.key(i) + " = " + localStorage.getItem(localStorage.key(i)) + " NEXTONE " }
	/*for ( i=0; i<lsLength; i++ ) {
		text = text + localStorage.key(i) + " = " + getItem(localStorage.key(i)) + " NEXTONE "
	}*/
	F_getTime()
	var diffTime = myTime-oldTime
	console.log("– download END v1 – " + diffTime)
	for ( i=lsLength; i<localStorage.length; i++ ) { text = text + localStorage.key(i) + " = " + localStorage.getItem(localStorage.key(i)) + " NEXTONE " }
	/*for ( i=lsLength; i<localStorage.length; i++ ) {
		text = text + localStorage.key(i) + " = " + getItem(localStorage.key(i)) + " NEXTONE "
	}*/
	F_getTime()
	var diffTime = myTime-oldTime
	console.log("– download END v2 – " + diffTime)
	
	var count = localStorage.getItem("lsCount")
	count = Number(count) +1
	localStorage.setItem("lsCount",count)
	var filename = 'localStorage'+count+'.txt'
	
	download(filename, text);
	
	//console.log(objects)
	//window.location = "data:text/plain,"+text
}
JSON.stringify(localStorage)
// SAVE LS (end)




function func_removeRepeat(){ // ha már elkészült a script, és removeltam mind1iket törölhető ez a funkció!
	for ( var i = 0;   i < kerdesek.length;   i++ ) {
		var kerdes = localStorage.getItem(kerdesek[i].innerHTML)
		if ( kerdes+'_repeat' in localStorage ) {
			//localStorage.removeItem(kerdes+'_fix')
			//localStorage.removeItem(kerdes+'_idopont')
			/*var date = new Date();
			if ( Math.floor(date.getTime()/60000) - localStorage.getItem(kerdes+'_idopont') > 10000 ) {
				localStorage.removeItem(kerdes+'_idopont')
				localStorage.removeItem(kerdes+'_changes')
				localStorage.removeItem(kerdes+'_repeat')
				localStorage.removeItem(kerdes+'_jegy')
			}*/
			if ( 5 < localStorage.getItem(kerdes+'_repeat') ) {
				localStorage.setItem(kerdes+'_repeat', 5)
			}
		}
	}
}
func_removeRepeat()

function func_clearOldHistory() {
	for ( var i = 0;   i < kerdesek.length;   i++ ) {
		var kerdes = localStorage.getItem(kerdesek[i].innerHTML)
		var date = new Date();
		var idopont = Math.floor(date.getTime()/60000) - localStorage.getItem(kerdes+'_idopont')
		if ( localStorage.getItem(kerdes+"_skip") == "skip" ) {
			if ( idopont < 90 ) {
			} else { //azért így oldottam meg, mertha időpont == null vagy mi akkor is működjön
				localStorage.removeItem(kerdes+'_skip');
				localStorage.removeItem(kerdes+'_jegy');
			}
		}
	}
}
func_clearOldHistory()

function F_calculateEXPid(EXPid) {
	var actLSid = undefined
	var actIMGloc = undefined

	var string = localStorage.getItem("hkExpQ."+EXPid)

	var actLSid = string.slice(0,string.indexOf(" "))
	var actIMGloc = string.slice(string.indexOf(" ")+1)
}

//setVizsgaSkipTime()
//func_putZeroQBack();
/*func_calcOldNew();
func_calcJegy()
func_calcWork()
func_calcDate()
func_calcRepeat()*/

if ( localStorage.getItem("hk.newQ") == "true" ) {
	document.getElementById("btn_newQuest").style.borderColor = "limegreen"
} else {
	document.getElementById("btn_newQuest").style.borderColor = "black"
}

document.getElementById("input_toggleAll").value = localStorage.getItem("hkExp.max")

function F_prevQ(){
	//console.clear()
	console.log("– – – – – – – – F_prevQ – – – – – – – – –")
	var QlocElem = document.getElementById("kerdeslocation")
	var arrayQ = QlocElem.getElementsByClassName("kerdes")
	function F_Jegyek() {
		// BEGIN – ez a note-hoz kell, hogy a legfelül lévő details-hoz kapcsoltan mentse el (annak sajnos nem mindig van ID-je, mert nem feltétlen kérdés a class-a)
		var Qelem = document.getElementById(priorQid)
		var parent = document.getElementById(priorQid)
		console.log("pQid: "+priorQid)
		do { // megkeresi a 'családfában' legfelül lévő kérdést!
			Qelem = parent
			parent = parent.parentElement
		} while ( parent.classList.contains("altetel") != true  && parent.classList.contains("tetel") != true )
		// END
	
		if ( document.getElementById("note").value != "" ) {
			//localStorage.setItem(Qelem.innerHTML, document.getElementById("note").value);
			var LSid = "hkQ."+document.getElementById("span_actualLSid").textContent
			localStorage.setItem(LSid+'_note', document.getElementById("note").value);
			document.getElementById("note").value = ""
		}
		
		for ( var i=0; i<activeQs.length; i++ ) {
			var LSid = activeQs[i]
			var jegy = document.getElementById("hkSelect."+i).value
			//console.log(i+" : "+LSid+" : "+jegy)
			document.getElementById("hkSelect."+i).value = "empty"
			if ( jegy != "empty" ) {
				var repCount = Number(localStorage.getItem(LSid+'_repeat'))
				if ( repCount == jegy || jegy > repCount ) {
					changes = 1
				} else if ( jegy-repCount == -1 ) {
					changes = 1.5
				} else if ( jegy-repCount < -1 ) {
					changes = 2
				}
				localStorage.setItem(LSid+'_changes', changes);
				if ( jegy > repCount ) {
					repCount = repCount+1
				} else {
					repCount = jegy
				}
				localStorage.setItem(LSid+'_repeat', repCount)

				if ( jegy == 0 ) { jegy = 1 }
				localStorage.setItem(LSid+'_jegy', jegy)

				var date = new Date();
				localStorage.setItem(LSid+'_idopont', Math.floor(date.getTime()/60000));
				//console.log(jegy+" :időpontot ment el, ezen LSid-re: "+LSid)
			}
		}
	}
	F_Jegyek()

	document.getElementById("questTitle").innerHTML = "";
	document.getElementById("note").style.display = 'none';

	function F_Skip() {
		var div = document.getElementById("div_Skip")
		var arrayInp = div.getElementsByTagName("input")
		for ( var i=0; i<activeQs.length; i++ ) {
			var LSid = activeQs[i]
			if ( document.getElementById("td.2."+i).style.backgroundColor == "black" ) {
				localStorage.setItem(LSid+'_skip', "perma")
			} else if ( document.getElementById("td.2."+i).style.backgroundColor == "lawngreen" ) {
				localStorage.setItem(LSid+'_skip', "important")
			} else if ( document.getElementById("td.2."+i).style.backgroundColor == "blue" ) {
				localStorage.setItem(LSid+'_skip', "vizsgaSkip")
			} else {
				if ( localStorage.getItem(LSid+'_skip') == "important" ) {
					localStorage.removeItem(LSid+'_skip')
				}
			}
			//console.log(LSid+"_skip: "+localStorage.getItem(LSid+'_skip'))
		}
		for ( var i=0; i<arrayInp.length; i++ ) {
			if ( div.getElementsByTagName("input")[i].value != "" ) {
				var skip = div.getElementsByTagName("input")[i].value
				if  ( div.getElementsByTagName("select")[i].value == "min" ) { // átállítja hour-ra
					skip = skip/60
				} else if  ( div.getElementsByTagName("select")[i].value == "day" ) {
					skip = skip*24
				}
				var LSid = activeQs[i]
				localStorage.setItem(LSid+'_skip', skip)

				var date = new Date();
				localStorage.setItem(LSid+'_idopont', Math.floor(date.getTime()/60000));
				//console.log(jegy+" :időpontot ment el, ezen LSid-re: "+LSid)
			}
		}
	}
	F_Skip()

	func_tableSkipFix()
	F_valFix()
	F_valSkip()

	F_temakorStatus()

	
	var lastSavedLS = localStorage.getItem("hk.lastSavedLS")
	lastSavedLS = Number(lastSavedLS)
	if ( lastSavedLS == 10 || lastSavedLS > 10 ) {
		localStorage.setItem("hk.lastSavedLS",0)
		func_saveLS() // androidon crashel, mert a textel baja van
	} else {
		lastSavedLS = lastSavedLS +1
		localStorage.setItem("hk.lastSavedLS",lastSavedLS)
	}
}

var intervalOfs = "nincs"
var priorQid = "nincs"
var fullTema, checkNum, cloneKerdes
var activeQs = []
function F_nextQ(){
	console.clear()
	console.log("– – – – – – – – F_nextQ – – – – – – – – –")
	
	F_getTime()
	var startTime = myTime
	var diffTimeX = myTime-startTime
	console.log("– F_nextQ BEGIN – " + diffTimeX)
	
	var QlocElem = document.getElementById("kerdeslocation")
	var averageCV = 0
	var countCV = 0
	var nextDiff = 0

	
	// előző kérdés
	if ( priorQid != "nincs" ) { F_prevQ() }
	activeQs = [] // ezzel resetelem (szükséges mindig!)
	QlocElem.innerHTML = ""

	// következő kérdés
	for ( var x=0; x<50; x++ ) { // custom számot írtam, ennél több egyenlőre nincs (egy változó kéne helyette, ami az eddigi max)
		if ( document.getElementById("td.0."+x) ) { 
			document.getElementById("td.0."+x).hidden = true 
			document.getElementById("td.1."+x).hidden = true 
			document.getElementById("td.2."+x).hidden = true 
			
			document.getElementById("td.2."+x).innerHTML = "&nbsp;"
		}
	}
	priorQid = "nincs";
	var priorQ_alt = "nincs"
	var priorValue2 = -1
	var priorValue = -1
	var priorValue_alt = -1
	var priorType = 1
	var checkValue = 0
	
	func_calcRepTable()
	F_nextMark()

	function func_calcQValue(Qid) { // kérdés value-ját kiszámolja, és ha nagyobb, akkor kiválasztja
		F_calculateLSid(document.getElementById(Qid))
		var Qtext = actQtext
		var LSid = actLSid
		
		var shouldBreak = false // ehelyett meg kéne próbálni a "return"-t !!!
		if ( LSid == undefined ) {
			if ( document.getElementById("btn_newQuest").style.borderColor == "limegreen" && priorType < 2 ) {
				priorType = 2
				priorQid = Qid
			}
		} else {
			if ( localStorage.getItem(LSid+"_skip") && localStorage.getItem(LSid+"_skip") != "atlag" && localStorage.getItem(LSid+"_skip") != "important" ) { shouldBreak = true }
			/* newQ */if ( localStorage.getItem(LSid+"_jegy") === null && shouldBreak == false ) {
				if ( document.getElementById("btn_newQuest").style.borderColor == "limegreen" && priorType < 2 ) {
					priorType = 2
					priorQid = Qid
				}
			}
			/* important */if ( document.getElementById("btn_newQuest").style.borderColor != "limegreen" && localStorage.getItem(LSid+"_skip") == "important" && shouldBreak == false ) {
				var repCount = Number(localStorage.getItem(LSid+'_repeat'))
				if ( document.getElementById("hkQ.nextRep"+repCount).style.backgroundColor == "limegreen" ) {
					var date = new Date();
					var idopont2 = Math.floor(date.getTime()/60000) - localStorage.getItem(LSid+'_idopont')
					func_calcTimeDiff(repCount)
					if ( idopont2 > timeDiff ) { 
						priorType = 2
						
						var checkValue2 = idopont2 / timeDiff
						if ( checkValue2 > priorValue2 ) {
							priorValue2 = checkValue2
							priorQid = Qid
						}
						//console.log(idopont2+ "("+timeDiff+") " +checkValue2+ " vs " +priorValue2+ " ("+LSid+")")
					}
				}
			}
			if ( priorType == 1 && localStorage.getItem(LSid+"_jegy") > 0 ) { // régi kérdés
				var Qelem = document.getElementById(Qid)
				var date = new Date();
				var idopont = Math.floor(date.getTime()/60000) - localStorage.getItem(LSid+'_idopont')
				var repCount = Number(localStorage.getItem(LSid+'_repeat'))

				//ez az, hogy csak azt dobhatja ki, melynél a vizsga már közelebb van, mint a repTime
				var date = new Date();
				var remain = Math.floor(date.getTime()/3600000)
				remain = localStorage.getItem("vizsgaSkip") - remain
				remain = remain*60
				if ( idopont < remain ) { shouldBreak = true }

				if ( shouldBreak == false ) {
					func_calcTimeDiff(repCount)

					if ( document.getElementById("btn_RepFast").style.borderColor != "limegreen" ) {
						if ( timeDiff > idopont ) { 
							shouldBreak = true 
						}
					}
				}

				if ( shouldBreak == false ) {
					var num = Qelem.className.search("/");
					var prior = Qelem.className.substring(num-1,num);
					if ( prior == 1 ) {
						prior = 0.33
					} else if ( prior == 2 ) {
						prior = 0.66 
					} else if ( prior == 3 ) {
						prior = 1
					} else if ( prior == 4 ) {
						prior = 1.5
					} else if ( prior == 5 ) {
						prior = 2.25
					}
					if ( prior == "J" || prior == "j" ) { alert("error: J a prior még") } // ha már nem jön elő, törölhetem ezt a sort

					//checkValue = vLength * rank * idopont / timeDiff / jegy
					//checkValue = rank / Math.pow(0.8, idopont / timeDiff) / jegy
					//checkValue = changes * prior * idopont / timeDiff
					checkValue = prior * idopont / timeDiff
					averageCV = averageCV + checkValue
					countCV = countCV + 1
					if ( document.getElementById("hkQ.nextRep"+repCount).style.backgroundColor != "limegreen" ) { checkValue = -2 }

					if ( checkValue > priorValue_alt ) {
						priorValue_alt = checkValue;
						priorQ_alt = Qid;
					}
					
					if ( document.getElementById("btn_nextQdiff").style.backgroundColor != "coral" ) {
						if ( document.getElementById("hkQ.nextRep"+repCount).style.backgroundColor == "limegreen" ) {
							nextDiff = nextDiff +1
							var xyz = Math.random();
							var refX = 1/nextDiff
							if ( xyz < refX ) {
								priorValue = checkValue;
								priorQid = Qid
							}
						}
					} else if ( localStorage.getItem(LSid+"_repeat") == nextRep || nextRep == "zerus" ) { 
						if ( checkValue > priorValue ) {
							priorValue = checkValue;
							priorQid = Qid
						}
					}
				}
			}
		}
	}

	averageCV = 0
	countCV = 0
	
	
	F_getTime()
	var timecalcQValue = myTime
	for ( var tetel in tetelek ) {
		if ( document.getElementById("btn_nextQdiff").style.backgroundColor == "limegreen" ) {
			var tetelSzam = localStorage.getItem("input_Tetel")
			if ( tetel.indexOf(tetelSzam+",") == 0 ) {
				var childs = document.getElementById(tetel).getElementsByTagName("*")
				for ( var i = 0;   i < childs.length;   i++ ) {
					if ( childs[i].classList.contains("kerdes") == true ) {
						func_calcQValue(childs[i].id)
					}
				}
			}
		} else if ( localStorage.getItem(tetel+"_button") == "true" ) {
			var childs = document.getElementById(tetel).getElementsByTagName("*")
			for ( var i = 0;   i < childs.length;   i++ ) {
				if ( childs[i].classList.contains("kerdes") == true ) {
					func_calcQValue(childs[i].id)
				}
			}
		}
	}
	averageCV = averageCV/countCV
	F_getTime()
	timecalcQValue = myTime-timecalcQValue
	console.log("– func_calcQValue – " + timecalcQValue)


	if ( priorQid == "nincs" ) {
		if ( priorQ_alt != "nincs" ) {
			priorQid = priorQ_alt
		} else {
			alert("elfogytak a kérdések");
		}
	}


	if ( priorQid != "nincs" ) {
		var Qelem = document.getElementById(priorQid)
		var parent = document.getElementById(priorQid)

		//console.log("pQid: "+priorQid)
		do { // megkeresi a 'családfában' legfelül lévő kérdést!
			Qelem = parent
			parent = parent.parentElement
		} while ( parent.classList.contains("altetel") != true  && parent.classList.contains("tetel") != true )

		function func_setTitle(){
			var titleText = ""
			var parent = Qelem.parentElement
			var altetelcim = ""
			var hiddenText = ""
			if ( parent.className == "altetel" ) { // altetel Címet adja hozzá
				altetelcim = parent.id 
				altetelcim = altetelcim.slice(altetelcim.indexOf(",")+1)
				altetelcim = " &#10140; " + altetelcim
				titleText = altetelcim
				parent = parent.parentElement
			}
			var tetelcim = parent.id
			//tetelcim = tetelcim.slice(tetelcim.indexOf(",")+1)
			if ( Qelem.className.indexOf("if") == -1 ) { 
				titleText = tetelcim + titleText 
			} else {
				hiddenText = tetelcim + altetelcim
				QlocElem.innerHTML = '<div><font class="abbr"><strong>téma: </font>'+hiddenText+'</strong></div>'
			}
			document.getElementById("questTitle").innerHTML = titleText;
		}
		func_setTitle()
		
		function F_copyQs(Qelem){
			function func_addQ(Qtext){
				//console.log(Qtext)
				//console.log("– – – – – – – – – – – – – – – – –")
				QlocElem.innerHTML = QlocElem.innerHTML + Qtext
			}

			F_calculateLSid(Qelem)
			var LSid = actLSid
			var Qtext = actQtext
			if ( LSid == undefined ) { 
				LSid = F_newLSid() 
				var string = localStorage.getItem(document.title+"_LSids")
				string = string+ " " +LSid
				localStorage.setItem(document.title+"_LSids",string)
				localStorage.setItem(LSid,Qtext)
				var Qtxt = '<details class="' +Qelem.className+ '">' +Qelem.innerHTML+ "</details>"
				F_QtxtQname(Qtxt)
				localStorage.setItem(qName,LSid)
				txtLS[Qtext] = LSid // ezt vegyem majd ki
			}
			
			// Qelem-nek nem feltétlen van id-je (pl. kérdés összegző details esetében) --> ezzel a módszerrel kell
			var Qtext
			if ( Qelem.tagName == "DETAILS" ) {
				Qtext = '<details class="' +Qelem.className+ '">' +Qelem.innerHTML+ "</details>"
			} else {
				Qtext = Qelem.innerHTML
			}
			var find = ' id="(.*?)"'
			Qtext = Qtext.replace(new RegExp(find, 'g'), "")
			if ( Qelem.className.indexOf("if") != -1 ) { 
				var end = Qtext.indexOf("</summary")
				var str = Qtext.slice(0,end)
				var begin = str.indexOf("<summary")
				str = str.slice(begin)
				begin = str.indexOf(">")+1
				str = str.slice(begin)
				//Qtext = Qtext.replace(">"+str+'</summary><ul class="normal">', '>ismerd fel</summary><ul class="normal"><div><font class="abbr">metszet ►</font>'+str+'</div>')
				Qtext = Qtext.replace(">"+str+'</summary><ul class="normal">', '><font class="abbr">metszet<!--'+LSid+'--> ►</font>'+str+'</summary><ul class="normal">')
				Qtext = Qtext.replace("details","div")
				Qtext = Qtext.replace("summary",'summary color="black"')
			}
			Qtext = Qtext.replace(new RegExp(find, 'g'), "")
			func_addQ(Qtext)

			var pQelem = document.getElementById(priorQid)
			if ( pQelem.className.indexOf("[") != -1 ) {
				var begin = pQelem.className.indexOf("[") +1
				var end = pQelem.className.indexOf("]")
				var cont = false
				var num = ""
				var high = ""
				var imp = []
				var full = pQelem.className.slice(begin,end)
				for ( var x=0; x<=full.length; x++ ) {
					var kar = full[x]
					if ( isNaN(kar) == false ) {
						if ( cont == false ) {
							num = num + kar
						} else {
							high = high + kar
						}
					} else {
						if (kar === "-") { 
							cont = true
						} else {
							if ( cont == true ) {
								for ( var z=0;  z<=high-num;  z++ ) {
									var EXPid = Number(num) + Number(z)
									if ( localStorage.getItem("hkExpQ."+EXPid) ) {
										F_calculateEXPid(EXPid)
										var Qtext = localStorage.getItem(actLSid)
										func_addQ(Qtext)
									} else {
										alert("nincs még ilyen EXPid: {"+EXPid+"}")
									}
								}
								cont = false
							} else {
								var EXPid = num
								if ( localStorage.getItem("hkExpQ."+EXPid) ) {
									F_calculateEXPid(EXPid)
									var Qtext = localStorage.getItem(actLSid)
									func_addQ(Qtext)
								} else {
									alert("nincs még ilyen EXPid: {"+EXPid+"}")
								}
							}
							num = ""
							high = ""
						}
					}
				}
			}
		}
		F_copyQs(Qelem) // nem feltétlen van id-je !! (mármint ez nem hiba)
		
		QlocElem.innerHTML = QlocElem.innerHTML + "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"

		function F_SetMarks() { // minden kérdés mellé kreál egy osztályzás lehetőséget
			//console.clear()
			//console.log(" – F_SetMarks – ")
			var arrayQ = QlocElem.getElementsByClassName("kerdes")
			for ( var i=0; i<arrayQ.length; i++ ) {
				var Qelem = arrayQ[i]
				F_calculateLSid(Qelem)
				var LSid = actLSid
/*console.clear()
console.log("qID: " +Qelem.id)
console.log("LSid: " +LSid)
console.log(Qelem.innerHTML)
alert('stop1')*/
				var Qtext = actQtext
				if ( LSid == undefined ) { 
					if ( Qtext.indexOf('<font class="abbr">metszet<!--') != -1 ) { 
						LSid = Qtext.slice(Qtext.indexOf('<font class="abbr">metszet<!--')+30)
						LSid = LSid.slice(0,LSid.indexOf('-->'))
					} else {
						LSid = F_newLSid() 
						var string = localStorage.getItem(document.title+"_LSids")
						string = string+ " " +LSid
						localStorage.setItem(document.title+"_LSids",string)
						localStorage.setItem(LSid,Qtext)
						var Qtxt = '<details class="' +Qelem.className+ '">' +Qelem.innerHTML+ "</details>"
						F_QtxtQname(Qtxt)
						localStorage.setItem(qName,LSid)
						txtLS[Qtext] = LSid // ezt vegyem majd ki
					}
				}
/*console.clear()
console.log("LSid: " +LSid)
console.log(Qelem.innerHTML)
alert('stop2')*/
				
				var num = i+1
				if ( LSid == undefined ) { alert("#1. " +num+ ": "+ LSid) }
				activeQs[i] = LSid 
				
				Qelem.innerHTML = Qelem.innerHTML.replace(">",">["+num+"] ") // kérdésbe bekerül, hogy a táblázatban hányas

				if ( !document.getElementById("hkSelect."+i) ) { F_CreateSelect(i) }
				document.getElementById("td.0."+i).hidden = false 
				document.getElementById("td.1."+i).hidden = false 
				document.getElementById("td.2."+i).hidden = false 
				if ( localStorage.getItem(LSid+"_skip") == "important" ) {
					document.getElementById("td.2."+i).style.backgroundColor = "lawngreen"
				} else {
					document.getElementById("td.2."+i).style.backgroundColor = "snow"
				}
				
				document.getElementById("td.0."+i).style.borderColor = "black"

				var jegy = localStorage.getItem(LSid+'_jegy')
				var repeat = localStorage.getItem(LSid+'_repeat')
				var num = arrayQ[i].className.search("/");
				var prior = arrayQ[i].className.substring(num-1,num);
				var isJR = arrayQ[i].className.substring(num+1);
				document.getElementById("td.0."+i).title = LSid+"<br> Jegy:"+jegy+"<br>Repeat:"+repeat+"<br>Prior:"+prior


				var selectList = document.getElementById("hkSelect."+i)
				// repeatest beállítja vastagbetűsre
				var c = selectList.childNodes;
				for (var x=0; x < c.length; x++) {
					if ( c[x].value == localStorage.getItem(LSid+"_repeat") ) {
						c[x].style.fontWeight = "bolder"
					} else {
						c[x].style.fontWeight = "normal"
					}
				}

				//idő
				document.getElementById("td.0."+i).style.backgroundColor = "white"
				var date = new Date();
				selectList.disabled = false
				selectList.style.backgroundColor = "White"
				if ( localStorage.getItem(LSid+'_idopont') ) {
					var idopont = Math.floor(date.getTime()/60000) - localStorage.getItem(LSid+'_idopont')
					// console.log("Qid:"+Qid+" ––– time:"+idopont)
					document.getElementById("td.2."+i).innerHTML = idopont
					
					var date = new Date();
					var remain = Math.floor(date.getTime()/3600000)
					remain = localStorage.getItem("vizsgaSkip") - remain
					remain = remain*60
					if ( idopont < remain ) {
						document.getElementById("td.2."+i).style.borderColor = "red"
					} else {
						document.getElementById("td.2."+i).style.borderColor = "black"
					}

					if ( prior == 1 ) {
						vPrior = 0.33
					} else if ( prior == 2 ) {
						vPrior = 0.66 
					} else if ( prior == 3 ) {
						vPrior = 1
					} else if ( prior == 4 ) {
						vPrior = 1.5
					} else if ( prior == 5 ) {
						vPrior = 2.25
					}
					if ( prior == "J" || prior == "j" ) { alert("error: J a prior még") } // ha már nem jön elő, törölhetem ezt a sort
					
					func_calcTimeDiff(localStorage.getItem(LSid+'_repeat'))
					checkValue = vPrior * idopont / timeDiff
					if ( timeDiff > idopont ) { // és nincs enabledelve az 'ultiLearn' (hiányzik még)
						//document.getElementById("td.0."+i).style.backgroundColor = "LawnGreen"
						selectList.disabled = true
						selectList.style.backgroundColor = "Black"
					/*
					} else if ( idopont > timeDiff*3 ) {
						document.getElementById("td.0."+i).style.backgroundColor = "red"
					} else if ( idopont > timeDiff*2 ) {
						document.getElementById("td.0."+i).style.backgroundColor = "orange"
					} else if ( idopont > timeDiff ) {
						document.getElementById("td.0."+i).style.backgroundColor = "yellow"
					*/
					}
					
					/*if ( jegy == 0 || jegy == 1 ) {
						if ( idopont >= timeDiff  ) {
							document.getElementById("td.0."+i).style.backgroundColor = "red"
						}
					}
					if ( jegy == 2 ) {
						if ( idopont >= 2000  ) {
							document.getElementById("td.0."+i).style.backgroundColor = "red"
						}
					}*/
					
					if ( repeat == 0 ) {
						document.getElementById("td.0."+i).style.backgroundColor = "red"
					} else if ( repeat == 1 ) {
						document.getElementById("td.0."+i).style.backgroundColor = "orange"
					} else if ( repeat == 2 ) {
						document.getElementById("td.0."+i).style.backgroundColor = "yellow"
					} else {
						document.getElementById("td.0."+i).style.backgroundColor = "LawnGreen"
					}
				}
				document.getElementById("td.0."+i).style.backgroundColor = "White"
				if ( prior == 1 || prior == 2 ) {
					document.getElementById("td.0."+i).style.backgroundColor = "burlywood"
				} else if ( prior == 4 || prior == 5 ) {
					document.getElementById("td.0."+i).style.backgroundColor = "aqua"
				}
				if ( isJR == "j" ) {
					document.getElementById("td.0."+i).style.backgroundColor = "lightgrey"
				}
				if ( localStorage.getItem(LSid+'_skip') && localStorage.getItem(LSid+'_skip') != "important" ) {
					document.getElementById("td.0."+i).style.backgroundColor = "Black"
					if ( localStorage.getItem(LSid+'_skip') == "vizsgaSkip" ) {
						document.getElementById("td.0."+i).style.backgroundColor = "Blue"
					}
					selectList.disabled = true
					selectList.style.backgroundColor = "Black"
				}
				if ( document.getElementById("td.0."+i).style.backgroundColor == "blue" || document.getElementById("td.0."+i).style.backgroundColor == "black" || document.getElementById("td.0."+i).style.backgroundColor == "red" ) {
					document.getElementById("td.0."+i).style.color = "white" // fontColor
				} else {
					document.getElementById("td.0."+i).style.color = "black" // fontColor
				}
			}
		}
		F_SetMarks()

		var actQ = document.getElementById(priorQid)
		F_calculateLSid(actQ)
/*console.clear()
console.log(actQ.id)
alert(actLSid)*/
		if ( actLSid == undefined ) {
			document.getElementById("span_actualLSid").textContent = "new"
		} else {
			document.getElementById("span_actualLSid").textContent = actLSid.slice(4)
		}
		for ( var i=0; i<activeQs.length; i++ ) {
			if ( activeQs[i] == actLSid ) {
				document.getElementById("td.0."+i).style.borderColor = "yellow"
			}
		}

		var childs = QlocElem.childNodes;
		for ( var i=0; i<childs.length; i++ ) { 
			if ( childs[i].className.indexOf("open") != -1 ) { 
				//childs[i].open = false  
				childs[i].open = true  
			}
		}

		var Qtext
		if ( Qelem.id ) { 
			Qtext = arrQid[Qelem.id]
		} else { // amennyiben egy <span imp [120]></span>-ban lévő kérdésről van szó, amelynek nincs már Qid-je
			Qtext = '<details class="' +Qelem.className+ '">' +Qelem.innerHTML+ "</details>"
		}
		
		
		var LSid = "hkQ." + document.getElementById("span_actualLSid").textContent
//alert(LSid)
		
		var date = new Date();
		var remain = Math.floor(date.getTime()/3600000)
		remain = localStorage.getItem("vizsgaSkip") - remain
		
		/* erre akkor van szükség, ha legfelül nem kérdés van (tehát a legfelül lévő details nem kérdés, csak egy összegző details, pl. élettan ozmózis), ugyanis annak nincs LSid elmentve, így nemtudok note-t menteni neki (persze optimálisabb lenne, ha itt is a legfelsőhöz lenne csatolva, de egyenlőre kihagyom mert nem bonyolítom, és LowPrior)
		var pQtxt = arrQid[priorQid]
		var pLSid = txtLS[pQtxt]
		var LSid = txtLS[Qtext]
		if ( typeof LSid == "undefined" ) {
			LSid = pLSid
		}
		alert("noteIMP:"+LSid)*/
		if ( localStorage.getItem(LSid+"_note") ) { // note
			document.getElementById("note").value = localStorage.getItem(LSid+"_note")
			intervalOfs = 0;
			F_noteFlash = window.setInterval(function(){
				document.getElementById("btn_fix").style.backgroundColor = 'rgba(255,0,0,'+Math.abs(Math.sin(intervalOfs))+')';
				intervalOfs += 0.01;
			}, 10);
			var_note = true
		} else {
			document.getElementById("btn_fix").style.backgroundColor = "red";
			var_note = false
			if ( intervalOfs != "nincs" ) { 
				clearInterval(F_noteFlash) 
				intervalOfs = "nincs"
			}
		}
	}
	
	// img + videókat ezzel tölti be
	var allDetails = QlocElem.getElementsByTagName("details")
	for ( var i=0; i<allDetails.length; i++ ) {
		allDetails[i].ontoggle = function(e){
			F_detailsToggle(this,e)
		}
	}
	var imgs = QlocElem.getElementsByTagName("img")
	for ( var x=0; x<imgs.length; x++ ) {
		F_loadImgX(imgs[x])
	}
	
	func_calcJegy()
	func_calcWork()
	func_calcDate()
	func_calcOldNew()
	func_calcRepeat()
	
	func_enLargeImages()
	func_TitleChange()
	func_abbrSet(QlocElem)
	F_loadImgVideo(QlocElem)
	
	// color NewQ
	document.getElementById("button_NextQ").style.color = ""
	if ( localStorage.getItem("hk.lastSavedLS") == 10 ) { 
		document.getElementById("button_NextQ").style.backgroundColor = "aqua" 
	} else {
		document.getElementById("button_NextQ").style.backgroundColor = "white"
	}
	
	F_getTime()
	diffTimeX = myTime-startTime
	lastClickTime = myTime
	console.log("– F_nextQ END – " + diffTimeX)
}

function F_CreateSelect(i) {
	var selectList = document.createElement("select")
	selectList.id = "hkSelect."+i
	var LSid = activeQs[i]

	var array = ["empty","0","1","2","3","4"]
	for ( var x=0;  x<array.length;  x++ ) {
		var option = document.createElement("option");
		option.value = array[x];
		if ( array[x] == "empty" ) {
			option.text = ""
		} else {
			option.text = array[x];
		}
		selectList.appendChild(option);
	}

	for ( var x=0;  x<3;  x++ ) {
		var td = document.createElement("TD")
		td.id = "td."+x+"."+i
		if ( x == 0 ) {
			/*td.style.color = "white"
			td.style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"*/
			//td.style.textShadow = "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
			td.innerHTML = i+1
		} else if ( x == 1 ) {
			td.appendChild(selectList)
		} else if ( x == 2 ) {
			td.style.fontSize = "small"
			td.addEventListener("click",function(){
				if ( this.style.backgroundColor == "snow" ) { 
					this.style.backgroundColor = "lawngreen" 
				} else if ( this.style.backgroundColor == "lawngreen" ) { 
					this.style.backgroundColor = "blue" 
				} else if ( this.style.backgroundColor == "blue" ) { 
					this.style.backgroundColor = "black" 
				} else if ( this.style.backgroundColor == "black" ) { 
					this.style.backgroundColor = "snow" 
				}
			});
			td.innerHTML = "&nbsp;"
		}
		document.getElementById("Tr_QsMark."+x).appendChild(td)
	}
}

if ( localStorage.getItem("hk.ToggleAll") == "true" ) {
	if ( isAndroid == false ) { F_toggleAll() }
}
if ( changeStatus == true ) { document.getElementById("div_upgQ").style.display = 'block' }
if ( changeStatus == false ) { document.getElementById("div_upgQ").style.display = 'none' }

/*

function F_detailsClick(elem){
	elem.onclick = function(){ 
		F_impQs(this.getElementsByClassName("imp"))
		
		this.onclick = function(){}
		
		var details = this.getElementsByTagName("DETAILS");
		for ( var i=0; i<details.length; i++ ) {
			details[i].onclick = function(){}
		}
	}
}
function F_detailsAll(elem){
	F_getTime()
	var diffTime = myTime-oldTime
	console.log("– F_detailsAll BEGIN – " + diffTime)
	
	var details = elem.getElementsByTagName("DETAILS");
	for ( var i=0; i<details.length; i++ ) {
		F_detailsClick(details[i])
	}
	
	F_getTime()
	var diffTime = myTime-oldTime
	console.log("– F_detailsAll END – " + diffTime)
}
F_detailsAll(document)

*/


document.getElementById("input_toggleAll").style.backgroundColor = ""
document.getElementById("spanLoading").style.visibility = "hidden";

F_getTime()
var diffTime = myTime-oldTime
console.log("– – – Loading finished – – – " + diffTime)



/* Replace text (regular expression)
	<li><span class="WHITE">(.*?)</span>(.*?)</li>
	<div><font class="abbr"><span class="WHITE">\1</span> ►</font>\2</div>
*/

























