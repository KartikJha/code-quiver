import fs from 'fs';

const senders = [
  'no-reply@sampark.gov.in',
  'alerts@mailer.moneycontrol.com',
  'info@pnm.nobroker.in',
  'no-reply@hello.redis.io',
  'noreply1@in.crm-samsung.com',
  'email@alerts.timespro.com',
  'info@hirist.tech',
  'onlinecourses@nptel.iitm.ac.in',
  'jobalerts-noreply@linkedin.com',
  'noreply@medium.com',
  'hello@fi.money',
  'customer.communication@custcom.yesbank.email',
  'support@turing.com',
  'noreply@instahyre.com',
  'noreply@steampowered.com',
  'no-reply%40primevideo.com',
  'jobs-listings%40linkedin.com',
  'linkedin%40e.linkedin.com',
  'notifications-noreply%40linkedin.com',
  'english-personalized-digest%40quora.com',
  'noreply%40swiggy.in',
  'alerts%40jupiter.money',
  'noreply%40instahyre.com',
  'creditcard+ratealert%40bankbazaar.com',
  'no-reply%40swiggy.in',
  'noreply%40jupiter.money',
  'services%40custcomm.icicibank.com',
  'noreply%40mailers.zomato.com',
  'messaging-digest-noreply%40linkedin.com',
  'newsletters-noreply%40linkedin.com',
  'no-reply%40spotify.com',
  'noreply%40livejobs4u.com',
  'info%40account.netflix.com',
  'alerts%40jupiter.money',
  'naukrialerts%40naukri.com',
  'noreply%40upstox.com',
  'google-noreply%40google.com',
  'dani%40mail.hashnode.co',
  'noreply%40topcoder.com',
  'security-noreply%40linkedin.com',
  'voila%40msg.cutshort.ai',
  'team%40hi.wellfound.com',
  'no-reply%40email.zebpay.com',
  'jobalerts-noreply%40linkedin.com',
  'creditcard+ratealert%40bankbazaar.com',
  'alert%30chess.com',
  'newsletter%30notifications-economictimes.com',
  'PEducate%30emailer.pharmeasy.in',
  'notifications%30discord.com',
  'customer.communication%30custcom.yesbank.email',
  'info%30digital.axisbankmail.com',
  'IMnewsletters@em.intermiles.com',
  'noreply@coffeee.io',
  'no-reply@accounts.google.com',
  'security-noreply@linkedin.com',
  'support@chorki.com',
  'nse_alerts@nse.co.in',
  'communication@iciciprulife.com',
  'alert@jupiter.money',
  'info@hirist.com',
  'info@naukri.com'
]

const token = 'Bearer ya29.a0AXeO80S6GXW7Km5tVCScEl96CeJ21iTJollQQfOk0LRyxSdMwtlkqrvEBNglSSN72HUyBA5awXaPMy3G0nkYB9PibME-f4AX0_XJX8_2jIUTgZntxp-gbs2mO7aWYetR2hMlOtEkvzZ3APYm961sUHmubFOMZXrUncpQMhQ5wZTpulZES50KaCgYKAboSARISFQHGX2MiM_iUBj-MQssOnXRcbN_LMg0187'

