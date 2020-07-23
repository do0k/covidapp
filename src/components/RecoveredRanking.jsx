import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

function RecoveredRanking(props) {
	const [resultData, setResultData] = useState([])
	
	useEffect(() => {
		fetch('https://do0kcovid19api.herokuapp.com/ranking/recovered').then(res => res.json())
				.then(data => setResultData(data))
	})
	return (
			<div id='recovered'>
				<header className="App-header">
					<Link to='/'><h1 className='app-name'>نرم افزار اعلام آمار جهانی ویروس کرونا</h1></Link>
					<div className="search-box">
						<Link to='/search' className='search'>
							<object type="image/svg+xml" data="/find.svg" width="35" height="35"
							        style={ { cursor: "pointer" } }>
								Your browser does not support SVG
							</object>
							<span>جستجوی کشورها</span>
						</Link>
					</div>
				</header>
				<div className="row">
					<div className="card">
						<h4 className="card-title">لیست کشورهای جهان به ترتیب تعداد افراد بهبودیافته</h4>
						<div className="card-body">
							<table>
								<tr>
									<th>ردیف</th>
									<th>نام کشور</th>
									<th>تعداد افراد بیمار</th>
									<th>تعداد افراد بهبودیافته</th>
									<th>تعداد افراد متوفی</th>
								</tr>
								{
									resultData.map((country, index) => (
											<tr key={index}>
												<th>{index +1}</th>
												<td>{country.Country}</td>
												<td>{country.TotalConfirmed}</td>
												<td>{country.TotalRecovered}</td>
												<td>{country.TotalDeaths}</td>
											</tr>
									))
								}
							</table>
						</div>
					</div>
				</div>
			</div>
	)
}

export default RecoveredRanking
