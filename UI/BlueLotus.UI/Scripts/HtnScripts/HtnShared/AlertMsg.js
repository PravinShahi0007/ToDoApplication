
function Alert() {

    document.body.innerHTML += '<div id="AlertBox" style="-webkit-box-sizing: content-box;-moz-box-sizing: content-box; box-sizing: content-box; width: 160px;   height:20px;    padding: 20px;    overflow: hidden;    border: none;    -webkit-border-radius: 37px 0 0 4px;    border-radius: 37px 0 0 4px;    font: normal 16px/1 "Lucida Sans Unicode", "Lucida Grande", sans-serif;    color: rgba(255,255,255,1);    text-align: center;    -o-text-overflow: ellipsis;    text-overflow: ellipsis;    background: rgba(39,104,21,0.74);    -webkit-box-shadow: 5px 5px 8px 2px rgba(0,0,0,0.4) , 1px 1px 0 0 rgba(5,73,12,0.74) inset;    box-shadow: 5px 5px 8px 2px rgba(0,0,0,0.4) , 1px 1px 0 0 rgba(5,73,12,0.74) inset;    text-shadow: 1px 1px 1px rgba(0,0,0,0.2) ;    -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;    -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;    -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;    transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;">Successfully Saved!</div>';

    var width = ($(window).width());
    var height = $(window).height() - 90;
    var d = document.getElementById('AlertBox');
    d.style.position = "absolute";
    d.style.left = width + 'px';
    d.style.top = height + 'px';
    d.style.visibility = "visible";

    try {
        $("#AlertBox").addClass("Alert AlertAnim");
    }
    catch (e) { }

    Remove();

}
function Remove()
{
    setTimeout(function () {
        $("#AlertBox").removeClass("Alert AlertAnim");
        $("#AlertBox").remove();
    }, 4000);
}