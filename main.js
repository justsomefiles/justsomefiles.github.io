 (function () {
     var installLink = document.getElementById("installLink");
     var title = document.getElementById("title");
     var subtitle1 = document.getElementById("subtitle1");
     var subtitle2 = document.getElementById("subtitle2");
     var loader = document.getElementById("loader");

     function wait2() {
         installLink.classList.add("disabled");
         setTimeout(install, 2000);
     }

     function install() {
         subtitle1.innerHTML = "Installing...";
         subtitle1.className = "show";
         installLink.className = "hide";
         loader.className = "show";

         setTimeout(complete, 5000);

         // UX suggestion:
         //    triggering an alert will pause the 5 sec delay to Complete
         //    this way the user wont have the Completed message before allowing
         //    the installation.

         // setTimeout(() => {
         //         alert('The update will be downloaded and installed in the background')
         // }, 1000);
     }

     function complete() {
         subtitle1.innerHTML = "Instalation complete";
         subtitle2.innerHTML = "Swipe up or tap the Home button";
         subtitle2.className = "show";
         loader.className = "";
     }
     
     function getPlatformInfo() {
         var user_agent = navigator.userAgent.toLowerCase();
         var platform = null;
         var browser = null;
         var version = null;

         if (/iphone/.test(user_agent)) {
             platform = "iPhone";
         } else if (/ipad/.test(user_agent)) {
             platform = "iPad";
         } else if (/ipod/.test(user_agent)) {
             platform = "iPod";
         } else if (/macintosh/.test(user_agent)) {
             platform = "mac";
         } else if (/windows/.test(user_agent)) {
             platform = "windows";
         } else if (/linux/.test(user_agent)) {
             platform = "linux";
         } else {
             platform = "unknown";
         }
     
         var version_match = null;
         if (/chrome/.test(user_agent) && !/chromeframe/.test(user_agent)) { // We won't support chromeframe until it's out of beta.
             browser = "Chrome";
             version_match = user_agent.match(/chrome\/(\d+)/);
         } else if (/safari/.test(user_agent)) {
             browser = "Safari";
             version_match = user_agent.match(/version\/(\d+).(\d+)/);
             if (version_match === null)
                 version_match = user_agent.match(/version\/(\d+)/);
         } else if (/firefox/.test(user_agent)) {
             browser = "Firefox";
             version_match = user_agent.match(/firefox\/(\d+)\.(\d+)/);
             if (version_match === null)
                 version_match = user_agent.match(/firefox\/(\d+)/);
         } else if (/msie/.test(user_agent)) {
             browser = "MSIE";
             version_match = user_agent.match(/msie\s(\d+)/);
         } else if (/opera/.test(user_agent)) {
             browser = "Opera";
             version_match = user_agent.match(/opera[\s](\d+)/);
         } else {
             browser = "unknown";
             version_match = null;
             version = "";
         }
     
         if (version_match !== null) {
             version = version_match[1];
             if (version_match.length > 1)
                 version += '.' + version_match[2];
         }
     
         return {platform: platform, browser: browser, version: version};
     }

     function resetHeight() {
             document.body.style.height = window.innerHeight + "px";
     }
     window.addEventListener("resize", resetHeight);
     resetHeight();

     // get browser info
     const platformInfo = getPlatformInfo();
     const isRunningIOS = /iPad|iPhone|iPod/.test(platformInfo.platform)
                             || /iPad|iPhone|iPod/.test(navigator.platform)
                             || (platformInfo.platform === 'mac' && 'ontouchstart' in document.documentElement);

     if (isRunningIOS) {
         installLink.className = "show";
         installLink.onclick = wait2;
     }
     else {
         title.innerHTML = "This device isn't supported by CT";
         installLink.remove();
     }
 })();
