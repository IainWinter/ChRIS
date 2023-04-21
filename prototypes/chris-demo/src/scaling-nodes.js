import React, {useState} from "react";


/*we will have to remove the min-width attribute for 
chris-plugin-instance-node and change the width to 100% in chris-plugin-instance-node-thumb */

const Scale=(given_width,given_height,given_id)=>{
    const [width,setWidth] = useState(200);
    const [height,setHeight] = useState(200);

    setWidth(given_width);
    setHeight(given_height);

    document.getElementById(given_id).parentElement.style.maxWidth=width;
    document.getElementById(given_id).parentElement.style.maxHeight=height;
    
}

