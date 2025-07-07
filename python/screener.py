import requests
import csv
import time

# -- Configuration --
search_terms = ["power", "infra", "psu", "bank", "energy", "rail", "green"]
headers = {
    "accept": "application/json, text/plain, */*",
    "accept-version": "8.14.0",
    "x-csrf-token": "d31a8fcd",
    "user-agent": "Mozilla/5.0",
    "origin": "https://www.tickertape.in",
    "referer": "https://www.tickertape.in/",
    "cookie": "_ga_4J2474SK8Y=GS2.1.s1751909384$o3$g1$t1751909948$j59$l0$h0; _ga=GA1.1.1620799813.1741851572; _clck=zp8dl2%7C2%7Cfxe%7C0%7C1898; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQ3NGMwMjJlOTM3M2YxYjFlNmIxYzkiLCJjc3JmVG9rZW4iOiJkMzFhOGZjZCIsInJlZnJlc2hUb2tlbiI6IjFjNmVhMmMyLTIyYTUtNGJhNS1iNDZmLTY1YzMyZmM0MDFhNV82N2RkODJmMGIzZDU2MTcyZjc5NDY4MjMiLCJzdWJzSWQiOiJCMDAxIiwiaWF0IjoxNzUxOTA5MzgyLCJleHAiOjE3NTE5OTU3ODF9.HQK162ex0kSnasH2V5c6AH2R8WTMQd6e0cXzEdoeJQ8; AMP_d9d4ec74fa=JTdCJTIyZGV2aWNlSWQlMjIlM0El…lbnRUaW1lJTIyJTNBMTc1MTkwOTk2NzU4NSUyQyUyMmxhc3RFdmVudElkJTIyJTNBNzQlN0Q=; AMP_MKTG_d9d4ec74fa=JTdCJTIycmVmZXJyZXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRnd3dy5nb29nbGUuY29tJTJGJTIyJTJDJTIycmVmZXJyaW5nX2RvbWFpbiUyMiUzQSUyMnd3dy5nb29nbGUuY29tJTIyJTdE; _gcl_au=1.1.878718653.1751909382; web-ad-5f474c022e9373f1b1e6b1c9null=true; moe_uuid=3de52ed9-ddbe-4302-a085-a31a4f173d92; COOKIE_SHARING=%7B%22actualValue%22%3Afalse%2C%22MOE_DATA_TYPE%22%3A%22boolean%22%7D; _clsk=eib69v%7C1751909949824%7C6%7C1%7Co.clarity.ms%2Fcollect"
}
base_url = "https://api.tickertape.in/search"
output_file = "out.csv"

# -- Dummy logic to simulate filtering and scoring --
def simulate_stock_data(symbol, name, sector_hint):
    import random
    price = round(random.uniform(15, 300), 2)
    price_change = random.uniform(10, 30)  # simulate % change
    vol_ratio = round(random.uniform(1.3, 2.5), 2)
    score = int(price_change + vol_ratio * 10)
    return {
        "Stock": name,
        "Sector": sector_hint.capitalize(),
        "Price": price,
        "7d %": f"{price_change:.1f}%",
        "Vol Ratio": f"{vol_ratio}x",
        "Score": score
    }

# -- Master bucket --
results = []

# -- Run search and filter --
for term in search_terms:
    params = {
        "text": term,
        "types": "stock",
        "pageNumber": 0
    }
    response = requests.get(base_url, headers=headers, params=params)
    if response.status_code != 200:
        print(f"Failed for {term}")
        continue

    stocks = response.json().get("data", [])
    for stock in stocks:
        symbol = stock.get("symbol")
        name = stock.get("name")
        if not symbol or not name:
            continue

        stock_info = simulate_stock_data(symbol, name, term)
        if float(stock_info["7d %"].replace('%', '')) >= 15 and float(stock_info["Vol Ratio"].replace('x', '')) >= 1.5:
            results.append(stock_info)

    time.sleep(1)  # avoid rate limiting

# -- Sort and rank --
results = sorted(results, key=lambda x: -x["Score"])
for i, r in enumerate(results):
    r["Rank"] = i + 1

# -- Write to CSV --
fields = ["Rank", "Stock", "Sector", "Price", "7d %", "Vol Ratio", "Score"]
with open(output_file, "w", newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    writer.writerows(results)

print(f"✅ Screener completed. Results saved to {output_file}")
