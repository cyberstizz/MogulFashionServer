import React from 'react';
import './Home.scss';
import SexHeader from './SexHeader';
import HomeImage from './HomeImage';
import { Link } from 'react-router-dom';


const OtherHome = () => {
    return (
        <React.Fragment>
        {/* <header className="topSection"> */}
            {/* <Hamburger /> */}
            {/* <img src='./MogulLogo.png' width="80" height="auto" alt='the mogo logo' className='homeLogo'></img>
            <button className='mainButton' style={{backgroundColor:'red'}}>Apparel</button>
            <button className='mainButton'>Other</button>
        </header> */}


        <video className="apparelVideo" width="100%" height="auto" loop="true" autoPlay muted>
          <source src="/fashionvideofinished.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        <br />

        <SexHeader header="Men"/>
        <main>
          <section className='HomeImages'>
            <Link to='/sneakers'><HomeImage title="sneakers" imageUrl="SouthOxford.jpg"/></Link>         
            <Link to='/pants'><HomeImage title="pants" imageUrl="mogulPants.jpg"/></Link> 
            <Link to='/hoodies'><HomeImage title="hoodies" imageUrl="MogulHoodie.jpg"/></Link> 
          </section>

         <br />

        <SexHeader header="Woman"/>

          <section className='HomeImages'>
            <Link to='/dresses'><HomeImage title="dresses" imageUrl="MogulDress.jpg"/></Link>           
            <Link to='/skirts'><HomeImage title="skirts" imageUrl="MogulSkirt.jpg"/></Link>
            <Link to='/sets'><HomeImage title="sets" imageUrl="MogulSet.png"/></Link>
          </section>

        </main>
        
        </React.Fragment>
      );
}

export default OtherHome;