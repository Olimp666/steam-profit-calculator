const axios = require('axios')
const fs = require('fs')
require('dotenv').config()

let table = []
let missing = []
let i = 0
let server_ip = process.env.SERVER_IP
let server_port = process.env.SERVER_PORT
let currency = process.env.CURRENCY

let known = JSON.parse(fs.readFileSync('ids.json', 'utf-8'))


async function fetch_steam(item) {
    try {
        let id = (await axios.get(`http://${server_ip}:${server_port}/getid/${item.market_hash_name}`)).data
        if (id == -1) {
            console.log(`Unable to fetch ${item.market_hash_name}`)
            return Promise.resolve()
        }
        let steam_highest_buy = (await axios.get(`https://steamcommunity.com/market/itemordershistogram?language=english&currency=${currency}&item_nameid=${id}`)).data.buy_order_graph[0][0]
        let link = `https://market.csgo.com/en/${encodeURI(item.market_hash_name)}`
        let ratio = (steam_highest_buy * 100 / 115) / (item.price * 1.08805)
        let balance = steam_highest_buy * 100 / 115
        table.push({ "link": link, "price": item.price, "ratio": ratio, "balance": Math.floor(balance) })
    }
    catch (err) {
        i++
        console.log('rate limit')
        // fs.writeFileSync(`errors/${i}.txt`, JSON.stringify(err))
    }
}
async function get_prices(min, max) {
    let price_list = await axios.get('https://market.csgo.com/api/v2/prices/RUB.json')
    price_list = price_list.data.items.filter((x) => x.price >= min && x.price <= max)
    const promises = price_list.map(item => fetch_steam(item))
    return Promise.all(promises)
}

async function get_missing_ids() {
    let price_list = (await axios.get('https://market.csgo.com/api/v2/prices/RUB.json')).data.items
    // let id_map = (await axios.get(`http://${server_ip}:${server_port}/json`)).data
    for (item of price_list) {
        if (known[item.market_hash_name] == undefined) {
            missing.push(item.market_hash_name)
        }
    }
}



get_prices(min = 1000, max = 1180).then(() => {
    table.sort((a, b) => b.ratio - a.ratio)
    for (let j = 0; j < 5; j++) {
        console.log(table[j])
    }
    console.log(`${i}  rate limit(s)`)
})

// get_missing_ids().then(() => {
//     fs.writeFileSync('missing.json', JSON.stringify(missing))
// })