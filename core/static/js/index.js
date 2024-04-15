/**
* Класс, в котором хранятся данные игры пользователя и основные методы взаимодействия с этими данными.
* Пусть вас не смущает слово function в начале, в JS так можно определять классы.
*/
function GameSession() {
    this.coins = 0
    this.click_power = 1
    this.auto_click_power = 0
    this.next_level_price = 10

    /** Метод для инициализации данных. Данные подгружаются с бэкенда. */
    this.init = function() {
        getCore().then(core => {
            this.coins = core.coins
            this.click_power = core.power
            this.auto_click_power = core.auto_click_power
            this.next_level_price = core.next_level_price
            render()
        })
    }
    /** Метод для добавления монеток. */
    this.add_coins = function(coins) {
        this.coins += coins
        this.check_levelup()
        render()
    }
    /** Метод для добавления невероятной мощи. */
    this.add_power = function(power) {
        this.click_power += power
        render()
    }
    /** Метод для добавления дружинника в отряд автоматизированных кликуш. */
    this.add_auto_power = function(power) {
        this.auto_click_power += power
        render()
    }
    /** Метод для проверки на повышения уровня. Отправка запроса на сохранение данных, если уровень повышен. */
    this.check_levelup = function() {
        if (this.coins >= this.next_level_price) {
            updateCoins(this.coins, this.auto_click_power).then(core => {
                this.next_level_price = core.next_level_price
            })
        }
    }
}

let Game = new GameSession() // Экземпляр класса GameSession.

/** Функция обработки клика пользователя на какаши. */
function call_click() {
    const kakashiNode = document.getElementById('obabkov')
    click_animation(kakashiNode, 50)
    Game.add_coins(Game.click_power)
}

/** Функция для обновления количества монет, невероятной мощи и дружинных кликуш в HTML-элементах. */
function render() {
    const coinsNode = document.getElementById('coins')
    const clickNode = document.getElementById('click_power')
    const autoClickNode = document.getElementById('auto_click_power')
    coinsNode.innerHTML = Game.coins
    clickNode.innerHTML = Game.click_power
    autoClickNode.innerHTML = Game.auto_click_power
}

/** Функция для обновления буста на фронтике. */
function update_boost(boost) {
    const boost_node = document.getElementById(`boost_${boost.id}`)
    boost_node.querySelector('#boost_level').innerText = boost.lvl
    boost_node.querySelector('#boost_power').innerText = boost.power
    boost_node.querySelector('#boost_price').innerText = boost.price
}

/** Функция для добавления буста на фронтике. */
function add_boost(parent, boost) {
    const button = document.createElement('a')
    button.setAttribute('class', `boost_${boost.type} boost`)
    button.setAttribute('id', `boost_${boost.id}`)
    button.setAttribute('onclick', `buy_boost(${boost.id})`)
    button.innerHTML = `
        <span><p>Level: <span id="boost_level">${boost.lvl}</span></p>
        <p>+<span id="boost_power">${boost.power}</span></p> 
        <p><span id="boost_price">${boost.price}</span></p> </span> 
        <span>
                      <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                          <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                          <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                        </g>
                      </svg>
                    </span>
    `
    parent.appendChild(button)
}

/** Функция для анимации элемента, по которому происходит клик. */
function click_animation(node, time_ms) {
    css_time = `.0${time_ms}s`
    node.style.cssText = `transition: all ${css_time} linear; transform: scale(0.95);`
    setTimeout(function() {
        node.style.cssText = `transition: all ${css_time} linear; transform: scale(1);`
    }, time_ms)
}

/** Функция получения данных об игре пользователя с бэкенда. */
function getCore() {
    return fetch('/core/', {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(response)
    }).then(response => {
        return response.core
    }).catch(error => console.log(error))
}

/** Функция отправки данных о количестве монет пользователя на бэкенд. */
function updateCoins(current_coins, auto_click_power) {
    const csrftoken = getCookie('csrftoken')
    return fetch('/update_coins/', {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            current_coins: current_coins,
            auto_click_power: auto_click_power
        })
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(response)
    }).then(response => {
        if (response.is_levelup) {
            get_boosts()
        }
        return response.core
    }).catch(error => console.log(error))
}

/** Функция получения имеющихся бустов пользователя с бэкенда. */
function get_boosts() {
    return fetch('/boosts/', {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(response)
    }).then(boosts => {
        const panel = document.getElementById('boosts-holder')
        panel.innerHTML = ''
        boosts.forEach(boost => {
            add_boost(panel, boost)
        })
    }).catch(error => console.log(error))
}

/** Функция покупки буста. */
function buy_boost(boost_id) {
    const csrftoken = getCookie('csrftoken')
    return fetch(`/boost/${boost_id}/`, {
        method: 'PUT',
        headers: {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            coins: Game.coins
        })
    }).then(response => {
        if (response.ok) return response.json()
        return Promise.reject(response)
    }).then(response => {
        if (response.error) return
        const old_boost_stats = response.old_boost_stats
        const new_boost_stats = response.new_boost_stats

        Game.add_coins(-old_boost_stats.price)
        if (old_boost_stats.type === 1) {
            Game.add_auto_power(old_boost_stats.power)
        } else {
            Game.add_power(old_boost_stats.power)
        }
        update_boost(new_boost_stats) // Обновляем буст на фронтике.
    }).catch(err => console.log(err))
}

/** Функция обработки автоматического клика. */
function setAutoClick() {
    setInterval(function() {
        if (Game.auto_click_power > 0){
            Game.add_coins(Game.auto_click_power)
            const kakashiNode = document.getElementById('obabkov')
            click_animation(kakashiNode, 50)
        }
    }, 1000)
}

/** Функция обработки автоматического сохранения (отправки данных о количестве монет пользователя на бэкенд). */
function setAutoSave() {
    setInterval(function() {
        /** Этот код срабатывает раз в минуту. */
        updateCoins(Game.coins, Game.auto_click_power)
    }, 1000)
}

/**
    Функция для получения кукесов.
    Она нужна для того, чтобы получить токен пользователя, который хранится в cookie.
    Токен пользователя, в свою очередь, нужен для того, чтобы система распознала, что запросы защищены.
    Без него POST и PUT запросы выполняться не будут, потому что так захотел Django.
*/
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
* Эта функция автоматически вызывается сразу после загрузки страницы.
* В ней мы можем делать что угодно.
*/
window.onload = function () {
    Game.init() // Инициализация игры.
    setAutoClick() // Инициализация автоклика.
    setAutoSave() // Инициализация автосейва.
}


