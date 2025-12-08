Run szemeszter.bat,,Min, szemPID

Gui, Add, CheckBox, vTeloMix, Telo - Mix
Gui, Add, CheckBox, vWebPage, Web - LEARN
Gui, Add, CheckBox, vZene, Telo - Zene
Gui, Add, Button, Default w80 gGuiClose, OK
Gui, Show
Return


GuiClose: ; ha megnyomtan az OK, akkor megy tovább itt

Gui, Submit ; elmenti a beállított értékeket


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

if varZene = true
{
	; MsgBox Zene update
	Run ZeneBatch.ffs_batch,,, zenePID ; %destination%\ZeneBatch.ffs_batch
	Process,WaitClose,%zenePID%
}
Process,WaitClose,%updPID%
Process,WaitClose,%zeneoldPID%

if ( TeloMix == 1 ) {
	Run BatchTeloMix.ffs_batch,,, TeloMixPID 
}
Process,WaitClose,%TeloMixPID%

MsgBox done
ExitApp