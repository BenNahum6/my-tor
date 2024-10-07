import { MongoClient } from "mongodb";

async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv:///bennahum6:VnAnxGLTGPL7.-j@cluster0.ggw20lh.mongodb.net/Available_tor?retryWrites=true&w=majority&appName=Cluster0');
        const db = client.db();
        
        const Availables_tor_collection = db.collection('Available_tor');
        const result = await Availables_tor_collection.insertOne(data) 
        console.log(result)
        client.close();

        res.status(201).json({message: 'works'});
    }
}

export default handler;