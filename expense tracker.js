async function saveToCloudStorage(event){
    event.preventDefault();

    amount = event.target.amount.value;
    productName = event.target.prod.value;

    obj = {
        amount,
        productName
    }

    try{
        const response = await axios.post('http://localhost:4000/add-users',obj)
        showUsersOnScreen(response.data.userDetails)
    }catch(error){
        console.log(error);
    }
};

function showUsersOnScreen(obj){
    const parentElem = document.getElementById('listOfUsers');
    const childElem = document.createElement('li');
    childElem.textContent = `${obj.amount} - ${obj.productName}`;

    const delButton = document.createElement('button');
    const delText = document.createTextNode('Delete');
    delButton.appendChild(delText);
    childElem.appendChild(delButton); // so that each entry has a delete button
    
    delButton.addEventListener('click', async()=>{
        try{
            await axios.delete(`http://localhost:4000/delete-user/${obj.id}`)
            parentElem.removeChild(childElem)
        }catch(error){
            console.log('error deleting:', error)
        }
    });

    

    

    const editButton = document.createElement('button');
    const editText = document.createTextNode('Edit');
    editButton.appendChild(editText);
    childElem.appendChild(editButton);

    editButton.addEventListener('click', async()=>{
        try{
            await axios.delete(`http://localhost:4000/delete-user/${obj.id}`)
            parentElem.removeChild(childElem)
            
        }catch (err) {
            console.log('Error deleting user:', err);
        }
        

        //populating the input fields of html elements
        document.getElementById('amountTag').value = obj.amount;
        document.getElementById('product').value = obj.productName;
    })

    
    parentElem.appendChild(childElem);
  
}



window.addEventListener("DOMContentLoaded", async () =>{
    try{
        const response = await axios.get("http://localhost:4000/add-users");

        for (let i = 0; i < response.data.allUserOnScreen.length; i++) {
            showUsersOnScreen(response.data.allUserOnScreen[i]);
        }


    }catch(error){
        console.log(error);

    } 

    
});
