function getTime() {
  months = [ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  days =   ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  d = new Date();
  t = d.toLocaleTimeString();
  t = t.slice(0,-2);
  dt = d.toLocaleDateString();
  el_time = document.querySelector('#time-content');
  el_date = document.querySelector('#date-content');
  day = days[d.getDay()];
  month = months[d.getMonth()];
  el_time.innerHTML = t;
  el_date.innerHTML = day+', '+month+'. '+d.getDate()+', '+d.getFullYear();
  el_date.innerHTML += '<br>'+dt;

  setTimeout(getTime, 50);
}

function getWeather() {
  url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/<your api key>/38.627003,-90.199402';
  var req = new Request(url);
  fetch(req)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      temp = document.querySelector('#weather-temp');
      aptemp = document.querySelector('#weather-aptemp');
      summary = document.querySelector('#weather-summary');
      precip = document.querySelector('#weather-precip');

      temp.innerHTML = Math.round(data.currently.temperature)+'&deg;';
      aptemp.innerHTML = Math.round(data.currently.apparentTemperature)+'&deg;';
      summary.innerHTML = data.currently.summary;

      if (data.currently.precipType) {
        precipType = data.currently.precipType
        precipProbability = data.currently.precipProbability
        precip.innerHTML = precipType+' : '+precipProbability*10+'%'
      } else {
        precip.innerHTML = '0% chance of precipitation'
      }
    })

  setTimeout(getWeather, 1000*60*3);
}

function getNews() {
  url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=<your api key>';
  var req = new Request(url);
  fetch(req)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      news = document.querySelector('#news-content');

      // clear news articles if present
      while (news.firstChild) {
          news.removeChild(news.firstChild);
      }

      ul = document.createElement("ul");
      for (var i=0; i<5; i++) {
        li = document.createElement("li");
        li.className = 'article'+i;
        li.innerHTML = data.articles[i].title;
        ul.appendChild(li);
      news.appendChild(ul);
      }
    })

  setTimeout(getNews, 1000*60*30);
}

function getCrypto() {
  // call crypto api and update price
  eth_url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD';
  btc_url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD';

  var eth_req = new Request(eth_url);
  fetch(eth_req)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      eth_price = document.querySelector('#crypto-eth-price');
      eth_change = document.querySelector('#crypto-eth-change');
      eth_price.innerHTML = '$'+data.RAW.ETH.USD.PRICE.toFixed(2);
      eth_change.innerHTML = '$'+data.RAW.ETH.USD.CHANGE24HOUR.toFixed(2);
    })

  var btc_req = new Request(btc_url);
  fetch(btc_req)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      btc_price = document.querySelector('#crypto-btc-price');
      btc_change = document.querySelector('#crypto-btc-change');
      btc_price.innerHTML = '$'+data.RAW.BTC.USD.PRICE.toFixed(2);
      btc_change.innerHTML = '$'+data.RAW.BTC.USD.CHANGE24HOUR.toFixed(2);
    })

  setTimeout(getCrypto, 1000*30);
}

function countdown(el, n) {
  var interval = setInterval(function() {
    el.innerHTML = n;
    if (n == 0) {
      clearInterval(interval);
    } else {
      n -= 1;
    }
  }, 1000)
}

// initialize cells
getTime();
getWeather();
getNews();
getCrypto();