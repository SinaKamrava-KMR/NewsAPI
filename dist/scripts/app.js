const articlesContainer = document.getElementById("articles-container");
const searchBtn = document.getElementById("search-btn");
const category = document.getElementById("choose-category");
const chooseCountry = document.getElementById("choose-country");
const subject = document.getElementById("subject");

let articles=[];









class Article{
    urlToImage="";
    title="";
description="";
publishedAt="";
    constructor(obj){
this.urlToImage=obj.urlToImage;
this.title=obj.title;
this.description=obj.description;
const date = new Date(obj.publishedAt)
console.log(`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`);
this.publishedAt=`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
// this.publishedAt=obj.publishedAt;
    }
    get urlToImage(){
        return this.urlToImage
    }
    get title(){
        return this.title
    }
    get description(){
        return this.description
    }
    get publishedAt(){
        const date = new Date(this.publishedAt)
        console.log(`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`);
        return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
    }

}

function createArticlesCard(article){
return `<div
class="container flex-1 flex flex-col justify-between min-w-[250px] bg-white text-center p-3 border border-gray-300 rounded-md"
>
<div class="w-full rounded-md h-[200px] overflow-hidden">
  <img
    class="w-full h-full object-cover"
    h
    src="${article.urlToImage}"
    alt=""
  />
</div>
<p class="font-bold my-4 text-lg line-clamp-2 text-ellipsis">${article.title}</p>
<div class="w-full h-[1px] bg-gray-200"></div>
<p class="my-4 line-clamp-3 text-ellipsis">${article.description}</p>
<div class="w-full h-[1px] bg-gray-200"></div>
<p class="bg-blue-500 text-white rounded-sm mt-4">${article.publishedAt}:تاریخ انتشار</p>
</div>`
}

function init(){
    articlesContainer.innerHTML="";
    articles.forEach(article=>{
        articlesContainer.innerHTML+= createArticlesCard(new Article(article));
    })
}

searchBtn.addEventListener("click",(e)=>{
const categoryValue  =category.value;
const chooseCountryValue= chooseCountry.value;
const subjectValue = subject.value;
getArticles(subjectValue);
})

function getArticles(subject="",category="",country=""){
    const promise=fetch(`https://newsapi.org/v2/everything?q=${subject}&country=${country}&category=${category}&apiKey=bfcabf1d736d4612841c462aebef3495`);

    promise.then((Response)=>{
    return Response.json()
    }).then((data)=>{
        articles=[...data.articles];
        init()
    }).catch((Error)=>{
        console.log(error);
    })
}


