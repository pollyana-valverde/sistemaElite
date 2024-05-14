// import React, { useEffect, useState } from "react";
// //import React from "react";
// // import "./styles.css";

// export default function PesquisaReceber() {
//   const [id, setId] = React.useState([]);

//   //FILTER SEARCH DATA API
//   const [data, setData] = useState([]);
//   const [searchFilter, setSearchFilter] = useState([]);
//   const [result, setResult] = useState("");

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((resp) => resp.json())
//       .then((data) => setSearchFilter(data))
//       .catch((error) => console.log({ error }));
//   }, []);

//   useEffect(() => {
//     const results = searchFilter.filter((resp) =>
//       resp.name.toLowerCase().includes(result)
//     );
//     setData(results);
//   }, [result]);
//   //console.log(data);

//   const onChange = (evt) => {
//     setResult(evt.target.value);
//   };

//   return (
//     <div className="Filter">

//       <h1>Search</h1>

//       <div className="Appfilter">
//         <input
//           type="text"
//           placeholder="Search here ... "
//           value={result}
//           onChange={onChange}
//         />
//         {data.map((r, i) => (
//           <ul key={i}>
//             <li>{r.name}</li>
//           </ul>
//         ))}
//       </div>
//     </div>
//   );
// }

