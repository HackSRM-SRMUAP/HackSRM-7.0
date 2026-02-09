const DOMAIN = "https://hacksrm.in";
const APP_KEY = "aea7fd5a2d5c4105aaadfde3675cff49";
const KEY_LOCATION = `${DOMAIN}/${APP_KEY}.txt`;

async function pingBing() {
    console.log("Pinging Bing IndexNow ..");
    const bigUrl = new URL("https://www.bing.com/indexnow");
    bigUrl.searchParams.append("key", APP_KEY);
    bigUrl.searchParams.append("url", DOMAIN);
    bigUrl.searchParams.append("keyLocation", KEY_LOCATION);

    try {
        const response = await fetch(bigUrl.toString(), {
            method: "GET",
        });
        if (response.ok) {
            console.log("Successfully pinged Bing IndexNow");
        }
        else {
            console.error("Failed to ping Bing IndexNow", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error pinging Bing IndexNow", error);
    }
}

pingBing();
