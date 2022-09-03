
const loadCatagorey=async()=>{

    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const data = await res.json();
      
        return data.data.news_category;


    }
    catch(error){
        console.log(error);
    }
}

const setAllCategory = async ()=>{
    const data = await loadCatagorey();

    const category = document.getElementById("categorey");
   
    for (const catagory of data){
      
                   
                        const li = document.createElement('li')
                        li.innerHTML=`
                                    <a onclick="newsDetails(${catagory.category_id})" class="nav-link" href="#">${catagory.category_name}</a>`;
                                    category.appendChild(li);
                     
    }
    }
    
setAllCategory();

const newsDetails = async(category_id)=>{
    const url =(` https://openapi.programming-hero.com/api/news/category/0${category_id}`);
    toggleSpiner( true);
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}




const displayNews = allNews =>{
    // console.log(allNews);
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML="";
    allNews.forEach(news => {


        const totalNewsCount = document.getElementById('total-news-count');
        totalNewsCount.textContent="";
    if(allNews.length === 0){
        totalNewsCount.innerText = 'No';
    }
    else{
        totalNewsCount.innerText = allNews.length;
    }


        const{rating, total_view, title, author, thumbnail_url, image_url, details, _id }=news
        const div = document.createElement("div");
        div.innerHTML = ` <div class=" px-40 py-5 card card-side bg-base-100 shadow-xl">
        <figure><img class="w-80 h-80" src="${thumbnail_url}" alt="Movie"></figure>
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p>${details?  details.slice(0,200) + '...' : details}</p>
         
 <div class=" flex justify-between">

    <div class=" flex gap-5 my-"> 
        <img class="w-10 h-10 rounded-full" src="${author.img}" alt="Movie">
        <h1>${author.name ? author.name : "No Data Found"}</h1>
        </div>
        
    <div class="flex gap-3">
    <i class="fa-solid fa-eye"></i>
        <h1>${total_view? total_view : "No Data Found"}</h1>
       </div>
    
       <div>
       <label for="my-modal-6" onclick="loadModal('${_id}')" class="btn modal-button"><i class="fa-solid fa-arrow-right"></i></label>
       
      
       </div>
  </div>
         
        </div>
      </div>
      `;

      newsContainer.appendChild(div);
    });

    toggleSpiner( false);
}






 const loadModal =async (id )=>{
    try{
        const url = `https://openapi.programming-hero.com/api/news/${id}`;
        const res = await fetch(url);
        const data =await res.json();
        displayNewsDetails(data.data[0]);
    }
    catch(error){
        console.log(error);
    }
 }

 const displayNewsDetails = singalNews =>{
     console.log(singalNews);
     const{rating, title, image_url, details,}= singalNews;

     const divcon = document.getElementById("modal-body")
     divcon.innerHTML=`
     <h3 class="font-bold text-lg">${title}</h3>
        <p class="py-4">${details}</p>
        <p class="py-4"><i class="fa-solid fa-star-half-stroke"></i> ${rating.number}</p>
        
        <div><img class=" h-50" src="${image_url}"></div>
        <div class="modal-action">
        <label for="my-modal-6" class="btn">Close</label>
      </div>
     `;



 }


 const toggleSpiner = isLoading =>{
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove('invisible')
    }
    else{
        loaderSection.classList.add('invisible')

    }
}



