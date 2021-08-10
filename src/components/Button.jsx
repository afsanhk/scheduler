import React from "react";

import "components/Button.scss";

import classNames from "classnames";

// This component is a button than can be reused based on the props passed to it. 

export default function Button(props) {
   
   const buttonClass = classNames("button", {
   "button--confirm": props.confirm,
   "button--danger": props.danger
  });

 return (
   <button
     className={buttonClass}
     onClick={props.onClick}
     disabled={props.disabled}
   >
     {props.children}
   </button>
 );
}
