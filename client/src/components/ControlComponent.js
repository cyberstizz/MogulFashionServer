import React from "react";
import { Link } from "react-router-dom";
import './ControlComponent.scss';


const ControlComponent = (props) => {
    return (
        <React.Fragment>
            <main className="fullControlComponent">
                <img onLoad={props.onImageLoad} src={props.path} width='122'height='105' style={{marginTop: '3vh', marginLeft: '6vw'}} alt='pants'></img>
                <section className="submenuTitle">{props.name}</section>
                <section style={{marginRight: '2vw',alignSelf: 'center',display: 'flex', flexDirection: 'column'}}>
               <Link to={`/edit/${props.productCategory}/${props.productId}`}><button style={{backgroundColor: 'blue', color: 'white'}}>Edit</button></Link> 
                <button onClick={props.onDelete} style={{backgroundColor: 'red', color: 'white'}}>Delete</button>
                </section>
            </main>
        </React.Fragment>
    )
}

export default ControlComponent;