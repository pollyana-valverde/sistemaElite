import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import DailyTasks from "./DailyTasks";
import DropProfile from "./DropProfile";
import Calendario from "./Calendario";

import { useAuth } from '../provider/AuthProvider';
import Rotas from "../Routes";

import '../css/rightBar.css';

export default function RightBar() {
	const [date, setDate] = useState(null);
	const { token } = useAuth();

	return (
		<Container fluid>
			<Row>
				{token ? (
					<>
						<Col lg={3} md={3} sm={1}>
							<div className="card flex rightBar">
								<DropProfile />
								<Calendario/>
								<DailyTasks />
							</div>
						</Col>
					</>
				) : (
					<Rotas />
				)}
			</Row>
		</Container>
	)
}
