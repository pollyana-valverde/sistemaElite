import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Container, Row, Col } from 'react-bootstrap'

import '../css/calendario.css';

export default function InlineDemo() {
	const [date, setDate] = useState(null);

	return (
		<Container fluid>
			<Row>
				<Col lg={3} md={3} sm={1}>
					<div className="card flex justify-content-center calendarioSide">
						<Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
						
					</div>
				</Col>
			</Row>
		</Container>
	)
}
