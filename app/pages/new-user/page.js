const data = {
    name: 'Ben',
    email: 'bennahum6@gmail.com'
}

export default function newUser(){
    async function addNewUser(){
        
        console.log('page ****************');
        const respons = await fetch('/api/new-user',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resdata = await respons.json();
        console.log(resdata);
    }
    
    addNewUser();
    return(
        
        <h1 className="text-red-500">Helooooooooooooooooo</h1>
    )
}
