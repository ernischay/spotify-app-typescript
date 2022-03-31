import logo from '../assets/logo.png'
import { loginUrl } from '../utils/urls'

interface LoginProps {}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
    return (
        <div className='m-auto flex flex-col justify-evenly items-center content-around w-full h-screen'>
            <img className='h-[100px] object-contain p-[10px]' src={logo} alt='spotify' />
            <a className='flex items-center justify-center text-white px-[10px] py-[25px] rounded-[20px] bg-[#1db954] mt-[20px] max-w-[250px] text-lg' href={loginUrl}>
                Login With Spotify
            </a>
        </div>
    )
}

export default Login
