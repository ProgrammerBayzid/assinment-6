
const loadCatagorey=async()=>{

    try{
        const res = await fetch("https://openapi.programming-hero.com/api/news/categories?fbclid=IwAR1TzxIJkczE_nVexWnAJDy30lCQkg0XuVMRlCrcETqmMJdw82x7ov1iSio");
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
                                    <a>${catagory.category_name}</a>`;
                                    category.appendChild(li);
                     
    }
    }
    
setAllCategory();