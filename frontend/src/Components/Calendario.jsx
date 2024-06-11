import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

import '../css/calendario.css';

export default function Calendario() {
	const [date, setDate] = useState(null);

	return (

		<div className="card flex justify-content-center calendarioSide">
			<Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
		</div>

	)
}
