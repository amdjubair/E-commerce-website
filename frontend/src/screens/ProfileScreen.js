import React, { useEffect, useState } from 'react'

import { Card } from 'react-bootstrap'



function ProfileScreen() {

    const [user, setUser] = useState(null)
    const [type, setType] = useState("")

    useEffect(() => {
        // if()
        // getOrders()
        setType(localStorage.key(0))
        if(!user)
            setUser(JSON.parse(localStorage.getItem(localStorage.key(0))))
    }, [user])
    return (
        <div style={{ width: '90%', marginLeft: '10%' }} >
            
            {user &&
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Card style={{ width: '23rem' }}>
                        <Card.Img variant="top" src='/images/profile.png' alt="could not load" style={{ width: '140px', height: '140px', marginLeft: '30%' }} />
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>
                                What kind of product he sells and  a litlle bit of description
                            </Card.Text>
                            <Card.Footer className='text-muted'>
                                Email: {type === 'user' ? user.contactInformation.email : user.email} <br />
                                
                            </Card.Footer>
                            {/* <Button variant="">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                    <Card className="text-center" style={{ marginTop: '100px', width: '400px' }}>
                        <Card.Header>Financial Information</Card.Header>
                        <Card.Body>
                            {/* <Card.Title>Special title treatment</Card.Title> */}

                            <blockquote className="blockquote mb-0">
                                <b>Bank account : {user.bankInformation.accountNumber} </b>

                            </blockquote>
                            <br />
                            
                           
                            {/* <Button variant="">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                </div>
            }
            {/* {console.log("user", user)} */}
            
            {/* <div>


                <input type="file" onChange={e => setSelectedFile(e.target.files[0])} />
                <button onClick={uploadHandler}> upload</button>

            </div> */}
        </div>
    )
}

export default ProfileScreen