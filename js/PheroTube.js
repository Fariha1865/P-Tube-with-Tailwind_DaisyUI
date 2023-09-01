let id;
let cardsArray = [];
let isSorted = false;
// ...........Fetch Catagories............activeButton.apply.apply.
const getCardsCatagories = async() =>{

      try{
        const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
        const data = await response.json();
        ToggleSpinner(true);
        showTabsNavigationButtons(data.data);
        //to show All catagories cards by default
        getCardInformationsById(data.data[0].category_id);
        
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
             getCardInformationsById(id);
             activeButton(element.category_id);
              
        })
        Tabs_Container.appendChild(catagoriesButton);
        
      })


}
//..................Get category id from tab button click............
const getCardInformationsById = async(id) => {
   
    ToggleSpinner(true);
    console.log(id)
    try{
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        const data = await response.json();
        showCards(data.data);
      }catch(error){
          console.log("Failed to fetch catagories data by Id");
      }

}

//..........function to show cards (when no cards available to show, no data available message is shown).........
const showCards = async(data) => {

    const cardHolder = document.getElementById('cards_holder');
    const emptyTab = document.getElementById('noItems');
    cardHolder.innerHTML = '';
    emptyTab.innerHTML='';
    //.....when data is empty....
    if(data.length === 0 && id!=undefined)
    {
 
        cardHolder.classList.add('hidden');
       
        
        const empty = document.createElement('div');
        empty.classList = "flex flex-col items-center"
        empty.innerHTML=`
        <img src="./images/Icon.png" alt="CardImage" class="w-32"/>
        <h1 class="mt-5 text-xl font-bold text-center">Oops!! Sorry, There is no<br> content here<h1>
        
        `
        emptyTab.appendChild(empty);
        ToggleSpinner(false);
      
  
    }
    //.......when data is not empty............
    else{
       cardHolder.classList.remove('hidden');
       data.forEach(element => {

     
            const cards = document.createElement('div')
            cards.classList = "p-5 card bg-base-100 shadow-xl shadow-gray-500 transform hover:scale-105 transition duration-300 ease-in-out";

            cards.innerHTML = `
            
          
            <img src=${element.thumbnail} alt="CardImage" class="h-44 rounded-lg" />
         
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
        ToggleSpinner(false);
       })

    }
    


       
}






//...............To change color when tab is changed......................
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

function ToggleSpinner(isLoading){

    if(isLoading)
    {
        document.getElementById('spinner').classList.remove('hidden');
    }else{
        document.getElementById('spinner').classList.add('hidden');
    }
}



getCardsCatagories()
getCardInformationsById ()