const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;

    const categoryButtons = document.getElementById("caregory_buttons");
    categories.forEach(category => {
        const div = document.createElement('div');

        div.innerHTML = `
        <div><button onclick="handleLoadVedios('${category.category_id}')" class="btn btn-sm mx-4 focus:outline-none focus:bg-red-600 focus:text-white">${category.category}</button></div>
        
        `
        categoryButtons.appendChild(div);
        handleLoadVedios(1000);
    })
}


let vedios = [];



document.getElementById('sortButton').addEventListener('click', () => {
    
    if (vedios.length > 0) {
        
        const sortedVedios = vedios.sort((a, b) => {
            const viewsA = parseInt(a.others.views.replace('K', '')); // Remove 'K' and parse as an integer
            const viewsB = parseInt(b.others.views.replace('K', '')); // Remove 'K' and parse as an integer
            return viewsB - viewsA;
        });

        
        displayVedios(sortedVedios);
    }
});




const handleLoadVedios = async (id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
     vedios = data.data;
    
    if (!vedios || vedios.length === 0) {
        
        displayNoData();
        return;
    }
    else{
        displayVedios(vedios);
    }
    

}




const displayVedios = (vedios) => {
    const cardContainer = document.getElementById('Card_container');
    cardContainer.classList.add(`grid`);
    cardContainer.textContent = ''
    vedios?.forEach(vedio => {
        const div = document.createElement('div');
        div.classList = `card card-compact  bg-base-100 shadow-xl`;
        const isVerified = vedio.authors[0].verified === true;
        const dateTimestamp = parseInt(vedio.others.posted_date, 10);
        const dateInHours = Math.floor(dateTimestamp / 3600);
        const dateInMinutes = Math.floor((dateTimestamp % 3600) / 60);
        div.innerHTML = `
        <figure class="w-full "><img class="w-full h-64" src="${vedio.thumbnail}" alt="Shoes" />
        </figure>
        ${vedio.others.posted_date ? `<div class="absolute  bottom-32 right-2 bg-black rounded-lg font-semibold text-white p-2 text-xs">${dateInHours} hrs ${dateInMinutes} min ago</div>` : ''}
        <div class="card-body ">
            <div class="flex gap-2">
                <div class="avatar">
                    <div class="w-10 h-10 rounded-full">
                        <img class="w-8 h-8" src="${vedio.authors[0].profile_picture}" />
                    </div>

                </div>
                
                <div class="space-y-1">
                    <h2 class="card-title text-lg">${vedio.title}</h2>
                   <div class="flex items-center gap-1">
                    <div>
                      <p class="AwladHossain text-neutral-900 text-opacity-70 text-sm font-normal">${vedio.authors[0].profile_name}</p> 
                    </div>
                       <div>
                       ${isVerified ? '<div><img class="w-4" src="/icons8-verified-48.png" alt=""></div>' : ''}
                       </div>
                   </div>
                   <div  class="KViews text-neutral-900 text-opacity-70 text-sm font-normal">${vedio.others.views} views</div>

                </div>
            </div>
            

        </div>
        
        `
        cardContainer.appendChild(div);
    });
}
const displayNoData = () => {
   
    const cardContainer = document.getElementById('Card_container');
    cardContainer.textContent = ''
    cardContainer.classList.remove(`grid`);

    cardContainer.innerHTML = `
       <div class="flex items-center justify-center h-96">
           <div class="text-center flex flex-col items-center justify-center">
            <img src="/Icon.png" alt="No Data Available" />
            <p class=" text-center text-neutral-900 text-3xl font-bold leading-10">Oops!! Sorry, There is no <br> content here</p>
            </div>
        </div>
    `;
};



handleCategory();