async function listMessageIds(sender) {
  const data1 = await fetch(`https://content-gmail.googleapis.com/gmail/v1/users/kartik.n.jha%40gmail.com/messages?maxResults=500&q=from%3A${sender}&key=AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM`, {
    "credentials": "include",
    "headers": {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "X-ClientDetails": "appVersion=5.0%20(X11)&platform=Linux%20x86_64&userAgent=Mozilla%2F5.0%20(X11%3B%20Linux%20x86_64%3B%20rv%3A109.0)%20Gecko%2F20100101%20Firefox%2F118.0",
      "Authorization": `${token}`,
      "X-Requested-With": "XMLHttpRequest",
      "X-JavaScript-User-Agent": "apix/3.0.0 google-api-javascript-client/1.1.0",
      "X-Origin": "https://explorer.apis.google.com",
      "X-Referer": "https://explorer.apis.google.com",
      "X-Goog-Encode-Response-If-Executable": "base64",
      "Alt-Used": "content-gmail.googleapis.com",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "https://content-gmail.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en.AOzoyjtjrhQ.O%2Fd%3D1%2Frs%3DAHpOoo9-fA1P7IZFa1fdRj158NoDqrnbYA%2Fm%3D__features__",
    "method": "GET",
    "mode": "cors"
  });

  const data = await fetch(`https://content-gmail.googleapis.com/gmail/v1/users/kartik.n.jha%40gmail.com/messages?maxResults=500&q=from%3A${sender}&key=AIzaSyBeo4NGA__U6Xxy-aBE6yFm19pgq8TY-TM`, {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "X-ClientDetails": "appVersion=5.0%20(X11)&platform=Linux%20x86_64&userAgent=Mozilla%2F5.0%20(X11%3B%20Linux%20x86_64%3B%20rv%3A130.0)%20Gecko%2F20100101%20Firefox%2F130.0",
        "Authorization": `${token}`,
        "X-Requested-With": "XMLHttpRequest",
        "X-JavaScript-User-Agent": "apix/3.0.0 google-api-javascript-client/1.1.0",
        "X-Origin": "https://explorer.apis.google.com",
        "X-Referer": "https://explorer.apis.google.com",
        "X-Goog-Encode-Response-If-Executable": "base64",
        "Alt-Used": "content-gmail.googleapis.com",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "https://content-gmail.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en.5oZHy0SiJxw.O%2Fd%3D1%2Frs%3DAHpOoo-Hry6DG-RE4t9kNz_t6hiwmwXOmA%2Fm%3D__features__",
    "method": "GET",
    "mode": "cors"
});

  const body = await data.json();
  const body1 = await data1.json();
  if (!body.resultSizeEstimate) {
    return [[], 0];
  }
  return [body.messages.map(m => m.id), body.resultSizeEstimate]
}

async function deleteMessageIds(ids, sender) {
  const data1 = await fetch("https://content-gmail.googleapis.com/gmail/v1/users/kartik.n.jha%40gmail.com/messages/batchDelete?alt=json&key=AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM", {
    "credentials": "include",
    "headers": {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "X-ClientDetails": "appVersion=5.0%20(X11)&platform=Linux%20x86_64&userAgent=Mozilla%2F5.0%20(X11%3B%20Linux%20x86_64%3B%20rv%3A109.0)%20Gecko%2F20100101%20Firefox%2F118.0",
      "Authorization": `${token}`,
      "X-Requested-With": "XMLHttpRequest",
      "X-JavaScript-User-Agent": "apix/3.0.0 google-api-javascript-client/1.1.0",
      "Content-Type": "application/json",
      "X-Origin": "https://explorer.apis.google.com",
      "X-Referer": "https://explorer.apis.google.com",
      "X-Goog-Encode-Response-If-Executable": "base64",
      "Alt-Used": "content-gmail.googleapis.com",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "https://content-gmail.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en.AOzoyjtjrhQ.O%2Fd%3D1%2Frs%3DAHpOoo9-fA1P7IZFa1fdRj158NoDqrnbYA%2Fm%3D__features__",
    "body": JSON.stringify({ids}),
    "method": "POST",
    "mode": "cors"
  });

  const data = await fetch("https://content-gmail.googleapis.com/gmail/v1/users/kartik.n.jha%40gmail.com/messages/batchDelete?alt=json&key=AIzaSyBeo4NGA__U6Xxy-aBE6yFm19pgq8TY-TM", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "X-ClientDetails": "appVersion=5.0%20(X11)&platform=Linux%20x86_64&userAgent=Mozilla%2F5.0%20(X11%3B%20Linux%20x86_64%3B%20rv%3A130.0)%20Gecko%2F20100101%20Firefox%2F130.0",
         "Authorization": `${token}`,
        "X-Requested-With": "XMLHttpRequest",
        "X-JavaScript-User-Agent": "apix/3.0.0 google-api-javascript-client/1.1.0",
        "Content-Type": "application/json",
        "X-Origin": "https://explorer.apis.google.com",
        "X-Referer": "https://explorer.apis.google.com",
        "X-Goog-Encode-Response-If-Executable": "base64",
        "Alt-Used": "content-gmail.googleapis.com",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "https://content-gmail.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en.5oZHy0SiJxw.O%2Fd%3D1%2Frs%3DAHpOoo-Hry6DG-RE4t9kNz_t6hiwmwXOmA%2Fm%3D__features__",
    "body": JSON.stringify({ids}),
    "method": "POST",
    "mode": "cors"
});

  console.log(`${ids.length} messages ${data.status}, sender ${sender}`);

}


async function listMessageIdsAndDelete() {
  for (let i = 0; i < senders.length; i++) {
    let nextM = 1;
    const sender = senders[i].replace('@', '%40');
    while (nextM > 0) {
      const [messageIds, nextPageToken] = await listMessageIds(sender);
      console.log(`messages: ${messageIds.length}, sender: ${sender}`);
      if (nextPageToken) {
        await deleteMessageIds(messageIds, sender);
        fs.appendFileSync('text.txt', JSON.stringify({ [sender]: messageIds.length }));
      }
      nextM = nextPageToken;
    }
  }
}


listMessageIdsAndDelete();








// fs.writeFileSync('text.txt', JSON.stringify(data.messages.map(m => m.id)));


