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
     
             activeButton(element.category_id);
              
        })
        Tabs_Container.appendChild(catagoriesButton);
        
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
