function e(e,t,a,n){Object.defineProperty(e,t,{get:a,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},s=a.parcelRequire4f1d;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){i[e]=t},a.parcelRequire4f1d=s),s.register("kyEFX",(function(t,a){var n,i;e(t.exports,"register",(function(){return n}),(function(e){return n=e})),e(t.exports,"resolve",(function(){return i}),(function(e){return i=e}));var s={};n=function(e){for(var t=Object.keys(e),a=0;a<t.length;a++)s[t[a]]=e[t[a]]},i=function(e){var t=s[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),s.register("eWdjI",(function(a,n){e(a.exports,"createMarkup",(function(){return f})),e(a.exports,"onBtnClick",(function(){return m})),e(a.exports,"createMarkup2",(function(){return p})),s("7xP6g");s("3gSZX");var i=s("8EDGm"),r=s("jrD5E"),o=s("kERe0"),c=s("lQVoc");document.querySelector('[data-name="home"]');const l=document.querySelector(".list-news-card"),d=(0,c.normalizeImportFileName)(t(r)),h=(0,c.normalizeImportFileName)(t(o));(0,c.getMedia)();document.querySelector("body").dataset.name;const u=new(0,i.default)("team-9-project");function f({abstract:e,title:t,updated:a,updated_date:n,nytdsection:i,section:s,url:r,media:o,multimedia:c,uri:l}){let f=h;if("object"==typeof o&&o[0])f=o[0]["media-metadata"][2].url;else if("object"==typeof c)try{f=c[2].url}catch{}else"string"==typeof o&&(f=o);const m=u.getItem({uri:l});let p=`<use  href="${d}#icon-favorite" data-favorite class=" color-svg1"></use>\n    <use  href="${d}#icon-favorite-filled" data-favorite class=" color-svg2 hidden"></use>`,g="",w="Add to favorite",v="",y="true";return m&&((m.isfavorite||m.isRead)&&(p=`<use  href="${d}#icon-favorite" data-favorite class="color-svg1 hidden"></use>\n            <use  href="${d}#icon-favorite-filled" data-favorite class=" color-svg2 "></use>`,w="Remove from favorite",v="btn-position-reload-page",y="false"),m.isread&&(g="opacity")),`<li class="list-news-card__item ${g}" data-uri="${l}" data-url="${r}" data-snippet="${e}" data-title="${t}" data-newsdate="${a||n}" data-sectionname="${s||i}" data-section="${i}" data-image="${f}">\n  <img src="${f}" alt="" class="list-news-card__img" />\n   <div class='list-news-card__container-title'><h2 class="list-news-card__title">${t}</h2></div>\n  <span class="list-news-card__category">${i||s}</span>\n  <p class="list-news-card__description">${e}</p>\n  <button\n      type="button"\n      class="list-news-card__btn-add-favorite ${v}"\n      data-add="${y}"\n    ><span class="list-news-card__btn-add-favorite--text">${w}</span>\n    <svg width="13" height="12" class="list-news-card__add-favorite--svg">\n    ${p}\n</svg>\n</button>\n    <div class="container-news-list__date-read"><span class="list-news-card__news-date ">${a||n}</span>\n  <a href="${r}" class="list-news-card__link-read-more" target="_blank" data-link='link'>Read more</a></div>\n</li>`}function m(e){console.log("We're inside onBtnClick function");let t=(e=e.target).parentNode;if("button"===t.type)if("true"===t.dataset.add){t.firstElementChild.textContent="Remove from favorite",t.dataset.add=!1,t.classList.add("btn-position"),t.classList.remove("btn-position-reload-page"),t.firstElementChild.nextElementSibling.firstElementChild.classList.add("hidden"),t.firstElementChild.nextElementSibling.lastElementChild.classList.remove("hidden"),t.firstElementChild.nextElementSibling.lastElementChild.classList.add("color-svg2");const a={...e.closest("li").dataset,isfavorite:!0,isread:!1};!0===a.isFavorite&&t.parentNode.setAttribute("data-favorite","favorite"),u.addToFavorites(a)}else{t.firstElementChild.textContent="Add to favorite",t.dataset.add=!0,t.classList.remove("btn-position"),t.classList.remove("btn-position-reload-page"),t.firstElementChild.nextElementSibling.firstElementChild.classList.remove("hidden"),t.firstElementChild.nextElementSibling.lastElementChild.classList.add("hidden");const a={...e.closest("li").dataset,isfavorite:!1,isread:!1};!1===a.isfavorite&&t.parentNode.setAttribute("data-favorite","false"),u.deleteFromFavorites(a)}}function p({uri:e,url:t,sectionname:a,section:n,newsdate:i,snippet:s,title:r,image:o,isfavorite:c,isread:l}){const f=""!==o?o:h,m=u.getItem({uri:e});let p=`<use  href="${d}#icon-favorite" data-favorite class=" color-svg1"></use>\n    <use  href="${d}#icon-favorite-filled" data-favorite class=" color-svg2 hidden"></use>`,g="",w="Add to favorite",v="",y="true";return m&&((m.isfavorite||m.isRead)&&(p=`<use  href="${d}#icon-favorite" data-favorite class="color-svg1 hidden"></use>\n            <use  href="${d}#icon-favorite-filled" data-favorite class=" color-svg2 "></use>`,w="Remove from favorite",v="btn-position-reload-page",y="false"),m.isread&&(g="opacity")),`<li class="list-news-card__item ${g}" data-uri="${e}" data-url="${t}" data-snippet="${s}" data-title="${r}" data-newsdate="${i}" data-sectionname="${a||n}" data-section="${n}" data-image="${f}">\n  <img src="${f}" alt="" class="list-news-card__img" />\n   <div class='list-news-card__container-title'><h2 class="list-news-card__title">${r}</h2></div>\n  <span class="list-news-card__category">${a||n}</span>\n  <p class="list-news-card__description">${s}</p>\n  <button\n      type="button"\n      class="list-news-card__btn-add-favorite ${v}"\n      data-add="${y}"\n    ><span class="list-news-card__btn-add-favorite--text">${w}</span>\n    <svg width="13" height="12" class="list-news-card__add-favorite--svg">\n    ${p}\n</svg>\n</button>\n    <div class="container-news-list__date-read"><span class="list-news-card__news-date ">${i}</span>\n  <a href="${t}" class="list-news-card__link-read-more" target="_blank" data-link='link'>Read more</a></div>\n</li>`}null!==l&&l.addEventListener("click",m),null!==l&&l.addEventListener("click",(function(e){const t=e.target;if("link"!==t.dataset.link)return;const a={...t.closest("li").dataset,isread:!0};!0===a.isread&&(t.parentNode.parentNode.setAttribute("data-read","read"),t.parentNode.parentNode.classList.add("opacity"));u.addToRead(a)}))})),s.register("7xP6g",(function(t,a){e(t.exports,"categoryOfNews",(function(){return s})),e(t.exports,"getSearchArticles",(function(){return r})),e(t.exports,"mostPopularNews2",(function(){return d})),e(t.exports,"getArticleByCategory2",(function(){return h}));const n="api-key=G4nD622lnyF5V3gyZS7dbGHuMUYNgZ8K",i=`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?${n}`;async function s(){const e=await fetch(`https://api.nytimes.com/svc//news/v3/content/section-list.json?${n}`);return(await e.json()).results}async function r(e,t){let a="";try{a=o(JSON.parse(localStorage.getItem("date")).replace("/","").replace("/",""))}catch(e){}const i=await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${e}&${n}&page=${t}${a}`),s=await i.json();let{response:r,errors:d}=s;if(d)return void c(d);const h=l(r.meta.hits);let{docs:u}=r;return console.log(u),console.log(h),u}function o(e){return`&begin_date=${e}&end_date=${e}`}function c(e){alert(JSON.parse(e))}function l(e){return Math.min(e,1e3)}async function d(){const e=await fetch(i),t=await e.json();return{results:t.results,status:t.status,num_results:t.num_results}}async function h(e,t=0,a=20){try{let i=e;const s=`limit=${a}&offset=${t}&`,r=await fetch(`https://api.nytimes.com/svc/news/v3/content/all/${i}.json?${s}${n}`),o=await r.json();return{results:o.results,status:o.status,num_results:o.num_results}}catch(e){console.error(e)}}})),s.register("3gSZX",(function(a,n){e(a.exports,"geolocateUpdate",(function(){return b}));var i=s("6I2OE"),r=s("bKPBs"),o=s("hwJQc"),c=s("lrLlJ"),l=s("7wvnV"),d=s("h518P"),h=s("7QdTY");const u=new Date;function f(){v=m[u.getMonth()],y=u.getUTCDate(),w=p[u.getUTCDay()],g=u.getUTCFullYear()}const m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],p=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let g=0,w=0,v=0,y=0;function b(){navigator.geolocation.getCurrentPosition(_,$)}function _(e){const{latitude:t,longitude:a}=e.coords;fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${a}&units=metric&appid=164a02a79a239efd4c817829a733c4d8`).then((e=>e.json())).then((e=>S(e))).catch((e=>{console.log(e)}))}function $(e){fetch("https://api.openweathermap.org/data/2.5/weather?lat=50.4199177&lon=30.4983085&units=metric&appid=164a02a79a239efd4c817829a733c4d8").then((e=>e.json())).then((e=>S(e))).catch((e=>{console.log(e)})),console.log(e.message)}const x=e=>{const t=document.querySelector(".weather__geolocation");return e.length>12?(t.style.fontSize="14px",e.length[13]="\0a"):e.length};let E;function S(e){const a=e.weather[0].id;800===a?E=`${t(r)}`:a>=200&&a<=232?E=`${t(d)}`:a>=600&&a<=622?E=`${t(l)}`:a>=701&&a<=781?E=`${t(o)}`:a>=801&&a<=804?E=`${t(i)}`:(a>=500&&a<=531||id>=300&&id<=321)&&(E=`${t(c)}`),f();const n=document.querySelector(".weather");return n&&(n.insertAdjacentHTML("afterbegin",`<div class="weather__container">\n                <span class="weather__temperature">${Math.floor(e.main.temp)}º</span>\n                <div class="weather__iformation-for-weather">\n                    <p class="weather__sky">${e.weather[0].main}</p>\n                    <img class="weather__icon-geolocation" src=${t(h)} alt="icon-geoloc">\n                    <input class="weather__geolocation" type="text" name="geolocation" value="${e.name}">\n                </div>\n            </div>\n            <img class="weather__icon" src="${E}" alt="Weather Icon">\n            <p class="weather__weekday">${w}</p>\n            <p class="weather__date">${y} ${v} ${g}</p>\n            <a class="weather__link-but" href="https://ua.sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BA%D0%B8%D1%97%D0%B2"\n                target="_blank" rel="noopener noreferrer">weather for week</a>`),x(e.name)),Math.floor(e.main.temp),e.weather[0].main,e.name,x(e.name)}})),s.register("6I2OE",(function(e,t){e.exports=new URL(s("kyEFX").resolve("eCp8s"),import.meta.url).toString()})),s.register("bKPBs",(function(e,t){e.exports=new URL(s("kyEFX").resolve("i4qAL"),import.meta.url).toString()})),s.register("hwJQc",(function(e,t){e.exports=new URL(s("kyEFX").resolve("Id7Qn"),import.meta.url).toString()})),s.register("lrLlJ",(function(e,t){e.exports=new URL(s("kyEFX").resolve("hlUia"),import.meta.url).toString()})),s.register("7wvnV",(function(e,t){e.exports=new URL(s("kyEFX").resolve("fnpep"),import.meta.url).toString()})),s.register("h518P",(function(e,t){e.exports=new URL(s("kyEFX").resolve("b7z8L"),import.meta.url).toString()})),s.register("7QdTY",(function(e,t){e.exports=new URL(s("kyEFX").resolve("daEEV"),import.meta.url).toString()})),s.register("8EDGm",(function(a,n){e(a.exports,"default",(function(){return r}));var i=s("iJYdK");class r{load(){const e={theme:"",news:[]};if(this._storageKey)try{const t=window.localStorage.getItem(this._storageKey);return t?JSON.parse(t):e}catch(e){console.error(e)}return e}save(){if(this._storageKey)try{return window.localStorage.setItem(this._storageKey,JSON.stringify(this._data)),!0}catch(e){console.error(e)}return!1}getFavorites(){return this._data.news.filter((e=>!0===e.isfavorite))}getRead(){return this._data.news.filter((e=>!0===e.isread))}addToFavorites(e){if(!e)return!1;const t=this.find(e);-1===t?(e.isfavorite=!0,this._data.news.push(e)):this._data.news[t].isfavorite=!0,this.save()}deleteFromFavorites(e){if(!e)return!1;const t=this.find(e);-1!==t&&(this._data.news[t].isread?this._data.news[t].isfavorite=!1:this._data.news.splice(t,1),this.save())}addToRead(e){if(!e)return!1;const t=this.find(e);-1===t?(e.isread=!0,e.readdate=Date.now(),this._data.news.push(e)):(this._data.news[t].isread=!0,this._data.news[t].readdate=Date.now()),this.save()}deleteFromRead(e){if(!e)return!1;const t=this.find(e);-1!==t&&(this._data.news[t].isread?this._data.news[t].isfavorite=!1:this._data.news.splice(t,1),this.save())}find(e){return"object"==typeof e&&e.hasOwnProperty("uri")?this._data.news.findIndex((t=>t.uri===e.uri)):-1}getItem(e){if("object"==typeof e&&e.hasOwnProperty("uri")){const t=this.find(e);return t>=0?this._data.news[t]:null}}hardcore(){const e=[{uri:"nyt://article/dcfd6326-f015-5837-b84b-1f6ef1dbeaf6",url:"https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html",image:"https://static01.nyt.com/images/2023/02/16/reader-center/bing-roose-hp/bing-roose-hp-mediumThreeByTwo440-v3.png",snippet:"A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.",newsdate:"2023-02-16",readdate:"2023-02-20",sectionname:"Technology",section:"technology",title:"A Conversation With Bing’s Chatbot Left Me Deeply Unsettled",isread:!0,isfavorite:!1},{uri:"nyt://article/41008f54-e126-5918-901e-c3d8efb033b8",url:"https://www.nytimes.com/2023/02/16/technology/bing-chatbot-transcript.html",image:"https://static01.nyt.com/images/2023/02/16/business/16roose-transcript-01/16roose-transcript-01-mediumThreeByTwo440.jpg",snippet:"In a two-hour conversation with our columnist, Microsoft’s new chatbot said it would like to be human, had a desire to be destructive and was in love with the person it was chatting with. Here’s the transcript.",newsdate:"2023-02-16",readdate:Date.now(),sectionname:"Technology",section:"technology",title:"Bing’s A.I. Chat: ‘I Want to Be Alive. 😈’",isread:!0,isfavorite:!0},{uri:"nyt://article/139b8fd7-2643-5bf5-bb6d-ccbea8c22013",url:"https://www.nytimes.com/2023/02/16/us/politics/john-fetterman-health.html",image:"https://static01.nyt.com/images/2023/02/10/multimedia/10dc-Fetterman-health_1-fpcq/10dc-Fetterman-health_1-fpcq-mediumThreeByTwo440.jpg",snippet:"A spokesman for the first-term senator from Pennsylvania, who had a near-fatal stroke last year, said his depression had grown severe in recent weeks, as he has worked to adjust to life in the Senate.",newsdate:"2023-02-16",readdate:Date.now(),sectionname:"u.s.",section:"technology",title:"Fetterman Checks In to Hospital for Treatment of Clinical Depression",isread:!0,isfavorite:!1},{uri:"nyt://article/9b2f4603-bc23-5e02-a0da-1235680624a5",url:"https://www.nytimes.com/2023/02/16/technology/ohio-train-derailment-chernobyl.html",image:"https://static01.nyt.com/images/2023/02/15/multimedia/derailment-01-hmqf/derailment-01-hmqf-mediumThreeByTwo440.jpg",snippet:"For many influencers across the political spectrum, claims about the environmental effects of the train derailment have gone far beyond known facts.",newsdate:"2023-02-16",readdate:"2023-02-16",sectionname:"Technology",section:"technology",title:"‘Chernobyl 2.0’? Ohio Train Derailment Spurs Wild Speculation.",isread:!1,isfavorite:!0},{uri:"nyt://article/b503979a-689b-5220-9db7-d6069f54bd2b",url:"https://www.nytimes.com/2023/02/16/opinion/jk-rowling-transphobia.html",image:"https://static01.nyt.com/images/2023/02/17/opinion/16PAUL_4/16PAUL_4-mediumThreeByTwo440-v3.jpg",snippet:"The charge that she’s a transphobe doesn’t square with her actual views.",newsdate:"2023-02-16",readdate:"2023-02-20",sectionname:"Opinion",section:"opinion",title:"A Conversation With Bing’s Chatbot Left Me Deeply Unsettled",isread:!0,isfavorite:!0},{uri:"nyt://article/4d13d8a7-9db8-5cd0-ae18-f22b0c7dd7ec",url:"https://www.nytimes.com/2023/02/16/arts/television/sarah-silverman-newsmax-woke.html",image:"https://static01.nyt.com/images/2023/02/16/arts/16latenight/16latenight-mediumThreeByTwo440.png",snippet:"“The Daily Show” guest host Sarah Silverman called Newsmax “basically an even more far-right Fox News — like if your crazy uncle had a crazy uncle.”",newsdate:"2023-02-16",readdate:Date.now(),sectionname:"Arts",section:"arts",title:"Sarah Silverman Defines ‘Woke’ for Newsmax",isread:!1,isfavorite:!1},{uri:"nyt://article/dcfd6326-f015-5837-b84b-1f6ef1dbea56",url:"https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html",image:"https://static01.nyt.com/images/2023/02/16/arts/16latenight/16latenight-mediumThreeByTwo440.png",snippet:"A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.",newsdate:"2023-02-16",readdate:Date.now(),sectionname:"Technology",section:"technology",title:"A Conversation With Bing’s Chatbot Left Me Deeply Unsettled",isread:!1,isfavorite:!1},{uri:"nyt://article/dcfd6326-f015-5837-b84b-1f6ef1dbe4f6",url:"https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html",image:"https://static01.nyt.com/images/2023/02/16/reader-center/bing-roose-hp/bing-roose-hp-mediumThreeByTwo440-v3.png",snippet:"A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.",newsdate:"2023-02-16",readdate:"2023-02-19",sectionname:"Technology",section:"technology",title:"A Conversation With Bing’s Chatbot Left Me Deeply Unsettled",isread:!1,isfavorite:!1},{uri:"nyt://article/dcfd6326-f015-5837-b84b-1f6e44dbeaf6",url:"https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html",image:"https://static01.nyt.com/images/2023/02/16/reader-center/bing-roose-hp/bing-roose-hp-mediumThreeByTwo440-v3.png",snippet:"A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.",newsdate:"2023-02-16",readdate:"2023-02-19",sectionname:"Technology",section:"technology",title:"A Conversation With Bing’s Chatbot Left Me Deeply Unsettled",isread:!1,isfavorite:!1}];this.addToFavorites(e[0]),this.addToFavorites(e[1]),this.addToFavorites(e[2]),this.addToRead(e[2]),this.addToRead(e[3]),this.addToRead(e[4]),this.addToRead(e[5]),this.addToFavorites(e[5]),this.addToFavorites(e[6]),this.addToFavorites(e[7]),this.addToRead(e[8])}getTheme(){return this._data.theme}setTheme(e){this._data.theme=e,this.save()}constructor(e){t(i)(this,"_storageKey",""),t(i)(this,"_data",{theme:"",news:[]}),this._storageKey=e,this._data=this.load()}}})),s.register("iJYdK",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t,a){t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a;return e}})),s.register("jrD5E",(function(e,t){e.exports=new URL(s("kyEFX").resolve("8OQ7p"),import.meta.url).toString()})),s.register("kERe0",(function(e,t){e.exports=new URL(s("kyEFX").resolve("4EKHx"),import.meta.url).toString()})),s.register("lQVoc",(function(t,a){e(t.exports,"getMedia",(function(){return n})),e(t.exports,"normalizeImportFileName",(function(){return i})),e(t.exports,"getPageStartIndex",(function(){return s})),e(t.exports,"calculateLimit",(function(){return r})),e(t.exports,"formatDate",(function(){return o}));function n(){return window.matchMedia("(max-width: 767px)").matches?1:window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches?2:3}function i(e){return e.indexOf("?")>=0?e.slice(0,e.indexOf("?")):e}function s(e,t){return(e-1)*t}function r(e,t){const a=20*Math.ceil(Math.abs((e-t)/20));return console.log(e,t,a),0===a?20:a}function o(e){const t=new Date(e);return`${String(t.getDate()).padStart(2,"0")}-${String(t.getMonth()+1).padStart(2,"0")}-${t.getFullYear()}`}})),s("kyEFX").register(JSON.parse('{"DtdA1":"read.c661106c.js","eCp8s":"cloud.7414512a.svg","i4qAL":"clear.66b72bf1.svg","Id7Qn":"haze.94710c4e.svg","hlUia":"rain.58a34d8a.svg","fnpep":"snow.a4e39e5a.svg","b7z8L":"storm.70e3d8ce.svg","daEEV":"carbonLocation.189662de.svg","8OQ7p":"icons.640475a3.svg","4EKHx":"defaultImg.64fbf519.jpg"}'));
//# sourceMappingURL=read.c661106c.js.map
