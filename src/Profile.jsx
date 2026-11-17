import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {

    const [profile, setProfile] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [unfollowed, setUnfollowed] = useState([]);

    useEffect(() => {
        axios.get('/api/profile')
            .then((data) => { setProfile(data.data); console.log(data); })
            .catch((err) => console.log(err));

        axios.get('/api/followers')
            .then((data) => setFollowers(data.data))
            .catch((err) => console.log(err));
    }, [unfollowed]);

    function HandleOnchange(e){
        setProfile(prev =>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleUpdate = async () => {
        axios.put('/api/profile', profile)
            .then(() => console.log('Updated'))
            .catch((err) => console.log(err));
    }

    const handleUnfollow = async (id) => {
        axios.delete(`/api/followers/${id}`)
            .then(() => alert('unfollowed'))
            .then(() => setUnfollowed(!unfollowed))
            .catch((err) => console.log(err));
    }

  return (
    <div className="m-5">
        {profile ? (
            <div>
                <img src={profile.profile_pic} className='profile rounded-circle'/>
                <h5>{profile.username}</h5>

                <input type="text"
                        value={profile.username}
                        name="username"  
                        className="form-control my-4" 
                        onChange={HandleOnchange}             
                />
                <input type="text" 
                        name="profile_pic"
                        value={profile.pic}
                        className="form-control"
                        onChange={HandleOnchange} 
                />
                <button className="btn btn-primary my-4"
                    onClick={handleUpdate}                
                >
                    Update
                </button>
            </div>
                
        ) :(
            <div>Loading</div>
        )}
        {followers.length >0?( 
            followers.map(follower =>(
                <div key = {follower.id} className="d-flex my-2" >
                   {follower.username} 
                   <button className="btn btn-secondary ms-auto"
                        onClick={()=>{handleUnfollow(follower.id)}}
                   >unfollow</button>
                </div>
            ))
        ):(
            <div>Loading Followers</div>
        )}
    </div>

  )
}

export default Profile