import Spinner from '@assets/Spinner/Spinner.svg';

export const Loader = () => {
  return (
    <div className="bg-white flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <img src={Spinner} className='w-[1px]' alt='loader' />
    </div>
  )
}