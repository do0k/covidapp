import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

function Home(props) {
	const [ isLoading, setLoading ] = useState(true)
	const [ totalCases, setTotalCases ] = useState(0)
	const [ totalDeaths, settotalDeaths ] = useState(0)
	const [ totalRecovered, setTtotalRecovered ] = useState(0)
	
	useEffect(() => {
		fetch('https://do0kcovid19api.herokuapp.com')
				.then(res => res.json())
				.then(data => {
					console.log(data)
					setTotalCases(data.Global.TotalConfirmed)
					settotalDeaths(data.Global.TotalDeaths)
					setTtotalRecovered(data.Global.TotalRecovered)
					setLoading(false)
				})
	})
	
	const handleLoading = (data) => {
		if ( isLoading ) {
			return (
					<img src='/loading.gif' alt='loading...' width="35"/>
			)
		} else {
			return data
		}
	}
	
	
	return (
			<div className='home'>
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
				<h2 className='title-stats'>آمار دیروز جهان</h2>
				<div className="row mb-100">
					<div className="card">
						<h4 className="card-title title-primary">تعداد بیماران</h4>
						<h6 className='card-body'>{ handleLoading(totalCases) }</h6>
					</div>
					<div className="card">
						<h4 className="card-title title-green">تعداد بهبودیافتگان</h4>
						<h6 className='card-body'>{ handleLoading(totalRecovered) } </h6>
					</div>
					<div className="card">
						<h4 className="card-title title-red">تعداد فوت شدگان</h4>
						<h6 className='card-body'>{ handleLoading(totalDeaths) }</h6>
					</div>
				</div>
				
				<div className="row">
					<div className="card card-hover">
						<Link to='/ranking/cases'>
							<div className="card-body card-link">
								<span>بیشترین بیمار</span>
							</div>
						</Link>
					</div>
					<div className="card card-hover">
						<Link to='/ranking/recovered'>
							<div className="card-body card-link">
								<span>بیشترین بهبود یافته</span>
							</div>
						</Link>
					</div>
					<div className="card card-hover">
						<Link to='/ranking/deaths'>
							<div className="card-body card-link">
								<span>بیشترین فوتی</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
	)
}

export default Home
