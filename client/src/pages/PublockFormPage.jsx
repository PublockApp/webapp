import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PublockFormPage() {

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
    useEffect(() => {
        if(!id) {
            return;
        }
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
        <form onSubmit={savePublock}>
        <AccountNav />
        {preInput('Title','Name your Publock. Make short and sweet!')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="The Shoe Locker"/>
        {preInput('Address','Address for the Publock')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>
        {preInput('Photos','The more the merrier!')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
        {preInput('Description','Describe your Publock')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
        {preInput('Perks','Extra Info')}

        <div className="grid gap-2 gird-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput('Extra Info','Publock operations, protocol')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>

        {preInput('Start & End times, Max Capacity','add operational hours')}
        <div className="grid gap-2 grid-cols-2 md:grid-4">
            <div>
                <h3 className="mt-2 -mb-1">Daily Start Time</h3>
                <input type="text" 
                value={startTime} 
                onChange={ev => setStartTime(ev.target.value)} 
                placeholder="14:00"/>
            </div>
            <div>
                <h3 className="mt-2 -mb-1">Daily End Time</h3>
                <input type="text" 
                value={endTime} 
                onChange={ev => setEndTime(ev.target.value)} 
                placeholder="11:00"/>
            </div>
            <div>
                <h3 className="mt-2 -mb-1">Publock Monthly Capacity</h3>
                <input type="number" 
                value={maxCapacity} 
                onChange={ev => setMaxCapacity(ev.target.value)}/>
            </div>
            <div>
                <h3 className="mt-2 -mb-1">Prices per week</h3>
                <input type="number" 
                value={price} 
                onChange={ev => setPrice(ev.target.value)}/>
            </div>
        </div>
        <div>
            <button className="primary my-4">Save</button>
        </div>
    </form>
    );
}