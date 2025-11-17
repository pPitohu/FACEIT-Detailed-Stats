const init = () => {
    const script = document.createElement('script')
    script.src = chrome.runtime.getURL('dist/main.js')
    script.defer = true;
    document.body.appendChild(script);
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        const interval = setInterval(() => {
            if (document.querySelector('#canvas-body [class^="styles__StatsNavWrapper-"]')) {
                clearInterval(interval);
                init();
                console.log("Injected detailed stats");
            }
        }, 100);
        
    }
}