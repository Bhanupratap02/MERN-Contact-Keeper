/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react'
import spinner from "./spinner.gif"
// eslint-disable-next-line import/no-anonymous-default-export
 const Spinner =() =>{
    <Fragment>
      
        <img src={spinner}
        style={{width:"200px",margin:"auto",
        display:"block"}}
        alt="Loading..."/>
    </Fragment>
}

export default Spinner;