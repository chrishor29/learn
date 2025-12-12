Run szemeszter.bat,,Min, szemPID

Gui, Add, CheckBox, vTeloMix, Telo - Mix
Gui, Add, CheckBox, vWebPage, Web - LEARN
Gui, Add, CheckBox, vGyogyszer, Web - Gyogyszer
Gui, Add, CheckBox, vZene, Telo - Zene
Gui, Add, Button, Default w80 gGuiClose, OK
Gui, Show
Return


GuiClose: ; ha megnyomtan az OK, akkor megy tovább itt

Gui, Submit ; elmenti a beállított értékeket

Process,WaitClose,%szemPID% ;MsgBox szemeszter.bat closed.

if ( WebPage == 1 ) {
	; MsgBox WebPage update
	Run update.bat,,, learnPID
}

if ( Gyogyszer == 1 ) {
	; MsgBox WebGyogyszer update
	Run D:\GYOGYSZER\update.bat,,, gyogyszerPID
}

if ( Zene == 1 ) {
	; MsgBox Zene update
	Run ZeneBatch.ffs_batch,,, zenePID ; %destination%\ZeneBatch.ffs_batch
	Process,WaitClose,%zenePID%
}

Process,WaitClose, %learnPID%
Process,WaitClose, %gyogyszerPID%
Process,WaitClose, %zeneoldPID%

if ( TeloMix == 1 ) {
	Run BatchTeloMix.ffs_batch,,, TeloMixPID 
}
Process,WaitClose,%TeloMixPID%

MsgBox done
ExitApp