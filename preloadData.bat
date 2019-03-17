rem Tap the textbox
adb shell input tap 80 1560

rem Enter text then Tap the Add button
adb shell input text "Claude"
adb shell input tap 80 1130

adb shell input text "John"
adb shell input tap 80 1130

adb shell input text "Jake"
adb shell input tap 80 1130

adb shell input text "Deckard"
adb shell input tap 80 1130

adb shell input text "Logan"
adb shell input tap 80 1130

adb shell input text "Braedan"
adb shell input tap 80 1130

rem keyevent 4 = "KEYCODE_BACK" to close the onscreen keyboard
adb shell input keyevent 4
