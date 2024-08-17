function showCategory(category) {
    // Hide all qa-list divs
    const qaLists = document.querySelectorAll('.qa-list');
    qaLists.forEach(qaList => {
        qaList.style.display = 'none';
    });

    // Show the selected category's qa-list
    const selectedQaList = document.getElementById(category);
    if (selectedQaList) {
        selectedQaList.style.display = 'block';
    }
}

(function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();

ChannelIO('boot', {
    "pluginKey": "072d7dad-3dc6-471f-821d-c420de5486fd"
});