let id = 1000;
// ...........Fetch Catagories............activeButton.apply.apply.
const getCardsCatagories = async() =>{

      try{
        const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
        const data = await response.json();
        showTabsNavigationButtons(data.data);
      }catch(error){
          console.log("Failed to fetch catagories data");
      }

}


//.................Show the tab navigation bar...................
const showTabsNavigationButtons = (data) => {

    const Tabs_Container = document.getElementById('Tabs_Container');
      data.forEach(element => {

        const catagoriesButton = document.createElement('button');
        catagoriesButton.classList = "tabBtn btn px-5 bg-[#25252533] font-semibold";
        catagoriesButton.innerText = element.category;
        if(element.category === 'All')
        {
            catagoriesButton.style.backgroundColor = '#FF1F3D';
            catagoriesButton.style.color = 'white';
        }
        catagoriesButton.addEventListener('click',function(){
             
             catagoriesButton.id = element.category_id;
             id = element.category_id;
             getCardInformationsById();
             activeButton(element.category_id);
              
        })
        Tabs_Container.appendChild(catagoriesButton);
        
      })


}

const getCardInformationsById = async() => {

    console.log(id)
    try{
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        const data = await response.json();
        showCards(data.data);
      }catch(error){
          console.log("Failed to fetch catagories data by Id");
      }

}
const showCards = (data) => {
    const cardHolder = document.getElementById('cards_holder');

    cardHolder.innerHTML = '';
       data.forEach(element => {

     
            const cards = document.createElement('div')
            cards.classList = "p-5 card bg-base-100 shadow-xl shadow-gray-500 transform hover:scale-105 transition duration-300 ease-in-out";

            cards.innerHTML = `
            
            <figure class = "h-40">
            <img src=${element.thumbnail} alt="CardImage" class="rounded-lg" />
           </figure>
          <div class="mt-10 flex gap-5 text-lg">
            <img src=${element.authors[0].profile_picture} alt="" class="w-10 h-10 rounded-full">
            <div class="flex flex-col">
                <h1 class="font-bold">${element.title}</h1>
                <div class="flex gap-2 items-center mt-3">
                    <p class="text-gray-600">${element.authors[0].profile_name}</p>

                    ${element.authors[0].verified ? '<img src="./images/verified.png" alt="" />' : ''}
                     
                </div>
                <p class="text-gray-600 mt-2">${element.others.views}</p>
            </div>
        </div>
            
            
            `
        cardHolder.appendChild(cards);
       })
}


































//...............To change color when hovered......................
function activeButton(category_id){

    const activeButton = document.getElementById(category_id);
    activeButton.classList.remove('tabBtn');

    const inactiveTabs = document.querySelectorAll('.tabBtn');
    for(each of inactiveTabs)
    {
    
 
        each.style.backgroundColor = '#25252533';
        each.style.color = 'black';
        activeButton.classList.add('tabBtn')
    }

    activeButton.style.backgroundColor = '#FF1F3D'
    activeButton.style.color = 'white'
}

getCardsCatagories()
getCardInformationsById ()