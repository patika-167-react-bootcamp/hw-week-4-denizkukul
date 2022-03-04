import './Loading.css';
export const Loading: React.FC = () => {
  return (
    <div className='loading'>
      <div className='progress'>
        <div className='spinner'></div>
      </div>
    </div>
  )
}