import PhotosUploader from "../PhotosUploader";
import StoreTraits from "../StoreTraits";
import { useEffect, useState } from "react";
import UserNav from "../UserNav";
import { Navigate, useParams } from "react-router-dom";
import TagCreator from "../components/TagCreator";
import axios from "axios";

export default function CreateStore() {

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [maxCapacity, setMaxCapacity] = useState(300);
    const [price, setPrice] = useState(0.20); //pricing has to be by unit
    const [redirect, setRedirect] = useState(false);
    const [nftAddress, setNFTAddress] = useState('');
    const [nftId, setNftId] = useState('');
    const [tagNumber, setTagNumber] = useState([]);

    const [isToggled, setToggle] = useState(false); // initial state is 'false'

    const handleToggle = () => {
      setToggle(!isToggled); // switches the state to the opposite value
    };
  
    useEffect(() => {
        if(!id) {
            return;
        }

        //this will be a smart contract or a query that we call in the dashbaord so they can edit or change things
        axios.get('/publocks/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            //startTime and End Time have to be more detailed into hours of operation, delivery promises etc 
            setStartTime(data.startTime);
            setEndTime(data.endTime); 
            //maxCapcity will have to be more detailed by weight class etc 
            setMaxCapacity(data.maxCapacity);
            //pricing will have many more options then this 
            setPrice(data.price);
        });
    }, [id]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return(
            <p className="text-gray-500 text-sm">{text}</p>

        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    function generateTag(ev) {

    }

    async function savePublock(ev) {
        ev.preventDefault();

        const publockData = {
            title,
            address,
            addedPhotos, 
            description, 
            perks,
            extraInfo, 
            startTime, 
            endTime, 
            maxCapacity, 
            price,
        } 

        if(id) {
            //update
            await axios.put('/publocks', {
                id, ...publockData
            });
            setRedirect(true);
        } else {
            //newPlace
            await axios.post('/publocks', publockData);
            setRedirect(true);
        }
      
    }

    if(redirect) {
        return <Navigate to={'/account/publocks'} />
    }

    return(
    <>
        <form onSubmit={savePublock}>
        <UserNav />

        <br></br>

        {preInput('Distribution','How do you want to distribute your merchandise')}

        <label className="border p-4 flex rounded-2xl gap-2 items-center">
             <input type="checkbox" name="24/7 Camera"></input>
            <span>SELF-FULFILLMENT</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center">
             <input type="checkbox" name="24/7 Camera"></input>
            <span>3RD PARTY FULFILLMENT</span>
        </label>
        
        <br></br>

        {preInput('Store Set Up','Will customers be minting or will it be pre-minted?')}
        <label className="border p-4 flex rounded-2xl gap-2 items-center">
             <input type="checkbox" name="24/7 Camera"></input>
            <span>PRE-MINT</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center">
             <input type="checkbox" name="24/7 Camera"></input>
            <span>LIVE-MINT</span>
        </label>

        <br></br>
        
        {preInput('Name','Name your Store. Make short and sweet!')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Perfect Shirts"/>
        
        <br></br>
        
        {preInput('Symbol','What is your store initials?')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="PSI"/>
        
        <br></br>

        {preInput('Collectible Image','Add a link from IPFS or upload a file or photo with your collectable images!')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

        <br></br>

        {preInput('Tag Image (Optional)','For live mints add images of the item that people will be purchasing!')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

        <br></br>

        {preInput('Description','Describe your store what does it represent, or stand for')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} placeholder="This collection is awesome, come and see"/>

        <br></br>

        {preInput('Location','enter the city you will be shipping from if fulfilling independently')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="New York, NY"/>
        
        <br></br>

        {/*{preInput('Traits','what type of traits does this store have?')}

        <div className="grid gap-2 gird-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <StoreTraits selected={perks} onChange={setPerks} />
        </div>

        <br></br>*/}

        {preInput('Set Collection Parameters','add royalties, supply limit, list under a brand or give ownership to your publock. If none enter N/A')}
        <div className="grid gap-2 grid-cols-2 md:grid-4">
            <div>
                <h3 className="mt-2 -mb-1">Royalty Fee</h3>
                <input type="text" 
                value={startTime} 
                onChange={ev => setStartTime(ev.target.value)} 
                placeholder="5%"/>
            </div>
            <div>
                <h3 className="mt-2 -mb-1">Brand Token ID</h3>
                <input type="text" 
                value={endTime} 
                onChange={ev => setEndTime(ev.target.value)} 
                placeholder="8"/>
            </div>
            <div>
                <h3 className="mt-2 -mb-1">Max Supply</h3>
                <input type="number" 
                //value={maxCapacity} 
                onChange={ev => setMaxCapacity(ev.target.value)}
                placeholder="10000"/>
            </div>
            <div>
                <h3 className="mt-2 -mb-1">PubCard ID</h3>
                <input type="number" 
                //value={price} 
                onChange={ev => setPrice(ev.target.value)}
                placeholder="5"/>
            </div>
        </div>
        <div>
            <button className="primary my-4">Create</button>
        </div>
    </form>
 </>
    );
}