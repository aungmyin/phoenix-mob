function dropDownSwitch() {
    var e = document.getElementById("customerWkDropdown");
    var strUser = e.options[e.selectedIndex].value;
    alert(strUser);
}