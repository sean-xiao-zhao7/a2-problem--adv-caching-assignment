var box = document.querySelector(".box");
var button = document.querySelector("button");

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(function () {
        console.log("Registered Service Worker!");
    });
}

button.addEventListener("click", function (event) {
    if (box.classList.contains("visible")) {
        box.classList.remove("visible");
    } else {
        box.classList.add("visible");
    }
});

const cardUrl = "https://httpbin.org/ip";
let finished = false;

fetch(cardUrl)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        if (!finished) {
            finished = true;
            box.style.height = data.origin.substr(0, 2) * 5 + "px";
        }
    });

if ("caches" in window) {
    caches
        .match(cardUrl)
        .then((res) => {
            if (res) {
                return res.json();
            }
        })
        .then((data) => {
            if (!finished) {
                finished = true;
                box.style.height = data.origin.substr(0, 2) * 5 + "px";
            }
        });
}

// 1) Identify the strategy we currently use in the Service Worker (for caching)
// 2) Replace it with a "Network only" strategy => Clear Storage (in Dev Tools), reload & try using your app offline
// 3) Replace it with a "Cache only" strategy => Clear Storage (in Dev Tools), reload & try using your app offline
// 4) Replace it with "Network, cache fallback" strategy =>  => Clear Storage (in Dev Tools), reload & try using your app offline
// 5) Replace it with a "Cache, then network" strategy => Clear Storage (in Dev Tools), reload & try using your app offline
// 6) Add "Routing"/ URL Parsing to pick the right strategies: Try to implement "Cache, then network", "Cache with network fallback" and "Cache only" (all of these, with appropriate URL selection)

// Important: Clear your Application Storage first to get rid of the old SW & Cache from the Main Course Project!
