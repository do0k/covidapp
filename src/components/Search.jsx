import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

function Search(props) {
	const [ loaded, setLoaded ] = useState(false)
	const [ isLoadingLoaded, setLoadingLoaded ] = useState(false)
	const [ loading, setLoading ] = useState(false)
	const [ countries, setCountries ] = useState([])
	const [ sCountry, setsCountry ] = useState(null)
	const [ yDate ] = useState('2020')
	const [ mDate, setMDate ] = useState(0)
	const [ dDate, setDDate ] = useState(0)
	const [ resultData, setResultData ] = useState([])
	
	useEffect(() => {
		fetch('https://api.covid19api.com/countries', {
			method: 'GET',
			headers: {
				'X-Access-Token': "c9bc7e34-a1d0-4f6c-b5d3-3e4e5c19c83c"
			}
		}).then(res => res.json())
				.then(data => {
					setCountries(data)
					setLoaded(true)
				})
	})
	
	const handleChangeOptions = e => {
		setsCountry(e.target.value)
	}
	
	const handleChangeDayOptions = e => {
		setDDate(e.target.value)
	}
	
	const handleChangeMonthOptions = e => {
		setMDate(e.target.value)
	}
	
	const handleSubmit = e => {
		e.preventDefault()
		
		if ( sCountry !== null ) {
			if ( dDate !== 0 && mDate !== 0 ) {
				setLoadingLoaded(true)
				fetch(`https://do0kcovid19api.herokuapp.com/stats/${ sCountry }/${ yDate }-${ mDate }-${ dDate }`).then(res => res.json())
						.then(data => {
							setResultData(data)
							setLoading(true)
							setLoadingLoaded(false)
						})
			} else {
				setLoadingLoaded(true)
				fetch(`https://do0kcovid19api.herokuapp.com/stats/${ sCountry }`).then(res => res.json())
						.then(data => {
							setResultData(data)
							setLoading(true)
							setLoadingLoaded(false)
						})
			}
		}
	}
	
	return (
			<div id="search">
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
				<div className="row search-row">
					<div className="card mb-100">
						<div className="card-body">
							{
								loaded ? (
										<form className='search-form' onSubmit={ handleSubmit }>
											<label htmlFor="country" className='countryLabel'>نام کشور</label>
											<br/>
											<select name="country" id="country" onChange={ handleChangeOptions }>
												<option>انتخاب کشور</option>
												{
													countries.length > 0 ? countries.map((country, index) => {
														return (<option key={ index } value={ country.ISO2 }>{ country.Country }</option>)
													}) : (<option>در حال بارگزاری ...</option>)
												}
											</select>
											<br/>
											<span>تاریخ میلادی (اختیاری)</span>
											<br/>
											<label htmlFor="day">روز</label>
											<select name="day" id="day" onChange={ handleChangeDayOptions }>
												<option>روز</option>
												<option value="01">1</option>
												<option value="02">2</option>
												<option value="03">3</option>
												<option value="04">4</option>
												<option value="05">5</option>
												<option value="06">6</option>
												<option value="07">7</option>
												<option value="08">8</option>
												<option value="09">9</option>
												<option value="10">10</option>
												<option value="11">11</option>
												<option value="12">12</option>
												<option value="13">13</option>
												<option value="14">14</option>
												<option value="15">15</option>
												<option value="16">16</option>
												<option value="17">17</option>
												<option value="18">18</option>
												<option value="19">19</option>
												<option value="20">20</option>
												<option value="21">21</option>
												<option value="22">22</option>
												<option value="23">23</option>
												<option value="24">24</option>
												<option value="25">25</option>
												<option value="26">26</option>
												<option value="27">27</option>
												<option value="28">28</option>
												<option value="29">29</option>
												<option value="30">30</option>
												<option value="31">31</option>
											</select>
											<label htmlFor="month">ماه</label>
											<select name="month" id="month" onChange={ handleChangeMonthOptions }>
												<option>ماه</option>
												<option value="01">1</option>
												<option value="02">2</option>
												<option value="03">3</option>
												<option value="04">4</option>
												<option value="05">5</option>
												<option value="06">6</option>
												<option value="07">7</option>
											</select>
											<label htmlFor="day">سال</label>
											<input style={ { maxWidth: 100, textAlign: 'center' } } type="number" value={ 2020 }
											       disabled={ true }/>
											<br/>
											<button type='submit'>جستجو</button>
										</form>
								) : (
										<div className="loading">
											<img src="/loading.gif" alt="loading..."/>
											<br/>
											<span>در حال بارگزاری</span>
										</div>
								)
							}
						</div>
					</div>
				</div>
				<div className="row search-row">
					{
						(!isLoadingLoaded) ? (
								<div className={`card ${!loading ? 'd-none' : ''}`}>
									<h4 className="card-title">نتایج جستجو</h4>
									<div className="card-body">
										<div className="row no-mg">
											<div className="f1">
												<h4 className="result-title">تعداد بیماران</h4>
												<h6 className='result-body'>{ resultData.Confirmed }</h6>
											</div>
											<div className="f1">
												<h4 className="result-title">تعداد بهبودیافتگان</h4>
												<h6 className='result-body'>{ resultData.Recovered }</h6>
											</div>
											<div className="f1">
												<h4 className="result-title">تعداد فوتی ها</h4>
												<h6 className='result-body'>{ resultData.Deaths }</h6>
											</div>
										</div>
									</div>
								</div>
						) : (
								<div className="loading">
									<img src="/loading.gif" alt="loading..."/>
									<br/>
									<span>در حال بارگزاری</span>
								</div>
						)
					}
				</div>
			</div>
	)
}

export default Search
