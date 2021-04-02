import logo from '../images/logo.svg'

export const Loader = () => {
    return (
        <div className="loader">
			<img src={logo} className='logo-image' width='150' height='150' alt='Rotating logo' />
            <div className='logo-image logo-image__spinner'></div>
		</div>
    )
}
