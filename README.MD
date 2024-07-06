# Steam profit calculator

This small script helps identify the most profitable items to buy on `market.csgo.com` and resell on the Steam Market.

## Rate limits

To obtain the `item_nameid` of an item, you must download the entire HTML page for that item, which is resource-intensive and quickly leads to rate limits.

To mitigate this, all `item_nameid` values are pre-calculated. The `ids.json` file is a map where the `market_hash_name` is the key, and the `item_nameid` is the value. You can retrieve the `item_nameid` from this file or set up a Flask server using `api.py`. The pre-calculated ID map is available [here](https://github.com/Olimp666/steam-market-item-nameids). 


## Setting up

It's recommended to use Gunicorn for the Flask server:
`gunicorn -w 4 "api:app" --bind 0.0.0.0:{port}`

Next, create a .env file with the following variables:
- SERVER_IP = 'server_ip'
- SERVER_PORT = 'server_port'
- CURRENCY = 'currency_id'

## List of available currencies

Select your currency and paste it into `CURRENCY` environment variable.

1 - USD / United States Dollar
2 - GBP / United Kingdom Pound
3 - EUR / European Union Euro
4 - CHF / Swiss Francs
5 - RUB / Russian Rouble
6 - PLN / Polish Złoty
7 - BRL / Brazilian Reals
8 - JPY / Japanese Yen
9 - NOK / Norwegian Krone
10 - IDR / Indonesian Rupiah
11 - MYR / Malaysian Ringgit
12 - PHP / Philippine Peso
13 - SGD / Singapore Dollar
14 - THB / Thai Baht
15 - VND / Vietnamese Dong
16 - KRW / South Korean Won
18 - UAH / Ukrainian Hryvnia
19 - MXN / Mexican Peso
20 - CAD / Canadian Dollars
21 - AUD / Australian Dollars
22 - NZD / New Zealand Dollar
23 - CNY / Chinese Renminbi (yuan)
24 - INR / Indian Rupee
25 - CLP / Chilean Peso
26 - PEN / Peruvian Sol
27 - COP / Colombian Peso
28 - ZAR / South African Rand
29 - HKD / Hong Kong Dollar
30 - TWD / New Taiwan Dollar
31 - SAR / Saudi Riyal
32 - AED / United Arab Emirates Dirham
35 - ILS / Israeli New Shekel
37 - KZT / Kazakhstani Tenge
38 - KWD / Kuwaiti Dinar
39 - QAR / Qatari Riyal
40 - CRC / Costa Rican Colón
41 - UYU / Uruguayan Peso