// import React, { useState, useEffect } from "react";

// interface Position {
//   x: number;
//   y: number;
// }

// export function DraggableComponent() 
// {
//   const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
//   const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
//   const [dragging, setDragging] = useState(false);

//   useEffect(
// 	() => {
//     if (dragging) 
// 	{
//       window.addEventListener("mousemove", handleMouseMove);
//       window.addEventListener("mouseup", handleMouseUp);

// 		console.log("added event listener");
//     }

//     return () => {

// 		console.log("removed");

//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [dragging]);

//   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setDragging(true);
//     setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
//   };

//   function onMouseUp()
//   {
//     setDragging(false);
//   }

//   function onMouseDrag(e: MouseEvent)
//   {
//     e.preventDefault();

//     if (dragging) 
// 	{
//     	setPosition({
//         	x: e.clientX - offset.x,
//         	y: e.clientY - offset.y,
//      	});
//     }
//   };

// //   return (
// //     <div
// //       style={{
// //         position: "absolute",
// //         top: position.y,
// //         left: position.x,
// //         cursor: "move",
// // 		color: "white"
// //       }}
// //       onMouseDown={handleMouseDown}
// //     >
// //       Drag me!
// //     </div>
// //   );
// }