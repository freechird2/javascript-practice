const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

const root = document.getElementById('root');
const content = document.createElement('div')

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response)
const ul = document.createElement('ul');

window.addEventListener('hashchange', () => {
    ajax.open('GET', CONTENT_URL.replace('@id', location.hash.substring(1)), false);
    ajax.send();

    const newsContent = JSON.parse(ajax.response);

    const title = document.createElement('h1')
    title.innerHTML = newsContent.title;

    content.appendChild(title);
});

newsFeed.forEach(news => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    a.innerHTML = `${news.title} (${news.comments_count})`;
    a.href = `#${news.id}`;
    
    li.appendChild(a);
    ul.appendChild(li);
});

root.appendChild(ul);
root.appendChild(content);
