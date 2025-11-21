Run szemeszter.bat,,Min, szemPID

Gui, Add, CheckBox, vTeloLearn, Telo - LEARN
Gui, Add, CheckBox, vTeloMix, Telo - Mix
Gui, Add, CheckBox, vTeloImages, Telo - Images
Gui, Add, CheckBox, vWebPage, Web - LEARN
Gui, Add, CheckBox, vZene, Telo - Zene
Gui, Add, Button, Default w80 gGuiClose, OK
Gui, Show
Return


GuiClose: ; ha megnyomtan az OK, akkor megy tovább itt

Gui, Submit ; elmenti a beállított értékeket

if ( TeloLearn == 1 ) {
	varTelefon = true
} else {
	varTelefon = false
}

if ( TeloImages == 1 ) {
	varImages = true
} else {
	varImages = false
}

if ( WebPage == 1 ) {
	varWebPage = true
} else {
	varWebPage = false
}

if ( Zene == 1 ) {
	varZene = true
} else {
	varZene = false
}

Process,WaitClose,%szemPID% ;MsgBox szemeszter.bat closed.

if varWebPage = true
{
	; MsgBox WebPage update
	Run update.bat,,, updPID
}
if varTelefon = true
{
	; MsgBox Telefon update
	Run BatchRun.ffs_batch,,, andPID ; %destination%\BatchRun.ffs_batch
	Run BatchRunStuff.ffs_batch,,, andrPID ; %destination%\BatchRunStuff.ffs_batch
}
if varZene = true
{
	; MsgBox Zene update
	Run ZeneBatch.ffs_batch,,, zenePID ; %destination%\ZeneBatch.ffs_batch
	Process,WaitClose,%zenePID%
	Run ZeneBatch_old.ffs_batch,,, zeneoldPID ; %destination%\ZeneBatch.ffs_batch
	
}
if varImages = true
{
	Run BatchRunImages.ffs_batch,,, andIPID 
}
Process,WaitClose,%updPID%
Process,WaitClose,%andPID%
Process,WaitClose,%andrPID%
Process,WaitClose,%andIPID%
Process,WaitClose,%zeneoldPID%

if ( TeloMix == 1 ) {
	Run BatchTeloMix.ffs_batch,,, TeloMixPID 
}
Process,WaitClose,%TeloMixPID%

MsgBox done
ExitApp