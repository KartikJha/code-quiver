import requests
import csv
import time

# -- Configuration --
search_terms = ["power", "infra", "psu", "bank", "energy", "rail", "green"]
headers = {
    "accept": "application/json, text/plain, */*",
    "accept-version": "8.14.0",
    "x-csrf-token": "d31a8fcd",  # Replace with fresh token
    "user-agent": "Mozilla/5.0",
    "origin": "https://www.tickertape.in",
    "referer": "https://www.tickertape.in/"
}
base_url = "https://api.tickertape.in/search"
output_file = "out.csv"

# -- Master bucket --
results = []

# -- Run search and filter --
for term in search_terms:
    params = {
        "text": term,
        "types": "stock",
        "pageNumber": 0
    }
    try:
        response = requests.get(base_url, headers=headers, params=params)
        response.raise_for_status()
        stock_list = response.json().get("data", {}).get("items", [])
    except Exception as e:
        print(f"Error fetching data for {term}: {e}")
        continue

    for stock in stock_list:
        quote = stock.get("quote")
        if not quote or not quote.get("price") or not quote.get("close"):
            continue  # skip if incomplete

        price = float(quote.get("price"))
        close = float(quote.get("close"))
        change = float(quote.get("change", 0))
        volume = int(quote.get("volume", 0))
        percent_change = round((change / close) * 100, 2) if close else 0

        # Basic filters
        if percent_change < 2.0 or volume < 100000:
            continue

        score = int(percent_change + (volume / 1000000) + (1 if price < 300 else 0))

        results.append({
            "Stock": stock.get("name"),
            "Sector": stock.get("sector", "Unknown"),
            "Price": price,
            "Change (%)": f"{percent_change}%",
            "Volume": volume,
            "Score": score
        })

    time.sleep(1)

# -- Sort and rank --
results = sorted(results, key=lambda x: -x["Score"])
for i, r in enumerate(results):
    r["Rank"] = i + 1

# -- Write to CSV --
fields = ["Rank", "Stock", "Sector", "Price", "Change (%)", "Volume", "Score"]
with open(output_file, "w", newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    writer.writerows(results)

print(f"✅ Screener completed. Results saved to {output_file}")
