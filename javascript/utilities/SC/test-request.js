import request from 'request';
import { promisify } from 'util';
const prequest = promisify(request);
var options = {
    'method': 'POST',
    'url': 'https://kite.zerodha.net/api/sip',
    'headers': {
        'Connection': 'keep-alive',
        'X-Kite-Version': '1.4.13',
        'Accept': 'application/json, text/plain, */*',
        'X-CSRFTOKEN': 'IteB25IykGSVvuRniI7x5iuCMEiS0G0A',
        'sec-ch-ua-mobile': '?0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="86", ""Not\\A;Brand";v="99", "Google Chrome";v="86"',
        'Origin': 'https://kite.zerodha.net',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://kite.zerodha.net/orders/sip',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Cookie': 'kf_session=p0IiD9T7wzUDRayQ02nB2KGLQODX4pHu; kf_uat_session=U1jgDeJP2QPD3NxT92WSRJ7hIq5jfZ7p; public_token=IteB25IykGSVvuRniI7x5iuCMEiS0G0A; user_id=ZU1366; enctoken=HVoJFqVYwDkRMvFP6uezvUZ1O/hXWFiEitUabWAGl+3B0n7ABkCKEkG+ZdGFIsZzLlQL0rgDjdA96iV7bh9GBH9DSzSHkQ=='
    },
    form: {
        'name': 'test-sip-7',
        'item_id': ['73', '65'],
        'schedules': ['2:0', '1:0']
    },
    qsStringifyOptions: { arrayFormat: 'repeat' }
};
// request(options, function (error, response) {
//     if (error) throw new Error(error);
//     console.log(response.body);
// });


options = {
    'method': 'POST',
    'url': 'https://kite.zerodha.net/api/baskets/65/items',
    'headers': {
        'Connection': 'keep-alive',
        'X-Kite-Version': '1.4.13',
        'Accept': 'application/json, text/plain, */*',
        'X-CSRFTOKEN': 'IteB25IykGSVvuRniI7x5iuCMEiS0G0A',
        'sec-ch-ua-mobile': '?0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="86", ""Not\\A;Brand";v="99", "Google Chrome";v="86"',
        'Origin': 'https://kite.zerodha.net',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://kite.zerodha.net/orders/baskets',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Cookie': 'kf_session=p0IiD9T7wzUDRayQ02nB2KGLQODX4pHu; kf_uat_session=k8Y5tRcyylLIYjZMu6Rerdma25PNf7Ry; public_token=IteB25IykGSVvuRniI7x5iuCMEiS0G0A; user_id=ZU1366; enctoken=V5DwsOtT9ZXzrNJou1FmKruNN8uzq03l6mm51f/nKRHODniOnNQMtgIIlS1eV3C78b3bM9YxSxTZDttvX6ZokwlLtVknPw==; kf_uat_session=xL2sZhqR1WXmLPrPwe8zhEZXsN8mlruK'
    },
    form: {
        'tradingsymbol': ['M100', 'IDEA'],
        'exchange': ['NSE', 'NSE'],
        'weight': ['1', '2'],
        'params': ['{"transaction_type":"BUY","product":"CNC","order_type":"LIMIT","validity":"DAY","variety":"regular","quantity":1,"price":0.05,"trigger_price":0,"disclosed_quantity":0}','{"transaction_type":"BUY","product":"CNC","order_type":"LIMIT","validity":"DAY","variety":"regular","quantity":1,"disclosed_quantity":0}'],
    },
    qsStringifyOptions: { arrayFormat: 'repeat' }
};



const ans = (async () => {
    const b = await prequest(options);
    console.log(b)
})();